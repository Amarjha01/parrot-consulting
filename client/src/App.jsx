// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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
import Footer from "./components/global/footer.jsx";
import ViewAllConsultants from "./components/ConsultantProfile/ViewAllConsultant.jsx";

const App = () => {
  return (
    <>
    <Navbar />

       <Routes >
      <Route path="/" element={<Home />}/>
      <Route path="/adminsecuredlogin" element={<AdminLoginForm />} />
      <Route path="/howitworks" element={<HowItWorksPage />} />
      <Route path="/categories" element={<PopularCategoriesPage />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/consultantform" element={<ConsultantForm />} />
      <Route path="/consultantprofile/:id/:name" element={<ConsultantDetailView />} />
      <Route path="/consultant/profile" element={<ConsultantProfile />} />
      <Route path="/application-form" element={<ConsultantApplicationForm />} />
      <Route path="/ViewAllConsultants" element={<ViewAllConsultants />} />

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
   <Footer />
    </>
   
  );
};

export default App;
