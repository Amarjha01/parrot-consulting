import { Review } from "../models/Review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Booking } from "../models/BookingModel.js";

//user post rivew for consultant

export const postReview = asyncHandler(async (req, res) => {
  const { user, rating, comment, bookingId } = req.body;

  if (!bookingId || !user || !rating) {
    throw new ApiError(400, "Required fields missing");
  }

  // ✅ 1. Find the booking
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // ✅ 2. Derive consultant from booking
  const consultant = booking.consultant;

  // ✅ 3. Prevent duplicate review for this booking
  const existingReview = await Review.findOne({
    user,
    session: bookingId,
  });
  if (existingReview) {
    throw new ApiError(400, "You have already reviewed this session.");
  }

  // ✅ 4. Create the review
  const review = await Review.create({
    consultant,
    user,
    rating,
    comment,
    session: bookingId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review created successfully"));
});

// get review  list
export const getReview = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("consultant", "name email");
  return res.status(200).json(new ApiResponse(200, reviews));
});
