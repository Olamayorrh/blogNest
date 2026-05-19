import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { userContext } from './Context';

const ProtectedRoute = () => {
  const { user } = useContext(userContext);

  // If user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/loginSignUp" replace />;
  }

  // Render the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
