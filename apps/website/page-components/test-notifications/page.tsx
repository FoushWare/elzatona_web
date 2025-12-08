"use client";

import React from "react";
import { useNotifications } from "../../components/NotificationSystem";
import { useUserType } from "@elzatona/contexts";
import {
  Compass,
  Map,
  Bell,
  CheckCircle,
  Info,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function TestNotificationsPage() {
  const { addNotification } = useNotifications();
  const { userType, setUserType } = useUserType();

  const testNotifications = [
    {
      type: "success" as const,
      title: "Success Notification",
      message: "This is a success notification with a checkmark icon.",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      type: "info" as const,
      title: "Info Notification",
      message: "This is an info notification with an info icon.",
      icon: <Info className="w-5 h-5" />,
    },
    {
      type: "warning" as const,
      title: "Warning Notification",
      message: "This is a warning notification with a warning icon.",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      type: "error" as const,
      title: "Error Notification",
      message: "This is an error notification with an error icon.",
      icon: <XCircle className="w-5 h-5" />,
    },
  ];

  const testModeSwitch = (mode: "guided" | "self-directed") => {
    if (mode === userType) return;

    setUserType(mode);

    if (mode === "guided") {
      addNotification({
        type: "info",
        title: "Switched to Guided Learning",
        message:
          "You're now in guided learning mode with structured plans and timelines.",
        duration: 4000,
        action: {
          label: "View Plans",
          onClick: () => (window.location.href = "/features/guided-learning"),
        },
      });
    } else {
      addNotification({
        type: "info",
        title: "Switched to Free Style Learning",
        message:
          "You're now in free style mode. Learn at your own pace with custom practice sessions.",
        duration: 4000,
        action: {
          label: "Explore Paths",
          onClick: () => (window.location.href = "/free-style"),
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Notification System Test
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Test the notification system and learning mode switching
            functionality
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Notification Tests */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-indigo-600" />
              Test Notifications
            </h2>

            <div className="space-y-4">
              {testNotifications.map((notification, index) => (
                <button
                  key={index}
                  onClick={() =>
                    addNotification({
                      type: notification.type,
                      title: notification.title,
                      message: notification.message,
                      duration: 5000,
                    })
                  }
                  className="w-full flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {notification.icon}
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Click to show notification
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Learning Mode Switch Tests */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Compass className="w-6 h-6 mr-2 text-indigo-600" />
              Learning Mode Switch
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Current Mode:
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {userType === "guided" ? (
                    <span className="flex items-center text-indigo-600">
                      <Compass className="w-5 h-5 mr-2" />
                      Guided Learning
                    </span>
                  ) : (
                    <span className="flex items-center text-green-600">
                      <Map className="w-5 h-5 mr-2" />
                      Free Style Learning
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => testModeSwitch("guided")}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                    userType === "guided"
                      ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <Compass className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Switch to Guided Learning</div>
                    <div className="text-sm opacity-75">
                      Structured plans and timelines
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => testModeSwitch("self-directed")}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                    userType === "self-directed"
                      ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <Map className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">
                      Switch to Free Style Learning
                    </div>
                    <div className="text-sm opacity-75">
                      Learn at your own pace
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            How to Test:
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>
              • Click any notification button to see different notification
              types
            </li>
            <li>
              • Switch between learning modes to see notifications with action
              buttons
            </li>
            <li>
              • Notifications will auto-dismiss after 5 seconds or click the X
              to dismiss manually
            </li>
            <li>
              • Action buttons in notifications will redirect to the appropriate
              pages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
