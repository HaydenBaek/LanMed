import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CompleteProfile() {
  const { t } = useTranslation();

  const [dob, setDob] = useState('');
  const [calculatedAge, setCalculatedAge] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [surgeries, setSurgeries] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);

    // Calculate age
    if (dobValue) {
      const today = new Date();
      const birthDate = new Date(dobValue);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setCalculatedAge(age);
    } else {
      setCalculatedAge('');
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setError(t('user_not_authenticated'));
      console.error('Error: User not authenticated.');
      return;
    }

    try {
      console.log('Updating Firestore...');
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        dob,
        age: calculatedAge,
        allergies,
        medications,
        surgeries,
        firstLogin: false,
      }, { merge: true });

      console.log('Firestore updated.');
      navigate('/dashboard');

    } catch (error) {
      setError(t('profile_update_failed'));
      console.error('Error in profile completion:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          {t('complete_profile')}
        </h1>
        <form onSubmit={handleCompleteProfile} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('dob')}
          </label>
          <input
            type="date"
            value={dob}
            onChange={handleDobChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-accent"
          />
          {calculatedAge && (
            <p className="mt-2 text-sm">
              {t('age')}: <strong>{calculatedAge}</strong> {t('years')}
            </p>
          )}

          <textarea
            placeholder={t('allergies_placeholder')}
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-accent"
          ></textarea>
          <textarea
            placeholder={t('medications_placeholder')}
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-accent"
          ></textarea>
          <textarea
            placeholder={t('surgeries_placeholder')}
            value={surgeries}
            onChange={(e) => setSurgeries(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-accent"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {t('save_profile')}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}

export default CompleteProfile;
