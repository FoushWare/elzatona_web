'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Play,
  ArrowRight,
  Loader2,
  Zap,
  XCircle,
  Info,
  BookmarkPlus,
  BookmarkCheck,
  ShoppingCart,
  BarChart3,
} from 'lucide-react';
import { addFlashcard, isInFlashcards } from '../../lib/flashcards';
import { addToCart } from '../../lib/cart';
import { useNotifications } from '@/components/NotificationSystem';
import { useLearningType } from '../../context/LearningTypeContext';
import ProblemSolvingQuestion from '@/components/ProblemSolvingQuestion';

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  type: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correct_answer?: string;
  explanation?: string;
  code_template?: string;
  test_cases?: any;
  examples?: Array<{
    input: any | Record<string, any>;
    output: any;
    explanation?: string;
  }> | string;
  hints?: string[] | null;
  constraints?: string[] | null;
  tags?: string[] | null;
  language?: string;
  topic_id?: string;
  topic_name?: string;
  topic_description?: string;
}

interface Topic {
  id: string;
  name: string;
  questions: Question[];
  questionCount: number;
}

interface Category {
  id: string;
  name: string;
  topics: Topic[];
  questionCount: number;
}

interface Card {
  id: string;
  title: string;
  type: string;
  description: string;
  color: string;
  icon: string;
  categories: Category[];
  questionCount: number;
  hasQuestions: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  cards: Card[];
  totalQuestions: number;
}

interface Progress {
  planId: string;
  completedQuestions: string[];
  completedTopics: string[];
  completedCategories: string[];
  completedCards: string[];
  correctAnswers: string[]; // Track correct answers for scoring
  currentPosition: {
    cardIndex: number;
    categoryIndex: number;
    topicIndex: number;
    questionIndex: number;
  };
  lastUpdated: string;
}

// Component to render text with inline code snippets
const OptionText = ({ text }: { text: string }) => {
  if (!text) return null;

  // Parse inline code snippets (backticks)
  const parts: Array<{ type: 'text' | 'code'; content: string }> = [];
  const inlineCodeRegex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match;

  while ((match = inlineCodeRegex.exec(text)) !== null) {
    // Add text before code
    if (match.index > lastIndex) {
      const textContent = text.substring(lastIndex, match.index);
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // Add inline code
    parts.push({ type: 'code', content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const textContent = text.substring(lastIndex);
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // If no code snippets found, render as plain text
  if (parts.length === 0) {
    return <span>{text}</span>;
  }

  return (
    <span className='flex-1 text-left'>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <code
              key={index}
              className='px-2 py-1 mx-0.5 rounded-md font-mono text-sm sm:text-base shadow-sm border'
              style={{ 
                background: 'linear-gradient(to bottom right, #1f2937, #111827)', 
                color: '#f3f4f6',
                borderColor: '#374151'
              }}
            >
              {part.content}
            </code>
          );
        } else {
          return <span key={index}>{part.content}</span>;
        }
      })}
    </span>
  );
};

// Component to render question content with code blocks
const QuestionContent = ({ content }: { content: string }) => {
  if (!content) return null;

  // Parse content to extract code blocks and text
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.substring(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // Add code block
    const language = match[1] || 'javascript';
    const code = match[2].trim();
    parts.push({ type: 'code', content: code, language });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textContent = content.substring(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // If no code blocks found, render as plain text
  if (parts.length === 0) {
    return (
      <p className='text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap'>
        {content}
      </p>
    );
  }

  return (
    <div className='space-y-4 sm:space-y-5'>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <div key={index} className='relative group' style={{ backgroundColor: '#111827' }}>
              {/* Code block header with macOS-style window controls */}
              <div className='flex items-center justify-between px-4 py-2.5 rounded-t-xl border-b-2 shadow-sm' style={{ background: 'linear-gradient(to right, #1f2937, #111827)', borderColor: '#374151' }}>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-red-500 shadow-sm hover:bg-red-600 transition-colors'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-500 shadow-sm hover:bg-yellow-600 transition-colors'></div>
                  <div className='w-3 h-3 rounded-full bg-green-500 shadow-sm hover:bg-green-600 transition-colors'></div>
                </div>
                <span className='text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md' style={{ color: '#e5e7eb', backgroundColor: 'rgba(55, 65, 81, 0.5)' }}>
                  {part.language || 'code'}
                </span>
              </div>
              {/* Code block content - Always dark background for readability */}
              <div className='relative overflow-hidden rounded-b-xl border-x-2 border-b-2 shadow-lg' style={{ backgroundColor: '#111827', borderColor: '#374151' }}>
                <pre 
                  className='overflow-x-auto relative z-10' 
                  style={{ 
                    backgroundColor: '#111827', 
                    margin: 0, 
                    padding: '1rem 1.25rem',
                    color: '#f3f4f6',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                    overflowX: 'auto',
                    whiteSpace: 'pre'
                  }}
                >
                  <code 
                    style={{ 
                      color: '#f3f4f6', 
                      display: 'block', 
                      backgroundColor: 'transparent',
                      fontFamily: 'inherit',
                      whiteSpace: 'pre',
                      margin: 0,
                      padding: 0,
                      fontSize: 'inherit',
                      lineHeight: 'inherit'
                    }}
                  >
                    {part.content}
                  </code>
                </pre>
                {/* Subtle gradient overlay for depth - moved behind content */}
                <div className='absolute inset-0 pointer-events-none rounded-b-xl z-0' style={{ background: 'linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.2))' }}></div>
              </div>
            </div>
          );
        } else {
          return (
            <p
              key={index}
              className='text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap'
            >
              {part.content}
            </p>
          );
        }
      })}
    </div>
  );
};

