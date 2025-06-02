import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Heart,
  Lightbulb,
  Shield,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Footer from '../components/global/footer';
import Navbar from '../components/global/navbar';

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 2000);
  };

  const stats = [
    { number: '50K+', label: 'Students Served', icon: Users },
    { number: '5K+', label: 'Expert Tutors', icon: Award },
    { number: '100+', label: 'Countries', icon: Globe },
    { number: '4.9★', label: 'Average Rating', icon: Star }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Learning',
      description: 'We believe education transforms lives and opens endless possibilities for growth.',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Creating a secure environment where both tutors and students can thrive confidently.',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly evolving our platform to provide the best learning experience possible.',
      gradient: 'from-amber-400 to-orange-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d9?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Education',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
        <Navbar/>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-amber-100 px-6 py-3 rounded-full mb-8">
              <Heart className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">Our Story</span>
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-amber-700 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to democratize quality education by connecting passionate learners with expert tutors worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-6">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Our Mission</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Empowering Learning Through Connection
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded in 2020, our platform was born from a simple belief: everyone deserves access to quality education. We've built a community where knowledge flows freely, barriers dissolve, and learning becomes a joyful journey of discovery.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we're proud to have facilitated over 100,000 learning sessions, connecting students with expert tutors across diverse fields from IT consulting to creative arts.
            </p>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur-lg opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl mb-3">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-slate-50 to-amber-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 delay-${index * 200} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate people behind our mission
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`transition-all duration-700 delay-${index * 200 + 400} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
                <div className="relative inline-block mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity`}></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Have questions about our platform? Want to partner with us? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-gray-300">hello@tutorplatform.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Visit Us</div>
                    <div className="text-gray-300">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : isSubmitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </span>
                  ) : isSubmitting ? (
                    'Sending...'
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUsPage;