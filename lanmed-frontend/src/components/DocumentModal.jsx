import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import generatePDF from './generatePDF';
import { useTranslation } from 'react-i18next';

const DocumentModal = ({ isOpen, onClose }) => {
    const initialFormState = {
        pdfName: '',
        symptoms: '',
        symptomStartDate: '',
        symptomStartTime: '',
        severity: '',
        medicationTaken: 'No',
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

        const [translatedSymptoms, translatedQuestions] = await Promise.all([
            translateText(formData.symptoms),
            translateText(formData.doctorQuestions)
        ]);

        const finalData = {
            ...userData,
            ...formData,
            translatedSymptoms,
            translatedQuestions,
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
            <h2 className="text-2xl font-bold mb-4">Name Your Document</h2>
            <input
                name="pdfName"
                type="text"
                placeholder="Enter PDF Name"
                value={formData.pdfName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <h2 className="text-xl font-bold mt-6">Your Information</h2>
            <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
            <p><strong>Age:</strong> {userData.age || 'N/A'}</p>
            <p><strong>Allergies:</strong> {userData.allergies || 'None'}</p>
            <p><strong>Medications:</strong> {userData.medications || 'None'}</p>
        </div>,

        // Step 2 - Symptom Description
        <div key="step2">
            <h2 className="text-2xl font-bold mb-4">Describe Symptoms</h2>
            <textarea
                name="symptoms"
                placeholder="Describe your symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            ></textarea>

            <label>Date Symptoms Started:</label>
            <input
                type="date"
                name="symptomStartDate"
                value={formData.symptomStartDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
            />

            <label>Time Symptoms Started:</label>
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
            <h2 className="text-2xl font-bold mb-4">Symptom Severity (1-10)</h2>
            <input
                type="number"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="1"
                max="10"
                required
                placeholder="Enter severity (1-10)"
            />


            <h2 className="text-2xl font-bold mt-6">Did you take any medication?</h2>
            <select
                name="medicationTaken"
                value={formData.medicationTaken}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
            </select>
        </div>,

        // Step 4 - Doctor Questions and Additional Notes
        <div key="step4">
            <h2 className="text-2xl font-bold mb-4">Questions for the Doctor</h2>
            <textarea
                name="doctorQuestions"
                placeholder="Any questions for the doctor?"
                value={formData.doctorQuestions}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            ></textarea>

            <h2 className="text-2xl font-bold mt-6">Additional Notes</h2>
            <textarea
                name="notes"
                placeholder="Any additional notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            ></textarea>
        </div>,

        // Step 5 - Translation Selection
        <div key="step5">
            <h2 className="text-2xl font-bold mb-4">Translate Document</h2>
            <label>Select Translation Language:</label>
            <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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
                <option value="tr">Türkçe</option>
                <option value="ar">العربية</option>
                <option value="el">Ελληνικά</option>
                <option value="cs">Čeština</option>
                <option value="sv">Svenska</option>
                <option value="da">Dansk</option>
                <option value="fi">Suomi</option>
                <option value="hu">Magyar</option>
                <option value="ro">Română</option>
                <option value="bg">Български</option>
                <option value="uk">Українська</option>
                <option value="lt">Lietuvių</option>
                <option value="lv">Latviešu</option>
                <option value="et">Eesti keel</option>
                <option value="sk">Slovenčina</option>
            </select>

        </div>,

        // Step 6 - Review
        <div key="step6">
            <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>

            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold">Document Information</h3>
                    <p><strong>PDF Name:</strong> {formData.pdfName || 'N/A'}</p>
                </div>

                <div>

                    <p><strong>Symptom Description:</strong> {formData.symptoms || 'N/A'}</p>
                    <p><strong>Symptom Start Date:</strong> {formData.symptomStartDate || 'N/A'}</p>
                    <p><strong>Symptom Start Time:</strong> {formData.symptomStartTime || 'N/A'}</p>
                    <p><strong>Severity:</strong> {formData.severity || 'N/A'}</p>
                    <p><strong>Medication Taken:</strong> {formData.medicationTaken}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Questions for the Doctor</h3>
                    <p>{formData.doctorQuestions || 'No questions provided'}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Additional Notes</h3>
                    <p>{formData.notes || 'No additional notes'}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Translation</h3>
                    <p><strong>Target Language:</strong> {formData.language.toUpperCase()}</p>
                </div>
            </div>

            <button
                onClick={handleTranslateAndSubmit}
                className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition duration-200"
            >
                Make a PDF
            </button>
        </div>
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                {components[step]}
                <div className="flex justify-between mt-6">
                    {step > 0 && <button
                        onClick={() => setStep(step - 1)}
                        className="bg-light hover:bg-lighter text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                    >
                        Previous
                    </button>}
                    {step < components.length - 1 && <button
                        onClick={() => setStep(step + 1)}
                        className="bg-accent hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                    >
                        Next
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default DocumentModal;
