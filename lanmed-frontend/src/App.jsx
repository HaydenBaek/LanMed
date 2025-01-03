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
  const user = useAuth();  // Get authenticated user (or null if not logged in)

  return (
    <Router>
<div className="min-h-screen bg-lighter flex items-start justify-center pt-10">

        <div>
          <Routes>
            <Route path="/landing" element={<LandingPage/>}/>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signup" />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/landing"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
