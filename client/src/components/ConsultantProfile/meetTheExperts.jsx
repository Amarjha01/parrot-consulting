import React, { useState } from "react";
import ConsultantCard from "./ConsultantCard"; // make sure path is correct

import ConsultantBookingForm from "../../forms/BookingForm";
import LoginSignupModal from "../../forms/loginSignup";

export default function MeetExperts({ consultants, onViewProfile }) {
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleBookNow = (consultant) => {
    const user = JSON.parse(localStorage.getItem("user"));
   
      setSelectedConsultant(consultant);
      setIsBookingOpen(true); // open booking form

  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet Our Experts
        </h2>

        {consultants.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No consultants available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {consultants.map((consultant) => (
              <ConsultantCard
                key={consultant._id}
                consultant={consultant}
                onViewProfile={onViewProfile}
                onBookNow={handleBookNow} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      <ConsultantBookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedConsultant={selectedConsultant}
      />
      

    </section>
  );
}
