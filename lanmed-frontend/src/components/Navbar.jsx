import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('selectedLanguage', newLanguage);  // Save to localStorage
    };

    React.useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <nav className="bg-white border-secondary dark:bg-light">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LanMed</span>
                </Link>
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
                        <option value="it">Italiano</option>
                        <option value="nl">Nederlands</option>
                        <option value="pl">Polski</option>
                        <option value="pt">Português</option>
                        <option value="ru">Русский</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文 (简体)</option>
                        <option value="ko">한국어</option>
                    </select>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-lighter md:dark:bg-light">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0">{t('home', 'Home')}</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0">{t('about', 'About')}</Link>
                        </li>
                        <li>
                            <Link to="/services" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0">{t('services', 'Services')}</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0">{t('contact', 'Contact')}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
