import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import checkFirstTimeLogin from '../utils/checkFirstTimeLogin';  // Import the function
import { useTranslation } from 'react-i18next';

function LoginForm() {
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== i18n.language) {
        i18n.changeLanguage(savedLanguage);
    }
}, [i18n]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Check if it's first-time login
      const { isFirstTime } = await checkFirstTimeLogin(user.uid);

      if (isFirstTime) {
        // Redirect to onboarding/profile completion page
        navigate('/complete-profile');
      } else {
        // Redirect to dashboard for returning users
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
