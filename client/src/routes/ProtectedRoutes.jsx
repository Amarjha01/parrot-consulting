import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const consultant = JSON.parse(localStorage.getItem("consultant"));

  if (allowedRole === "admin" && admin) {
    return children;
  }

  if (allowedRole === "consultant" && consultant) {
    return children;
  }
  if (allowedRole === "user" && user) {
    return children;
  }

  // If neither match, redirect to login
  return <Navigate to="/adminsecuredlogin" />;
};

export default PrivateRoute;
