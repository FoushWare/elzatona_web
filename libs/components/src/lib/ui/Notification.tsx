"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
}

interface NotificationProps {
  readonly notification: Notification;
  readonly onRemove: (id: string) => void;
}

function NotificationItem({ notification, onRemove }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setIsVisible(true);

    // Auto remove after duration
    const timer = setTimeout(() => {
      handleRemove();
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.duration, handleRemove]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(notification.id), 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div
      className={`
        ${getBackgroundColor()}
        border rounded-lg p-4 shadow-lg transition-all duration-300 transform
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        max-w-sm w-full
      `}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {notification.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {notification.message}
          </p>
        </div>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Listen for custom notification events
  useEffect(() => {
    const handleNotification = (event: CustomEvent<Notification>) => {
      const notification = {
        ...event.detail,
        id: Math.random().toString(36).substring(2, 11),
      };
      setNotifications((prev) => [...prev, notification]);
    };

    window.addEventListener(
      "notification" as keyof WindowEventMap,
      handleNotification as EventListener,
    );
    return () => {
      window.removeEventListener(
        "notification" as keyof WindowEventMap,
        handleNotification as EventListener,
      );
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
}

// Helper function to show notifications
export function showNotification(notification: Omit<Notification, "id">) {
  const event = new CustomEvent("notification", { detail: notification });
  window.dispatchEvent(event);
}

// Convenience functions
export const notify = {
  success: (title: string, message: string, duration?: number) =>
    showNotification({ type: "success", title, message, duration }),
  error: (title: string, message: string, duration?: number) =>
    showNotification({ type: "error", title, message, duration }),
  warning: (title: string, message: string, duration?: number) =>
    showNotification({ type: "warning", title, message, duration }),
  info: (title: string, message: string, duration?: number) =>
    showNotification({ type: "info", title, message, duration }),
};
