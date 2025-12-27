"use client";

import React, { Suspense } from "react";
import { Button } from "@elzatona/common-ui";
import { Plus } from "lucide-react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
  </div>
);

export interface ActionButton {
  readonly label: string;
  readonly onClick: () => void;
  readonly className?: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
}

interface ActionButtonsProps {
  readonly actions: readonly ActionButton[];
  readonly className?: string;
}

/**
 * ActionButtons Component
 * Group of action buttons for content management operations
 */
export function ActionButtons({ actions, className }: ActionButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-2 mb-6 ${className || ""}`}>
      {actions.map((action, index) => {
        const Icon = action.icon || Plus;
        return (
          <Suspense key={index} fallback={<LoadingSkeleton />}>
            <Button onClick={action.onClick} className={action.className || ""}>
              <Icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          </Suspense>
        );
      })}
    </div>
  );
}

export type ActionButtonsPropsType = ActionButtonsProps;
