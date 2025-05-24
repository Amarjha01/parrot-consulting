import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request ");
    }
  
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid User Token ");
    }
    req.user = user; // making a new object in request
    // console.log(req.admin);
  
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid User Token Cant poceed further");
  }
});


