// v1.0 - Unified Firebase Question Schema
// This is the single source of truth for all questions across the website

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
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { AudioCollectionService } from './audio-collection-service';

// Unified Question Interface - Single source of truth
export interface UnifiedQuestion {
  id: string;

  // Basic Question Info
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'text' | 'code' | 'open-ended';

  // Answer Structure
  options: QuestionOption[];
  correctAnswers: string[]; // Array of option IDs for correct answers
  explanation: string;

  // Open-ended Question Fields
  expectedAnswer?: string; // Expected answer for open-ended questions
  aiValidationPrompt?: string; // Custom prompt for AI validation
  acceptPartialCredit?: boolean; // Whether to accept partially correct answers

  // Metadata
  category: string;
  subcategory?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];

  // Learning Path Integration
  learningPath: string; // e.g., 'frontend-basics', 'javascript-deep-dive'
  sectionId?: string; // Links to learning sections

  // Audio Support
  audioQuestion?: string; // Path to question audio file (e.g., '/audio/question.mp3')
  audioAnswer?: string; // Path to answer audio file (e.g., '/audio/answer.mp3')
  showQuestionAudio?: boolean; // Admin control: whether to show question audio button
  showAnswerAudio?: boolean; // Admin control: whether to show answer audio button

  // Scoring & Timing
  points: number;
  timeLimit?: number; // in seconds

  // Status & Management
  isActive: boolean;
  isComplete: boolean; // Whether question structure is complete

  // Timestamps
  createdAt: string;
  updatedAt: string;
  createdBy?: string;

  // Ordering
  order?: number; // For ordering within sections/categories
}

export interface QuestionOption {
  id: string; // 'a', 'b', 'c', 'd', etc.
  text: string;
  isCorrect: boolean;
}

// Learning Path Categories
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

// Question Statistics
export interface QuestionStats {
  totalQuestions: number;
  questionsByCategory: Record<string, number>;
  questionsByDifficulty: Record<string, number>;
  questionsByLearningPath: Record<string, number>;
  averagePoints: number;
  activeQuestions: number;
  incompleteQuestions: number;
}

// Bulk Question Import/Export
export interface BulkQuestionData {
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'text' | 'code' | 'open-ended';
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  category: string;
  subcategory?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  learningPath: string;
  sectionId?: string;
  points: number;
  timeLimit?: number;

  // Audio Support
  audioQuestion?: string; // Path to question audio file (e.g., '/audio/question.mp3')
  audioAnswer?: string; // Path to answer audio file (e.g., '/audio/answer.mp3')
  showQuestionAudio?: boolean; // Admin control: whether to show question audio button
  showAnswerAudio?: boolean; // Admin control: whether to show answer audio button

  // Open-ended Question Fields
  expectedAnswer?: string; // Expected answer for open-ended questions
  aiValidationPrompt?: string; // Custom prompt for AI validation
  acceptPartialCredit?: boolean; // Whether to accept partially correct answers
}

// Question Service Class
export class UnifiedQuestionService {
  private static readonly COLLECTION_NAME = 'unifiedQuestions';
  private static readonly LEARNING_PATHS_COLLECTION = 'learningPaths';
  private static readonly STATS_COLLECTION = 'questionStats';

  /**
   * Create a new question
   */
  static async createQuestion(
    questionData: Omit<UnifiedQuestion, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const timestamp = new Date().toISOString();
      const questionRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...questionData,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      // Create audio mapping for the question
      await this.createAudioMappingForQuestion(
        questionRef.id,
        questionData.learningPath,
        questionData.sectionId || 'questions',
        questionData.audioQuestion,
        questionData.audioAnswer
      );

      // Update learning path question count
      await this.updateLearningPathQuestionCount(questionData.learningPath);

      return questionRef.id;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }

