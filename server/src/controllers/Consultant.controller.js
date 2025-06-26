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
    name,
    email,
    password,
    phoneNumber,
    address,
    experience,
    primaryCategory,
    specializedServices,
    keySkills,
    languageProficiency,
    // availabilityPerWeek,
    hourlyRate,
    // preferredWorkingHours,
    // bookingLeadTime,
    acceptedTerms,
    visibleOnPlatform,
    education,
  } = req.body;

  const existing = await Consultant.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const profilePic = await uploadOnCloudinary(
    req.files?.profilePicture?.[0]?.path
  );

  const resumeFile = req.files?.resume?.[0];
  if (!resumeFile) {
    return res.status(400).json({ message: "Resume file is missing" });
  }

  const cv = await uploadOnCloudinary(resumeFile.path);
  if (!cv?.url) {
    return res.status(400).json({ message: "Failed to upload resume" });
  }

  if (!req.files?.panCard?.[0]) {
    return res.status(400).json({ message: "PAN📞 Card file is missing" });
  }

  if (!req.files?.aadhaarCard?.[0]) {
    return res.status(400).json({ message: "Aadhaar ❤️Card file is missing" });
  }
  const docs = {
    aadhaarCard: await uploadOnCloudinary(req.files?.aadhaarCard?.[0]?.path),

    panCard: await uploadOnCloudinary(req.files?.panCard?.[0]?.path),

    passport: req.files?.passport?.[0]
      ? await uploadOnCloudinary(req.files.passport[0].path)
      : null,
  };
  console.log("Uploaded PAN:", docs.panCard);

  // Upload certificates
  const certificateFiles = req.files?.certificates || [];
  const certifications = [];
  for (const file of certificateFiles) {
    const uploaded = await uploadOnCloudinary(file.path);
    if (uploaded?.url) {
      certifications.push({
        name: file.originalname,
        fileUrl: uploaded.url,
      });
    }
  }

  // Parse arrays if needed
  const specializedServicesArray = Array.isArray(specializedServices)
    ? specializedServices
    : JSON.parse(specializedServices || "[]");

  const keySkillsArray = Array.isArray(keySkills)
    ? keySkills
    : JSON.parse(keySkills || "[]");

  const languageProficiencyArray = Array.isArray(languageProficiency)
    ? languageProficiency
    : JSON.parse(languageProficiency || "[]");

  const educationArray = Array.isArray(education)
    ? education
    : JSON.parse(education || "[]");

  const weeklyAvailabilityArray = Array.isArray(req.body.weeklyAvailability)
    ? req.body.weeklyAvailability
    : JSON.parse(req.body.weeklyAvailability || "[]");

  const consultant = await Consultant.create({
    name,
    email,
    password, // hash before saving if you haven't yet
    phoneNumber,
    address,
    experience,
    resume: cv?.url,
    profilePicture: profilePic?.url,
    primaryCategory,
    specializedServices: specializedServicesArray,
    keySkills: keySkillsArray,
    certificates: certifications,
    languageProficiency: languageProficiencyArray,
    // availabilityPerWeek,
    hourlyRate,
    // preferredWorkingHours,
    // bookingLeadTime,
    acceptedTerms,
    visibleOnPlatform,
    weeklyAvailability: weeklyAvailabilityArray,
    documents: {
      aadhaarCard: docs.aadhaarCard?.url,
      panCard: docs.panCard?.url,
      passport: docs.passport?.url || null,
    },
    education: educationArray,
    status: "pending",
    isApproved: false,
  });
  console.log("req.files:", req.files);

  const savedConsultant = await Consultant.findById(consultant._id).select(
    "-password -refreshToken"
  );
  if (!savedConsultant) {
    throw new ApiError(404, "Consultant not created");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        savedConsultant,
        "success",
        "Consultant created successfully"
      )
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
