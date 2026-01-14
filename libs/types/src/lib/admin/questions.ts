export interface AdminUnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: "multiple-choice" | "true-false" | "code" | "mcq";
  category?: string;
  subcategory?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  learningPath?: string;
  sectionId?: string;
  topic?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  tags?: string[];
  explanation?: string;
  hints?: string[];
  timeLimit?: number;
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
  // Legacy fields for compatibility
  correct_answer?: string | number;
  test_cases?: string[];
  learning_card_id?: string;
  category_id?: string;
  topic_id?: string;
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
}

export interface AdminQuestionStats {
  totalQuestions: number;
  activeQuestions: number;
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
  }>;
}
