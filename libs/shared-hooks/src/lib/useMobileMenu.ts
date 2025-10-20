import { useAtomValue, useSetAtom } from 'jotai';
import {
  isMobileMenuOpenAtom,
  toggleMobileMenuAtom,
  setMobileMenuOpenAtom,
} from '@elzatona/shared-atoms';

export function useMobileMenu() {
  const isMobileMenuOpen = useAtomValue(isMobileMenuOpenAtom);
  const toggleMobileMenu = useSetAtom(toggleMobileMenuAtom);
  const setIsMobileMenuOpen = useSetAtom(setMobileMenuOpenAtom);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    setIsMobileMenuOpen,
  };
}
