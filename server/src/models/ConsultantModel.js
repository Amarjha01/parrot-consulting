import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const consultantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "consultant"],
      default: "consultant",
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },

    resume: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
    },

    // category

    primaryCategory: String,
    specializedServices: [String],

    // Skills & Certifications
    keySkills: [String],
    certificates: [
      {
        name: String,
        fileUrl: String, // Cloudinary link
      },
    ],
    languageProficiency: [String],

    // Availability & Pricing
    // Availability & Pricing
    hourlyRate: Number,
    // bookingLeadTime: String,

weeklyAvailability: {
  type: Map,
  of: [
    {
      start: { type: String },
      end: { type: String },
    }
  ],
  default: {},
},




    // Agreements
    acceptedTerms: { type: Boolean, default: false },
    visibleOnPlatform: { type: Boolean, default: false },

    // Admin control
    isApproved: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvalDate: Date,
    rejectionReason: String,
    submittedAt: { type: Date, default: Date.now },

    // Document Uploads
    documents: {
      aadhaarCard: {
        type: String,
        required: true, // Cloudinary URL or path
      },
      panCard: {
        type: String,
        required: false, // Cloudinary URL or path
      },
    },

    // Education (referenced)
    education: [
      {
        qualification: String,
        university: String,
        fieldOfStudy: String,
        graduationYear: String,
      },
    ],
  },
  { timestamps: true }
);

consultantSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

consultantSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

consultantSchema.methods.genrateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      phoneNumber: this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
  );
};

consultantSchema.methods.genrateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );
};

export const Consultant = mongoose.model("Consultant", consultantSchema);
