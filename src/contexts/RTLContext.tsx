'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface RTLContextType {
  isRTL: boolean;
  setRTL: (isRTL: boolean) => void;
  direction: 'ltr' | 'rtl';
  toggleDirection: () => void;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  // Initialize RTL state from document direction or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first for user preference
      const savedDirection = localStorage.getItem('rtl-direction');
      if (savedDirection) {
        const rtlValue = savedDirection === 'rtl';
        setIsRTL(rtlValue);
        document.documentElement.dir = rtlValue ? 'rtl' : 'ltr';
        return;
      }

      // Check document direction
      const htmlDir = document.documentElement.dir;
      if (htmlDir === 'rtl') {
        setIsRTL(true);
        return;
      }

      // Check browser language for RTL languages
      const browserLang = navigator.language || navigator.languages?.[0];
      const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ku', 'ps', 'sd'];
      const isRTLLanguage = rtlLanguages.some(lang =>
        browserLang?.toLowerCase().startsWith(lang)
      );

      if (isRTLLanguage) {
        setIsRTL(true);
        document.documentElement.dir = 'rtl';
      }
    }
  }, []);

  // Update document direction when RTL state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      localStorage.setItem('rtl-direction', isRTL ? 'rtl' : 'ltr');
    }
  }, [isRTL]);

  const setRTL = (value: boolean) => {
    setIsRTL(value);
  };

  const toggleDirection = () => {
    setIsRTL(!isRTL);
  };

  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <RTLContext.Provider value={{ isRTL, setRTL, direction, toggleDirection }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};

// Utility hook for RTL detection without context (for components that need simple detection)
export const useRTLDetection = () => {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const htmlDir = document.documentElement.dir;
      setIsRTL(htmlDir === 'rtl');

      // Listen for direction changes
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'dir'
          ) {
            const newDir = document.documentElement.dir;
            setIsRTL(newDir === 'rtl');
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir'],
      });

      return () => observer.disconnect();
    }
  }, []);

  return isRTL;
};
