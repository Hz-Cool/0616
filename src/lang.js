import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        // require('@/lang/en-US.json'),
        // translations: en,
        translations: require("@/lang/en-US.json"),
      },
      "zh-CN": {
        translations: require("@/lang/zh-CN.json"),
      },
    },
    // fallbackLng: 'zh-CN', // 使用LanguageDetector 取消注释
    fallbackLng: localStorage.getItem("lang") || "en" === "en" ? "en" : "zh-CN",
    debug: false, // 可开启控制台注释

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true,
    },
  });

export default i18n;
