import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hook";

export const useI18n = () => {
  const { t, i18n: i18nInstance } = useTranslation();

  const { lang } = useAppSelector((state) => state.Menu);

  useEffect(() => {
    const changeLanguage = async () => {
      // Check if i18nInstance is properly initialized
      if (!i18nInstance || typeof i18nInstance.changeLanguage !== "function") {
        console.warn("i18n instance not properly initialized");
        return;
      }

      if (i18nInstance.language !== lang) {
        try {
          await i18nInstance.changeLanguage(lang);
        } catch (error) {
          console.error("Failed to change language:", error);
        }
      }
    };

    changeLanguage();
  }, [lang, i18nInstance]);

  // Helper function to get text with namespace
  const getText = (key: string, namespace?: string) => {
    if (namespace) {
      return t(`${namespace}:${key}`);
    }
    return t(key);
  };

  return {
    t: getText,
    currentLanguage: i18nInstance?.language || lang,
  };
};
