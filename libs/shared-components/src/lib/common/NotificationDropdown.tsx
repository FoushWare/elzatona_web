'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useNotifications } from '@elzatona/shared-contexts';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface NotificationDropdownProps {
  userId?: string;
  adminId?: string;
}

export function NotificationDropdown({
  userId,
  adminId,
}: NotificationDropdownProps) {
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'warning':
        return <AlertTriangle className='h-4 w-4 text-yellow-500' />;
      case 'error':
        return <AlertCircle className='h-4 w-4 text-red-500' />;
      default:
        return <Info className='h-4 w-4 text-blue-500' />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className='relative'>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
      >
        <Bell className='h-6 w-6' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className='absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Notifications
              </h3>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={refreshNotifications}
                  disabled={isLoading}
                  className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                  />
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    title='Mark all as read'
                  >
                    <CheckCheck className='h-4 w-4' />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className='max-h-96 overflow-y-auto'>
              {isLoading ? (
                <div className='p-4 text-center'>
                  <RefreshCw className='h-6 w-6 animate-spin text-gray-400 mx-auto mb-2' />
                  <p className='text-gray-500 dark:text-gray-400'>
                    Loading notifications...
                  </p>
                </div>
              ) : error ? (
                <div className='p-4 text-center'>
                  <AlertCircle className='h-6 w-6 text-red-500 mx-auto mb-2' />
                  <p className='text-red-600 dark:text-red-400'>{error}</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className='p-4 text-center'>
                  <Bell className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                  <p className='text-gray-500 dark:text-gray-400'>
                    No notifications yet
                  </p>
                </div>
              ) : (
                <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        !notification.read
                          ? 'bg-blue-50/50 dark:bg-blue-900/10'
                          : ''
                      }`}
                    >
                      <div className='flex items-start space-x-3'>
                        <div className='flex-shrink-0 mt-0.5'>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between'>
                            <p
                              className={`text-sm font-medium ${
                                !notification.read
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {notification.title}
                            </p>
                            <div className='flex items-center space-x-2'>
                              <span className='text-xs text-gray-500 dark:text-gray-400'>
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                  title='Mark as read'
                                >
                                  <Check className='h-3 w-3' />
                                </button>
                              )}
                            </div>
                          </div>
                          <p
                            className={`text-sm mt-1 ${
                              !notification.read
                                ? 'text-gray-800 dark:text-gray-200'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to full notifications page
                    window.location.href = '/notifications';
                  }}
                  className='w-full text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
