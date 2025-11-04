'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className='fixed top-20 right-4 z-50 space-y-2 max-w-sm'>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: () => void;
}> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case 'info':
        return <Info className='w-5 h-5 text-blue-500' />;
      case 'warning':
        return <AlertCircle className='w-5 h-5 text-yellow-500' />;
      case 'error':
        return <AlertCircle className='w-5 h-5 text-red-500' />;
      default:
        return <Info className='w-5 h-5 text-gray-500' />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-white dark:bg-gray-800 border-green-500';
      case 'info':
        return 'bg-white dark:bg-gray-800 border-blue-500';
      case 'warning':
        return 'bg-white dark:bg-gray-800 border-yellow-500';
      case 'error':
        return 'bg-white dark:bg-gray-800 border-red-500';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-600';
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`rounded-lg border p-4 shadow-lg ${getBgColor()}`}>
        <div className='flex items-start space-x-3'>
          {getIcon()}
          <div className='flex-1 min-w-0'>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-white'>
              {notification.title}
            </h4>
            <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
              {notification.message}
            </p>
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className='mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300'
              >
                {notification.action.label}
              </button>
            )}
          </div>
          <button
            onClick={onRemove}
            className='flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};
