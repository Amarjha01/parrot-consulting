import React, { useState } from 'react';
import { Home, MessageCircle, Settings, LogOut, Star } from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    consultantName: "Maria Smith",
    service: "Legal Consulting",
    date: "April 25, 2024",
    time: "10:00 AM",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    consultantName: "John Davis",
    service: "Business Consulting",
    date: "April 28, 2024",
    time: "2:30 PM",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    consultantName: "Sarah Johnson",
    service: "Financial Planning",
    date: "May 2, 2024",
    time: "11:15 AM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="font-bold text-lg">PARROT</span>
          <span className="text-sm text-gray-500">CONSULT</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={booking.avatar}
            alt={booking.consultantName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{booking.consultantName}</h3>
            <p className="text-gray-600 text-sm">{booking.service}</p>
            <p className="text-gray-500 text-sm mt-1">
              {booking.date} at {booking.time}
            </p>
          </div>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

// Rating Component
const RatingSection = () => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle rating submission
    console.log('Rating:', rating, 'Feedback:', feedback);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Leave a Rating</h2>
      
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Maria Smith"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">Maria Smith</h3>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={20}
                  className={`${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback..."
        className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Submit
      </button>
    </div>
  );
};

// Main Dashboard Component
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">After signup</p>
              <h1 className="text-2xl font-bold text-gray-900">User dashboard</h1>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="max-w-4xl">
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome, John.</h2>
            </div>

            {/* Upcoming Bookings */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Booking</h3>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>

            {/* Rating Section */}
            <RatingSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;