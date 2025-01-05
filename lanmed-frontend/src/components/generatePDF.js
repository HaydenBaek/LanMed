import html2pdf from 'html2pdf.js';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';




const generatePDF = async (formData, userData, t, uiLanguage, targetLanguage) => {
    const pdfFileName = formData.pdfName ? `${formData.pdfName}.pdf` : 'LanMed_Report.pdf';


    const content = `  
        <!DOCTYPE html>  
    <html lang="en">  
    <head>  
        <meta charset="UTF-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <title>Medical Report</title>  
        <script src="https://cdn.tailwindcss.com"></script>  


<style>  
    :root {  
        --primary: #4a6741;  
        --secondary: #3f5a36;  
        --accent: #374f2f;  
        --light: #304529;  
    }  
    html, body {  
        font-family: 'Arial', sans-serif;  
        background-color: var(--light);  
        color: white;  
        margin: 0;  
        padding: 0;  
        height: 100%;  
        width: 100%;  
        box-sizing: border-box;  
    }  
    @page {  
        size: A4;  
        margin: 0;  
    }  
    .container {  
        width: 100%;  
        min-height: calc(103vh); 
        margin: 0;  
        padding: 32px 28px;  
        background-color: var(--light);  
        box-sizing: border-box;  
        display: flex;  
        flex-direction: column;  
        justify-content: space-between;  
    }  
    .header, .footer {  
        background-color: var(--secondary);  
        padding: 26px;  
        text-align: center;  
    }  
    .section {  
        flex-grow: 1;  
        padding: 20px 25px;  
        margin: 18px 0;  
        background-color: var(--accent);  
        border-radius: 6px;  
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);  
    }  
    h1, h2, h3 {  
        color: white;  
        font-weight: bold;  
        margin: 6px 0;  
    }  
    h1 { font-size: 2.3rem; }  
    h2 { font-size: 1.7rem; }  
    h3 { font-size: 1.4rem; }  
    p { font-size: 1rem; margin: 8px 0; }  
    .input-box {  
        background-color: white;  
        color: var(--light);  
        padding: 15px;  
        border-radius: 8px;  
        margin: 12px 0;  
        border: 1px solid var(--secondary);  
        line-height: 1.6;  
        font-size: 1rem;  
    }  
</style>



    </head>  
    <body>

    <!-- Page 1: Translated Report -->
    <div class="container">
        <div class="header">
            <h1>${t('patient_report_title', 'Patient Medical Report', { lng: targetLanguage })}</h1>
            <div class="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <h3><strong>${t('name', 'Name', { lng: targetLanguage })}:</strong> ${userData.translatedName}</h3>
                    <h3><strong>${t('dob', 'Date of Birth', { lng: targetLanguage })}:</strong> ${userData.translatedDob}</h3>
                    <h3><strong>${t('age', 'Age', { lng: targetLanguage })}:</strong> ${userData.age}</h3>
                </div>
                <div>
                    <h3><strong>${t('allergies', 'Allergies', { lng: targetLanguage })}:</strong> ${userData.translatedAllergies}</h3>
                    <h3><strong>${t('medications', 'Medications', { lng: targetLanguage })}:</strong> ${userData.translatedMedications}</h3>
                    <h3><strong>${t('surgeries', 'Past Surgeries', { lng: targetLanguage })}:</strong> ${userData.translatedSurgeries}</h3>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>${t('describe_symptoms', 'Symptom Description', { lng: targetLanguage })}</h2>
            <p class="input-box">${formData.translatedSymptoms || 'N/A'}</p>
            <h2>${t('symptom_severity', 'Severity (1-10)', { lng: targetLanguage })}</h2>
            <p class="input-box">${formData.severity || 'N/A'}</p>
            <h2>${t('medication_taken', 'Medications taken for Symptoms', { lng: targetLanguage })}</h2>
            <p class="input-box">${formData.translatedMedicationTaken || 'No'}</p>
            <h2>${t('doctor_questions', 'Questions for Doctor', { lng: targetLanguage })}</h2>
            <p class="input-box">${formData.translatedQuestions || 'N/A'}</p>
            <h2>${t('additional_notes', 'Additional Notes', { lng: targetLanguage })}</h2>
            <p class="input-box">${formData.translatedNotes || 'N/A'}</p>
        </div>

        <div class="footer">
            <p>LanMed | Translated to ${targetLanguage.toUpperCase()}</p>
        </div>
    </div>

    <!-- Page 2: Original Report in Navbar Language -->
<div class="container" style="page-break-before: always;">
    <div class="header">
        <h1>${t('patient_report_title', 'Patient Medical Report (Original)', { lng: uiLanguage })}</h1>
        <div class="grid grid-cols-2 gap-4 mt-2">
            <div>
                <p><strong>${t('name', 'Name', { lng: uiLanguage })}:</strong> ${userData.name}</p>
                <p><strong>${t('dob', 'Date of Birth', { lng: uiLanguage })}:</strong> ${userData.dob || 'N/A'}</p>
                <p><strong>${t('age', 'Age', { lng: uiLanguage })}:</strong> ${userData.age}</p>
            </div>
            <div>
                <p><strong>${t('allergies', 'Allergies', { lng: uiLanguage })}:</strong> ${userData.allergies || 'None'}</p>
                <p><strong>${t('medications', 'Medications', { lng: uiLanguage })}:</strong> ${userData.medications || 'None'}</p>
                <p><strong>${t('surgeries', 'Past Surgeries', { lng: uiLanguage })}:</strong> ${userData.surgeries || 'None'}</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>${t('describe_symptoms', 'Symptom Description', { lng: uiLanguage })}</h2>
        <p class="input-box">${formData.symptoms || 'N/A'}</p>
        <h2>${t('severity', 'Severity (1-10)', { lng: uiLanguage })}</h2>
        <p class="input-box">${formData.severity || 'N/A'}</p>
        <h2>${t('medication_taken', 'Medications taken for Symptoms', { lng: uiLanguage })}</h2>
        <p class="input-box">${formData.medicationTaken || 'No'}</p>
        <h2>${t('questions_for_doctor', 'Questions for Doctor', { lng: uiLanguage })}</h2>
        <p class="input-box">${formData.doctorQuestions || 'N/A'}</p>
        <h2>${t('additional_notes', 'Additional Notes', { lng: uiLanguage })}</h2>
        <p class="input-box">${formData.notes || 'N/A'}</p>
    </div>

    <div class="footer">
        <p>LanMed | Original Text in ${uiLanguage.toUpperCase()}</p>
    </div>
</div>

    </body>  
    </html>`;

    const options = {
        margin: 0,
        filename: pdfFileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(content).set(options).save();
};

export default generatePDF;
