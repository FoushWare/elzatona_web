'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  ArrowLeft,
  Save,
  Eye,
  Target,
  Clock,
  BookOpen,
  Settings,
  Plus,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';
import { LearningCardsService } from '@/lib/learning-cards-service';
import { PlanQuestionsService } from '@/lib/plan-questions-service';
import type {
  LearningCard,
  LearningCardCategory,
  LearningCardTopic,
} from '@/types/learning-cards';
import type { PlanQuestion } from '@/lib/plan-questions-service';

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  category: string;
  tags?: string[];
}

export default function CardBasedPlanEditorPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params?.planId as string;

  // State management
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<LearningCard | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<LearningCardCategory | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<LearningCardTopic | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [planQuestions, setPlanQuestions] = useState<PlanQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  // Load all data
  useEffect(() => {
    loadData();
  }, [planId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Load learning cards
      const cardsData = await LearningCardsService.getAllCards();
      setCards(cardsData);

      // Load questions
      const questionsResponse = await fetch('/api/questions/unified');
      const questionsData = await questionsResponse.json();
      if (questionsData.success) {
        setQuestions(questionsData.data || []);
      }

      // Load plan questions (if any exist)
      await loadPlanQuestions();
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlanQuestions = async () => {
    try {
      const planQuestionsData =
        await PlanQuestionsService.getPlanQuestions(planId);
      setPlanQuestions(planQuestionsData);
    } catch (error) {
      console.error('Error loading plan questions:', error);
      setPlanQuestions([]);
    }
  };

  const toggleCardExpansion = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleTopicExpansion = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const handleCardClick = (card: LearningCard) => {
    setSelectedCard(card);
    setSelectedCategory(null);
    setSelectedTopic(null);
  };

  const handleCategoryClick = (category: LearningCardCategory) => {
    setSelectedCategory(category);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topic: LearningCardTopic) => {
    setSelectedTopic(topic);
  };

  const handleAddQuestionToPlan = async (questionId: string) => {
    if (!selectedCard) return;

    try {
      const planQuestionData = {
        planId,
        questionId,
        cardId: selectedCard.id,
        categoryId: selectedCategory?.id,
        topicId: selectedTopic?.id,
        order: planQuestions.length + 1,
      };

      await PlanQuestionsService.addQuestionToPlan(planQuestionData);

      // Reload plan questions to get the updated list
      await loadPlanQuestions();
    } catch (error) {
      console.error('Error adding question to plan:', error);
      // Show error message to user
      alert('Failed to add question to plan. It may already be assigned.');
    }
  };

  const handleRemoveQuestionFromPlan = async (planQuestionId: string) => {
    try {
      await PlanQuestionsService.removeQuestionFromPlan(planQuestionId);
      // Reload plan questions to get the updated list
      await loadPlanQuestions();
    } catch (error) {
      console.error('Error removing question from plan:', error);
      alert('Failed to remove question from plan.');
    }
  };

  const handleSavePlan = async () => {
    try {
      setIsSaving(true);

      // Get plan statistics
      const statistics = await PlanQuestionsService.getPlanStatistics(planId);

      // Here you would update the plan document with the statistics
      // For now, we'll just show a success message
      console.log('Plan saved with statistics:', statistics);
      alert(
        `Plan saved successfully! Total questions: ${statistics.totalQuestions}`
      );
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan.');
    } finally {
      setIsSaving(false);
    }
  };

  const getQuestionsForCard = (card: LearningCard) => {
    return planQuestions.filter(pq => pq.cardId === card.id);
  };

  const getQuestionsForTopic = (topic: LearningCardTopic) => {
    return questions.filter(q => topic.questionIds.includes(q.id));
  };

  const getCardTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'core-technologies': '#3B82F6',
      'framework-questions': '#10B981',
      'problem-solving': '#8B5CF6',
      'system-design': '#F59E0B',
    };
    return colors[type] || '#6B7280';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading plan editor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/admin/guided-learning')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Plans</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {planId} - Card-Based Learning Plan
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage learning cards and assign questions to your plan
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{planQuestions.length} questions assigned</span>
                  </span>
                  <span className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <Target className="w-4 h-4" />
                    <span>{cards.length} learning cards</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(`/guided-learning/${planId}`, '_blank')
                }
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>
              <Button
                size="sm"
                onClick={handleSavePlan}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Plan'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Questions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {planQuestions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Learning Cards
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cards.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Available Questions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {questions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Settings className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Plan Status
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Active
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Learning Cards */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Learning Cards ({cards.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 overflow-y-auto">
                  <div className="space-y-1 p-1">
                    {cards.map(card => (
                      <div key={card.id} className="space-y-1">
                        {/* Card Header */}
                        <div
                          className={`p-4 border-l-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            selectedCard?.id === card.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-transparent hover:border-gray-300'
                          }`}
                          onClick={() => handleCardClick(card)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{card.icon}</span>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {card.title}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                style={{
                                  backgroundColor: getCardTypeColor(card.type),
                                  color: 'white',
                                }}
                              >
                                {card.type}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleCardExpansion(card.id);
                                }}
                              >
                                {expandedCards.has(card.id) ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {card.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <span className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>
                                {getQuestionsForCard(card).length} assigned
                              </span>
                            </span>
                            <Badge
                              className={getDifficultyColor(
                                card.metadata.difficulty
                              )}
                            >
                              {card.metadata.difficulty}
                            </Badge>
                          </div>
                        </div>

                        {/* Card Categories (if expanded) */}
                        {expandedCards.has(card.id) &&
                          card.metadata.categories && (
                            <div className="ml-4 space-y-1">
                              {card.metadata.categories.map(category => (
                                <div key={category.id} className="space-y-1">
                                  {/* Category Header */}
                                  <div
                                    className={`p-3 border-l-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                      selectedCategory?.id === category.id
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                        : 'border-transparent hover:border-gray-300'
                                    }`}
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleCategoryClick(category);
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                        {category.name}
                                      </h4>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={e => {
                                          e.stopPropagation();
                                          toggleCategoryExpansion(category.id);
                                        }}
                                      >
                                        {expandedCategories.has(category.id) ? (
                                          <ChevronDown className="w-3 h-3" />
                                        ) : (
                                          <ChevronRight className="w-3 h-3" />
                                        )}
                                      </Button>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {category.description}
                                    </p>
                                  </div>

                                  {/* Category Topics (if expanded) */}
                                  {expandedCategories.has(category.id) &&
                                    category.topics && (
                                      <div className="ml-4 space-y-1">
                                        {category.topics.map(topic => (
                                          <div
                                            key={topic.id}
                                            className="space-y-1"
                                          >
                                            {/* Topic Header */}
                                            <div
                                              className={`p-2 border-l-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                                selectedTopic?.id === topic.id
                                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                                  : 'border-transparent hover:border-gray-300'
                                              }`}
                                              onClick={e => {
                                                e.stopPropagation();
                                                handleTopicClick(topic);
                                              }}
                                            >
                                              <div className="flex items-center justify-between">
                                                <h5 className="font-medium text-gray-900 dark:text-white text-xs">
                                                  {topic.name}
                                                </h5>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={e => {
                                                    e.stopPropagation();
                                                    toggleTopicExpansion(
                                                      topic.id
                                                    );
                                                  }}
                                                >
                                                  {expandedTopics.has(
                                                    topic.id
                                                  ) ? (
                                                    <ChevronDown className="w-3 h-3" />
                                                  ) : (
                                                    <ChevronRight className="w-3 h-3" />
                                                  )}
                                                </Button>
                                              </div>
                                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {topic.description}
                                              </p>
                                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {topic.questionIds.length}{' '}
                                                questions
                                              </div>
                                            </div>

                                            {/* Topic Questions (if expanded) */}
                                            {expandedTopics.has(topic.id) && (
                                              <div className="ml-4 space-y-1">
                                                {getQuestionsForTopic(
                                                  topic
                                                ).map((question: Question) => (
                                                  <div
                                                    key={question.id}
                                                    className="p-2 bg-gray-50 dark:bg-gray-800 rounded border-l-2 border-gray-300"
                                                  >
                                                    <div className="flex items-center justify-between">
                                                      <div className="flex-1">
                                                        <h6 className="text-xs font-medium text-gray-900 dark:text-white">
                                                          {question.title}
                                                        </h6>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                          <Badge
                                                            className={getDifficultyColor(
                                                              question.difficulty
                                                            )}
                                                            variant="outline"
                                                          >
                                                            {
                                                              question.difficulty
                                                            }
                                                          </Badge>
                                                          <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                          >
                                                            {question.category}
                                                          </Badge>
                                                        </div>
                                                      </div>
                                                      <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                          handleAddQuestionToPlan(
                                                            question.id
                                                          )
                                                        }
                                                        className="text-xs"
                                                      >
                                                        <Plus className="w-3 h-3" />
                                                      </Button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Selected Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>
                    {selectedCard
                      ? `${selectedCard.title}`
                      : 'Select a Learning Card'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedCard ? (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Card Selected
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Click on a learning card from the left panel to view its
                      details and manage questions
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Card Details */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{selectedCard.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {selectedCard.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCard.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <Badge
                          style={{
                            backgroundColor: getCardTypeColor(
                              selectedCard.type
                            ),
                            color: 'white',
                          }}
                        >
                          {selectedCard.type}
                        </Badge>
                        <Badge
                          className={getDifficultyColor(
                            selectedCard.metadata.difficulty
                          )}
                        >
                          {selectedCard.metadata.difficulty}
                        </Badge>
                        <span className="text-gray-500 dark:text-gray-400">
                          {selectedCard.metadata.estimatedTime}
                        </span>
                      </div>
                    </div>

                    {/* Selected Category/Topic Info */}
                    {selectedCategory && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                          Selected Category: {selectedCategory.name}
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {selectedCategory.description}
                        </p>
                      </div>
                    )}

                    {selectedTopic && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                          Selected Topic: {selectedTopic.name}
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          {selectedTopic.description}
                        </p>
                        <div className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                          {getQuestionsForTopic(selectedTopic).length} questions
                          available
                        </div>
                      </div>
                    )}

                    {/* Assigned Questions */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Assigned Questions (
                        {getQuestionsForCard(selectedCard).length})
                      </h4>
                      {getQuestionsForCard(selectedCard).length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 dark:text-gray-400">
                            No questions assigned to this card yet
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {getQuestionsForCard(selectedCard).map(
                            planQuestion => {
                              const question = questions.find(
                                q => q.id === planQuestion.questionId
                              );
                              if (!question) return null;

                              return (
                                <div
                                  key={planQuestion.id}
                                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-medium text-gray-900 dark:text-white">
                                        {question.title}
                                      </h5>
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                        {question.content}
                                      </p>
                                      <div className="flex items-center space-x-2 mt-2">
                                        <Badge
                                          className={getDifficultyColor(
                                            question.difficulty
                                          )}
                                          variant="outline"
                                        >
                                          {question.difficulty}
                                        </Badge>
                                        <Badge variant="outline">
                                          {question.category}
                                        </Badge>
                                      </div>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleRemoveQuestionFromPlan(
                                          planQuestion.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
