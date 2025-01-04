import React from 'react';
import { useTranslation } from 'react-i18next';
import NavbarSwitcher from '../components/NavbarSwitcher';
function GuidePage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-lighter">
            {/* Navbar */}
            <div className="w-full fixed top-0 left-0 z-50">
            <NavbarSwitcher />
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center mt-20 px-6">
                <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full">
                    <h1 className="text-4xl font-bold text-primary mb-6 text-center">
                        {t('guide_title', 'How to Use LanMed')}
                    </h1>
                    <p className="text-lg text-secondary leading-relaxed mb-6">
                        {t('guide_intro', 'LanMed helps you generate translated medical forms easily. Follow the steps below to get started.')}
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mb-2">{t('step1', 'Step 1: Sign Up')}</h2>
                            <p className="text-md text-secondary">
                                {t('step1_description', 'Create an account by signing up with your email.')}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-primary mb-2">{t('step2', 'Step 2: Complete Your Profile')}</h2>
                            <p className="text-md text-secondary">
                                {t('step2_description', 'Fill out your personal information, including medical history.')}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-primary mb-2">{t('step3', 'Step 3: Create a Document')}</h2>
                            <p className="text-md text-secondary">
                                {t('step3_description', 'Click the "Create Document" button on the dashboard and answer the questions.')}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-primary mb-2">{t('step4', 'Step 4: Translate and Print')}</h2>
                            <p className="text-md text-secondary">
                                {t('step4_description', 'Select the target language, then generate and print the translated form.')}
                            </p>
                        </div>
                    </div>

                    <p className="text-lg font-medium text-accent text-center mt-10">
                        {t('need_help', 'Need further assistance? Contact us at hayden111712@gmail.com')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GuidePage;
