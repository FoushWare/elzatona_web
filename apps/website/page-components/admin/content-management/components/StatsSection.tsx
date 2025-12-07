"use client";

import React from "react";
import { Layers, Users, BookOpen, Target, MessageSquare } from "lucide-react";

const Card = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Card,
  })),
);
const CardContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.CardContent,
  })),
);

interface StatsCardProps {
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  label: string;
  value: number;
  color: string;
}

const StatsCard = React.memo(
  ({ icon: Icon, label, value, color }: StatsCardProps) => (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center">
          <Icon className="h-8 w-8 mr-3" style={{ color }} />
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
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

interface StatsSectionProps {
  stats: {
    totalCards: number;
    totalPlans: number;
    totalCategories: number;
    totalTopics: number;
    totalQuestions: number;
  };
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <StatsCard
        icon={Layers}
        label="Cards"
        value={stats.totalCards}
        color="#3B82F6"
      />
      <StatsCard
        icon={Users}
        label="Plans"
        value={stats.totalPlans}
        color="#10B981"
      />
      <StatsCard
        icon={BookOpen}
        label="Categories"
        value={stats.totalCategories}
        color="#8B5CF6"
      />
      <StatsCard
        icon={Target}
        label="Topics"
        value={stats.totalTopics}
        color="#F59E0B"
      />
      <StatsCard
        icon={MessageSquare}
        label="Questions"
        value={stats.totalQuestions}
        color="#EF4444"
      />
    </div>
  );
};

