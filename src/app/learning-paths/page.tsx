'use client';

import { useState } from 'react';
import { learningPaths } from '@/lib/resources';
import { PageHeader } from '@/components/PageHeader';
import { StatisticsSection } from '@/components/StatisticsSection';
import { FilterButtons } from '@/components/FilterButtons';
import { LearningPathsGrid } from '@/components/LearningPathsGrid';
import { CallToAction } from '@/components/CallToAction';

export default function LearningPathsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced' | 'all'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(
    new Set(learningPaths.map(path => path.id)) // All cards start closed
  );

  const filteredPaths = learningPaths.filter(
    path =>
      (selectedDifficulty === 'all' ||
        path.difficulty === selectedDifficulty) &&
      (selectedCategory === 'all' || path.id.includes(selectedCategory))
  );

  const categories = [
    'all',
    'javascript',
    'react',
    'css',
    'typescript',
    'testing',
    'performance',
    'security',
    'system-design',
    'tools',
    'ai-tools',
    'interview',
    'english',
  ];

  const toggleCard = (pathId: string) => {
    setCollapsedCards(prev => {
      const newSet = new Set(prev);

      // If the clicked card is currently closed, close all others and open this one
      if (newSet.has(pathId)) {
        // Close all cards first
        newSet.clear();
        // Then add all path IDs except the clicked one (keeping it open)
        learningPaths.forEach(path => {
          if (path.id !== pathId) {
            newSet.add(path.id);
          }
        });
      } else {
        // If the clicked card is currently open, close it (close all cards)
        newSet.clear();
        learningPaths.forEach(path => {
          newSet.add(path.id);
        });
      }

      return newSet;
    });
  };

  const clearFilters = () => {
    setSelectedDifficulty('all');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        {/* Header */}
        <PageHeader
          title="Learning Paths"
          description="Curated educational journeys to master frontend development skills through carefully selected resources"
          showMobileButtons={true}
          onToggleStatistics={() => setShowStatistics(!showStatistics)}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showStatistics={showStatistics}
          showFilters={showFilters}
        />

        {/* Statistics */}
        <StatisticsSection
          learningPathsCount={learningPaths.length}
          totalHours={learningPaths.reduce(
            (sum, path) => sum + path.estimatedTime,
            0
          )}
          totalResources={learningPaths.reduce(
            (sum, path) => sum + path.resources.length,
            0
          )}
          categoriesCount={categories.length - 1}
          isVisible={showStatistics}
        />

        {/* Filters */}
        <FilterButtons
          selectedDifficulty={selectedDifficulty}
          selectedCategory={selectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          isVisible={showFilters}
        />

        {/* Learning Paths Grid */}
        <LearningPathsGrid
          paths={filteredPaths}
          collapsedCards={collapsedCards}
          onToggleCard={toggleCard}
          onClearFilters={clearFilters}
        />

        {/* Call to Action */}
        <CallToAction />
      </div>
    </div>
  );
}
