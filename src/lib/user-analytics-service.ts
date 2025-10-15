import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
} from 'firebase/firestore';

export interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'question' | 'category' | 'topic' | 'card' | 'plan';
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  progress: number; // 0-100
  timeSpent: number; // in seconds
  lastAccessed: string;
  completedAt?: string;
  score?: number;
  attempts: number;
  metadata?: Record<string, any>;
}

export interface LearningActivity {
  id: string;
  userId: string;
  activityType:
    | 'question_answered'
    | 'topic_completed'
    | 'card_started'
    | 'plan_started'
    | 'plan_completed';
  contentId: string;
  contentType: string;
  timestamp: string;
  duration?: number; // in seconds
  score?: number;
  metadata?: Record<string, any>;
}

export interface LearningSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  activitiesCompleted: number;
  questionsAnswered: number;
  topicsCompleted: number;
  cardsCompleted: number;
  plansCompleted: number;
  totalScore: number;
  averageScore: number;
  deviceInfo?: {
    userAgent: string;
    screenResolution: string;
    platform: string;
  };
  location?: {
    country: string;
    city: string;
    timezone: string;
  };
}

export interface UserAnalytics {
  userId: string;
  totalSessions: number;
  totalTimeSpent: number; // in seconds
  totalQuestionsAnswered: number;
  totalTopicsCompleted: number;
  totalCardsCompleted: number;
  totalPlansCompleted: number;
  averageScore: number;
  streakDays: number;
  lastActiveDate: string;
  favoriteContentTypes: string[];
  learningPatterns: {
    preferredTimeOfDay: string;
    averageSessionDuration: number;
    mostActiveDay: string;
  };
  progressDistribution: {
    notStarted: number;
    inProgress: number;
    completed: number;
    skipped: number;
  };
}

export interface LearningInsights {
  userId: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  learningVelocity: number; // questions per hour
  retentionRate: number; // percentage
  difficultyProgression: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  topicMastery: Record<string, number>; // topic -> mastery percentage
  predictedCompletionTime: string; // estimated date
}

export interface SystemAnalytics {
  totalUsers: number;
  activeUsers: number; // users active in last 30 days
  totalSessions: number;
  totalQuestionsAnswered: number;
  averageSessionDuration: number;
  mostPopularContent: {
    questions: string[];
    topics: string[];
    cards: string[];
    plans: string[];
  };
  userEngagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
  };
  contentPerformance: {
    mostAnsweredQuestions: string[];
    mostCompletedTopics: string[];
    mostPopularCards: string[];
    mostCompletedPlans: string[];
  };
  learningTrends: {
    questionsPerDay: Record<string, number>;
    completionsPerDay: Record<string, number>;
    averageScoresOverTime: Record<string, number>;
  };
}

export class UserAnalyticsService {
  private static readonly USER_PROGRESS_COLLECTION = 'userProgress';
  private static readonly LEARNING_ACTIVITIES_COLLECTION = 'learningActivities';
  private static readonly LEARNING_SESSIONS_COLLECTION = 'learningSessions';

  /**
   * Track user progress
   */
  static async trackProgress(
    userId: string,
    contentId: string,
    contentType: UserProgress['contentType'],
    status: UserProgress['status'],
    progress: number = 0,
    timeSpent: number = 0,
    score?: number,
    metadata?: Record<string, any>
  ): Promise<UserProgress> {
    // Check if progress already exists
    const existingProgress = await this.getUserProgress(
      userId,
      contentId,
      contentType
    );

    const progressData: UserProgress = {
      id: existingProgress?.id || `${userId}_${contentId}_${contentType}`,
      userId,
      contentId,
      contentType,
      status,
      progress: Math.max(0, Math.min(100, progress)),
      timeSpent: timeSpent + (existingProgress?.timeSpent || 0),
      lastAccessed: new Date().toISOString(),
      completedAt:
        status === 'completed'
          ? new Date().toISOString()
          : existingProgress?.completedAt,
      score: score || existingProgress?.score,
      attempts: (existingProgress?.attempts || 0) + 1,
      metadata: { ...existingProgress?.metadata, ...metadata },
    };

    if (existingProgress) {
      // Update existing progress
      const progressRef = doc(
        collection(db, this.USER_PROGRESS_COLLECTION),
        existingProgress.id
      );
      await updateDoc(progressRef, progressData);
    } else {
      // Create new progress
      await addDoc(collection(db, this.USER_PROGRESS_COLLECTION), progressData);
    }

    // Log learning activity
    await this.logLearningActivity({
      userId,
      activityType: this.getActivityType(contentType, status),
      contentId,
      contentType,
      timestamp: new Date().toISOString(),
      duration: timeSpent,
      score,
      metadata,
    });

    return progressData;
  }

