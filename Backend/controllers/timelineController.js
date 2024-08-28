import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Timeline } from '../models/timelineSchema.js'
import ErrorHandler from "../middleware/error.js"


// For ADD Timeline Code...
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
    const { title, description, from, to } = rq.body;
    const newTimeline = await Timeline.create({
        title, 
        description, 
        timeline: {from, to},
    });
    res.status(200).json({
        success: true,
        message: "Timeline Added",
        newTimeline,
    })
});

// For DELETE Timeline Code...
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const timeline = await Timeline.findById(id);
    if (!timeline) {
        return next( new ErrorHandler("Timeline not Found!", 404))
    }
    await timeline.deleteOne();
    res.status(200).json({
        success: true,
        message: "Timeline Deleted!",
    });
});

// For GetAllTimeline Code ...
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
   const timelines = await Timeline.find();
   res.status(200).json({
    success: true,
    timelines,
   });
});