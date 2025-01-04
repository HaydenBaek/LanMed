import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import DocumentModal from './DocumentModal';
import { useTranslation } from 'react-i18next';
import NavBarAfterLogin from './NavbarAfterLogin';

function Dashboard() {
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.warn('No user data found in Firestore. Falling back to Firebase Auth...');
                    
                    const authUser = auth.currentUser;
                    if (authUser) {
                        setUserData({
                            name: authUser.displayName || t('unknown'),
                            email: authUser.email || t('no_email'),
                            uid: authUser.uid
                        });
                    } else {
                        console.error('No user data available from Auth.');
                    }
                }
            }
        };
    
        fetchUserData();
    }, [user, t]);
    

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-lighter">
            {/* Fixed Navbar */}
            <div className="w-full fixed top-0 left-0 z-50">
                <NavBarAfterLogin />
            </div>
    
            {/* Main Dashboard Content */}
            <div className="flex flex-col items-center mt-32 px-6"> {/* Add margin-top to avoid overlap */}
                <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full text-center">
                    <div className="p-2 text-primary">
                        <h1 className="text-4xl font-bold">
                            {t('welcome_dashboard', { name: userData?.name || user?.displayName || 'LanMed' })}
                        </h1>
                        <p className="mt-4 text-lg">{t('translator_description')}</p>
                    </div>
                </div>
    
                {/* Button to Open Modal */}
                <div className="mt-10">
                    <button
                        onClick={openModal}
                        className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-lg font-medium text-white rounded-lg group bg-gradient-to-br from-primary to-secondary group-hover:from-secondary group-hover:to-accent hover:text-white focus:ring-4 focus:outline-none focus:ring-accent"
                    >
                        <span className="relative px-12 py-6 flex items-center space-x-3 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                            <span className="text-4xl font-bold">+</span>
                            <span className="text-xl">{t('create_document')}</span>
                        </span>
                    </button>
                </div>
    
                {/* Document Modal */}
                <DocumentModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
}

export default Dashboard;
