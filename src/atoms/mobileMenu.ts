import { atom } from 'jotai';

// Mobile menu state atom
export const isMobileMenuOpenAtom = atom(false);

// Toggle mobile menu atom
export const toggleMobileMenuAtom = atom(null, (get, set) => {
  const isOpen = get(isMobileMenuOpenAtom);
  set(isMobileMenuOpenAtom, !isOpen);
});

// Set mobile menu state atom
export const setMobileMenuOpenAtom = atom(null, (get, set, isOpen: boolean) => {
  set(isMobileMenuOpenAtom, isOpen);
});
