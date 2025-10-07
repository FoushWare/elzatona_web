import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// User type enum
export type UserType = 'student' | 'professional' | 'educator' | 'admin';

// User type state interface
export interface UserTypeState {
  type: UserType;
  isSelected: boolean;
  selectedAt?: Date;
  preferences: {
    showAdvancedFeatures: boolean;
    enableNotifications: boolean;
    defaultDifficulty: 'beginner' | 'intermediate' | 'advanced';
    studyMode: 'guided' | 'freestyle' | 'mixed';
  };
}

// Default user type state
const defaultUserTypeState: UserTypeState = {
  type: 'student',
  isSelected: false,
  preferences: {
    showAdvancedFeatures: false,
    enableNotifications: true,
    defaultDifficulty: 'beginner',
    studyMode: 'guided',
  },
};

// User type state atom
export const userTypeStateAtom = atomWithStorage<UserTypeState>(
  'userTypeState',
  defaultUserTypeState
);

// Individual user type atoms
export const currentUserTypeAtom = atom(get => get(userTypeStateAtom).type);

export const isUserTypeSelectedAtom = atom(
  get => get(userTypeStateAtom).isSelected
);

export const userTypePreferencesAtom = atom(
  get => get(userTypeStateAtom).preferences
);

// Set user type atom
export const setUserTypeAtom = atom(null, (get, set, type: UserType) => {
  const currentState = get(userTypeStateAtom);
  set(userTypeStateAtom, {
    ...currentState,
    type,
    isSelected: true,
    selectedAt: new Date(),
  });
});

// Update user type preferences atom
export const updateUserTypePreferencesAtom = atom(
  null,
  (get, set, updates: Partial<UserTypeState['preferences']>) => {
    const currentState = get(userTypeStateAtom);
    set(userTypeStateAtom, {
      ...currentState,
      preferences: {
        ...currentState.preferences,
        ...updates,
      },
    });
  }
);

// Reset user type atom
export const resetUserTypeAtom = atom(null, (get, set) => {
  set(userTypeStateAtom, defaultUserTypeState);
});

// Computed atoms for user type specific features
export const shouldShowAdvancedFeaturesAtom = atom(get => {
  const state = get(userTypeStateAtom);
  return (
    state.preferences.showAdvancedFeatures ||
    state.type === 'professional' ||
    state.type === 'admin'
  );
});

export const canAccessAdminFeaturesAtom = atom(get => {
  const state = get(userTypeStateAtom);
  return state.type === 'admin';
});

export const defaultStudyModeAtom = atom(get => {
  const state = get(userTypeStateAtom);
  return state.preferences.studyMode;
});
