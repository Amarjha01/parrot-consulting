import { Admin } from "../models/Admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Consultant } from "../models/ConsultantModel.js";
import sendEmail from "../services/email.service.js";
import { Booking } from "../models/BookingModel.js";
import bcrypt from 'bcryptjs';
const generateAccessAndRefreshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.genrateAccessToken();
    const refreshToken = admin.genrateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate access token and refresh token"
    );
  }
};

// admin registration controller
export const registerAdmin = asyncHandler(async (req, res) => {
  console.log(req.body );
  
  const { name, email, password, phoneNumber } = req.body;

  if (
    [name, email, password, phoneNumber].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  const existingAdmin = await Admin.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });

  if (existingAdmin) {
    throw new ApiError(
      400,
      " Admin With E-mail or Phonenumber already exists already exists"
    );
  }

  const admin = await Admin.create({
    name: name.toLowerCase(),
    email,
    password,
    phoneNumber,
  });

  const registeredAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!registeredAdmin) {
    throw new ApiError(500, "Failed to register admin");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Admin registered successfully", registeredAdmin)
    );
});

// admin login controller

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  if ((!email && !phoneNumber) || !password) {
    throw new ApiError(400, "email/Username and Password are required");
  }

  const admin = await Admin.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // checking if password is valid or not
  if (!admin.comparePassword(password)) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    admin._id
  );

  const loggedinAdmin = await Admin.findById(admin._id).select(
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
    .json(
      new ApiResponse(
        200,
        { admin: loggedinAdmin, accessToken, refreshToken }, // here we are handeling the case where admin wants to set his cokkies him self in his local system may be he wants to login from another device
        "Admin logged in successfully"
      )
    );
});

//logout Admin controller
export const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
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
    .json(new ApiResponse(200, "Admin logged out successfully"));
});

// admin see list of unapproved consultants
export const unapprovedConsultants = asyncHandler(async (req, res) => {
  const consultants = await Consultant.find({ isApproved: false });
  return res.status(200).json(new ApiResponse(200, consultants));
});
// admin see list of approved consultants
export const approvedConsultants = asyncHandler(async (req, res) => {
  const consultants = await Consultant.find({ isApproved: true });
  return res.status(200).json(new ApiResponse(200, consultants));
});

// admin approve consultant
export const approveConsultant = asyncHandler(async (req, res) => {
  const { consultantId } = req.params;
  const consultant = await Consultant.findById(consultantId);
  if (!consultant) {
    throw new ApiError(404, "Consultant not found");
  }
  consultant.isApproved = true;
  consultant.status = "approved";
  await consultant.save();

  // Send approval email
  try {
    await sendEmail({
      to: consultant.email,
      subject: "Consultant Application Approved 🎉",
      text: `Dear ${consultant.name},\n\nCongratulations! Your consultant application has been approved.\n\nYou can now log in and start using our platform.\n\nBest Regards,\nParrot Consulting Team`,
      html: `<p>Dear <b>${consultant.name}</b>,</p>
               <p>🎉 Congratulations! Your consultant application has been <span style="color:green;">approved</span>.</p>
               <p>You can now log in and start using our platform.</p>
               <p>Best Regards,<br/>Parrot Consulting Team</p>`,
    });
  } catch (error) {
    console.error("Error sending approval email:", error);
    // You may log this or use a fallback
  }

  return res
    .status(200)
    .json(new ApiResponse(200, consultant, "Consultant approved successfully"));
});

// admin reject consultant
export const rejectConsultant = asyncHandler(async (req, res) => {
  const { consultantId } = req.params;

  const consultant = await Consultant.findById(consultantId);
  if (!consultant) {
    throw new ApiError(404, "Consultant not found");
  }

  try {
    await sendEmail({
      to: consultant.email,
      subject: "Consultant Application Rejected",
      text: `Dear ${consultant.name},\n\nWe regret to inform you that your application has been rejected.\n\nRegards,\nParrot Consulting Team`,
      html: `<p>Dear <b>${consultant.name}</b>,</p><p>We regret to inform you that your consultant application has been <span style="color:red;">rejected</span>.</p><p>Regards,<br/>Parrot Consulting Team</p>`,
    });
  } catch (error) {
    console.error("Failed to send rejection email:", error);
    // Optionally handle retry or fallback
  }

  await Consultant.findByIdAndDelete(consultantId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, null, "Consultant rejected and deleted successfully")
    );
});


// admin get all booking 

export const adminGetAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({status:"scheduled"}).populate("user").populate("consultant");
  return res.status(200).json(new ApiResponse(200, bookings));
});

export const getAdmin = asyncHandler(async (req, res) => {
  const result = await Admin.find();
  res.status(200).json(result);
});
export const passupdate = asyncHandler(async (req, res) => {
  const email = 'dhimanabhinav675@gmail.com';
  const tempPassword = 'abhishek'; // Your temporary password

  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const result = await Admin.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );

  if (!result) {
    res.status(404);
    throw new Error('Admin not found');
  }

  res.status(200).json({ message: 'Password reset successfully' });
});
