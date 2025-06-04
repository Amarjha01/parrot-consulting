import {Consultant} from "../models/ConsultantModel.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";

export const seeallactiveconsultants = asyncHandler(async (req, res) => {
    const consultants = await Consultant.find({ isApproved: true });
    return res.status(200).json(new ApiResponse(200, consultants));
});