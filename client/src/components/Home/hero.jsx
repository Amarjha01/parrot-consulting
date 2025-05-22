import React from "react";
import { useState } from "react";
import {
  Search,
  Monitor,
  ShoppingCart,
  Scale,
  User,
  Calendar,
  Star,
} from "lucide-react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="px-6 bg-gradient-to-br from-orange-100 to-green-50 py-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[600px]">
          {/* Left Content */}
          <div className="md:w-1/2 mb-12 md:mb-0 text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-teal-900 mb-6 leading-tight">
              Fly Higher with the Right Advice
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Get expert guidance across a range of fields.
            </p>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="What can we assist you with?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-800 text-white p-2 rounded-full hover:bg-green-700 transition">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="w-[600px] h-[600px] relative">
              <img
                src="/parrot.png"
                alt="Parrot Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
