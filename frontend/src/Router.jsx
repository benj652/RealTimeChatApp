import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import CreateGroupChatPage from './pages/CreateGroupChatPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignUpPage';

const Router = () => {
  const { authUser } = useAuthContext();
  return (
    <BrowserRouter>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
          <Route
            path="/profile/:id"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="creategc"
            element={authUser ? <CreateGroupChatPage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default Router;
