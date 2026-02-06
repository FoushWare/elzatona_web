export interface LearningPlanSection {
  id: string;
  name: string;
  questions: number;
  weight: number;
}

export interface LearningPlan {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningPlanSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
}

export interface DailyGoal {
  day: number;
  date: string;
  questions: number;
  sections: string[];
  completed: boolean;
  progress: number;
}

export interface PlanGrade {
  planId: string;
  percentage: number;
  completedAt: string;
}

export type GradeLevel = "A+" | "A" | "B+" | "B" | "C";

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email?: string } | null;
  isLoading: boolean;
}
