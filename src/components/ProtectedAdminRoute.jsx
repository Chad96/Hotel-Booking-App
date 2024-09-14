import React from "react";
import { useSelector } from "react-redux"; // Assuming you're using Redux for user state
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user); // Assuming you have user data in Redux state

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    // If the user is logged in but not an admin, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the requested page
  return children;
};

export default ProtectedAdminRoute;
