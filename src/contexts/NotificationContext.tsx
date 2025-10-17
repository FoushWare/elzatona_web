'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { NotificationService, Notification } from '@/lib/notification-service';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
  userId?: string;
  adminId?: string;
}

export function NotificationProvider({
  children,
  userId,
  adminId,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fetchedNotifications = await NotificationService.getNotifications(
        userId,
        adminId,
        50
      );

      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter(n => !n.isRead).length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  }, [userId, adminId]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const success = await NotificationService.markAsRead(notificationId);
      if (success) {
        setNotifications(prev =>
          prev.map(n =>
            n.id === notificationId
              ? { ...n, isRead: true, readAt: new Date() }
              : n
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const success = await NotificationService.markAllAsRead(userId, adminId);
      if (success) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, isRead: true, readAt: new Date() }))
        );
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, [userId, adminId]);

  // Set up real-time subscription
  useEffect(() => {
    if (!userId && !adminId) {
      setIsLoading(false);
      return;
    }

    const subscription = NotificationService.subscribeToNotifications(
      realTimeNotifications => {
        setNotifications(realTimeNotifications);
        setUnreadCount(realTimeNotifications.filter(n => !n.isRead).length);
        setIsLoading(false);
      },
      userId,
      adminId,
      50
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, adminId]);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
}
