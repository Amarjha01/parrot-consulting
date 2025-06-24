import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  MapPin,
  Star,
} from "lucide-react";
import { globalconsultantdetails } from "../service/globalApi";
import { confirmBooking, createOrder, creatependingBooking } from "../service/bookingApi";
import LoginSignupModal from "./loginSignup";

const ConsultantBookingForm = ({
  isOpen,
  onClose,
  preSelectedConsultant = null,
}) => {
  const [step, setStep] = useState(1);
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(30);
  const [projectDetails, setProjectDetails] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(!preSelectedConsultant);
  const [error, setError] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);
 const [isLoginOpen, setLoginOpen] = useState(false);
  // Prevent background scroll when modal is open

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Update state if preSelectedConsultant changes
  useEffect(() => {
    if (preSelectedConsultant) {
      setSelectedConsultant(preSelectedConsultant);
      setStep(2);
      setLoading(false);
    }
  }, [preSelectedConsultant]);

  // Fetch consultants if no pre-selected
  useEffect(() => {
    if (preSelectedConsultant) return;
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        const response = await globalconsultantdetails();
        console.log("API response:", response); // ✅ See the exact structure
        setConsultants(response?.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching consultants:", err);
        setError("Failed to load consultants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, [preSelectedConsultant]);

  const getMockBookings = () => {
    if (!selectedConsultant) return [];
    return [
      {
        datetime: new Date("2025-05-20T12:45:00"),
        consultant: selectedConsultant._id,
        status: "scheduled",
      },
      {
        datetime: new Date("2025-05-22T10:00:00"),
        consultant: selectedConsultant._id,
        status: "scheduled",
      },
    ];
  };

  const generateTimeSlots = (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const availability = selectedConsultant?.weeklyAvailability?.find(
      (entry) => entry.day === weekday && entry.isActive
    );
  
    if (!availability) return [];
  
    const slots = [];
  
    for (const range of availability.timeSlots) {
      const [startHour, startMinute] = range.start.split(':').map(Number);
      const [endHour, endMinute] = range.end.split(':').map(Number);
  
      const start = new Date(date);
      start.setHours(startHour, startMinute, 0, 0);
  
      const end = new Date(date);
      end.setHours(endHour, endMinute, 0, 0);
  
      while (start < end) {
        slots.push(new Date(start));
        start.setMinutes(start.getMinutes() + 30);
      }
    }
  
    return slots;
  };
  

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleConsultantSelect = (consultant) => {
    setSelectedConsultant(consultant);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    if (date < new Date().setHours(0, 0, 0, 0)) return;
    setSelectedDate(date);
    setAvailableSlots(generateTimeSlots(date));
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleIsUserLogin = async () =>{
    try {
             const isuserlogin = await JSON.parse(localStorage.getItem("user"));
          console.log(isuserlogin, 'iasdgjbsjnzb jhwas');
          
    if (!isuserlogin) {
      setLoginOpen(true); 
    }

    
    } catch (error) {
      
    }
  }

  const handleBookingSubmit = async () => {
    try {
   
      const datetime = new Date(selectedDate);
      datetime.setHours(selectedTime.getHours());
      datetime.setMinutes(selectedTime.getMinutes());
  
      const amount = Math.round((selectedConsultant.hourlyRate / 60) * duration * 100); // in paise
      console.log("Amount:", amount);
      
      // ✅ Get user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      const userName = user?.name;
      const userEmail = user?.email;
     console.log("User :", user);
     
      // Step 1: Create pending booking
      const pendingBooking = await creatependingBooking({
        consultantId: selectedConsultant._id,
        userId: userId,
        datetime,
        duration,
        projectDetails,
      });
  
      const bookingId = pendingBooking.data._id;
  
      // Step 2: Create Razorpay order
      const razorpayOrder = await createOrder({ amount });
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.data.amount,
        currency: "INR",
        order_id: razorpayOrder.data.id,
        name: "Snap Forge",
        description: "Consultation Booking",
        handler: async function (response) {
          // Step 3: Confirm booking
          await confirmBooking({
            bookingId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
  
          setBookingComplete(true);
          setStep(4);
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#0d9488",
        },
      };
      console.log("Razorpay options:", options);
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Booking/payment error:", err);
      setError("Log IN and try again.");
    }
  };
  

  const resetForm = () => {
    setStep(1);
    setSelectedConsultant(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setDuration(30);
    setProjectDetails("");
    setBookingComplete(false);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const isAvailableDay = (date) => {
    if (!selectedConsultant || !selectedConsultant.weeklyAvailability)
      return false;
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    return selectedConsultant.weeklyAvailability.some(
      (day) => day.day === weekday && day.isActive
    );
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full" />
          <span>Loading consultants...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Book Consultation</h1>
          <button
            onClick={handleClose}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Step Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Step {step} of 4</span>
              <span>
                {
                  {
                    1: "Select Consultant",
                    2: "Choose Date & Time",
                    3: "Project Details",
                    4: "Confirmation",
                  }[step]
                }
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div
                className="h-2 bg-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Choose a Consultant</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.map((consultant) => (
                  <div
                    key={consultant._id}
                    onClick={() => handleConsultantSelect(consultant)}
                    className="border rounded-lg p-4 cursor-pointer hover:shadow"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={
                          consultant.profilePicture ||
                          `https://ui-avatars.com/api/?name=${consultant.name}`
                        }
                        alt={consultant.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{consultant.name}</h3>
                        <p className="text-sm text-gray-500">
                          <Star className="inline w-4 h-4 text-yellow-400 mr-1" />
                          {consultant.rating || "4.8"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-teal-600">
                      {consultant.primaryCategory}
                    </p>
                    <p className="text-sm text-gray-600">
                      {consultant.experience} yrs experience
                    </p>
                    <div className="text-sm text-gray-700 mt-2 flex justify-between">
                      <span>
                        <MapPin className="inline w-4 h-4 mr-1" />
                        {consultant.address || "Remote"}
                      </span>
                      <span>₹{consultant.hourlyRate}/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && selectedConsultant && (
            <div>
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setStep(1)}
                  className="mr-4 text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">Choose Date & Time</h2>
                  <p className="text-gray-600">
                    Meeting with {selectedConsultant.name}
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1,
                            1
                          )
                        )
                      }
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3>
                      {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                            1
                          )
                        )
                      }
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (d) => (
                        <div key={d}>{d}</div>
                      )
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((date, index) => (
                      <div key={index} className="h-10">
                        {date ? (
                          <button
                            onClick={() => handleDateSelect(date)}
                            disabled={date < new Date().setHours(0, 0, 0, 0)}
                            className={`w-full h-full text-sm rounded 
                                ${
                                  date < new Date().setHours(0, 0, 0, 0)
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : selectedDate?.toDateString() === date.toDateString()
                                    ? 'bg-blue-600 text-white'
                                    : isAvailableDay(date)
                                    ? 'bg-green-100 text-green-800 font-semibold'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              
                          >
                            {date.getDate()}
                          </button>
                        ) : (
                          <div />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {selectedDate
                      ? `Available times for ${formatDate(selectedDate)}`
                      : "Select a date first"}
                  </h3>
                  {selectedDate && (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((time, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTimeSelect(time)}
                          className="border p-2 rounded hover:bg-teal-50"
                        >
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setStep(2)}
                  className="mr-4 text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold">Project Details</h2>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Consultant:</strong> {selectedConsultant?.name}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {selectedTime && formatTime(selectedTime)}
                  </p>
                  <p>
                    <strong>Duration:</strong> {duration} minutes
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Meeting Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full border p-2 rounded"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Project Details</label>
                  <textarea
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    rows={4}
                    placeholder="Describe your project goals and discussion points"
                    className="w-full border p-3 rounded"
                  />
                </div>
   <LoginSignupModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
      />
                <button
                  onClick={()=>{handleBookingSubmit()}}
                  disabled={!projectDetails.trim()}
                  className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700 disabled:bg-gray-400"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && bookingComplete && (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Your consultation has been successfully scheduled.
              </p>
              <div className="text-left text-sm space-y-1 mb-6">
                <p>
                  <strong>Consultant:</strong> {selectedConsultant?.name}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(selectedDate)}
                </p>
                <p>
                  <strong>Time:</strong> {formatTime(selectedTime)}
                </p>
                <p>
                  <strong>Duration:</strong> {duration} minutes
                </p>
                <p>
                  <strong>Rate:</strong> ₹{selectedConsultant?.hourlyRate}/hour
                </p>
              </div>
              <button
                onClick={resetForm}
                className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
              >
                Book Another Consultation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultantBookingForm;
