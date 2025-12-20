"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

// Only create Supabase client if environment variables are available

if (
  process.env["NEXT_PUBLIC_SUPABASE_URL"] &&
  process.env["SUPABASE_SERVICE_ROLE_KEY"]
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  createClient(supabaseUrl, supabaseServiceRoleKey);
}

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("language", language);

      // Update document direction and language
      document.documentElement.lang = language;
    }
  }, [language, isLoaded]);

  const isRTL = language === "ar";

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      isRTL,
    }),
    [language, isRTL],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
