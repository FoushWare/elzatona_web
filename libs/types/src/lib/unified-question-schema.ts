// v1.0 - Unified Question Schema
// Centralized type definitions for the unified question system

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy Supabase client creation - only create when needed and if environment variables are available
// This should NEVER be called in client-side code - only in server-side API routes
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  // Early return if already initialized
  if (supabase) {
    return supabase;
  }

  // CRITICAL: Never create Supabase client in browser/client environment
  // Check if we're in a browser environment first
  if (globalThis.window !== undefined) {
    // We're in a browser - Supabase client should not be created here
    // This file should only be used for types in client components
    return null;
  }

  // Only proceed if we're in a server environment (Node.js)
  const nodeProcess = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  if (!nodeProcess) {
    return null;
  }

  // Only create client if we're in a server environment with proper env vars
  // Use safe property access to avoid TypeScript errors
  let supabaseUrl = "";
  let supabaseServiceRoleKey = "";

  try {
    // Access process.env safely (only available in Node.js/server environment)
    const env = nodeProcess.env;
    if (env) {
      supabaseUrl = env["NEXT_PUBLIC_SUPABASE_URL"] || "";
      supabaseServiceRoleKey = env["SUPABASE_SERVICE_ROLE_KEY"] || "";
    }
  } catch {
    // Ignore errors accessing environment variables
    return null;
  }

  // Only create client if we have valid credentials
  if (
    supabaseUrl &&
    supabaseServiceRoleKey &&
    supabaseUrl !== "" &&
    supabaseServiceRoleKey !== ""
  ) {
    try {
      supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
      return supabase;
    } catch (error) {
      console.warn("Failed to create Supabase client:", error);
      return null;
    }
  }

  return null;
}

export interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: "multiple-choice" | "true-false" | "code";
  category?: string; // Made optional
  subcategory?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
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
  difficulty: "beginner" | "intermediate" | "advanced";
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
export type QuestionType = UnifiedQuestion["type"];
export type QuestionDifficulty = UnifiedQuestion["difficulty"];

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

// Unified Question Service Class
export class UnifiedQuestionService {
  // Get all questions with optional filters
  async getQuestions(filters?: QuestionFilter): Promise<UnifiedQuestion[]> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    let q = supabase.from("questions").select("*");

    if (filters?.category) {
      q = q.eq("category", filters.category);
    }
    if (filters?.difficulty) {
      q = q.eq("difficulty", filters.difficulty);
    }
    if (filters?.learningPath) {
      q = q.eq("learningPath", filters.learningPath);
    }
    if (filters?.sectionId) {
      q = q.eq("sectionId", filters.sectionId);
    }
    if (filters?.isActive !== undefined) {
      q = q.eq("isActive", filters.isActive);
    }

    q = q.order("created_at", { ascending: true });