  /**
   * Get user progress for specific content
   */
  static async getUserProgress(
    userId: string,
    contentId: string,
    contentType: UserProgress['contentType']
  ): Promise<UserProgress | null> {
    const progressSnapshot = await getDocs(
      query(
        collection(db, this.USER_PROGRESS_COLLECTION),
        where('userId', '==', userId),
        where('contentId', '==', contentId),
        where('contentType', '==', contentType)
      )
    );

    if (progressSnapshot.empty) {
      return null;
    }

    return progressSnapshot.docs[0].data() as UserProgress;
  }

  /**
   * Get all progress for a user
   */
  static async getAllUserProgress(userId: string): Promise<UserProgress[]> {
    const progressSnapshot = await getDocs(
      query(
        collection(db, this.USER_PROGRESS_COLLECTION),
        where('userId', '==', userId),
        orderBy('lastAccessed', 'desc')
      )
    );

    return progressSnapshot.docs.map(doc => doc.data() as UserProgress);
  }

  /**
   * Start a learning session
   */
  static async startSession(
    userId: string,
    deviceInfo?: LearningSession['deviceInfo'],
    location?: LearningSession['location']
  ): Promise<LearningSession> {
    const session: LearningSession = {
      id: `session_${userId}_${Date.now()}`,
      userId,
      startTime: new Date().toISOString(),
      activitiesCompleted: 0,
      questionsAnswered: 0,
      topicsCompleted: 0,
      cardsCompleted: 0,
      plansCompleted: 0,
      totalScore: 0,
      averageScore: 0,
      deviceInfo,
      location,
    };

    await addDoc(collection(db, this.LEARNING_SESSIONS_COLLECTION), session);
    return session;
  }

  /**
   * End a learning session
   */
  static async endSession(
    sessionId: string,
    activitiesCompleted: number,
    questionsAnswered: number,
    topicsCompleted: number,
    cardsCompleted: number,
    plansCompleted: number,
    totalScore: number
  ): Promise<boolean> {
    try {
      const sessionRef = doc(
        collection(db, this.LEARNING_SESSIONS_COLLECTION),
        sessionId
      );
      const endTime = new Date().toISOString();

      // Calculate duration
      const sessionSnapshot = await getDocs(
        query(
          collection(db, this.LEARNING_SESSIONS_COLLECTION),
          where('id', '==', sessionId)
        )
      );

      if (sessionSnapshot.empty) {
        return false;
      }

      const session = sessionSnapshot.docs[0].data() as LearningSession;
      const startTime = new Date(session.startTime).getTime();
      const duration = Math.round(
        (new Date(endTime).getTime() - startTime) / 1000
      );

      await updateDoc(sessionRef, {
        endTime,
        duration,
        activitiesCompleted,
        questionsAnswered,
        topicsCompleted,
        cardsCompleted,
        plansCompleted,
        totalScore,
        averageScore:
          activitiesCompleted > 0 ? totalScore / activitiesCompleted : 0,
      });

      return true;
    } catch (error) {
      console.error('Error ending session:', error);
      return false;
    }
  }

  /**
   * Get user analytics
   */
  static async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    const [progress, activities, sessions] = await Promise.all([
      this.getAllUserProgress(userId),
      this.getUserLearningActivities(userId),
      this.getUserSessions(userId),
    ]);

    const totalTimeSpent = sessions.reduce(
      (sum, session) => sum + (session.duration || 0),
      0
    );
    const totalQuestionsAnswered = activities.filter(
      a => a.activityType === 'question_answered'
    ).length;
    const totalTopicsCompleted = activities.filter(
      a => a.activityType === 'topic_completed'
    ).length;
    const totalCardsCompleted = activities.filter(
      a => a.activityType === 'card_started'
    ).length;
    const totalPlansCompleted = activities.filter(
      a => a.activityType === 'plan_completed'
    ).length;

    const scores = activities
      .filter(a => a.score !== undefined)
      .map(a => a.score!);
    const averageScore =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;

    // Calculate streak
    const streakDays = this.calculateStreakDays(activities);

    // Get favorite content types
    const contentTypeCounts: Record<string, number> = {};
    activities.forEach(activity => {
      contentTypeCounts[activity.contentType] =
        (contentTypeCounts[activity.contentType] || 0) + 1;
    });
    const favoriteContentTypes = Object.entries(contentTypeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);

