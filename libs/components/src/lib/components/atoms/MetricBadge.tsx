import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    icon: LucideIcon;
    text: string;
    color: string;
  };
  className?: string;
}

export type MetricBadgePropsType = MetricBadgeProps;

export function MetricBadge({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: MetricBadgeProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </div>
          <div className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
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
  );
}
