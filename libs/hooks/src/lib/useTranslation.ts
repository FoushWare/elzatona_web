"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { enTranslations, arTranslations } from "./types/translations";

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export function useTranslation() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  // Get locale from localStorage or URL params
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocale(savedLocale);
  }, []);

  // Extract translation lookup logic to reduce cognitive complexity
  const getTranslationValue = (key: string): string => {
    const keys = key.split(".");
    let value: unknown =
      translations[locale as keyof typeof translations] || translations.en;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return the key if translation not found
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      const value = getTranslationValue(key);

      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce((str, [key, val]) => {
          return str.replaceAll(`{${key}}`, String(val));
        }, value);
      }

      return value;
    };
  }, [locale, getTranslationValue]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);

    // Update URL with locale parameter
    const url = new URL(globalThis.window.location.href);
    url.searchParams.set("locale", newLocale);
    router.push(url.pathname + url.search);
  };

  const isRTL = locale === "ar";

  return {
    t,
    locale,
    changeLanguage,
    isRTL,
  };
}
