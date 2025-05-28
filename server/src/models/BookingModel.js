import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true,
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
      enum: [
        "pending",
        "scheduled",
        "completed",
        "missed",
        "rescheduled",
        "cancelled",
      ],

      default: "pending",
    },
    rescheduledFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    duration: {
      type: Number,
      required: true,
    },
    projectDetails: {
      type: String,
    }
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
