'use client';

import { useState, useEffect } from 'react';

interface WindowWithGuidance extends Window {
  triggerSignInGuidance?: (
    trigger: string,
    context: Record<string, unknown>
  ) => void;
}

interface ProgressData {
  completedQuestions: number;
  totalTimeSpent: number;
  lastActivity: string;
  streak: number;
  achievements: string[];
  roadmapSections: string[];
  learningMode: 'guided' | 'self-directed' | null;
}

export const useProgressTracking = () => {
  const [progress, setProgress] = useState<ProgressData>({
    completedQuestions: 0,
    totalTimeSpent: 0,
    lastActivity: new Date().toISOString(),
    streak: 0,
    achievements: [],
    roadmapSections: [],
    learningMode: null,
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        setProgress(parsedProgress);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<ProgressData>) => {
    setProgress(prev => ({
      ...prev,
      ...updates,
      lastActivity: new Date().toISOString(),
    }));
  };

  const completeQuestion = (question_id: string, timeSpent: number = 0) => {
    setProgress(prev => ({
      ...prev,
      completedQuestions: prev.completedQuestions + 1,
      totalTimeSpent: prev.totalTimeSpent + timeSpent,
      lastActivity: new Date().toISOString(),
    }));

    // Trigger sign-in guidance if needed
    if (
      typeof window !== 'undefined' &&
      (window as WindowWithGuidance).triggerSignInGuidance
    ) {
      const newCount = progress.completedQuestions + 1;
      if (newCount % 5 === 0) {
        (window as WindowWithGuidance).triggerSignInGuidance?.('progress', {
          progressCount: newCount,
        });
      }
    }
  };

  const addAchievement = (achievement: string) => {
    setProgress(prev => ({
      ...prev,
      achievements: [
        ...prev.achievements.filter(a => a !== achievement),
        achievement,
      ],
      lastActivity: new Date().toISOString(),
    }));

    // Trigger sign-in guidance for achievements
    if (
      typeof window !== 'undefined' &&
      (window as WindowWithGuidance).triggerSignInGuidance
    ) {
      (window as WindowWithGuidance).triggerSignInGuidance?.('achievement', {
        achievement,
      });
    }
  };

  const setRoadmapSections = (sections: string[]) => {
    setProgress(prev => ({
      ...prev,
      roadmapSections: sections,
      lastActivity: new Date().toISOString(),
    }));

    // Trigger sign-in guidance for roadmap
    if (
      typeof window !== 'undefined' &&
      (window as WindowWithGuidance).triggerSignInGuidance &&
      sections.length >= 3
    ) {
      (window as WindowWithGuidance).triggerSignInGuidance?.('roadmap', {
        roadmapSections: sections.length,
      });
    }
  };

  const setLearningMode = (mode: 'guided' | 'self-directed') => {
    setProgress(prev => ({
      ...prev,
      learningMode: mode,
      lastActivity: new Date().toISOString(),
    }));
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActivity = new Date(progress.lastActivity).toDateString();

    if (lastActivity === today) {
      // Already updated today
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastActivity === yesterdayString) {
      // Continue streak
      setProgress(prev => ({
        ...prev,
        streak: prev.streak + 1,
        lastActivity: new Date().toISOString(),
      }));
    } else {
      // Reset streak
      setProgress(prev => ({
        ...prev,
        streak: 1,
        lastActivity: new Date().toISOString(),
      }));
    }
  };

  const resetProgress = () => {
    const resetData: ProgressData = {
      completedQuestions: 0,
      totalTimeSpent: 0,
      lastActivity: new Date().toISOString(),
      streak: 0,
      achievements: [],
      roadmapSections: [],
      learningMode: null,
    };
    setProgress(resetData);
    localStorage.setItem('userProgress', JSON.stringify(resetData));
  };

  return {
    progress,
    updateProgress,
    completeQuestion,
    addAchievement,
    setRoadmapSections,
    setLearningMode,
    updateStreak,
    resetProgress,
  };
};
