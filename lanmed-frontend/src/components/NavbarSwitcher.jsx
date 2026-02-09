import React from 'react';
import Navbar from './Navbar';  // Navbar before login
import NavbarAfterLogin from './NavbarAfterLogin';  // Navbar after login
import { useAuth } from '../hooks/useAuth';

function NavbarSwitcher() {
    const { user } = useAuth();

    return user ? <NavbarAfterLogin /> : <Navbar />;
}

export default NavbarSwitcher;
