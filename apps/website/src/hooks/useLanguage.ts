import { useAtom, useSetAtom } from 'jotai';
import {
  languageAtom,
  languageLoadingAtom,
  setLanguageAtom,
} from '@/atoms/language';
import type { Language } from '@/atoms/language';

export function useLanguage() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [isLoading] = useAtom(languageLoadingAtom);
  const setLanguageWithSideEffects = useSetAtom(setLanguageAtom);

  return {
    language,
    setLanguage: setLanguageWithSideEffects,
    isLoading,
  };
}
