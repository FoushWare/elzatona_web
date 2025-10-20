import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  userTypeStateAtom,
  currentUserTypeAtom,
  isUserTypeSelectedAtom,
  userTypePreferencesAtom,
  setUserTypeAtom,
  updateUserTypePreferencesAtom,
  resetUserTypeAtom,
  shouldShowAdvancedFeaturesAtom,
  canAccessAdminFeaturesAtom,
  defaultStudyModeAtom,
} from '@elzatona/shared-atoms';

export function useUserType() {
  const [userTypeState, setUserTypeState] = useAtom(userTypeStateAtom);
  const currentUserType = useAtomValue(currentUserTypeAtom);
  const isUserTypeSelected = useAtomValue(isUserTypeSelectedAtom);
  const preferences = useAtomValue(userTypePreferencesAtom);
  const setUserType = useSetAtom(setUserTypeAtom);
  const updatePreferences = useSetAtom(updateUserTypePreferencesAtom);
  const resetUserType = useSetAtom(resetUserTypeAtom);
  const shouldShowAdvancedFeatures = useAtomValue(
    shouldShowAdvancedFeaturesAtom
  );
  const canAccessAdminFeatures = useAtomValue(canAccessAdminFeaturesAtom);
  const defaultStudyMode = useAtomValue(defaultStudyModeAtom);

  return {
    userTypeState,
    setUserTypeState,
    currentUserType,
    isUserTypeSelected,
    preferences,
    setUserType,
    updatePreferences,
    resetUserType,
    shouldShowAdvancedFeatures,
    canAccessAdminFeatures,
    defaultStudyMode,
  };
}
