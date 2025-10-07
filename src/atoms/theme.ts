import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Theme state atom
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');

// Theme loading state
export const themeLoadingAtom = atom(false);

// Computed atom for theme class
export const themeClassAtom = atom(get => {
  const theme = get(themeAtom);
  return theme === 'dark' ? 'dark' : '';
});

// Toggle theme atom
export const toggleThemeAtom = atom(null, (get, set) => {
  const currentTheme = get(themeAtom);
  set(themeAtom, currentTheme === 'light' ? 'dark' : 'light');
});
