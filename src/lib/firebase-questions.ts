// v1.0 - Firebase Questions Service
// Service for managing questions in Firebase Firestore

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  UnifiedQuestion,
  QuestionStats,
  QuestionFilter,
  QuestionValidationResult,
  QuestionValidationError,
  QUESTION_VALIDATION_RULES,
} from './unified-question-schema';

// Legacy types for backward compatibility
export interface Question {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPath?: string;
  sectionId?: string;
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
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  codeTemplate?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
  sampleAnswers?: string[];
  stats?: {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    difficultyRating: number;
  };
}

export interface QuestionCategory {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Type definitions for question tracking
interface UserAnswer {
  answer: string | string[] | boolean;
  explanation?: string;
  confidence?: number;
}

export interface QuestionAttempt {
  id: string;
  questionId: string;
  userId: string;
  userAnswer: UserAnswer;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  points: number;
  attemptedAt: string;
  completedAt?: string;
  feedback?: string;
  hintsUsed: number;
  metadata?: {
    device?: string;
    browser?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

// Validation functions
export const validateQuestion = (
  question: Partial<UnifiedQuestion>
): QuestionValidationResult => {
  const errors: QuestionValidationError[] = [];
  const warnings: QuestionValidationError[] = [];

  // Title validation
  if (!question.title) {
    errors.push({
      field: 'title',
      message: 'Title is required',
      code: 'REQUIRED',
    });
  } else if (
    question.title.length < QUESTION_VALIDATION_RULES.title.minLength
  ) {
    errors.push({
      field: 'title',
      message: `Title must be at least ${QUESTION_VALIDATION_RULES.title.minLength} characters`,
      code: 'MIN_LENGTH',
      value: question.title.length,
    });
  } else if (
    question.title.length > QUESTION_VALIDATION_RULES.title.maxLength
  ) {
    errors.push({
      field: 'title',
      message: `Title must be no more than ${QUESTION_VALIDATION_RULES.title.maxLength} characters`,
      code: 'MAX_LENGTH',
      value: question.title.length,
    });
  }

  // Content validation
  if (!question.content) {
    errors.push({
      field: 'content',
      message: 'Content is required',
      code: 'REQUIRED',
    });
  } else if (
    question.content.length < QUESTION_VALIDATION_RULES.content.minLength
  ) {
    errors.push({
      field: 'content',
      message: `Content must be at least ${QUESTION_VALIDATION_RULES.content.minLength} characters`,
      code: 'MIN_LENGTH',
      value: question.content.length,
    });
  } else if (
    question.content.length > QUESTION_VALIDATION_RULES.content.maxLength
  ) {
    errors.push({
      field: 'content',
      message: `Content must be no more than ${QUESTION_VALIDATION_RULES.content.maxLength} characters`,
      code: 'MAX_LENGTH',
      value: question.content.length,
    });
  }

  // Type validation
  if (!question.type) {
    errors.push({
      field: 'type',
      message: 'Question type is required',
      code: 'REQUIRED',
    });
  }

  // Options validation for multiple choice
  if (question.type === 'multiple-choice') {
    if (
      !question.options ||
      question.options.length < QUESTION_VALIDATION_RULES.options.minCount
    ) {
      errors.push({
        field: 'options',
        message: `Multiple choice questions must have at least ${QUESTION_VALIDATION_RULES.options.minCount} options`,
        code: 'INSUFFICIENT_OPTIONS',
        value: question.options?.length || 0,
      });
    } else if (
      question.options.length > QUESTION_VALIDATION_RULES.options.maxCount
    ) {
      errors.push({
        field: 'options',
        message: `Multiple choice questions must have no more than ${QUESTION_VALIDATION_RULES.options.maxCount} options`,
        code: 'TOO_MANY_OPTIONS',
        value: question.options.length,
      });
    } else {
      const correctOptions = question.options.filter(opt => opt.isCorrect);
      if (correctOptions.length === 0) {
        errors.push({
          field: 'options',
          message: 'At least one option must be marked as correct',
          code: 'NO_CORRECT_OPTION',
        });
      }
    }
  }

  // Time limit validation
  if (question.timeLimit) {
    if (question.timeLimit < QUESTION_VALIDATION_RULES.timeLimit.min) {
      warnings.push({
        field: 'timeLimit',
        message: `Time limit is very short (${question.timeLimit}s). Consider increasing it.`,
        code: 'SHORT_TIME_LIMIT',
        value: question.timeLimit,
      });
    } else if (question.timeLimit > QUESTION_VALIDATION_RULES.timeLimit.max) {
      warnings.push({
        field: 'timeLimit',
        message: `Time limit is very long (${question.timeLimit}s). Consider reducing it.`,
        code: 'LONG_TIME_LIMIT',
        value: question.timeLimit,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions:
      errors.length > 0
        ? [
            'Check all required fields are filled',
            'Ensure question content is clear and complete',
            'Verify multiple choice options are properly configured',
          ]
        : undefined,
  };
};

// Firebase operations
export const getQuestions = async (
  filters?: QuestionFilter
): Promise<Question[]> => {
  try {
    if (!db) throw new Error('Firebase not initialized');

    const questionsRef = collection(db, 'unifiedQuestions');
    let q = query(questionsRef, where('isActive', '==', true));

    if (filters) {
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters.difficulty) {
        q = query(q, where('difficulty', '==', filters.difficulty));
      }
      if (filters.learningPath) {
        q = query(q, where('learningPath', '==', filters.learningPath));
      }
      if (filters.sectionId) {
        q = query(q, where('sectionId', '==', filters.sectionId));
      }
    }

    q = query(q, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const questions: Question[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt:
          data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as Question);
    });

    return questions;
  } catch (error) {
    console.error('Error getting questions:', error);
    throw error;
  }
};

export const getQuestion = async (id: string): Promise<Question | null> => {
  try {
    if (!db) throw new Error('Firebase not initialized');

    const questionRef = doc(db, 'questions', id);
    const questionSnap = await getDoc(questionRef);

    if (questionSnap.exists()) {
      const data = questionSnap.data();
      return {
        id: questionSnap.id,
        ...data,
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt:
          data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as Question;
    }

    return null;
  } catch (error) {
    console.error('Error getting question:', error);
    throw error;
  }
};

export const getRandomQuestions = async (
  count: number = 10,
  filters?: QuestionFilter
): Promise<Question[]> => {
  try {
    const allQuestions = await getQuestions(filters);
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error getting random questions:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<QuestionCategory[]> => {
  try {
    if (!db) throw new Error('Firebase not initialized');

    const categoriesRef = collection(db, 'questionCategories');
    const snapshot = await getDocs(categoriesRef);
    const categories: QuestionCategory[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      categories.push({
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt:
          data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as QuestionCategory);
    });

    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const getQuestionStats = async (): Promise<QuestionStats> => {
  try {
    const questions = await getQuestions();

    const stats: QuestionStats = {
      totalQuestions: questions.length,
      questionsByCategory: {},
      questionsByDifficulty: {},
      questionsByLearningPath: {},
      questionsBySection: {},
      activeQuestions: questions.filter(q => q.isActive).length,
      inactiveQuestions: questions.filter(q => !q.isActive).length,
      averageDifficulty: 0,
      lastUpdated: new Date().toISOString(),
      topCategories: [],
      recentActivity: [],
    };

    // Calculate category distribution
    questions.forEach(question => {
      stats.questionsByCategory[question.category] =
        (stats.questionsByCategory[question.category] || 0) + 1;
      stats.questionsByDifficulty[question.difficulty] =
        (stats.questionsByDifficulty[question.difficulty] || 0) + 1;

      if (question.learningPath) {
        stats.questionsByLearningPath[question.learningPath] =
          (stats.questionsByLearningPath[question.learningPath] || 0) + 1;
      }

      if (question.sectionId) {
        stats.questionsBySection[question.sectionId] =
          (stats.questionsBySection[question.sectionId] || 0) + 1;
      }
    });

    // Calculate average difficulty
    const difficultyValues = { beginner: 1, intermediate: 2, advanced: 3 };
    const totalDifficulty = questions.reduce(
      (sum, q) => sum + difficultyValues[q.difficulty],
      0
    );
    stats.averageDifficulty =
      questions.length > 0 ? totalDifficulty / questions.length : 0;

    // Calculate top categories
    stats.topCategories = Object.entries(stats.questionsByCategory)
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / questions.length) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return stats;
  } catch (error) {
    console.error('Error getting question stats:', error);
    throw error;
  }
};

export const saveQuestionAttempt = async (
  attempt: Omit<QuestionAttempt, 'id' | 'attemptedAt'>
): Promise<string> => {
  try {
    if (!db) throw new Error('Firebase not initialized');

    const attemptsRef = collection(db, 'questionAttempts');
    const docRef = await addDoc(attemptsRef, {
      ...attempt,
      attemptedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving question attempt:', error);
    throw error;
  }
};

export const getUserQuestionAttempts = async (
  userId: string,
  questionId?: string
): Promise<QuestionAttempt[]> => {
  try {
    if (!db) throw new Error('Firebase not initialized');

    const attemptsRef = collection(db, 'questionAttempts');
    let q = query(attemptsRef, where('userId', '==', userId));

    if (questionId) {
      q = query(q, where('questionId', '==', questionId));
    }

    q = query(q, orderBy('attemptedAt', 'desc'));

    const snapshot = await getDocs(q);
    const attempts: QuestionAttempt[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      attempts.push({
        id: doc.id,
        ...data,
        attemptedAt:
          data.attemptedAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
        completedAt: data.completedAt?.toDate?.()?.toISOString(),
      } as QuestionAttempt);
    });

    return attempts;
  } catch (error) {
    console.error('Error getting user question attempts:', error);
    throw error;
  }
};

export const searchQuestions = async (
  searchTerm: string,
  filters?: QuestionFilter
): Promise<Question[]> => {
  try {
    const allQuestions = await getQuestions(filters);

    const searchLower = searchTerm.toLowerCase();
    return allQuestions.filter(
      question =>
        question.title.toLowerCase().includes(searchLower) ||
        question.content.toLowerCase().includes(searchLower) ||
        question.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        question.category.toLowerCase().includes(searchLower)
    );
  } catch (error) {
    console.error('Error searching questions:', error);
    throw error;
  }
};

export const getQuizQuestions = async (
  category?: string,
  difficulty?: string,
  count: number = 10
): Promise<Question[]> => {
  try {
    const filters: QuestionFilter = {
      category,
      difficulty,
      isActive: true,
    };

    return await getRandomQuestions(count, filters);
  } catch (error) {
    console.error('Error getting quiz questions:', error);
    throw error;
  }
};
