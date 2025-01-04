import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Navbar from './Navbar';  // Navbar before login
import NavbarAfterLogin from './NavbarAfterLogin';  // Navbar after login

function NavbarSwitcher() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();  // Cleanup on unmount
    }, []);

    return user ? <NavbarAfterLogin /> : <Navbar />;
}

export default NavbarSwitcher;
