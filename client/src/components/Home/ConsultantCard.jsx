
import React from "react";



export default function MeetExperts() {
    const experts = [
      {
        name: 'Alice Martin',
        title: 'IT Consultant',
        description: 'Specialized in payroll development and IT strategy',
        image: '/api/placeholder/100/100'
      },
      {
        name: 'Anna Gomez',
        title: 'Ecommerce Consultant',
        description: 'Expert in handling online presence for businesses',
        image: '/api/placeholder/100/100'
      }
    ];
  
    return (
      <section className="py-12 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((expert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
                <img src={expert.image} alt={expert.name} className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6" />
                <div>
                  <h3 className="text-xl font-bold">{expert.name}</h3>
                  <p className="text-gray-600 mb-2">{expert.title}</p>
                  <p className="text-gray-700 mb-4">{expert.description}</p>
                  <button className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }