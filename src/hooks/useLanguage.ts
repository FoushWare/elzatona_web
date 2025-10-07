import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  languageAtom,
  languageLoadingAtom,
  isRTLAtom,
  documentDirectionAtom,
  setLanguageAtom,
} from '@/atoms/language';
import type { Language } from '@/atoms/language';

export function useLanguage() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [isLoading] = useAtom(languageLoadingAtom);
  const isRTL = useAtomValue(isRTLAtom);
  const documentDirection = useAtomValue(documentDirectionAtom);
  const setLanguageWithSideEffects = useSetAtom(setLanguageAtom);

  return {
    language,
    setLanguage: setLanguageWithSideEffects,
    isLoading,
    isRTL,
    documentDirection,
  };
}
