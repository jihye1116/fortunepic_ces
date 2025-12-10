import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cn from "./locales/cn.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import ko from "./locales/ko.json";

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  es: {
    translation: es,
  },
  cn: {
    translation: cn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
});

export default i18n;
