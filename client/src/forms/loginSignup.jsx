import React, { useState } from "react";
import { registerAsUser, loginAsUser } from "../service/userApi";
import { loginAsConsultant } from "../service/consultantApi";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home } from 'lucide-react';

const LoginSignupModal = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authMode === "signup") {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }
        await registerAsUser({ ...formData, role: "user" });
        alert("Signup successful!");
        resetForm();
        switchAuthMode("login");
      } else {
        const loginFn = authMode === "login" ? loginAsUser : loginAsConsultant;
        const response = await loginFn(formData);

        // Clear old roles
        ["user", "consultant", "admin"].forEach(r => localStorage.removeItem(r));

        if (authMode === "consultantLogin") {
          const consultantData = response.data;
          if (!consultantData) throw new Error("No consultant data returned.");
          localStorage.setItem("consultant", JSON.stringify(consultantData));
        } else {
          const userData = response.data?.status;
          const role = userData?.role?.toLowerCase();
          if (!role) throw new Error("No user role found.");
          localStorage.setItem(role, JSON.stringify(userData));
        }

        alert("Login successful!");
        resetForm();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  px-4">
      <Link to="/" className="absolute top-5 left-5 flex items-center gap-1 text-green-700 hover:text-green-900">
        <Home size={20} /> <span className="font-semibold uppercase">Home</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slideUp overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-center text-white">
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

        {/* Tab Switcher */}
        <div className="flex bg-gray-50">
          {["login", "signup", "consultantLogin"].map((mode) => (
            <button
              key={mode}
              onClick={() => switchAuthMode(mode)}
              className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 ${
                authMode === mode
                  ? "bg-white text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {mode === "login"
                ? "User Login"
                : mode === "signup"
                ? "Sign Up"
                : "Consultant Login"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            )}
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {authMode === "signup" && (
              <Input
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            )}
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {authMode === "signup" && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md"
            >
              {loading
                ? "Processing..."
                : authMode === "login" || authMode === "consultantLogin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Bottom Section */}
          {authMode === "login" && (
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Don’t have an account?</span>{" "}
              <button
                onClick={() => switchAuthMode("signup")}
                className="text-green-600 font-medium hover:underline"
              >
                Sign Up
              </button>
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

// ✅ Reusable input component
const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      placeholder={placeholder}
      required
    />
  </div>
);

export default LoginSignupModal;
