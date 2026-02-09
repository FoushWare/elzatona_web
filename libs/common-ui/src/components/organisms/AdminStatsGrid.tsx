"use client";

import React from "react";
import {
  AdminMetricCard,
  type AdminMetricCardPropsType,
} from "../molecules/AdminMetricCard";
import { cn } from "../../utils";

interface AdminStatsGridProps {
  readonly metrics: readonly AdminMetricCardPropsType[];
  readonly loading?: boolean;
  readonly className?: string;
}

export type AdminStatsGridPropsType = AdminStatsGridProps;

/**
 * AdminStatsGrid Component
 * Grid organism for displaying admin dashboard statistics
 * Renders a responsive grid of metric cards
 */
export function AdminStatsGrid({
  metrics,
  loading = false,
  className,
}: AdminStatsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
        className,
      )}
    >
      {metrics.map((metric, index) => (
        <AdminMetricCard key={index} {...metric} loading={loading} />
      ))}
    </div>
  );
}
