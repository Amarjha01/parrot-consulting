import { upload } from "../middlewares/multer.js";
import { Consultant } from "../models/ConsultantModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/clodinary.js";

const genrateAccessTokenAndRefreshToken = async (consultantId) => {
  try {
    const consultant = await Consultant.findById(consultantId);
    const accessToken = consultant.genrateAccessToken();
    const refreshToken = consultant.genrateRefreshToken();

    consultant.refreshToken = refreshToken;
    await consultant.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate access token and refresh token"
    );
  }
};

// register consultant
export const ApplyAsconsultant = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    password,
    phone,
    address,
    experience,
    category,
    specializedServices,
    skills,
    languages,
    hourlyRate,
    termsAccepted,
    profileVisibility,
    education,
    universityName,
    graduationYear,
    highestQualification,
    fieldOfStudy,
  } = req.body;

  // ✅ Parse timeSlots from frontend
  const parsedTimeSlots = JSON.parse(req.body.timeSlots || '{}');
  console.log(parsedTimeSlots, "✅ Parsed TimeSlots from frontend");

  // ✅ Check if consultant with email already exists
  const existing = await Consultant.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  // ✅ Upload profile picture
  const profilePic = await uploadOnCloudinary(req.files?.profilePicture?.[0]?.path);

  // ✅ Upload resume
  const resumeFile = req.files?.resume?.[0];
  if (!resumeFile) return res.status(400).json({ message: "Resume file is missing" });
  const cv = await uploadOnCloudinary(resumeFile.path, "raw");
  if (!cv?.url) return res.status(400).json({ message: "Failed to upload resume" });

  // ✅ Upload PAN & Aadhaar
  if (!req.files?.panCard?.[0]) return res.status(400).json({ message: "PAN Card file is missing" });
  if (!req.files?.aadhaarCard?.[0]) return res.status(400).json({ message: "Aadhaar Card file is missing" });

  const docs = {
    aadhaarCard: await uploadOnCloudinary(req.files?.aadhaarCard?.[0]?.path, "raw"),
    panCard: await uploadOnCloudinary(req.files?.panCard?.[0]?.path, "raw"),
    passport: req.files?.passport?.[0]
      ? await uploadOnCloudinary(req.files?.passport?.[0]?.path)
      : null,
  };

  // ✅ Upload certificates
  const certificateFiles = req.files?.certificates || [];
  const certifications = [];
  for (const file of certificateFiles) {
    const uploaded = await uploadOnCloudinary(file.path, "raw");
    if (uploaded?.url) {
      certifications.push({ name: file.originalname, fileUrl: uploaded.url });
    }
  }

  // ✅ Parse utility
  const parse = (input) => {
    if (Array.isArray(input)) return input;
    try {
      return JSON.parse(input || "[]");
    } catch {
      return [];
    }
  };

  // ✅ Save to DB
  const consultant = await Consultant.create({
    name: fullName,
    email,
    password, // ✅ Make sure this is hashed before or inside schema middleware
    phoneNumber: phone,
    address,
    experience,
    hourlyRate,
    profilePicture: profilePic?.url,
    resume: cv?.url,
    primaryCategory: category,
    specializedServices: parse(specializedServices),
    keySkills: parse(skills),
    languageProficiency: parse(languages),
    certificates: certifications,
    acceptedTerms: termsAccepted === "true" || termsAccepted === true,
    visibleOnPlatform: profileVisibility === "true" || profileVisibility === true,
    education: parse(education),
    graduationYear,
    highestQualification,
    fieldOfStudy,
    universityName,
    documents: {
      aadhaarCard: docs.aadhaarCard?.url,
      panCard: docs.panCard?.url,
      passport: docs.passport?.url || null,
    },
    weeklyAvailability: parsedTimeSlots, // ✅ Save directly
    status: "pending",
    isApproved: false,
  });

  const savedConsultant = await Consultant.findById(consultant._id).select("-password -refreshToken");
  if (!savedConsultant) throw new ApiError(404, "Consultant not created");

  return res.status(200).json(
    new ApiResponse(200, savedConsultant, "success", "Consultant created successfully")
  );
});



//login consultant only if approved
export const loginAsConsultant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const consultant = await Consultant.findOne({ email });

  if (!consultant) {
    throw new ApiError(404, "Consultant not found");
  }

  if (!consultant.comparePassword(password)) {
    throw new ApiError(401, "Invalid Password");
  }

  if (!consultant.isApproved) {
    throw new ApiError(401, "Consultant is not approved yet try again later ");
  }

  const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(
    consultant._id
  );

  const loggedinConsultant = await Consultant.findById(consultant._id).select(
    "-password -refreshToken"
  );

  if (!loggedinConsultant) {
    throw new ApiError(500, "Something went wrong while logging consultant");
  }

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedinConsultant));
});
