import { useCallback } from 'react';
import { NotificationService } from '@/lib/notification-service';

export function useNotificationActions() {
  const notifyContentUpdate = useCallback(
    async (contentType: string, action: string, adminId?: string) => {
      try {
        await NotificationService.notifyContentUpdate(
          adminId || 'system',
          contentType,
          action
        );
      } catch (error) {
        console.error('Failed to send content update notification:', error);
      }
    },
    []
  );

  const notifyUserRegistration = useCallback(
    async (userId: string, userName: string) => {
      try {
        await NotificationService.notifyUserRegistration(userId, userName);
      } catch (error) {
        console.error('Failed to send user registration notification:', error);
      }
    },
    []
  );

  const notifySystemAlert = useCallback(
    async (
      message: string,
      type: 'info' | 'success' | 'warning' | 'error' = 'warning'
    ) => {
      try {
        await NotificationService.notifySystemAlert(message, type);
      } catch (error) {
        console.error('Failed to send system alert:', error);
      }
    },
    []
  );

  const notifyAdminAction = useCallback(
    async (adminId: string, action: string, details: string) => {
      try {
        await NotificationService.notifyAdminAction(adminId, action, details);
      } catch (error) {
        console.error('Failed to send admin action notification:', error);
      }
    },
    []
  );

  const createCustomNotification = useCallback(
    async (
      title: string,
      message: string,
      type: 'info' | 'success' | 'warning' | 'error' = 'info',
      category: 'system' | 'user' | 'content' | 'admin' = 'system',
      options: {
        userId?: string;
        adminId?: string;
        metadata?: any;
      } = {}
    ) => {
      try {
        await NotificationService.createNotification(
          title,
          message,
          type,
          category,
          options
        );
      } catch (error) {
        console.error('Failed to create custom notification:', error);
      }
    },
    []
  );

  return {
    notifyContentUpdate,
    notifyUserRegistration,
    notifySystemAlert,
    notifyAdminAction,
    createCustomNotification,
  };
}
