import React, { useState } from 'react';
import { Calendar, User, MoreHorizontal, LogOut, Home, Edit3, Clock, DollarSign, Eye } from 'lucide-react';

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

// Sidebar Navigation Component
const Sidebar = ({ activeItem, setActiveItem }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'more', label: 'More', icon: MoreHorizontal }
  ];

  return (
    <div className="w-64 bg-gray-50 min-h-screen p-6 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">PARROT</h1>
          <p className="text-sm text-gray-600">CONSULT</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveItem(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeItem === id
                ? 'bg-emerald-100 text-emerald-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color = "emerald" }) => {
  const colorClasses = {
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50"
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

// Booking Card Component
const BookingCard = ({ booking }) => (
  <Card className="p-6">
    <div className="flex items-start gap-4">
      <img
        src={booking.avatar}
        alt={booking.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{booking.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{booking.service}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Clock size={14} />
          {booking.date} at {booking.time}
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Eye size={16} />
          View Details
        </button>
      </div>
    </div>
  </Card>
);

// Welcome Header Component
const WelcomeHeader = ({ userName, userAvatar }) => (
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}.</h1>
    <img
      src={userAvatar}
      alt={userName}
      className="w-12 h-12 rounded-full object-cover"
    />
  </div>
);

// Overview Section Component
const OverviewSection = ({ stats }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  </div>
);

// Upcoming Bookings Section Component
const UpcomingBookingsSection = ({ bookings }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Bookings</h2>
    <div className="grid gap-6">
      {bookings.map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const ConsultantDashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  // Sample data
  const userData = {
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  const statsData = [
    {
      title: "Active Bookings",
      value: "3",
      icon: Calendar,
      color: "emerald"
    },
    {
      title: "Next Payout",
      value: "₹ 4,500",
      icon: DollarSign,
      color: "blue"
    },
    {
      title: "Total Clients",
      value: "24",
      icon: User,
      color: "purple"
    },
    {
      title: "This Month",
      value: "₹ 12,500",
      icon: DollarSign,
      color: "emerald"
    }
  ];

  const upcomingBookings = [
    {
      name: "Maria Smith",
      service: "E-Commerce Consulting",
      date: "April 25, 2024",
      time: "10:00 AM",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "John Williams",
      service: "Business Strategy",
      date: "April 26, 2024",
      time: "2:30 PM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      service: "Marketing Consultation",
      date: "April 27, 2024",
      time: "11:15 AM",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <div className="flex-1 p-8">
            <WelcomeHeader userName={userData.name} userAvatar={userData.avatar} />
            <OverviewSection stats={statsData} />
            <UpcomingBookingsSection bookings={upcomingBookings} />
          </div>
        );
      case 'bookings':
        return (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
            <div className="grid gap-6">
              {upcomingBookings.map((booking, index) => (
                <BookingCard key={index} booking={booking} />
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
            <Card className="p-6">
              <div className="max-w-md">
                <div className="mb-6">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <button className="text-emerald-600 font-medium hover:text-emerald-700">
                    Change Photo
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue={userData.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="sarah@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">More Options</h1>
            <Card className="p-6">
              <p className="text-gray-600">Additional features and settings will be available here.</p>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      {renderContent()}
    </div>
  );
};

export default ConsultantDashboard;