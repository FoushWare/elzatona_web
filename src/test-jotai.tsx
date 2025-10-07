'use client';

import { JotaiProvider } from '@/providers/JotaiProvider';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useMobileMenu } from '@/hooks/useMobileMenu';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <div className="p-4">
      <h1>Jotai Test Component</h1>
      <div>
        <p>Theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div>
        <p>Language: {language}</p>
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
          Toggle Language
        </button>
      </div>
      <div>
        <p>Mobile Menu: {isMobileMenuOpen ? 'Open' : 'Closed'}</p>
        <button onClick={toggleMobileMenu}>Toggle Mobile Menu</button>
      </div>
    </div>
  );
}

export default function JotaiTest() {
  return (
    <JotaiProvider>
      <TestComponent />
    </JotaiProvider>
  );
}
