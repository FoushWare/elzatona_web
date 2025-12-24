import { LucideIcon } from "lucide-react";
import { DashboardCard } from "../atoms/DashboardCard";
import { MetricBadge } from "../atoms/MetricBadge";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconBgColor: string;
  trend?: {
    icon: LucideIcon;
    text: string;
    color: string;
  };
  className?: string;
}

export type MetricCardPropsType = MetricCardProps;

export function MetricCard({
  icon: Icon,
  label,
  value,
  iconBgColor,
  trend,
  className,
}: MetricCardProps) {
  return (
    <DashboardCard className={className}>
      <MetricBadge icon={Icon} label={label} value={value} trend={trend} />
      <div className="flex items-center mt-4">
        <div
          className={`p-3 ${iconBgColor} rounded-xl group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </DashboardCard>
  );
}