    // Calculate learning patterns
    const learningPatterns = this.calculateLearningPatterns(sessions);

    // Calculate progress distribution
    const progressDistribution = {
      notStarted: progress.filter(p => p.status === 'not_started').length,
      inProgress: progress.filter(p => p.status === 'in_progress').length,
      completed: progress.filter(p => p.status === 'completed').length,
      skipped: progress.filter(p => p.status === 'skipped').length,
    };

    return {
      userId,
      totalSessions: sessions.length,
      totalTimeSpent,
      totalQuestionsAnswered,
      totalTopicsCompleted,
      totalCardsCompleted,
      totalPlansCompleted,
      averageScore,
      streakDays,
      lastActiveDate:
        activities.length > 0
          ? activities[0].timestamp
          : new Date().toISOString(),
      favoriteContentTypes,
      learningPatterns,
      progressDistribution,
    };
  }

  /**
   * Get learning insights for a user
   */
  static async getUserInsights(userId: string): Promise<LearningInsights> {
    const [progress, activities] = await Promise.all([
      this.getAllUserProgress(userId),
      this.getUserLearningActivities(userId),
    ]);

    // Calculate strengths and weaknesses
    const strengths = this.calculateStrengths(progress, activities);
    const weaknesses = this.calculateWeaknesses(progress, activities);
    const recommendations = this.generateRecommendations(progress, activities);

    // Calculate learning velocity (questions per hour)
    const totalTimeSpent = activities.reduce(
      (sum, activity) => sum + (activity.duration || 0),
      0
    );
    const questionsAnswered = activities.filter(
      a => a.activityType === 'question_answered'
    ).length;
    const learningVelocity =
      totalTimeSpent > 0 ? (questionsAnswered * 3600) / totalTimeSpent : 0;

    // Calculate retention rate
    const retentionRate = this.calculateRetentionRate(progress);

    // Calculate difficulty progression
    const difficultyProgression =
      this.calculateDifficultyProgression(activities);

    // Calculate topic mastery
    const topicMastery = this.calculateTopicMastery(progress);

    // Predict completion time
    const predictedCompletionTime = this.predictCompletionTime(
      progress,
      activities
    );

    return {
      userId,
      strengths,
      weaknesses,
      recommendations,
      learningVelocity,
      retentionRate,
      difficultyProgression,
      topicMastery,
      predictedCompletionTime,
    };
  }

  /**
   * Get system-wide analytics
   */
  static async getSystemAnalytics(): Promise<SystemAnalytics> {
    const [allProgress, allActivities, allSessions] = await Promise.all([
      this.getAllProgress(),
      this.getAllLearningActivities(),
      this.getAllSessions(),
    ]);

    const uniqueUsers = new Set(allProgress.map(p => p.userId));
    const activeUsers = this.calculateActiveUsers(allActivities);

    const totalSessions = allSessions.length;
    const totalQuestionsAnswered = allActivities.filter(
      a => a.activityType === 'question_answered'
    ).length;
    const averageSessionDuration =
      allSessions.reduce((sum, session) => sum + (session.duration || 0), 0) /
      totalSessions;

    const mostPopularContent = this.calculateMostPopularContent(allActivities);
    const userEngagement = this.calculateUserEngagement(allActivities);
    const contentPerformance = this.calculateContentPerformance(allActivities);
    const learningTrends = this.calculateLearningTrends(allActivities);

    return {
      totalUsers: uniqueUsers.size,
      activeUsers,
      totalSessions,
      totalQuestionsAnswered,
      averageSessionDuration,
      mostPopularContent,
      userEngagement,
      contentPerformance,
      learningTrends,
    };
  }

  // Helper methods
  private static async logLearningActivity(
    activity: Omit<LearningActivity, 'id'>
  ): Promise<void> {
    const activityData: LearningActivity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...activity,
    };

    await addDoc(
      collection(db, this.LEARNING_ACTIVITIES_COLLECTION),
      activityData
    );
  }

  private static async getUserLearningActivities(
    userId: string
  ): Promise<LearningActivity[]> {
    const activitiesSnapshot = await getDocs(
      query(
        collection(db, this.LEARNING_ACTIVITIES_COLLECTION),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      )
    );

    return activitiesSnapshot.docs.map(doc => doc.data() as LearningActivity);
  }

  private static async getUserSessions(
    userId: string
  ): Promise<LearningSession[]> {
    const sessionsSnapshot = await getDocs(
      query(
        collection(db, this.LEARNING_SESSIONS_COLLECTION),
        where('userId', '==', userId),
        orderBy('startTime', 'desc')
      )
    );

    return sessionsSnapshot.docs.map(doc => doc.data() as LearningSession);
  }

  private static async getAllProgress(): Promise<UserProgress[]> {
    const progressSnapshot = await getDocs(
      collection(db, this.USER_PROGRESS_COLLECTION)
    );
    return progressSnapshot.docs.map(doc => doc.data() as UserProgress);
  }

  private static async getAllLearningActivities(): Promise<LearningActivity[]> {
    const activitiesSnapshot = await getDocs(
      collection(db, this.LEARNING_ACTIVITIES_COLLECTION)
    );
    return activitiesSnapshot.docs.map(doc => doc.data() as LearningActivity);
  }

  private static async getAllSessions(): Promise<LearningSession[]> {
    const sessionsSnapshot = await getDocs(
      collection(db, this.LEARNING_SESSIONS_COLLECTION)
    );
    return sessionsSnapshot.docs.map(doc => doc.data() as LearningSession);
  }

  private static getActivityType(
    contentType: string,
    status: string
  ): LearningActivity['activityType'] {
    if (contentType === 'question' && status === 'completed')
      return 'question_answered';
    if (contentType === 'topic' && status === 'completed')
      return 'topic_completed';
    if (contentType === 'card' && status === 'in_progress')
      return 'card_started';
    if (contentType === 'plan' && status === 'in_progress')
      return 'plan_started';
    if (contentType === 'plan' && status === 'completed')
      return 'plan_completed';
    return 'question_answered'; // default
  }

  private static calculateStreakDays(activities: LearningActivity[]): number {
    // Simple streak calculation - consecutive days with activity
    const activityDates = activities.map(a =>
      new Date(a.timestamp).toDateString()
    );
    const uniqueDates = [...new Set(activityDates)].sort().reverse();

    let streak = 0;
    const today = new Date().toDateString();
    let currentDate = new Date();

    for (let i = 0; i < 30; i++) {
      const dateString = currentDate.toDateString();
      if (uniqueDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  private static calculateLearningPatterns(
    sessions: LearningSession[]
  ): UserAnalytics['learningPatterns'] {
    // Calculate preferred time of day
    const hourCounts: Record<number, number> = {};
    sessions.forEach(session => {
      const hour = new Date(session.startTime).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    const preferredHour = Object.entries(hourCounts).reduce((a, b) =>
      hourCounts[Number(a[0])] > hourCounts[Number(b[0])] ? a : b
    )[0];
    const preferredTimeOfDay =
      preferredHour < 12
        ? 'morning'
        : preferredHour < 18
          ? 'afternoon'
          : 'evening';

    // Calculate average session duration
    const averageSessionDuration =
      sessions.reduce((sum, session) => sum + (session.duration || 0), 0) /
      sessions.length;

    // Calculate most active day
    const dayCounts: Record<string, number> = {};
    sessions.forEach(session => {
      const day = new Date(session.startTime).toLocaleDateString('en-US', {
        weekday: 'long',
      });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const mostActiveDay = Object.entries(dayCounts).reduce((a, b) =>
      dayCounts[a[0]] > dayCounts[b[0]] ? a : b
    )[0];

    return {
      preferredTimeOfDay,
      averageSessionDuration,
      mostActiveDay,
    };
  }

  private static calculateStrengths(
    progress: UserProgress[],
    activities: LearningActivity[]
  ): string[] {
    // Simple strength calculation based on high scores and completion rates
    const strengths: string[] = [];

    const highScoreActivities = activities.filter(a => a.score && a.score > 80);
    if (highScoreActivities.length > activities.length * 0.7) {
      strengths.push('High accuracy in answering questions');
    }

    const completedTopics = progress.filter(
      p => p.contentType === 'topic' && p.status === 'completed'
    );
    if (completedTopics.length > 5) {
      strengths.push('Strong topic completion rate');
    }

    return strengths;
  }

  private static calculateWeaknesses(
    progress: UserProgress[],
    activities: LearningActivity[]
  ): string[] {
    const weaknesses: string[] = [];

    const lowScoreActivities = activities.filter(a => a.score && a.score < 60);
    if (lowScoreActivities.length > activities.length * 0.3) {
      weaknesses.push('Low accuracy in some areas');
    }

    const skippedItems = progress.filter(p => p.status === 'skipped');
    if (skippedItems.length > progress.length * 0.2) {
      weaknesses.push('High skip rate');
    }

    return weaknesses;
  }

  private static generateRecommendations(
    progress: UserProgress[],
    activities: LearningActivity[]
  ): string[] {
    const recommendations: string[] = [];

    const incompleteItems = progress.filter(p => p.status === 'in_progress');
    if (incompleteItems.length > 0) {
      recommendations.push(
        'Complete in-progress items to improve learning continuity'
      );
    }

    const lowScoreActivities = activities.filter(a => a.score && a.score < 60);
    if (lowScoreActivities.length > 0) {
      recommendations.push('Review and practice areas with low scores');
    }

    return recommendations;
  }

  private static calculateRetentionRate(progress: UserProgress[]): number {
    const completedItems = progress.filter(p => p.status === 'completed');
    const totalItems = progress.length;
    return totalItems > 0 ? (completedItems.length / totalItems) * 100 : 0;
  }

  private static calculateDifficultyProgression(
    activities: LearningActivity[]
  ): LearningInsights['difficultyProgression'] {
    // This would need to be implemented based on actual difficulty data
    return {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
  }

  private static calculateTopicMastery(
    progress: UserProgress[]
  ): Record<string, number> {
    const topicMastery: Record<string, number> = {};

    progress.forEach(p => {
      if (p.contentType === 'topic') {
        topicMastery[p.contentId] = p.progress;
      }
    });

    return topicMastery;
  }

  private static predictCompletionTime(
    progress: UserProgress[],
    activities: LearningActivity[]
  ): string {
    // Simple prediction based on current progress rate
    const completedItems = progress.filter(
      p => p.status === 'completed'
    ).length;
    const totalItems = progress.length;
    const completionRate = totalItems > 0 ? completedItems / totalItems : 0;

    if (completionRate === 0) {
      return 'Unable to predict';
    }

    const remainingItems = totalItems - completedItems;
    const estimatedDays = Math.ceil(remainingItems / (completionRate * 7)); // Assuming weekly completion rate

    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDays);

    return completionDate.toISOString();
  }

  private static calculateActiveUsers(activities: LearningActivity[]): number {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivities = activities.filter(
      a => new Date(a.timestamp) > thirtyDaysAgo
    );
    const activeUserIds = new Set(recentActivities.map(a => a.userId));

    return activeUserIds.size;
  }

  private static calculateMostPopularContent(
    activities: LearningActivity[]
  ): SystemAnalytics['mostPopularContent'] {
    const contentCounts: Record<string, Record<string, number>> = {
      questions: {},
      topics: {},
      cards: {},
      plans: {},
    };

    activities.forEach(activity => {
      if (activity.contentType in contentCounts) {
        const contentType = activity.contentType as keyof typeof contentCounts;
        contentCounts[contentType][activity.contentId] =
          (contentCounts[contentType][activity.contentId] || 0) + 1;
      }
    });

    return {
      questions: Object.entries(contentCounts.questions)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id]) => id),
      topics: Object.entries(contentCounts.topics)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id]) => id),
      cards: Object.entries(contentCounts.cards)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id]) => id),
      plans: Object.entries(contentCounts.plans)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id]) => id),
    };
  }

  private static calculateUserEngagement(
    activities: LearningActivity[]
  ): SystemAnalytics['userEngagement'] {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyActiveUsers = new Set(
      activities
        .filter(a => new Date(a.timestamp) > oneDayAgo)
        .map(a => a.userId)
    ).size;

    const weeklyActiveUsers = new Set(
      activities
        .filter(a => new Date(a.timestamp) > oneWeekAgo)
        .map(a => a.userId)
    ).size;

    const monthlyActiveUsers = new Set(
      activities
        .filter(a => new Date(a.timestamp) > oneMonthAgo)
        .map(a => a.userId)
    ).size;

    return {
      dailyActiveUsers,
      weeklyActiveUsers,
      monthlyActiveUsers,
    };
  }

  private static calculateContentPerformance(
    activities: LearningActivity[]
  ): SystemAnalytics['contentPerformance'] {
    // This would need to be implemented based on actual performance metrics
    return {
      mostAnsweredQuestions: [],
      mostCompletedTopics: [],
      mostPopularCards: [],
      mostCompletedPlans: [],
    };
  }

  private static calculateLearningTrends(
    activities: LearningActivity[]
  ): SystemAnalytics['learningTrends'] {
    // This would need to be implemented based on actual trend data
    return {
      questionsPerDay: {},
      completionsPerDay: {},
      averageScoresOverTime: {},
    };
  }
}
