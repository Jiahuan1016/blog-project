import React from 'react';
import { Navigate } from 'react-router-dom';
import ArticleList from './ArticleList';

const isLoggedIn = () => !!localStorage.getItem('token');

function ProtectedHome() {
  return isLoggedIn() ? <ArticleList /> : <Navigate to="/login" replace />;
}

export default ProtectedHome;
