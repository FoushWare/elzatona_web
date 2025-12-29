"use client";

import { useAdminAuth } from "@elzatona/contexts";
import {
  Database,
  BookOpen,
  Target,
  Tag,
  Folder,
  Zap,
  TrendingUp,
  Star,
  Activity,
  HelpCircle,
  CreditCard,
  Code,
  Calculator,
} from "lucide-react";
import { useAdminStats } from "@elzatona/hooks";
import {
  AdminDashboardTemplate,
  type AdminMetricCardPropsType,
} from "@elzatona/common-ui";
import { type AdminQuickAction } from "@elzatona/types";

export default function AdminDashboard() {
  const { user } = useAdminAuth();

  // Use TanStack Query hook for admin stats
  const {
    data: stats,
    isLoading,
    isFetching,
    error: statsError,
    refetch: refetchStats,
    isRefetching: refreshing,
  } = useAdminStats();

  // Show loading skeleton when initially loading OR when fetching OR when no data exists yet
  const loading = isLoading || (isFetching && !stats) || !stats;

  const handleRefresh = () => {
    refetchStats();
  };

  // Prepare metrics for AdminStatsGrid
  // Use 0 as placeholder value - the loading prop will control skeleton display
  const metrics: readonly AdminMetricCardPropsType[] = [
    {
      icon: Database,
      label: "Total Questions",
      value: stats?.questions ?? 0,
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
      value: stats?.learningCards ?? 0,
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
      value: stats?.learningPlans ?? 0,
      iconBgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      trend: {
        icon: Activity,
        text: "Plans",
        color: "text-purple-500",
      },
    },
    {
      icon: Tag,
      label: "Topics",
      value: stats?.topics ?? 0,
      iconBgColor: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      trend: {
        icon: Tag,
        text: "Topics",
        color: "text-indigo-500",
      },
    },
    {
      icon: Folder,
      label: "Categories",
      value: stats?.categories ?? 0,
      iconBgColor: "bg-gradient-to-r from-pink-500 to-pink-600",
      trend: {
        icon: Folder,
        text: "Categories",
        color: "text-pink-500",
      },
    },
    {
      icon: Zap,
      label: "Total Tasks",
      value: (stats?.frontendTasks ?? 0) + (stats?.problemSolvingTasks ?? 0),
      iconBgColor: "bg-gradient-to-r from-orange-500 to-orange-600",
      trend: {
        icon: Code,
        text: "Tasks",
        color: "text-orange-500",
      },
    },
  ];

  // Prepare quick actions
  const quickActions: AdminQuickAction[] = [
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

  // Prepare welcome subtitle
  const welcomeSubtitle = (
    <>
      Welcome back,{" "}
      <span className="font-semibold text-blue-600 dark:text-blue-400">
        {user?.name}
      </span>{" "}
      ({user?.role}) - Unified Learning Management System
    </>
  );

  return (
    <AdminDashboardTemplate
      welcomeTitle="🎯 Admin Dashboard"
      welcomeSubtitle={welcomeSubtitle}
      refreshButton={{
        onClick: handleRefresh,
        disabled: refreshing,
        loading: refreshing,
      }}
      stats={{
        metrics,
        loading,
      }}
      quickActions={{
        actions: quickActions,
      }}
    />
  );
}
