import html2pdf from 'html2pdf.js';


const generatePDF = async (formData, userData) => {
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
               --lighter: #22311d;  
            }  
            body {  
               font-family: 'Arial', sans-serif;  
               background-color: var(--lighter);  
               color: white;  
               margin: 0;  
               padding: 0;  
               line-height: 1.5;  
            }  
            /* Set the page size for PDF export */
            @page {  
               size: 8.26in 11.69in;  
               margin: 10mm; /* Set margins to take up more space on the page */
            }  
            .container {  
               width: 100%; /* Fill the entire page width */
               height: 100%; /* Take full height of the page */
               margin: 0 auto;  
               background-color: var(--light);  
               padding: 30px; /* Increased padding for better spacing */
               border-radius: 12px;  
               box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);  
               display: flex;  
               flex-direction: column;  
               justify-content: space-between; /* Spread content evenly */
               min-height: 100vh; /* Full viewport height */
            }  
            .header, .footer {  
               background-color: var(--secondary);  
               padding: 10px 20px 20px 10px;  
               border-radius: 8px;  
               margin-bottom: 25px;  
            }  
            .section {  
               margin-bottom: 30px;  
               padding: 20px;  /* Adjusted padding */
               background-color: var(--accent);  
               border-radius: 8px;  
               flex-grow: 1; /* Allow sections to grow and fill available space */
            }  
            h1, h2, h3 {  
               color: white;  
               font-weight: bold;  
            }  
            h1 {  
               font-size: 2.2rem; /* Larger font size for the main title */
            }  
            h2 {  
               font-size: 1.7rem; /* Larger font size for subtitles */
            }  
            h3 {  
               font-size: 1.4rem; /* Slightly larger size for additional headings */
            }  
            p, .input-box {  
               font-size: 1rem;  
               line-height: 1.6;  
            }  
            .footer {  
               text-align: center;  
               font-size: 0.9rem;  
            }  
            .input-box {  
               background-color: white;  
               color: var(--lighter);  
               padding: 10px;  
               border-radius: 6px;  
               margin: 10px 0;  
            }  
         </style>  
       </head>  
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <h1>Patient Medical Report</h1>
            <div class="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <h3><strong>Name:</strong> ${userData.name}</h3>
                    <h3><strong>Date Of Birth:</strong> ${userData.dob || 'N/A'}</h3>
                    <h3><strong>Age:</strong> ${userData.age}</h3>
                </div>
                <div>
                    <h3><strong>Allergies:</strong> ${userData.allergies || 'None'}</h3>
                    <h3><strong>Medications:</strong> ${userData.medications || 'None'}</h3>
                    <h3><strong>Past Surgeries:</strong> ${userData.surgeries || 'None'}</h3>
                </div>
            </div>
        </div>

        <!-- Page 1: Translated Text -->
        <div class="section">
            <h2>Symptom Description (Translated)</h2>
            <p class="input-box">${formData.translatedSymptoms || 'N/A'}</p>
            <h2>Severity (1-10)</h2>
            <p class="input-box">${formData.severity || 'N/A'}</p>
            <h2>Took Medication for Symptoms</h2>
            <p class="input-box">${formData.medicationTaken || 'No'}</p>
            <h2>Symptom Start Date & Time</h2>
            <p class="input-box">${formData.symptomStartDate || 'N/A'}, ${formData.symptomStartTime || 'N/A'}</p>
        </div>

        <!-- Questions Section (Translated) -->
        <div class="section">
            <h2>Questions for Doctor (Translated)</h2>
            <p class="input-box">${formData.translatedQuestions || 'N/A'}</p>
            <h2>Additional Notes (Translated)</h2>
            <p class="input-box">${formData.translatedNotes || 'N/A'}</p>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <p>LanMed | Translated to ${formData.language.toUpperCase()}</p>
        </div>
    </div>

    <!-- Page 2: Original Text (User Input) -->
    <div class="container" style="page-break-before: always;">
        <div class="header">
            <h1>Patient Medical Report (Original)</h1>
            <div class="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <p><strong>Name:</strong> ${userData.name}</p>
                    <p><strong>DOB:</strong> ${userData.dob || 'N/A'}</p>
                    <p><strong>Age:</strong> ${userData.age}</p>
                </div>
                <div>
                    <p><strong>Allergies:</strong> ${userData.allergies || 'None'}</p>
                    <p><strong>Medications:</strong> ${userData.medications || 'None'}</p>
                    <p><strong>Past Surgeries:</strong> ${userData.surgeries || 'None'}</p>
                </div>
            </div>
        </div>

        <!-- Page 2: Original Text (User Input) -->
        <div class="section">
            <h2>Symptom Description (Original)</h2>
            <p class="input-box">${formData.symptoms || 'N/A'}</p>
            <h2>Severity (1-10)</h2>
            <p class="input-box">${formData.severity || 'N/A'}</p>
            <h2>Took Medication for Symptoms</h2>
            <p class="input-box">${formData.medicationTaken || 'No'}</p>
            <h2>Symptom Start Date & Time</h2>
            <p class="input-box">${formData.symptomStartDate || 'N/A'}, ${formData.symptomStartTime || 'N/A'}</p>
        </div>

        <!-- Questions Section (Original) -->
        <div class="section">
            <h2>Questions for Doctor (Original)</h2>
            <p class="input-box">${formData.doctorQuestions || 'N/A'}</p>
            <h2>Additional Notes (Original)</h2>
            <p class="input-box">${formData.notes || 'N/A'}</p>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <p>LanMed | Original Text</p>
        </div>
    </div>
</body>

       </html>  
    `;

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