  /**
   * Create audio mapping for a question
   */
  private static async createAudioMappingForQuestion(
    questionId: string,
    learningPath: string,
    sectionId: string,
    questionAudioPath?: string,
    answerAudioPath?: string
  ): Promise<void> {
    try {
      // Get the next question number for this section
      const nextNumberResult =
        await AudioCollectionService.getNextQuestionNumber(
          learningPath,
          sectionId
        );

      if (!nextNumberResult.success) {
        console.warn(
          'Could not get next question number:',
          nextNumberResult.error
        );
        return;
      }

      const questionNumber = nextNumberResult.nextNumber || 1;

      // Create the audio mapping
      const audioResult =
        await AudioCollectionService.createOrUpdateAudioMapping(
          questionId,
          learningPath,
          sectionId,
          questionNumber,
          questionAudioPath,
          answerAudioPath
        );

      if (!audioResult.success) {
        console.warn('Could not create audio mapping:', audioResult.error);
      }
    } catch (error) {
      console.error('Error creating audio mapping:', error);
    }
  }

  /**
   * Get a single question by ID
   */
  static async getQuestion(
    questionId: string
  ): Promise<UnifiedQuestion | null> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const questionRef = doc(db, this.COLLECTION_NAME, questionId);
      const questionSnap = await getDoc(questionRef);

