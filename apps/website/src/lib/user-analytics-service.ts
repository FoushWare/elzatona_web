import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'question' | 'category' | 'topic' | 'card' | 'plan';
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  progress: number; // 0-100
  timeSpent: number; // in seconds
  lastAccessed: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  deviceInfo?: {
    userAgent: string;
    platform: string;
    language: string;
  };
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };
  activities: LearningActivity[];
}

export interface LearningActivity {
  id: string;
  sessionId: string;
  type:
    | 'question_answered'
    | 'card_studied'
    | 'plan_started'
    | 'plan_completed';
  contentId: string;
  contentType: 'question' | 'card' | 'plan';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface UserAnalytics {
  userId: string;
  totalTimeSpent: number;
  questionsAnswered: number;
  cardsStudied: number;
  plansCompleted: number;
  averageScore: number;
  streakDays: number;
  lastActiveDate: string;
  createdAt: string;
  updatedAt: string;
}

export class UserAnalyticsService {
  /**
   * Track user progress
   */
  static async trackProgress(
    userId: string,
    contentId: string,
    contentType: UserProgress['contentType'],
    progress: number,
    timeSpent: number
  ): Promise<void> {
    const progressData = {
      userId,
      contentId,
      contentType,
      progress: Math.min(100, Math.max(0, progress)),
      timeSpent,
      lastAccessed: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('id')
      .eq('userId', userId)
      .eq('contentId', contentId)
      .eq('contentType', contentType)
      .single();

    if (existingProgress) {
      // Update existing progress
      await supabase
        .from('user_progress')
        .update(progressData)
        .eq('id', existingProgress.id);
    } else {
      // Create new progress
      await supabase.from('user_progress').insert({
        ...progressData,
        status: progress === 100 ? 'completed' : 'in_progress',
        createdAt: new Date().toISOString(),
      });
    }
  }

  /**
   * Get user progress for specific content
   */
  static async getUserProgress(
    userId: string,
    contentId: string,
    contentType: UserProgress['contentType']
  ): Promise<UserProgress | null> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('userId', userId)
      .eq('contentId', contentId)
      .eq('contentType', contentType)
      .single();

    if (error || !data) {
      return null;
    }

    return data as UserProgress;
  }

  /**
   * Get all progress for a user
   */
  static async getAllUserProgress(userId: string): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('userId', userId)
      .order('lastAccessed', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as UserProgress[];
  }

  /**
   * Start a learning session
   */
  static async startSession(
    userId: string,
    deviceInfo?: LearningSession['deviceInfo'],
    location?: LearningSession['location']
  ): Promise<LearningSession> {
    const sessionData = {
      userId,
      startTime: new Date().toISOString(),
      deviceInfo,
      location,
      activities: [],
    };

    const { data, error } = await supabase
      .from('learning_sessions')
      .insert(sessionData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to start session: ${error.message}`);
    }

    return data as LearningSession;
  }

  /**
   * End a learning session
   */
  static async endSession(sessionId: string): Promise<void> {
    const endTime = new Date().toISOString();

    // Calculate duration
    const { data: session } = await supabase
      .from('learning_sessions')
      .select('startTime')
      .eq('id', sessionId)
      .single();

    if (session) {
      const duration = Math.floor(
        (new Date(endTime).getTime() - new Date(session.startTime).getTime()) /
          1000
      );

      await supabase
        .from('learning_sessions')
        .update({
          endTime,
          duration,
        })
        .eq('id', sessionId);
    }
  }

  /**
   * Add activity to a session
   */
  static async addActivity(
    sessionId: string,
    type: LearningActivity['type'],
    contentId: string,
    contentType: LearningActivity['contentType'],
    metadata?: Record<string, any>
  ): Promise<void> {
    const activityData = {
      sessionId,
      type,
      contentId,
      contentType,
      timestamp: new Date().toISOString(),
      metadata,
    };

    await supabase.from('learning_activities').insert(activityData);
  }

  /**
   * Get user analytics
   */
  static async getUserAnalytics(userId: string): Promise<UserAnalytics | null> {
    const { data, error } = await supabase
      .from('user_analytics')
      .select('*')
      .eq('userId', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data as UserAnalytics;
  }

  /**
   * Update user analytics
   */
  static async updateUserAnalytics(
    userId: string,
    updates: Partial<UserAnalytics>
  ): Promise<void> {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await supabase.from('user_analytics').upsert({
      userId,
      ...updateData,
    });
  }

  /**
   * Get learning sessions for a user
   */
  static async getUserSessions(
    userId: string,
    limit: number = 50
  ): Promise<LearningSession[]> {
    const { data, error } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('userId', userId)
      .order('startTime', { ascending: false })
      .limit(limit);

    if (error || !data) {
      return [];
    }

    return data as LearningSession[];
  }

  /**
   * Get session activities
   */
  static async getSessionActivities(
    sessionId: string
  ): Promise<LearningActivity[]> {
    const { data, error } = await supabase
      .from('learning_activities')
      .select('*')
      .eq('sessionId', sessionId)
      .order('timestamp', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as LearningActivity[];
  }

  /**
   * Get user insights
   */
  static async getUserInsights(userId: string): Promise<any> {
    // Get user analytics
    const analytics = await this.getUserAnalytics(userId);

    // Get recent sessions
    const sessions = await this.getUserSessions(userId, 10);

    // Get recent progress
    const progress = await this.getAllUserProgress(userId);

    // Calculate insights
    const insights = {
      totalTimeSpent: analytics?.totalTimeSpent || 0,
      questionsAnswered: analytics?.questionsAnswered || 0,
      cardsStudied: analytics?.cardsStudied || 0,
      plansCompleted: analytics?.plansCompleted || 0,
      averageScore: analytics?.averageScore || 0,
      streakDays: analytics?.streakDays || 0,
      lastActiveDate: analytics?.lastActiveDate || null,
      recentSessions: sessions.length,
      totalProgress: progress.length,
      completedProgress: progress.filter(p => p.status === 'completed').length,
      inProgressItems: progress.filter(p => p.status === 'in_progress').length,
    };

    return insights;
  }

  /**
   * Get system-wide analytics
   */
  static async getSystemAnalytics(): Promise<any> {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('user_analytics')
      .select('*', { count: 'exact', head: true });

    // Get total sessions
    const { count: totalSessions } = await supabase
      .from('learning_sessions')
      .select('*', { count: 'exact', head: true });

    // Get total progress records
    const { count: totalProgress } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true });

    // Get recent activity (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { count: recentActivity } = await supabase
      .from('learning_sessions')
      .select('*', { count: 'exact', head: true })
      .gte('startTime', yesterday.toISOString());

    return {
      totalUsers: totalUsers || 0,
      activeUsers: recentActivity || 0,
      averageSessionDuration: 0, // Placeholder
      totalQuestionsAnswered: totalProgress || 0,
      userEngagement: {
        dailyActiveUsers: recentActivity || 0,
        weeklyActiveUsers: recentActivity || 0,
        monthlyActiveUsers: totalUsers || 0,
      },
      contentPerformance: {
        mostAnsweredQuestions: [],
        mostCompletedTopics: [],
        mostPopularCards: [],
        mostCompletedPlans: [],
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}
