
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

import Logo from "./logo";
import ConsultantApplicationForm from "../../forms/consultantApplicationform";
// import LoginSignupModal from "./LoginSignupModal"; // You'll need to create this
import React, { useState } from "react";
import LoginSignupModal from "../../forms/loginSignup";

export default function Navbar() {
  const [showConsultantForm, setShowConsultantForm] = useState(false);
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  return (
    <>
      <nav className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50"></div>
        
        {/* Glass Effect Overlay */}
        <div className="relative backdrop-blur-sm bg-white/70 border-b border-white/20 shadow-lg">
          <div className="py-4 px-6 flex items-center justify-between">
            
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Logo />
              </div>
              
              <div className="ml-12 hidden md:flex space-x-8">
                <a 
                  href="#" 
                  className="relative text-gray-800 hover:text-green-700 font-medium transition-all duration-300 group"
                >
                  Categories
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="#" 
                  className="relative text-gray-800 hover:text-green-700 font-medium transition-all duration-300 group"
                >
                  How It Works
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="#" 
                  className="relative text-gray-800 hover:text-green-700 font-medium transition-all duration-300 group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Login/Signup Button */}
              <button
                onClick={() => setShowLoginSignup(true)}
                className="relative overflow-hidden px-6 py-2.5 text-green-700 font-semibold border-2 border-green-600 rounded-full hover:text-white transition-all duration-300 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Login / Sign Up</span>
                </span>
              </button>

              {/* Become a Consultant Button */}
              <button
                onClick={() => setShowConsultantForm(true)}
                className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span>Become a Consultant</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button - Hidden for now, can be implemented later */}
        <div className="md:hidden absolute right-4 top-4">
          <button className="text-gray-800 hover:text-green-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Consultant Application Form Modal */}
      {showConsultantForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl w-full max-w-4xl relative animate-fadeIn">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Become a Consultant</h2>
                <button
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                  onClick={() => setShowConsultantForm(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <ConsultantApplicationForm />
            </div>
          </div>
        </div>
      )}

      {/* Login/Signup Modal */}
      {showLoginSignup && (
        <LoginSignupModal 
          isOpen={showLoginSignup}
          onClose={() => setShowLoginSignup(false)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}