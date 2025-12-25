import { ReactNode } from "react";
import { cn } from "../../utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function DashboardCard({
  children,
  className,
  hover = true,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700",
        hover && "hover:shadow-2xl transition-all duration-300 group",
        className,
      )}
    >
      {children}
    </div>
  );
}
