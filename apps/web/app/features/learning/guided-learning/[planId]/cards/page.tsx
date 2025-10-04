'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { learningCardsService } from '@/lib/learning-cards-service';
import LearningCardComponent from '@/components/learning-cards/LearningCard';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  Users,
  BookOpen,
  Loader2,
} from 'lucide-react';
import type {
  LearningCard,
  LearningPlanCard,
  CardProgress,
} from '@/types/learning-cards';

export default function GuidedLearningCardsPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, user } = useFirebaseAuth();
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [planCards, setPlanCards] = useState<LearningPlanCard[]>([]);
  const [cardProgress, setCardProgress] = useState<
    Record<string, CardProgress>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const planId = params?.planId as string;

  useEffect(() => {
    if (!planId) return;

    const loadPlanData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load plan cards
        const planCardsData = await learningCardsService.getPlanCards(planId);
        setPlanCards(planCardsData);

        // Load learning cards
        const cardsData = await learningCardsService.getLearningCards();
        setCards(cardsData);

        // Load user progress for each card
        if (user?.uid) {
          const progressPromises = planCardsData.map(async planCard => {
            const progress = await learningCardsService.getCardProgress(
              user.uid,
              planCard.cardId,
              planId
            );
            return { cardId: planCard.cardId, progress };
          });

          const progressResults = await Promise.all(progressPromises);
          const progressMap: Record<string, CardProgress> = {};

          progressResults.forEach(({ cardId, progress }) => {
            if (progress) {
              progressMap[cardId] = progress;
            }
          });

          setCardProgress(progressMap);
        }
      } catch (err) {
        console.error('Error loading plan data:', err);
        setError('Failed to load learning plan. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPlanData();
  }, [planId, user?.uid]);

  const handleCardStart = async (card: LearningCard) => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (!user?.uid) return;

    try {
      // Create or update card progress
      let progress = cardProgress[card.id];
      if (!progress) {
        const progressId = await learningCardsService.updateCardProgress({
          userId: user.uid,
          cardId: card.id,
          planId,
          status: 'in-progress',
          progress: 0,
          timeSpent: 0,
          questionsCompleted: 0,
          totalQuestions: card.config.questionCount,
          lastAccessedAt: new Date().toISOString(),
        });

        progress = {
          id: progressId,
          userId: user.uid,
          cardId: card.id,
          planId,
          status: 'in-progress',
          progress: 0,
          timeSpent: 0,
          questionsCompleted: 0,
          totalQuestions: card.config.questionCount,
          lastAccessedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else {
        await learningCardsService.saveCardProgress(progress.id, {
          status: 'in-progress',
          lastAccessedAt: new Date().toISOString(),
        });
      }

      // Navigate to card practice
      router.push(
        `/features/learning/guided-learning/${planId}/cards/${card.id}/practice`
      );
    } catch (err) {
      console.error('Error starting card:', err);
      setError('Failed to start learning card. Please try again.');
    }
  };

  const handleCardContinue = (card: LearningCard) => {
    router.push(
      `/features/learning/guided-learning/${planId}/cards/${card.id}/practice`
    );
  };

  const handleCardReview = (card: LearningCard) => {
    router.push(
      `/features/learning/guided-learning/${planId}/cards/${card.id}/review`
    );
  };

  const getCardById = (cardId: string) => {
    return cards.find(card => card.id === cardId);
  };

  const getCardProgress = (cardId: string) => {
    const progress = cardProgress[cardId];
    if (!progress) return undefined;

    return {
      status: progress.status,
      progress: progress.progress,
      timeSpent: progress.timeSpent,
      questionsCompleted: progress.questionsCompleted,
    };
  };

  const getPlanStats = () => {
    const totalCards = planCards.length;
    const completedCards = Object.values(cardProgress).filter(
      p => p.status === 'completed'
    ).length;
    const inProgressCards = Object.values(cardProgress).filter(
      p => p.status === 'in-progress'
    ).length;
    const totalQuestions = cards.reduce(
      (sum, card) => sum + card.config.questionCount,
      0
    );
    const completedQuestions = Object.values(cardProgress).reduce(
      (sum, p) => sum + p.questionsCompleted,
      0
    );

    return {
      totalCards,
      completedCards,
      inProgressCards,
      totalQuestions,
      completedQuestions,
      progressPercentage:
        totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0,
    };
  };

  const stats = getPlanStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading learning plan...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/guided-learning')}
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Plans
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Guided Learning Plan
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Master frontend development through structured learning cards
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {stats.progressPercentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Complete
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedCards}/{stats.totalCards}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Cards Completed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedQuestions}/{stats.totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Questions Completed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.inProgressCards}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  In Progress
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {planCards.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Cards
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Learning Cards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planCards.map(planCard => {
              const card = getCardById(planCard.cardId);
              if (!card) return null;

              const progress = getCardProgress(card.id);

              return (
                <LearningCardComponent
                  key={card.id}
                  card={card}
                  progress={progress}
                  onStart={() => handleCardStart(card)}
                  onContinue={() => handleCardContinue(card)}
                  onViewDetails={() => handleCardReview(card)}
                />
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {planCards.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Learning Cards Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This learning plan doesn't have any cards configured yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
