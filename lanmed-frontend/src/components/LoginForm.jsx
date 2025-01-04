import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import checkFirstTimeLogin from '../utils/checkFirstTimeLogin';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';  // Ensure i18n is imported

function LoginForm() {
  const { t } = useTranslation();

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { isFirstTime } = await checkFirstTimeLogin(user.uid);

      if (isFirstTime) {
        navigate('/complete-profile');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(t('invalid_credentials'));  // Translate error message
      console.error('Login error:', error);
    }
  };

  return (
    <div className="mt-20 bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        {t('login')}
      </h1>
      <form onSubmit={handleLogin} className="space-y-4" >
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
          {t('login')}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="text-sm text-primary">
        {t('signup_prompt')}{' '}
        <Link to="/signup" className="text-accent hover:underline">
          {t('signup')}
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
