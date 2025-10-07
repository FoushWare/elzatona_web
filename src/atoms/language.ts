import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Language = 'en' | 'ar';

// Language state atom
export const languageAtom = atomWithStorage<Language>('language', 'en');

// Language loading state
export const languageLoadingAtom = atom(false);

// Set language atom
export const setLanguageAtom = atom(null, (get, set, newLanguage: Language) => {
  set(languageAtom, newLanguage);

  // Update document language
  if (typeof window !== 'undefined') {
    document.documentElement.lang = newLanguage;
  }
});
