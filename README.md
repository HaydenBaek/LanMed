# LanMed Web App

## Overview
LanMed helps people communicate with doctors by generating translated medical forms. Users input details and symptoms, and the app translates and formats them. The site supports 10+ languages, and PDFs can be translated into 30+ languages using DeepL API.

## Demo Video
[Watch the demo](https://www.youtube.com/watch?v=wMBsw8J_37M)

### Website Link
[LanMed Website](https://lanmed3-grfhbrbffrhfhwg2.canadacentral-01.azurewebsites.net)  *(Note: The app uses the free DeepL API and Microsoft Azure's free plan. This may result in translation issues as Microsoft requires an upgrade to use external REST APIs.)*

## Features
- **User Registration** – Collect personal and health info.
- **Symptom Reports** – Describe symptoms for translation.
- **Translation** – DeepL API translates forms.
- **Document Generation** – Clear, formatted PDFs.
- **Firebase Integration** – User management and data storage.
- **Multi-Language Support** – 10+ languages for the site, 30+ for PDFs.
- **Hosting** – Microsoft Azure with GitHub Actions.

## Technologies
- **Frontend** – React, Vite, HTML, CSS, Tailwind CSS
- **Backend** – Node.js, JavaScript
- **Database** – Firestore
- **Auth** – Firebase Authentication
- **Translation** – DeepL API
- **Hosting** – Microsoft Azure

## Setup
```bash
git clone https://github.com/username/repository-name.git
npm install
npm start
```

## Config
Create a `.env` file:
```env
FIREBASE_API_KEY=your_key
DEEPL_API_KEY=your_key
```

## Usage
1. Register or log in.
2. Enter personal info.
3. Describe symptoms.
4. Download translated forms.

## Why I Made This
LanMed helps break language barriers for medical needs, ensuring critical health info is clearly communicated.

## Contact
For questions, contact **Hayden Baek** at **hayden111712@gmail.com**.

*LanMed is a project by Hayden Baek.*

