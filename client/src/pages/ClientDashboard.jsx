import React, { useEffect, useState } from "react";
import { seeBooking } from "../service/userApi";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, Video, User, MapPin, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Home } from "lucide-react";
const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await seeBooking();
        console.log("Bookings fetched:", res);
        setBookings(res.data || res);
        setError(null);
      } catch (error) {
        console.error("Booking fetch failed:", error);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded-lg w-48 mb-8"></div>
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
           <Link to={'/'}>
             <button
             
      className="group flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-xl px-4 py-2 transition-all duration-300"
    >
      <Home 
        size={18} 
        className="text-gray-400 group-hover:text-white transition-colors" 
      />
      <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">
        Home
      </span>
    </button>
           </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Sessions
              </h1>
              <p className="text-gray-400 mt-2">
                Manage and join your upcoming consultations
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-700">
                <span className="text-sm text-gray-300">Total Sessions</span>
                <p className="text-2xl font-bold text-white">{bookings.length}</p>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="text-red-400" size={20} />
              <span className="text-red-400">{error}</span>
            </div>
          )}
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-12 text-center">
    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
      <Calendar className="text-gray-400" size={24} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">No sessions scheduled</h3>
    <p className="text-gray-400 mb-6">Book your first consultation to get started</p>
    <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
      Browse Consultants
    </button>
  </div>
);

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const [canJoin, setCanJoin] = useState(false);
  const [timeStatus, setTimeStatus] = useState('upcoming');

  useEffect(() => {
    const checkJoinWindow = () => {
      const now = new Date();
      const startTime = new Date(booking.datetime);
      const endTime = new Date(
        startTime.getTime() + (booking.duration || 30) * 60000
      );
      const openTime = new Date(startTime.getTime() - 2 * 60000);

      if (now < openTime) {
        setTimeStatus('upcoming');
        setCanJoin(false);
      } else if (now >= openTime && now <= endTime) {
        setTimeStatus('live');
        setCanJoin(true);
      } else {
        setTimeStatus('completed');
        setCanJoin(false);
      }

      // Force enable for testing
      setCanJoin(true);
    };

    checkJoinWindow();
    const interval = setInterval(checkJoinWindow, 15000);
    return () => clearInterval(interval);
  }, [booking.datetime, booking.duration]);

  const getStatusBadge = () => {
    switch (timeStatus) {
      case 'live':
        return (
          <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="flex items-center space-x-1 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            <span>Upcoming</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center space-x-1 bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </div>
        );
      default:
        return null;
    }
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const isToday = date.toDateString() === new Date().toDateString();
    const isTomorrow = date.toDateString() === new Date(Date.now() + 86400000).toDateString();
    
    let dateText;
    if (isToday) dateText = 'Today';
    else if (isTomorrow) dateText = 'Tomorrow';
    else dateText = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const timeText = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return { dateText, timeText };
  };

  const { dateText, timeText } = formatDateTime(booking.datetime);

  return (
    <div className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10">
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-4">
        {getStatusBadge()}
        <div className="text-gray-400 text-sm">
          {booking.duration || 30} min session
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-start space-x-4 mb-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gradient-to-r from-green-400 to-green-600 p-0.5 bg-gradient-to-r from-green-400 to-green-600">
            <img
              src={booking.consultant?.profilePicture || "https://via.placeholder.com/150"}
              alt={booking.consultant?.name}
              className="w-full h-full rounded-xl object-cover bg-gray-700"
            />
          </div>
          {timeStatus === 'live' && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-white mb-1 group-hover:text-green-400 transition-colors">
            {booking.consultant?.name || "Unknown Consultant"}
          </h3>
          
          <p className="text-green-400 text-sm font-medium mb-3 line-clamp-1">
            {booking.projectDetails || "General Consultation"}
          </p>

          {/* Time and Date Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-gray-500" />
              <span>{dateText}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} className="text-gray-500" />
              <span>{timeText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <User size={12} />
          <span>1-on-1 Session</span>
        </div>
        
        {canJoin ? (
          <button
            onClick={() => navigate(`/meeting/${booking._id}`)}
            className="group/btn bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-green-500/25"
          >
            <Video size={16} />
            <span>Join Meeting</span>
            <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-700/50 text-gray-500 px-6 py-3 rounded-xl font-medium cursor-not-allowed flex items-center space-x-2"
          >
            <Clock size={16} />
            <span>
              {timeStatus === 'completed' ? 'Session Ended' : 'Not Available Yet'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;