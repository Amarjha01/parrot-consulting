// controllers/paymentController.js
import Razorpay from "razorpay";
import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body; // amount in paise

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Invalid amount");
  }

  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Razorpay order created successfully"));
});
