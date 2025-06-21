// import Logo from "./logo";
// import ConsultantApplicationForm from "../../forms/consultantApplicationform"; // Adjust the path if needed
// import React, { useState } from "react";

// export default function Navbar() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <>
//       <nav className="py-4 px-6 flex items-center justify-between bg-amber-100 shadow-sm">
//         <div className="flex items-center">
//           <Logo />
//           <div className="ml-12 hidden md:flex space-x-6">
//             <a href="#" className="text-gray-800 hover:text-green-800">Categories</a>
//             <a href="#" className="text-gray-800 hover:text-green-800">How It Works</a>
//             <a href="#" className="text-gray-800 hover:text-green-800">About</a>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-green-800 text-white px-5 py-2 rounded-full hover:bg-green-900 transition"
//         >
//           Sign In
//         </button>
//       </nav>

//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg w-full max-w-4xl relative">
//             <button
//               className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600"
//               onClick={() => setShowForm(false)}
//             >
//               ×
//             </button>
//             <ConsultantApplicationForm />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import Logo from "./logo";
// import ConsultantApplicationForm from "../../forms/consultantApplicationform";
// // import LoginSignupModal from "./LoginSignupModal"; // You'll need to create this
// import React, { useState } from "react";
// import LoginSignupModal from "../../forms/loginSignup";

// export default function Navbar() {
//   const [showConsultantForm, setShowConsultantForm] = useState(false);
//   const [showLoginSignup, setShowLoginSignup] = useState(false);

//   return (
//     <>
//       <nav className="relative">
//         {/* Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50"></div>

//         {/* Glass Effect Overlay */}
//         <div className="relative backdrop-blur-sm bg-white/70 border-b border-white/20 shadow-lg">
//           <div className="py-4 px-6 flex items-center justify-between">

//             {/* Left Side - Logo and Navigation */}
//             <div className="flex items-center">
//               <div className="transform hover:scale-105 transition-transform duration-300">
//                 <Logo />
//               </div>

//               <div className="ml-12 hidden md:flex space-x-8">
//                 <a
//                   href="#"
//                   className="relative text-gray-800 hover:text-green-700 font-medium transition-all duration-300 group"
//                 >
//                   Categories
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//                 <a
//                   href="#"
//                   className="relative text-gray-800 hover:text-green-700 font-medium transition-all duration-300 group"
//                 >
//                   How It Works
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//                 <a
//                   href="#"
//                   className="relative text-gray-800 hover:text-green-700 font-medium transition-all duration-300 group"
//                 >
//                   About
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               </div>
//             </div>

//             {/* Right Side - Action Buttons */}
//             <div className="flex items-center space-x-4">
//               {/* Login/Signup Button */}
//               <button
//                 onClick={() => setShowLoginSignup(true)}
//                 className="relative overflow-hidden px-6 py-2.5 text-green-700 font-semibold border-2 border-green-600 rounded-full hover:text-white transition-all duration-300 group"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
//                 <span className="relative flex items-center space-x-2">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   <span>Login / Sign Up</span>
//                 </span>
//               </button>

//               {/* Become a Consultant Button */}
//               <button
//                 onClick={() => setShowConsultantForm(true)}
//                 className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                 <span className="relative flex items-center space-x-2">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
//                   </svg>
//                   <span>Become a Consultant</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Button - Hidden for now, can be implemented later */}
//         <div className="md:hidden absolute right-4 top-4">
//           <button className="text-gray-800 hover:text-green-700 transition-colors">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </nav>

//       {/* Consultant Application Form Modal */}
//       {showConsultantForm && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl w-full max-w-4xl relative animate-fadeIn">
//             <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-white">Become a Consultant</h2>
//                 <button
//                   className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
//                   onClick={() => setShowConsultantForm(false)}
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="p-6">
//               <ConsultantApplicationForm />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Login/Signup Modal */}
//       {showLoginSignup && (
//         <LoginSignupModal
//           isOpen={showLoginSignup}
//           onClose={() => setShowLoginSignup(false)}
//         />
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./logo";
import ConsultantApplicationForm from "../../forms/consultantApplicationform";
import LoginSignupModal from "../../forms/loginSignup";

