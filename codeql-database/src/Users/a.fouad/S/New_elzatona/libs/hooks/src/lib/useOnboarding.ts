import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  onboardingStateAtom,
  isOnboardingCompletedAtom,
  currentOnboardingStepAtom,
  totalOnboardingStepsAtom,
  isOnboardingSkippedAtom,
  onboardingProgressAtom,
  nextOnboardingStepAtom,
  previousOnboardingStepAtom,
  skipOnboardingAtom,
  completeOnboardingAtom,
  resetOnboardingAtom,
} from "@elzatona/shared-atoms";

export function useOnboarding() {
  const [onboardingState, setOnboardingState] = useAtom(onboardingStateAtom);
  const isCompleted = useAtomValue(isOnboardingCompletedAtom);
  const currentStep = useAtomValue(currentOnboardingStepAtom);
  const totalSteps = useAtomValue(totalOnboardingStepsAtom);
  const isSkipped = useAtomValue(isOnboardingSkippedAtom);
  const progress = useAtomValue(onboardingProgressAtom);
  const nextStep = useSetAtom(nextOnboardingStepAtom);
  const previousStep = useSetAtom(previousOnboardingStepAtom);
  const skipOnboarding = useSetAtom(skipOnboardingAtom);
  const completeOnboarding = useSetAtom(completeOnboardingAtom);
  const resetOnboarding = useSetAtom(resetOnboardingAtom);

  return {
    onboardingState,
    setOnboardingState,
    isCompleted,
    currentStep,
    totalSteps,
    isSkipped,
    progress,
    nextStep,
    previousStep,
    skipOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
}