export default function GuidedPracticePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { setLearningType } = useLearningType();
  const planId = searchParams?.get('plan');
  const categoryId = searchParams?.get('category');
  const cardId = searchParams?.get('card');

  const [plan, setPlan] = useState<Plan | null>(null);

  // Set learning type to 'guided' when component mounts to hide cart icon
  useEffect(() => {
    setLearningType('guided');
  }, [setLearningType]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [inFlashcards, setInFlashcards] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<{
    correct: number;
    total: number;
    percentage: number;
  } | null>(null);

  // Progress management functions
  const getProgressKey = () => `guided-practice-progress-${planId}`;

  const loadProgress = (): Progress | null => {
    if (!planId) return null;
    try {
      const saved = localStorage.getItem(getProgressKey());
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  };

  const saveProgress = (newProgress: Progress) => {
    if (!planId) return;
    try {
      localStorage.setItem(getProgressKey(), JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const resetProgress = (planData?: Plan) => {
    if (!planId) return;
    try {
      localStorage.removeItem(getProgressKey());
      const newProgress = initializeProgress();
      setProgress(newProgress);
      saveProgress(newProgress);
      if (planData) {
        findFirstQuestion(planData);
      } else if (plan) {
        findFirstQuestion(plan);
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  // Sync localStorage progress to database
  const syncProgressToDatabase = async () => {
    if (!progress || !planId) return;

    try {
      const response = await fetch('/api/progress/guided-learning/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          completedQuestions: progress.completedQuestions,
          completedTopics: progress.completedTopics,
          completedCategories: progress.completedCategories,
          completedCards: progress.completedCards,
          currentPosition: progress.currentPosition,
          lastUpdated: progress.lastUpdated,
        }),
      });

      if (response.ok) {
        console.log('✅ Progress synced to database');
      }
    } catch (error) {
      console.error('❌ Error syncing progress to database:', error);
    }
  };

  // Load progress from database on mount
  const loadProgressFromDatabase = async () => {
    if (!planId) return;

    try {
      const response = await fetch(
        `/api/progress/guided-learning/load?planId=${planId}`
      );
      const data = await response.json();

      if (data.success && data.progress) {
        // Merge database progress with localStorage if localStorage has more recent data
        const localProgress = loadProgress();

        if (
          !localProgress ||
          new Date(data.progress.lastUpdated) >
            new Date(localProgress.lastUpdated)
        ) {
          // Database is more recent, use it
          console.log('📥 Loading progress from database');
          setProgress(data.progress);
          saveProgress(data.progress);
        }
      }
    } catch (error) {
      console.error('❌ Error loading progress from database:', error);
    }
  };

  const initializeProgress = (): Progress => {
    return {
      planId: planId!,
      completedQuestions: [],
      completedTopics: [],
      completedCategories: [],
      completedCards: [],
      correctAnswers: [],
      currentPosition: {
        cardIndex: 0,
        categoryIndex: 0,
        topicIndex: 0,
        questionIndex: 0,
      },
      lastUpdated: new Date().toISOString(),
    };
  };

  const markQuestionCompleted = (questionId: string) => {
    // Always get the latest progress from localStorage to avoid stale state
    const latestProgress = loadProgress();
    if (!latestProgress) {
      console.error(
        '❌ No progress found when marking question completed:',
        questionId
      );
      return;
    }

    // Prevent duplicates
    if (latestProgress.completedQuestions.includes(questionId)) {
      console.log('⚠️ Question already marked as completed:', questionId);
      return;
    }

    console.log('✅ Marking question as completed:', {
      questionId,
      currentCompletedCount: latestProgress.completedQuestions.length,
      willBeCompletedCount: latestProgress.completedQuestions.length + 1,
    });

    const updatedProgress = {
      ...latestProgress,
      completedQuestions: [...latestProgress.completedQuestions, questionId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  const markTopicCompleted = (topicId: string) => {
    if (!progress) return;
    const updatedProgress = {
      ...progress,
      completedTopics: [...progress.completedTopics, topicId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  const markCategoryCompleted = (categoryId: string) => {
    if (!progress) return;
    const updatedProgress = {
      ...progress,
      completedCategories: [...progress.completedCategories, categoryId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  const markCardCompleted = (cardId: string) => {
    if (!progress) return;
    const updatedProgress = {
      ...progress,
      completedCards: [...progress.completedCards, cardId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  // Load progress from database on mount
  useEffect(() => {
    loadProgressFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  // Sync progress to database when it changes
  useEffect(() => {
    if (progress) {
      // Debounce database sync to avoid too many requests
      const timeoutId = setTimeout(() => {
        syncProgressToDatabase();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Fetch plan data
  useEffect(() => {
    const fetchPlanData = async () => {
      if (!planId) {
        setError('Plan ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(
          `${baseUrl}/api/guided-learning/plan-details/${planId}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch plan data: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error('API returned success: false');
        }

        setPlan(data.data);

        // Load or initialize progress
        const savedProgress = loadProgress();
        if (savedProgress) {
          // Ensure correctAnswers exists (for legacy data)
          if (!savedProgress.correctAnswers) {
            savedProgress.correctAnswers = [];
          }

          setProgress(savedProgress);

          // Check if all questions are completed
          const totalQuestionsWithOptions = data.data.cards.reduce(
            (total: number, card: Card) => {
              return (
                total +
                card.categories.reduce(
                  (catTotal: number, category: Category) => {
                    return (
                      catTotal +
                      category.topics.reduce(
                        (topicTotal: number, topic: Topic) => {
                          return (
                            topicTotal +
                            topic.questions.filter(
                              (q: Question) =>
                                q.options &&
                                Array.isArray(q.options) &&
                                q.options.length > 0
                            ).length
                          );
                        },
                        0
                      )
                    );
                  },
                  0
                )
              );
            },
            0
          );

          if (
            savedProgress.completedQuestions.length >=
              totalQuestionsWithOptions &&
            totalQuestionsWithOptions > 0
          ) {
            // Plan is completed, show score screen
            const correctCount = savedProgress.correctAnswers.length;
            const completedCount = savedProgress.completedQuestions.length;
            const percentage =
              completedCount > 0
                ? Math.round((correctCount / completedCount) * 100)
                : 0;
            setIsCompleted(true);
            setFinalScore({
              correct: correctCount,
              total: completedCount,
              percentage,
            });
          } else {
            resumeFromProgress(data.data, savedProgress);
          }
        } else {
          const newProgress = initializeProgress();
          setProgress(newProgress);
          saveProgress(newProgress);
          console.log('🔍 Initializing new progress, finding first question with filters:', {
            cardId,
            categoryId,
            planId,
          });
          findFirstQuestion(data.data);
        }
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setError('Failed to load plan data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]); // cardId and categoryId are read from searchParams, so they're available

  const resumeFromProgress = (planData: Plan, savedProgress: Progress) => {
    const { currentPosition } = savedProgress;

    console.log('🔍 resumeFromProgress called with filters:', {
      cardId,
      categoryId,
      savedPosition: currentPosition,
    });

    // Try to resume from saved position
    if (currentPosition.cardIndex < planData.cards.length) {
      const card = planData.cards[currentPosition.cardIndex];
      
      // Check if saved position matches cardId filter
      if (cardId && card.id !== cardId) {
        console.log('⏭️ Saved position card does not match cardId filter, skipping resume');
        // Don't resume - find first question with filter instead
        findFirstQuestion(planData);
        return;
      }

      if (currentPosition.categoryIndex < card.categories.length) {
        const category = card.categories[currentPosition.categoryIndex];
        
        // Check if saved position matches categoryId filter
        if (categoryId && category.id !== categoryId) {
          console.log('⏭️ Saved position category does not match categoryId filter, skipping resume');
          // Don't resume - find first question with filter instead
          findFirstQuestion(planData);
          return;
        }

        if (currentPosition.topicIndex < category.topics.length) {
          const topic = category.topics[currentPosition.topicIndex];
          if (
            topic.questions &&
            currentPosition.questionIndex < topic.questions.length
          ) {
            const question = topic.questions[currentPosition.questionIndex];

            // Check if this question is already completed and has options (for multiple choice) or is a code question
            const hasOptions = question.options &&
              Array.isArray(question.options) &&
              question.options.length > 0;
            const isCodeQuestion = question.type === 'code';
            
            if (
              !savedProgress.completedQuestions.includes(question.id) &&
              (hasOptions || isCodeQuestion)
            ) {
              console.log('✅ Resuming from saved position:', {
                cardTitle: card.title,
                categoryName: category.name,
                questionTitle: question.title?.substring(0, 50),
              });
              setCurrentQuestion(question);
              setCurrentQuestionIndex(currentPosition.questionIndex);
              setCurrentTopicIndex(currentPosition.topicIndex);
              setCurrentCategoryIndex(currentPosition.categoryIndex);
              setCurrentCardIndex(currentPosition.cardIndex);
              return;
            }
          }
        }
      }
    }

    // If we can't resume from saved position, find next incomplete question
    console.log('⚠️ Cannot resume from saved position, finding first question with filters');
    findNextIncompleteQuestion(planData, savedProgress);
  };

  const findFirstQuestion = (planData: Plan) => {
    console.log('🔍 findFirstQuestion called with:', {
      cardId,
      categoryId,
      totalCards: planData.cards.length,
      cardTitles: planData.cards.map(c => c.title),
    });

    // If categoryId is specified, find which card contains that category
    let cardsToSearch = planData.cards;
    if (categoryId) {
      const cardWithCategory = planData.cards.find(card =>
        card.categories.some(cat => cat.id === categoryId)
      );
      if (cardWithCategory) {
        cardsToSearch = [cardWithCategory];
        console.log('🔍 Filtering by categoryId - found card:', {
          categoryId,
          cardTitle: cardWithCategory.title,
          cardId: cardWithCategory.id,
        });
      } else {
        console.warn('⚠️ No card found containing categoryId:', categoryId);
        return;
      }
    } else if (cardId) {
      // If cardId is specified, only search within that card
      cardsToSearch = planData.cards.filter(card => card.id === cardId);
      console.log('🔍 Filtering by cardId:', {
        cardId,
        matchingCards: cardsToSearch.map(c => ({ id: c.id, title: c.title })),
      });
      if (cardsToSearch.length === 0) {
        console.warn('⚠️ No cards found matching cardId:', cardId);
        return;
      }
    }

    // Define the sequential order for cards
    const cardOrder = [
      'Core Technologies',
      'Framework Questions',
      'Problem Solving',
      'System Design',
      'Frontend Tasks',
    ];

    let foundQuestion: Question | null = null;
    let foundQuestionIndex = 0;
    let foundTopicIndex = 0;
    let foundCategoryIndex = 0;
    let foundCardIndex = 0;

    // Find cards in the specified order (only from cardsToSearch)
    for (const cardTitle of cardOrder) {
      const cardIndex = cardsToSearch.findIndex(card =>
        card.title.toLowerCase().includes(cardTitle.toLowerCase())
      );

      if (cardIndex !== -1) {
        const card = cardsToSearch[cardIndex];
        const actualCardIndex = planData.cards.findIndex(c => c.id === card.id);

        console.log('🔍 Checking card:', {
          cardTitle: card.title,
          cardId: card.id,
          requestedCardId: cardId,
          matches: !cardId || card.id === cardId,
          categoriesCount: card.categories.length,
        });

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) {
            console.log('⏭️ Skipping category (does not match categoryId filter):', {
              categoryName: category.name,
              categoryId: category.id,
              requestedCategoryId: categoryId,
            });
            continue;
          }

          for (
            let topicIndex = 0;
            topicIndex < category.topics.length;
            topicIndex++
          ) {
            const topic = category.topics[topicIndex];

            if (topic.questions && topic.questions.length > 0) {
              // Find first question with options (for multiple choice) or code question
              const questionWithOptions = topic.questions.find(
                q => {
                  const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
                  const isCodeQuestion = q.type === 'code';
                  return hasOptions || isCodeQuestion;
                }
              );

              if (questionWithOptions) {
                foundQuestion = questionWithOptions;
                foundQuestionIndex =
                  topic.questions.indexOf(questionWithOptions);
                foundTopicIndex = topicIndex;
                foundCategoryIndex = categoryIndex;
                foundCardIndex = actualCardIndex;
                console.log('✅ Found first question in card:', {
                  cardTitle: card.title,
                  categoryName: category.name,
                  topicName: topic.name,
                  questionTitle: foundQuestion.title?.substring(0, 50),
                });
                break;
              }
            }
          }
          if (foundQuestion) break;
        }
      }
      if (foundQuestion) break;
    }

    // Fallback: find any available question (only within the specified card/category if provided)
    // If cardId or categoryId is specified, we MUST find a question within that scope
    if (!foundQuestion) {
      if (cardId || categoryId) {
        console.warn('⚠️ No questions found in the specified card/category:', {
          cardId,
          categoryId,
          cardsSearched: cardsToSearch.map(c => ({ id: c.id, title: c.title })),
        });
        // Don't fall back to other cards if a specific card/category was requested
        return;
      }

      console.log('⚠️ No question found in ordered search, trying fallback (no card/category filter)...');
      for (let cardIndex = 0; cardIndex < cardsToSearch.length; cardIndex++) {
        const card = cardsToSearch[cardIndex];
        const actualCardIndex = planData.cards.findIndex(c => c.id === card.id);

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) {
            console.log('⏭️ Skipping category (does not match categoryId filter):', {
              categoryName: category.name,
              categoryId: category.id,
              requestedCategoryId: categoryId,
            });
            continue;
          }

          for (
            let topicIndex = 0;
            topicIndex < category.topics.length;
            topicIndex++
          ) {
            const topic = category.topics[topicIndex];

            if (topic.questions && topic.questions.length > 0) {
              // Find first question with options
              const questionWithOptions = topic.questions.find(
                q =>
                  q.options && Array.isArray(q.options) && q.options.length > 0
              );

              if (questionWithOptions) {
                foundQuestion = questionWithOptions;
                foundQuestionIndex =
                  topic.questions.indexOf(questionWithOptions);
                foundTopicIndex = topicIndex;
                foundCategoryIndex = categoryIndex;
                foundCardIndex = actualCardIndex;
                break;
              }
            }
          }
          if (foundQuestion) break;
        }
        if (foundQuestion) break;
      }
    }

    // Set all state at once if we found a question
    if (foundQuestion) {
      const foundCard = planData.cards[foundCardIndex];
      console.log('✅ Found first question:', {
        id: foundQuestion.id,
        title: foundQuestion.title?.substring(0, 50),
        hasOptions: foundQuestion.options?.length || 0,
        cardTitle: foundCard?.title,
        cardId: foundCard?.id,
        requestedCardId: cardId,
        matchesCardFilter: !cardId || foundCard?.id === cardId,
        categoryIndex: foundCategoryIndex,
        topicIndex: foundTopicIndex,
        questionIndex: foundQuestionIndex,
      });

      // Verify the question is from the correct card if cardId is specified
      if (cardId && foundCard?.id !== cardId) {
        console.error('❌ ERROR: Question found from wrong card!', {
          foundCardId: foundCard?.id,
          foundCardTitle: foundCard?.title,
          requestedCardId: cardId,
          requestedCardTitle: planData.cards.find(c => c.id === cardId)?.title,
          questionId: foundQuestion.id,
        });
        console.warn('⚠️ Not showing question - it belongs to a different card');
        setError(`No questions found in the selected card. Please try a different card or category.`);
        setIsLoading(false);
        return; // Don't show the question if it's from the wrong card
      }

      // Verify the question is from the correct category if categoryId is specified
      const foundCategory = foundCard?.categories[foundCategoryIndex];
      if (categoryId && foundCategory?.id !== categoryId) {
        console.error('❌ ERROR: Question found from wrong category!', {
          foundCategoryId: foundCategory?.id,
          foundCategoryName: foundCategory?.name,
          requestedCategoryId: categoryId,
          requestedCategoryName: planData.cards
            .flatMap(c => c.categories)
            .find(c => c.id === categoryId)?.name,
          questionId: foundQuestion.id,
          questionTitle: foundQuestion.title?.substring(0, 50),
        });
        console.warn('⚠️ Not showing question - it belongs to a different category');
        setError(`No questions found in the selected category. Please try a different category.`);
        setIsLoading(false);
        return; // Don't show the question if it's from the wrong category
      }

      setCurrentQuestion(foundQuestion);
      setCurrentQuestionIndex(foundQuestionIndex);
      setCurrentTopicIndex(foundTopicIndex);
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentCardIndex(foundCardIndex);
    } else {
      console.warn('⚠️ No question with options found in plan data', {
        cardId,
        categoryId,
        totalCards: planData.cards.length,
      });
    }
  };

  const findNextIncompleteQuestion = (
    planData: Plan,
    savedProgress: Progress
  ) => {
    console.log('🔍 findNextIncompleteQuestion called with:', {
      cardId,
      categoryId,
      totalCards: planData.cards.length,
    });

    // If categoryId is specified, find which card contains that category
    let cardsToSearch = planData.cards;
    if (categoryId) {
      const cardWithCategory = planData.cards.find(card =>
        card.categories.some(cat => cat.id === categoryId)
      );
      if (cardWithCategory) {
        cardsToSearch = [cardWithCategory];
        console.log('🔍 Filtering by categoryId - found card:', {
          categoryId,
          cardTitle: cardWithCategory.title,
          cardId: cardWithCategory.id,
        });
      } else {
        console.warn('⚠️ No card found containing categoryId:', categoryId);
        return;
      }
    } else if (cardId) {
      // If cardId is specified, only search within that card
      cardsToSearch = planData.cards.filter(card => card.id === cardId);
      console.log('🔍 Filtering by cardId:', {
        cardId,
        matchingCards: cardsToSearch.map(c => ({ id: c.id, title: c.title })),
      });
      if (cardsToSearch.length === 0) {
        console.warn('⚠️ No cards found matching cardId:', cardId);
        return;
      }
    }

    let foundQuestion: Question | null = null;
    let foundQuestionIndex = 0;
    let foundTopicIndex = 0;
    let foundCategoryIndex = 0;
    let foundCardIndex = 0;

    // Find next incomplete question following the sequential order of cards in the plan
    for (let cardIdx = 0; cardIdx < cardsToSearch.length; cardIdx++) {
      const card = cardsToSearch[cardIdx];
      const actualCardIndex = planData.cards.findIndex(c => c.id === card.id);

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) {
            console.log('⏭️ Skipping category (does not match categoryId filter):', {
              categoryName: category.name,
              categoryId: category.id,
              requestedCategoryId: categoryId,
            });
            continue;
          }

          for (
            let topicIndex = 0;
            topicIndex < category.topics.length;
            topicIndex++
          ) {
            const topic = category.topics[topicIndex];

            if (topic.questions && topic.questions.length > 0) {
              for (
                let questionIndex = 0;
                questionIndex < topic.questions.length;
                questionIndex++
              ) {
                const question = topic.questions[questionIndex];

                // Check if this question is not completed and has options (for multiple choice) or is a code question
                const hasOptions = question.options &&
                  Array.isArray(question.options) &&
                  question.options.length > 0;
                const isCodeQuestion = question.type === 'code';
                
                if (
                  !savedProgress.completedQuestions.includes(question.id) &&
                  (hasOptions || isCodeQuestion)
                ) {
                  foundQuestion = question;
                  foundQuestionIndex = questionIndex;
                  foundTopicIndex = topicIndex;
                  foundCategoryIndex = categoryIndex;
                  foundCardIndex = actualCardIndex;
                  console.log('✅ Found next incomplete question in card:', {
                    cardTitle: card.title,
                    categoryName: category.name,
                    topicName: topic.name,
                    questionTitle: question.title?.substring(0, 50),
                  });
                  break;
                }
              }
            }
            if (foundQuestion) break;
          }
          if (foundQuestion) break;
      }
      if (foundQuestion) break;
    }

    // Set all state at once if we found a question
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
      setCurrentQuestionIndex(foundQuestionIndex);
      setCurrentTopicIndex(foundTopicIndex);
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentCardIndex(foundCardIndex);
    }
    // Fallback: if no next incomplete question found, start from first available
    else {
      findFirstQuestion(planData);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (currentAnswer) return; // Already answered
    setCurrentAnswer(answer);
    setShowExplanation(true);

    // Mark question as completed
    if (currentQuestion) {
      console.log('📝 Answer selected for question:', {
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        answer,
      });

      markQuestionCompleted(currentQuestion.id);

      // Track correct answers for scoring - get latest progress after marking completed
      const latestProgress = loadProgress();
      const correct = isCorrectAnswer(answer);

      console.log('🎯 Answer correctness:', {
        questionId: currentQuestion.id,
        isCorrect: correct,
        selectedAnswer: answer,
      });

      if (latestProgress) {
        if (
          correct &&
          !latestProgress.correctAnswers.includes(currentQuestion.id)
        ) {
          const updatedProgress = {
            ...latestProgress,
            correctAnswers: [
              ...latestProgress.correctAnswers,
              currentQuestion.id,
            ],
            lastUpdated: new Date().toISOString(),
          };
          saveProgress(updatedProgress);
        }
      }

      // Auto-add to flashcards on wrong answer
      if (!correct) {
        try {
          addFlashcard({
            id: currentQuestion.id,
            question:
                        currentQuestion.title || currentQuestion.content || '',
            section: currentCategory?.name,
            difficulty: currentQuestion.difficulty,
            addedAt: Date.now(),
          });
          setInFlashcards(true);
        } catch (_) {}
      }
    }
  };

  const proceedToNext = () => {
    if (!plan || !currentQuestion) {
      console.warn('⚠️ Cannot proceed: plan or currentQuestion is missing');
      return;
    }

    console.log('➡️ Proceeding to next question in sequence...', {
      currentQuestionId: currentQuestion.id,
      currentQuestionTitle: currentQuestion.title?.substring(0, 50),
      currentCardIndex,
      currentCategoryIndex,
      currentTopicIndex,
      currentQuestionIndex,
    });

    // Get current position
    const currentCard = plan.cards[currentCardIndex];
    if (!currentCard) {
      console.error('❌ Current card not found');
      return;
    }

    const currentCategory = currentCard.categories[currentCategoryIndex];
    if (!currentCategory) {
      console.error('❌ Current category not found');
      return;
    }

    const currentTopic = currentCategory.topics[currentTopicIndex];
    if (!currentTopic) {
      console.error('❌ Current topic not found');
      return;
    }

    // Try to find next question in current topic
    if (currentQuestionIndex + 1 < currentTopic.questions.length) {
      // Next question in same topic
      const nextQuestion = currentTopic.questions[currentQuestionIndex + 1];
      const hasOptions = nextQuestion.options && Array.isArray(nextQuestion.options) && nextQuestion.options.length > 0;
      const isCodeQuestion = nextQuestion.type === 'code';
      
      if (hasOptions || isCodeQuestion) {
        console.log('✅ Found next question in same topic:', {
          questionId: nextQuestion.id,
          questionTitle: nextQuestion.title?.substring(0, 50),
        });
        
        setCurrentQuestion(nextQuestion);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        
        // Update progress
        const latestProgress = loadProgress();
        if (latestProgress) {
          const updatedProgress = {
            ...latestProgress,
            currentPosition: {
              cardIndex: currentCardIndex,
              categoryIndex: currentCategoryIndex,
              topicIndex: currentTopicIndex,
              questionIndex: currentQuestionIndex + 1,
            },
            lastUpdated: new Date().toISOString(),
          };
          saveProgress(updatedProgress);
        }
        
        setCurrentAnswer(null);
        setShowExplanation(false);
        return;
      }
    }

    // Try next topic in same category
    if (currentTopicIndex + 1 < currentCategory.topics.length) {
      const nextTopic = currentCategory.topics[currentTopicIndex + 1];
      if (nextTopic.questions && nextTopic.questions.length > 0) {
        // Find first valid question in next topic
        const nextQuestion = nextTopic.questions.find(q => {
          const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
          const isCodeQuestion = q.type === 'code';
          return hasOptions || isCodeQuestion;
        });
        
        if (nextQuestion) {
          const questionIndex = nextTopic.questions.indexOf(nextQuestion);
          console.log('✅ Found next question in next topic:', {
            questionId: nextQuestion.id,
            questionTitle: nextQuestion.title?.substring(0, 50),
          });
          
          setCurrentQuestion(nextQuestion);
          setCurrentQuestionIndex(questionIndex);
          setCurrentTopicIndex(currentTopicIndex + 1);

          // Update progress
          const latestProgress = loadProgress();
          if (latestProgress) {
            const updatedProgress = {
              ...latestProgress,
              currentPosition: {
                cardIndex: currentCardIndex,
                categoryIndex: currentCategoryIndex,
                topicIndex: currentTopicIndex + 1,
                questionIndex,
              },
              lastUpdated: new Date().toISOString(),
            };
            saveProgress(updatedProgress);
          }
          
          setCurrentAnswer(null);
          setShowExplanation(false);
          return;
        }
      }
    }

    // Try next category in same card
    if (currentCategoryIndex + 1 < currentCard.categories.length) {
      const nextCategory = currentCard.categories[currentCategoryIndex + 1];

      // Find first valid question in next category
      for (let topicIndex = 0; topicIndex < nextCategory.topics.length; topicIndex++) {
        const topic = nextCategory.topics[topicIndex];
            if (topic.questions && topic.questions.length > 0) {
          const nextQuestion = topic.questions.find(q => {
            const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
            const isCodeQuestion = q.type === 'code';
            return hasOptions || isCodeQuestion;
          });
          
          if (nextQuestion) {
            const questionIndex = topic.questions.indexOf(nextQuestion);
            console.log('✅ Found next question in next category:', {
              questionId: nextQuestion.id,
              questionTitle: nextQuestion.title?.substring(0, 50),
            });
            
            setCurrentQuestion(nextQuestion);
            setCurrentQuestionIndex(questionIndex);
            setCurrentTopicIndex(topicIndex);
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            
            // Update progress
            const latestProgress = loadProgress();
            if (latestProgress) {
              const updatedProgress = {
                ...latestProgress,
                currentPosition: {
                  cardIndex: currentCardIndex,
                  categoryIndex: currentCategoryIndex + 1,
                    topicIndex,
                    questionIndex,
                },
                lastUpdated: new Date().toISOString(),
              };
              saveProgress(updatedProgress);
            }
            
            setCurrentAnswer(null);
            setShowExplanation(false);
            return;
          }
        }
      }
    }

    // Try next card
    if (currentCardIndex + 1 < plan.cards.length) {
      const nextCard = plan.cards[currentCardIndex + 1];
      
      // Find first valid question in next card
      for (let categoryIndex = 0; categoryIndex < nextCard.categories.length; categoryIndex++) {
        const category = nextCard.categories[categoryIndex];
        
        for (let topicIndex = 0; topicIndex < category.topics.length; topicIndex++) {
          const topic = category.topics[topicIndex];
          if (topic.questions && topic.questions.length > 0) {
            const nextQuestion = topic.questions.find(q => {
              const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
              const isCodeQuestion = q.type === 'code';
              return hasOptions || isCodeQuestion;
            });
            
            if (nextQuestion) {
              const questionIndex = topic.questions.indexOf(nextQuestion);
              console.log('✅ Found next question in next card:', {
                questionId: nextQuestion.id,
                questionTitle: nextQuestion.title?.substring(0, 50),
              });
              
              setCurrentQuestion(nextQuestion);
              setCurrentQuestionIndex(questionIndex);
              setCurrentTopicIndex(topicIndex);
              setCurrentCategoryIndex(categoryIndex);
              setCurrentCardIndex(currentCardIndex + 1);

              // Update progress
              const latestProgress = loadProgress();
              if (latestProgress) {
      const updatedProgress = {
                  ...latestProgress,
        currentPosition: {
                    cardIndex: currentCardIndex + 1,
                    categoryIndex,
                    topicIndex,
                    questionIndex,
        },
        lastUpdated: new Date().toISOString(),
      };
      saveProgress(updatedProgress);
              }

      setCurrentAnswer(null);
      setShowExplanation(false);
      return;
            }
          }
        }
      }
    }

    // If we reach here, we're at the last question
    console.log('ℹ️ Already at the last question');
    const latestProgress = loadProgress();
    if (latestProgress) {
      const completedCount = latestProgress.completedQuestions.length;
      const correctCount = latestProgress.correctAnswers.length;
      const percentage = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;
      
      setIsCompleted(true);
      setFinalScore({ correct: correctCount, total: completedCount, percentage });
    }

    // If we reach here, all questions are completed
    const completedCount = progress.completedQuestions.length;
    const correctCount = progress.correctAnswers.length;
    const percentage =
      completedCount > 0
        ? Math.round((correctCount / completedCount) * 100)
        : 0;

    // Mark plan as completed
    setIsCompleted(true);
    setFinalScore({ correct: correctCount, total: completedCount, percentage });

    // Save completion and score to localStorage
    if (planId) {
      try {
        // Save completed plan
        const completedPlansData = localStorage.getItem(
          'completed-guided-plans'
        );
        const completedPlans = completedPlansData
          ? JSON.parse(completedPlansData)
          : [];
        if (!completedPlans.includes(planId)) {
          completedPlans.push(planId);
          localStorage.setItem(
            'completed-guided-plans',
            JSON.stringify(completedPlans)
          );
        }

        // Save plan grade
        const planGradesData = localStorage.getItem('plan-grades');
        const planGrades = planGradesData ? JSON.parse(planGradesData) : {};
        planGrades[planId] = percentage;
        localStorage.setItem('plan-grades', JSON.stringify(planGrades));
      } catch (error) {
        console.error('Error saving completion data:', error);
      }
    }

    addNotification({
      type: 'success',
      title: 'Congratulations! 🎉',
      message: `You completed the plan with ${percentage}% accuracy!`,
      duration: 5000,
    });
  };

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  const isCorrectAnswer = (option: string) => {
    if (!currentQuestion) return false;

    // If currentQuestion has options array, find the option by text and check its id
    if (currentQuestion.options && Array.isArray(currentQuestion.options)) {
      const optionObj = currentQuestion.options.find(
        opt => opt.text === option
      );
      if (optionObj) {
        // Compare option id (e.g., "c") with correct_answer (e.g., "c")
        return (
          optionObj.id?.toLowerCase() ===
          String(currentQuestion.correct_answer || '').toLowerCase()
        );
      }
    }

    // Fallback: direct comparison (for backwards compatibility)
    return option === currentQuestion.correct_answer;
  };

  // Reflect flashcard state when question changes
  useEffect(() => {
    try {
      if (currentQuestion) setInFlashcards(isInFlashcards(currentQuestion.id));
      else setInFlashcards(false);
    } catch (_) {
      setInFlashcards(false);
    }
  }, [currentQuestion]);

  const getOptionClasses = (option: string) => {
    if (!currentAnswer) {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors';
    }

    const isCorrect = isCorrectAnswer(option);
    const isSelected = currentAnswer === option;

    if (isCorrect) {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-100 transition-colors';
    } else if (isSelected && !isCorrect) {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-100 transition-colors';
    } else {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors';
    }
  };

  // Calculate overall progress
  const getOverallProgress = () => {
    if (!plan || !progress)
      return { completed: 0, total: plan?.totalQuestions || 0, percentage: 0 };

    let completed = 0;
    for (const card of plan.cards) {
      for (const category of card.categories) {
        for (const topic of category.topics) {
          for (const question of topic.questions) {
            if (progress.completedQuestions.includes(question.id)) {
              completed++;
            }
          }
        }
      }
    }

    const percentage =
      plan.totalQuestions > 0
        ? Math.round((completed / plan.totalQuestions) * 100)
        : 0;
    return { completed, total: plan.totalQuestions, percentage };
  };

  // Get current question number across all questions (absolute sequential position)
  const getCurrentQuestionNumber = () => {
    if (!plan || !currentQuestion) return 1;

    let questionNumber = 0;
    
    // Count all questions before the current one, in sequential order
    // Following the structure: Cards → Categories → Topics → Questions
    for (let cardIdx = 0; cardIdx < plan.cards.length; cardIdx++) {
      const card = plan.cards[cardIdx];
      
      for (let categoryIdx = 0; categoryIdx < card.categories.length; categoryIdx++) {
        const category = card.categories[categoryIdx];
        
        for (let topicIdx = 0; topicIdx < category.topics.length; topicIdx++) {
          const topic = category.topics[topicIdx];
          
          if (topic.questions && topic.questions.length > 0) {
            for (let questionIdx = 0; questionIdx < topic.questions.length; questionIdx++) {
              const question = topic.questions[questionIdx];
              
              // Check if this is a valid question (has options or is code type)
              const hasOptions = question.options && 
                Array.isArray(question.options) && 
                question.options.length > 0;
              const isCodeQuestion = question.type === 'code';
              
              if (hasOptions || isCodeQuestion) {
                questionNumber++;
                
                // If we found the current question, return the count
            if (question.id === currentQuestion.id) {
              return questionNumber;
            }
            }
          }
        }
      }
    }
    }
    
    // If current question not found, return the count (shouldn't happen)
    return questionNumber || 1;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600 mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-400'>
            Loading practice session...
          </p>
        </div>
      </div>
    );
  }

  if (error || !planId) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-4'>
        <div className='text-center max-w-md w-full'>
          <XCircle className='w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4 sm:mb-6' />
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
            {error || 'Plan ID Required'}
          </h1>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6'>
            {error || 'Please provide a plan ID to start the practice session.'}
          </p>
          <Link
            href='/features/guided-learning'
            className='inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-4'>
        <div className='text-center max-w-md w-full'>
          <XCircle className='w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4 sm:mb-6' />
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
            Plan Not Found
          </h1>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6'>
            The requested learning plan could not be found.
          </p>
          <Link
            href='/features/guided-learning'
            className='inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  // Show completion screen with score
  if (isCompleted && finalScore) {
    const getGradeColor = (percentage: number) => {
      if (percentage >= 90) return 'text-yellow-600 dark:text-yellow-400';
      if (percentage >= 80) return 'text-green-600 dark:text-green-400';
      if (percentage >= 70) return 'text-blue-600 dark:text-blue-400';
      if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
      return 'text-red-600 dark:text-red-400';
    };

    const getGradeText = (percentage: number) => {
      if (percentage >= 90) return 'A+ (Excellent!)';
      if (percentage >= 80) return 'A (Great!)';
      if (percentage >= 70) return 'B+ (Good!)';
      if (percentage >= 60) return 'B (Not bad!)';
      return 'C (Keep practicing!)';
    };

    const gradeColor = getGradeColor(finalScore.percentage);
    const gradeText = getGradeText(finalScore.percentage);

    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-3 sm:px-4'>
        <div className='max-w-2xl mx-auto w-full'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20 text-center'>
            {/* Celebration Icon */}
            <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg'>
              <CheckCircle className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white' />
            </div>

            {/* Title */}
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
              Congratulations! 🎉
            </h1>
            <p className='text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8'>
              You completed {plan.name}
            </p>

            {/* Score Display */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8 border border-blue-200 dark:border-blue-800'>
              <div className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-2'>
                <span className={gradeColor}>{finalScore.percentage}%</span>
              </div>
              <div className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 ${gradeColor}`}>
                {gradeText}
              </div>
              <div className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {finalScore.correct}
                </span>{' '}
                out of{' '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {finalScore.total}
                </span>{' '}
                questions answered correctly
              </div>
            </div>

            {/* Progress Stats */}
            <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8'>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4'>
                <div className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>
                  {getOverallProgress().completed}
                </div>
                <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  Questions Done
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4'>
                <div className='text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400'>
                  {finalScore.correct}
                </div>
                <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  Correct Answers
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4'>
                <div className='text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {progress?.completedCards.length || 0}
                </div>
                <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  Cards Completed
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <Link
                href='/dashboard'
                title='Go to Dashboard'
                className='group relative inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white hover:bg-green-50 text-green-600 hover:text-green-700 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 hover:shadow-md hover:scale-105'
              >
                <BarChart3 className='w-4 h-4 transition-transform duration-200 group-hover:scale-110' />
                <span className='transition-all duration-200'>
                  Go to Dashboard
                </span>
              </Link>
              <Link
                href={`/features/guided-learning/${planId}`}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Plan</span>
              </Link>
              <Link
                href='/features/guided-learning'
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <BookOpen className='w-4 h-4' />
                <span>View All Plans</span>
              </Link>
              <button
                onClick={() => {
                  resetProgress(plan);
                  setIsCompleted(false);
                  setFinalScore(null);
                }}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    // Debug info
    const totalQuestionsWithOptions =
      plan?.cards.reduce((total, card) => {
        return (
          total +
          card.categories.reduce((catTotal, category) => {
            return (
              catTotal +
              category.topics.reduce((topicTotal, topic) => {
                return (
                  topicTotal +
                  topic.questions.filter(
                    q =>
                      q.options &&
                      Array.isArray(q.options) &&
                      q.options.length > 0
                  ).length
                );
              }, 0)
            );
          }, 0)
        );
      }, 0) || 0;

    console.error(
      'No question found with valid options. Total questions with options:',
      totalQuestionsWithOptions
    );

    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center max-w-2xl mx-auto px-3 sm:px-4'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
            <CheckCircle className='w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4 sm:mb-6' />
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
              No Questions Available
            </h1>
            <p className='text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8'>
              This plan doesn&apos;t have any questions with answer options
              available for practice.
              <br />
              <span className='text-xs sm:text-sm'>
                Total questions: {plan?.totalQuestions || 0}, Questions with
                options: {totalQuestionsWithOptions}
              </span>
            </p>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <Link
                href={`/features/guided-learning/${planId}`}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Plan</span>
              </Link>

              <Link
                href='/features/guided-learning'
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
              >
                <BookOpen className='w-4 h-4' />
                <span>View All Plans</span>
              </Link>
              <button
                onClick={() => resetProgress(plan!)}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <span>Reset Progress</span>
              </button>
              <button
                title='Add to Plan'
                onClick={() => {
                  if (!currentQuestion) return;
                  try {
                    const question: Question = currentQuestion;
                    addToCart({
                      id: question.id,
                      question:
                        question.title || question.content || '',
                      section: currentCategory?.name,
                      difficulty: question.difficulty,
                      addedAt: Date.now(),
                    });
                  } catch (_) {}
                }}
                className='p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                <ShoppingCart className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = plan.cards[currentCardIndex];
  const currentCategory = currentCard?.categories[currentCategoryIndex];
  const currentTopic = currentCategory?.topics[currentTopicIndex];

  // Different layout for code type questions
  const isCodeQuestion = currentQuestion.type === 'code';

  return (
    <div className={`min-h-screen ${isCodeQuestion ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'} pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8`}>
      <div className={isCodeQuestion ? 'w-full h-[calc(100vh-4rem)]' : 'max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'}>
        {/* Compact Header for Code Questions */}
        {isCodeQuestion ? (
          <div className='mb-4 sm:mb-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-none'>
            <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5'>
              {/* Top Row: Navigation Links and Progress */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-700'>
                {/* Left: Navigation Links and Breadcrumb */}
                <div className='flex items-center gap-2.5 sm:gap-3 flex-wrap'>
          <Link
            href={`/features/guided-learning/${planId}`}
                    className='inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white dark:text-gray-100 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 border border-blue-400/50 dark:border-blue-500/50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  >
                    <ArrowLeft className='w-4 h-4' />
                    <span>Back to Plan</span>
                  </Link>
                  <Link
                    href='/features/guided-learning'
                    className='inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white dark:text-gray-100 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 border border-purple-400/50 dark:border-purple-500/50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  >
                    <BookOpen className='w-4 h-4' />
                    <span>View All Plans</span>
                  </Link>
                  {/* Breadcrumb Navigation */}
                  <div className='flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-gray-300 dark:border-gray-600'>
                    <span className='truncate px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-900/30 text-indigo-800 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-700/60 shadow-sm font-semibold'>{currentCard?.icon} {currentCard?.title}</span>
                    {/* Only show category if it's different from card title */}
                    {currentCategory?.name && currentCategory.name !== currentCard?.title && (
                      <>
                        <span className='hidden sm:inline text-indigo-500 dark:text-indigo-400 font-bold'>→</span>
                        <span className='truncate px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-900/30 text-purple-800 dark:text-purple-200 border border-purple-300/60 dark:border-purple-700/60 shadow-sm font-semibold'>{currentCategory?.name}</span>
                      </>
                    )}
                    {/* Show topic if it exists */}
                    {currentTopic?.name && (
                      <>
                        <span className='hidden sm:inline text-purple-500 dark:text-purple-400 font-bold'>→</span>
                        <span className='truncate px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-900/30 text-pink-800 dark:text-pink-200 border border-pink-300/60 dark:border-pink-700/60 shadow-sm font-semibold'>{currentTopic?.name}</span>
                      </>
                    )}
                  </div>
                </div>
                {/* Right: Progress Indicators */}
                <div className='flex items-center gap-3 sm:gap-4 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-700/20 rounded-xl border border-gray-200/80 dark:border-gray-600 shadow-sm'>
                  <div className='text-right'>
                    <div className='text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300'>
                      Q {getCurrentQuestionNumber()}/{plan.totalQuestions}
                    </div>
                    <div className='text-xs text-gray-600 dark:text-gray-400'>
                      {getOverallProgress().completed}/{getOverallProgress().total} ({getOverallProgress().percentage}%)
                    </div>
                  </div>
                  <div className='w-20 sm:w-28 bg-gray-200/80 dark:bg-gray-600 rounded-full h-2 sm:h-2.5 flex-shrink-0 border border-gray-300/50 dark:border-gray-500 shadow-inner'>
                    <div
                      className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 sm:h-2.5 rounded-full transition-all duration-500 shadow-sm'
                      style={{ width: `${getOverallProgress().percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Header for Multiple Choice Questions */
          <div className='mb-4 sm:mb-6 lg:mb-8'>
            <Link
              href={`/features/guided-learning/${planId}`}
              className='inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white dark:text-gray-100 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 border border-blue-400/50 dark:border-blue-500/50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 mb-3 sm:mb-4'
          >
              <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span>Back to Plan</span>
          </Link>

            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4'>
                <div className='flex-1 min-w-0'>
                  <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2'>
                  {plan.name}
                </h1>
                  <p className='text-xs sm:text-sm truncate sm:whitespace-normal'>
                    <span className='hidden sm:inline'>
                      <span className='px-2 py-1 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-900/30 text-indigo-800 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-700/60 font-semibold'>{currentCard?.icon} {currentCard?.title}</span>
                      {/* Only show category if it's different from card title */}
                      {currentCategory?.name && currentCategory.name !== currentCard?.title && (
                        <>
                          <span className='mx-2 text-indigo-500 dark:text-indigo-400 font-bold'>→</span>
                          <span className='px-2 py-1 rounded-md bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-900/30 text-purple-800 dark:text-purple-200 border border-purple-300/60 dark:border-purple-700/60 font-semibold'>{currentCategory?.name}</span>
                        </>
                      )}
                      {/* Show topic if it exists */}
                      {currentTopic?.name && (
                        <>
                          <span className='mx-2 text-purple-500 dark:text-purple-400 font-bold'>→</span>
                          <span className='px-2 py-1 rounded-md bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-900/30 text-pink-800 dark:text-pink-200 border border-pink-300/60 dark:border-pink-700/60 font-semibold'>{currentTopic?.name}</span>
                        </>
                      )}
                    </span>
                    <span className='sm:hidden'>
                      <span className='px-2 py-1 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-900/30 text-indigo-800 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-700/60 font-semibold'>{currentCard?.icon} {currentCard?.title}</span>
                      {/* Only show category if it's different from card title */}
                      {currentCategory?.name && currentCategory.name !== currentCard?.title && (
                        <>
                          <span className='mx-2 text-indigo-500 dark:text-indigo-400 font-bold'>→</span>
                          <span className='px-2 py-1 rounded-md bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-900/30 text-purple-800 dark:text-purple-200 border border-purple-300/60 dark:border-purple-700/60 font-semibold'>{currentCategory?.name}</span>
                        </>
                      )}
                    </span>
                </p>
              </div>
                <div className='text-left sm:text-right flex-shrink-0'>
                  <div className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                  Question
                </div>
                  <div className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white'>
                  {getCurrentQuestionNumber()} of {plan.totalQuestions}
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
              <div className='mb-3 sm:mb-4'>
                <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                  <span className='text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Overall Progress
                </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-900 dark:text-white'>
                  {getOverallProgress().completed}/{getOverallProgress().total}{' '}
                  ({getOverallProgress().percentage}%)
                </span>
              </div>
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3'>
                <div
                    className='bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500'
                  style={{ width: `${getOverallProgress().percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Progress indicators */}
              <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-0 sm:mb-4'>
              <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 ${
                  progress?.completedCards.includes(currentCard?.id || '')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}
              >
                  <span className='truncate max-w-[120px] sm:max-w-none'>
                  {currentCard?.icon} {currentCard?.title}
                </span>
                {progress?.completedCards.includes(currentCard?.id || '') && (
                    <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
                )}
              </span>
              <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 ${
                  progress?.completedCategories.includes(
                    currentCategory?.id || ''
                  )
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                }`}
              >
                  <span className='truncate max-w-[100px] sm:max-w-none'>{currentCategory?.name}</span>
                {progress?.completedCategories.includes(
                  currentCategory?.id || ''
                  ) && <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />}
              </span>
              <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 ${
                  progress?.completedTopics.includes(currentTopic?.id || '')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                }`}
              >
                  <span className='truncate max-w-[100px] sm:max-w-none'>{currentTopic?.name}</span>
                {progress?.completedTopics.includes(currentTopic?.id || '') && (
                    <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
                )}
              </span>
            </div>
          </div>
        </div>
        )}

        {/* Question */}
        <div className={isCodeQuestion ? '' : 'bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-gray-200 dark:border-gray-700 mb-8 transition-all duration-300'}>
          {/* Code-based questions (Problem Solving) */}
          {currentQuestion.type === 'code' ? (
            <ProblemSolvingQuestion
              question={{
                ...currentQuestion,
                category: currentCategory?.name,
                topic: currentTopic?.name,
                topic_id: currentTopic?.id,
                topic_name: currentTopic?.name,
                topic_description: currentTopic?.description,
                hints: currentQuestion.hints || null,
                constraints: currentQuestion.constraints || null,
                tags: currentQuestion.tags || null,
                language: currentQuestion.language || 'javascript',
              } as any}
              onComplete={(isCorrect) => {
                if (isCorrect && currentQuestion) {
                  markQuestionCompleted(currentQuestion.id);
                }
              }}
              onNextQuestion={() => {
                proceedToNext();
              }}
            />
          ) : (
            <>
              {/* Question Header */}
              <div className='mb-6 sm:mb-8'>
                <div className='flex items-center justify-between mb-4 sm:mb-5'>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <div className='p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/50 dark:to-purple-800/50 rounded-lg shadow-sm'>
                      <Target className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-300' />
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                      <span className='px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'>
                        {currentQuestion.difficulty}
                      </span>
                      <span className='px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600'>
                        {currentQuestion.type}
                      </span>
                    </div>
                  </div>
                  <button
                    title={
                      inFlashcards ? 'Added to Flashcards' : 'Add to Flashcards'
                    }
                    onClick={() => {
                      if (!currentQuestion) return;
                      if (inFlashcards) return;
                      try {
                        addFlashcard({
                          id: currentQuestion.id,
                          question:
                            currentQuestion.title ||
                            currentQuestion.content ||
                            '',
                          section: currentCategory?.name,
                          difficulty: currentQuestion.difficulty,
                          addedAt: Date.now(),
                        });
                        setInFlashcards(true);
                        addNotification('Added to flashcards', 'success');
                      } catch (_) {}
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md transform hover:scale-105 ${
                      inFlashcards
                        ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                  >
                    {inFlashcards ? (
                      <BookmarkCheck className='w-5 h-5 sm:w-6 sm:h-6' />
                    ) : (
                      <BookmarkPlus className='w-5 h-5 sm:w-6 sm:h-6' />
                    )}
                  </button>
                </div>

                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight'>
                  {currentQuestion.title}
                </h2>

                <div className='prose dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg'>
                  <QuestionContent content={currentQuestion.content} />
                </div>
              </div>

          {/* Answer Options */}
          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            <div className='space-y-3 sm:space-y-4'>
              {currentQuestion.options.map((option, index) => {
                const optionId = option.id || `option-${index}`;
                const optionLetter = getOptionLetter(index);
                const isCorrect = currentAnswer && isCorrectAnswer(option.text);
                const isSelected = currentAnswer === option.text;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={optionId}
                    onClick={() => handleAnswerSelect(option.text)}
                    disabled={!!currentAnswer}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                      !currentAnswer
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100'
                        : isCorrect
                          ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]'
                          : isWrong
                            ? 'border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60'
                    } ${currentAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className='flex items-center space-x-4 sm:space-x-5'>
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${
                          isCorrect
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50'
                            : isWrong
                              ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50'
                              : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200'
                        }`}
                      >
                        {optionLetter}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <OptionText text={option.text} />
                      </div>
                      {isCorrect && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <CheckCircle className='w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400' />
                        </div>
                      )}
                      {isWrong && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <XCircle className='w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400' />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : currentQuestion.type === 'true-false' ? (
            <div className='space-y-3 sm:space-y-4'>
              {(currentQuestion.options && currentQuestion.options.length > 0
                ? currentQuestion.options.map(opt => opt.text.toLowerCase())
                : ['true', 'false']
              ).map(option => {
                const isCorrect = currentAnswer && isCorrectAnswer(option);
                const isSelected = currentAnswer === option;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={!!currentAnswer}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                      !currentAnswer
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100'
                        : isCorrect
                          ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]'
                          : isWrong
                            ? 'border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60'
                    } ${currentAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className='flex items-center space-x-4 sm:space-x-5'>
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${
                          isCorrect
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50'
                            : isWrong
                              ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50'
                              : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200'
                        }`}
                      >
                        {option === 'true' ? 'T' : 'F'}
                      </div>
                      <span className='flex-1 capitalize text-base sm:text-lg font-semibold text-left'>{option}</span>
                      {isCorrect && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <CheckCircle className='w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400' />
                        </div>
                      )}
                      {isWrong && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <XCircle className='w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400' />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <XCircle className='w-5 h-5 text-red-600' />
                <p className='text-red-800 dark:text-red-200 font-medium'>
                  No answer options available for this question
                </p>
              </div>
              <p className='text-red-700 dark:text-red-300 text-sm mt-2'>
                This question doesn&apos;t have answer options configured.
                Please contact support or use manual mode to proceed.
              </p>
              <div className='mt-4'>
                <button
                  onClick={proceedToNext}
                  className='inline-flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors'
                >
                  <span>Skip This Question</span>
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          )}

          {/* Explanation - Only show for non-code questions */}
          {currentQuestion.type !== 'code' && showExplanation && currentQuestion.explanation && (
            <div className='mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200/50 dark:shadow-blue-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <div className='flex items-center space-x-3 mb-3'>
                <div className='p-2.5 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-md'>
                  <Info className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                </div>
                <p className='text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100'>
                  Explanation
                </p>
              </div>
              <p className='text-sm sm:text-base text-blue-800 dark:text-blue-200 leading-relaxed pl-1'>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Question Button - Only show for non-code questions */}
          {currentQuestion.type !== 'code' && currentAnswer && (
            <div className='mt-6 sm:mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <button
                onClick={proceedToNext}
                className='group inline-flex items-center space-x-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 active:scale-95'
              >
                <span>Next Question</span>
                <ArrowRight className='w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300' />
              </button>
            </div>
          )}
            </>
          )}
        </div>

        {/* Navigation - Only show for non-code questions */}
        {!isCodeQuestion && (
          <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4 sm:mt-6'>
          <Link
            href={`/features/guided-learning/${planId}`}
              className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Plan</span>
          </Link>

          <Link
            href='/features/guided-learning'
              className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
          >
            <BookOpen className='w-4 h-4' />
            <span>View All Plans</span>
          </Link>
        </div>
        )}
      </div>
    </div>
  );
}
