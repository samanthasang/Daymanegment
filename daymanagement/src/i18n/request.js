// // src/i18n/request.js
// import { getRequestConfig } from 'next-intl/server';
// import { routing } from './routing';

// export default getRequestConfig(async ({ requestLocale }) => {
//   // This function is called for every request
//   let locale = await requestLocale;

//   // Validate the locale
//   if (!locale || !routing.locales.includes(locale)) {
//     locale = routing.defaultLocale;
//   }

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });