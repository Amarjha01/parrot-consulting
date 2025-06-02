import { Booking } from "../models/BookingModel.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const genrateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate access token and refresh token"
    );
  }
};

// register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  if (
    [name, email, password, phoneNumber].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (existingUser) {
    throw new ApiError(
      400,
      "User With E-mail or Phonenumber already exists already exists"
    );
  }

  const user = await User.create({
    name: name.toLowerCase(),
    email,
    password,
    phoneNumber,
  });

  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!registeredUser) {
    throw new ApiError(500, "Failed to register user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered Successfully", registeredUser));
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  if ((!email && !phoneNumber) || !password) {
    throw new ApiError(400, "email/Username and Password are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // checking if password is valid or not
  if (!user.comparePassword(password)) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User logged in successfully", loggedinUser));

    // .json(
    //   new ApiResponse(
    //     200,
    //     { user: loggedinUser, accessToken, refreshToken }, // here we are handeling the case where admin wants to set his cokkies him self in his local system may be he wants to login from another device
    //     "user logged in successfully"
    //   )
    // );
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  //clear cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export const seeBooking = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const booking = await Booking.find({
    user: userId,
    status: "scheduled",
  })
    .populate("consultant", "name email profilePicture") // optional
    .sort({ datetime: 1 });

  return res.status(200).json(new ApiResponse(200, booking));
});
