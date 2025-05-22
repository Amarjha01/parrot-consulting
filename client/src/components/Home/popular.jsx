import React from "react";
import { Search, Monitor, ShoppingCart, Scale, User, Calendar, Star } from 'lucide-react';


export default function PopularCategories() {
    const categories = [
      {
        icon: <Monitor className="w-12 h-12 text-green-800" />,
        title: 'IT Consulting',
        description: 'Get expert guidance on your technology needs'
      },
      {
        icon: <ShoppingCart className="w-12 h-12 text-green-800" />,
        title: 'Ecommerce Consulting',
        description: 'Optimize your business for growth'
      },
      {
        icon: <Scale className="w-12 h-12 text-green-800" />,
        title: 'Legal Consulting',
        description: 'Navigate challenges with confidence'
      }
    ];
  
    return (
      <section className="py-12 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-green-100 p-6 rounded-lg text-center hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  