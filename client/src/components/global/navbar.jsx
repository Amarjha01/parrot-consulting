
import Logo from "./logo";
import ConsultantApplicationForm from "../../forms/consultantApplicationform"; // Adjust the path if needed
import React, { useState } from "react";



export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <nav className="py-4 px-6 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <Logo />
          <div className="ml-12 hidden md:flex space-x-6">
            <a href="#" className="text-gray-800 hover:text-green-800">Categories</a>
            <a href="#" className="text-gray-800 hover:text-green-800">How It Works</a>
            <a href="#" className="text-gray-800 hover:text-green-800">About</a>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-800 text-white px-5 py-2 rounded-full hover:bg-green-900 transition"
        >
          Sign In
        </button>
      </nav>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg w-full max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <ConsultantApplicationForm />
          </div>
        </div>
      )}
    </>
  );
}



// import React from 'react';

// const Navbar = () => {
//   return (
//     <nav className="bg-amber-100 px-6 py-4">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
//             <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
//               <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.76C10.21 11.13 10 11.63 10 12.17V23H12V12.17L15.17 9H17V11L21 9Z"/>
//             </svg>
//           </div>
//           <div>
//             <span className="text-xl font-bold text-gray-900">PARROT</span>
//             <br />
//             <span className="text-sm text-gray-600 font-medium">CONSULT</span>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center space-x-8">
//           <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
//             Categories
//           </a>
//           <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
//             How It Works
//           </a>
//           <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
//             About
//           </a>
//         </div>

//         {/* Sign Up Button */}
//         <button className="bg-teal-800 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-900 transition-colors">
//           Sign Up
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;