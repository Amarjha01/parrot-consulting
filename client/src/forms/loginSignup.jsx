import React, { useState } from "react";
import { registerAsUser, loginAsUser } from "../service/userApi";
import { loginAsConsultant } from "../service/consultantApi"; // ✅ Import consultant login API
import { useNavigate } from "react-router-dom";
const LoginSignupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login"); // 'login', 'signup', 'consultantLogin'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authMode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await registerAsUser({ ...formData, role: "user" });
        alert("Signup successful!");
        onClose();
      } else if (authMode === 'login' || authMode === 'consultantLogin') {
        const loginFunction = authMode === 'login' ? loginAsUser : loginAsConsultant;
        const response = await loginFunction(formData);
        console.log("API response:", response);

        // Extract user data depending on auth mode
        const userData = authMode === 'login'
          ? response.data?.status
          : response.data?.data;

        const role = userData?.role?.toLowerCase(); // handles both login types

        console.log("Extracted role:", role);
        console.log("User data to store:", userData);

        if (!role) {
          alert("Login succeeded but role is missing. Check API response.");
          return;
        }

        // Clear previous roles
        localStorage.removeItem("admin");
        localStorage.removeItem("consultant");
        localStorage.removeItem("user");

        // Save role and redirect
        switch (role) {
          case 'consultant':
            localStorage.setItem("consultant", JSON.stringify(userData));
            navigate('/ConsultantDashboard');
            break;
          case 'user':
            localStorage.setItem("user", JSON.stringify(userData));
            navigate('/userdashboard');
            break;
          default:
            alert("Unknown role: " + role + ". Redirecting to homepage.");
            navigate('/');
        }

        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (authMode === 'signup') {
//         if (formData.password !== formData.confirmPassword) {
//           alert("Passwords do not match");
//           return;
//         }
  
//         await registerAsUser({ ...formData, role: "user" });
//         console.log("FULL login response:", response);

//         alert("Signup successful!");
//         onClose();
//       } else if (authMode === 'login' || authMode === 'consultantLogin') {
//         const loginFunction = authMode === 'login' ? loginAsUser : loginAsConsultant;
//         const response = await loginFunction(formData);
  
//         // ✅ CORRECT EXTRACTION
//         const isUserLogin = authMode === 'login';
//         const user = isUserLogin ? response.data?.data?.user : response.data?.data?.data?.user?.role;
//         const token = response.data?.data?.accessToken;
//         console.log("Extracted user:", user);
// console.log("Extracted token:", token);
  
//         if (!user || !token) {
//           console.log("FULL login response:", response);

//           alert("Login response missing user or token");
//           return;
//         }
  
//         const userData = {
//           ...user,
//           token, // ✅ token will now be stored
//         };
  
//         const role = user?.role?.toLowerCase();
  
//         if (!role) {
//           alert("Login succeeded but role is missing. Check API response.");
//           return;
//         }
  
//         // Clear old roles
//         localStorage.removeItem("admin");
//         localStorage.removeItem("consultant");
//         localStorage.removeItem("user");
  
//         // Save and redirect
//         switch (role) {
//           case 'consultant':
//             localStorage.setItem("consultant", JSON.stringify(userData));
//             navigate('/ConsultantDashboard');
//             break;
//           case 'user':
//             localStorage.setItem("user", JSON.stringify(userData));
//             navigate('/userdashboard');
//             break;
//           default:
//             alert("Unknown role: " + role + ". Redirecting to homepage.");
//             navigate('/');
//         }
  
//         alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
//         onClose();
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || "Something went wrong");
//     }
//   };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">
              {authMode === "signup"
                ? "Join Our Community"
                : authMode === "consultantLogin"
                ? "Welcome Consultant"
                : "Welcome Back!"}
            </h2>
            <p className="text-green-100 text-sm">
              {authMode === "signup"
                ? "Create your account to get started"
                : "Sign in to access your account"}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-50 rounded-none">
          <button
            onClick={() => switchAuthMode("login")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 ${
              authMode === "login"
                ? "bg-white text-green-600 shadow-sm border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => switchAuthMode("signup")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 ${
              authMode === "signup"
                ? "bg-white text-green-600 shadow-sm border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => switchAuthMode("consultantLogin")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 ${
              authMode === "consultantLogin"
                ? "bg-white text-green-600 shadow-sm border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Consultant Login
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name - Only for Signup */}
            {authMode === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* phonenumber */}
            {authMode === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only for Signup */}
            {authMode === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {authMode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Forgot Password - Only for Login */}
          {authMode === "login" && (
            <div className="mt-4 text-center">
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          )}

          {/* Terms and Conditions - Only for Signup */}
          {authMode === "signup" && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginSignupModal;
