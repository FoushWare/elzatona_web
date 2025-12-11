"use client";

import React, { Suspense } from "react";
import { Plus } from "lucide-react";

const Button = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Button,
  })),
);

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

interface ActionButtonsProps {
  onAddCard: () => void;
  onAddPlan: () => void;
  onAddCategory: () => void;
  onAddTopic: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddCard,
  onAddPlan,
  onAddCategory,
  onAddTopic,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Suspense fallback={<LoadingSkeleton />}>
        <Button onClick={onAddCard} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <Button onClick={onAddPlan} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <Button
          onClick={onAddCategory}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <Button
          onClick={onAddTopic}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Topic
        </Button>
      </Suspense>
    </div>
  );
};
