"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils";

interface AdminMetricCardProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string | number;
  readonly iconBgColor: string;
  readonly trend?: {
    readonly icon: LucideIcon;
    readonly text: string;
    readonly color: string;
  };
  readonly loading?: boolean;
  readonly className?: string;
}

export type AdminMetricCardPropsType = AdminMetricCardProps;

/**
 * AdminMetricCard Component
 * Metric card molecule for admin dashboard
 * Displays a single metric with icon, label, value, and optional trend indicator
 */
export function AdminMetricCard({
  icon: Icon,
  label,
  value,
  iconBgColor,
  trend,
  loading = false,
  className,
}: AdminMetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={cn(
              "p-3 rounded-xl group-hover:scale-110 transition-transform duration-200",
              iconBgColor,
            )}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white min-h-[2.25rem] flex items-center">
              {loading ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-9 w-20 rounded-md"></div>
              ) : typeof value === "number" ? (
                value.toLocaleString()
              ) : (
                value
              )}
            </div>
          </div>
        </div>
        {trend && (
          <div className="text-right">
            <div className={cn("flex items-center text-sm", trend.color)}>
              <trend.icon className="h-4 w-4 mr-1" />
              <span>{trend.text}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
