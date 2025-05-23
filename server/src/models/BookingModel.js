import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  datetime: { 
    type: Date, 
    required: true 
  },
  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "missed", "rescheduled", "cancelled"],
    default: "scheduled",
  },
  rescheduledFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    default: null,
  }
}, { timestamps: true });


export const Booking = mongoose.model("Booking", bookingSchema);
