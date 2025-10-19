'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  NotificationService,
  Notification,
  NotificationSubscription,
} from '@/lib/notification-service';

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

      let fetchedNotifications;
      if (userId) {
        fetchedNotifications = await NotificationService.getUserNotifications(
          userId,
          50
        );
      } else if (adminId) {
        fetchedNotifications = await NotificationService.getAdminNotifications(
          adminId,
          50
        );
      } else {
        fetchedNotifications =
          await NotificationService.getSystemNotifications(50);
      }

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
      await NotificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId
            ? { ...n, isRead: true, readAt: new Date() }
            : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      if (userId) {
        await NotificationService.markAllAsReadForUser(userId);
      } else if (adminId) {
        await NotificationService.markAllAsReadForAdmin(adminId);
      }
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true, readAt: new Date() }))
      );
      setUnreadCount(0);
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

    let subscription: NotificationSubscription | undefined;
    if (userId) {
      subscription = NotificationService.subscribeToUserNotifications(
        userId,
        newNotification => {
          setNotifications(prev => [newNotification, ...prev]);
          if (!newNotification.isRead) {
            setUnreadCount(prev => prev + 1);
          }
          setIsLoading(false);
        }
      );
    } else if (adminId) {
      subscription = NotificationService.subscribeToAdminNotifications(
        adminId,
        newNotification => {
          setNotifications(prev => [newNotification, ...prev]);
          if (!newNotification.isRead) {
            setUnreadCount(prev => prev + 1);
          }
          setIsLoading(false);
        }
      );
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
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
