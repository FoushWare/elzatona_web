import React from 'react';
import { LearningPathCard, LearningPath } from './LearningPathCard';
import { EmptyState } from '../common/EmptyState';
import { useLearningPathStats } from '@/hooks/useLearningPathStats';

export interface LearningPathsGridProps {
  paths: LearningPath[];
  collapsedCards: Set<string>;
  onToggleCard: (pathId: string) => void;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  className?: string;
}

export const LearningPathsGrid: React.FC<LearningPathsGridProps> = ({
  paths,
  collapsedCards,
  onToggleCard,
  cardRefs,
  className = '',
}) => {
  const {
    stats,
    isLoading: isStatsLoading,
    getQuestionCount,
  } = useLearningPathStats();

  if (paths.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-8 ${className}`}
    >
      {paths.map(path => {
        const dynamicQuestionCount = getQuestionCount(path.id);
        const isQuestionCountLoading = dynamicQuestionCount === undefined;

        return (
          <LearningPathCard
            key={path.id}
            path={path}
            isCollapsed={collapsedCards.has(path.id)}
            onToggle={onToggleCard}
            cardRef={el => {
              cardRefs.current[path.id] = el;
            }}
            dynamicQuestionCount={dynamicQuestionCount}
            isQuestionCountLoading={isQuestionCountLoading}
          />
        );
      })}
    </div>
  );
};
