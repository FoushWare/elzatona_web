import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Onboarding state interface
export interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  skipped: boolean;
  completedAt?: Date;
}

// Default onboarding state
const defaultOnboardingState: OnboardingState = {
  isCompleted: false,
  currentStep: 0,
  totalSteps: 5,
  skipped: false,
};

// Onboarding state atom
export const onboardingStateAtom = atomWithStorage<OnboardingState>(
  'onboardingState',
  defaultOnboardingState
);

// Individual onboarding atoms
export const isOnboardingCompletedAtom = atom(
  get => get(onboardingStateAtom).isCompleted
);

export const currentOnboardingStepAtom = atom(
  get => get(onboardingStateAtom).currentStep
);

export const totalOnboardingStepsAtom = atom(
  get => get(onboardingStateAtom).totalSteps
);

export const isOnboardingSkippedAtom = atom(
  get => get(onboardingStateAtom).skipped
);

// Onboarding progress atom
export const onboardingProgressAtom = atom(get => {
  const state = get(onboardingStateAtom);
  return (state.currentStep / state.totalSteps) * 100;
});

// Next step atom
export const nextOnboardingStepAtom = atom(null, (get, set) => {
  const state = get(onboardingStateAtom);
  if (state.currentStep < state.totalSteps - 1) {
    set(onboardingStateAtom, {
      ...state,
      currentStep: state.currentStep + 1,
    });
  } else {
    set(onboardingStateAtom, {
      ...state,
      isCompleted: true,
      completedAt: new Date(),
    });
  }
});

// Previous step atom
export const previousOnboardingStepAtom = atom(null, (get, set) => {
  const state = get(onboardingStateAtom);
  if (state.currentStep > 0) {
    set(onboardingStateAtom, {
      ...state,
      currentStep: state.currentStep - 1,
    });
  }
});

// Skip onboarding atom
export const skipOnboardingAtom = atom(null, (get, set) => {
  const state = get(onboardingStateAtom);
  set(onboardingStateAtom, {
    ...state,
    skipped: true,
    isCompleted: true,
    completedAt: new Date(),
  });
});

// Complete onboarding atom
export const completeOnboardingAtom = atom(null, (get, set) => {
  const state = get(onboardingStateAtom);
  set(onboardingStateAtom, {
    ...state,
    isCompleted: true,
    completedAt: new Date(),
  });
});

// Reset onboarding atom
export const resetOnboardingAtom = atom(null, (get, set) => {
  set(onboardingStateAtom, defaultOnboardingState);
});
