"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { enTranslations, arTranslations } from "./types/translations";

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

// Helper function to get nested translation value
const getNestedTranslation = (keys: string[], translations: Record<string, unknown>): unknown => {
  let value: unknown = translations;
  
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return null;
    }
  }
  
  return value;
};

// Helper function to replace parameters in translation string
const replaceParameters = (str: string, params?: Record<string, string | number>): string => {
  if (!params) return str;
  
  return Object.entries(params).reduce((result, [key, val]) => {
    return result.replaceAll(`{${key}}`, String(val));
  }, str);
};

export function useTranslation() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  // Get locale from localStorage or URL params
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocale(savedLocale);
  }, []);

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      const keys = key.split(".");
      
      // Try to get translation in current locale
      let value = getNestedTranslation(keys, translations[locale as keyof typeof translations] || {});
      
      // Fallback to English if not found
      if (!value) {
        value = getNestedTranslation(keys, translations.en);
      }
      
      // Return key if still not found or not a string
      if (!value || typeof value !== "string") {
        return key;
      }

      return replaceParameters(value, params);
    };
  }, [locale]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);

    // Update URL with locale parameter
    const url = new URL(globalThis.location.href);
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
