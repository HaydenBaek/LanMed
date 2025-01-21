import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';

function Navbar() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);  // Track user state

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('selectedLanguage', newLanguage);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Listen for authentication changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <nav className="bg-primary w-full border-b-2 border-secondary">
            <div className="flex flex-wrap items-center justify-between p-4 w-full">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold text-white">LanMed</span>
                </Link>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-secondary"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Language Selector */}
                <div className="flex md:order-2">
                    <select
                        id="language-select"
                        onChange={handleLanguageChange}
                        defaultValue={i18n.language}
                        className="px-4 py-2 border rounded bg-accent text-white"
                    >
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="ko">한국어</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文 (简体)</option>
                        <option value="pt1">Português (Brasil)</option>
                        <option value="pj">ਪੰਜਾਬੀ (Punjabi)</option>
                        <option value="ar">العربية (Arabic)</option>
                        <option value="po">Polski (Polish)</option>
                        <option value="tr">Türkçe (Turkish)h</option>
                        <option value="it">Italiano</option>
                    </select>
                </div>

                {/* Desktop View Links */}
                <div className="hidden w-full md:flex md:w-auto md:order-1 justify-between">
                    <ul className="flex flex-row w-full md:space-x-20 px-10 md:px-0 mt-4 font-medium border border-accent rounded-lg bg-light md:mt-0 md:border-0">
                        <li>
                            <Link to="/" className="py-2 px-4 text-white hover:bg-secondary rounded">
                                {t('home', 'Home')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/guide" className="py-2 px-4 text-white hover:bg-secondary rounded">
                                {t('guide', 'Guide')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="py-2 px-4 text-white hover:bg-secondary rounded">
                                {t('about', 'About Us')}
                            </Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/profile" className="py-2 px-4 text-white hover:bg-secondary rounded">
                                    {t('profile', 'Profile')}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="w-full md:hidden">
                        <ul className="flex flex-col p-4 mt-4 border border-accent rounded-lg bg-light">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="py-2 px-3 block text-white hover:bg-secondary rounded"
                                >
                                    {t('home', 'Home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/guide"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="py-2 px-3 block text-white hover:bg-secondary rounded"
                                >
                                    {t('guide', 'Guide')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="py-2 px-3 block text-white hover:bg-secondary rounded"
                                >
                                    {t('about', 'About Us')}
                                </Link>
                            </li>
                            {user && (
                                <li>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="py-2 px-3 block text-white hover:bg-secondary rounded"
                                    >
                                        {t('profile', 'Profile')}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
