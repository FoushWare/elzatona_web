import { useAtom, useSetAtom } from 'jotai';
import {
  userPreferencesAtom,
  themePreferenceAtom,
  languagePreferenceAtom,
  notificationsPreferenceAtom,
  soundPreferenceAtom,
  animationsPreferenceAtom,
  fontSizePreferenceAtom,
  reducedMotionPreferenceAtom,
  resetPreferencesAtom,
} from '@elzatona/shared-atoms';

export function useUserPreferences() {
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);
  const [theme, setTheme] = useAtom(themePreferenceAtom);
  const [language, setLanguage] = useAtom(languagePreferenceAtom);
  const [notifications, setNotifications] = useAtom(
    notificationsPreferenceAtom
  );
  const [soundEnabled, setSoundEnabled] = useAtom(soundPreferenceAtom);
  const [animationsEnabled, setAnimationsEnabled] = useAtom(
    animationsPreferenceAtom
  );
  const [fontSize, setFontSize] = useAtom(fontSizePreferenceAtom);
  const [reducedMotion, setReducedMotion] = useAtom(
    reducedMotionPreferenceAtom
  );
  const resetPreferences = useSetAtom(resetPreferencesAtom);

  return {
    preferences,
    setPreferences,
    theme,
    setTheme,
    language,
    setLanguage,
    notifications,
    setNotifications,
    soundEnabled,
    setSoundEnabled,
    animationsEnabled,
    setAnimationsEnabled,
    fontSize,
    setFontSize,
    reducedMotion,
    setReducedMotion,
    resetPreferences,
  };
}
