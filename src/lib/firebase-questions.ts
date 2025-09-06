// v1.0 - Firebase Questions and Answers Management
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Question and Answer interfaces
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  points: number;
  timeLimit?: number; // in seconds
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  isActive: boolean;
}

export interface QuestionAttempt {
  questionId: string;
  userId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  attempts: number;
  timestamp: string;
  points: number;
}

export interface QuestionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  questionCount: number;
  isActive: boolean;
}

export interface QuestionStats {
  totalQuestions: number;
  questionsByCategory: Record<string, number>;
  questionsByDifficulty: Record<string, number>;
  averagePoints: number;
}

// Question management functions
export const createQuestion = async (questionData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const timestamp = new Date().toISOString();
    const questionRef = await addDoc(collection(db, 'questions'), {
      ...questionData,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    return questionRef.id;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

export const getQuestion = async (questionId: string): Promise<Question | null> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const questionRef = doc(db, 'questions', questionId);
    const questionSnap = await getDoc(questionRef);

    if (questionSnap.exists()) {
      return { id: questionSnap.id, ...questionSnap.data() } as Question;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting question:', error);
    return null;
  }
};

export const getQuestions = async (filters?: {
  category?: string;
  difficulty?: string;
  tags?: string[];
  limit?: number;
  isActive?: boolean;
}): Promise<Question[]> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    let q = query(collection(db, 'questions'));

    // Apply filters
    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters?.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }
    
    if (filters?.isActive !== undefined) {
      q = query(q, where('isActive', '==', filters.isActive));
    }

    // Order by creation date
    q = query(q, orderBy('createdAt', 'desc'));

    // Apply limit
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const questions: Question[] = [];

    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() } as Question);
    });

    // Filter by tags if specified (client-side filtering for array-contains-any)
    if (filters?.tags && filters.tags.length > 0) {
      return questions.filter(question => 
        filters.tags!.some(tag => question.tags.includes(tag))
      );
    }

    return questions;
  } catch (error) {
    console.error('Error getting questions:', error);
    return [];
  }
};

export const updateQuestion = async (questionId: string, updates: Partial<Question>): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (questionId: string): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const questionRef = doc(db, 'questions', questionId);
    await deleteDoc(questionRef);
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

export const getRandomQuestions = async (count: number, filters?: {
  category?: string;
  difficulty?: string;
  excludeIds?: string[];
}): Promise<Question[]> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    // Get all questions first (we'll randomize client-side for simplicity)
    // In production, you might want to implement server-side randomization
    const allQuestions = await getQuestions({
      category: filters?.category,
      difficulty: filters?.difficulty,
      isActive: true
    });

    // Filter out excluded questions
    const filteredQuestions = filters?.excludeIds 
      ? allQuestions.filter(q => !filters.excludeIds!.includes(q.id))
      : allQuestions;

    // Shuffle and take the requested count
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error getting random questions:', error);
    return [];
  }
};

export const getQuestionsByCategory = async (category: string): Promise<Question[]> => {
  return getQuestions({ category, isActive: true });
};

export const getQuestionsByDifficulty = async (difficulty: string): Promise<Question[]> => {
  return getQuestions({ difficulty, isActive: true });
};

// Question categories management
export const getCategories = async (): Promise<QuestionCategory[]> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const categoriesRef = collection(db, 'questionCategories');
    const categoriesSnap = await getDocs(categoriesRef);
    
    const categories: QuestionCategory[] = [];
    categoriesSnap.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() } as QuestionCategory);
    });

    return categories.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const createCategory = async (categoryData: Omit<QuestionCategory, 'id'>): Promise<string> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const categoryRef = await addDoc(collection(db, 'questionCategories'), categoryData);
    return categoryRef.id;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Question statistics