export default function Navbar() {
  const navigate = useNavigate();
  const [showConsultantForm, setShowConsultantForm] = useState(false);
  const [showLoginSignup, setShowLoginSignup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // for mobile toggle

  useEffect(() => {
    const consultant = localStorage.getItem("consultant");
    const user = localStorage.getItem("user");
    if (consultant) setUserRole("consultant");
    else if (user) setUserRole("user");
    else setUserRole(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("consultant");
    localStorage.removeItem("admin");
    setUserRole(null);
    navigate("/");
  };

  const handleDashboardRedirect = () => {
    if (userRole === "consultant") navigate("/ConsultantDashboard");
    else if (userRole === "user") navigate("/userdashboard");
  };

  return (
    <>
      <nav className="relative z-50">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60"></div>
        </div>

        {/* Main navbar container */}
        <div className="relative backdrop-blur-md bg-white/80 border-b border-emerald-100/50 shadow-xl">
          <div className="max-w-7xl mx-auto">
            <div className="py-5 px-2 flex items-center justify-between">
              {/* Left Side - Logo */}
              <div className="flex items-center flex-shrink-0">
                <div className="transform hover:scale-110 transition-all duration-300 drop-shadow-lg rounded-full bg-yellow-100" >
                  <img
                    src="/parrot1.png" // 👈 path is relative to /public
                    alt="Logo"
                    className="h-15 w-auto" // adjust size as needed
                  />
                </div>
              </div>

              {/* Center - Navigation Links (Desktop) */}
              <div className="hidden lg:flex items-center justify-center flex-1 ml-12">
                {/* <div className="flex items-center space-x-10">
                  {["Categories", "How It Works", "About"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="relative text-gray-700 hover:text-emerald-600 font-semibold text-lg transition-all duration-300 group py-2 px-4 rounded-xl hover:bg-emerald-50/80"
                    >
                      {item}
                      <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </a>
                  ))}
                </div> */}
                <div className="flex items-center space-x-10">
                  {["Categories", "How It Works", "About"].map((item) => {
                    let path = "#";
                    if (item === "How It Works") path = "/howitworks";
                    else if (item === "Categories") path = "/categories";
                    else if (item === "About") path = "/aboutus";

                    return (
                      <Link
                        key={item}
                        to={path}
                        className="relative text-gray-700 hover:text-emerald-600 font-semibold text-lg transition-all duration-300 group py-2 px-4 rounded-xl hover:bg-emerald-50/80"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <button
                  className="text-gray-700 hover:text-emerald-600 transition-all duration-300 p-2 rounded-xl hover:bg-emerald-50/80"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d={
                        menuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </button>
              </div>

              {/* Right Side - Auth Buttons (Desktop) */}
              <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
                {!userRole ? (
                  <>
                    <button
                      onClick={() => setShowLoginSignup(true)}
                      className="relative overflow-hidden px-7 py-3 text-emerald-700 font-semibold border-2 border-emerald-500 rounded-full hover:text-white transition-all duration-300 group shadow-lg hover:shadow-xl"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      <span className="relative flex items-center space-x-2">
                        <span>Login / Sign Up</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      onClick={() => setShowConsultantForm(true)}
                      className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-500 text-white px-7 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-emerald-600 hover:to-green-600"
                    >
                      <span className="relative flex items-center space-x-2">
                        <span>Become a Consultant</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleDashboardRedirect}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold px-6 py-3 rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        <span>Dashboard</span>
                      </span>
                    </button>
                    <div className="flex items-center space-x-3 bg-emerald-50/80 px-4 py-2 rounded-full border border-emerald-200/50">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-600">
                        <span className="capitalize font-semibold text-emerald-700">
                          {userRole}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-full transition-all duration-300 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md"
                    >
                      <span className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Logout</span>
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="lg:hidden border-t border-emerald-100/50 bg-white/90 backdrop-blur-md">
                <div className="px-6 py-6 space-y-6">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    {["Categories", "How It Works", "About"].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-gray-700 hover:text-emerald-600 font-semibold text-lg transition-all duration-300 py-3 px-4 rounded-xl hover:bg-emerald-50/80 border-l-4 border-transparent hover:border-emerald-500"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-emerald-100/50">
                    {!userRole ? (
                      <>
                        <button
                          onClick={() => {
                            setShowLoginSignup(true);
                            setMenuOpen(false);
                          }}
                          className="border-2 border-emerald-500 text-emerald-700 px-4 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-md"
                        >
                          Login / Sign Up
                        </button>
                        <button
                          onClick={() => {
                            setShowConsultantForm(true);
                            setMenuOpen(false);
                          }}
                          className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Become a Consultant
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            handleDashboardRedirect();
                            setMenuOpen(false);
                          }}
                          className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
                        >
                          Go to Dashboard
                        </button>
                        <div className="flex items-center justify-center space-x-3 bg-emerald-50/80 px-4 py-3 rounded-full border border-emerald-200/50">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-600">
                            Logged in as:{" "}
                            <span className="capitalize font-semibold text-emerald-700">
                              {userRole}
                            </span>
                          </span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-full border border-red-200 transition-all duration-300"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Consultant Application Modal */}
      {showConsultantForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl w-full max-w-4xl relative animate-fadeIn border border-emerald-100">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-green-500 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Become a Consultant
                </h2>
                <button
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200 hover:rotate-90"
                  onClick={() => setShowConsultantForm(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <ConsultantApplicationForm />
            </div>
          </div>
        </div>
      )}

      {/* Login / Signup Modal */}
      {showLoginSignup && (
        <LoginSignupModal
          isOpen={showLoginSignup}
          onClose={() => setShowLoginSignup(false)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
