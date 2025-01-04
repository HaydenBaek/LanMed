import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            "welcome": "Breaking Language Barriers in Healthcare",
            "description": "LanMed helps you generate translated medical forms to ensure clear communication with doctors anywhere.",
            "about": "About LanMed",
            "about_description": "LanMed bridges communication gaps between patients and healthcare professionals.",
            "guide": "How to Use",
            "contact": "Contact Us",
            "contact_description": "Reach out to our team if you need assistance.",
            "select_language": "Select Language",
            "sign_up": "Sign Up",
            "full_name": "Full Name (Legal)",
            "email": "Email",
            "password": "Password",
            "submit": "Sign Up",
            "login": "Log In",
            "login_prompt": "Already have an account?",
            "complete_profile": "Complete Profile",
            "dob": "Date of Birth",
            "age": "Age",
            "years": "years",
            "allergies_placeholder": "Allergies (Enter 'None' if none)",
            "medications_placeholder": "Current Medications (Enter 'None' if none)",
            "surgeries_placeholder": "Past Surgeries (Enter 'None' if none)",
            "save_profile": "Save Profile",
            "user_not_authenticated": "User not authenticated",
            "profile_update_failed": "Failed to complete profile",
            "welcome_dashboard": "Welcome to LanMed, {{name}}",
            "translator_description": "Your medical translator at your fingertips.",
            "create_document": "Create Document",
            "unknown": "Unknown",
            "no_email": "No email",
            "name_document": "Name Your Document",
            "enter_pdf_name": "Enter PDF Name",
            "your_information": "Your Information",
            "name": "Name",
            "allergies": "Allergies",
            "medications": "Medications",
            "none": "None",
            "na": "N/A",
            "describe_symptoms": "Describe Symptoms",
            "describe_your_symptoms": "Describe your symptoms",
            "symptom_start_date": "Symptom Start Date",
            "symptom_start_time": "Symptom Start Time",
            "symptom_severity": "Symptom Severity (1-10)",
            "enter_severity": "Enter severity (1-10)",
            "medication_taken": "Did you take any medication?",
            "doctor_questions": "Questions for the Doctor",
            "any_questions_doctor": "Any questions for the doctor?",
            "additional_notes": "Additional Notes",
            "any_additional_notes": "Enter any additional notes",
            "translate_document": "Translate Document",
            "select_translation_language": "Select Translation Language",
            "previous": "Previous",
            "next": "Next",
            "make_pdf": "Generate PDF",
            "enter_medication": "Enter medications",
            "none_if_none": "Enter 'None' if none",
            "profile": "Profile",
            "about_us_title": "About LanMed",
            "about_us_paragraph1": "LanMed was created after experiencing firsthand the importance of overcoming language barriers in healthcare. As an immigrant from Korea living in Canada, I often accompanied family members to hospitals to help with translation. This wasn't an issue during high school, but when I moved to Vancouver for college, it became harder to assist them.",
            "about_us_paragraph2": "Realizing that my family couldn't confidently visit hospitals alone made me understand the need for a simple solution. LanMed was created to help people like my family. Users can answer common questions in advance and communicate clearly with doctors through translated forms.",
            "who_i_am": "Who I Am",
            "about_us_paragraph3": "I am a first-year computer science student in Vancouver. This project is not just an app but a tool created to help my family, and I hope it helps others facing similar challenges.",
            "contact_me": "Contact Me",
            "about_us_contact": "Feel free to reach out if you want to know more or collaborate:"
        }

    },
    de: {
        translation: {
            "welcome": "Überwindung von Sprachbarrieren im Gesundheitswesen",
            "description": "LanMed hilft Ihnen, medizinische Formulare zu übersetzen und so eine klare Kommunikation mit Ärzten zu gewährleisten.",
            "about": "Über LanMed",
            "about_description": "LanMed überbrückt Kommunikationslücken zwischen Patienten und medizinischem Fachpersonal.",
            "guide": "Loslegen",
            "contact": "Kontakt",
            "contact_description": "Kontaktieren Sie unser Team für Unterstützung.",
            "select_language": "Wählen Sie Ihre Sprache",
            "sign_up": "Anmelden",
            "full_name": "Vollständiger Name (rechtlich)",
            "email": "E-Mail",
            "password": "Passwort",
            "submit": "Registrieren",
            "login": "Einloggen",
            "login_prompt": "Sie haben bereits ein Konto?"
        }
    },
    fr: {
        translation: {
            "welcome": "Briser les barrières linguistiques en santé",
            "description": "LanMed vous aide à générer des formulaires médicaux traduits, assurant une communication claire avec les médecins partout.",
            "about": "À propos de LanMed",
            "about_description": "LanMed comble les lacunes de communication entre les patients et les professionnels de santé.",
            "guide": "Commencer",
            "contact": "Contactez-nous",
            "contact_description": "Contactez notre équipe pour toute assistance.",
            "select_language": "Choisissez votre langue",
            "sign_up": "S'inscrire",
            "full_name": "Nom complet (légal)",
            "email": "E-mail",
            "password": "Mot de passe",
            "submit": "S'inscrire",
            "login": "Connexion",
            "login_prompt": "Vous avez déjà un compte ?"
        }
    },
    it: {
        translation: {
            "welcome": "Superare le barriere linguistiche in ambito sanitario",
            "description": "LanMed ti aiuta a generare moduli medici tradotti, garantendo una comunicazione chiara con i medici ovunque.",
            "about": "Informazioni su LanMed",
            "about_description": "LanMed colma le lacune comunicative tra pazienti e operatori sanitari.",
            "guide": "Inizia",
            "contact": "Contattaci",
            "contact_description": "Contatta il nostro team per ricevere assistenza.",
            "select_language": "Seleziona la tua lingua",
            "sign_up": "Iscriviti",
            "full_name": "Nome completo (legale)",
            "email": "Email",
            "password": "Password",
            "submit": "Iscriviti",
            "login": "Accedi",
            "login_prompt": "Hai già un account?"
        }
    },
    es: {
        translation: {
            "welcome": "Rompiendo barreras lingüísticas en la atención médica",
            "description": "LanMed te ayuda a generar formularios médicos traducidos, garantizando una comunicación clara con los médicos en cualquier lugar.",
            "about": "Sobre LanMed",
            "about_description": "LanMed reduce las barreras de comunicación entre pacientes y profesionales de la salud.",
            "guide": "Empezar",
            "contact": "Contáctanos",
            "contact_description": "Comunícate con nuestro equipo para obtener asistencia.",
            "select_language": "Selecciona tu idioma",
            "sign_up": "Registrarse",
            "full_name": "Nombre completo (legal)",
            "email": "Correo electrónico",
            "password": "Contraseña",
            "submit": "Registrarse",
            "login": "Iniciar sesión",
            "login_prompt": "¿Ya tienes una cuenta?"
        }
    },
    ja: {
        translation: {
            "welcome": "医療における言語の壁を打破する",
            "description": "LanMedは翻訳された医療フォームを生成し、どこでも医師との明確なコミュニケーションを実現します。",
            "about": "LanMedについて",
            "about_description": "LanMedは患者と医療従事者の間のコミュニケーションギャップを埋めます。",
            "guide": "始める",
            "contact": "お問い合わせ",
            "contact_description": "サポートが必要な場合はチームに連絡してください。",
            "select_language": "言語を選択",
            "sign_up": "サインアップ",
            "full_name": "フルネーム（法的）",
            "email": "メールアドレス",
            "password": "パスワード",
            "submit": "サインアップ",
            "login": "ログイン",
            "login_prompt": "すでにアカウントをお持ちですか？"
        }
    },

    ko: {
        translation: {
            "welcome": "언어의 벽을 넘어, 모두를 위한 의료 서비스",
            "description": "LanMed는 번역된 의료 양식을 생성하여 어디서든 의사와 명확하게 소통할 수 있도록 돕습니다.",
            "about": "LanMed 소개",
            "about_description": "LanMed는 환자와 의료 전문가 간의 커뮤니케이션 격차를 해소합니다.",
            "guide": "사용법",
            "contact": "문의하기",
            "contact_description": "도움이 필요하시면 팀에 문의하세요.",
            "select_language": "언어 선택",
            "sign_up": "가입하기",
            "full_name": "전체 이름 (법적)",
            "email": "이메일",
            "password": "비밀번호",
            "submit": "가입하기",
            "login": "로그인",
            "login_prompt": "이미 계정이 있으신가요?",
            "complete_profile": "프로필 완료",
            "dob": "생년월일",
            "age": "나이",
            "years": "세",
            "allergies_placeholder": "알레르기 (없다면 없음)",
            "medications_placeholder": "현재 복용 중인 약물 (없다면 없음)",
            "surgeries_placeholder": "과거 수술 (없다면 없음)",
            "save_profile": "프로필 저장",
            "user_not_authenticated": "사용자가 인증되지 않았습니다",
            "profile_update_failed": "프로필을 완료하지 못했습니다",
            "welcome_dashboard": "{{name}}님, LanMed에 오신 것을 환영합니다",
            "translator_description": "언제 어디서나 사용할 수 있는 의료 번역기입니다.",
            "create_document": "문서 생성",
            "unknown": "알 수 없음",
            "no_email": "이메일 없음",
            "name_document": "문서 이름 지정",
            "enter_pdf_name": "PDF 이름 입력",
            "your_information": "귀하의 정보",
            "name": "이름",
            "allergies": "알레르기",
            "medications": "약물",
            "none": "없음",
            "na": "해당 없음",
            "describe_symptoms": "증상 설명",
            "describe_your_symptoms": "증상을 설명하세요",
            "symptom_start_date": "증상 시작 날짜",
            "symptom_start_time": "증상 시작 시간",
            "symptom_severity": "증상의 심각도 (1-10)",
            "enter_severity": "심각도 입력 (1-10)",
            "medication_taken": "약을 복용하셨습니까?",
            "doctor_questions": "의사에게 할 질문",
            "any_questions_doctor": "의사에게 질문이 있습니까?",
            "additional_notes": "추가 메모",
            "any_additional_notes": "추가 메모 사항",
            "translate_document": "문서 번역",
            "select_translation_language": "번역 언어 선택",
            "previous": "이전",
            "next": "다음",
            "make_pdf": "PDF 생성",
            "enter_medication": "복용한 약 입력",
            "none_if_none": "'없음'이라고 입력",
            "profile": "프로필",
            "about_us_title": "LanMed 소개",
            "about_us_paragraph1": "LanMed는 의료 분야에서 언어 장벽을 극복하는 것의 중요성을 직접 경험한 후에 만들어졌습니다. 캐나다에 사는 한국 출신 이민자로서, 저는 영어가 능숙하지 않은 가족 구성원과 함께 번역을 도와주러 병원에 자주 동반했습니다. 고등학교에 다닐 때는 문제가 없었지만, 밴쿠버로 대학을 가면서 더 이상 쉽게 도와줄 수 없었습니다.",
            "about_us_paragraph2": "가족이 혼자서 병원을 자신 있게 방문하지 못한다는 사실은 간단한 해결책이 필요하다는 것을 깨닫게 했습니다. LanMed는 저희 가족과 같은 사람들을 돕기 위해 만들어졌습니다. 사용자들은 사전에 의사가 자주 묻는 질문에 답하고, 번역된 문서를 통해 진료 시 명확하게 소통할 수 있습니다.",
            "who_i_am": "제 소개",
            "about_us_paragraph3": "저는 밴쿠버에서 컴퓨터 공학을 전공하는 1학년 학생입니다. 이 프로젝트는 단순한 앱이 아니라, 가족을 돕기 위해 만든 도구이며, 비슷한 어려움을 겪는 다른 사람들에게도 도움이 되기를 바랍니다.",
            "contact_me": "문의하기",
            "about_us_contact": "더 알고 싶거나 협업하고 싶다면 언제든지 연락해 주세요:",
            "guide_title": "LanMed 사용법",
            "guide_intro": "LanMed는 번역된 의료 양식을 쉽게 생성할 수 있도록 도와줍니다. 아래 단계를 따라 시작하세요.",
            "step1": "1단계: 회원가입",
            "step1_description": "이메일로 회원가입하여 계정을 만드세요.",
            "step2": "2단계: 프로필 작성",
            "step2_description": "개인 정보와 의료 이력을 입력하세요.",
            "step3": "3단계: 문서 생성",
            "step3_description": "대시보드에서 '문서 생성' 버튼을 클릭하고 질문에 답변하세요.",
            "step4": "4단계: 번역 및 출력",
            "step4_description": "목표 언어를 선택하고 번역된 양식을 생성 및 출력하세요.",
            "need_help": "추가 도움이 필요하신가요? hayden111712@gmail.com으로 문의하세요.",
            "past_documents": "과거 문서",
            "loading": "불러오는 중...",
            "view": "보기",
            "download": "다운로드",
            "delete": "삭제",
            "no_documents": "문서가 없습니다",
            "document_preview": "문서 미리보기",
            "document_not_found": "문서를 찾을 수 없습니다",
            "close": "닫기"
        }
        
    },

    zh: {
        translation: {
            "welcome": "打破医疗领域的语言障碍",
            "description": "LanMed帮助您生成翻译的医疗表格，确保与医生的清晰沟通。",
            "about": "关于LanMed",
            "about_description": "LanMed通过无缝翻译的医疗表格帮助患者和医疗专业人员之间架起沟通的桥梁。",
            "guide": "开始",
            "contact": "联系我们",
            "contact_description": "如需帮助，请联系我们的团队。",
            "select_language": "选择你的语言",
            "sign_up": "注册",
            "full_name": "全名（法律）",
            "email": "电子邮件",
            "password": "密码",
            "submit": "注册",
            "login": "登录",
            "login_prompt": "已有账户？"
        }
    }
};


// Initialize i18next with Language Detector
i18n
    .use(LanguageDetector)  // Automatically detects language
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',  // Use English if the detected language is not available
        detection: {
            order: ['localStorage', 'navigator'],  // Detect language from localStorage first, then browser settings
            caches: ['localStorage']  // Cache language in localStorage
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
