import React from 'react';
import NavbarAfterLogin from './NavbarAfterLogin';
import { useTranslation } from 'react-i18next';
import NavbarSwitcher from './NavbarSwitcher';

function AboutUs() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-light">
            {/* Fixed Navbar */}
            <div className="w-full fixed top-0 left-0 z-50">
            <NavbarSwitcher />
            </div>

            {/* Main About Us Content */}
            <div className="flex items-center justify-center mt-11 px-6">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-center">
                    <h1 className="text-4xl font-bold text-primary mb-6">{t('about_us_title')}</h1>
                    <p className="text-lg text-secondary leading-relaxed">
                        {t('about_us_paragraph1')}
                    </p>

                    <p className="text-lg text-secondary leading-relaxed mt-6">
                        {t('about_us_paragraph2')}
                    </p>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-primary mb-4">{t('who_i_am')}</h2>
                        <p className="text-md text-secondary leading-relaxed">
                            {t('about_us_paragraph3')}
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-primary mb-4">{t('contact_me')}</h2>
                        <p className="text-md text-secondary leading-relaxed">
                            {t('about_us_contact')}
                        </p>
                        <p className="text-lg font-medium text-accent mt-4">hayden111712@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
