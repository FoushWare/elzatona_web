# Language Switcher Feature

**Description**  
Add EN/AR language switching functionality to the navbar with proper RTL support and language persistence.

**Details**

- Implement language context with React Context API
- Add language switcher component with dropdown menu
- Support for English (EN) and Arabic (AR) languages
- Include flag emojis (🇺🇸 for EN, 🇸🇦 for AR) and language codes
- Implement RTL (Right-to-Left) support for Arabic
- Add language persistence using localStorage
- Update document direction and language attributes
- Support both desktop and mobile layouts

**E2E Testing**

- Navigate to any page on the website
- Verify language switcher appears in the navbar (both desktop and mobile)
- Click on the language switcher to open dropdown
- Test switching between English and Arabic
- Verify RTL layout changes when Arabic is selected
- Check language persistence across page refreshes
- Test responsive design on different screen sizes
- Run `npm run test:e2e` and check language switching functionality

**Status**  
Completed

**Implementation Notes**

- Created `src/contexts/LanguageContext.tsx` for language state management
- Created `src/components/LanguageSwitcher.tsx` for the UI component
- Added LanguageProvider to `src/app/layout.tsx` context providers
- Integrated LanguageSwitcher into `src/components/NavbarSimple.tsx`
- Added RTL support in `src/app/globals.css`
- Uses localStorage for language persistence
- Updates document.documentElement.dir and lang attributes
- Supports both desktop and mobile layouts
