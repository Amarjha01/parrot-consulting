import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, MessageCircle } from 'lucide-react';

const BookingPage = ({ 
  isOpen = true, 
  onClose = () => {}, 
  consultant = {
    name: "Dr. Sarah Johnson",
    about: "Expert business consultant with 10+ years of experience in strategic planning and growth optimization.",
    weeklyAvailability: {
      Monday: [
        { start: "17:06", end: "20:06", _id: "685fa9b8f830f0351b99f124" }
      ],
      Tuesday: [
        { start: "09:00", end: "12:00", _id: "685fa9b8f830f0351b99f125" },
        { start: "14:00", end: "17:00", _id: "685fa9b8f830f0351b99f126" }
      ],
      Wednesday: [
        { start: "10:00", end: "13:00", _id: "685fa9b8f830f0351b99f127" }
      ],
      Friday: [
        { start: "15:00", end: "18:00", _id: "685fa9b8f830f0351b99f128" }
      ]
    }
  }
}) => {
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (consultant.weeklyAvailability[dayName]) {
        dates.push({
          date: date.toISOString().split('T')[0],
          dayName,
          displayDate: date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          availability: consultant.weeklyAvailability[dayName]
        });
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const generateTimeSlots = (start, end) => {
    const slots = [];
    const startTime = new Date(`2024-01-01T${start}:00`);
    const endTime = new Date(`2024-01-01T${end}:00`);
    
    while (startTime < endTime) {
      slots.push(startTime.toTimeString().slice(0, 5));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return slots;
  };

  const getAvailableTimesForDate = (date) => {
    const selectedDateObj = availableDates.find(d => d.date === date);
    if (!selectedDateObj) return [];
    
    const allSlots = [];
    selectedDateObj.availability.forEach(slot => {
      const slots = generateTimeSlots(slot.start, slot.end);
      allSlots.push(...slots);
    });
    return allSlots;
  };

  const handleBookMeeting = () => {
    if (!selectedDate || !selectedTime || !projectDetails.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const selectedDateObj = availableDates.find(d => d.date === selectedDate);
    const message = `Hi! I'd like to book a consultation with ${consultant.name}.

📅 Date: ${selectedDateObj.displayDate}
⏰ Time: ${selectedTime}
⏱️ Duration: ${selectedDuration === '15' ? '15 minutes (FREE)' : '20 minutes (₹499)'}

📝 Project Details:
${projectDetails}

Looking forward to our meeting!`;

    const whatsappUrl = `https://wa.me/918868864441?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 120
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0  z-50 flex justify-end  "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className=" bg-white border border-green-900 h-full w-full md:w-2/3 lg:w-1/2 overflow-y-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#3b8c60] to-[#207158] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-[#103e39]">Book a consultation</h1>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-8">


              {/* Consultant Card */}
              <motion.section 
                className="bg-white  border border-gray-200 rounded-2xl p-6 shadow-sm "
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3b8c60] to-[#207158] rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#103e39] mb-2">{consultant.name}</h3>
                    <p className="text-gray-600">{consultant.about}</p>
                  </div>
                </div>

                {/* Duration Selection */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#103e39] mb-4">How long would you like to meet for?</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="duration"
                        value="15"
                        checked={selectedDuration === '15'}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-5 h-5 text-[#3b8c60] focus:ring-[#3b8c60]"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-[#103e39]">15 minutes</span>
                        <span className="text-[#3b8c60] font-semibold">FREE</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="duration"
                        value="30"
                        checked={selectedDuration === '30'}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-5 h-5 text-[#3b8c60] focus:ring-[#3b8c60]"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-[#103e39]">30 minutes</span>
                        <span className="text-[#3b8c60] font-semibold">₹499</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#103e39] mb-4">Select Date</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableDates.slice(0, 12).map((dateObj) => (
                      <button
                        key={dateObj.date}
                        onClick={() => {
                          setSelectedDate(dateObj.date);
                          setSelectedTime(''); // Reset time when date changes
                        }}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedDate === dateObj.date
                            ? 'bg-[#3b8c60] text-white border-[#3b8c60]'
                            : 'border-gray-200 hover:border-[#3b8c60] hover:bg-[#3b8c60]/5'
                        }`}
                      >
                        <div className="text-sm font-medium">{dateObj.dayName}</div>
                        <div className="text-xs opacity-80">{dateObj.displayDate}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-[#103e39] mb-4 flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Select Time</span>
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {getAvailableTimesForDate(selectedDate).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            selectedTime === time
                              ? 'bg-[#3b8c60] text-white border-[#3b8c60]'
                              : 'border-gray-200 hover:border-[#3b8c60] hover:bg-[#3b8c60]/5'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Project Details */}
                {selectedDate && selectedTime && (
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-[#103e39] mb-4">Project Details</h4>
                    <textarea
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Please describe your project or what you'd like to discuss during the consultation..."
                      className="w-full p-4 border border-gray-200 rounded-xl focus:border-[#3b8c60] focus:ring-2 focus:ring-[#3b8c60]/20 outline-none transition-all resize-none"
                      rows="4"
                    />
                  </motion.div>
                )}

                {/* Book Meeting Button */}
                {selectedDate && selectedTime && projectDetails.trim() && (
                  <motion.button
                    onClick={handleBookMeeting}
                    className="w-full md:w-[30%] bg-gradient-to-r from-[#3b8c60] to-[#207158] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Book Meeting</span>
                  </motion.button>
                )}
              </motion.section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingPage;