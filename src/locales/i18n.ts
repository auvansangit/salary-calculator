import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_page_home_resources from './en/pages/home.json';
import vi_page_home_resources from './vi/pages/home.json';

const resources = {
  en: {
    homePage: en_page_home_resources
  },
  vi: {
    homePage: vi_page_home_resources
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
