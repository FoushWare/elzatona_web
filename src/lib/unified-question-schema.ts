// v1.0 - Unified Question Schema
// Centralized type definitions for the unified question system

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

export interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category?: string; // Made optional
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPath?: string; // Already optional
  sectionId?: string; // Already optional
  topic?: string; // Added topic field
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  tags?: string[];
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
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in hours
  prerequisites?: string[];
  targetSkills: string[];
  questionCount: number;
  questionCategories: string[];
  sections: Array<{
    id: string;
    title: string;
    description: string;
    questionCount: number;
    order: number;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  severity?: 'error' | 'warning';
}

export interface QuestionValidationResult {
  isValid: boolean;
  errors: QuestionValidationError[];
  warnings: QuestionValidationError[];
  suggestions?: string[];
}

// Utility types
export type QuestionType = UnifiedQuestion['type'];
export type QuestionDifficulty = UnifiedQuestion['difficulty'];
export type QuestionCategory = string;
export type QuestionSubcategory = string;

// Constants
export const QUESTION_TYPES: QuestionType[] = [
  'multiple-choice',
  'open-ended',
  'true-false',
  'code',
];

export const QUESTION_DIFFICULTIES: QuestionDifficulty[] = [
  'beginner',
  'intermediate',
  'advanced',
];

