'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  Star,
} from 'lucide-react';

interface Flashcard {
  id: string;
  questionId: string;
  question: string;
  answer: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'new' | 'learning' | 'review' | 'mastered';
  interval: number;
  repetitions: number;
  easeFactor: number;
  lastReviewed: string | null;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  source: 'wrong_answer' | 'manual' | 'bookmark';
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('due');
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    learning: 0,
    review: 0,
    mastered: 0,
    due: 0,
  });

  useEffect(() => {
    fetchFlashcards();
  }, [filter]);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const userId = 'test-user'; // In real app, get from auth

      let url = `/api/flashcards?userId=${userId}`;
      if (filter === 'due') {
        url += '&due=true';
      } else if (filter !== 'all') {
        url += `&status=${filter}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setFlashcards(data.data);
        setCurrentCardIndex(0);
        setShowAnswer(false);
      }
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const userId = 'test-user';
      const response = await fetch(`/api/flashcards?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        const allCards = data.data;
        const now = new Date().toISOString();

        setStats({
          total: allCards.length,
          new: allCards.filter((card: any) => card.status === 'new').length,
          learning: allCards.filter((card: any) => card.status === 'learning')
            .length,
          review: allCards.filter((card: any) => card.status === 'review')
            .length,
          mastered: allCards.filter((card: any) => card.status === 'mastered')
            .length,
          due: allCards.filter((card: any) => card.nextReview <= now).length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReview = async (quality: number) => {
    if (currentCardIndex >= flashcards.length) return;

    const currentCard = flashcards[currentCardIndex];

    try {
      const response = await fetch(`/api/flashcards/${currentCard.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quality }),
      });

      if (response.ok) {
        // Move to next card
        if (currentCardIndex < flashcards.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1);
        } else {
          // All cards reviewed, fetch new ones
          await fetchFlashcards();
        }
        setShowAnswer(false);
        await fetchStats(); // Update stats
      }
    } catch (error) {
      console.error('Error reviewing flashcard:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'learning':
        return 'bg-orange-100 text-orange-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'mastered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No flashcards found
          </h3>
          <p className="text-gray-600 mb-4">
            Start adding flashcards by bookmarking questions or adding wrong
            answers to your collection.
          </p>
          <Button onClick={() => (window.location.href = '/learning-paths')}>
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Questions
          </Button>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / flashcards.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h1>
          <p className="text-gray-600">
            Review and master your learning with spaced repetition
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={fetchFlashcards} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-sm text-gray-600">New</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.learning}
            </div>
            <div className="text-sm text-gray-600">Learning</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.review}
            </div>
            <div className="text-sm text-gray-600">Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.mastered}
            </div>
            <div className="text-sm text-gray-600">Mastered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.due}</div>
            <div className="text-sm text-gray-600">Due</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'due' ? 'default' : 'outline'}
          onClick={() => setFilter('due')}
          size="sm"
        >
          Due Now
        </Button>
        <Button
          variant={filter === 'new' ? 'default' : 'outline'}
          onClick={() => setFilter('new')}
          size="sm"
        >
          New
        </Button>
        <Button
          variant={filter === 'learning' ? 'default' : 'outline'}
          onClick={() => setFilter('learning')}
          size="sm"
        >
          Learning
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All
        </Button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>
            {currentCardIndex + 1} of {flashcards.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Badge className={getDifficultyColor(currentCard.difficulty)}>
                {currentCard.difficulty}
              </Badge>
              <Badge className={getStatusColor(currentCard.status)}>
                {currentCard.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              {currentCard.repetitions} reviews
            </div>
          </div>
          <CardTitle className="text-xl">Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg leading-relaxed">{currentCard.question}</p>
          </div>

          {showAnswer ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Answer:</h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentCard.answer}
                </p>
              </div>

              {currentCard.explanation && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Explanation:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentCard.explanation}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-3">
                  How well did you know this?
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleReview(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Again (1)
                  </Button>
                  <Button
                    onClick={() => handleReview(2)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Hard (2)
                  </Button>
                  <Button
                    onClick={() => handleReview(3)}
                    variant="outline"
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Good (3)
                  </Button>
                  <Button
                    onClick={() => handleReview(4)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Easy (4)
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowAnswer(true)}
              className="w-full"
              size="lg"
            >
              Show Answer
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
