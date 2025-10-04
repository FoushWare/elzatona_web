/**
 * Learning Plan System Types
 * Admin-managed plans with configurable question counts per section
 */

export type PlanCategory = 'questions' | 'framework' | 'problem-solving' | 'system-design';

export type QuestionTopic = 'html' | 'css' | 'javascript';
export type FrameworkTopic = 'reactjs' | 'nextjs' | 'vue' | 'svelte' | 'angular';
export type ProblemSolvingTopic = 'basic-problem-solving' | 'frontend-algorithms' | 'data-structures';
export type SystemDesignTopic = 'facebook-feeds' | 'twitter-clone' | 'e-commerce' | 'real-time-chat';

export type Topic = QuestionTopic | FrameworkTopic | ProblemSolvingTopic | SystemDesignTopic;

export interface PlanSection {
  id: string;
  name: string;
  description: string;
  topic: Topic;
  questionCount: number;
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  isEnabled: boolean;
}

export interface LearningPlan {
  id: string;
  name: string;
  description: string;
  category: PlanCategory;
  duration: number; // in days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: PlanSection[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // admin user ID
}

export interface PlanCard {
  id: string;
  planId: string;
  title: string;
  description: string;
  category: PlanCategory;
  questionCount: number;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isRecommended: boolean;
  thumbnail?: string;
  tags: string[];
}

export interface UserProgress {
  planId: string;
  sectionId: string;
  completedQuestions: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  lastAccessed: Date;
  isCompleted: boolean;
}

export interface OnboardingData {
  selectedMode: 'guided' | 'freestyle';
  selectedPlan?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  interviewDate?: Date;
  preferredTopics: Topic[];
}
