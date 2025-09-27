// v1.0 - Guided Learning Service
// Handles guided learning plans, progress tracking, and user activities

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';

// Enhanced Learning Plan Template Interface
export interface LearningPlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  completionRate?: number;
  enrolledUsers?: number;
}

export interface LearningSection {
  id: string;
  name: string;
  category: string;
  questions: string[]; // Question IDs
  weight: number;
  order: number;
  description?: string;
}

export interface UserPlanProgress {
  planId: string;
  userId: string;
  currentDay: number;
  currentSection: number;
  completedQuestions: string[];
  scores: Record<string, number>; // questionId -> score
  sectionProgress: Record<
    string,
    {
      completed: number;
      total: number;
      averageScore: number;
    }
  >;
  overallProgress: number;
  totalScore: number;
  averageScore: number;
  startDate: Date;
  lastActivity: Date;
  isCompleted: boolean;
  completionDate?: Date;
  currentSession?: {
    startTime: Date;
    questionsAnswered: number;
    correctAnswers: number;
    sessionScore: number;
  };
}

export interface UserActivity {
  id: string;
  userId: string;
  type:
    | 'question_answered'
    | 'plan_completed'
    | 'streak_milestone'
    | 'badge_earned'
    | 'session_started'
    | 'session_completed'
    | 'plan_started';
  title: string;
  description: string;
  timestamp: Date;
  points?: number;
  metadata?: Record<string, unknown>;
  planId?: string;
  questionId?: string;
}

export interface UserStats {
  userId: string;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // in minutes
  badgesEarned: number;
  plansCompleted: number;
  weeklyProgress: number[];
  monthlyProgress: number[];
  skillLevels: Record<string, number>;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'performance' | 'social';
  criteria: {
    type:
      | 'questions_answered'
      | 'streak_days'
      | 'plan_completed'
      | 'score_achieved'
      | 'time_studied';
    target: number;
    timeframe?: 'daily' | 'weekly' | 'monthly' | 'all_time';
  };
  points: number;
  isActive: boolean;
  createdAt: Date;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedDate: Date;
  progress?: number;
  maxProgress?: number;
  isEarned: boolean;
}

export class GuidedLearningService {
  private static instance: GuidedLearningService;
  private readonly COLLECTIONS = {
    PLANS: 'learningPlanTemplates',
    USER_PROGRESS: 'userPlanProgress',
    USER_ACTIVITIES: 'userActivities',
    USER_STATS: 'userStats',
    ACHIEVEMENTS: 'achievements',
    USER_ACHIEVEMENTS: 'userAchievements',
  };

  public static getInstance(): GuidedLearningService {
    if (!GuidedLearningService.instance) {
      GuidedLearningService.instance = new GuidedLearningService();
    }
    return GuidedLearningService.instance;
  }

