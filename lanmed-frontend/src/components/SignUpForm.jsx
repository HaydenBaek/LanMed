import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SignUpForm() {

  

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Auth display name
      await updateProfile(user, {
        displayName: name,
      });

      // Save user to Firestore with 'firstLogin' flag
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        uid: user.uid,  // Store UID for reference
        displayName: name,  // Sync with Auth profile
        firstLogin: true,
    });
    

      console.log('User Created and Profile Set in Firestore:', user);

      // Redirect to complete profile page instead of dashboard
      navigate('/complete-profile');
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name(Legal)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-accent focus:outline-none"
          />
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
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <p className="text-sm text-primary">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
    </div>
  );
}

export default SignUpForm;
