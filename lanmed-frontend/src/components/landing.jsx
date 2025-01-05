import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavbarSwitcher from '../components/NavbarSwitcher';
function LandingPage() {
    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <div className="bg-timberwolf min-h-screen w-full fixed top-0 left-0 z-50">
            <NavbarSwitcher/>
            <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                <div className="bg-white p-14 rounded-3xl shadow-2xl text-center max-w-4xl w-full">
                    <h1 className="text-4xl font-bold text-hunter-green mb-8">
                        {t('welcome')}
                    </h1>
                    <p className="text-xl text-fern-green mb-10">
                        {t('description')}
                    </p>
                    <Link
                        to="/signup"
                        className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-200 text-lg"
                    >
                        {t('start')}
                    </Link>
                </div>
            </div>


        </div>
    );
}

export default LandingPage;
