import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

const WithAuth = (Component) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />;
  };
};

export default WithAuth;