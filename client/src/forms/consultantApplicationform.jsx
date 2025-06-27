import { useState } from "react";
import { registerAsConsultant } from "../service/consultantApi.js";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  File,
  UploadCloud,
  Clock,
} from "lucide-react"; // Use only icons where needed
export default function ConsultantApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    experience: "",
    primaryCategory: "",
    specializedServices: "",
    keySkills: "",
    languageProficiency: [],
    availabilityPerWeek: 20,
    hourlyRate: "",
    preferredWorkingHours: "",
    bookingLeadTime: "",
    acceptedTerms: false,
    visibleOnPlatform: false,
    education: [],
  });

  const [files, setFiles] = useState({
    profilePicture: null,
    resume: null,
    aadhaarCard: null,
    panCard: null,
    passport: null,
    certificates: [],
  });

  const [educationFields, setEducationFields] = useState([
    { qualification: "", university: "", fieldOfStudy: "", graduationYear: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const defaultAvailability = daysOfWeek.map((day) => ({
    day,
    isActive: false,
    timeSlots: [],
  }));

  const [weeklyAvailability, setWeeklyAvailability] =
    useState(defaultAvailability);

  const handleToggleDay = (index) => {
    const updated = [...weeklyAvailability];
    updated[index].isActive = !updated[index].isActive;
    if (!updated[index].isActive) updated[index].timeSlots = [];
    setWeeklyAvailability(updated);
  };

  const handleTimeChange = (index, slotIndex, field, value) => {
    const updated = [...weeklyAvailability];
    updated[index].timeSlots[slotIndex][field] = value;
    setWeeklyAvailability(updated);
  };

  const addTimeSlot = (index) => {
    const updated = [...weeklyAvailability];
    updated[index].timeSlots.push({ start: "", end: "" });
    setWeeklyAvailability(updated);
  };

  const removeTimeSlot = (index, slotIndex) => {
    const updated = [...weeklyAvailability];
    updated[index].timeSlots.splice(slotIndex, 1);
    setWeeklyAvailability(updated);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (name === "certificates") {
      setFiles((prev) => ({
        ...prev,
        certificates: [...prev.certificates, ...uploadedFiles],
      }));
    } else {
      setFiles((prev) => ({
        ...prev,
        [name]: uploadedFiles[0],
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...educationFields];
    updated[index][field] = value;
    setEducationFields(updated);
  };

  const addEducationField = () => {
    setEducationFields((prev) => [
      ...prev,
      {
        qualification: "",
        university: "",
        fieldOfStudy: "",
        graduationYear: "",
      },
    ]);
  };

    const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.primaryCategory.trim()) newErrors.primaryCategory = "Primary category is required";
    if (!formData.specializedServices.trim()) newErrors.specializedServices = "Specialized services are required";
    if (!formData.keySkills.trim()) newErrors.keySkills = "Key skills are required";
    if (!formData.hourlyRate.trim()) newErrors.hourlyRate = "Hourly rate is required";
    if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the terms and conditions";

    if (!files.profilePicture) newErrors.profilePicture = "Profile picture is required";
    if (!files.resume) newErrors.resume = "Resume is required";
    if (!files.aadhaarCard) newErrors.aadhaarCard = "Aadhaar card is required";
    if (!files.panCard) newErrors.panCard = "PAN card is required";

    setErrorMessages(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validation for required files
    if (!files.profilePicture) {
      setError("Profile picture is required");
      setLoading(false);
      return;
    }
    if (!files.resume) {
      setError("Resume is required");
      setLoading(false);
      return;
    }
    if (!files.aadhaarCard) {
      setError("Aadhaar Card is required");
      setLoading(false);
      return;
    }
    if (!files.panCard) {
      setError("PAN Card is required");
      setLoading(false);
      return;
    }

    // Validation for required text fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.address ||
      !formData.experience ||
      !formData.primaryCategory ||
      !formData.specializedServices ||
      !formData.keySkills ||
      !formData.hourlyRate
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!formData.acceptedTerms) {
      setError("You must accept the terms and conditions");
      setLoading(false);
      return;
    }

    // Prepare education data (matching model field name 'university')
    const educationData = educationFields
      .filter(
        (field) =>
          field.qualification ||
          field.university ||
          field.fieldOfStudy ||
          field.graduationYear
      )
      .map(({ qualification, university, fieldOfStudy, graduationYear }) => ({
        qualification,
        university,
        fieldOfStudy,
        graduationYear,
      }));

    try {
      // Create form data for API
      const submissionData = new FormData();

      // Add all text form fields first
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "keySkills") {
          const skills = formData.keySkills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);
          submissionData.append(key, JSON.stringify(skills));
        } else if (key === "specializedServices") {
          const services = formData.specializedServices
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);
          submissionData.append(key, JSON.stringify(services));
        } else if (key === "languageProficiency") {
          submissionData.append(
            key,
            JSON.stringify(formData.languageProficiency)
          );
        } else if (key !== "education") {
          submissionData.append(key, val);
        }
      });
      submissionData.append('weeklyAvailability', JSON.stringify(weeklyAvailability));
      console.log("Final weeklyAvailability before submit:", weeklyAvailability);

      // Add education data
      submissionData.append("education", JSON.stringify(educationData));

      // Debug logging
      console.log("Files being uploaded:", {
        profilePicture: files.profilePicture?.name,
        resume: files.resume?.name,
        aadhaarCard: files.aadhaarCard?.name,
        panCard: files.panCard?.name,
        passport: files.passport?.name,
        certificates: files.certificates.length,
      });

      // Append files - Make sure files exist before appending
      submissionData.append("profilePicture", files.profilePicture);
      submissionData.append("resume", files.resume);
      submissionData.append("aadhaarCard", files.aadhaarCard);
      submissionData.append("panCard", files.panCard);

      // Append optional files
      if (files.passport) {
        submissionData.append("passport", files.passport);
      }

      // Append certificates
      files.certificates.forEach((file) => {
        submissionData.append("certificates", file);
      });

      // for (let [key, value] of submissionData.entries()) {
      //   console.log(key, value instanceof File ? `File: ${value.name}` : value);
      // }

      const response = await registerAsConsultant(submissionData);
      console.log("API Response:", response);

      if (response.status === 201) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          experience: "",
          primaryCategory: "",
          specializedServices: "",
          keySkills: "",
          languageProficiency: [],
          availabilityPerWeek: 20,
          hourlyRate: "",
          preferredWorkingHours: "",
          bookingLeadTime: "",
          acceptedTerms: false,
          visibleOnPlatform: false,
          education: [],
        });
        setFiles({
          profilePicture: null,
          resume: null,
          aadhaarCard: null,
          panCard: null,
          passport: null,
          certificates: [],
        });
        setEducationFields([
          {
            qualification: "",
            university: "",
            fieldOfStudy: "",
            graduationYear: "",
          },
        ]);
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err.response?.data?.message || err.message || "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#103530] min-h-screen py-10 px-4">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl"
  >
    {/* Header */}
    <div className="flex justify-center items-center mb-8">
      <div className="w-8 h-8 bg-[#3d8e5f] rounded-full mr-2"></div>
      <h1 className="text-2xl font-bold uppercase text-[#18664d]">
        Parrot Consult
      </h1>
    </div>

    <h2 className="text-4xl font-bold text-center mb-8 text-[#103530]">
      Become a Consultant
    </h2>

      <div className="space-y-8">
        {/* Basic Details */}
        <div>
          <h3 className="text-xl font-bold mb-4">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
  <User className="absolute left-3 top-3 text-[#3d8e5f]" size={18} />
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    className="pl-10 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f]"
    value={formData.name}
    onChange={handleInputChange}
    required
  />
