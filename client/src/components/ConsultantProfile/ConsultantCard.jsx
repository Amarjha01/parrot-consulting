import React from "react";
import { MapPin, Clock, DollarSign, Languages } from "lucide-react";
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
    <div className="bg-gray-50 w-[320px] rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-4">
        <img
          src={
            profilePicture || "https://i.postimg.cc/bryMmCQB/profile-image.jpg"
          }
          alt={`${name}'s profile`}
          className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-md"
          onError={(e) => {
            e.target.src = "https://i.postimg.cc/bryMmCQB/profile-image.jpg";
          }}
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold tracking-wide text-gray-800 mb-1">
          {name}
        </h3>
        <p className="text-sm font-semibold text-teal-700 mb-3">
          {primaryCategory}
        </p>

        <div className="text-left space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <Languages className="w-4 h-4 mt-0.5 text-teal-600" />
            <div>
              <span className="font-semibold">Languages: </span>
              {languageProficiency?.join(", ") || "Not specified"}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 mt-0.5 text-teal-600" />
            <div>
              <span className="font-semibold">Available: </span>
              {availabilityPerWeek}h/week
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-teal-600" />
            <div>
              <span className="font-semibold">Location: </span>
              {address || "Not specified"}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 mt-0.5 text-teal-600" />
            <div>
              <span className="font-semibold">Rate: </span>₹{hourlyRate}/hour
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-teal-800">{experience}</div>
          <div className="text-xs text-gray-600">Years Exp.</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-teal-800">4.8</div>
          <div className="text-xs text-gray-600">Rating</div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
         <Link to={`/consultantprofile/${_id}/${name}`}>
        <button
        
          className="px-6 py-2 rounded-lg text-teal-800 font-semibold border-2 border-teal-800 bg-transparent hover:bg-teal-900 hover:text-white transition-all duration-300"
        >
          View Profile
        </button>
        </Link>
        <button
          onClick={() => onBookNow(consultant)}
          className="px-6 py-2 rounded-lg text-white bg-teal-800 hover:bg-teal-900 transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
