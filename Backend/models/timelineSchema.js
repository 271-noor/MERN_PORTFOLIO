import mongoose from "mongoose";


// ye Schema h
const timelineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title Required!"],
    },
    description: {
        type: String,
        required: [true, "Description Required!"],
    },
    timeline: {
        from: {
            type: String,
            required: [true, "Timeline Starting Date is Required!"],
        },
        to: String,
    },
   
});

// ye Schema ka model h
export const Timeline = mongoose.model("Timeline", timelineSchema);