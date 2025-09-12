'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { learningPaths } from '@/lib/resources';
import { PageHeader } from '@/components/PageHeader';
import { LearningPathsGrid } from '@/components/LearningPathsGrid';
import { CallToAction } from '@/components/CallToAction';

export default function LearningPathsPage() {
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(
    new Set(learningPaths.map(path => path.id)) // All cards start closed
  );
  const [lastOpenedCard, setLastOpenedCard] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  // Scroll to the end of the card (flashcard icon) when a card is opened
  useEffect(() => {
    if (lastOpenedCard && cardRefs.current[lastOpenedCard]) {
      // Wait for the card animation to complete before scrolling
      const timer = setTimeout(() => {
        const cardElement = cardRefs.current[lastOpenedCard];
        if (cardElement) {
          // Find the flashcard icon at the end of the card
          const flashcardIcon = cardElement.querySelector(
            '[data-flashcard-icon]'
          );
          if (flashcardIcon) {
            flashcardIcon.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
          } else {
            // Fallback: scroll to the end of the card
            cardElement.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
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
          description="Your path to success in interviews"
          showMobileButtons={false}
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

        {/* Learning Paths Grid */}
        <LearningPathsGrid
          paths={learningPaths}
          collapsedCards={collapsedCards}
          onToggleCard={toggleCard}
          cardRefs={cardRefs}
        />

        {/* Call to Action */}
        <CallToAction />
      </div>
    </div>
  );
}
