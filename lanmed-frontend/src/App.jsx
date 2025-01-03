import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import LandingPage from './components/landing';
import CompleteProfile from './components/CompleteProfile';
import { useAuth } from './hooks/useAuth';
import './i18n';  // Import the i18n configuration

function App() {
  const { user, loading } = useAuth();  // Destructure user and loading

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>  {/* Show loading message or spinner */}
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-lighter flex items-start justify-center pt-10">
        <div>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/signup" element={!user ? <SignUpForm /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signup" />} />
            <Route path="/complete-profile" element={user ? <CompleteProfile /> : <Navigate to="/signup" />} />
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/landing"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
