import React from 'react';
import { useTranslation } from 'react-i18next';
import NavbarSwitcher from './NavbarSwitcher';

// Import images
import step1 from '../images/SCR-20250103-tduz.png';
import step11 from '../images/SCR-20250103-sqmx-2.png';
import step2 from '../images/SCR-20250103-sxmb.png';
import step3 from '../images/SCR-20250103-syaq.png';
import step4 from '../images/SCR-20250103-syqi.png';
import step5 from '../images/SCR-20250103-tcem.png';
import step6 from '../images/SCR-20250103-tdcz.png';
// import step6 from '/Users/haydenbaek/Desktop/side_projects/LanMed2/lanmed-frontend/src/images/SCR-20250103-tdcz.png';



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

                    <div className="space-y-12">
                        {/* Step 1 - Choose Language and Start */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step1', 'Step 1: Choose Language and Start')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step1_description', 'Select your preferred language and click the "Start" button.')}
                            </p>
                            <img src={step1} alt="Choose Language and Start" className="rounded-lg shadow-md w-full mt-6" />
                            <img src={step11} alt="Language Selection Example" className="rounded-lg shadow-md w-full mt-6" />
                        </div>

                        {/* Step 2 - Sign Up or Login */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step2', 'Step 2: Sign Up or Login')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step2_description', 'Create an account or log in if you already have one.')}
                            </p>
                            <img src={step2} alt="Sign Up or Login" className="rounded-lg shadow-md w-full mt-6" />
                        </div>

                        {/* Step 3 - Complete Profile */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step3', 'Step 3: Complete Your Profile')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step3_description', 'Fill out your personal information, including medical history.')}
                            </p>
                            <img src={step3} alt="Complete Profile" className="rounded-lg shadow-md w-full mt-6" />
                        </div>

                        {/* Step 4 - Create Document */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step4', 'Step 4: Create a Document')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step4_description', 'Click the "Create Document" button on the dashboard and answer the questions.')}
                            </p>
                            <img src={step4} alt="Create Document" className="rounded-lg shadow-md w-full mt-6" />
                        </div>

                        {/* Step 5 - Finish the Survey */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step5', 'Step 5: Finish the Survey')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step5_description', 'Answer the health-related questions to complete your document.')}
                            </p>
                            <img src={step5} alt="Finish the Survey" className="rounded-lg shadow-md w-full mt-6" />
                        </div>

                        {/* Step 6 - Choose PDF Language */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step6', 'Step 6: Choose PDF Language')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step6_description', 'Select the language in which you want your PDF to be translated.')}
                            </p>
                            <img src={step6} alt="Choose PDF Language" className="rounded-lg shadow-md w-full mt-6" />
                        </div>

                        {/* Step 7 - Watch Tutorial Video */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mt-6">
                                {t('step7', 'Step 7: Watch the Tutorial Video')}
                            </h2>
                            <p className="text-md text-secondary mt-2">
                                {t('step7_description', 'Watch this tutorial video for a visual guide on using LanMed.')}
                            </p>
                            <div className="relative pb-56 h-0" style={{ paddingBottom: '56.25%' }}>
                                <iframe 
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src="https://www.youtube.com/embed/wMBsw8J_37M"
                                    title="LanMed Tutorial Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <p className="text-lg font-medium text-accent text-center mt-12">
                        {t('need_help', 'Need further assistance? Contact us at hayden111712@gmail.com')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GuidePage;
