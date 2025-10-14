import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'user' | 'content' | 'admin';
  userId?: string; // If targeting specific user
  adminId?: string; // If targeting specific admin
  isRead: boolean;
  createdAt: Date;
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
      if (!db) {
        throw new Error('Database not initialized');
      }

      const notificationData = {
        title,
        message,
        type,
        category,
        userId: options.userId || null,
        adminId: options.adminId || null,
        isRead: false,
        createdAt: serverTimestamp(),
        metadata: options.metadata || {},
      };

      const docRef = await addDoc(
        collection(db, this.COLLECTION_NAME),
        notificationData
      );

      console.log(`✅ Notification created: ${title}`);
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Get notifications for a specific user or admin
   */
  static async getNotifications(
    userId?: string,
    adminId?: string,
    limitCount: number = 50
  ): Promise<Notification[]> {
    try {
      if (!db) {
        console.error('Database not initialized');
        return [];
      }

      let q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      // Filter by user or admin if specified
      if (userId) {
        q = query(
          collection(db, this.COLLECTION_NAME),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      } else if (adminId) {
        q = query(
          collection(db, this.COLLECTION_NAME),
          where('adminId', '==', adminId),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }

      const querySnapshot = await getDocs(q);
      const notifications: Notification[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        notifications.push({
          id: doc.id,
          title: data.title,
          message: data.message,
          type: data.type,
          category: data.category,
          userId: data.userId,
          adminId: data.adminId,
          isRead: data.isRead,
          createdAt: data.createdAt?.toDate() || new Date(),
          readAt: data.readAt?.toDate(),
          metadata: data.metadata,
        });
      });

      return notifications;
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  }

  /**
   * Subscribe to real-time notifications
   */
  static subscribeToNotifications(
    callback: (notifications: Notification[]) => void,
    userId?: string,
    adminId?: string,
    limitCount: number = 50
  ): NotificationSubscription {
    if (!db) {
      console.error('Database not initialized');
      return { unsubscribe: () => {} };
    }

    let q = query(
      collection(db, this.COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    // Filter by user or admin if specified
    if (userId) {
      q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    } else if (adminId) {
      q = query(
        collection(db, this.COLLECTION_NAME),
        where('adminId', '==', adminId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const notifications: Notification[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        notifications.push({
          id: doc.id,
          title: data.title,
          message: data.message,
          type: data.type,
          category: data.category,
          userId: data.userId,
          adminId: data.adminId,
          isRead: data.isRead,
          createdAt: data.createdAt?.toDate() || new Date(),
          readAt: data.readAt?.toDate(),
          metadata: data.metadata,
        });
      });

      callback(notifications);
    });

    return { unsubscribe };
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<boolean> {
    try {
      if (!db) {
        return false;
      }

      await updateDoc(doc(db, this.COLLECTION_NAME, notificationId), {
        isRead: true,
        readAt: serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  /**
   * Mark all notifications as read for a user/admin
   */
  static async markAllAsRead(
    userId?: string,
    adminId?: string
  ): Promise<boolean> {
    try {
      if (!db) {
        return false;
      }

      const notifications = await this.getNotifications(userId, adminId, 1000);
      const unreadNotifications = notifications.filter(n => !n.isRead);

      const updatePromises = unreadNotifications.map(notification =>
        updateDoc(doc(db, this.COLLECTION_NAME, notification.id), {
          isRead: true,
          readAt: serverTimestamp(),
        })
      );

      await Promise.all(updatePromises);
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(
    userId?: string,
    adminId?: string
  ): Promise<number> {
    try {
      const notifications = await this.getNotifications(userId, adminId, 1000);
      return notifications.filter(n => !n.isRead).length;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }

  /**
   * Create system notifications for common events
   */
  static async notifyUserRegistration(
    userId: string,
    userName: string
  ): Promise<void> {
    await this.createNotification(
      'New User Registration',
      `${userName} has joined the platform`,
      'info',
      'user',
      { userId, metadata: { action: 'user_registration', entityId: userId } }
    );
  }

  static async notifyContentUpdate(
    adminId: string,
    contentType: string,
    action: string
  ): Promise<void> {
    await this.createNotification(
      'Content Updated',
      `${contentType} ${action} successfully`,
      'success',
      'content',
      { adminId, metadata: { action, entityType: contentType } }
    );
  }

  static async notifySystemAlert(
    message: string,
    type: Notification['type'] = 'warning'
  ): Promise<void> {
    await this.createNotification('System Alert', message, type, 'system');
  }

  static async notifyAdminAction(
    adminId: string,
    action: string,
    details: string
  ): Promise<void> {
    await this.createNotification('Admin Action', details, 'info', 'admin', {
      adminId,
      metadata: { action },
    });
  }
}
