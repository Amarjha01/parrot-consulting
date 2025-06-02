import React, { useState, useEffect } from 'react';
import { User, Monitor, Calendar, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/global/navbar';
import Footer from '../components/global/footer';

const HowItWorksPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: User,
      title: "Create your profile",
      description: "Showcase your business to potential clients",
      details: "Set up your professional profile with your expertise, experience, and teaching style. Upload photos, certifications, and create a compelling bio that attracts your ideal students.",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: Monitor,
      title: "Offer your services",
      description: "List your teaching services and availability",
      details: "Define your teaching subjects, set your rates, and specify your available time slots. Choose between online or in-person sessions to reach more students.",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      icon: Calendar,
      title: "Get booked",
      description: "Clients contact and pay for your time directly",
      details: "Students browse your profile, book sessions that fit their schedule, and pay securely through the platform. Start teaching and grow your business effortlessly.",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50">
         <Navbar/>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-amber-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-emerald-500 mr-2 animate-pulse" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                  How It Works
                </h1>
                <Sparkles className="w-8 h-8 text-amber-500 ml-2 animate-pulse" />
              </div>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Start your teaching journey in three simple steps and connect with eager learners worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Interactive Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            
            return (
              <div
                key={index}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  isActive ? 'scale-105 z-10' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`relative p-8 rounded-2xl border-2 transition-all duration-500 ${
                  isActive 
                    ? `${step.bgColor} ${step.borderColor} shadow-2xl shadow-${step.color.split('-')[1]}-200/50` 
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                }`}>
                  
                  {/* Animated Background Gradient */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                  )}
                  
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500 ${
                    isActive ? `bg-gradient-to-r ${step.color} shadow-lg scale-110` : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 ${
                    isActive ? `bg-gradient-to-r ${step.color}` : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 transition-all duration-500 ${
                      isActive ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <p className={`text-sm leading-relaxed transition-all duration-500 ${
                    isActive ? 'text-gray-700 opacity-100 max-h-32' : 'text-gray-500 opacity-75 max-h-20'
                  } overflow-hidden`}>
                    {step.details}
                  </p>

                  {/* Arrow connector for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                      <ArrowRight className={`w-8 h-8 transition-all duration-500 ${
                        isActive ? 'text-emerald-500 scale-125' : 'text-gray-300'
                      }`} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-emerald-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Success Story Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Teaching?
          </h2>
          <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of educators who are already earning and making a difference
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started Today
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Easy Setup", desc: "Profile ready in minutes" },
            { title: "Secure Payments", desc: "Safe and reliable transactions" },
            { title: "Global Reach", desc: "Connect with students worldwide" },
            { title: "24/7 Support", desc: "We're here to help you succeed" }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-emerald-200">
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default HowItWorksPage;