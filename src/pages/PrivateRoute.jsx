import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute component protects routes that require authentication
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("name"); // Check if the user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login page if not logged in
  }

  return <Outlet />; // Render protected route components if logged in
};

export default PrivateRoute;
