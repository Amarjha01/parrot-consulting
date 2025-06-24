import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  MoreHorizontal,
  LogOut,
  Home,
  Edit3,
  Clock,
  DollarSign,
  Eye,
  Loader2,
} from "lucide-react";
import { loginAsConsultant } from "../service/consultantApi";
import { getBookingsByConsultantId } from "../service/bookingApi";
import BookingCard from "./consultantdash/bookingcard";

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
    <span className="ml-2 text-gray-600">Loading dashboard...</span>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

// Sidebar Navigation Component
const Sidebar = ({ activeItem, setActiveItem, consultantData, onLogout }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "profile", label: "Edit Profile", icon: User },
    { id: "more", label: "More", icon: MoreHorizontal },
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

      {/* Consultant Info */}
      {consultantData && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={
                consultantData.data.profilePicture ||
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              }
              alt={consultantData.data.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {consultantData.data.name}
              </p>
              <p className="text-xs text-gray-600 capitalize">
                {consultantData.data.primaryCategory}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveItem(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeItem === id
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
      >
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
    purple: "text-purple-600 bg-purple-50",
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
// const BookingCard = ({ booking }) => {
//   const navigate = useNavigate();
//   const [canJoin, setCanJoin] = useState(false);

//   useEffect(() => {
//     const checkJoinWindow = () => {
//       const now = new Date();
//       const start = new Date(booking.datetime);
//       const duration = booking.duration || 30; // fallback to 30 mins
//       const end = new Date(start.getTime() + duration * 60000);
//       const joinOpen = new Date(start.getTime() - 2 * 60000); // 2 mins before

//       const allowJoin = now >= joinOpen && now <= end;
//       setCanJoin(allowJoin);
//     };

//     checkJoinWindow();
//     const interval = setInterval(checkJoinWindow, 15000);
//     return () => clearInterval(interval);
//   }, [booking.datetime, booking.duration]);

//   const handleJoin = () => {
//     navigate(`/meeting/${booking._id}`);
//   };

// }

// Welcome Header Component
const WelcomeHeader = ({ consultantData }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {consultantData?.data.name || "Consultant"}.
      </h1>
      <p className="text-gray-600 mt-1 capitalize">
        {consultantData?.data.primaryCategory} •{" "}
        {consultantData?.data.experience} years experience
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            consultantData?.data.status === "approved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {consultantData?.data.status === "approved"
            ? "Approved"
            : "Pending Approval"}
        </span>
        {consultantData?.data.visibleOnPlatform && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Visible on Platform
          </span>
        )}
      </div>
    </div>
    <img
      src={
        consultantData?.data.profilePicture ||
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      }
      alt={consultantData?.data.name}
      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
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
    <h2 className="text-xl font-semibold text-gray-900 mb-6">
      Upcoming Bookings
    </h2>
    <div className="grid gap-6">
      {bookings.length > 0 ? (
        bookings.map((booking, index) => {
          const dateObj = new Date(booking.datetime);
          const formattedDate = dateObj.toLocaleDateString();
          const formattedTime = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            // <BookingCard
            //   key={booking._id || index}
            //   booking={{
            //     clientName: booking.user.name, // Replace with real name if populated
            //     service: booking.projectDetails,
            //     date: formattedDate,
            //     time: formattedTime,
            //     clientAvatar: "https://via.placeholder.com/150", // Default avatar
            //   }}
            // />
            <BookingCard
              key={booking._id}
              booking={{
                datetime: booking.datetime,
                duration: booking.duration,
                user: {
                  name: booking.user.name,
                  profilePicture:
                    booking.user.profilePicture ||
                    "https://via.placeholder.com/150",
                },
                projectDetails: booking.projectDetails,
                _id: booking._id,
              }}
            />
          );
        })
      ) : (
        <Card className="p-6">
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              No upcoming bookings at the moment.
            </p>
            <p className="text-sm text-gray-500">
              New bookings will appear here once clients book your services.
            </p>
          </div>
        </Card>
      )}
    </div>
  </div>
);

