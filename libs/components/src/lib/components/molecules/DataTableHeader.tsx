import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils";

interface DataTableHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export type DataTableHeaderPropsType = DataTableHeaderProps;

export function DataTableHeader({
  title,
  subtitle,
  icon: Icon,
  action,
  className,
}: DataTableHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center space-x-3">
        {Icon && <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
