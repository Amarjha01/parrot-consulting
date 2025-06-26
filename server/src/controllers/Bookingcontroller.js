// controllers/bookingController.js
import { Booking } from "../models/BookingModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

import crypto from "crypto";

export const createPendingBooking = asyncHandler(async (req, res) => {
  const { consultantId, userId, datetime, duration, projectDetails } = req.body;

  const booking = await Booking.create({
    consultant: consultantId,
    user: userId,
    datetime,
    duration,
    projectDetails,
    status: "pending",
  });

  if (!booking) {
    throw new ApiError(500, "Something went wrong while creating booking");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking created successfully"));
});

export const confirmBooking = asyncHandler(async (req, res) => {
  const {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(
      400,
      "Invalid Razorpay signature. Payment may be spoofed."
    );
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "scheduled" },
    { new: true }
  ).populate("consultant");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, booking, "Booking confirmed and payment verified")
    );
});

// get bookings by consultant id

export const getBookingsByConsultantId = asyncHandler(async (req, res) => {
  const { consultantId } = req.params;

  const bookings = await Booking.find({
    consultant: consultantId,
    status: "scheduled",
  }).populate("user", "name"); // Only populates the name field of the user

  return res.status(200).json(new ApiResponse(200, bookings));
});



export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("user consultant");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return res.status(200).json(new ApiResponse(200, booking));
});
