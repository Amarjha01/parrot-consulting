import React from "react";
import { Search, Monitor, ShoppingCart, Scale, User, Calendar, Star } from 'lucide-react';




export default function Testimonials() {
    return (
      <section className="py-12 px-6 bg-green-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-center mb-4 max-w-2xl">
              "Incredibly smooth process. Found an expert who gave us exactly what we needed to grow."
            </blockquote>
            <div className="flex items-center">
              <img src="/api/placeholder/40/40" alt="John D" className="w-10 h-10 rounded-full mr-3" />
              <span className="font-medium">John D</span>
            </div>
          </div>
        </div>
      </section>
    );
  }