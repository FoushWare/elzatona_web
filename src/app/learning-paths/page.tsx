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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950 dark:via-indigo-950 dark:via-blue-950 dark:to-cyan-950 py-4 sm:py-6 lg:py-8 relative overflow-hidden">
      {/* Light animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gentle floating orbs */}
        <div className="absolute -top-60 -right-60 w-96 h-96 bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-blue-200/20 dark:from-pink-500/10 dark:via-purple-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-br from-cyan-200/20 via-emerald-200/20 to-yellow-200/20 dark:from-cyan-500/10 dark:via-emerald-500/10 dark:to-yellow-500/10 rounded-full blur-3xl animate-float-reverse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-200/15 via-red-200/15 to-pink-200/15 dark:from-orange-500/8 dark:via-red-500/8 dark:to-pink-500/8 rounded-full blur-3xl animate-float-gentle delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-200/15 via-purple-200/15 to-pink-200/15 dark:from-indigo-500/8 dark:via-purple-500/8 dark:to-pink-500/8 rounded-full blur-3xl animate-float-slow delay-1500"></div>

        {/* Medium gentle floating elements */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-emerald-200/15 to-cyan-200/15 dark:from-emerald-500/8 dark:to-cyan-500/8 rounded-full blur-2xl animate-float-gentle delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-200/15 to-orange-200/15 dark:from-yellow-500/8 dark:to-orange-500/8 rounded-full blur-2xl animate-float-reverse delay-1200"></div>

        {/* Small accent elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-violet-200/10 to-fuchsia-200/10 dark:from-violet-500/5 dark:to-fuchsia-500/5 rounded-full blur-xl animate-float-gentle delay-2000"></div>
        <div className="absolute top-3/4 left-1/6 w-40 h-40 bg-gradient-to-br from-rose-200/10 to-pink-200/10 dark:from-rose-500/5 dark:to-pink-500/5 rounded-full blur-xl animate-float-slow delay-800"></div>
        <div className="absolute top-1/6 right-1/6 w-40 h-40 bg-gradient-to-br from-teal-200/10 to-emerald-200/10 dark:from-teal-500/5 dark:to-emerald-500/5 rounded-full blur-xl animate-float-gentle delay-1800"></div>

        {/* Subtle wave animations */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-pink-100/5 to-transparent dark:via-pink-900/5 animate-wave-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-100/5 to-transparent dark:via-purple-900/5 animate-wave-reverse delay-2000"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-100/5 to-transparent dark:via-blue-900/5 animate-wave-gentle delay-4000"></div>
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
