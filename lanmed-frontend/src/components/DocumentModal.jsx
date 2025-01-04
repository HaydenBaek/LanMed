import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import generatePDF from './generatePDF';
import { useTranslation } from 'react-i18next';

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
        translatedSymptoms: '',
        translatedQuestions: '',
        language: 'en'
    };

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(initialFormState);
    const [userData, setUserData] = useState({});
    const [isTranslating, setIsTranslating] = useState(false);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.warn('No user data found in Firestore. Falling back to Firebase Auth...');

                    // Fallback to Firebase Auth data
                    const authUser = auth.currentUser;
                    if (authUser) {
                        setUserData({
                            name: authUser.displayName || 'Unknown',
                            email: authUser.email || 'No email',
                            uid: authUser.uid
                        });
                    } else {
                        console.error('No user data available from Auth.');
                    }
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const translateText = async (text) => {
        const sourceLang = 'KO';  // DeepL uses language codes like 'EN', 'DE', 'KO', etc.
        const targetLang = formData.language.toUpperCase();  // Ensure the target language is in uppercase
        const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
        const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(text)}&source_lang=${sourceLang}&target_lang=${targetLang}`;
        try {
            const res = await fetch(apiUrl);
            const result = await res.json();

            if (result && result.translations && result.translations[0]) {
                return result.translations[0].text;
            } else {
                console.error("Translation failed.");
                return text;
            }
        } catch (error) {
            console.error("Translation Error:", error);
            return text;
        }
    };


    const handleTranslateAndSubmit = async () => {
        if (!userData || !userData.name) {
            console.error('User data is missing or incomplete.');
            alert('User data is not available. Please complete your profile first.');
            return;
        }
    
        setIsTranslating(true);
    
        const [translatedSymptoms, translatedQuestions, translatedNotes] = await Promise.all([
            translateText(formData.symptoms),
            translateText(formData.doctorQuestions),
            translateText(formData.notes)  // Add translation for notes
        ]);
    
        const finalData = {
            ...userData,
            ...formData,
            translatedSymptoms,
            translatedQuestions,
            translatedNotes,  // Add translated notes
            createdAt: new Date()
        };
    
        try {
            const docRef = await addDoc(collection(db, `users/${user.uid}/documents`), finalData);
            console.log('Document created with ID:', docRef.id);
    
            await generatePDF(finalData, userData);  // Pass userData as a second argument
    
            resetForm();
            onClose();
        } catch (error) {
            console.error('Error saving document:', error);
        }
        setIsTranslating(false);
    };
    


    const resetForm = () => {
        setFormData(initialFormState);
        setStep(0);
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
            <label>{t('select_translation_language')}:</label>
            <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="en">English</option>
                <option value="ko">한국어</option>
            </select>
        </div>
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={() => {
                onClose();  // Close modal and go back to the dashboard
            }}
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
                            onClick={handleTranslateAndSubmit}
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
