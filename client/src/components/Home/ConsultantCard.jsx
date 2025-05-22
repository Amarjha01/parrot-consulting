import React from "react";

export default function MeetExperts() {
  const experts = [
    {
      image: "/api/placeholder/100/100",
      name: "Ethan Rivers",
      designation: "It Manager",
      language: "English",
      available: " Mail and Video -mode: Online or In person",
      location: " Los Angeles",
    },
    {
      image: "/api/placeholder/100/100",
      name: "Ethan Rivers",
      designation: "It Manager",
      language: "English",
      available: " Mail and Video -mode: Online or In person",
      location: " Los Angeles",
    },
    {
      image: "/api/placeholder/100/100",
      name: "Ethan Rivers",
      designation: "It Manager",
      language: "English",
      available: " Mail and Video -mode: Online or In person",
      location: " Los Angeles",
    },
    {
      image: "/api/placeholder/100/100",
      name: "Ethan Rivers",
      designation: "It Manager",
      language: "English",
      available: " Mail and Video -mode: Online or In person",
      location: " Los Angeles",
    },
    {
      image: "/api/placeholder/100/100",
      name: "Ethan Rivers",
      designation: "It Manager",
      language: "English",
      available: " Mail and Video -mode: Online or In person",
      location: " Los Angeles",
    },
    {
      image: "/api/placeholder/100/100",
      name: "Ethan Rivers",
      designation: "It Manager",
      language: "English",
      available: " Mail and Video -mode: Online or In person",
      location: " Los Angeles",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet Our Experts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Your cards here */}

          {experts.map((experts, index) => (
            <div className="bg-gray-50 w-[300px] rounded-2xl p-5 text-center shadow-lg">
              <div className="">
                <div className="flex justify-center mb-2">
                  <img
                    src="https://i.postimg.cc/bryMmCQB/profile-image.jpg"
                    alt="Profile"
                    className="w-[120px] h-auto rounded-full"
                  />
                </div>

                <div>
                  <p className="text-xl font-bold tracking-wide">
                    {experts.name}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {experts.designation}
                  </p>
                  <div className="text-start py-2 text-sm">
                    <p>
                      <strong>Language: </strong>
                      {experts.language}
                    </p>
                    <p>
                      <strong>Available: </strong>
                      {experts.available}
                    </p>
                    <p>
                      <strong>Location: </strong>
                      {experts.location}
                    </p>
                  </div>
                </div>
                <div className="flex justify-around mx-8 text-xl mb-5">
                  <button>
                    <ion-icon name="logo-dribbble"></ion-icon>
                  </button>
                  <button>
                    <ion-icon name="logo-instagram"></ion-icon>
                  </button>
                  <button>
                    <ion-icon name="logo-twitter"></ion-icon>
                  </button>
                  <button>
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </button>
                  <button>
                    <ion-icon name="logo-facebook"></ion-icon>
                  </button>
                  <button>
                    <ion-icon name="logo-behance"></ion-icon>
                  </button>
                </div>
                <div className="flex justify-around mx-8 mt-5 flex-col sm:flex-row gap-2">
                  <button className="w-[130px] h-10 rounded-lg text-teal-800 font-semibold border-1 border-teal-800 bg-transprent hover:bg-teal-900 hover:text-white transition-all duration-300">
                    Message
                  </button>
                  <button className="w-[130px] h-10 rounded-lg text-white bg-teal-800 hover:bg-teal-900 transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
