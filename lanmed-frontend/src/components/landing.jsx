import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';

function LandingPage() {

    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <div className="bg-timberwolf min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center">
                <h1 className="text-5xl font-bold text-hunter-green mb-6">{t('welcome')}</h1>
                <p className="text-lg text-fern-green mb-8 max-w-2xl">{t('description')}</p>
                <Link to="/signup" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary">{t('guide')}</Link>

            </div>
        </div>
    );
}

export default LandingPage;