// Services Section Component
const ServicesSection = ({ services }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service, index) => (
        <Card key={index} className="p-4">
          <p className="font-medium text-gray-900">{service}</p>
        </Card>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const ConsultantDashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [consultantData, setConsultantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load consultant data
  const loadConsultantData = async () => {
    try {
      setLoading(true);
      setError(null);

      // First check if consultant data exists in localStorage
      const storedData = localStorage.getItem("consultant");
      const accessToken = localStorage.getItem("accessToken");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Loaded consultant data from localStorage:", parsedData);
        setConsultantData(parsedData);
        setLoading(false);
        return;
      }

      // If no stored data but we have access token, try to fetch from API
      if (accessToken) {
        try {
          // You might need to create a separate API call to get consultant profile
          // For now, we'll check if there's any way to retrieve the consultant data
          console.log(
            "Access token found, but no consultant data in localStorage"
          );
          setError(
            "Session found but consultant data missing. Please log in again."
          );
        } catch (apiError) {
          console.error("API Error:", apiError);
          setError("Failed to load consultant data from server.");
        }
      } else {
        // No stored data and no access token
        setError("No consultant session found. Please log in again.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error loading consultant data:", err);
      setError("Failed to load consultant data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultantData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("consultant");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Redirect to login page
    window.location.href = "/login";
  };

  // Generate stats data based on consultant data
  const generateStatsData = (consultantData) => {
    if (!consultantData) return [];

    return [
      {
        title: "Hourly Rate",
        value: `₹ ${consultantData.data.hourlyRate || "0"}`,
        icon: DollarSign,
        color: "emerald",
      },
      {
        title: "Availability/Week",
        value: `${consultantData.data.availabilityPerWeek || "0"}h`,
        icon: Clock,
        color: "blue",
      },
      {
        title: "Languages",
        value:
          consultantData.data.languageProficiency?.length?.toString() || "0",
        icon: User,
        color: "purple",
      },
      {
        title: "Key Skills",
        value: consultantData.data.keySkills?.length?.toString() || "0",
        icon: Eye,
        color: "emerald",
      },
    ];
  };

  // Generate upcoming bookings (placeholder - you'll need to fetch from API)
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (consultantData?.data?._id) {
        try {
          const bookingData = await getBookingsByConsultantId(
            consultantData.data._id
          );
          setBookings(bookingData);
          console.log("Upcoming Bookings:", bookingData);
        } catch (err) {
          console.error("Failed to load bookings", err);
        }
      }
    };

    fetchBookings();
  }, [consultantData]);

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={loadConsultantData} />;
    }

    const statsData = generateStatsData(consultantData);
    const upcomingBookings = bookings;

    switch (activeItem) {
      case "dashboard":
        return (
          <div className="flex-1 p-8">
            <WelcomeHeader consultantData={consultantData} />
            <OverviewSection stats={statsData} />
            {consultantData?.specializedServices && (
              <ServicesSection services={consultantData.specializedServices} />
            )}
            <UpcomingBookingsSection bookings={upcomingBookings} />
          </div>
        );
      case "bookings":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              My Bookings
            </h1>
            <div className="grid gap-6">
              {upcomingBookings.map((booking, index) => {
                const dateObj = new Date(booking.datetime);
                const formattedDate = dateObj.toLocaleDateString(); // "MM/DD/YYYY" or "DD/MM/YYYY"
                const formattedTime = dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }); // "HH:MM AM/PM"

                return (
                  <BookingCard
                    key={booking._id || index}
                    booking={{
                      clientName: booking.user.name, // You can replace this with real name later via populate
                      service: booking.projectDetails,
                      date: formattedDate,
                      time: formattedTime,
                      clientAvatar: "https://via.placeholder.com/150", // fallback/default avatar
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Edit Profile
            </h1>
            <Card className="p-6">
              <div className="max-w-2xl">
                <div className="mb-6">
                  <img
                    src={
                      consultantData?.data.profilePicture ||
                      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    }
                    alt={consultantData?.data.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-gray-200"
                  />
                  <button className="text-emerald-600 font-medium hover:text-emerald-700">
                    Change Photo
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={consultantData?.data.name || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={consultantData?.data.email || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={consultantData?.data.phoneNumber || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Category
                    </label>
                    <input
                      type="text"
                      defaultValue={consultantData?.data.primaryCategory || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 capitalize"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      defaultValue={consultantData?.data.experience || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      defaultValue={consultantData?.data.hourlyRate || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue={consultantData?.data.address || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability per Week (Hours)
                    </label>
                    <input
                      type="number"
                      defaultValue={
                        consultantData?.data.availabilityPerWeek || ""
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {consultantData?.data.keySkills?.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language Proficiency
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {consultantData?.data.languageProficiency?.map(
                      (language, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize"
                        >
                          {language}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Services Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialized Services
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {consultantData?.data.specializedServices?.map(
                      (service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
                          {service}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors mt-6">
                  Save Changes
                </button>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              More Options
            </h1>
            <div className="grid gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Settings
                </h3>
                <div className="space-y-3">
                  <button className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                    Notification Preferences
                  </button>
                  <button className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                    Privacy Settings
                  </button>
                  <button className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                    Payment Settings
                  </button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Documents
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Aadhaar Card</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        consultantData?.data.documents?.aadhaarCard
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {consultantData?.data.documents?.aadhaarCard
                        ? "Uploaded"
                        : "Not Uploaded"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">PAN Card</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        consultantData?.data.documents?.panCard
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {consultantData?.data.documents?.panCard
                        ? "Uploaded"
                        : "Not Uploaded"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Resume</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        consultantData?.data.resume
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {consultantData?.data.resume
                        ? "Uploaded"
                        : "Not Uploaded"}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        consultantData={consultantData}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
};

export default ConsultantDashboard;
