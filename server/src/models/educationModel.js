import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: "Consultant" },
  qualification: String, // e.g., "Bachelor's", "Master's"
  university: String,
  fieldOfStudy: String,
  graduationYear: String,
});

export const Education = mongoose.model("Education", EducationSchema);
