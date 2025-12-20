export type LearningCardType = "core-technologies" | "framework-questions" | "problem-solving" | "system-design";
export type LearningCardDifficulty = "beginner" | "intermediate" | "advanced";

export interface LearningCard {
  id: string;
  title: string;
  type: LearningCardType;
  description: string;
  color: string;
  icon: string;
  order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  metadata: {
    question_count: number;
    estimatedTime: string;
    difficulty: LearningCardDifficulty;
    topics: string[];
    categories: LearningCardCategory[];
  };
}

export interface LearningCardCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  topics: LearningCardTopic[];
}

export interface LearningCardTopic {
  id: string;
  name: string;
  description: string;
  order: number;
  questionIds: string[];
}

export interface LearningPlanCard {
  id: string;
  plan_id: string;
  card_id: string;
  card: LearningCard;
  question_count: number;
  timeLimit: number; // in minutes
  difficulty: LearningCardDifficulty;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CardProgress {
  id: string;
  userId: string;
  plan_id: string;
  card_id: string;
  completedQuestions: string[];
  totalQuestions: number;
  score: number;
  timeSpent: number; // in minutes
  isCompleted: boolean;
  completedAt?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface LearningCardFormData {
  title: string;
  type: LearningCardType;
  description: string;
  color: string;
  icon: string;
  order: number;
  is_active: boolean;
  metadata: {
    question_count: number;
    estimatedTime: string;
    difficulty: LearningCardDifficulty;
    topics: string[];
    categories: Omit<LearningCardCategory, "id">[];
  };
}

// Predefined card types with their configurations
export const CARD_TYPES = {
  "core-technologies": {
    title: "Core Technologies",
    color: "#3B82F6", // Blue
    icon: "💻",
    description: "HTML, CSS, JavaScript, TypeScript fundamentals",
    defaultTopics: ["HTML", "CSS", "JavaScript", "TypeScript", "DOM", "ES6+"],
  },
  "framework-questions": {
    title: "Framework Questions",
    color: "#10B981", // Green
    icon: "⚛️",
    description: "React, Next.js, Vue, Angular, Svelte",
    defaultTopics: [
      "React",
      "Next.js",
      "Vue",
      "Angular",
      "Svelte",
      "State Management",
    ],
  },
  "problem-solving": {
    title: "Problem Solving",
    color: "#8B5CF6", // Purple
    icon: "🧩",
    description: "Frontend coding challenges and algorithms",
    defaultTopics: [
      "Algorithms",
      "Data Structures",
      "Problem Solving",
      "Coding Challenges",
    ],
  },
  "system-design": {
    title: "System Design",
    color: "#F59E0B", // Orange
    icon: "🏗️",
    description: "Frontend architecture patterns",
    defaultTopics: [
      "Architecture",
      "Scalability",
      "Performance",
      "Design Patterns",
    ],
  },
} as const;

export type CardType = keyof typeof CARD_TYPES;
