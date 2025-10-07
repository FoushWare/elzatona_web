import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  isMobileMenuOpenAtom,
  toggleMobileMenuAtom,
  setMobileMenuOpenAtom,
} from '@/atoms/mobileMenu';

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