</div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <textarea
                name="address"
                placeholder="Complete Address"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-[#3d8e5f]/10 transition duration-200"
>
              <span className="mr-2">📷 Upload Profile Picture <span className=" text-red-800">*</span></span>
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                required
              />
            </label>
            {files.profilePicture && (
              <span className="ml-2 text-sm text-green-600">
                ✓ {files.profilePicture.name}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h3 className="text-xl font-bold mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                placeholder="Years of Experience"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
            <div>
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-[#3d8e5f]/10 transition duration-200"
>
                <span className="mr-2">📄 Upload CV / Resume <span className=" text-red-800">*</span></span>
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  required
                />
              </label>
              {files.resume && (
                <span className="block text-center text-sm text-green-600 mt-1">
                  ✓ {files.resume.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Consulting Categories */}
        <div>
          <h3 className="text-xl font-bold mb-4">Consulting Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="primaryCategory"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.primaryCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Primary Consulting Category</option>
                <option value="business">Business Strategy</option>
                <option value="it">Information Technology</option>
                <option value="marketing">Marketing & Sales</option>
                <option value="finance">Finance & Accounting</option>
                <option value="hr">Human Resources</option>
                <option value="legal">Legal Advisory</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="specializedServices"
                placeholder="Specialized Services (comma separated)"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.specializedServices}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Education Details */}
        <div>
          <h3 className="text-xl font-bold mb-4">Education Details</h3>
          {educationFields.map((field, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
              <div>
                <select
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                  value={field.qualification}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "qualification",
                      e.target.value
                    )
                  }
                >
                  <option value="">Highest Qualification</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="diploma">Diploma</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="University / Institution Name"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                  value={field.university}
                  onChange={(e) =>
                    handleEducationChange(index, "university", e.target.value)
                  }
                />
              </div>
              <div>
                <select
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                  value={field.fieldOfStudy}
                  onChange={(e) =>
                    handleEducationChange(index, "fieldOfStudy", e.target.value)
                  }
                >
                  <option value="">Field of Study</option>
                  <option value="business">Business Administration</option>
                  <option value="cs">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="medicine">Medicine</option>
                  <option value="law">Law</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Graduation Year"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                  value={field.graduationYear}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "graduationYear",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducationField}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add another education
          </button>
        </div>

        {/* Skills & Certifications */}
        <div>
          <h3 className="text-xl font-bold mb-4">Skills & Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="keySkills"
                placeholder="Key Skills (comma separated)"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.keySkills}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-[#3d8e5f]/10 transition duration-200"
>
                <span className="mr-2">
                  📄 Upload Certificates (Multiple files allowed)
                </span>
                <input
                  type="file"
                  name="certificates"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  multiple
                />
              </label>
              {files.certificates.length > 0 && (
                <div className="text-sm text-green-600 mt-2">
                  ✓ {files.certificates.length} certificate(s) selected
                </div>
              )}
            </div>
            <div>
              <select
                name="languageProficiency"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.languageProficiency}
                onChange={(e) => {
                  const options = e.target.options;
                  const selected = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      selected.push(options[i].value);
                    }
                  }
                  setFormData((prev) => ({
                    ...prev,
                    languageProficiency: selected,
                  }));
                }}
                multiple
              >
                <option value="">
                  Language Proficiency (Hold Ctrl/Cmd for multiple)
                </option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="mandarin">Mandarin</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </div>
        {/* //////////////////////////////////////// */}
        <div>
          <h3 className="text-xl font-bold mb-4">Weekly Availability</h3>
          {weeklyAvailability.map((day, index) => (
            <div key={day.day} className="mb-4 border rounded p-4">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={day.isActive}
                  onChange={() => handleToggleDay(index)}
                  className="mr-2"
                />
                <span className="font-semibold">{day.day}</span>
              </label>
              {day.isActive && (
                <div className="space-y-2">
                  {day.timeSlots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex space-x-2">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          handleTimeChange(
                            index,
                            slotIndex,
                            "start",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          handleTimeChange(
                            index,
                            slotIndex,
                            "end",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeTimeSlot(index, slotIndex)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTimeSlot(index)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    + Add time slot
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Availability & Pricing */}
        <div>
          <h3 className="text-xl font-bold mb-4">Availability & Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
            </div>
            <div>
              <input
                type="number"
                name="hourlyRate"
                placeholder="Hourly Rate (₹)"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#3d8e5f] hover:border-[#18664d] transition duration-200"

                value={formData.hourlyRate}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Verification & Documents */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            Document Verification (Required)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-[#3d8e5f]/10 transition duration-200"
>
                <span className="mr-2">📄 Upload Aadhaar Card <span className="text-red-800">*</span></span>
                <input
                  type="file"
                  name="aadhaarCard"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  required
                />
              </label>
              {files.aadhaarCard && (
                <span className="block text-center text-sm text-green-600 mt-1">
                  ✓ {files.aadhaarCard.name}
                </span>
              )}
            </div>
            <div>
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-[#3d8e5f]/10 transition duration-200"
>
                <span className="mr-2">📄 Upload PAN Card <span className="text-red-800">*</span></span>
                <input
                  type="file"
                  name="panCard"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  required
                />
              </label>
              {files.panCard && (
                <span className="block text-center text-sm text-green-600 mt-1">
                  ✓ {files.panCard.name}
                </span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-[#3d8e5f]/10 transition duration-200"
>
                <span className="mr-2">📄 Upload Passport (Optional)</span>
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </label>
              {files.passport && (
                <span className="block text-center text-sm text-green-600 mt-1">
                  ✓ {files.passport.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Terms and Agreements */}
        <div>
          <h3 className="text-xl font-bold mb-4">Terms & Agreements</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <span>I Accept Consultant Terms & Conditions *</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="visibleOnPlatform"
                  checked={formData.visibleOnPlatform}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Consent for Profile Visibility on Platform</span>
              </label>
            </div>
          </div>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="text-red-600 text-center p-4 bg-red-50 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-center p-4 bg-green-50 rounded">
            Application submitted successfully! You will be notified once your
            application is reviewed.
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-900 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </div>
      </motion.div>
    </div>
    
  );
}
