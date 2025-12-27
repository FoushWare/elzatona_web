"use client";

import { useAdminAuth } from "@elzatona/contexts";
import { useDashboardStats } from "@elzatona/hooks";
import { useState, useEffect } from "react";
import {
  BookOpen,
  HelpCircle,
  CreditCard,
  Code,
  Calculator,
  Database,
  TrendingUp,
  CheckCircle,
  Target,
  Activity,
  Zap,
  Star,
} from "lucide-react";
import {
  MetricGrid,
  ActivityFeed,
  DataTableHeader,
  WelcomeHeader,
  ErrorAlert,
  QuickActions,
  type QuickAction,
} from "../../index";

// Simple dashboard template wrapper
const DashboardTemplate = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  </div>
);

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const { stats, loading, error, refetch } = useDashboardStats();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only using stats after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const systemMetrics = [
    {
      icon: Database,
      label: "Total Questions",
      value: !isClient || loading ? "..." : stats.questions,
      iconBgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      trend: {
        icon: TrendingUp,
        text: "Active",
        color: "text-green-500",
      },
    },
    {
      icon: BookOpen,
      label: "Learning Cards",
      value: !isClient || loading ? "..." : stats.cards,
      iconBgColor: "bg-gradient-to-r from-green-500 to-green-600",
      trend: {
        icon: Star,
        text: "Core",
        color: "text-blue-500",
      },
    },
    {
      icon: Target,
      label: "Learning Plans",
      value: !isClient || loading ? "..." : stats.learningPlans,
      iconBgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      trend: {
        icon: Activity,
        text: "Plans",
        color: "text-purple-500",
      },
    },
    {
      icon: Zap,
      label: "Total Tasks",
      value: !isClient || loading ? "..." : stats.totalTasks,
      iconBgColor: "bg-gradient-to-r from-orange-500 to-orange-600",
      trend: {
        icon: Code,
        text: "Tasks",
        color: "text-orange-500",
      },
    },
  ];

  const systemHealthActivities = [
    {
      icon: Database,
      label: "Database",
      value: "Connected",
      iconColor: "text-blue-500",
    },
    {
      icon: Zap,
      label: "API Response",
      value: "0ms",
      iconColor: "text-yellow-500",
    },
    {
      icon: Activity,
      label: "Uptime",
      value: "99.9%",
      iconColor: "text-green-500",
    },
  ];

  const quickActions = [
    {
      title: "Add New Question",
      description: "Create a new learning question",
      href: "/admin/content/questions",
      icon: HelpCircle,
      color: "bg-blue-500",
    },
    {
      title: "Manage Learning Cards",
      description: "Configure learning cards and plans",
      href: "/admin/content-management",
      icon: CreditCard,
      color: "bg-green-500",
    },
    {
      title: "Create Frontend Task",
      description: "Add a new React coding challenge",
      href: "/admin/frontend-tasks",
      icon: Code,
      color: "bg-cyan-500",
    },
    {
      title: "Add Problem Solving",
      description: "Create algorithmic challenges",
      href: "/admin/problem-solving",
      icon: Calculator,
      color: "bg-red-500",
    },
  ];

  const quickActionsData: QuickAction[] = quickActions;

  return (
    <DashboardTemplate>
      {/* Welcome Header */}
      <WelcomeHeader
        title="🎯 Admin Dashboard"
        subtitle={
          <>
            Welcome back,{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {user?.email}
            </span>{" "}
            ({user?.role}) - Unified Learning Management System
          </>
        }
        refreshButton={{
          onClick: refetch,
          disabled: !isClient || loading,
          loading: !isClient || loading,
        }}
      />

      {/* System Overview Stats */}
      <MetricGrid metrics={systemMetrics} className="mb-8" />

      {/* Error Display */}
      {error && <ErrorAlert title="Dashboard Stats Error" message={error} />}

      {/* Quick Actions */}
      <QuickActions actions={quickActionsData} subtitle="Most used features" />

      {/* System Health */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
        <DataTableHeader
          title="System Health"
          icon={CheckCircle}
          action={
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                All systems operational
              </span>
            </div>
          }
        />
        <ActivityFeed activities={systemHealthActivities} />
      </div>
    </DashboardTemplate>
  );
}
