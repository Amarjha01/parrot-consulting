import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  Mail,
  Phone,
  BookOpen,
  Award,
  Languages,
  Briefcase,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { viewSingleConsultant } from "../../service/globalApi";
export default function ConsultantDetailView({}) {
  const { id } = useParams();
  const [consultants, setConsultants] = useState();

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await viewSingleConsultant(id);
        setConsultants(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch consultants");
        console.error("Error fetching consultants:", err);
      }
    };

    fetchConsultants();
  }, [id]);

  if (!consultants) return <div>Loading...</div>;
  const {
    name,
    email,
    phoneNumber,
    address,
    experience,
    profilePicture,
    primaryCategory,
    specializedServices,
    keySkills,
    languageProficiency,
    availabilityPerWeek,
    hourlyRate,
    preferredWorkingHours,
    bookingLeadTime,
    education,
    certificates,
  } = consultants;
  return (
    <div className=" h-fit w-full flex justify-center items-center">
      <div className="  w-full z-30  mx-auto p-8 m-4 bg-white">
        {/* Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Consultant Profile
          </h1>
        </div>

        {/* Main Profile Section */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8">
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative">
    {/* Profile Image */}
    <div className="flex-shrink-0">
      <img
        src={
          profilePicture ||
          "https://i.postimg.cc/bryMmCQB/profile-image.jpg"
        }
        alt={`${name}'s profile`}
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg"
        onError={(e) => {
          e.target.src = "https://i.postimg.cc/bryMmCQB/profile-image.jpg";
        }}
      />
    </div>

    {/* Info + Buttons */}
    <div className="flex-1 w-full text-center md:text-left">
      {/* Buttons - Responsive placement */}
      <div className="mt-6 md:mt-0 md:absolute md:right-6 md:top-6 flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4 w-full md:w-auto">
        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-teal-800 text-white rounded-lg hover:bg-teal-900 transition-colors font-semibold text-sm sm:text-base">
          Book Consultation
        </button>
        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-teal-800 text-teal-800 rounded-lg hover:bg-teal-800 hover:text-white transition-colors font-semibold text-sm sm:text-base">
          Send Message
        </button>
      </div>

      {/* Name & Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 md:mt-0">
        {name}
      </h2>
      <p className="text-lg sm:text-xl text-teal-700 font-semibold mb-4">
        {primaryCategory}
      </p>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm sm:text-base">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Mail className="w-5 h-5 text-teal-600" />
          <span className="text-gray-600">{email}</span>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Phone className="w-5 h-5 text-teal-600" />
          <span className="text-gray-600">{phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <MapPin className="w-5 h-5 text-teal-600" />
          <span className="text-gray-600">{address}</span>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Briefcase className="w-5 h-5 text-teal-600" />
          <span className="text-gray-600">{experience} years experience</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        <div className="bg-white px-4 py-2 rounded-lg shadow text-center w-28">
          <div className="text-xl sm:text-2xl font-bold text-teal-800">
            ₹{hourlyRate}
          </div>
          <div className="text-sm text-gray-600">per hour</div>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow text-center w-28">
          <div className="text-xl sm:text-2xl font-bold text-teal-800">
            {availabilityPerWeek}h
          </div>
          <div className="text-sm text-gray-600">per week</div>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow text-center w-28">
          <div className="text-xl sm:text-2xl font-bold text-teal-800">4.8</div>
          <div className="text-sm text-gray-600">rating</div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Specialized Services */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-teal-600" />
              Specialized Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {specializedServices?.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Key Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {keySkills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5 text-teal-600" />
              Language Proficiency
            </h3>
            <div className="flex flex-wrap gap-2">
              {languageProficiency?.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              Availability
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Working Hours:</span>{" "}
                {preferredWorkingHours}
              </p>
              <p>
                <span className="font-semibold">Lead Time:</span>{" "}
                {bookingLeadTime}
              </p>
              <p>
                <span className="font-semibold">Hours/Week:</span>{" "}
                {availabilityPerWeek} hours
              </p>
            </div>
          </div>
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-gray-800">
                    {edu.qualification}
                  </h4>
                  <p className="text-gray-600">{edu.university}</p>
                  <p className="text-sm text-gray-500">
                    {edu.fieldOfStudy} • {edu.graduationYear}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Certificates
            </h3>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-800">{cert.name}</span>
                  {cert.fileUrl && (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
