// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      language: "Language",
      theme: "Theme",
      privacyPolicy: "Privacy Policy",
      appVersion: "App Version",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen",
      language: "Sprache",
      theme: "Thema",
      privacyPolicy: "Datenschutz-Bestimmungen",
      appVersion: "App-Version",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
