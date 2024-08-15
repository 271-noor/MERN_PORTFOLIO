import mongoose from "mongoose";


// ye Schema h
const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minLength: [2, "Name must contain at least 2 characters!"],
    },
    subject: {
        type: String,
        minLength: [2, "Name must contain at least 2 characters!"],
    },
    message: {
        type: String,
        minLength: [2, "Name must contain at least 2 characters!"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// ye Schema ka model h
export const Message = mongoose.model("Message", messageSchema);