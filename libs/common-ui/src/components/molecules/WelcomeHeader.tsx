import { ReactNode } from "react";
import { cn } from "../../utils";
import { RefreshButton, RefreshButtonPropsType } from "../atoms/RefreshButton";

interface WelcomeHeaderProps {
  readonly title: string;
  readonly subtitle: ReactNode;
  readonly refreshButton?: RefreshButtonPropsType;
  readonly className?: string;
}

export type WelcomeHeaderPropsType = WelcomeHeaderProps;

export function WelcomeHeader({
  title,
  subtitle,
  refreshButton,
  className,
}: WelcomeHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            {subtitle}
          </div>
        </div>
        {refreshButton && <RefreshButton {...refreshButton} />}
      </div>
    </div>
  );
}
