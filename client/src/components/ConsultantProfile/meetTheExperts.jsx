import React, { useState } from "react";
import ConsultantCard from "./ConsultantCard";
import ConsultantBookingForm from "../../forms/BookingForm";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
export default function MeetExperts({ consultants, onViewProfile }) {
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = (consultant) => {
    const user = JSON.parse(localStorage.getItem("user"));
    setSelectedConsultant(consultant);
    setIsBookingOpen(true);
  };

  return (
    <section className="py-12 bg-white">
    
      <div className="px-4 overflow-hidden relative">
        <Link to={'/ViewAllConsultants'}>
      <div
  className="absolute right-5 group cursor-pointer px-3 py-1.5 md:px-6 md:py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 overflow-hidden"
  style={{
    backgroundColor: '#2c7951',
    borderColor: '#1c7259',
  }}
>
  <div className="flex items-center gap-2 relative z-10">
    <Eye className="w-4 h-4 text-white"  />
    <span
      className="font-bold tracking-wide text-sm uppercase text-white"
      
    >
      VIEW ALL
    </span>
    <ArrowRight
      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 text-white"
      
    />
  </div>

  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
</div>

        </Link>
    
        <h2 className="text-xl font-bold md:text-3xl mb-12">
          Meet Our Experts
        </h2>

        {consultants.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No consultants available at the moment.
          </div>
        ) : (
          <div className="relative overflow-hidden w-full">
            <style>{marqueeStyle}</style>
           <div className="marquee gap-6">
              {[...consultants, ...consultants].map((consultant, index) => (
                <div key={index}>
                  <ConsultantCard
                    consultant={consultant}
                    onViewProfile={onViewProfile}
                    onBookNow={handleBookNow}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConsultantBookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedConsultant={selectedConsultant}
      />
    </section>
  );
}

const marqueeStyle = `
  @keyframes scroll-left {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .marquee {
    animation: scroll-left 30s linear infinite;
    display: flex;
    width: max-content;
  }
`;
