import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye } from "lucide-react"; // Assuming you're using lucide icons

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const [canJoin, setCanJoin] = useState(false);

  useEffect(() => {
    const checkJoinWindow = () => {
      const now = new Date();
      const start = new Date(booking.datetime);
      const duration = booking.duration || 30;
      const end = new Date(start.getTime() + duration * 60000);
      const joinOpen = new Date(start.getTime() - 2 * 60000);

      // setCanJoin(now >= joinOpen && now <= end);
      const canJoin = true;
      // setCanJoin(now >= joinOpen && now <= end);
      setCanJoin(true);
    };

    checkJoinWindow();
    const interval = setInterval(checkJoinWindow, 15000);
    return () => clearInterval(interval);
  }, [booking.datetime, booking.duration]);

  const handleJoin = () => {
    navigate(`/meeting/${booking._id}`);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-start gap-4">
        <img
          src={
            booking.user?.profilePicture ||
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          }
          alt={booking.user?.name || "Client"}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {booking.user?.name || "Unknown Client"}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {booking.projectDetails || "Consultation"}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Clock size={14} />
            {new Date(booking.datetime).toLocaleDateString()} at{" "}
            {new Date(booking.datetime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {canJoin ? (
            <button
              onClick={handleJoin}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              Join Meeting
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-not-allowed"
            >
              <Clock size={16} />
              Not Available Yet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
