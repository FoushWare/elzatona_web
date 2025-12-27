"use client";

import React, { Suspense } from "react";
import { Card, CardContent } from "@elzatona/common-ui";
import { Layers, Users, BookOpen, Target, MessageSquare } from "lucide-react";

interface StatsCardProps {
  readonly icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  readonly label: string;
  readonly value: number;
  readonly color: string;
}

const StatsCard = React.memo<StatsCardProps>(
  ({ icon: Icon, label, value, color }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center">
          <Icon className="h-8 w-8 mr-3" style={{ color }} />
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
);

StatsCard.displayName = "StatsCard";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

interface StatsSectionProps {
  readonly stats: {
    readonly totalCards: number;
    readonly totalPlans: number;
    readonly totalCategories: number;
    readonly totalTopics: number;
    readonly totalQuestions: number;
  };
}

/**
 * StatsSection Component
 * Displays statistics cards for content management dashboard
 */
export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsCard
          icon={Layers}
          label="Cards"
          value={stats.totalCards}
          color="#3B82F6"
        />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsCard
          icon={Users}
          label="Plans"
          value={stats.totalPlans}
          color="#10B981"
        />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsCard
          icon={BookOpen}
          label="Categories"
          value={stats.totalCategories}
          color="#8B5CF6"
        />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsCard
          icon={Target}
          label="Topics"
          value={stats.totalTopics}
          color="#F59E0B"
        />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsCard
          icon={MessageSquare}
          label="Questions"
          value={stats.totalQuestions}
          color="#EF4444"
        />
      </Suspense>
    </div>
  );
}

export type StatsSectionPropsType = StatsSectionProps;
