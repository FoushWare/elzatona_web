export interface LearningItem {
  id: string;
  title: string;
  description: string;
  category: "javascript" | "react" | "css" | "html" | "system-design" | "algorithms" | "web-apis" | "performance" | "accessibility" | "testing";
  subCategory: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number; // in minutes
  tags: string[];
  isCompleted: boolean;
  completedAt?: Date;
  actualTimeSpent?: number; // in minutes
  notes?: string;
  priority: "low" | "medium" | "high";
  relatedResources?: string[]; // IDs of related resources
  relatedChallenges?: string[]; // IDs of related challenges
  relatedQuestions?: string[]; // IDs of related questions
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  targetHours: number;
  currentHours: number;
  isCompleted: boolean;
  completedAt?: Date;
  learningItems: string[]; // IDs of learning items
}

export interface ProgressStats {
  totalItems: number;
  completedItems: number;
  completionPercentage: number;
  totalEstimatedTime: number;
  totalActualTime: number;
  timeEfficiency: number; // actual vs estimated
  categoryBreakdown: Record<string, { total: number; completed: number; percentage: number }>;
  difficultyBreakdown: Record<string, { total: number; completed: number; percentage: number }>;
}

export interface LearningRecommendation {
  id: string;
  title: string;
  reason: string;
  priority: "low" | "medium" | "high";
  estimatedTime: number;
  category: string;
  difficulty: string;
}
