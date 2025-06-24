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
import HowItWorksPage from "./pages/HowitWorks";
import PopularCategoriesPage from "./pages/Categories";
import AboutUsPage from "./pages/AboutUs";
import ConsultantForm from "./components/global/ConsultantForm.jsx";
import Navbar from "./components/global/navbar.jsx";
import ConsultantDetailView from "./components/ConsultantProfile/consultantDetailView.jsx";
import MeetingRoom from "./videoroom/meeting.jsx";
// import AdminDashboard from './pages/AdminDashboard';
// import PendingConsultants from './pages/PendingConsultants';

const App = () => {
  return (
    <>
      <Navbar />
      <div className=" ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminsecuredlogin" element={<AdminLoginForm />} />
          <Route path="/howitworks" element={<HowItWorksPage />} />
          <Route path="/categories" element={<PopularCategoriesPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/consultantform" element={<ConsultantForm />} />
          <Route
            path="/consultantprofile/:id"
            element={<ConsultantDetailView />}
          />

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
          <Route
            path="/application-form"
            element={<ConsultantApplicationForm />}
          />
         
         
          <Route path="/meeting/:bookingId" element={<MeetingRoom />} />

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
      </div>
    </>
  );
};

export default App;
