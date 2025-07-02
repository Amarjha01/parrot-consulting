import React, { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  Languages,
  Star,
  Badge,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ConsultantCard({ consultant, onBookNow }) {
  const {
    name,
    primaryCategory,
    languageProficiency,
    address,
    profilePicture,
    hourlyRate,
    experience,
    availabilityPerWeek,
    _id,
  } = consultant;

  return (
    <div className="relative bg-white w-[280px] rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
      {/* Offer Tag */}
      <div className="absolute -top-1 -right-2 z-10">
        <div className="bg-gradient-to-r from-[#348559] via-[#09533d] to-[#113a39] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg rotate-12 flex items-center gap-1 animate-pulse">
          <Zap size={10} className="text-yellow-300" />
          FREE
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative z-10">
        <div className="flex justify-center mb-3">
          <div className="relative">
            <img
              src={
                profilePicture ||
                "https://i.postimg.cc/bryMmCQB/profile-image.jpg"
              }
              alt={`${name}'s profile`}
              className="w-[90px] h-[90px] rounded-full object-cover border-2 border-[#348559] shadow-md group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://i.postimg.cc/bryMmCQB/profile-image.jpg";
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#348559] to-[#09533d] rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Name and Category */}
        <div className="mb-4">
          <h3 className="text-lg font-bold tracking-wide text-gray-800 mb-1 group-hover:text-[#348559] transition-colors duration-300">
            {name}
          </h3>
          <div className="inline-flex items-center gap-1 bg-[#348559]/10 px-2 py-0.5 rounded-full text-xs font-medium text-[#348559]">
            <Badge size={12} />
            {primaryCategory}
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 bg-white rounded p-2">
              <Languages size={14} className="text-[#348559]" />
              <div>
                <div className="font-medium text-gray-800 text-[10px]">Languages</div>
                <div className="text-gray-600 truncate">{languageProficiency?.slice(0, 2).join(", ") || "English"}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white rounded p-2">
              <Clock size={14} className="text-[#348559]" />
              <div>
                <div className="font-medium text-gray-800 text-[10px]">Available</div>
                <div className="text-gray-600">{availabilityPerWeek || "10"}h/week</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white rounded p-2">
              <MapPin size={14} className="text-[#348559]" />
              <div>
                <div className="font-medium text-gray-800 text-[10px]">Location</div>
                <div className="text-gray-600 truncate">
                  {address?.split(",")[0] || "Remote"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white rounded p-2">
              <IndianRupee size={14} className="text-[#348559]" />
              <div>
                <div className="font-medium text-gray-800 text-[10px]">Rate</div>
                <div className="text-gray-600"><s>₹{hourlyRate}/hr</s> FREE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold bg-gradient-to-r from-[#348559] to-[#09533d] bg-clip-text text-transparent">
              {experience}
            </div>
            <div className="text-gray-600 text-[10px]">Years Exp.</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-500">
              4.8
              <Star size={14} fill="currentColor" />
            </div>
            <div className="text-gray-600 text-[10px]">Rating</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/consultantprofile/${_id}/${name}`} className="flex-1">
            <button className="w-full px-3 py-2 rounded-lg text-[#348559] font-medium border border-[#348559] text-sm hover:bg-[#348559] hover:text-white transition-all duration-200">
              View
            </button>
          </Link>
          <button
            onClick={() => onBookNow(consultant)}
            className="flex-1 px-3 py-2 rounded-lg text-white text-sm bg-gradient-to-r from-[#348559] via-[#09533d] to-[#113a39] hover:from-[#09533d] hover:to-[#113a39] transition-all duration-200"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
