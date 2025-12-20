// v1.0 - Unified Question Schema
// Centralized type definitions for the unified question system

// Type aliases for union types
export type QuestionType = "multiple-choice" | "true-false" | "code";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

// Note: Supabase client should be initialized in service files, not in type definitions
// This file only contains type definitions and interfaces

export interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: QuestionType;
  category?: string; // Made optional
  subcategory?: string;
  difficulty: DifficultyLevel;
  learningPath?: string; // Already optional
  sectionId?: string; // Already optional
  topic?: string; // Added topic field
  topic_id?: string; // Added topic_id field for direct database reference
  category_id?: string; // Added category_id field for direct database reference
  learningCardId?: string; // Added learning card ID
  learning_card_id?: string; // Added learning_card_id for direct database reference
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy?: string;
  updatedBy?: string;
  tags?: string[];
  answer?: string; // Added answer field
  explanation?: string;
  hints?: string[];
  timeLimit?: number; // in seconds
  points?: number;
  metadata?: {
    source?: string;
    version?: string;
    references?: string[];
    [key: string]: unknown;
  };
  // For multiple choice questions
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  // For code questions
  codeTemplate?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
  // For open-ended questions
  sampleAnswers?: string[];
  // Statistics
  stats?: {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    difficultyRating: number;
  };
  // New fields with junction table data
  topics?: Array<{
    id: string;
    name: string;
    slug: string;
    difficulty: string;
    is_primary: boolean;
    order_index: number;
  }>;
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
    card_type: string;
    is_primary: boolean;
    order_index: number;
  }>;
  learning_card?: {
    id: string;
    title: string;
    type: string;
    color: string;
    icon: string;
  };
  // Resources for questions (optional)
  resources?: Array<{
    type: string;
    title: string;
    url: string;
    [key: string]: unknown;
  }> | null;
}

export interface BulkQuestionData {
  questions: UnifiedQuestion[];
  metadata: {
    source: string;
    version: string;
    totalCount: number;
    categories: string[];
    difficulties: string[];
    learningPaths: string[];
  };
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
}

export interface QuestionStats {
  totalQuestions: number;
  questionsByCategory: Record<string, number>;
  questionsByDifficulty: Record<string, number>;
  questionsByLearningPath: Record<string, number>;
  questionsBySection: Record<string, number>;
  activeQuestions: number;
  inactiveQuestions: number;
  averageDifficulty: number;
  lastUpdated: string;
  topCategories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    date: string;
    questionsAdded: number;
    questionsUpdated: number;
    questionsDeleted: number;
  }>;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in hours
  prerequisites?: string[];
  targetSkills: string[];
  question_count: number;
  questionCategories: string[];
  sections: Array<{
    id: string;
    title: string;
    description: string;
    question_count: number;
    order: number;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy?: string;
  updatedBy?: string;
  metadata?: {
    version: string;
    tags: string[];
    [key: string]: unknown;
  };
}

export interface QuestionFilter {
  category?: string;
  subcategory?: string;
  difficulty?: string;
  learningPath?: string;
  sectionId?: string;
  isActive?: boolean;
  tags?: string[];
  searchTerm?: string;
  limit?: number;
  dateRange?: {
    start: string;
    end: string;
  };
  createdBy?: string;
  updatedBy?: string;
}

export interface QuestionSearchResult {
  questions: UnifiedQuestion[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
  filters: QuestionFilter;
  searchTime: number; // in milliseconds
}

export interface QuestionValidationError {
  field: string;
  message: string;
  code?: string;
  value?: unknown;
  severity?: "error" | "warning";
}

export interface QuestionValidationResult {
  isValid: boolean;
  errors: QuestionValidationError[];
  warnings: QuestionValidationError[];
  suggestions?: string[];
}

// Utility types
export type QuestionDifficulty = UnifiedQuestion["difficulty"];
export type QuestionCategory = string;

// Constants
export const QUESTION_TYPES: QuestionType[] = [
  "multiple-choice",
  "true-false",
  "code",
];

export const QUESTION_DIFFICULTIES: QuestionDifficulty[] = [
  "beginner",
  "intermediate",
  "advanced",
];

export const DEFAULT_QUESTION_METADATA = {
  source: "manual",
  version: "1.0.0",
  references: [],
};

export const QUESTION_VALIDATION_RULES = {
  title: {
    minLength: 10,
    maxLength: 200,
    required: true,
  },
  content: {
    minLength: 20,
    maxLength: 2000,
    required: true,
  },
  options: {
    minCount: 2,
    maxCount: 6,
    requiredFor: ["multiple-choice"],
  },
  timeLimit: {
    min: 30, // 30 seconds
    max: 1800, // 30 minutes
    default: 300, // 5 minutes
  },
  points: {
    min: 1,
    max: 100,
    default: 10,
  },
};

// Note: Service implementations should be in separate service files
// This file only contains type definitions and interfaces
