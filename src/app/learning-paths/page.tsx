'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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
  const [lastOpenedCard, setLastOpenedCard] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
      const wasCardClosed = newSet.has(pathId);

      // If the clicked card is currently closed, close all others and open this one
      if (wasCardClosed) {
        // Close all cards first
        newSet.clear();
        // Then add all path IDs except the clicked one (keeping it open)
        learningPaths.forEach(path => {
          if (path.id !== pathId) {
            newSet.add(path.id);
          }
        });
        // Track that this card was just opened
        setLastOpenedCard(pathId);
      } else {
        // If the clicked card is currently open, close it (close all cards)
        newSet.clear();
        learningPaths.forEach(path => {
          newSet.add(path.id);
        });
        setLastOpenedCard(null);
      }

      return newSet;
    });
  };

  const clearFilters = () => {
    setSelectedDifficulty('all');
    setSelectedCategory('all');
  };

  // Scroll to action buttons when a card is opened
  useEffect(() => {
    if (lastOpenedCard && cardRefs.current[lastOpenedCard]) {
      // Wait for the card animation to complete before scrolling
      const timer = setTimeout(() => {
        const cardElement = cardRefs.current[lastOpenedCard];
        if (cardElement) {
          // Find the action buttons section within the card
          const actionButtons = cardElement.querySelector(
            '[data-action-buttons]'
          );
          if (actionButtons) {
            actionButtons.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          } else {
            // Fallback: scroll to the card itself
            cardElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          }
        }
      }, 350); // Wait for the card expansion animation (300ms + buffer)

      return () => clearTimeout(timer);
    }
  }, [lastOpenedCard]);

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

        {/* Schedule Interview Button */}
        <div className="mb-6 flex justify-center">
          <Link
            href="/schedule-interview"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Schedule AI Mock Interview
          </Link>
        </div>

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
          cardRefs={cardRefs}
        />

        {/* Call to Action */}
        <CallToAction />
      </div>
    </div>
  );
}
