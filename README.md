# LanMed

LanMed helps people communicate with doctors by generating translated medical forms. Users input details and symptoms, and the app translates and formats them. The site supports 10+ languages, and PDFs can be translated into 30+ languages using the DeepL API.

## Demo Video
[Watch the demo](https://www.youtube.com/watch?v=wMBsw8J_37M)

## Website Link
[LanMed Website](https://lanmed2-1.web.app)  
*(Good news! LanMed is now also hosted using Firebase. Please note that PDF translation may not always work perfectly when multiple users are accessing the service simultaneously.)*

### Previous Azure Hosting Link (No longer available as free plan ended 🫤)
[Azure Hosted Link](https://lanmed3-grfhbrbffrhfhwg2.canadacentral-01.azurewebsites.net)  
*(This hosted version used Microsoft Azure's free plan, which required an upgrade to use external REST APIs.)*

##Documentation
[View Documentation](https://docs.google.com/document/d/1UckQy19q-tf2DQaB0unZAAsFjeYFF7EHsH2zY3H5Zz8/edit?usp=sharing)

## Features
- **User Registration** – Collect personal and health info.
- **Symptom Reports** – Describe symptoms for translation.
- **Translation** – DeepL API translates forms.
- **Document Generation** – Clear, formatted PDFs.
- **Firebase Integration** – User management and data storage.
- **Multi-Language Support** – 10+ languages for the site, 30+ for PDFs.
- **Hosting** – Microsoft Azure (original) and Firebase Hosting (current).

## Technologies
- **Frontend** – React, Vite, HTML, CSS, Tailwind CSS
- **Backend** – Node.js, JavaScript
- **Database** – Firestore
- **Auth** – Firebase Authentication
- **Translation** – DeepL API
- **Hosting** – Microsoft Azure (original), Firebase Hosting (current)

## Setup
```bash
git clone https://github.com/username/repository-name.git
cd repository-name
npm install
npm start
