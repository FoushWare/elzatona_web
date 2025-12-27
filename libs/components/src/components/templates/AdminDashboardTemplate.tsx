"use client";

import React from "react";
import { WelcomeHeader } from "../molecules/WelcomeHeader";
import {
  AdminStatsGrid,
  type AdminStatsGridPropsType,
} from "../organisms/AdminStatsGrid";
import {
  AdminQuickActionsSection,
  type AdminQuickActionsSectionPropsType,
} from "../organisms/AdminQuickActionsSection";
import { RefreshButtonPropsType } from "../atoms/RefreshButton";
import { cn } from "../../utils";

interface AdminDashboardTemplateProps {
  readonly welcomeTitle: string;
  readonly welcomeSubtitle: React.ReactNode;
  readonly refreshButton?: RefreshButtonPropsType;
  readonly stats: AdminStatsGridPropsType;
  readonly quickActions: AdminQuickActionsSectionPropsType;
  readonly className?: string;
}

export type AdminDashboardTemplatePropsType = AdminDashboardTemplateProps;

/**
 * AdminDashboardTemplate Component
 * Page layout template for admin dashboard
 * Composes welcome header, stats grid, and quick actions section
 */
export function AdminDashboardTemplate({
  welcomeTitle,
  welcomeSubtitle,
  refreshButton,
  stats,
  quickActions,
  className,
}: AdminDashboardTemplateProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader
          title={welcomeTitle}
          subtitle={welcomeSubtitle}
          refreshButton={refreshButton}
        />
        <AdminStatsGrid {...stats} />
        <AdminQuickActionsSection {...quickActions} />
      </div>
    </div>
  );
}
