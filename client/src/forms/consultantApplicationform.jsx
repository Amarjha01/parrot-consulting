import React, { useState } from "react";
import { registerAsConsultant } from "../service/consultantApi";

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
    languageProficiency: "",
    availabilityPerWeek: "",
    hourlyRate: "",
    preferredWorkingHours: "",
    bookingLeadTime: "",
    acceptedTerms: false,
    visibleOnPlatform: false,
  });

  const [education, setEducation] = useState([
    { qualification: "", university: "", fieldOfStudy: "", graduationYear: "" },
  ]);

  const [files, setFiles] = useState({
    resume: null,
    profilePicture: null,
    aadhaarCard: null,
    panCard: null,
    passport: null,
    certificates: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (name === "certificates") {
      setFiles((prev) => ({ ...prev, certificates: [...prev.certificates, ...uploadedFiles] }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: uploadedFiles[0] }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addEducationField = () => {
    setEducation([...education, { qualification: "", university: "", fieldOfStudy: "", graduationYear: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      if (key === "specializedServices" || key === "keySkills" || key === "languageProficiency") {
        form.append(key, JSON.stringify(formData[key].split(',').map(i => i.trim())));
      } else {
        form.append(key, formData[key]);
      }
    }

    form.append("education", JSON.stringify(education));

    // Append required files
    form.append("resume", files.resume);
    form.append("profilePicture", files.profilePicture);
    form.append("aadhaarCard", files.aadhaarCard);
    form.append("panCard", files.panCard);
    if (files.passport) form.append("passport", files.passport);

    for (let cert of files.certificates) {
      form.append("certificates", cert);
    }

    try {
      const response = await registerAsConsultant(form);
      console.log("Submitted:", response.data);
      alert("Application submitted!");
    } catch (err) {
      console.error("Submission error:", err.response?.data || err);
      alert("Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleInputChange} required />
      <input name="email" placeholder="Email" onChange={handleInputChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleInputChange} required />
      <input name="phoneNumber" placeholder="Phone" onChange={handleInputChange} required />
      <input name="address" placeholder="Address" onChange={handleInputChange} required />
      <input name="experience" placeholder="Experience (years)" onChange={handleInputChange} required />
      <input name="primaryCategory" placeholder="Primary Category" onChange={handleInputChange} required />
      <input name="specializedServices" placeholder="Specialized Services (comma separated)" onChange={handleInputChange} />
      <input name="keySkills" placeholder="Key Skills (comma separated)" onChange={handleInputChange} />
      <input name="languageProficiency" placeholder="Languages (comma separated)" onChange={handleInputChange} />
      <input name="availabilityPerWeek" placeholder="Availability / week" onChange={handleInputChange} />
      <input name="hourlyRate" placeholder="Hourly Rate" onChange={handleInputChange} />
      <input name="preferredWorkingHours" placeholder="Preferred Hours" onChange={handleInputChange} />
      <input name="bookingLeadTime" placeholder="Booking Lead Time" onChange={handleInputChange} />
      <label>
        <input type="checkbox" name="acceptedTerms" onChange={handleInputChange} /> Accept Terms
      </label>
      <label>
        <input type="checkbox" name="visibleOnPlatform" onChange={handleInputChange} /> Visible on Platform
      </label>

      {/* Education */}
      {education.map((item, index) => (
        <div key={index}>
          <input placeholder="Qualification" value={item.qualification} onChange={(e) => handleEducationChange(index, "qualification", e.target.value)} />
          <input placeholder="University" value={item.university} onChange={(e) => handleEducationChange(index, "university", e.target.value)} />
          <input placeholder="Field of Study" value={item.fieldOfStudy} onChange={(e) => handleEducationChange(index, "fieldOfStudy", e.target.value)} />
          <input placeholder="Graduation Year" value={item.graduationYear} onChange={(e) => handleEducationChange(index, "graduationYear", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addEducationField}>+ Add Education</button>

      {/* File Inputs */}
      <input type="file" name="resume" onChange={handleFileChange} required />
      <input type="file" name="profilePicture" onChange={handleFileChange} required />
      <input type="file" name="aadhaarCard" onChange={handleFileChange} required />
      <input type="file" name="panCard" onChange={handleFileChange} required />
      <input type="file" name="passport" onChange={handleFileChange} />
      <input type="file" name="certificates" onChange={handleFileChange} multiple />

      <button type="submit">Submit for Review</button>
    </form>
  );
}
