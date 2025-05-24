import React from "react";
import ConsultantCard from "./ConsultantCard";


export default function MeetExperts({ consultants, onViewProfile }) {
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
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }