/**
 * User Analytics Service
 * Handles user learning progress tracking, analytics, and insights
 */

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  serverTimestamp,
  Timestamp,
  getDoc,
} from 'firebase/firestore';

export interface UserProgress {
  id: string;
  userId: string;
  userEmail: string;
  contentType:
    | 'cards'
    | 'plans'
    | 'categories'
    | 'topics'
    | 'questions'
    | 'frontend-tasks'
    | 'problem-solving';
  contentId: string;
  contentName: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
  progress: number; // 0-100
  timeSpent: number; // in minutes
  attempts: number;
  lastAccessed: Timestamp;
  completedAt?: Timestamp;
  score?: number; // for questions/tasks
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  metadata: {
    learningPath?: string;
    sessionId?: string;
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    notes?: string;
  };
}

export interface LearningSession {
  id: string;
  userId: string;
  userEmail: string;
  sessionType: 'guided' | 'freestyle' | 'interview' | 'practice';
  startTime: Timestamp;
  endTime?: Timestamp;
  duration: number; // in minutes
  contentCompleted: string[]; // content IDs
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
  learningPath?: string;
  metadata: {
    deviceType?: string;
    userAgent?: string;
    ipAddress?: string;
  };
}

export interface UserAnalytics {
  userId: string;
  userEmail: string;
  totalSessions: number;
  totalTimeSpent: number; // in minutes
  totalQuestionsAnswered: number;
  correctAnswers: number;
  averageScore: number;
  learningStreak: number; // consecutive days
  lastActiveDate: Timestamp;
  preferredContentTypes: Record<string, number>;
  difficultyProgress: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  achievements: string[];
  learningGoals: {
    dailyGoal: number; // minutes
    weeklyGoal: number; // minutes
    monthlyGoal: number; // minutes
  };
  progressHistory: Array<{
    date: string;
    timeSpent: number;
    questionsAnswered: number;
    score: number;
  }>;
}

export interface LearningInsights {
  userId: string;
  insights: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    learningPatterns: {
      mostActiveTime: string;
      preferredDifficulty: string;
      averageSessionLength: number;
      completionRate: number;
    };
    progressTrends: {
      isImproving: boolean;
      improvementRate: number;
      consistencyScore: number;
    };
  };
  generatedAt: Timestamp;
}

export interface SystemAnalytics {
  totalUsers: number;
  activeUsers: number; // last 30 days
  totalSessions: number;
  totalTimeSpent: number;
  averageSessionLength: number;
  completionRates: Record<string, number>;
  popularContent: Array<{
    contentId: string;
    contentType: string;
    name: string;
    completionCount: number;
    averageScore: number;
  }>;
  userEngagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    retentionRate: number;
  };
  learningPathAnalytics: Array<{
    pathName: string;
    enrolledUsers: number;
    completionRate: number;
    averageTimeToComplete: number;
  }>;
}

class UserAnalyticsService {
  private readonly PROGRESS_COLLECTION = 'user_progress';
  private readonly SESSIONS_COLLECTION = 'learning_sessions';
  private readonly ANALYTICS_COLLECTION = 'user_analytics';
  private readonly INSIGHTS_COLLECTION = 'learning_insights';

  /**
   * Track user progress on content
   */
  async trackProgress(
    userId: string,
    userEmail: string,
    contentType:
      | 'cards'
      | 'plans'
      | 'categories'
      | 'topics'
      | 'questions'
      | 'frontend-tasks'
      | 'problem-solving',
    contentId: string,
    contentName: string,
    status: 'not-started' | 'in-progress' | 'completed' | 'skipped',
    progress: number,
    timeSpent: number,
    score?: number,
    metadata?: any
  ): Promise<string> {
    try {
      // Check if progress already exists
      const existingProgress = await this.getUserProgress(userId, contentId);

      const progressData: Omit<UserProgress, 'id'> = {
        userId,
        userEmail,
        contentType,
        contentId,
        contentName,
        status,
        progress: Math.min(100, Math.max(0, progress)),
        timeSpent: timeSpent + (existingProgress?.timeSpent || 0),
        attempts: (existingProgress?.attempts || 0) + 1,
        lastAccessed: serverTimestamp() as Timestamp,
        completedAt:
          status === 'completed'
            ? (serverTimestamp() as Timestamp)
            : existingProgress?.completedAt,
        score,
        difficulty: metadata?.difficulty,
        metadata: {
          ...existingProgress?.metadata,
          ...metadata,
          lastUpdated: new Date().toISOString(),
        },
      };

      if (existingProgress) {
        // Update existing progress
        await updateDoc(
          doc(db, this.PROGRESS_COLLECTION, existingProgress.id),
          progressData
        );
        return existingProgress.id;
      } else {
        // Create new progress
        const docRef = await addDoc(
          collection(db, this.PROGRESS_COLLECTION),
          progressData
        );
        return docRef.id;
      }
    } catch (error) {
      console.error('Error tracking progress:', error);
      throw new Error(`Failed to track progress: ${error}`);
    }
  }

  /**
   * Start a learning session
   */
  async startSession(
    userId: string,
    userEmail: string,
    sessionType: 'guided' | 'freestyle' | 'interview' | 'practice',
    learningPath?: string,
    metadata?: any
  ): Promise<string> {
    try {
      const sessionData: Omit<LearningSession, 'id'> = {
        userId,
        userEmail,
        sessionType,
        startTime: serverTimestamp() as Timestamp,
        duration: 0,
        contentCompleted: [],
        totalQuestions: 0,
        correctAnswers: 0,
        averageScore: 0,
        learningPath,
        metadata: {
          deviceType: metadata?.deviceType,
          userAgent: metadata?.userAgent,
          ipAddress: metadata?.ipAddress,
        },
      };

      const docRef = await addDoc(
        collection(db, this.SESSIONS_COLLECTION),
        sessionData
      );
      return docRef.id;
    } catch (error) {
      console.error('Error starting session:', error);
      throw new Error(`Failed to start session: ${error}`);
    }
  }

  /**
   * End a learning session
   */
  async endSession(
    sessionId: string,
    contentCompleted: string[],
    totalQuestions: number,
    correctAnswers: number,
    averageScore: number
  ): Promise<void> {
    try {
      const sessionRef = doc(db, this.SESSIONS_COLLECTION, sessionId);
      const sessionDoc = await getDoc(sessionRef);

      if (!sessionDoc.exists()) {
        throw new Error('Session not found');
      }

      const sessionData = sessionDoc.data();
      const startTime = sessionData.startTime.toDate();
      const endTime = new Date();
      const duration = Math.round(
        (endTime.getTime() - startTime.getTime()) / (1000 * 60)
      ); // minutes

      await updateDoc(sessionRef, {
        endTime: serverTimestamp(),
        duration,
        contentCompleted,
        totalQuestions,
        correctAnswers,
        averageScore,
      });
    } catch (error) {
      console.error('Error ending session:', error);
      throw new Error(`Failed to end session: ${error}`);
    }
  }

  /**
   * Get user progress for specific content
   */
  async getUserProgress(
    userId: string,
    contentId: string
  ): Promise<UserProgress | null> {
    try {
      const q = query(
        collection(db, this.PROGRESS_COLLECTION),
        where('userId', '==', userId),
        where('contentId', '==', contentId),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as UserProgress;
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw new Error(`Failed to get user progress: ${error}`);
    }
  }

  /**
   * Get all user progress
   */
  async getAllUserProgress(userId: string): Promise<UserProgress[]> {
    try {
      const q = query(
        collection(db, this.PROGRESS_COLLECTION),
        where('userId', '==', userId),
        orderBy('lastAccessed', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as UserProgress
      );
    } catch (error) {
      console.error('Error getting all user progress:', error);
      throw new Error(`Failed to get user progress: ${error}`);
    }
  }

  /**
   * Get user analytics
   */
  async getUserAnalytics(userId: string): Promise<UserAnalytics | null> {
    try {
      const q = query(
        collection(db, this.ANALYTICS_COLLECTION),
        where('userId', '==', userId),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return {
        ...doc.data(),
      } as UserAnalytics;
    } catch (error) {
      console.error('Error getting user analytics:', error);
      throw new Error(`Failed to get user analytics: ${error}`);
    }
  }

  /**
   * Generate user analytics from progress data
   */
  async generateUserAnalytics(userId: string): Promise<UserAnalytics> {
    try {
      const [progressData, sessionsData] = await Promise.all([
        this.getAllUserProgress(userId),
        this.getUserSessions(userId),
      ]);

      const userEmail =
        progressData[0]?.userEmail || sessionsData[0]?.userEmail || '';

      // Calculate analytics
      const totalSessions = sessionsData.length;
      const totalTimeSpent = sessionsData.reduce(
        (sum, session) => sum + session.duration,
        0
      );
      const totalQuestionsAnswered = sessionsData.reduce(
        (sum, session) => sum + session.totalQuestions,
        0
      );
      const correctAnswers = sessionsData.reduce(
        (sum, session) => sum + session.correctAnswers,
        0
      );
      const averageScore =
        totalQuestionsAnswered > 0
          ? (correctAnswers / totalQuestionsAnswered) * 100
          : 0;

      // Calculate learning streak
      const learningStreak = this.calculateLearningStreak(sessionsData);

      // Calculate preferred content types
      const preferredContentTypes = progressData.reduce(
        (acc, progress) => {
          acc[progress.contentType] = (acc[progress.contentType] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Calculate difficulty progress
      const difficultyProgress = progressData.reduce(
        (acc, progress) => {
          if (progress.difficulty) {
            acc[progress.difficulty] = (acc[progress.difficulty] || 0) + 1;
          }
          return acc;
        },
        { beginner: 0, intermediate: 0, advanced: 0 } as Record<string, number>
      );

      // Generate progress history (last 30 days)
      const progressHistory = this.generateProgressHistory(sessionsData);

      const analytics: UserAnalytics = {
        userId,
        userEmail,
        totalSessions,
        totalTimeSpent,
        totalQuestionsAnswered,
        correctAnswers,
        averageScore,
        learningStreak,
        lastActiveDate:
          sessionsData[0]?.endTime ||
          sessionsData[0]?.startTime ||
          (new Date() as any),
        preferredContentTypes,
        difficultyProgress,
        achievements: this.calculateAchievements(progressData, sessionsData),
        learningGoals: {
          dailyGoal: 30,
          weeklyGoal: 210,
          monthlyGoal: 900,
        },
        progressHistory,
      };

      // Save analytics
      await this.saveUserAnalytics(analytics);

      return analytics;
    } catch (error) {
      console.error('Error generating user analytics:', error);
      throw new Error(`Failed to generate user analytics: ${error}`);
    }
  }

  /**
   * Generate learning insights
   */
  async generateLearningInsights(userId: string): Promise<LearningInsights> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      if (!analytics) {
        throw new Error('User analytics not found');
      }

      const insights = {
        strengths: this.identifyStrengths(analytics),
        weaknesses: this.identifyWeaknesses(analytics),
        recommendations: this.generateRecommendations(analytics),
        learningPatterns: this.analyzeLearningPatterns(analytics),
        progressTrends: this.analyzeProgressTrends(analytics),
      };

      const learningInsights: LearningInsights = {
        userId,
        insights,
        generatedAt: serverTimestamp() as Timestamp,
      };

      // Save insights
      await addDoc(collection(db, this.INSIGHTS_COLLECTION), learningInsights);

      return learningInsights;
    } catch (error) {
      console.error('Error generating learning insights:', error);
      throw new Error(`Failed to generate learning insights: ${error}`);
    }
  }

  /**
   * Get system-wide analytics
   */
  async getSystemAnalytics(): Promise<SystemAnalytics> {
    try {
      // This would typically involve complex aggregations
      // For now, return a mock structure
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalSessions: 0,
        totalTimeSpent: 0,
        averageSessionLength: 0,
        completionRates: {},
        popularContent: [],
        userEngagement: {
          dailyActiveUsers: 0,
          weeklyActiveUsers: 0,
          monthlyActiveUsers: 0,
          retentionRate: 0,
        },
        learningPathAnalytics: [],
      };
    } catch (error) {
      console.error('Error getting system analytics:', error);
      throw new Error(`Failed to get system analytics: ${error}`);
    }
  }

  /**
   * Private helper methods
   */
  private async getUserSessions(userId: string): Promise<LearningSession[]> {
    const q = query(
      collection(db, this.SESSIONS_COLLECTION),
      where('userId', '==', userId),
      orderBy('startTime', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as LearningSession
    );
  }

  private calculateLearningStreak(sessions: LearningSession[]): number {
    // Simplified streak calculation
    return sessions.length > 0 ? Math.min(sessions.length, 30) : 0;
  }

  private generateProgressHistory(sessions: LearningSession[]): Array<{
    date: string;
    timeSpent: number;
    questionsAnswered: number;
    score: number;
  }> {
    const history: Array<{
      date: string;
      timeSpent: number;
      questionsAnswered: number;
      score: number;
    }> = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const daySessions = sessions.filter(session => {
        const sessionDate = session.startTime.toDate
          ? session.startTime.toDate().toISOString().split('T')[0]
          : new Date(session.startTime).toISOString().split('T')[0];
        return sessionDate === dateStr;
      });

      history.push({
        date: dateStr,
        timeSpent: daySessions.reduce(
          (sum, session) => sum + session.duration,
          0
        ),
        questionsAnswered: daySessions.reduce(
          (sum, session) => sum + session.totalQuestions,
          0
        ),
        score:
          daySessions.length > 0
            ? daySessions.reduce(
                (sum, session) => sum + session.averageScore,
                0
              ) / daySessions.length
            : 0,
      });
    }

    return history;
  }

  private calculateAchievements(
    progress: UserProgress[],
    sessions: LearningSession[]
  ): string[] {
    const achievements: string[] = [];

    if (sessions.length >= 1) achievements.push('First Session');
    if (sessions.length >= 10) achievements.push('Dedicated Learner');
    if (sessions.length >= 50) achievements.push('Learning Champion');

    const completedContent = progress.filter(
      p => p.status === 'completed'
    ).length;
    if (completedContent >= 5) achievements.push('Content Master');
    if (completedContent >= 25) achievements.push('Knowledge Seeker');

    const totalTime = sessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    if (totalTime >= 60) achievements.push('Hour of Learning');
    if (totalTime >= 300) achievements.push('Learning Marathon');

    return achievements;
  }

  private identifyStrengths(analytics: UserAnalytics): string[] {
    const strengths: string[] = [];

    if (analytics.averageScore >= 80)
      strengths.push('High accuracy in answers');
    if (analytics.learningStreak >= 7)
      strengths.push('Consistent learning habit');
    if (analytics.totalTimeSpent >= 300)
      strengths.push('Dedicated time investment');

    return strengths;
  }

  private identifyWeaknesses(analytics: UserAnalytics): string[] {
    const weaknesses: string[] = [];

    if (analytics.averageScore < 60) weaknesses.push('Low accuracy in answers');
    if (analytics.learningStreak < 3)
      weaknesses.push('Inconsistent learning habit');
    if (analytics.totalTimeSpent < 60)
      weaknesses.push('Limited time investment');

    return weaknesses;
  }

  private generateRecommendations(analytics: UserAnalytics): string[] {
    const recommendations: string[] = [];

    if (analytics.averageScore < 70) {
      recommendations.push(
        'Focus on understanding concepts before moving to advanced topics'
      );
    }
    if (analytics.learningStreak < 5) {
      recommendations.push('Try to maintain a daily learning routine');
    }
    if (analytics.totalTimeSpent < 120) {
      recommendations.push('Increase learning time to see better progress');
    }

    return recommendations;
  }

  private analyzeLearningPatterns(analytics: UserAnalytics): any {
    return {
      mostActiveTime: 'Evening',
      preferredDifficulty: 'Intermediate',
      averageSessionLength:
        analytics.totalSessions > 0
          ? analytics.totalTimeSpent / analytics.totalSessions
          : 0,
      completionRate:
        analytics.totalQuestionsAnswered > 0
          ? (analytics.correctAnswers / analytics.totalQuestionsAnswered) * 100
          : 0,
    };
  }

  private analyzeProgressTrends(analytics: UserAnalytics): any {
    return {
      isImproving: true,
      improvementRate: 5.2,
      consistencyScore: (analytics.learningStreak / 30) * 100,
    };
  }

  private async saveUserAnalytics(analytics: UserAnalytics): Promise<void> {
    // Check if analytics already exist
    const q = query(
      collection(db, this.ANALYTICS_COLLECTION),
      where('userId', '==', analytics.userId),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      await addDoc(collection(db, this.ANALYTICS_COLLECTION), analytics);
    } else {
      await updateDoc(snapshot.docs[0].ref, analytics);
    }
  }
}

export const userAnalyticsService = new UserAnalyticsService();
