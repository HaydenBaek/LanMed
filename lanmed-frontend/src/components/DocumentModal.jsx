import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import generatePDF from './generatePDF';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const DocumentModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    const initialFormState = {
        pdfName: '',
        symptoms: '',
        symptomStartDate: '',
        symptomStartTime: '',
        severity: '',
        doctorQuestions: '',
        notes: '',
        medicationTaken: '',
        translatedSymptoms: '',
        translatedQuestions: '',
        language: 'en'
    };




    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(initialFormState);
    const [userData, setUserData] = useState({});
    const user = auth.currentUser;

    const fetchUserData = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());  // Set data directly
                } else {
                    console.log('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const translateText = async (text) => {
        if (!text || text.trim() === '') {
            console.warn("Empty text, skipping translation.");
            return text;
        }
    
        // Use selected source language or default to English
        const sourceLang = formData.sourceLanguage || 'EN';  
        const targetLang = formData.language.toUpperCase(); 
        const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
    
        const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(text)}&source_lang=${sourceLang}&target_lang=${targetLang}`;
    
        try {
            const res = await fetch(apiUrl);
            const responseBody = await res.json();
    
            console.log('DeepL Response Status:', res.status);
            console.log('DeepL Response Body:', responseBody);
    
            if (!res.ok) {
                console.error('DeepL API Error:', responseBody.message);
                return `Translation error: ${responseBody.message || 'Unknown error'}`;
            }
    
            if (responseBody.translations && responseBody.translations[0]) {
                return responseBody.translations[0].text;
            } else {
                console.error("Translation failed.");
                return text;
            }
        } catch (error) {
            console.error("Translation Error:", error);
            return text;
        }
    };
    






    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslateAndSubmit = async (t) => {
        if (user) {
            setIsTranslating(true);  
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = docSnap.data();
    
                try {
                    // Translate user data fields
                    const [
                        translatedName,
                        translatedDob,
                        translatedAllergies,
                        translatedMedications,
                        translatedSurgeries
                    ] = await Promise.all([
                        translateText(data.name, formData.language),
                        translateText(data.dob, formData.language),
                        translateText(data.allergies || 'None', formData.language),
                        translateText(data.medications || 'None', formData.language),
                        translateText(data.surgeries || 'None', formData.language)
                    ]);
    
                    const translatedUserData = {
                        ...data,
                        translatedName,
                        translatedDob,
                        translatedAllergies,
                        translatedMedications,
                        translatedSurgeries
                    };
    
                    // Translate form data fields
                    const [
                        translatedSymptoms,
                        translatedQuestions,
                        translatedNotes,
                        translatedMedicationTaken
                    ] = await Promise.all([
                        translateText(formData.symptoms, formData.language),
                        translateText(formData.doctorQuestions, formData.language),
                        translateText(formData.notes, formData.language),
                        translateText(formData.medicationTaken, formData.language)
                    ]);
    
                    // Use PDF name from formData if provided, otherwise fallback to original name
                    const pdfName = formData.pdfName || `${data.name}_${new Date().toISOString().slice(0, 10)}`;
                    
                    const finalData = {
                        ...translatedUserData,
                        ...formData,
                        translatedSymptoms,
                        translatedQuestions,
                        translatedNotes,
                        translatedMedicationTaken,
                        pdfName,
                        createdAt: new Date()
                    };
    
                    await addDoc(collection(db, `users/${user.uid}/documents`), {
                        documentData: finalData,
                        pdfName: pdfName,
                        createdAt: new Date()
                    });
    
                    generatePDF(finalData, translatedUserData, t, i18n.language, formData.language, pdfName);
                } catch (error) {
                    console.error('Error saving document:', error);
                    alert('Failed to save document.');
                } finally {
                    setIsTranslating(false);  // Reset loading state
                }
            } else {
                console.warn('No user data found.');
                setIsTranslating(false);
            }
        }
    };
    




    const resetForm = () => {
        setFormData(initialFormState);
        setStep(0);
    };


    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            resetForm();
            onClose();
        }
    };


    const components = [
        // Step 1 - Document Naming and User Info
        <div key="step1">
            <h2 className="text-2xl font-bold mb-4">{t('name_document')}</h2>
            <input
                name="pdfName"
                type="text"
                placeholder={t('enter_pdf_name')}
                value={formData.pdfName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <h2 className="text-xl font-bold mt-6">{t('your_information')}</h2>
            <p><strong>{t('name')}:</strong> {userData.name || t('na')}</p>
            <p><strong>{t('age')}:</strong> {userData.age || t('na')}</p>
            <p><strong>{t('allergies')}:</strong> {userData.allergies || t('none')}</p>
            <p><strong>{t('medications')}:</strong> {userData.medications || t('none')}</p>
        </div>,

        // Step 2 - Symptom Description
        <div key="step2">
            <h2 className="text-2xl font-bold mb-4">{t('describe_symptoms')}</h2>
            <textarea
                name="symptoms"
                placeholder={t('describe_your_symptoms')}
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            ></textarea>

            <label>{t('symptom_start_date')}:</label>
            <input
                type="date"
                name="symptomStartDate"
                value={formData.symptomStartDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
            />

            <label>{t('symptom_start_time')}:</label>
            <input
                type="time"
                name="symptomStartTime"
                value={formData.symptomStartTime}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
            />
        </div>,

        // Step 3 - Severity and Medication
        <div key="step3">
            <h2 className="text-2xl font-bold mb-4">{t('symptom_severity')}</h2>
            <input
                type="number"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="1"
                max="10"
                required
                placeholder={t('enter_severity')}
            />

            <h2 className="text-2xl font-bold mt-6">{t('medication_taken')}</h2>
            <input
                type="text"
                name="medicationTaken"
                value={formData.medicationTaken}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                placeholder={t('enter_medication')}
            />

        </div>,

        // Step 4 - Doctor Questions and Notes
        <div key="step4">
            <h2 className="text-2xl font-bold mb-4">{t('doctor_questions')}</h2>
            <textarea
                name="doctorQuestions"
                placeholder={t('any_questions_doctor')}
                value={formData.doctorQuestions}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            ></textarea>

            <h2 className="text-2xl font-bold mt-6">{t('additional_notes')}</h2>
            <textarea
                name="notes"
                placeholder={t('any_additional_notes')}
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            ></textarea>
        </div>,

        // Step 5 - Translation Selection
        <div key="step5">
            <h2 className="text-2xl font-bold mb-4">{t('translate_document')}</h2>

            <label>{t('select_source_language')}:</label>
            <select
                name="sourceLanguage"
                value={formData.sourceLanguage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="en">English</option>
                <option value="ko">한국어 (Korean)</option>
                <option value="de">Deutsch (German)</option>
                <option value="fr">Français (French)</option>
                <option value="es">Español (Spanish)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="zh">中文 (Simplified Chinese)</option>
                <option value="it">Italiano (Italian)</option>
                <option value="nl">Nederlands (Dutch)</option>
                <option value="pl">Polski (Polish)</option>
                <option value="ru">Русский (Russian)</option>
                <option value="pt">Português (Portuguese)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="sv">Svenska (Swedish)</option>
                <option value="tr">Türkçe (Turkish)</option>
                <option value="el">Ελληνικά (Greek)</option>
                <option value="hu">Magyar (Hungarian)</option>
                <option value="ro">Română (Romanian)</option>
                <option value="fi">Suomi (Finnish)</option>
                <option value="da">Dansk (Danish)</option>
                <option value="bg">Български (Bulgarian)</option>
                <option value="cs">Čeština (Czech)</option>
                <option value="et">Eesti (Estonian)</option>
                <option value="lt">Lietuvių (Lithuanian)</option>
                <option value="lv">Latviešu (Latvian)</option>
                <option value="sl">Slovenščina (Slovenian)</option>
                <option value="sk">Slovenčina (Slovak)</option>
                <option value="id">Bahasa Indonesia (Indonesian)</option>
                <option value="uk">Українська (Ukrainian)</option>
                <option value="no">Norsk Bokmål (Norwegian)</option>
            </select>

            <label>{t('select_translation_language')}:</label>
            <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="en">English</option>
                <option value="ko">한국어 (Korean)</option>
                <option value="de">Deutsch (German)</option>
                <option value="fr">Français (French)</option>
                <option value="es">Español (Spanish)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="zh">中文 (Simplified Chinese)</option>
                <option value="it">Italiano (Italian)</option>
                <option value="nl">Nederlands (Dutch)</option>
                <option value="pl">Polski (Polish)</option>
                <option value="ru">Русский (Russian)</option>
                <option value="pt">Português (Portuguese)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="sv">Svenska (Swedish)</option>
                <option value="tr">Türkçe (Turkish)</option>
                <option value="el">Ελληνικά (Greek)</option>
                <option value="hu">Magyar (Hungarian)</option>
                <option value="ro">Română (Romanian)</option>
                <option value="fi">Suomi (Finnish)</option>
                <option value="da">Dansk (Danish)</option>
                <option value="bg">Български (Bulgarian)</option>
                <option value="cs">Čeština (Czech)</option>
                <option value="et">Eesti (Estonian)</option>
                <option value="lt">Lietuvių (Lithuanian)</option>
                <option value="lv">Latviešu (Latvian)</option>
                <option value="sl">Slovenščina (Slovenian)</option>
                <option value="sk">Slovenčina (Slovak)</option>
                <option value="id">Bahasa Indonesia (Indonesian)</option>
                <option value="uk">Українська (Ukrainian)</option>
                <option value="no">Norsk Bokmål (Norwegian)</option>
            </select>
        </div>
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={handleBackdropClick}
        >

            <div
                className="bg-white p-8 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside the modal
            >
                {components[step]}
                <div className="flex justify-between mt-6">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="bg-light hover:bg-lighter text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                        >
                            {t('previous')}
                        </button>
                    )}
                    {step < components.length - 1 && (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="bg-accent hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                        >
                            {t('next')}
                        </button>
                    )}
                    {step === components.length - 1 && (
                        <button
                            onClick={() => handleTranslateAndSubmit(t)}
                            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                        >
                            {t('make_pdf')}
                        </button>

                    )}
                </div>
            </div>
        </div>
    );

}

export default DocumentModal;
