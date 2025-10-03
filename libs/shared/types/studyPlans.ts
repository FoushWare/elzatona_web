export interface StudyPlan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: {
    weeks: number;
    hoursPerWeek: number;
    totalHours: number;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  color: string;
  features: string[];
  topics: StudyTopic[];
  schedule: StudyWeek[];
  prerequisites: string[];
  outcomes: string[];
  estimatedTimePerDay: number;
  isActive?: boolean;
  progress?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  category:
    | 'javascript'
    | 'react'
    | 'css'
    | 'html'
    | 'system-design'
    | 'algorithms'
    | 'testing'
    | 'performance';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedHours: number;
  resources: StudyResource[];
  practiceQuestions: string[];
  isCompleted?: boolean;
  progress?: number;
}

export interface StudyResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'practice' | 'quiz' | 'project';
  url: string;
  description: string;
  estimatedTime: number;
  isCompleted?: boolean;
}

export interface StudyWeek {
  weekNumber: number;
  title: string;
  description: string;
  topics: string[];
  dailySchedule: DailySchedule[];
  totalHours: number;
  isCompleted?: boolean;
  progress?: number;
}

export interface DailySchedule {
  day: number;
  title: string;
  description: string;
  topics: string[];
  estimatedHours: number;
  tasks: StudyTask[];
  isCompleted?: boolean;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'practice' | 'quiz' | 'project' | 'review';
  estimatedTime: number;
  resourceUrl?: string;
  isCompleted?: boolean;
  completedAt?: Date;
}

export interface UserStudyPlan {
  planId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  completedTopics: string[];
  completedTasks: string[];
  currentWeek: number;
  currentDay: number;
  isActive: boolean;
  customizations: PlanCustomization;
}

export interface PlanCustomization {
  topicsToSkip: string[];
  topicsToAdd: string[];
  dailyHours: number;
  preferredLearningTime: 'morning' | 'afternoon' | 'evening';
  focusAreas: string[];
  difficultyAdjustment: 'easier' | 'same' | 'harder';
}
