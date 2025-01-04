import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NavbarSwitcher from '../components/NavbarSwitcher';

function ProfilePage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        dob: '',
        allergies: '',
        medications: '',
        surgeries: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const user = auth.currentUser;

    // Fetch user data on load
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        email: user.email || '',
                        password: '',
                        dob: data.dob || '',
                        allergies: data.allergies || '',
                        medications: data.medications || '',
                        surgeries: data.surgeries || ''
                    });
                } else {
                    console.warn('No user data found');
                }
            }
        };
        fetchUserData();
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle profile update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Update email if changed
            if (formData.email !== user.email) {
                await updateEmail(user, formData.email);
            }

            // Update password if provided
            if (formData.password) {
                await updatePassword(user, formData.password);
            }

            // Update Firestore data
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                dob: formData.dob,
                allergies: formData.allergies,
                medications: formData.medications,
                surgeries: formData.surgeries
            });

            setSuccess(t('profile_updated_successfully'));
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(t('profile_update_failed'));
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-lighter">
            {/* Navbar */}
            <div className="w-full fixed top-0 left-0 z-50">
            <NavbarSwitcher />
            </div>

            {/* Profile Form */}
            <div className="flex items-center justify-center mt-10 px-8">
                <div className="bg-white p-20 rounded-lg shadow-lg max-w-2xl w-full">
                    <h1 className="text-4xl font-bold text-primary mb-10 text-center">
                        {t('profile')}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-lg font-medium">{t('email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-lg font-medium">{t('password')}</label>
                            <input
                                type="password"
                                name="password"
                                placeholder={t('new_password')}
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                            />
                            <p className="text-sm text-gray-500">{t('leave_blank_password')}</p>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-lg font-medium">{t('dob')}</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>

                        {/* Allergies */}
                        <div>
                            <label className="block text-lg font-medium">{t('allergies')}</label>
                            <textarea
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                placeholder={t('none_if_none')}
                            ></textarea>
                        </div>

                        {/* Medications */}
                        <div>
                            <label className="block text-lg font-medium">{t('medications')}</label>
                            <textarea
                                name="medications"
                                value={formData.medications}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                placeholder={t('none_if_none')}
                            ></textarea>
                        </div>

                        {/* Surgeries */}
                        <div>
                            <label className="block text-lg font-medium">{t('surgeries')}</label>
                            <textarea
                                name="surgeries"
                                value={formData.surgeries}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                placeholder={t('none_if_none')}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white py-4 px-6 rounded-lg font-medium transition duration-200"
                        >
                            {t('update_profile')}
                        </button>
                    </form>

                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

                    {/* Logout Button */}
                    <div className="mt-10">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition duration-200"
                        >
                            {t('logout', 'Logout')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
