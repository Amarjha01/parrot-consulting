import Consultant from "../models/ConsultantModel.js";

const seeallactiveconsultants = asyncHandler(async (req, res) => {
    const consultants = await Consultant.find({ isApproved: true });
    return res.status(200).json(new ApiResponse(200, consultants));
});