  // Learning Plans Management
  async createPlan(
    planData: Omit<LearningPlanTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const planRef = await addDoc(collection(db, this.COLLECTIONS.PLANS), {
        ...planData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return planRef.id;
    } catch (error) {
      console.error('Error creating learning plan:', error);
      throw new Error('Failed to create learning plan');
    }
  }

  async createOrUpdatePlan(
    planId: string,
    planData: Omit<LearningPlanTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    try {
      const planRef = doc(db, this.COLLECTIONS.PLANS, planId);
      await setDoc(planRef, {
        ...planData,
        updatedAt: Timestamp.now(),
      }, { merge: true });
    } catch (error) {
      console.error('Error creating/updating learning plan:', error);
      throw new Error('Failed to create/update learning plan');
    }
  }

  async updatePlan(
    planId: string,
    updates: Partial<LearningPlanTemplate>
  ): Promise<void> {
    try {
      const planRef = doc(db, this.COLLECTIONS.PLANS, planId);
      await updateDoc(planRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating learning plan:', error);
      throw new Error('Failed to update learning plan');
    }
  }

  async getPlan(planId: string): Promise<LearningPlanTemplate | null> {
    try {
      const planRef = doc(db, this.COLLECTIONS.PLANS, planId);
      const planSnap = await getDoc(planRef);

      if (planSnap.exists()) {
        const data = planSnap.data();
        return {
          id: planSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        } as LearningPlanTemplate;
      }
      return null;
    } catch (error) {
      console.error('Error getting learning plan:', error);
      throw new Error('Failed to get learning plan');
    }
  }

  async getAllPlans(): Promise<LearningPlanTemplate[]> {
    try {
      const plansQuery = query(
        collection(db, this.COLLECTIONS.PLANS),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );

      const plansSnap = await getDocs(plansQuery);
      return plansSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        } as LearningPlanTemplate;
      });
    } catch (error) {
      console.error('Error getting all learning plans:', error);
      throw new Error('Failed to get learning plans');
    }
  }

  // User Progress Management
  async startPlan(userId: string, planId: string): Promise<void> {
    try {
      const plan = await this.getPlan(planId);
      if (!plan) throw new Error('Plan not found');

      const progressRef = doc(
        db,
        this.COLLECTIONS.USER_PROGRESS,
        `${userId}_${planId}`
      );

      // Initialize user progress
      const initialProgress: Omit<UserPlanProgress, 'planId' | 'userId'> = {
        currentDay: 1,
        currentSection: 0,
        completedQuestions: [],
        scores: {},
        sectionProgress: plan.sections.reduce(
          (acc, section) => {
            acc[section.category] = {
              completed: 0,
              total: section.questions.length,
              averageScore: 0,
            };
            return acc;
          },
          {} as Record<
            string,
            { completed: number; total: number; averageScore: number }
          >
        ),
        overallProgress: 0,
        totalScore: 0,
        averageScore: 0,
        startDate: new Date(),
        lastActivity: new Date(),
        isCompleted: false,
        currentSession: {
          startTime: new Date(),
          questionsAnswered: 0,
          correctAnswers: 0,
          sessionScore: 0,
        },
      };

      await setDoc(progressRef, {
        planId,
        userId,
        ...initialProgress,
        startDate: Timestamp.now(),
        lastActivity: Timestamp.now(),
        'currentSession.startTime': Timestamp.now(),
      });

      // Log activity
      await this.logActivity(userId, {
        type: 'plan_started',
        title: `Started ${plan.name}`,
        description: `Began the ${plan.name} learning plan`,
        planId,
      });

      // Update user stats
      await this.updateUserStats(userId, {
        lastActivity: new Date(),
      });
    } catch (error) {
      console.error('Error starting plan:', error);
      throw new Error('Failed to start learning plan');
    }
  }

  async submitAnswer(
    userId: string,
    planId: string,
    questionId: string,
    score: number,
    timeSpent: number,
    isCorrect: boolean
  ): Promise<void> {
    try {
      const progressRef = doc(
        db,
        this.COLLECTIONS.USER_PROGRESS,
        `${userId}_${planId}`
      );
      const progressSnap = await getDoc(progressRef);

      if (!progressSnap.exists()) {
        throw new Error('User progress not found');
      }

      const progress = progressSnap.data() as UserPlanProgress;
      const plan = await this.getPlan(planId);
      if (!plan) throw new Error('Plan not found');

      // Find the section containing this question
      const section = plan.sections.find(s => s.questions.includes(questionId));
      if (!section) throw new Error('Question section not found');

      // Update progress
      const updatedScores = { ...progress.scores, [questionId]: score };
      const updatedCompletedQuestions = [
        ...progress.completedQuestions,
        questionId,
      ];

      // Calculate section progress
      const sectionProgress = { ...progress.sectionProgress };
      sectionProgress[section.category] = {
        completed: sectionProgress[section.category].completed + 1,
        total: sectionProgress[section.category].total,
        averageScore: this.calculateSectionAverageScore(
          sectionProgress[section.category].averageScore,
          sectionProgress[section.category].completed,
          score
        ),
      };

      // Calculate overall progress
      const totalQuestions = plan.totalQuestions;
      const completedQuestions = updatedCompletedQuestions.length;
      const overallProgress = (completedQuestions / totalQuestions) * 100;

      // Calculate total and average scores
      const totalScore = Object.values(updatedScores).reduce(
        (sum, s) => sum + s,
        0
      );
      const averageScore = totalScore / completedQuestions;

      // Update current session
      const currentSession = progress.currentSession || {
        startTime: new Date(),
        questionsAnswered: 0,
        correctAnswers: 0,
        sessionScore: 0,
      };

      const updatedSession = {
        ...currentSession,
        questionsAnswered: currentSession.questionsAnswered + 1,
        correctAnswers: currentSession.correctAnswers + (isCorrect ? 1 : 0),
        sessionScore: currentSession.sessionScore + score,
      };

      // Check if plan is completed
      const isCompleted = completedQuestions >= totalQuestions;
      const completionDate = isCompleted ? new Date() : undefined;

      // Update progress document
      await updateDoc(progressRef, {
        completedQuestions: updatedCompletedQuestions,
        scores: updatedScores,
        sectionProgress,
        overallProgress,
        totalScore,
        averageScore,
        lastActivity: Timestamp.now(),
        currentSession: {
          ...updatedSession,
          startTime: Timestamp.fromDate(updatedSession.startTime),
        },
        ...(isCompleted && {
          isCompleted: true,
          completionDate: Timestamp.fromDate(completionDate!),
        }),
      });

      // Log activity
      await this.logActivity(userId, {
        type: 'question_answered',
        title: 'Answered question',
        description: `Answered a ${section.name} question ${isCorrect ? 'correctly' : 'incorrectly'}`,
        points: score,
        planId,
        questionId,
        metadata: {
          isCorrect,
          timeSpent,
          section: section.name,
        },
      });

      // Update user stats
      await this.updateUserStats(userId, {
        totalQuestionsAnswered: increment(1),
        totalCorrectAnswers: increment(isCorrect ? 1 : 0),
        totalStudyTime: increment(Math.round(timeSpent / 60)), // Convert to minutes
        lastActivity: new Date(),
      });

      // Check for plan completion
      if (isCompleted) {
        await this.completePlan(userId, planId);
      }

      // Check for achievements
      await this.checkAchievements(userId);
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw new Error('Failed to submit answer');
    }
  }

  async completePlan(userId: string, planId: string): Promise<void> {
    try {
      const progressRef = doc(
        db,
        this.COLLECTIONS.USER_PROGRESS,
        `${userId}_${planId}`
      );
      const progressSnap = await getDoc(progressRef);

      if (!progressSnap.exists()) {
        throw new Error('User progress not found');
      }

      const progress = progressSnap.data() as UserPlanProgress;
      const plan = await this.getPlan(planId);
      if (!plan) throw new Error('Plan not found');

      // Log activity
      await this.logActivity(userId, {
        type: 'plan_completed',
        title: `Completed ${plan.name}`,
        description: `Finished the ${plan.name} with ${progress.averageScore}% average score`,
        points: Math.round(progress.averageScore * 2), // Bonus points based on performance
        planId,
        metadata: {
          averageScore: progress.averageScore,
          totalQuestions: progress.completedQuestions.length,
          timeSpent: Date.now() - progress.startDate.getTime(),
        },
      });

      // Update user stats
      await this.updateUserStats(userId, {
        plansCompleted: increment(1),
        lastActivity: new Date(),
      });

      // Update completion rate for the plan
      await this.updatePlanCompletionRate(planId);
    } catch (error) {
      console.error('Error completing plan:', error);
      throw new Error('Failed to complete plan');
    }
  }

  async getUserProgress(
    userId: string,
    planId: string
  ): Promise<UserPlanProgress | null> {
    try {
      const progressRef = doc(
        db,
        this.COLLECTIONS.USER_PROGRESS,
        `${userId}_${planId}`
      );
      const progressSnap = await getDoc(progressRef);

      if (progressSnap.exists()) {
        const data = progressSnap.data();
        return {
          ...data,
          startDate: data.startDate?.toDate() || new Date(),
          lastActivity: data.lastActivity?.toDate() || new Date(),
          completionDate: data.completionDate?.toDate(),
          currentSession: data.currentSession
            ? {
                ...data.currentSession,
                startTime:
                  data.currentSession.startTime?.toDate() || new Date(),
              }
            : undefined,
        } as UserPlanProgress;
      }
      return null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw new Error('Failed to get user progress');
    }
  }

  async getAllUserProgress(userId: string): Promise<UserPlanProgress[]> {
    try {
      const progressQuery = query(
        collection(db, this.COLLECTIONS.USER_PROGRESS),
        where('userId', '==', userId),
        orderBy('startDate', 'desc')
      );

      const progressSnap = await getDocs(progressQuery);
      return progressSnap.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          startDate: data.startDate?.toDate() || new Date(),
          lastActivity: data.lastActivity?.toDate() || new Date(),
          completionDate: data.completionDate?.toDate(),
          currentSession: data.currentSession
            ? {
                ...data.currentSession,
                startTime:
                  data.currentSession.startTime?.toDate() || new Date(),
              }
            : undefined,
        } as UserPlanProgress;
      });
    } catch (error) {
      console.error('Error getting all user progress:', error);
      throw new Error('Failed to get user progress');
    }
  }

  // User Stats Management
  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      const statsRef = doc(db, this.COLLECTIONS.USER_STATS, userId);
      const statsSnap = await getDoc(statsRef);

      if (statsSnap.exists()) {
        const data = statsSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastActivity: data.lastActivity?.toDate() || new Date(),
        } as UserStats;
      }
      return null;
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw new Error('Failed to get user stats');
    }
  }

  async updateUserStats(
    userId: string,
    updates: Partial<UserStats>
  ): Promise<void> {
    try {
      const statsRef = doc(db, this.COLLECTIONS.USER_STATS, userId);
      const statsSnap = await getDoc(statsRef);

      if (statsSnap.exists()) {
        await updateDoc(statsRef, {
          ...updates,
          updatedAt: Timestamp.now(),
        });
      } else {
        // Create initial user stats
        const initialStats: Omit<UserStats, 'userId'> = {
          totalQuestionsAnswered: 0,
          totalCorrectAnswers: 0,
          averageScore: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalStudyTime: 0,
          badgesEarned: 0,
          plansCompleted: 0,
          weeklyProgress: [],
          monthlyProgress: [],
          skillLevels: {},
          lastActivity: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(statsRef, {
          userId,
          ...initialStats,
          ...updates,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          lastActivity: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw new Error('Failed to update user stats');
    }
  }

  // Activity Logging
  async logActivity(
    userId: string,
    activity: Omit<UserActivity, 'id' | 'userId' | 'timestamp'>
  ): Promise<void> {
    try {
      await addDoc(collection(db, this.COLLECTIONS.USER_ACTIVITIES), {
        userId,
        ...activity,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error logging activity:', error);
      throw new Error('Failed to log activity');
    }
  }

  async getUserActivities(
    userId: string,
    limitCount: number = 50
  ): Promise<UserActivity[]> {
    try {
      const activitiesQuery = query(
        collection(db, this.COLLECTIONS.USER_ACTIVITIES),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const activitiesSnap = await getDocs(activitiesQuery);
      return activitiesSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
        } as UserActivity;
      });
    } catch (error) {
      console.error('Error getting user activities:', error);
      throw new Error('Failed to get user activities');
    }
  }

  // Helper Methods
  private calculateSectionAverageScore(
    currentAverage: number,
    currentCount: number,
    newScore: number
  ): number {
    const totalScore = currentAverage * currentCount + newScore;
    return Math.round(totalScore / (currentCount + 1));
  }

  private async updatePlanCompletionRate(planId: string): Promise<void> {
    try {
      // This would update the plan's completion rate
      // Implementation depends on your specific requirements
      console.log(`Updating completion rate for plan ${planId}`);
    } catch (error) {
      console.error('Error updating plan completion rate:', error);
    }
  }

  private async checkAchievements(userId: string): Promise<void> {
    try {
      // This would check for new achievements based on user stats
      // Implementation depends on your specific achievement system
      console.log(`Checking achievements for user ${userId}`);
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }
}

// Export singleton instance
export const guidedLearningService = GuidedLearningService.getInstance();
