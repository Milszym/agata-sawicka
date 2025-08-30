import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Detect user language
import translation_en from "./locales/en/translation.json";
import translation_pl from "./locales/pl/translation.json";
import { DEFAULT_LANGUAGE } from "./constants/languages";

const resources = {
  en: {
    translation: translation_en
  },
  pl: {
    translation: translation_pl
  },
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE, // Default language
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;