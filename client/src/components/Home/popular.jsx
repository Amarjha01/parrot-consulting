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
import { Link } from "react-router-dom";

export default function PopularCategories() {
  const categories = [
    {
      icon: <Monitor className="w-18 h-18 text-green-800" />,
      title: "IT Consulting",
      description: "Get your personalized IT needs from experts via Parrot Consult.",
    },
    {
      icon: <ShoppingCart className="w-18 h-18 text-green-800" />,
      title: "Ecommerce Consulting",
      description: "E-Commerce: E-commerce consulting made easier and convenient via Parrot Consult.",
    },
    {
      icon: <Scale className="w-18 h-18 text-green-800" />,
      title: "Legal Consulting",
      description: "Legal compliances made easier and hassle free via Parrot Consult.",
    },
  ];

  return (
    <section className="pt-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {categories.map((category, index) => (
           <Link to={'/ViewAllConsultants'}>
            <div
              key={index}
              className="bg-white w-[280px] text-center hover:shadow-lg transition py-8 rounded-2xl shadow"
            >
              <div className="flex justify-center mb-4">{category.icon}</div>
              <h3 className="text-lg font-bold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm px-5">{category.description}</p>
            </div>
           </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
