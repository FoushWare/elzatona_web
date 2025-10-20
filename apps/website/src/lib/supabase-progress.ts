// v1.0 - Supabase Progress Service
'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export interface UserProgress {
  id: string;
  user_id: string;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  total_questions_answered: number;
  total_correct_answers: number;
  total_time_spent: number;
  level: number;
  experience_points: number;
  badges: string[];
  achievements: string[];
  preferences: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    notifications: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  created_at: string;
  updated_at: string;
}

export interface QuestionAttempt {
  id: string;
  user_id: string;
  question_id: string;
  answer: string;
  is_correct: boolean;
  time_spent: number;
  timestamp: string;
  points: number;
}

export interface ChallengeAttempt {
  id: string;
  user_id: string;
  challenge_id: string;
  score: number;
  time_spent: number;
  timestamp: string;
  points: number;
}

export interface DashboardStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experiencePoints: number;
  badges: string[];
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
    points: number;
  }>;
}

export interface ContinueData {
  recentPath?: {
    pathId: string;
    pathName: string;
    completedSections: unknown[];
    progress: number;
    lastAccessed: string;
    timeSpent: number;
  };
  recentQuestions: unknown[];
  recentChallenges: unknown[];
  lastActivity: string;
}

// Service functions
export const getUserProgress = async (
  userId: string
): Promise<UserProgress | null> => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
};

export const updateQuestionProgress = async (
  userId: string,
  attempt: Omit<QuestionAttempt, 'timestamp' | 'points'>
): Promise<void> => {
  try {
    const points = attempt.is_correct ? 10 : 0;

    // Insert question attempt
    await supabase.from('question_attempts').insert({
      user_id: userId,
      question_id: attempt.question_id,
      answer: attempt.answer,
      is_correct: attempt.is_correct,
      time_spent: attempt.time_spent,
      points,
    });

    // Update user progress
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      await supabase
        .from('user_progress')
        .update({
          total_points: currentProgress.total_points + points,
          total_questions_answered:
            currentProgress.total_questions_answered + 1,
          total_correct_answers:
            currentProgress.total_correct_answers +
            (attempt.is_correct ? 1 : 0),
          total_time_spent:
            currentProgress.total_time_spent + attempt.time_spent,
          experience_points: currentProgress.experience_points + points,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('Error updating question progress:', error);
    throw error;
  }
};

export const updateChallengeProgress = async (
  userId: string,
  attempt: Omit<ChallengeAttempt, 'timestamp' | 'points'>
): Promise<void> => {
  try {
    const points = Math.floor(attempt.score * 2); // Convert score to points

    // Insert challenge attempt
    await supabase.from('challenge_attempts').insert({
      user_id: userId,
      challenge_id: attempt.challenge_id,
      score: attempt.score,
      time_spent: attempt.time_spent,
      points,
    });

    // Update user progress
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      await supabase
        .from('user_progress')
        .update({
          total_points: currentProgress.total_points + points,
          experience_points: currentProgress.experience_points + points,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    throw error;
  }
};

export const updateLearningPathProgress = async (
  userId: string,
  pathId: string,
  pathName: string,
  sectionId: string,
  completed: boolean,
  timeSpent: number
): Promise<void> => {
  try {
    const points = completed ? 25 : 5; // Points for completing section vs attempting

    // Insert or update learning path progress
    await supabase.from('learning_path_progress').upsert({
      user_id: userId,
      path_id: pathId,
      path_name: pathName,
      section_id: sectionId,
      completed,
      time_spent: timeSpent,
      last_accessed: new Date().toISOString(),
    });

    // Update user progress
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      await supabase
        .from('user_progress')
        .update({
          total_points: currentProgress.total_points + points,
          total_time_spent: currentProgress.total_time_spent + timeSpent,
          experience_points: currentProgress.experience_points + points,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('Error updating learning path progress:', error);
    throw error;
  }
};

export const updateUserStreak = async (userId: string): Promise<void> => {
  try {
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      const today = new Date().toDateString();
      const lastActivity = new Date(currentProgress.updated_at).toDateString();

      let newStreak = currentProgress.current_streak;

      if (today === lastActivity) {
        // User already active today, maintain streak
        newStreak = currentProgress.current_streak;
      } else {
        // Check if yesterday was active
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastActivity === yesterdayStr) {
          // Continue streak
          newStreak = currentProgress.current_streak + 1;
        } else {
          // Reset streak
          newStreak = 1;
        }
      }

      const longestStreak = Math.max(newStreak, currentProgress.longest_streak);

      await supabase
        .from('user_progress')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('Error updating user streak:', error);
    throw error;
  }
};

export const getDashboardStats = async (
  userId: string
): Promise<DashboardStats | null> => {
  try {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!progress) return null;

    const accuracy =
      progress.total_questions_answered > 0
        ? (progress.total_correct_answers / progress.total_questions_answered) *
          100
        : 0;

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from('question_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(10);

    return {
      totalQuestions: progress.total_questions_answered,
      correctAnswers: progress.total_correct_answers,
      accuracy,
      totalTimeSpent: progress.total_time_spent,
      currentStreak: progress.current_streak,
      longestStreak: progress.longest_streak,
      level: progress.level,
      experiencePoints: progress.experience_points,
      badges: progress.badges || [],
      recentActivity:
        recentActivity?.map(attempt => ({
          type: 'question',
          description: `Answered ${attempt.is_correct ? 'correctly' : 'incorrectly'}`,
          timestamp: attempt.timestamp,
          points: attempt.points,
        })) || [],
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};

export const getContinueWhereLeftOff = async (
  userId: string
): Promise<ContinueData | null> => {
  try {
    // Get recent learning path progress
    const { data: recentPath } = await supabase
      .from('learning_path_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false })
      .limit(1)
      .single();

    // Get recent questions
    const { data: recentQuestions } = await supabase
      .from('question_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(5);

    // Get recent challenges
    const { data: recentChallenges } = await supabase
      .from('challenge_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(5);

    return {
      recentPath: recentPath
        ? {
            pathId: recentPath.path_id,
            pathName: recentPath.path_name,
            completedSections: [], // Would need to fetch from sections table
            progress: 0, // Would need to calculate
            lastAccessed: recentPath.last_accessed,
            timeSpent: recentPath.time_spent,
          }
        : undefined,
      recentQuestions: recentQuestions || [],
      recentChallenges: recentChallenges || [],
      lastActivity: recentPath?.last_accessed || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching continue data:', error);
    return null;
  }
};

export const updateUserPreferences = async (
  userId: string,
  preferences: Partial<UserProgress['preferences']>
): Promise<void> => {
  try {
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('preferences')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      const updatedPreferences = {
        ...currentProgress.preferences,
        ...preferences,
      };

      await supabase
        .from('user_progress')
        .update({
          preferences: updatedPreferences,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};