export const DEFAULT_QUESTION_METADATA = {
  source: 'manual',
  version: '1.0.0',
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
    requiredFor: ['multiple-choice'],
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
  private db: Firestore | null;

  constructor(db: Firestore | null) {
    this.db = db;
  }

  // Get all questions with optional filters
  async getQuestions(filters?: QuestionFilter): Promise<UnifiedQuestion[]> {
    if (!this.db) throw new Error('Firestore not initialized');

    let q = query(collection(this.db, 'unifiedQuestions'));

    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters?.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }
    if (filters?.learningPath) {
      q = query(q, where('learningPath', '==', filters.learningPath));
    }
    if (filters?.sectionId) {
      q = query(q, where('sectionId', '==', filters.sectionId));
    }
    if (filters?.isActive !== undefined) {
      q = query(q, where('isActive', '==', filters.isActive));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as UnifiedQuestion
    );
  }

  // Get a single question by ID
  async getQuestion(id: string): Promise<UnifiedQuestion | null> {
    if (!this.db) throw new Error('Firestore not initialized');

    const docSnap = await getDoc(doc(this.db, 'unifiedQuestions', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UnifiedQuestion;
    }
    return null;
  }

  // Create a new question
  async createQuestion(
    question: Omit<UnifiedQuestion, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<UnifiedQuestion> {
    if (!this.db) throw new Error('Firestore not initialized');

    const questionWithTimestamps = {
      ...question,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(this.db, 'unifiedQuestions'),
      questionWithTimestamps
    );
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as UnifiedQuestion;
  }

  // Update an existing question
  async updateQuestion(
    id: string,
    updates: Partial<UnifiedQuestion>
  ): Promise<UnifiedQuestion> {
    if (!this.db) throw new Error('Firestore not initialized');

    const updateWithTimestamps = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(doc(this.db, 'unifiedQuestions', id), updateWithTimestamps);
    const updatedDoc = await getDoc(doc(this.db, 'unifiedQuestions', id));
    return { id: updatedDoc.id, ...updatedDoc.data() } as UnifiedQuestion;
  }

  // Delete a question
  async deleteQuestion(id: string): Promise<boolean> {
    if (!this.db) throw new Error('Firestore not initialized');

    try {
      await deleteDoc(doc(this.db, 'unifiedQuestions', id));
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      return false;
    }
  }

  // Get question statistics
  async getQuestionStats(): Promise<QuestionStats> {
    if (!this.db) throw new Error('Firestore not initialized');

    // For small datasets, get all questions at once (more efficient than multiple queries)
    const snapshot = await getDocs(collection(this.db, 'unifiedQuestions'));
    const questions = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as UnifiedQuestion
    );

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
    questions.forEach(question => {
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
      (sum, q) => sum + (difficultyValues[q.difficulty] || 0),
      0
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

    questions.forEach(q => {
      const date = new Date(q.createdAt).toISOString().split('T')[0];
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
    filters?: QuestionFilter
  ): Promise<QuestionSearchResult> {
    if (!this.db) throw new Error('Firestore not initialized');

    const startTime = Date.now();

    // Get all questions first (Firestore doesn't support full-text search)
    let q = query(collection(this.db, 'unifiedQuestions'));

    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters?.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }
    if (filters?.learningPath) {
      q = query(q, where('learningPath', '==', filters.learningPath));
    }
    if (filters?.sectionId) {
      q = query(q, where('sectionId', '==', filters.sectionId));
    }
    if (filters?.isActive !== undefined) {
      q = query(q, where('isActive', '==', filters.isActive));
    }

    const snapshot = await getDocs(q);
    let questions = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as UnifiedQuestion
    );

    // Client-side search filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      questions = questions.filter(
        q =>
          q.title.toLowerCase().includes(searchLower) ||
          q.content.toLowerCase().includes(searchLower) ||
          (q.explanation &&
            q.explanation.toLowerCase().includes(searchLower)) ||
          (q.tags &&
            q.tags.some(tag => tag.toLowerCase().includes(searchLower)))
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

  // Validate a question
  validateQuestion(
    question: Partial<UnifiedQuestion>
  ): QuestionValidationResult {
    const errors: QuestionValidationError[] = [];
    const warnings: QuestionValidationError[] = [];

    // Validate title
    if (!question.title || question.title.trim().length === 0) {
      errors.push({
        field: 'title',
        message: 'Title is required',
        severity: 'error',
      });
    } else if (
      question.title.length < QUESTION_VALIDATION_RULES.title.minLength
    ) {
      errors.push({
        field: 'title',
        message: `Title must be at least ${QUESTION_VALIDATION_RULES.title.minLength} characters`,
        severity: 'error',
      });
    } else if (
      question.title.length > QUESTION_VALIDATION_RULES.title.maxLength
    ) {
      warnings.push({
        field: 'title',
        message: `Title is very long (${question.title.length} characters)`,
        severity: 'warning',
      });
    }

    // Validate content
    if (!question.content || question.content.trim().length === 0) {
      errors.push({
        field: 'content',
        message: 'Content is required',
        severity: 'error',
      });
    } else if (
      question.content.length < QUESTION_VALIDATION_RULES.content.minLength
    ) {
      errors.push({
        field: 'content',
        message: `Content must be at least ${QUESTION_VALIDATION_RULES.content.minLength} characters`,
        severity: 'error',
      });
    } else if (
      question.content.length > QUESTION_VALIDATION_RULES.content.maxLength
    ) {
      warnings.push({
        field: 'content',
        message: `Content is very long (${question.content.length} characters)`,
        severity: 'warning',
      });
    }

    // Validate options for multiple choice questions
    if (question.type === 'multiple-choice' && question.options) {
      if (
        question.options.length < QUESTION_VALIDATION_RULES.options.minCount
      ) {
        errors.push({
          field: 'options',
          message: `At least ${QUESTION_VALIDATION_RULES.options.minCount} options are required`,
          severity: 'error',
        });
      } else if (
        question.options.length > QUESTION_VALIDATION_RULES.options.maxCount
      ) {
        warnings.push({
          field: 'options',
          message: `Too many options (${question.options.length}), consider reducing`,
          severity: 'warning',
        });
      }

      // Check if at least one option is correct
      const hasCorrectOption = question.options.some(opt => opt.isCorrect);
      if (!hasCorrectOption) {
        errors.push({
          field: 'options',
          message: 'At least one option must be marked as correct',
          severity: 'error',
        });
      }
    }

    // Validate time limit
    if (question.timeLimit !== undefined) {
      if (question.timeLimit < QUESTION_VALIDATION_RULES.timeLimit.min) {
        errors.push({
          field: 'timeLimit',
          message: `Time limit must be at least ${QUESTION_VALIDATION_RULES.timeLimit.min} seconds`,
          severity: 'error',
        });
      } else if (question.timeLimit > QUESTION_VALIDATION_RULES.timeLimit.max) {
        warnings.push({
          field: 'timeLimit',
          message: `Time limit is very long (${question.timeLimit} seconds)`,
          severity: 'warning',
        });
      }
    }

    // Validate points
    if (question.points !== undefined) {
      if (question.points < QUESTION_VALIDATION_RULES.points.min) {
        errors.push({
          field: 'points',
          message: `Points must be at least ${QUESTION_VALIDATION_RULES.points.min}`,
          severity: 'error',
        });
      } else if (question.points > QUESTION_VALIDATION_RULES.points.max) {
        warnings.push({
          field: 'points',
          message: `Points are very high (${question.points})`,
          severity: 'warning',
        });
      }
    }

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
      'removeDuplicateLearningPaths called - placeholder implementation'
    );
  }

  // Get learning paths (placeholder implementation)
  static async getLearningPaths(): Promise<LearningPath[]> {
    // This is a placeholder implementation
    // In a real implementation, this would query the database for learning paths
    console.log('getLearningPaths called - placeholder implementation');
    return [];
  }

  // Initialize default learning paths (placeholder implementation)
  static async initializeDefaultLearningPaths(): Promise<void> {
    // This is a placeholder implementation
    // In a real implementation, this would create default learning paths in the database
    console.log(
      'initializeDefaultLearningPaths called - placeholder implementation'
    );
  }

  // Get questions by IDs (placeholder implementation)
  static async getQuestionsByIds(
    questionIds: string[]
  ): Promise<{ success: boolean; data?: any[]; error?: string }> {
    // This is a placeholder implementation
    // In a real implementation, this would query the database for questions by their IDs
    console.log('getQuestionsByIds called with IDs:', questionIds);
    return { success: true, data: [] };
  }
}

// Default export for backward compatibility
export default UnifiedQuestionService;
