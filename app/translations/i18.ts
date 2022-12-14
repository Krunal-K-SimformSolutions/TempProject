import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import en from './en.json';

/**
 * Initializes the i18n library.
 * @param {object} - The key pair value to initialize the library. An object with the following properties:
 * - init: Function.prototype - proto type of function to initialize
 * - type: 'languageDetector' - A custom language detector
 * - async: true | false - lags below detect function to be async or not
 * - detect: async (callback: any) => void - A phone language detector
 * @returns None
 */
use({
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async

  detect: async (callback: (language: string) => void) => {
    const deviceLang = getLocales()[0].languageCode;
    callback(deviceLang);
  },
  cacheUserLanguage: () => {}
})
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: !__DEV__,
    ns: ['common'],
    defaultNS: 'common',
    resources: {
      en: en
    }
  });

export default i18n;