export const getQuestionStats = async (): Promise<QuestionStats> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const questions = await getQuestions({ isActive: true });
    
    const stats: QuestionStats = {
      totalQuestions: questions.length,
      questionsByCategory: {},
      questionsByDifficulty: {},
      averagePoints: 0
    };

    let totalPoints = 0;

    questions.forEach(question => {
      // Count by category
      stats.questionsByCategory[question.category] = 
        (stats.questionsByCategory[question.category] || 0) + 1;
      
      // Count by difficulty
      stats.questionsByDifficulty[question.difficulty] = 
        (stats.questionsByDifficulty[question.difficulty] || 0) + 1;
      
      totalPoints += question.points;
    });

    stats.averagePoints = questions.length > 0 ? totalPoints / questions.length : 0;

    return stats;
  } catch (error) {
    console.error('Error getting question stats:', error);
    return {
      totalQuestions: 0,
      questionsByCategory: {},
      questionsByDifficulty: {},
      averagePoints: 0
    };
  }
};

// Question attempt tracking
export const saveQuestionAttempt = async (attempt: Omit<QuestionAttempt, 'timestamp' | 'points'>): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const timestamp = new Date().toISOString();
    
    // Calculate points based on difficulty and correctness
    const question = await getQuestion(attempt.questionId);
    const points = question && attempt.isCorrect 
      ? Math.max(1, question.points - (attempt.attempts - 1) * 2)
      : 0;

    const fullAttempt: QuestionAttempt = {
      ...attempt,
      timestamp,
      points
    };

    const attemptRef = await addDoc(collection(db, 'questionAttempts'), fullAttempt);
    
    // Also update user progress (integrate with existing progress system)
    const { updateQuestionProgress } = await import('./firebase-progress');
    await updateQuestionProgress(attempt.userId, {
      questionId: attempt.questionId,
      category: question?.category || 'general',
      difficulty: question?.difficulty || 'medium',
      answeredCorrectly: attempt.isCorrect,
      timeSpent: attempt.timeSpent,
      attempts: attempt.attempts
    });
  } catch (error) {
    console.error('Error saving question attempt:', error);
    throw error;
  }
};

export const getUserQuestionAttempts = async (userId: string, questionId?: string): Promise<QuestionAttempt[]> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    let q = query(
      collection(db, 'questionAttempts'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    if (questionId) {
      q = query(q, where('questionId', '==', questionId));
    }

    const querySnapshot = await getDocs(q);
    const attempts: QuestionAttempt[] = [];

    querySnapshot.forEach((doc) => {
      attempts.push({ id: doc.id, ...doc.data() } as QuestionAttempt);
    });

    return attempts;
  } catch (error) {
    console.error('Error getting user question attempts:', error);
    return [];
  }
};

// Bulk operations for seeding questions
export const seedQuestions = async (questions: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const batch = [];
    const timestamp = new Date().toISOString();

    for (const question of questions) {
      const questionRef = doc(collection(db, 'questions'));
      batch.push(setDoc(questionRef, {
        ...question,
        createdAt: timestamp,
        updatedAt: timestamp
      }));
    }

    await Promise.all(batch);
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error;
  }
};

// Search questions
export const searchQuestions = async (searchTerm: string, filters?: {
  category?: string;
  difficulty?: string;
}): Promise<Question[]> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const questions = await getQuestions({
      category: filters?.category,
      difficulty: filters?.difficulty,
      isActive: true
    });

    // Client-side search (in production, consider using Algolia or similar)
    const searchLower = searchTerm.toLowerCase();
    return questions.filter(question => 
      question.question.toLowerCase().includes(searchLower) ||
      question.explanation.toLowerCase().includes(searchLower) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  } catch (error) {
    console.error('Error searching questions:', error);
    return [];
  }
};

// Get questions for a quiz
export const getQuizQuestions = async (quizConfig: {
  category?: string;
  difficulty?: string;
  count: number;
  timeLimit?: number;
}): Promise<Question[]> => {
  if (!db) {
    throw new Error('Firestore not available');
  }

  try {
    const questions = await getRandomQuestions(quizConfig.count, {
      category: quizConfig.category,
      difficulty: quizConfig.difficulty
    });

    // Apply time limit if specified
    if (quizConfig.timeLimit) {
      return questions.map(q => ({
        ...q,
        timeLimit: quizConfig.timeLimit
      }));
    }

    return questions;
  } catch (error) {
    console.error('Error getting quiz questions:', error);
    return [];
  }
};
