/**
 * Comprehensive Firestore service for user data management
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  increment,
  arrayUnion,
  Firestore,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  FirestoreUser,
  UserPreferences,
  LearningSession,
  LearningPlanProgress,
  Badge,
  UserAnalytics,
  FirestoreQuestion,
  UserProgress,
} from '../types/firestore';

// Helper function to check database initialization
const checkDb = (): Firestore => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};
import { firestoreConnectionManager } from './firestore-connection-manager';
// Type definitions for service methods
interface LearningPlanTemplate {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  topics: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  topics: string[];
  difficulty: string;
  estimatedTime: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Section {
  id: string;
  name: string;
  description: string;
  topics: string[];
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class FirestoreService {
  constructor() {
    // Initialize connection manager
    if (db) {
      firestoreConnectionManager.initialize(db);
    }
  }

  // User Management
  async createUser(userData: Partial<FirestoreUser>): Promise<void> {
    return firestoreConnectionManager.executeWithRetry(async () => {
      const userRef = doc(checkDb(), 'users', userData.uid!);
      const userDoc = {
        ...userData,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      };
      await setDoc(userRef, userDoc);
    });
  }

  async getUser(uid: string): Promise<FirestoreUser | null> {
    return firestoreConnectionManager.executeWithRetry(async () => {
      const userRef = doc(checkDb(), 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as FirestoreUser;
      }
      return null;
    });
  }

  async updateUser(
    uid: string,
    updates: Partial<FirestoreUser>
  ): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async updateLastLogin(uid: string): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating last login:', error);
      throw error;
    }
  }

  // User Preferences
  async updateUserPreferences(
    uid: string,
    preferences: Partial<UserPreferences>
  ): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);
      await updateDoc(userRef, {
        preferences: preferences,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  }

  // Progress Tracking
  async saveQuestionProgress(
    uid: string,
    questionData: {
      questionId: string;
      isCorrect: boolean;
      timeSpent: number;
      section: string;
      difficulty: string;
      learningMode: 'guided' | 'free-style';
      planId?: string;
    }
  ): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);

      // Update overall progress
      await updateDoc(userRef, {
        'progress.totalQuestions': increment(1),
        'progress.correctAnswers': increment(questionData.isCorrect ? 1 : 0),
        'progress.totalTimeSpent': increment(questionData.timeSpent),
        'progress.lastActivityAt': serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Update section progress
      const sectionProgressRef = doc(
        checkDb(),
        'users',
        uid,
        'sectionProgress',
        questionData.section
      );
      const sectionSnap = await getDoc(sectionProgressRef);

      if (sectionSnap.exists()) {
        await updateDoc(sectionProgressRef, {
          totalQuestions: increment(1),
          correctAnswers: increment(questionData.isCorrect ? 1 : 0),
          timeSpent: increment(questionData.timeSpent),
          lastPracticedAt: serverTimestamp(),
        });
      } else {
        await setDoc(sectionProgressRef, {
          section: questionData.section,
          totalQuestions: 1,
          correctAnswers: questionData.isCorrect ? 1 : 0,
          timeSpent: questionData.timeSpent,
          accuracy: questionData.isCorrect ? 100 : 0,
          lastPracticedAt: serverTimestamp(),
          masteryLevel: 'beginner',
        });
      }

      // Save learning session
      await this.saveLearningSession(uid, {
        sessionId: `session_${Date.now()}`,
        startTime: new Date().toISOString(),
        endTime: null,
        learningMode: questionData.learningMode,
        planId: questionData.planId,
        questionsAnswered: 1,
        correctAnswers: questionData.isCorrect ? 1 : 0,
        timeSpent: questionData.timeSpent,
        sections: [questionData.section],
        difficulty: [questionData.difficulty],
      });

      // Update weekly and monthly progress
      await this.updateWeeklyProgress(uid, questionData);
      await this.updateMonthlyProgress(uid, questionData);
    } catch (error) {
      console.error('Error saving question progress:', error);
      throw error;
    }
  }

  async saveLearningSession(
    uid: string,
    session: LearningSession
  ): Promise<void> {
    try {
      const sessionRef = doc(
        checkDb(),
        'users',
        uid,
        'learningSessions',
        session.sessionId
      );
      await setDoc(sessionRef, {
        ...session,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving learning session:', error);
      throw error;
    }
  }

  async updateWeeklyProgress(
    uid: string,
    questionData: Record<string, unknown>
  ): Promise<void> {
    try {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      const weekStartStr = weekStart.toISOString().split('T')[0];

      const weeklyRef = doc(
        checkDb(),
        'users',
        uid,
        'weeklyProgress',
        weekStartStr
      );
      const weeklySnap = await getDoc(weeklyRef);

      if (weeklySnap.exists()) {
        await updateDoc(weeklyRef, {
          questionsAnswered: increment(1),
          correctAnswers: increment(questionData.isCorrect ? 1 : 0),
          timeSpent: increment(Number(questionData.timeSpent) || 0),
        });
      } else {
        await setDoc(weeklyRef, {
          weekStart: weekStartStr,
          weekEnd: new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          questionsAnswered: 1,
          correctAnswers: questionData.isCorrect ? 1 : 0,
          timeSpent: questionData.timeSpent,
          accuracy: questionData.isCorrect ? 100 : 0,
        });
      }
    } catch (error) {
      console.error('Error updating weekly progress:', error);
      throw error;
    }
  }

  async updateMonthlyProgress(
    uid: string,
    questionData: Record<string, unknown>
  ): Promise<void> {
    try {
      const now = new Date();
      const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      const monthlyRef = doc(
        checkDb(),
        'users',
        uid,
        'monthlyProgress',
        monthStr
      );
      const monthlySnap = await getDoc(monthlyRef);

      if (monthlySnap.exists()) {
        await updateDoc(monthlyRef, {
          questionsAnswered: increment(1),
          correctAnswers: increment(questionData.isCorrect ? 1 : 0),
          timeSpent: increment(Number(questionData.timeSpent) || 0),
        });
      } else {
        await setDoc(monthlyRef, {
          month: monthStr,
          questionsAnswered: 1,
          correctAnswers: questionData.isCorrect ? 1 : 0,
          timeSpent: questionData.timeSpent,
          accuracy: questionData.isCorrect ? 100 : 0,
          streakDays: 1,
        });
      }
    } catch (error) {
      console.error('Error updating monthly progress:', error);
      throw error;
    }
  }

  // Learning Plans
  async startLearningPlan(
    uid: string,
    planData: LearningPlanProgress
  ): Promise<void> {
    try {
      const planRef = doc(
        checkDb(),
        'users',
        uid,
        'learningPlans',
        planData.planId
      );
      await setDoc(planRef, {
        ...planData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error starting learning plan:', error);
      throw error;
    }
  }

  async updateLearningPlan(
    uid: string,
    planId: string,
    updates: Partial<LearningPlanProgress>
  ): Promise<void> {
    try {
      const planRef = doc(checkDb(), 'users', uid, 'learningPlans', planId);
      await updateDoc(planRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating learning plan:', error);
      throw error;
    }
  }

  async getLearningPlan(
    uid: string,
    planId: string
  ): Promise<LearningPlanProgress | null> {
    try {
      const planRef = doc(checkDb(), 'users', uid, 'learningPlans', planId);
      const planSnap = await getDoc(planRef);

      if (planSnap.exists()) {
        return planSnap.data() as LearningPlanProgress;
      }
      return null;
    } catch (error) {
      console.error('Error getting learning plan:', error);
      throw error;
    }
  }

  // Achievements and Badges
  async addBadge(uid: string, badge: Badge): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);
      await updateDoc(userRef, {
        'achievements.badges': arrayUnion(badge),
        'achievements.totalPoints': increment(
          badge.rarity === 'legendary'
            ? 100
            : badge.rarity === 'epic'
              ? 50
              : badge.rarity === 'rare'
                ? 25
                : 10
        ),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding badge:', error);
      throw error;
    }
  }

  async addMilestone(
    uid: string,
    milestone: Record<string, unknown>
  ): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);
      await updateDoc(userRef, {
        'achievements.milestones': arrayUnion(milestone),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding milestone:', error);
      throw error;
    }
  }

  // Analytics
  async saveUserAnalytics(
    uid: string,
    analytics: UserAnalytics
  ): Promise<void> {
    try {
      const analyticsRef = doc(
        checkDb(),
        'userAnalytics',
        `${uid}_${analytics.date}`
      );
      await setDoc(analyticsRef, {
        ...analytics,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving user analytics:', error);
      throw error;
    }
  }

  // Questions Management
  async saveQuestion(question: FirestoreQuestion): Promise<string> {
    try {
      const questionsRef = collection(checkDb(), 'questions');
      const docRef = await addDoc(questionsRef, {
        ...question,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving question:', error);
      throw error;
    }
  }

  // Learning Plan Templates (Admin)
  async saveLearningPlanTemplate(
    planData: Record<string, unknown>
  ): Promise<string> {
    try {
      const plansRef = collection(checkDb(), 'learningPlanTemplates');
      const docRef = await addDoc(plansRef, {
        ...planData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving learning plan template:', error);
      throw error;
    }
  }

  async updateLearningPlanTemplate(
    planId: string,
    updates: Record<string, unknown>
  ): Promise<void> {
    try {
      const planRef = doc(checkDb(), 'learningPlanTemplates', planId);
      await updateDoc(planRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating learning plan template:', error);
      throw error;
    }
  }

  async getLearningPlanTemplates(): Promise<LearningPlanTemplate[]> {
    if (!db) {
      console.warn('Firestore not available');
      return [];
    }

    try {
      console.log(
        '📋 FirestoreService: Getting all learning plan templates...'
      );
      console.log(
        '📋 FirestoreService: Using project ID:',
        db.app.options.projectId
      );
      const plansRef = collection(checkDb(), 'learningPlanTemplates');
      const q = query(plansRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const plans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('📋 FirestoreService: Found', plans.length, 'plans');
      console.log(
        '📋 FirestoreService: Plan IDs:',
        plans.map(p => p.id)
      );

      // Check specifically for api-integration
      const apiPlan = plans.find(p => p.id === 'api-integration');
      if (apiPlan) {
        console.log(
          '⚠️ FirestoreService: api-integration plan found in list:',
          (apiPlan as LearningPlanTemplate).name
        );
        console.log(
          '⚠️ FirestoreService: api-integration plan data:',
          JSON.stringify(apiPlan, null, 2)
        );
      } else {
        console.log(
          '✅ FirestoreService: api-integration plan NOT found in list'
        );
      }

      return plans as LearningPlanTemplate[];
    } catch (error) {
      console.error('Error getting learning plan templates:', error);
      // Return empty array instead of throwing to prevent app crashes
      return [];
    }
  }

  async getLearningPlanTemplate(
    planId: string
  ): Promise<LearningPlanTemplate | null> {
    if (!db) {
      console.warn('Firestore not available');
      return null;
    }

    try {
      const planRef = doc(checkDb(), 'learningPlanTemplates', planId);
      const planSnap = await getDoc(planRef);

      if (planSnap.exists()) {
        return {
          id: planSnap.id,
          ...planSnap.data(),
        } as LearningPlanTemplate;
      }
      return null;
    } catch (error) {
      console.error('Error getting learning plan template:', error);
      return null;
    }
  }

  async deleteLearningPlanTemplate(planId: string): Promise<void> {
    try {
      console.log('🗑️ FirestoreService: Attempting to delete plan:', planId);
      const planRef = doc(checkDb(), 'learningPlanTemplates', planId);
      console.log('🗑️ FirestoreService: Plan reference created:', planRef.path);

      // Check if document exists before deleting
      const docSnap = await getDoc(planRef);
      if (!docSnap.exists()) {
        console.log(
          '⚠️ FirestoreService: Document does not exist, but continuing with delete'
        );
      } else {
        console.log(
          '✅ FirestoreService: Document exists, proceeding with delete'
        );
      }

      await deleteDoc(planRef);
      console.log('✅ FirestoreService: Successfully deleted plan:', planId);
    } catch (error) {
      console.error(
        '❌ FirestoreService: Error deleting learning plan template:',
        error
      );
      throw error;
    }
  }

  async getQuestionsBySection(
    section: string,
    limitCount: number = 10
  ): Promise<FirestoreQuestion[]> {
    try {
      const questionsRef = collection(checkDb(), 'questions');
      const q = query(
        questionsRef,
        where('section', '==', section),
        where('approved', '==', true),
        orderBy('usageCount', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as FirestoreQuestion);
    } catch (error) {
      console.error('Error getting questions by section:', error);
      throw error;
    }
  }

  // Streak Management
  async updateStreak(uid: string, isNewDay: boolean = false): Promise<void> {
    try {
      const userRef = doc(checkDb(), 'users', uid);

      if (isNewDay) {
        await updateDoc(userRef, {
          'progress.currentStreak': increment(1),
          'progress.longestStreak': increment(1), // This should be calculated properly
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error updating streak:', error);
      throw error;
    }
  }

  // Get user's complete progress summary
  async getUserProgressSummary(uid: string): Promise<UserProgress | null> {
    try {
      const userRef = doc(checkDb(), 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as FirestoreUser;
        return userData.progress;
      }
      return null;
    } catch (error) {
      console.error('Error getting user progress summary:', error);
      throw error;
    }
  }

  // Learning Path Management
  async getLearningPath(pathId: string): Promise<LearningPath | null> {
    if (!db) {
      console.warn('Firestore not available');
      return null;
    }

    try {
      const pathRef = doc(checkDb(), 'learningPaths', pathId);
      const pathSnap = await getDoc(pathRef);

      if (pathSnap.exists()) {
        return {
          id: pathSnap.id,
          ...pathSnap.data(),
        } as LearningPath;
      }
      return null;
    } catch (error) {
      console.error('Error getting learning path:', error);
      return null;
    }
  }

  async updateLearningPath(
    pathId: string,
    data: Partial<LearningPath>
  ): Promise<LearningPath | null> {
    if (!db) {
      console.warn('Firestore not available');
      return null;
    }

    try {
      const pathRef = doc(checkDb(), 'learningPaths', pathId);
      await updateDoc(pathRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      // Return updated data
      const updatedSnap = await getDoc(pathRef);
      if (updatedSnap.exists()) {
        return {
          id: updatedSnap.id,
          ...updatedSnap.data(),
        } as LearningPath;
      }
      return null;
    } catch (error) {
      console.error('Error updating learning path:', error);
      return null;
    }
  }

  async deleteLearningPath(pathId: string): Promise<boolean> {
    if (!db) {
      console.warn('Firestore not available');
      return false;
    }

    try {
      const pathRef = doc(checkDb(), 'learningPaths', pathId);
      await deleteDoc(pathRef);
      return true;
    } catch (error) {
      console.error('Error deleting learning path:', error);
      return false;
    }
  }

  // Section Management
  async getAllSections(): Promise<Section[]> {
    if (!db) {
      console.warn('Firestore not available');
      return [];
    }

    try {
      const sectionsRef = collection(checkDb(), 'sections');
      const q = query(sectionsRef, orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
        updatedAt:
          doc.data().updatedAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
      })) as Section[];
    } catch (error) {
      console.error('Error getting sections:', error);
      return [];
    }
  }

  async createSection(
    sectionData: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Section> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const sectionsRef = collection(checkDb(), 'sections');
      const docRef = await addDoc(sectionsRef, {
        ...sectionData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...sectionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as unknown as Section;
    } catch (error) {
      console.error('Error creating section:', error);
      throw error;
    }
  }

  async updateSection(
    sectionId: string,
    updates: Partial<Section>
  ): Promise<Section | null> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const sectionRef = doc(checkDb(), 'sections', sectionId);
      await updateDoc(sectionRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      // Return updated data
      const updatedSnap = await getDoc(sectionRef);
      if (updatedSnap.exists()) {
        return {
          id: updatedSnap.id,
          ...updatedSnap.data(),
          createdAt:
            updatedSnap.data().createdAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
          updatedAt:
            updatedSnap.data().updatedAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
        } as Section;
      }
      return null;
    } catch (error) {
      console.error('Error updating section:', error);
      throw error;
    }
  }

  async deleteSection(sectionId: string): Promise<void> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const sectionRef = doc(checkDb(), 'sections', sectionId);
      await deleteDoc(sectionRef);
    } catch (error) {
      console.error('Error deleting section:', error);
      throw error;
    }
  }

  // Category Management
  async getAllCategories(): Promise<Category[]> {
    if (!db) {
      console.warn('Firestore not available');
      return [];
    }

    try {
      const categoriesRef = collection(checkDb(), 'categories');
      const q = query(categoriesRef, orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
        updatedAt:
          doc.data().updatedAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
      })) as Category[];
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  async createCategory(
    categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Category> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const categoriesRef = collection(checkDb(), 'categories');
      const docRef = await addDoc(categoriesRef, {
        ...categoryData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...categoryData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async updateCategory(
    categoryId: string,
    updates: Partial<Category>
  ): Promise<Category | null> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const categoryRef = doc(checkDb(), 'categories', categoryId);
      await updateDoc(categoryRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      // Return updated data
      const updatedSnap = await getDoc(categoryRef);
      if (updatedSnap.exists()) {
        return {
          id: updatedSnap.id,
          ...updatedSnap.data(),
          createdAt:
            updatedSnap.data().createdAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
          updatedAt:
            updatedSnap.data().updatedAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    if (!db) {
      throw new Error('Firestore not available');
    }

    try {
      const categoryRef = doc(checkDb(), 'categories', categoryId);
      await deleteDoc(categoryRef);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}

export const firestoreService = new FirestoreService();
