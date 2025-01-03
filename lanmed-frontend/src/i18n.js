import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
            "select_language": "Select your language"
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
            "select_language": "Wählen Sie Ihre Sprache"
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
            "select_language": "Choisissez votre langue"
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
            "select_language": "Seleziona la tua lingua"
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
            "select_language": "Selecciona tu idioma"
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
            "select_language": "言語を選択"
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
            "select_language": "选择你的语言"
        }
    },
    ko: {
        translation: {
            "welcome": "의료에서 언어 장벽을 허물기",
            "description": "LanMed는 번역된 의료 양식을 생성하여 어디서든 의사와 명확하게 소통할 수 있도록 돕습니다.",
            "about": "LanMed 소개",
            "about_description": "LanMed는 환자와 의료 전문가 간의 커뮤니케이션 격차를 해소합니다.",
            "guide": "시작하기",
            "contact": "문의하기",
            "contact_description": "도움이 필요하시면 팀에 문의하세요.",
            "select_language": "언어 선택"
        }
    }
};

// Initialize i18next
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
