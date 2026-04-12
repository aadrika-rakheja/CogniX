import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // decode token
  const user = JSON.parse(atob(token.split(".")[1]));

  // 🔥 admin check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoutes;