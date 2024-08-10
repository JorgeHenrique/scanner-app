import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = Cookies.get('jwt_token');

  if (!token) {
    return <Navigate to="/scanner-app/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