    if (filters?.limit) {
      q = q.limit(filters.limit);
    }

    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  }

  // Get a single question by ID
  async getQuestion(id: string): Promise<UnifiedQuestion | null> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    const { data: docSnap, error } = await supabase
      .from("questions")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    if (docSnap) {
      return docSnap as UnifiedQuestion;
    }
    return null;
  }

  // Create a new question
  async createQuestion(
    question: Omit<UnifiedQuestion, "id" | "createdAt" | "updatedAt">,
  ): Promise<UnifiedQuestion> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    const questionWithTimestamps = {
      ...question,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: docRef, error } = await supabase
      .from("questions")
      .insert(questionWithTimestamps)
      .select()
      .single();
    if (error) throw error;
    return docRef as UnifiedQuestion;
  }

  // Update an existing question
  async updateQuestion(
    id: string,
    updates: Partial<UnifiedQuestion>,
  ): Promise<UnifiedQuestion> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    const updateWithTimestamps = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedDoc, error } = await supabase
      .from("questions")
      .update(updateWithTimestamps)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updatedDoc as UnifiedQuestion;
  }

  // Delete a question
  async deleteQuestion(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    try {
      const { error } = await supabase.from("questions").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting question:", error);
      return false;
    }
  }

  // Get question statistics
  async getQuestionStats(): Promise<QuestionStats> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    // For small datasets, get all questions at once (more efficient than multiple queries)
    const { data: questions, error } = await supabase
      .from("questions")
      .select("*");
    if (error) throw error;

    const stats: QuestionStats = {
      totalQuestions: questions.length,
      questionsByCategory: {},
      questionsByDifficulty: {},
      questionsByLearningPath: {},
      questionsBySection: {},
      activeQuestions: 0,
      inactiveQuestions: 0,
      averageDifficulty: 0,
      lastUpdated: new Date().toISOString(),
      topCategories: [],
      recentActivity: [],
    };

    // Process each question
    questions.forEach((question) => {
      // Count by category
      if (question.category) {
        stats.questionsByCategory[question.category] =
          (stats.questionsByCategory[question.category] || 0) + 1;
      }

      // Count by difficulty
      if (question.difficulty) {
        stats.questionsByDifficulty[question.difficulty] =
          (stats.questionsByDifficulty[question.difficulty] || 0) + 1;
      }

      // Count by learning path
      if (question.learningPath) {
        stats.questionsByLearningPath[question.learningPath] =
          (stats.questionsByLearningPath[question.learningPath] || 0) + 1;
      }

      // Count by section
      if (question.sectionId) {
        stats.questionsBySection[question.sectionId] =
          (stats.questionsBySection[question.sectionId] || 0) + 1;
      }

      // Count active/inactive
      if (question.isActive) {
        stats.activeQuestions++;
      } else {
        stats.inactiveQuestions++;
      }
    });

    // Calculate average difficulty
    const difficultyValues = { beginner: 1, intermediate: 2, advanced: 3 };
    const totalDifficulty = questions.reduce(
      (sum, q) =>
        sum +
        (difficultyValues[q.difficulty as keyof typeof difficultyValues] || 0),
      0,
    );
    stats.averageDifficulty =
      questions.length > 0 ? totalDifficulty / questions.length : 0;

    // Get top categories
    stats.topCategories = Object.entries(stats.questionsByCategory)
      .map(([category, count]) => ({
        category,
        count,
        percentage:
          stats.totalQuestions > 0 ? (count / stats.totalQuestions) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get recent activity (group by date)
    const activityByDate: Record<
      string,
      {
        questionsAdded: number;
        questionsUpdated: number;
        questionsDeleted: number;
      }
    > = {};

    questions.forEach((q) => {
      // Handle both string and any timestamp formats
      let date: string;
      const parseDate = (dateValue: any) => {
        const parsedDate = new Date(dateValue);
        return Number.isNaN(parsedDate.getTime())
          ? new Date().toISOString().split("T")[0]
          : parsedDate.toISOString().split("T")[0];
      };
      if (
        typeof q.created_at === "string" ||
        (q.created_at &&
          typeof q.created_at === "object" &&
          "toDate" in q.created_at)
      ) {
        date = parseDate(q.created_at);
      } else {
        date = new Date().toISOString().split("T")[0];
      }

      if (!activityByDate[date]) {
        activityByDate[date] = {
          questionsAdded: 0,
          questionsUpdated: 0,
          questionsDeleted: 0,
        };
      }
      activityByDate[date].questionsAdded++;
    });

    stats.recentActivity = Object.entries(activityByDate)
      .map(([date, activity]) => ({ date, ...activity }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);

    return stats;
  }

  // Search questions
  async searchQuestions(
    searchTerm: string,
    filters?: QuestionFilter,
  ): Promise<QuestionSearchResult> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    const startTime = Date.now();

    // Get all questions first (any doesn't support full-text search)
    let q = supabase.from("questions").select("*");

    if (filters?.category) {
      q = q.eq("category", filters.category);
    }
    if (filters?.difficulty) {
      q = q.eq("difficulty", filters.difficulty);
    }
    if (filters?.learningPath) {
      q = q.eq("learningPath", filters.learningPath);
    }
    if (filters?.sectionId) {
      q = q.eq("sectionId", filters.sectionId);
    }
    if (filters?.isActive !== undefined) {
      q = q.eq("isActive", filters.isActive);
    }

    const { data, error } = await q;
    if (error) throw error;
    let questions = data || [];

    // Client-side search filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      questions = questions.filter(
        (q) =>
          q.title.toLowerCase().includes(searchLower) ||
          q.content.toLowerCase().includes(searchLower) ||
          q.explanation?.toLowerCase().includes(searchLower) ||
          (q.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchLower),
          ) ??
            false),
      );
    }

    // Apply limit if specified
    if (filters?.limit) {
      questions = questions.slice(0, filters.limit);
    }

    const searchTime = Date.now() - startTime;

    return {
      questions,
      totalCount: questions.length,
      hasMore: false, // Simplified for now
      filters: filters || {},
      searchTime,
    };
  }

  // Extract validation functions to reduce cognitive complexity
  private validateTitle(
    title: string | undefined,
    errors: QuestionValidationError[],
    warnings: QuestionValidationError[],
  ): void {
    if (!title || title.trim().length === 0) {
      errors.push({
        field: "title",
        message: "Title is required",
        severity: "error",
      });
      return;
    }

    if (title.length < QUESTION_VALIDATION_RULES.title.minLength) {
      errors.push({
        field: "title",
        message: `Title must be at least ${QUESTION_VALIDATION_RULES.title.minLength} characters`,
        severity: "error",
      });
    } else if (title.length > QUESTION_VALIDATION_RULES.title.maxLength) {
      warnings.push({
        field: "title",
        message: `Title is very long (${title.length} characters)`,
        severity: "warning",
      });
    }
  }

  private validateQuestionContent(
    content: string | undefined,
    errors: QuestionValidationError[],
    warnings: QuestionValidationError[],
  ): void {
    if (!content || content.trim().length === 0) {
      errors.push({
        field: "content",
        message: "Content is required",
        severity: "error",
      });
    } else if (content.length < QUESTION_VALIDATION_RULES.content.minLength) {
      errors.push({
        field: "content",
        message: `Content must be at least ${QUESTION_VALIDATION_RULES.content.minLength} characters`,
        severity: "error",
      });
    } else if (content.length > QUESTION_VALIDATION_RULES.content.maxLength) {
      warnings.push({
        field: "content",
        message: `Content is very long (${content.length} characters)`,
        severity: "warning",
      });
    }
  }

  private validateQuestionOptions(
    question: Partial<UnifiedQuestion>,
    errors: QuestionValidationError[],
    warnings: QuestionValidationError[],
  ): void {
    if (question.type === "multiple-choice" && question.options) {
      if (
        question.options.length < QUESTION_VALIDATION_RULES.options.minCount
      ) {
        errors.push({
          field: "options",
          message: `At least ${QUESTION_VALIDATION_RULES.options.minCount} options are required`,
          severity: "error",
        });
      } else if (
        question.options.length > QUESTION_VALIDATION_RULES.options.maxCount
      ) {
        warnings.push({
          field: "options",
          message: `Too many options (${question.options.length}), consider reducing`,
          severity: "warning",
        });
      }

      const hasCorrectOption = question.options.some((opt) => opt.isCorrect);
      if (!hasCorrectOption) {
        errors.push({
          field: "options",
          message: "At least one option must be marked as correct",
          severity: "error",
        });
      }
    }
  }

  private validateQuestionTimeLimit(
    timeLimit: number | undefined,
    errors: QuestionValidationError[],
    warnings: QuestionValidationError[],
  ): void {
    if (timeLimit !== undefined) {
      if (timeLimit < QUESTION_VALIDATION_RULES.timeLimit.min) {
        errors.push({
          field: "timeLimit",
          message: `Time limit must be at least ${QUESTION_VALIDATION_RULES.timeLimit.min} seconds`,
          severity: "error",
        });
      } else if (timeLimit > QUESTION_VALIDATION_RULES.timeLimit.max) {
        warnings.push({
          field: "timeLimit",
          message: `Time limit is very long (${timeLimit} seconds)`,
          severity: "warning",
        });
      }
    }
  }

  private validateQuestionPoints(
    points: number | undefined,
    errors: QuestionValidationError[],
    warnings: QuestionValidationError[],
  ): void {
    if (points !== undefined) {
      if (points < QUESTION_VALIDATION_RULES.points.min) {
        errors.push({
          field: "points",
          message: `Points must be at least ${QUESTION_VALIDATION_RULES.points.min}`,
          severity: "error",
        });
      } else if (points > QUESTION_VALIDATION_RULES.points.max) {
        warnings.push({
          field: "points",
          message: `Points are very high (${points})`,
          severity: "warning",
        });
      }
    }
  }

  // Validate a question
  validateQuestion(
    question: Partial<UnifiedQuestion>,
  ): QuestionValidationResult {
    const errors: QuestionValidationError[] = [];
    const warnings: QuestionValidationError[] = [];

    // Validate title
    this.validateTitle(question.title, errors, warnings);

    // Validate content
    this.validateQuestionContent(question.content, errors, warnings);

    // Validate options for multiple choice questions
    this.validateQuestionOptions(question, errors, warnings);

    // Validate time limit
    this.validateQuestionTimeLimit(question.timeLimit, errors, warnings);

    // Validate points
    this.validateQuestionPoints(question.points, errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  // Remove duplicate learning paths (placeholder implementation)
  static async removeDuplicateLearningPaths(): Promise<void> {
    // This is a placeholder implementation
    // In a real implementation, this would:
    // 1. Query all learning paths
    // 2. Find duplicates based on name or other criteria
    // 3. Merge or remove duplicates
    // 4. Update questions that reference the removed paths
    console.log(
      "removeDuplicateLearningPaths called - placeholder implementation",
    );
  }

  // Get learning paths (placeholder implementation)
  static async getLearningPaths(): Promise<LearningPath[]> {
    // This is a placeholder implementation
    // In a real implementation, this would query the database for learning paths
    console.log("getLearningPaths called - placeholder implementation");
    return [];
  }

  // Initialize default learning paths (placeholder implementation)
  static async initializeDefaultLearningPaths(): Promise<void> {
    // This is a placeholder implementation
    // In a real implementation, this would create default learning paths in the database
    console.log(
      "initializeDefaultLearningPaths called - placeholder implementation",
    );
  }

  // Get questions by IDs (placeholder implementation)
  static async getQuestionsByIds(
    questionIds: string[],
  ): Promise<{ success: boolean; data?: UnifiedQuestion[]; error?: string }> {
    // This is a placeholder implementation
    // In a real implementation, this would query the database for questions by their IDs
    console.log("getQuestionsByIds called with IDs:", questionIds);
    return { success: true, data: [] };
  }
}

// Default export for backward compatibility
export default UnifiedQuestionService;
