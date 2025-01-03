import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import DocumentModal from './DocumentModal';

function Dashboard() {
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
                    
                    // Fallback to Firebase Auth data
                    const authUser = auth.currentUser;
                    if (authUser) {
                        setUserData({
                            name: authUser.displayName || 'Unknown',
                            email: authUser.email || 'No email',
                            uid: authUser.uid
                        });
                    } else {
                        console.error('No user data available from Auth.');
                    }
                }
            }
        };
    
        fetchUserData();
    }, [user]);
    

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="p-2 text-primary">
                    <h1 className="text-3xl font-bold">
                        Welcome {userData?.name || user?.displayName || 'to LanMed'} to LanMed
                    </h1>
                    <p className="mt-4">Your medical translator at your fingertips.</p>
                </div>
            </div>

            {/* Button to Open Modal */}
            <div className="mt-8">
                <button
                    onClick={openModal}
                    className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-lg font-medium text-white rounded-lg group bg-gradient-to-br from-primary to-secondary group-hover:from-secondary group-hover:to-accent hover:text-white focus:ring-4 focus:outline-none focus:ring-accent dark:focus:ring-light"
                >
                    <span className="relative px-8 py-6 flex items-center space-x-3 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                        <span className="text-4xl font-bold">+</span>
                        <span className="text-xl">Create Document</span>
                    </span>
                </button>
            </div>

            {/* Document Modal */}
            <DocumentModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default Dashboard;
