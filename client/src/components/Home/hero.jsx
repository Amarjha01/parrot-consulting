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
    <section className="pt-19 px-6 bg-gradient-to-br from-orange-50 to-green-50 h-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between h-180">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Fly Higher with the Right Advice
            </h1>
            <p className="text-xl text-gray-700 mb-8">
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
              <button className="absolute right-1 top-1 bg-green-800 text-white p-2 rounded-full">
                <Search size={20} />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center bg-amber-300 over flow">
            <div className="relative w-400 h-140">
              <div className="w-full h-full">
                <img
                  src="/parrot.png"
                  alt="Parrot Illustration"
                  className="w-full h-200 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
