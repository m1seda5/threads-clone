import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define your translations
const resources = {
  en: {
    translation: {
      "Welcome": "Welcome",
      // Add more translations here
    },
  },
  zh: {
    translation: {
      "Welcome": "欢迎",
      // Add more translations here
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
