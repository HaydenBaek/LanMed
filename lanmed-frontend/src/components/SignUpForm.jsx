import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerUser, getProfile } from '../utils/api';
import { useAuth } from '../hooks/useAuth';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();  // Translation hook
  const { setUser } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, name });
      const profile = await getProfile();
      setUser(profile);
      navigate('/complete-profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-20 bg-white p-8  rounded-lg shadow-lg w-96">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">{t('sign_up')}</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          placeholder={t('full_name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          {t('submit')}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <p className="text-sm text-primary">
        {t('login_prompt')}{' '}
        <Link to="/login" className="text-accent hover:underline">
          {t('login')}
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
