import { LucideIcon, Clock, ArrowRight } from "lucide-react";
import { cn } from "../../utils";

export interface QuickAction {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly color: string;
}

interface QuickActionsProps {
  readonly actions: readonly QuickAction[];
  readonly title?: string;
  readonly subtitle?: string;
  readonly className?: string;
}

export type QuickActionsPropsType = QuickActionsProps;

export function QuickActions({
  actions,
  title = "Quick Actions",
  subtitle,
  className,
}: QuickActionsProps) {
  const handleActionClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{subtitle}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action.href)}
            className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
          >
            <div
              className={`p-2 ${action.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}
            >
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {action.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
}
