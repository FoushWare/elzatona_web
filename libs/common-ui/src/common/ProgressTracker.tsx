/* eslint-disable @typescript-eslint/no-explicit-any */
// NOTE: Type safety improvements tracked in refactoring task 401-reduce-any
// This component will be refactored to use explicit types
// v1.0 - Progress Tracking Component
"use client";

import { useEffect } from "react";

interface ProgressTrackerProps {
  questionId?: string;
  challengeId?: string;
  learningPathId?: string;
  learningPathName?: string;
  sectionId?: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
  onProgressUpdate?: (progress: {
    type: string;
    questionId?: string;
    challengeId?: string;
    learningPathId?: string;
    sectionId?: string;
    answeredCorrectly?: boolean;
    completed?: boolean;
    score?: number;
    points?: number;
    timeSpent?: number;
  }) => void;
}

export default function ProgressTracker({
  questionId,
  challengeId,
  learningPathId,
  learningPathName,
  sectionId,
  category = "general",
  difficulty = "medium",
  onProgressUpdate,
}: ProgressTrackerProps) {
  // Expose tracking functions for external use
  useEffect(() => {
    // You can expose these functions through a ref or context if needed
    // For now, they're available through the component props
  }, []);

  return null; // This is a utility component that doesn't render anything
}

// Export the tracking functions for direct use
export const useProgressTracking = () => {
  // useUserProgress hook removed - not available in shared-hooks
  const updateQuestion = async (_arg?: any) => {};
  const updateChallenge = async (_arg?: any) => {};
  const updateLearningPath = async (
    _arg1?: any,
    _arg2?: any,
    _arg3?: any,
    _arg4?: any,
    _arg5?: any,
  ) => {};

  const trackQuestion = async (
    question_id: string,
    category: string,
    difficulty: "easy" | "medium" | "hard",
    answeredCorrectly: boolean,
    attempts: number,
    timeSpent: number,
  ) => {
    try {
      await updateQuestion({
        id: `${question_id}-${Date.now()}`,
        user_id: "current-user", // This should be the actual user ID
        question_id: question_id,
        answer: answeredCorrectly ? "correct" : "incorrect",
        is_correct: answeredCorrectly,
        time_spent: timeSpent,
      });
    } catch (error) {
      console.error("Error tracking question progress:", error);
      throw error;
    }
  };

  const trackChallenge = async (
    challengeId: string,
    challengeName: string,
    category: string,
    completed: boolean,
    score: number,
    maxScore: number,
    timeSpent: number,
  ) => {
    try {
      await updateChallenge({
        id: `${challengeId}-${Date.now()}`,
        user_id: "current-user", // This should be the actual user ID
        challenge_id: challengeId,
        score: score,
        time_spent: timeSpent,
      });
    } catch (error) {
      console.error("Error tracking challenge progress:", error);
      throw error;
    }
  };

  const trackLearningPath = async (
    pathId: string,
    pathName: string,
    sectionId: string,
    completed: boolean,
    timeSpent: number,
  ) => {
    try {
      await updateLearningPath(
        pathId,
        pathName,
        sectionId,
        completed,
        timeSpent,
      );
    } catch (error) {
      console.error("Error tracking learning path progress:", error);
      throw error;
    }
  };

  return {
    trackQuestion,
    trackChallenge,
    trackLearningPath,
  };
};
