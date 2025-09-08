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
    new Set(learningPaths.map(path => path.id))
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
      if (newSet.has(pathId)) {
        newSet.delete(pathId);
      } else {
        newSet.add(pathId);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setSelectedDifficulty('all');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-gray-900 dark:to-indigo-950 py-4 sm:py-6 lg:py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

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
