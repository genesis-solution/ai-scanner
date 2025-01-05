import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      settings: "Settings",
      language: "Language",
      theme: "Theme",
      privacyPolicy: "Privacy Policy",
      version: "Version",
      view: "View",
      english: "English",
      german: "German",
      dark: "Dark",
      light: "Light",
      foodBugScanner: "Food Bug Scanner",
      tapToScan: "Tap to Scan",
      requestingCameraPermission: "Requesting for camera permission",
      noCameraAccess: "No access to camera",
      parsing: "Parsing...",
      checkingKeywords: "Checking Keywords...",
      scanAgain: "Scan Again",
      orInputManually: "Or Input Manually",
      submit: "Submit",
      invalidCode: "Not a valid code",
      enterCode: "Enter code",
      home: "Home",
      scan: "Scan",
      oops: "Oops!",
      screenDoesNotExist: "This screen doesn't exist.",
      goToHomeScreen: "Go to home screen!",
    },
  },
  de: {
    translation: {
      settings: "Einstellungen",
      language: "Sprache",
      theme: "Thema",
      privacyPolicy: "Datenschutz-Bestimmungen",
      version: "Version",
      view: "Ansehen",
      english: "Englisch",
      german: "Deutsch",
      dark: "Dunkel",
      light: "Hell",
      foodBugScanner: "Lebensmittel-Scanner",
      tapToScan: "Zum Scannen tippen",
      requestingCameraPermission: "Kameraberechtigung wird angefordert",
      noCameraAccess: "Kein Zugriff auf die Kamera",
      parsing: "Wird analysiert...",
      checkingKeywords: "Schlüsselwörter werden überprüft...",
      scanAgain: "Erneut scannen",
      orInputManually: "Oder manuell eingeben",
      submit: "Einreichen",
      invalidCode: "Kein gültiger Code",
      enterCode: "Code eingeben",
      home: "Startseite",
      scan: "Scannen",
      oops: "Hoppla!",
      screenDoesNotExist: "Dieser Bildschirm existiert nicht.",
      goToHomeScreen: "Zur Startseite gehen!",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
