import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'user' | 'content' | 'admin';
  userId?: string; // If targeting specific user
  adminId?: string; // If targeting specific admin
  isRead: boolean;
  created_at: Date;
  readAt?: Date;
  metadata?: {
    action?: string;
    entityId?: string;
    entityType?: string;
    [key: string]: any;
  };
}

export interface NotificationSubscription {
  unsubscribe: () => void;
}

export class NotificationService {
  private static readonly COLLECTION_NAME = 'notifications';

  /**
   * Create a new notification
   */
  static async createNotification(
    title: string,
    message: string,
    type: Notification['type'] = 'info',
    category: Notification['category'] = 'system',
    options: {
      userId?: string;
      adminId?: string;
      metadata?: Notification['metadata'];
    } = {}
  ): Promise<string> {
    try {
      const notificationData = {
        title,
        message,
        type,
        category,
        userId: options.userId || null,
        adminId: options.adminId || null,
        isRead: false,
        created_at: new Date().toISOString(),
        readAt: null,
        metadata: options.metadata || null,
      };

      const { data, error } = await supabase
        .from(this.COLLECTION_NAME)
        .insert(notificationData)
        .select()
        .single();

      if (error) throw error;

      return data.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Get notifications for a specific user
   */
  static async getUserNotifications(
    userId: string,
    limit: number = 50,
    unreadOnly: boolean = false
  ): Promise<Notification[]> {
    try {
      let query = supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('userId', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (unreadOnly) {
        query = query.eq('isRead', false);
      }

      const { data: notifications, error } = await query;

      if (error) throw error;

      return notifications || [];
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error;
    }
  }

  /**
   * Get notifications for a specific admin
   */
  static async getAdminNotifications(
    adminId: string,
    limit: number = 50,
    unreadOnly: boolean = false
  ): Promise<Notification[]> {
    try {
      let query = supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('adminId', adminId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (unreadOnly) {
        query = query.eq('isRead', false);
      }

      const { data: notifications, error } = await query;

      if (error) throw error;

      return notifications || [];
    } catch (error) {
      console.error('Error fetching admin notifications:', error);
      throw error;
    }
  }

  /**
   * Get system notifications (no specific user/admin)
   */
  static async getSystemNotifications(
    limit: number = 50
  ): Promise<Notification[]> {
    try {
      const { data: notifications, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('category', 'system')
        .is('userId', null)
        .is('adminId', null)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return notifications || [];
    } catch (error) {
      console.error('Error fetching system notifications:', error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          isRead: true,
          readAt: new Date().toISOString(),
        })
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  /**
   * Mark multiple notifications as read
   */
  static async markMultipleAsRead(notificationIds: string[]): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          isRead: true,
          readAt: new Date().toISOString(),
        })
        .in('id', notificationIds);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  static async markAllAsReadForUser(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          isRead: true,
          readAt: new Date().toISOString(),
        })
        .eq('userId', userId)
        .eq('isRead', false);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking all notifications as read for user:', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read for an admin
   */
  static async markAllAsReadForAdmin(adminId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          isRead: true,
          readAt: new Date().toISOString(),
        })
        .eq('adminId', adminId)
        .eq('isRead', false);

      if (error) throw error;
    } catch (error) {
      console.error(
        'Error marking all notifications as read for admin:',
        error
      );
      throw error;
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  /**
   * Delete multiple notifications
   */
  static async deleteMultipleNotifications(
    notificationIds: string[]
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .delete()
        .in('id', notificationIds);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting notifications:', error);
      throw error;
    }
  }

  /**
   * Delete old notifications (older than specified days)
   */
  static async deleteOldNotifications(daysOld: number = 30): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .delete()
        .lt('created_at', cutoffDate.toISOString());

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting old notifications:', error);
      throw error;
    }
  }

  /**
   * Get notification count for a user
   */
  static async getUnreadCountForUser(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*', { count: 'exact', head: true })
        .eq('userId', userId)
        .eq('isRead', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting unread count for user:', error);
      throw error;
    }
  }

  /**
   * Get notification count for an admin
   */
  static async getUnreadCountForAdmin(adminId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*', { count: 'exact', head: true })
        .eq('adminId', adminId)
        .eq('isRead', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting unread count for admin:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time notifications for a user
   */
  static subscribeToUserNotifications(
    userId: string,
    callback: (notification: Notification) => void
  ): NotificationSubscription {
    const subscription = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: this.COLLECTION_NAME,
          filter: `userId=eq.${userId}`,
        },
        payload => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
      },
    };
  }

  /**
   * Subscribe to real-time notifications for an admin
   */
  static subscribeToAdminNotifications(
    adminId: string,
    callback: (notification: Notification) => void
  ): NotificationSubscription {
    const subscription = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: this.COLLECTION_NAME,
          filter: `adminId=eq.${adminId}`,
        },
        payload => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
      },
    };
  }

  /**
   * Subscribe to system notifications
   */
  static subscribeToSystemNotifications(
    callback: (notification: Notification) => void
  ): NotificationSubscription {
    const subscription = supabase
      .channel('system-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: this.COLLECTION_NAME,
          filter: 'category=eq.system',
        },
        payload => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
      },
    };
  }
}
