import React from "react";
import { MapPin, Clock, IndianRupee, Languages, Star, Badge, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function ConsultantCard({
  consultant,
  onBookNow,
}) {
  const {
    name,
    primaryCategory,
    languageProficiency,
    address,
    profilePicture,
    hourlyRate,
    experience,
    availabilityPerWeek,
    _id
  } = consultant;

  return (
    <div className="relative bg-white w-[320px] rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group">
      
      {/* Offer Tag */}
      <div className="absolute -top-1 -right-2.5 z-10">
        <div className="bg-gradient-to-r from-[#348559] via-[#09533d] to-[#113a39] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 flex items-center gap-1 animate-pulse">
          <Zap size={12} className="text-yellow-300" />
          FREE
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#348559]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Profile Section */}
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={
                profilePicture || "https://i.postimg.cc/bryMmCQB/profile-image.jpg"
              }
              alt={`${name}'s profile`}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gradient-to-r from-[#348559] to-[#09533d] shadow-xl group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://i.postimg.cc/bryMmCQB/profile-image.jpg";
              }}
            />
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#348559] to-[#09533d] rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Name and Category */}
        <div className="mb-6">
          <h3 className="text-xl font-bold tracking-wide text-gray-800 mb-2 group-hover:text-[#348559] transition-colors duration-300">
            {name}
          </h3>
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#348559]/10 to-[#09533d]/10 px-3 py-1 rounded-full">
            <Badge size={14} className="text-[#348559]" />
            <span className="text-sm font-semibold text-[#348559]">
              {primaryCategory}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white rounded-lg p-2">
              <Languages className="w-4 h-4 text-[#348559] flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-gray-800 text-xs">Languages</div>
                <div className="text-gray-600 text-xs truncate">
                  {languageProficiency?.slice(0, 2).join(", ") || "English"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-lg p-2">
              <Clock className="w-4 h-4 text-[#348559] flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-gray-800 text-xs">Available</div>
                <div className="text-gray-600 text-xs">
                  {availabilityPerWeek || '10'}h/week
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-lg p-2">
              <MapPin className="w-4 h-4 text-[#348559] flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-gray-800 text-xs">Location</div>
                <div className="text-gray-600 text-xs truncate">
                  {address?.split(',')[0] || "Remote"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-lg p-2">
              <IndianRupee className="w-4 h-4 text-[#348559] flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-gray-800 text-xs">Rate</div>
                <div className="text-gray-600 text-xs "><s>₹{hourlyRate}/hour</s> FREE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#348559] to-[#09533d] bg-clip-text text-transparent">
              {experience}
            </div>
            <div className="text-xs text-gray-600 font-medium">Years Exp.</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              4.8
              <Star size={16} fill="currentColor" />
            </div>
            <div className="text-xs text-gray-600 font-medium">Rating</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link to={`/consultantprofile/${_id}/${name}`} className="flex-1">
            <button className="w-full px-4 py-3 rounded-xl text-[#348559] font-semibold border-2 border-[#348559] bg-transparent hover:bg-[#348559] hover:text-white transition-all duration-300 transform hover:scale-105">
              View Profile
            </button>
          </Link>
          
          <button
            onClick={() => onBookNow(consultant)}
            className="flex-1 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-[#348559] via-[#09533d] to-[#113a39] hover:from-[#09533d] hover:to-[#113a39] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}