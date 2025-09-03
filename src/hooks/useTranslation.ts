'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import enTranslations from '@/translations/en.json';
import arTranslations from '@/translations/ar.json';

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export function useTranslation() {
  const router = useRouter();
  const [locale, setLocale] = useState('en');

  // Get locale from localStorage or URL params
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
  }, []);

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      const keys = key.split('.');
      let value: unknown =
        translations[locale as keyof typeof translations] || translations.en;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English if translation not found
          value = translations.en;
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey];
            } else {
              return key; // Return the key if translation not found
            }
          }
          break;
        }
      }

      if (typeof value !== 'string') {
        return key;
      }

      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce((str, [key, val]) => {
          return str.replace(new RegExp(`{${key}}`, 'g'), String(val));
        }, value);
      }

      return value;
    };
  }, [locale]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);

    // Update URL with locale parameter
    const url = new URL(window.location.href);
    url.searchParams.set('locale', newLocale);
    router.push(url.pathname + url.search);
  };

  const isRTL = locale === 'ar';

  return {
    t,
    locale,
    changeLanguage,
    isRTL,
  };
}
