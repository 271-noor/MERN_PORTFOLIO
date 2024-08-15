import { genrateToken } from "../utils/jwtToken.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume are Required", 400));
  }
  const { avatar } = req.file;

  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "AVATAR" }
  );

  if (cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
    );
  }

  const { resume } = req.file;
  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "MY_RESUME" }
  );

  if (cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForResume.error || "Unknown Cloudinary Error"
    );
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedInURL,
  } = req.body;
  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedInURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar,
      url: cloudinaryResponseForAvatar.secure.url,
    },
    resume: {
      public_id: cloudinaryResponseForResume,
      url: cloudinaryResponseForResume.secure.url,
    },
  });

  genrateToken(user, "user Registered", 200, res);
});

export const login = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next( new ErrorHandler("Email and Password are Required!"));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next( new ErrorHandler("Ivalid Email or Password!"));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next( new ErrorHandler("Ivalid Email or Password!"));
    }

    genrateToken(user, "Logged In", 200, res);
})