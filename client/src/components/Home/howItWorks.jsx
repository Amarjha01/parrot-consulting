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

export default function HowItWorks() {
  const steps = [
    {
      icon: <User className="w-15 h-15 text-green-800" />,
      title: "Create your profile",
      description: "Showcase your business to potential clients",
    },
    {
      icon: <Monitor className="w-12 h-12 text-green-800" />,
      title: "Offer your services",
      description: "List your teaching services and availability",
    },
    {
      icon: <Calendar className="w-12 h-12 text-green-800" />,
      title: "Get booked",
      description: "Clients connect and pay for your time directly",
    },
  ];

  return (
    <section className="py-14 px-6 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-full shadow-md">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
