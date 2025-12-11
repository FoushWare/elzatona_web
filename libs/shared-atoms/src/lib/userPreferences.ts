import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// User preferences interface
export interface UserPreferences {
  theme: "light" | "dark";
  language: "en" | "ar";
  notifications: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  theme: "light",
  language: "en",
  notifications: true,
  soundEnabled: true,
  animationsEnabled: true,
  fontSize: "medium",
  reducedMotion: false,
};

// User preferences atom
export const userPreferencesAtom = atomWithStorage<UserPreferences>(
  "userPreferences",
  defaultPreferences,
);

// Individual preference atoms for better granular updates
export const themePreferenceAtom = atom(
  (get) => get(userPreferencesAtom).theme,
  (get, set, newTheme: "light" | "dark") => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, theme: newTheme });
  },
);

export const languagePreferenceAtom = atom(
  (get) => get(userPreferencesAtom).language,
  (get, set, newLanguage: "en" | "ar") => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, language: newLanguage });
  },
);

export const notificationsPreferenceAtom = atom(
  (get) => get(userPreferencesAtom).notifications,
  (get, set, enabled: boolean) => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, notifications: enabled });
  },
);

export const soundPreferenceAtom = atom(
  (get) => get(userPreferencesAtom).soundEnabled,
  (get, set, enabled: boolean) => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, soundEnabled: enabled });
  },
);

export const animationsPreferenceAtom = atom(
  (get) => get(userPreferencesAtom).animationsEnabled,
  (get, set, enabled: boolean) => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, animationsEnabled: enabled });
  },
);

export const fontSizePreferenceAtom = atom(
  (get) => get(userPreferencesAtom).fontSize,
  (get, set, size: "small" | "medium" | "large") => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, fontSize: size });
  },
);

export const reducedMotionPreferenceAtom = atom(
  (get) => get(userPreferencesAtom).reducedMotion,
  (get, set, enabled: boolean) => {
    const current = get(userPreferencesAtom);
    set(userPreferencesAtom, { ...current, reducedMotion: enabled });
  },
);

// Reset preferences atom
export const resetPreferencesAtom = atom(null, (get, set) => {
  set(userPreferencesAtom, defaultPreferences);
});
