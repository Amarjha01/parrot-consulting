// import React, { useState, useEffect } from "react";
// import { Home, MessageCircle, Settings, LogOut, Star, Menu, X } from "lucide-react";
// import { seeBooking, logoutUSer } from "../service/userApi";

// const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
//   const menuItems = [
//     { id: "dashboard", icon: Home, label: "Dashboard" },
//     { id: "messages", icon: MessageCircle, label: "Messages" },
//     { id: "settings", icon: Settings, label: "Settings" },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 h-screen shadow-2xl flex flex-col border-r border-gray-800
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         {/* Logo */}
//         <div className="p-4 sm:p-6 border-b border-gray-800">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
//                 <div className="w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full"></div>
//               </div>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
//                 <span className="font-bold text-lg sm:text-xl text-white">PARROT</span>
//                 <span className="text-xs sm:text-sm text-green-400 font-medium">CONSULT</span>
//               </div>
//             </div>
//             {/* Close button for mobile */}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="lg:hidden p-1 text-gray-400 hover:text-white"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-3 sm:p-4">
//           <ul className="space-y-2 sm:space-y-3">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => {
//                       setActiveTab(item.id);
//                       setIsOpen(false); // Close mobile menu on selection
//                     }}
//                     className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-left transition-all duration-300 ${
//                       activeTab === item.id
//                         ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
//                         : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
//                     }`}
//                   >
//                     <Icon size={18} className="sm:w-5 sm:h-5" />
//                     <span className="font-medium text-sm sm:text-base">{item.label}</span>
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout */}
//         <div className="p-3 sm:p-4 border-t border-gray-800">
//           <button
//             onClick={async () => {
//               try {
//                 await logoutUSer();
//                 // Clear localStorage and redirect or handle logout
//                 localStorage.removeItem('user');
//                 window.location.href = '/login'; // or use your routing method
//               } catch (error) {
//                 console.error('Logout failed:', error);
//               }
//             }}
//             className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded-xl transition-all duration-300"
//           >
//             <LogOut size={18} className="sm:w-5 sm:h-5" />
//             <span className="font-medium text-sm sm:text-base">Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// // Booking Card Component
// const BookingCard = ({ booking }) => {
//   return (
//     <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
//       <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
//         <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
//           <div className="relative flex-shrink-0">
//             <img
//               src={booking.avatar}
//               alt={booking.consultantName}
//               className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover border-2 border-green-500"
//             />
//             <div className="absolute -bottom-1 -right-1 w-3 sm:w-5 h-3 sm:h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-base sm:text-lg text-white mb-1 truncate">
//               {booking.consultantName}
//             </h3>
//             <p className="text-green-400 text-xs sm:text-sm font-medium truncate">{booking.service}</p>
//             <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
//               <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
//               <span className="truncate">{booking.date} at {booking.time}</span>
//             </p>
//           </div>
//         </div>
//         <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-xs sm:text-sm font-medium shadow-lg hover:shadow-green-500/25 w-full sm:w-auto whitespace-nowrap">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// // Rating Component
// const RatingSection = () => {
//   const [rating, setRating] = useState(5);
//   const [feedback, setFeedback] = useState("");

//   const handleSubmit = () => {
//     console.log("Rating:", rating, "Feedback:", feedback);
//     setFeedback("");
//   };

//   return (
//     <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
//       <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
//         <Star className="text-yellow-400 mr-2" size={20} />
//         Leave a Rating
//       </h2>

//       <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
//         <div className="relative flex-shrink-0">
//           <img
//             src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
//             alt="Maria Smith"
//             className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-green-500"
//           />
//           <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
//         </div>
//         <div className="flex-1 min-w-0">
//           <h3 className="font-medium text-white text-sm sm:text-base truncate">Maria Smith</h3>
//           <div className="flex space-x-1 mt-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 onClick={() => setRating(star)}
//                 className="focus:outline-none transition-transform hover:scale-110"
//               >
//                 <Star
//                   size={16}
//                   className={`sm:w-5 sm:h-5 ${
//                     star <= rating
//                       ? "text-yellow-400 fill-current"
//                       : "text-gray-600 hover:text-gray-500"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <textarea
//         value={feedback}
//         onChange={(e) => setFeedback(e.target.value)}
//         placeholder="Enter your feedback..."
//         className="w-full p-3 sm:p-4 bg-gray-800 border border-gray-700 rounded-xl resize-none h-20 sm:h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
//       />

//       <button
//         onClick={handleSubmit}
//         className="mt-3 sm:mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-lg hover:shadow-green-500/25 w-full sm:w-auto text-sm sm:text-base"
//       >
//         Submit Rating
//       </button>
//     </div>
//   );
// };

// // Main Dashboard Component
// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [bookings, setBookings] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     // Get user data from localStorage
//     const storedUserData = localStorage.getItem('user');
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }

//     const fetchBookings = async () => {
//       try {
//         const data = await seeBooking();
//         console.log("Fetched booking response:", data);
//         setBookings(data.data);
//       } catch (err) {
//         console.error("Failed to fetch bookings:", err.response?.data || err.message);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black flex">
//       {/* Sidebar */}
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//       />

