// import React, { useState, useEffect, useMemo } from "react";
// import { Search, ChevronDown, Star, User } from "lucide-react";
// import { globalconsultantdetails } from "../../service/globalApi";
// import ConsultantBookingForm from "../../forms/BookingForm";
// const useAnimation = (isVisible) => ({
//   opacity: isVisible ? 1 : 0,
//   transform: isVisible ? "translateY(0px)" : "translateY(20px)",
//   transition: "all 0.3s ease-in-out",
// });

// const categories = [
//   "All Categories",
//   "IT Consulting",
//   "Business Strategy",
//   "Marketing",
//   "Finance",
//   "Business",
// ];
// const availabilities = ["All Availability", "Available", "Busy"];
// const priceRanges = ["All Prices", "Budget", "Standard", "Premium"];

// const ConsultantCard = ({ consultant, index, onBookNow }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const animationStyle = useAnimation(true);

//   const hoverStyle = {
//     transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
//     boxShadow: isHovered
//       ? "0 8px 25px rgba(0,0,0,0.15)"
//       : "0 2px 10px rgba(0,0,0,0.1)",
//     transition: "all 0.3s ease",
//   };

//   return (
//     <div
//       className="bg-white rounded-lg p-6 border border-gray-200"
//       style={{ ...animationStyle, ...hoverStyle }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="flex items-start space-x-4">
//         <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
//           {consultant.image ? (
//             <img
//               src={consultant.image}
//               alt={consultant.name}
//               className="w-16 h-16 object-cover rounded-full"
//             />
//           ) : (
//             <User className="w-8 h-8 text-gray-600" />
//           )}
//         </div>
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-1">
//             {consultant.name}
//           </h3>
//           <p className="text-sm text-gray-600 mb-2">{consultant.category}</p>
//           <div className="flex items-center mb-3">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 ${
//                   i < Math.floor(consultant.rating)
//                     ? "text-yellow-400 fill-current"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="ml-2 text-sm text-gray-600">
//               {consultant.rating.toFixed(1)}
//             </span>
//           </div>
//           <p className="text-sm text-gray-700 mb-4">{consultant.description}</p>
//           <button
//             className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
//             onClick={() => onBookNow(consultant)}
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FilterDropdown = ({ label, options, value, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label}
//       </label>
//       <div className="relative">
//         <button
//           type="button"
//           className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span className="block truncate">{value}</span>
//           <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//         </button>
//         {isOpen && (
//           <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
//             {options.map((option) => (
//               <button
//                 key={option}
//                 className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
//                 onClick={() => {
//                   onChange(option);
//                   setIsOpen(false);
//                 }}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default function ConsultantSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [selectedAvailability, setSelectedAvailability] =
//     useState("All Availability");
//   const [selectedPrice, setSelectedPrice] = useState("All Prices");
//   const [consultants, setConsultants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isBookingOpen, setBookingOpen] = useState(false);
//   const [selectedConsultant, setSelectedConsultant] = useState(null);

//   useEffect(() => {
//     const fetchConsultants = async () => {
//       setLoading(true);
//       try {
//         const result = await globalconsultantdetails();
//         const transformed = result.data
//   .filter(c => c.visibleOnPlatform)
//   .map(c => ({
//     ...c, // ✅ This keeps _id and other backend-required fields
//     rating: (c.experience / 5) + 3,
//     availability: c.availabilityPerWeek > 0 ? "Available" : "Busy",
//     price:
//       c.hourlyRate <= 500 ? 'Budget' :
//       c.hourlyRate <= 1000 ? 'Standard' : 'Premium',
//   }));


//         setConsultants(transformed);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch consultants.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConsultants();
//   }, []);

//   const filteredConsultants = useMemo(() => {
//     return consultants.filter((consultant) => {
//       const matchesSearch =
//         consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         consultant.description.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory =
//         selectedCategory === "All Categories" ||
//         consultant.category === selectedCategory;
//       const matchesAvailability =
//         selectedAvailability === "All Availability" ||
//         consultant.availability === selectedAvailability;
//       const matchesPrice =
//         selectedPrice === "All Prices" || consultant.price === selectedPrice;

//       return (
//         matchesSearch && matchesCategory && matchesAvailability && matchesPrice
//       );
//     });
//   }, [
//     searchTerm,
//     selectedCategory,
//     selectedAvailability,
//     selectedPrice,
//     consultants,
//   ]);

//   const handleBookNow = (consultant) => {
//     setSelectedConsultant(consultant);
//     setBookingOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
//           <div className="relative mb-6">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search consultants..."
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex gap-8">
//           <div className="w-64 flex-shrink-0">
//             <div className="bg-white rounded-lg p-6 border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">
//                 Filters
//               </h2>
//               <div className="space-y-6">
//                 <FilterDropdown
//                   label="Category"
//                   options={categories}
//                   value={selectedCategory}
//                   onChange={setSelectedCategory}
//                 />
//                 <FilterDropdown
//                   label="Availability"
//                   options={availabilities}
//                   value={selectedAvailability}
//                   onChange={setSelectedAvailability}
//                 />
//                 <FilterDropdown
//                   label="Price"
//                   options={priceRanges}
//                   value={selectedPrice}
//                   onChange={setSelectedPrice}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex-1">
//             {loading ? (
//               <div className="text-center py-12 text-gray-500">
//                 Loading consultants...
//               </div>
//             ) : error ? (
//               <div className="text-center py-12 text-red-500">{error}</div>
//             ) : filteredConsultants.length === 0 ? (
//               <div className="text-center py-12 text-gray-500">
//                 No consultants found matching your criteria.
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {filteredConsultants.map((consultant, index) => (
//                   <ConsultantCard
//                     key={consultant.id}
//                     consultant={consultant}
//                     index={index}
//                     onBookNow={handleBookNow} // ✅ working button
//                   />
//                 ))}
//                 {/* Booking Modal */}
//                 <ConsultantBookingForm
//                   isOpen={isBookingOpen}
//                   onClose={() => setBookingOpen(false)}
//                   preSelectedConsultant={selectedConsultant}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, Star, User } from "lucide-react";
import { globalconsultantdetails } from "../../service/globalApi";
import ConsultantBookingForm from "../../forms/BookingForm";

const useAnimation = (isVisible) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateY(0px)" : "translateY(20px)",
  transition: "all 0.3s ease-in-out",
});

const categories = [
  "All Categories",
  "IT Consulting",
  "Business Strategy",
  "Marketing",
  "Finance",
  "Business",
];
const availabilities = ["All Availability", "Available", "Busy"];
const priceRanges = ["All Prices", "Budget", "Standard", "Premium"];

// const ConsultantCard = ({ consultant, index, onBookNow }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const animationStyle = useAnimation(true);

//   const hoverStyle = {
//     transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
//     boxShadow: isHovered
//       ? "0 8px 25px rgba(0,0,0,0.15)"
//       : "0 2px 10px rgba(0,0,0,0.1)",
//     transition: "all 0.3s ease",
//   };

//   return (
//     <div
//       className="bg-white rounded-lg p-6 border border-gray-200"
//       style={{ ...animationStyle, ...hoverStyle }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="flex items-start space-x-4">
//         <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
//           {consultant.image ? (
//             <img
//               src={consultant.image}
//               alt={consultant.name}
//               className="w-16 h-16 object-cover rounded-full"
//             />
//           ) : (
//             <User className="w-8 h-8 text-gray-600" />
//           )}
//         </div>
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-1">
//             {consultant.name}
//           </h3>
//           <p className="text-sm text-gray-600 mb-2">{consultant.category}</p>
//           <div className="flex items-center mb-3">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 ${
//                   i < Math.floor(consultant.rating)
//                     ? "text-yellow-400 fill-current"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="ml-2 text-sm text-gray-600">
//               {consultant.rating.toFixed(1)}
//             </span>
//           </div>
//           <p className="text-sm text-gray-700 mb-4">{consultant.description}</p>
//           <button
//             className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
//             onClick={() => onBookNow(consultant)}
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const ConsultantCard = ({ consultant, index, onBookNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const animationStyle = useAnimation(true);

  const hoverStyle = {
    transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
    boxShadow: isHovered
      ? "0 8px 25px rgba(0,0,0,0.15)"
      : "0 2px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ ...animationStyle, ...hoverStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
          {consultant.profilePicture ? (
            <img
              src={consultant.profilePicture}
              alt={consultant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://i.postimg.cc/bryMmCQB/profile-image.jpg";
              }}
            />
          ) : (
            <User className="w-8 h-8 text-gray-600 mx-auto mt-4" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">
            {consultant.name}
          </h3>
          <p className="text-sm text-teal-700 font-medium mb-1 capitalize">
            {consultant.primaryCategory}
          </p>
          <p className="text-xs text-gray-500 mb-2">{consultant.email}</p>
          <p className="text-xs text-gray-500 mb-2">*******{consultant.phoneNumber.toString().slice(-3)}</p>
          <p className="text-xs text-gray-500 mb-2">{consultant.address}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(consultant.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {consultant.rating?.toFixed(1)}
            </span>
          </div>

          <button
            className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 cursor-pointer"
            onClick={() => onBookNow(consultant)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">{value}</span>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ConsultantSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedAvailability, setSelectedAvailability] =
    useState("All Availability");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      setLoading(true);
      try {
        const result = await globalconsultantdetails();
        console.log("Consultants fetched:", result);
        
        const transformed = result.data
          .filter((c) => c.visibleOnPlatform)
          .map((c) => ({
            ...c,
            rating: (c.experience / 5) + 3,
            availability: c.availabilityPerWeek > 0 ? "Available" : "Busy",
            price:
              c.hourlyRate <= 500
                ? "Budget"
                : c.hourlyRate <= 1000
                ? "Standard"
                : "Premium",
          }));

        setConsultants(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch consultants.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const filteredConsultants = useMemo(() => {
    return consultants.filter((consultant) => {
      const matchesSearch =
        consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        consultant.category === selectedCategory;
      const matchesAvailability =
        selectedAvailability === "All Availability" ||
        consultant.availability === selectedAvailability;
      const matchesPrice =
        selectedPrice === "All Prices" || consultant.price === selectedPrice;

      return (
        matchesSearch && matchesCategory && matchesAvailability && matchesPrice
      );
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedAvailability,
    selectedPrice,
    consultants,
  ]);

  const handleBookNow = (consultant) => {
    setSelectedConsultant(consultant);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Search
          </h1>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search consultants..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 w-full">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h2>
              <div className="space-y-6">
                <FilterDropdown
                  label="Category"
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
                <FilterDropdown
                  label="Availability"
                  options={availabilities}
                  value={selectedAvailability}
                  onChange={setSelectedAvailability}
                />
                <FilterDropdown
                  label="Price"
                  options={priceRanges}
                  value={selectedPrice}
                  onChange={setSelectedPrice}
                />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading consultants...
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : filteredConsultants.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No consultants found matching your criteria.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredConsultants.map((consultant, index) => (
                    <ConsultantCard
                      key={consultant._id}
                      consultant={consultant}
                      index={index}
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal Outside Layout */}
      <ConsultantBookingForm
        isOpen={isBookingOpen}
        onClose={() => setBookingOpen(false)}
        preSelectedConsultant={selectedConsultant}
      />
    </div>
  );
}
