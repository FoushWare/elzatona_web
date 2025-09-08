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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 via-blue-200 to-cyan-200 dark:from-purple-900 dark:via-indigo-900 dark:via-blue-900 dark:to-cyan-900 py-4 sm:py-6 lg:py-8 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large colorful orbs */}
        <div className="absolute -top-60 -right-60 w-96 h-96 bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-br from-cyan-400/30 via-emerald-400/30 to-yellow-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-400/25 via-red-400/25 to-pink-400/25 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/25 via-purple-400/25 to-pink-400/25 rounded-full blur-3xl animate-pulse delay-1500"></div>

        {/* Medium floating elements */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse delay-1200"></div>

        {/* Small accent elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-violet-400/15 to-fuchsia-400/15 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-3/4 left-1/6 w-40 h-40 bg-gradient-to-br from-rose-400/15 to-pink-400/15 rounded-full blur-xl animate-pulse delay-800"></div>
        <div className="absolute top-1/6 right-1/6 w-40 h-40 bg-gradient-to-br from-teal-400/15 to-emerald-400/15 rounded-full blur-xl animate-pulse delay-1800"></div>
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
