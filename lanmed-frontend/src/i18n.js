import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            "welcome": "Breaking Language Barriers in Healthcare",
            "description": "LanMed helps you generate translated medical forms, ensuring clear communication with doctors anywhere.",
            "about": "About LanMed",
            "about_description": "LanMed bridges communication gaps between patients and healthcare professionals through seamless translation of medical forms.",
            "guide": "Get Started",
            "contact": "Contact Us",
            "contact_description": "Reach out to our team for assistance.",
            "select_language": "Select your language",
            "sign_up": "Sign Up",
            "full_name": "Full Name (Legal)",
            "email": "Email",
            "password": "Password",
            "submit": "Sign Up",
            "login": "Log in",
            "login_prompt": "Already have an account?",
            "about_us_title": "About LanMed",
            "about_us_paragraph1": "LanMed was created from a personal experience that highlighted the importance of overcoming language barriers in healthcare. As an immigrant from Korea living in Canada, I often accompanied a family member to the hospital because English wasn’t her first language. While this was manageable during high school, it became challenging when I moved to Vancouver for college.",
            "about_us_paragraph2": "Knowing that my family member couldn’t confidently seek medical attention alone made me realize the need for a simple solution. LanMed was built to help her and others like her – individuals who need to convey medical concerns but struggle with language barriers. With LanMed, users can pre-answer common questions from doctors and provide translated documents during their visits, ensuring clearer communication.",
            "who_i_am": "Who I Am",
            "about_us_paragraph3": "I’m a 1st-year Computer Science student in Vancouver. This project is more than just an app – it’s a tool I built to support my family and hopefully help others facing similar challenges.",
            "contact_me": "Contact Me",
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
            "welcome": "의료에서 언어 장벽을 허물기",
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
            "welcome": "의료에서 언어 장벽을 허물기",
            "description": "LanMed는 번역된 의료 양식을 생성하여 어디서든 의사와 명확하게 소통할 수 있도록 돕습니다.",
            "guide": "시작하기",
            "welcome_dashboard": "{{name}}님, LanMed에 오신 것을 환영합니다",
            "translator_description": "언제 어디서나 사용할 수 있는 의료 번역기입니다.",
            "create_document": "문서 생성",
            "unknown": "알 수 없음",
            "no_email": "이메일 없음",
            "name_document": "문서 이름 지정",
            "enter_pdf_name": "PDF 이름 입력",
            "your_information": "귀하의 정보",
            "name": "이름",
            "age": "나이",
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
            "about_us_contact": "더 알고 싶거나 협업하고 싶다면 언제든지 연락해 주세요:"


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
