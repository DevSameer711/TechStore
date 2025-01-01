import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("user");

 
  const isLoginOrSignupPage = ["/login", "/signup"].includes(
    window.location.pathname
  );

  if (!token && !isLoginOrSignupPage) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
