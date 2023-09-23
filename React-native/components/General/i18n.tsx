import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import intervalPlural from "i18next-intervalplural-postprocessor";
import translationEN from "./locales/en/translation.json";
import translationZH from "./locales/zh/translation.json";
import translationJP from "./locales/jp/translation.json";
import translationTI from "./locales/ti/translation.json";
import translationAR from "./locales/ar/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationKO from "./locales/ko/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationSP from "./locales/sp/translation.json";
import translationGE from "./locales/ge/translation.json";

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  },
  jp: {
    translation: translationJP
  },
  ti: {
    translation: translationTI
  },
  ar: {
    translation: translationAR
  },
  fr: {
    translation: translationFR
  },
  ko: {
    translation: translationKO
  },
  ru: {
    translation: translationRU
  },
  sp: {
    translation: translationSP
  },
  ge: {
    translation: translationGE
  },
};

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .use(LanguageDetector)
  .init({
    resources,
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en"
  });
