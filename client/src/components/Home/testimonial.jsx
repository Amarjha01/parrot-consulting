import React from "react";
import {
  Search,
  Monitor,
  ShoppingCart,
  Scale,
  User,
  Calendar,
  Star,
} from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Star Rating */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote className="text-2xl md:text-4xl font-semibold text-gray-800 max-w-3xl mb-6">
            “Incredibly smooth process. Found an expert who gave us exactly what
            we needed to grow.”
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="John D"
              className="w-12 h-12 rounded-full mr-4 border border-gray-300"
            />
            <span className="text-lg font-medium text-gray-900">John D</span>
          </div>
        </div>
      </div>
    </section>
  );
}
