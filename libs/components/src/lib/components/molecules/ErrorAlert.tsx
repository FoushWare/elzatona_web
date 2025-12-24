import { AlertCircle } from "lucide-react";
import { cn } from "../../utils";

interface ErrorAlertProps {
  readonly title: string;
  readonly message: string;
  readonly className?: string;
}

export type ErrorAlertPropsType = ErrorAlertProps;

export function ErrorAlert({ title, message, className }: ErrorAlertProps) {
  return (
    <div
      className={cn(
        "mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4",
        className,
      )}
    >
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <div>
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {title}
          </h3>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
