import { Admin } from "../models/Admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request ");
    }
  
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const admin = await Admin.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!admin) {
      throw new ApiError(401, "Invalid Admin Token ");
    }
    req.admin = admin; // making a new object in request
    // console.log(req.admin);
  
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Admin Token Cant poceed further");
  }
});


