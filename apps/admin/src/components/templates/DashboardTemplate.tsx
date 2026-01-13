import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface DashboardTemplateProps {
  children: ReactNode;
  className?: string;
}

export function DashboardTemplate({
  children,
  className,
}: DashboardTemplateProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