      if (questionSnap.exists()) {
        return {
          id: questionSnap.id,
          ...questionSnap.data(),
        } as UnifiedQuestion;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting question:', error);
      return null;
    }
  }

  /**
   * Get questions with filters
   */
  static async getQuestions(filters?: {
    category?: string;
    subcategory?: string;
    difficulty?: string;
    learningPath?: string;
    sectionId?: string;
    tags?: string[];
    isActive?: boolean;
    isComplete?: boolean;
    limit?: number;
    orderBy?: 'createdAt' | 'updatedAt' | 'order' | 'title';
    orderDirection?: 'asc' | 'desc';
  }): Promise<UnifiedQuestion[]> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      let q = query(collection(db, this.COLLECTION_NAME));

      // Apply filters
      if (filters?.category) {
        q = query(q, where('category', '==', filters.category));
      }

      if (filters?.subcategory) {
        q = query(q, where('subcategory', '==', filters.subcategory));
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

      if (filters?.isComplete !== undefined) {
        q = query(q, where('isComplete', '==', filters.isComplete));
      }

      // Order by
      const orderByField = filters?.orderBy || 'createdAt';
      const orderDirection = filters?.orderDirection || 'desc';
      q = query(q, orderBy(orderByField, orderDirection));

      // Apply limit
      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      const questions: UnifiedQuestion[] = [];

      querySnapshot.forEach(doc => {
        questions.push({ id: doc.id, ...doc.data() } as UnifiedQuestion);
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
  }

  /**
   * Update a question
   */
  static async updateQuestion(
    questionId: string,
    updates: Partial<UnifiedQuestion>
  ): Promise<void> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const questionRef = doc(db, this.COLLECTION_NAME, questionId);
      await updateDoc(questionRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  /**
   * Delete a question
   */
  static async deleteQuestion(questionId: string): Promise<void> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      // Delete the audio mapping first
      await AudioCollectionService.deleteAudioMapping(questionId);

      // Delete the question
      const questionRef = doc(db, this.COLLECTION_NAME, questionId);
      await deleteDoc(questionRef);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }

  /**
   * Bulk import questions
   */
  static async bulkImportQuestions(
    questionsData: BulkQuestionData[]
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    const results = { success: 0, failed: 0, errors: [] as string[] };
    const timestamp = new Date().toISOString();

    for (const questionData of questionsData) {
      try {
        const questionDoc = {
          ...questionData,
          isActive: true,
          isComplete: this.checkQuestionCompleteness(questionData),
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        console.log('Creating question:', {
          title: questionDoc.title,
          isActive: questionDoc.isActive,
          isComplete: questionDoc.isComplete,
          correctAnswers: questionDoc.correctAnswers,
          options: questionDoc.options,
        });

        const questionRef = await addDoc(
          collection(db, this.COLLECTION_NAME),
          questionDoc
        );

        results.success++;

        // Update learning path question count
        await this.updateLearningPathQuestionCount(questionData.learningPath);
      } catch (error) {
        results.failed++;
        results.errors.push(
          `Failed to import question "${questionData.title}": ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    return results;
  }

  /**
   * Get questions for a specific learning path
   */
  static async getQuestionsByLearningPath(
    learningPath: string,
    filters?: {
      difficulty?: string;
      isActive?: boolean;
      limit?: number;
    }
  ): Promise<UnifiedQuestion[]> {
    return this.getQuestions({
      learningPath,
      difficulty: filters?.difficulty,
      isActive: filters?.isActive ?? true,
      limit: filters?.limit,
    });
  }

  /**
   * Get questions for a specific section
   */
  static async getQuestionsBySection(
    sectionId: string,
    filters?: {
      difficulty?: string;
      isActive?: boolean;
      limit?: number;
    }
  ): Promise<UnifiedQuestion[]> {
    return this.getQuestions({
      sectionId,
      difficulty: filters?.difficulty,
      isActive: filters?.isActive ?? true,
      limit: filters?.limit,
    });
  }

  /**
   * Get random questions for quiz
   */
  static async getRandomQuestions(
    count: number,
    filters?: {
      category?: string;
      difficulty?: string;
      learningPath?: string;
      excludeIds?: string[];
    }
  ): Promise<UnifiedQuestion[]> {
    try {
      const allQuestions = await this.getQuestions({
        category: filters?.category,
        difficulty: filters?.difficulty,
        learningPath: filters?.learningPath,
        isActive: true,
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
  }

  /**
   * Search questions
   */
  static async searchQuestions(
    searchTerm: string,
    filters?: {
      category?: string;
      difficulty?: string;
      learningPath?: string;
    }
  ): Promise<UnifiedQuestion[]> {
    try {
      const questions = await this.getQuestions({
        category: filters?.category,
        difficulty: filters?.difficulty,
        learningPath: filters?.learningPath,
        isActive: true,
      });

      // Client-side search (in production, consider using Algolia or similar)
      const searchLower = searchTerm.toLowerCase();
      return questions.filter(
        question =>
          question.title.toLowerCase().includes(searchLower) ||
          question.content.toLowerCase().includes(searchLower) ||
          question.explanation.toLowerCase().includes(searchLower) ||
          question.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    } catch (error) {
      console.error('Error searching questions:', error);
      return [];
    }
  }

  /**
   * Get question statistics
   */
  static async getQuestionStats(): Promise<QuestionStats> {
    try {
      const questions = await this.getQuestions({ isActive: true });

      const stats: QuestionStats = {
        totalQuestions: questions.length,
        questionsByCategory: {},
        questionsByDifficulty: {},
        questionsByLearningPath: {},
        averagePoints: 0,
        activeQuestions: questions.filter(q => q.isActive).length,
        incompleteQuestions: questions.filter(q => !q.isComplete).length,
      };

      let totalPoints = 0;

      questions.forEach(question => {
        // Count by category
        stats.questionsByCategory[question.category] =
          (stats.questionsByCategory[question.category] || 0) + 1;

        // Count by difficulty
        stats.questionsByDifficulty[question.difficulty] =
          (stats.questionsByDifficulty[question.difficulty] || 0) + 1;

        // Count by learning path
        stats.questionsByLearningPath[question.learningPath] =
          (stats.questionsByLearningPath[question.learningPath] || 0) + 1;

        totalPoints += question.points;
      });

      stats.averagePoints =
        questions.length > 0 ? totalPoints / questions.length : 0;

      return stats;
    } catch (error) {
      console.error('Error getting question stats:', error);
      return {
        totalQuestions: 0,
        questionsByCategory: {},
        questionsByDifficulty: {},
        questionsByLearningPath: {},
        averagePoints: 0,
        activeQuestions: 0,
        incompleteQuestions: 0,
      };
    }
  }

  /**
   * Get all learning paths
   */
  static async getLearningPaths(): Promise<LearningPath[]> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const pathsRef = collection(db, this.LEARNING_PATHS_COLLECTION);
      const pathsSnap = await getDocs(pathsRef);

      const paths: LearningPath[] = [];
      pathsSnap.forEach(doc => {
        paths.push({ id: doc.id, ...doc.data() } as LearningPath);
      });

      return paths.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error getting learning paths:', error);
      return [];
    }
  }

  /**
   * Create or update learning path
   */
  static async upsertLearningPath(
    pathData: Omit<
      LearningPath,
      'id' | 'questionCount' | 'createdAt' | 'updatedAt'
    >
  ): Promise<string> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      // Check if learning path already exists
      const existingPaths = await this.getLearningPaths();
      const existingPath = existingPaths.find(
        p => p.name.toLowerCase() === pathData.name.toLowerCase()
      );

      if (existingPath) {
        // Update existing path
        const pathRef = doc(
          db,
          this.LEARNING_PATHS_COLLECTION,
          existingPath.id
        );
        await updateDoc(pathRef, {
          ...pathData,
          updatedAt: new Date().toISOString(),
        });
        return existingPath.id;
      } else {
        // Create new path
        const timestamp = new Date().toISOString();
        const pathRef = await addDoc(
          collection(db, this.LEARNING_PATHS_COLLECTION),
          {
            ...pathData,
            questionCount: 0,
            createdAt: timestamp,
            updatedAt: timestamp,
          }
        );
        return pathRef.id;
      }
    } catch (error) {
      console.error('Error upserting learning path:', error);
      throw error;
    }
  }

  /**
   * Create learning path with specific ID
   */
  static async createLearningPathWithId(pathData: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    isActive: boolean;
  }): Promise<string> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const timestamp = new Date().toISOString();
      const pathRef = doc(db, this.LEARNING_PATHS_COLLECTION, pathData.id);

      await setDoc(pathRef, {
        name: pathData.name,
        description: pathData.description,
        icon: pathData.icon,
        color: pathData.color,
        order: pathData.order,
        isActive: pathData.isActive,
        questionCount: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      return pathData.id;
    } catch (error) {
      console.error('Error creating learning path with ID:', error);
      throw error;
    }
  }

  /**
   * Update learning path question count
   */
  private static async updateLearningPathQuestionCount(
    learningPath: string
  ): Promise<void> {
    try {
      const questions = await this.getQuestionsByLearningPath(learningPath);
      const paths = await this.getLearningPaths();
      const path = paths.find(
        p => p.name.toLowerCase() === learningPath.toLowerCase()
      );

      if (path) {
        const pathRef = doc(db, this.LEARNING_PATHS_COLLECTION, path.id);
        await updateDoc(pathRef, {
          questionCount: questions.length,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error updating learning path question count:', error);
    }
  }

  /**
   * Check if question structure is complete
   */
  private static checkQuestionCompleteness(
    questionData: BulkQuestionData
  ): boolean {
    const hasTitle = questionData.title && questionData.title.trim() !== '';
    const hasContent =
      questionData.content && questionData.content.trim() !== '';
    const hasOptions = questionData.options && questionData.options.length > 0;
    const hasCorrectAnswers =
      questionData.correctAnswers && questionData.correctAnswers.length > 0;
    const hasExplanation =
      questionData.explanation && questionData.explanation.trim() !== '';
    const hasCategory =
      questionData.category && questionData.category.trim() !== '';
    const hasLearningPath =
      questionData.learningPath && questionData.learningPath.trim() !== '';

    return (
      hasTitle &&
      hasContent &&
      hasOptions &&
      hasCorrectAnswers &&
      hasExplanation &&
      hasCategory &&
      hasLearningPath
    );
  }

  /**
   * Export questions for backup
   */
  static async exportQuestions(filters?: {
    category?: string;
    learningPath?: string;
    isActive?: boolean;
  }): Promise<UnifiedQuestion[]> {
    return this.getQuestions(filters);
  }

  /**
   * Initialize default learning paths with static resource IDs
   */
  static async initializeDefaultLearningPaths(): Promise<void> {
    const defaultPaths: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      color: string;
      order: number;
      isActive: boolean;
    }> = [
      {
        id: 'frontend-basics',
        name: 'Frontend Fundamentals',
        description: 'Learn the basics of frontend development',
        icon: '🎨',
        color: '#3B82F6',
        order: 1,
        isActive: true,
      },
      {
        id: 'css-mastery',
        name: 'Advanced CSS Mastery',
        description: 'Master advanced CSS techniques and layouts',
        icon: '🎨',
        color: '#8B5CF6',
        order: 2,
        isActive: true,
      },
      {
        id: 'javascript-deep-dive',
        name: 'JavaScript Deep Dive',
        description: 'Deep understanding of JavaScript concepts',
        icon: '⚡',
        color: '#F59E0B',
        order: 3,
        isActive: true,
      },
      {
        id: 'react-mastery',
        name: 'React Mastery',
        description: 'Master React development patterns',
        icon: '⚛️',
        color: '#10B981',
        order: 4,
        isActive: true,
      },
      {
        id: 'typescript-essentials',
        name: 'TypeScript Essentials',
        description: 'Learn TypeScript for better JavaScript',
        icon: '📘',
        color: '#06B6D4',
        order: 5,
        isActive: true,
      },
      {
        id: 'testing-strategies',
        name: 'Testing Strategies',
        description: 'Learn testing methodologies and tools',
        icon: '🧪',
        color: '#EF4444',
        order: 6,
        isActive: true,
      },
      {
        id: 'performance-optimization',
        name: 'Performance Optimization',
        description: 'Optimize frontend performance',
        icon: '🚀',
        color: '#F97316',
        order: 7,
        isActive: true,
      },
      {
        id: 'security-essentials',
        name: 'Security Essentials',
        description: 'Frontend security best practices',
        icon: '🔒',
        color: '#DC2626',
        order: 8,
        isActive: true,
      },
      {
        id: 'frontend-system-design',
        name: 'Frontend System Design',
        description: 'Design scalable frontend architectures',
        icon: '🏗️',
        color: '#7C3AED',
        order: 9,
        isActive: true,
      },
      {
        id: 'build-tools-devops',
        name: 'Build Tools & DevOps',
        description: 'Modern build tools and deployment',
        icon: '⚙️',
        color: '#059669',
        order: 10,
        isActive: true,
      },
      {
        id: 'api-integration',
        name: 'API Integration & Communication',
        description: 'Working with APIs and data fetching',
        icon: '🔌',
        color: '#0891B2',
        order: 11,
        isActive: true,
      },
      {
        id: 'ai-tools-frontend',
        name: 'AI Tools for Frontend',
        description: 'Leverage AI tools in frontend development',
        icon: '🤖',
        color: '#7C2D12',
        order: 12,
        isActive: true,
      },
      {
        id: 'frontend-interview-prep',
        name: 'Frontend Interview Prep',
        description: 'Prepare for frontend interviews',
        icon: '💼',
        color: '#1D4ED8',
        order: 13,
        isActive: true,
      },
      {
        id: 'advanced-frontend-architectures',
        name: 'Advanced Frontend Architectures',
        description: 'Advanced architectural patterns',
        icon: '🏛️',
        color: '#BE185D',
        order: 14,
        isActive: true,
      },
      {
        id: 'javascript-practice',
        name: 'JavaScript Practice & Interview Prep',
        description: 'Practice JavaScript for interviews',
        icon: '📝',
        color: '#F59E0B',
        order: 15,
        isActive: true,
      },
      {
        id: 'css-practice',
        name: 'CSS Practice & Layout Mastery',
        description: 'Master CSS layouts and styling',
        icon: '🎨',
        color: '#8B5CF6',
        order: 16,
        isActive: true,
      },
      {
        id: 'html-practice',
        name: 'HTML Practice & Semantic Mastery',
        description: 'Master HTML semantics and structure',
        icon: '📄',
        color: '#059669',
        order: 17,
        isActive: true,
      },
      {
        id: 'react-practice',
        name: 'React Practice & Advanced Patterns',
        description: 'Advanced React patterns and practices',
        icon: '⚛️',
        color: '#10B981',
        order: 18,
        isActive: true,
      },
      {
        id: 'comprehensive-interview-prep',
        name: 'Comprehensive Interview Preparation',
        description: 'Complete interview preparation',
        icon: '🎯',
        color: '#DC2626',
        order: 19,
        isActive: true,
      },
      {
        id: 'improve-english',
        name: 'Improve Your English',
        description: 'English language learning for developers',
        icon: '🌍',
        color: '#7C3AED',
        order: 20,
        isActive: true,
      },
    ];

    for (const pathData of defaultPaths) {
      try {
        await this.createLearningPathWithId(pathData);
      } catch (error) {
        console.error(
          `Failed to initialize learning path "${pathData.name}":`,
          error
        );
      }
    }
  }
}

// Export types and service
export default UnifiedQuestionService;