//       {/* Main Content */}
//       <div className="flex-1 min-w-0 lg:ml-0">
//         {/* Header */}
//         <div className="bg-gray-900 shadow-2xl border-b border-gray-800 px-4 sm:px-6 py-4 sm:py-6">
//           <div className="flex items-center justify-between">
//             <div className="min-w-0 flex-1">
//               <p className="text-xs sm:text-sm text-green-400 font-medium">After signup</p>
//               <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 truncate">
//                 User Dashboard
//               </h1>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
//             >
//               <Menu className="w-6 h-6 text-green-400" />
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="p-4 sm:p-6 bg-gradient-to-br from-black to-gray-900 min-h-screen">
//           <div className="max-w-4xl mx-auto">
//             {/* Welcome Message */}
//             <div className="mb-6 sm:mb-8">
//               <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
//                 Welcome back, {userData?.name || 'User'}! 👋
//               </h2>
//               <p className="text-gray-400 text-sm sm:text-base">Here's what's happening with your consultations today.</p>
//               {userData?.email && (
//                 <p className="text-green-400 text-xs sm:text-sm mt-1 break-all">📧 {userData.email}</p>
//               )}
//             </div>

//             {/* Upcoming Bookings */}
//             <div className="mb-6 sm:mb-8">
//               <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
//                 <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full mr-2 sm:mr-3"></div>
//                 Upcoming Bookings
//               </h3>
//               <div className="space-y-3 sm:space-y-4">
//                 {Array.isArray(bookings) && bookings.length > 0 ? (
//                   bookings.map((booking) => (
//                     <BookingCard
//                       key={booking._id}
//                       booking={{
//                         consultantName:
//                           booking.consultant?.name || "Unknown Consultant",
//                         service: booking.projectDetails || "Consulting",
//                         date: new Date(booking.datetime).toLocaleDateString(),
//                         time: new Date(booking.datetime).toLocaleTimeString(
//                           [],
//                           { hour: "2-digit", minute: "2-digit" }
//                         ),
//                         avatar:
//                           booking.consultant?.profilePicture ||
//                           "https://via.placeholder.com/150",
//                       }}
//                     />
//                   ))
//                 ) : (
//                   <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 text-center border border-gray-800">
//                     <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                       <MessageCircle className="text-green-400" size={24} />
//                     </div>
//                     <p className="text-gray-400 text-base sm:text-lg">No scheduled bookings found.</p>
//                     <p className="text-gray-500 text-xs sm:text-sm mt-2">Your upcoming consultations will appear here.</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Rating Section */}
//             <RatingSection />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from "react";
import { seeBooking } from "../service/userApi";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await seeBooking(); // ⬅️ use this
        console.log("Bookings fetched:", res);
        setBookings(res.data || res); // depends on how your API wraps the data
      } catch (error) {
        console.error("Booking fetch failed:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Your Sessions</h2>
      <div className="grid grid-cols-1 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p className="text-gray-400">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;

// ----------------- Booking Card Component -----------------

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const [canJoin, setCanJoin] = useState(false);

  useEffect(() => {
    const checkJoinWindow = () => {
      const now = new Date();
      const startTime = new Date(booking.datetime);
      const endTime = new Date(
        startTime.getTime() + (booking.duration || 30) * 60000
      );
      const openTime = new Date(startTime.getTime() - 2 * 60000); // 2 minutes before start
      console.log("typeof booking.datetime:", typeof booking.datetime);

      console.log("Now:        ", now.toISOString());
      console.log("Start Time: ", startTime.toISOString());
      console.log("End Time:   ", endTime.toISOString());
      console.log("Open Time:  ", openTime.toISOString());

      // const canJoin = now >= openTime && now <= endTime;
      const canJoin = true; // force it for test

      console.log("Can Join?   ", canJoin);
      setCanJoin(canJoin);
    };

    checkJoinWindow();
    const interval = setInterval(checkJoinWindow, 15000);
    return () => clearInterval(interval);
  }, [booking.datetime, booking.duration]);

  const handleJoin = () => {
    navigate(`/meeting/${booking._id}`);
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
          <div className="relative flex-shrink-0">
            <img
              src={
                booking.consultant?.profilePicture ||
                "https://via.placeholder.com/150"
              }
              alt={booking.consultant?.name}
              className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover border-2 border-green-500"
            />
            <div className="absolute -bottom-1 -right-1 w-3 sm:w-5 h-3 sm:h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-white mb-1 truncate">
              {booking.consultant?.name || "Unknown Consultant"}
            </h3>
            <p className="text-green-400 text-xs sm:text-sm font-medium truncate">
              {booking.projectDetails || "Consultation"}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="truncate">
                {new Date(booking.datetime).toLocaleDateString()} at{" "}
                {new Date(booking.datetime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
        </div>

        {canJoin ? (
          <button
            onClick={() => navigate(`/meeting/${booking._id}`)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl"
          >
            Join Meeting
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-800 text-gray-500 px-4 py-2 rounded-xl"
          >
            Not Available Yet
          </button>
        )}
      </div>
    </div>
  );
};
