import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName: {
       type: String,
       required: [true, "Name Required!"] 
    },
    email: {
       type: String,
       required: [true, "Email Required!"] 
    },
    phone: {
       type: String,
       required: [true, "Phone Number Required!"] 
    },
    aboutMe: {
       type: String,
       required: [true, "About Me Field is Required!"] 
    },
    password: {
       type: String,
       required: [true, "Password is Required!"], 
       minLength: [8, "Password must contain at least 8 Characters!"],
       select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    portfolioURL: {
        type: String,
        required: [true, "Portfolio URL is Required!"]
    },
    githubURL: String,
    instagramURL: String,
    facebookURL: String,
    twitterURL: String,
    linkedInURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


// For Hashing Password.
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

// For Compareing Password with HashedPassword.
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


// Generating JSON WEB TOKEN method
userSchema.methods.genrateJsonWebToken = function() {
        return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES,
        })
}


export const User = mongoose.model("User", userSchema)