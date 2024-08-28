import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: String,
  proficiency: String,
  svg: {
    public_id: {
      type: true,
      required: true,
    },
    url: {
      type: true,
      required: true,
    },
  },
});

export const Skill = mongoose.model(
    "Skill", 
    skillSchema
);
