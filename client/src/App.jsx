// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ConsultantDashboard from './pages/ConsultantDashboard';
// import ClientDashboard from './pages/ClientDashboard';
import ConsultantProfile from "./pages/ConsultantProfile";
import ConsultantApplicationForm from "./forms/consultantApplicationform";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginForm from "./forms/adminRegistrationLogin";
import PrivateRoute from "./routes/ProtectedRoutes";
import UserDashboard from "./pages/ClientDashboard";
import ConsultantDashboard from "./pages/ConsultantDashboard";
// import AdminDashboard from './pages/AdminDashboard';
// import PendingConsultants from './pages/PendingConsultants';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminsecuredlogin" element={<AdminLoginForm />} />
      {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

      {/* Client routes */}
      {/* <Route path="/client/dashboard" element={<ClientDashboard />} /> */}

      {/* Consultant routes */}
      {/* <Route path="/consultant/dashboard" element={<ConsultantDashboard />} /> */}
      <Route path="/consultant/profile" element={<ConsultantProfile />} />

      {/* Admin routes */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pending-consultants" element={<PendingConsultants />} /> */}
        <Route path="/application-form" element={<ConsultantApplicationForm />} />

        <Route
          path="/admindashboard"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ConsultantDashboard"
          element={
            <PrivateRoute allowedRole="consultant">
              <ConsultantDashboard />
            </PrivateRoute>
          }
        />
        
    </Routes>
  );
};

export default App;
