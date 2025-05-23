
import Logo from "./logo";
import ConsultantApplicationForm from "../../forms/consultantApplicationform"; // Adjust the path if needed
import React, { useState } from "react";



export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <nav className="py-4 px-6 flex items-center justify-between bg-amber-100 shadow-sm">
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