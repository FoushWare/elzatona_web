import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
  className?: string;
}

export type ActivityItemPropsType = ActivityItemProps;

export function ActivityItem({
  icon: Icon,
  label,
  value,
  iconColor,
  className,
}: ActivityItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl",
        className,
      )}
    >
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${iconColor} mr-3`} />
        <span className="text-gray-900 dark:text-white font-medium">
          {label}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{value}</div>
    </div>
  );
}
