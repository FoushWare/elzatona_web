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
import { addFlashcard, isInFlashcards } from '@/lib/flashcards';
import { addToCart } from '@/lib/cart';
import { useNotifications } from '@/components/NotificationSystem';
import { useLearningType } from '@/context/LearningTypeContext';

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

export default function GuidedPracticePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { setLearningType } = useLearningType();
  const planId = searchParams.get('plan');
  const categoryId = searchParams.get('category');

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
  }, [planId]);

  const resumeFromProgress = (planData: Plan, savedProgress: Progress) => {
    const { currentPosition } = savedProgress;

    // Try to resume from saved position
    if (currentPosition.cardIndex < planData.cards.length) {
      const card = planData.cards[currentPosition.cardIndex];
      if (currentPosition.categoryIndex < card.categories.length) {
        const category = card.categories[currentPosition.categoryIndex];
        if (currentPosition.topicIndex < category.topics.length) {
          const topic = category.topics[currentPosition.topicIndex];
          if (
            topic.questions &&
            currentPosition.questionIndex < topic.questions.length
          ) {
            const question = topic.questions[currentPosition.questionIndex];

            // Check if this question is already completed and has options
            if (
              !savedProgress.completedQuestions.includes(question.id) &&
              question.options &&
              Array.isArray(question.options) &&
              question.options.length > 0
            ) {
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
    findNextIncompleteQuestion(planData, savedProgress);
  };

  const findFirstQuestion = (planData: Plan) => {
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

    // Find cards in the specified order
    for (const cardTitle of cardOrder) {
      const cardIndex = planData.cards.findIndex(card =>
        card.title.toLowerCase().includes(cardTitle.toLowerCase())
      );

      if (cardIndex !== -1) {
        const card = planData.cards[cardIndex];

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) continue;

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
                foundCardIndex = cardIndex;
                break;
              }
            }
          }
          if (foundQuestion) break;
        }
      }
      if (foundQuestion) break;
    }

    // Fallback: find any available question
    if (!foundQuestion) {
      for (let cardIndex = 0; cardIndex < planData.cards.length; cardIndex++) {
        const card = planData.cards[cardIndex];

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) continue;

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
                foundCardIndex = cardIndex;
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
      console.log('Found first question:', {
        id: foundQuestion.id,
        title: foundQuestion.title,
        hasOptions: foundQuestion.options?.length || 0,
        cardIndex: foundCardIndex,
        categoryIndex: foundCategoryIndex,
        topicIndex: foundTopicIndex,
        questionIndex: foundQuestionIndex,
      });

      setCurrentQuestion(foundQuestion);
      setCurrentQuestionIndex(foundQuestionIndex);
      setCurrentTopicIndex(foundTopicIndex);
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentCardIndex(foundCardIndex);
    } else {
      console.warn('No question with options found in plan data');
    }
  };

  const findNextIncompleteQuestion = (
    planData: Plan,
    savedProgress: Progress
  ) => {
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

    // Find next incomplete question following the sequential order
    for (const cardTitle of cardOrder) {
      const cardIndex = planData.cards.findIndex(card =>
        card.title.toLowerCase().includes(cardTitle.toLowerCase())
      );

      if (cardIndex !== -1) {
        const card = planData.cards[cardIndex];

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) continue;

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

                // Check if this question is not completed and has options
                if (
                  !savedProgress.completedQuestions.includes(question.id) &&
                  question.options &&
                  Array.isArray(question.options) &&
                  question.options.length > 0
                ) {
                  foundQuestion = question;
                  foundQuestionIndex = questionIndex;
                  foundTopicIndex = topicIndex;
                  foundCategoryIndex = categoryIndex;
                  foundCardIndex = cardIndex;
                  break;
                }
              }
            }
            if (foundQuestion) break;
          }
          if (foundQuestion) break;
        }
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
              currentQuestion.title || currentQuestion.content || 'Question',
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
    if (!plan || !currentQuestion) return;

    console.log('➡️ Proceeding to next question...', {
      currentQuestionId: currentQuestion.id,
      currentQuestionTitle: currentQuestion.title?.substring(0, 50),
    });

    // Always get the latest progress from localStorage to avoid stale state
    const latestProgress = loadProgress();
    if (!latestProgress) {
      console.error('❌ No progress found when proceeding to next question');
      return;
    }

    console.log('📊 Current progress state:', {
      completedQuestionsCount: latestProgress.completedQuestions.length,
      completedQuestions: latestProgress.completedQuestions.slice(0, 5),
      currentQuestionIdInCompleted: latestProgress.completedQuestions.includes(
        currentQuestion.id
      ),
    });

    // Use the latest progress instead of the closure variable
    const progress = latestProgress;

    const currentCard = plan.cards[currentCardIndex];
    const currentCategory = currentCard.categories[currentCategoryIndex];
    const currentTopic = currentCategory.topics[currentTopicIndex];

    // Check if current topic is completed
    const allQuestionsInTopicCompleted = currentTopic.questions.every(q =>
      progress.completedQuestions.includes(q.id)
    );

    if (
      allQuestionsInTopicCompleted &&
      !progress.completedTopics.includes(currentTopic.id)
    ) {
      markTopicCompleted(currentTopic.id);
    }

    // Check if current category is completed
    const allTopicsInCategoryCompleted = currentCategory.topics.every(
      topic =>
        progress.completedTopics.includes(topic.id) ||
        topic.questions.every(q => progress.completedQuestions.includes(q.id))
    );

    if (
      allTopicsInCategoryCompleted &&
      !progress.completedCategories.includes(currentCategory.id)
    ) {
      markCategoryCompleted(currentCategory.id);
    }

    // Check if current card is completed
    const allCategoriesInCardCompleted = currentCard.categories.every(
      category =>
        progress.completedCategories.includes(category.id) ||
        category.topics.every(
          topic =>
            progress.completedTopics.includes(topic.id) ||
            topic.questions.every(q =>
              progress.completedQuestions.includes(q.id)
            )
        )
    );

    if (
      allCategoriesInCardCompleted &&
      !progress.completedCards.includes(currentCard.id)
    ) {
      markCardCompleted(currentCard.id);
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

    // Find next incomplete question following sequential order
    for (const cardTitle of cardOrder) {
      const cardIndex = plan.cards.findIndex(card =>
        card.title.toLowerCase().includes(cardTitle.toLowerCase())
      );

      if (cardIndex !== -1) {
        const card = plan.cards[cardIndex];

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) continue;

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

                // Check if this question is not completed and has options
                const isCompleted = progress.completedQuestions.includes(
                  question.id
                );
                if (
                  !isCompleted &&
                  question.options &&
                  Array.isArray(question.options) &&
                  question.options.length > 0
                ) {
                  console.log('✅ Found next incomplete question:', {
                    questionId: question.id,
                    questionTitle: question.title?.substring(0, 50),
                    cardIndex,
                    categoryIndex,
                    topicIndex,
                    questionIndex,
                  });
                  foundQuestion = question;
                  foundQuestionIndex = questionIndex;
                  foundTopicIndex = topicIndex;
                  foundCategoryIndex = categoryIndex;
                  foundCardIndex = cardIndex;
                  break;
                } else if (isCompleted) {
                  console.log('⏭️ Skipping completed question:', {
                    questionId: question.id,
                    questionTitle: question.title?.substring(0, 50),
                  });
                }
              }
            }
            if (foundQuestion) break;
          }
          if (foundQuestion) break;
        }
      }
      if (foundQuestion) break;
    }

    // If we found a question, update all state at once
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
      setCurrentQuestionIndex(foundQuestionIndex);
      setCurrentTopicIndex(foundTopicIndex);
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentCardIndex(foundCardIndex);

      // Update progress position
      const updatedProgress = {
        ...progress,
        currentPosition: {
          cardIndex: foundCardIndex,
          categoryIndex: foundCategoryIndex,
          topicIndex: foundTopicIndex,
          questionIndex: foundQuestionIndex,
        },
        lastUpdated: new Date().toISOString(),
      };
      saveProgress(updatedProgress);

      // Reset answer state for next question
      setCurrentAnswer(null);
      setShowExplanation(false);
      return;
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
      return 'w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors';
    }

    const isCorrect = isCorrectAnswer(option);
    const isSelected = currentAnswer === option;

    if (isCorrect) {
      return 'w-full text-left p-4 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-100 transition-colors';
    } else if (isSelected && !isCorrect) {
      return 'w-full text-left p-4 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-100 transition-colors';
    } else {
      return 'w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors';
    }
  };

  // Calculate overall progress
  const getOverallProgress = () => {
    if (!plan || !progress)
      return { completed: 0, total: plan.totalQuestions, percentage: 0 };

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

  // Get current question number across all questions
  const getCurrentQuestionNumber = () => {
    if (!plan || !currentQuestion || !progress) return 1;

    let questionNumber = 1;
    for (const card of plan.cards) {
      for (const category of card.categories) {
        for (const topic of category.topics) {
          for (const question of topic.questions) {
            if (question.id === currentQuestion.id) {
              return questionNumber;
            }
            // Only count completed questions
            if (progress.completedQuestions.includes(question.id)) {
              questionNumber++;
            }
          }
        }
      }
    }
    return questionNumber;
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
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500 mx-auto mb-6' />
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            {error || 'Plan ID Required'}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            {error || 'Please provide a plan ID to start the practice session.'}
          </p>
          <Link
            href='/features/guided-learning'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500 mx-auto mb-6' />
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Plan Not Found
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            The requested learning plan could not be found.
          </p>
          <Link
            href='/features/guided-learning'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
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
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='max-w-2xl mx-auto px-4'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20 text-center'>
            {/* Celebration Icon */}
            <div className='w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <CheckCircle className='w-12 h-12 text-white' />
            </div>

            {/* Title */}
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
              Congratulations! 🎉
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>
              You completed {plan.name}
            </p>

            {/* Score Display */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-800'>
              <div className='text-6xl font-bold mb-2'>
                <span className={gradeColor}>{finalScore.percentage}%</span>
              </div>
              <div className={`text-2xl font-semibold mb-4 ${gradeColor}`}>
                {gradeText}
              </div>
              <div className='text-gray-600 dark:text-gray-400'>
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
            <div className='grid grid-cols-3 gap-4 mb-8'>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {getOverallProgress().completed}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Questions Done
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4'>
                <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                  {finalScore.correct}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Correct Answers
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4'>
                <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {progress?.completedCards.length || 0}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Cards Completed
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/dashboard'
                title='Go to Dashboard'
                className='group relative inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white hover:bg-green-50 text-green-600 hover:text-green-700 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:scale-105'
              >
                <BarChart3 className='w-4 h-4 transition-transform duration-200 group-hover:scale-110' />
                <span className='transition-all duration-200'>
                  Go to Dashboard
                </span>
              </Link>
              <Link
                href={`/features/guided-learning/${planId}`}
                className='inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Plan</span>
              </Link>
              <Link
                href='/features/guided-learning'
                className='inline-flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors'
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
                className='inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors'
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
        <div className='text-center max-w-2xl mx-auto px-4'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
            <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-6' />
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
              No Questions Available
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
              This plan doesn't have any questions with answer options available
              for practice.
              <br />
              <span className='text-sm'>
                Total questions: {plan?.totalQuestions || 0}, Questions with
                options: {totalQuestionsWithOptions}
              </span>
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/features/guided-learning/${planId}`}
                className='inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Plan</span>
              </Link>

              <Link
                href='/features/guided-learning'
                className='inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors'
              >
                <BookOpen className='w-4 h-4' />
                <span>View All Plans</span>
              </Link>
              <button
                onClick={() => resetProgress(plan!)}
                className='inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors'
              >
                <span>Reset Progress</span>
              </button>
              <button
                title='Add to Plan'
                onClick={() => {
                  if (!currentQuestion) return;
                  try {
                    addToCart({
                      id: currentQuestion.id,
                      question:
                        currentQuestion.title ||
                        currentQuestion.content ||
                        'Question',
                      section: currentCategory?.name,
                      difficulty: currentQuestion.difficulty,
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            href={`/features/guided-learning/${planId}`}
            className='inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Plan</span>
          </Link>

          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {plan.name}
                </h1>
                <p className='text-gray-600 dark:text-gray-400'>
                  {currentCard?.title} → {currentCategory?.name} →{' '}
                  {currentTopic?.name}
                </p>
              </div>
              <div className='text-right'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Question
                </div>
                <div className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {getCurrentQuestionNumber()} of {plan.totalQuestions}
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className='mb-4'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Overall Progress
                </span>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                  {getOverallProgress().completed}/{getOverallProgress().total}{' '}
                  ({getOverallProgress().percentage}%)
                </span>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500'
                  style={{ width: `${getOverallProgress().percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className='flex flex-wrap gap-2 mb-4'>
              <span
                className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                  progress?.completedCards.includes(currentCard?.id || '')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}
              >
                <span>
                  {currentCard?.icon} {currentCard?.title}
                </span>
                {progress?.completedCards.includes(currentCard?.id || '') && (
                  <CheckCircle className='w-4 h-4' />
                )}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                  progress?.completedCategories.includes(
                    currentCategory?.id || ''
                  )
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                }`}
              >
                <span>{currentCategory?.name}</span>
                {progress?.completedCategories.includes(
                  currentCategory?.id || ''
                ) && <CheckCircle className='w-4 h-4' />}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                  progress?.completedTopics.includes(currentTopic?.id || '')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                }`}
              >
                <span>{currentTopic?.name}</span>
                {progress?.completedTopics.includes(currentTopic?.id || '') && (
                  <CheckCircle className='w-4 h-4' />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20 mb-8'>
          <div className='mb-6'>
            <div className='flex items-center space-x-2 mb-4'>
              <Target className='w-5 h-5 text-indigo-600' />
              <span className='text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide'>
                {currentQuestion.difficulty} • {currentQuestion.type}
              </span>
            </div>

            <div className='flex items-start justify-between gap-3 mb-4'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                {currentQuestion.title}
              </h2>
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
                        'Question',
                      section: currentCategory?.name,
                      difficulty: currentQuestion.difficulty,
                      addedAt: Date.now(),
                    });
                    setInFlashcards(true);
                  } catch (_) {}
                }}
                className={`p-2 rounded-md border transition-colors ${
                  inFlashcards
                    ? 'border-green-300 text-green-600 dark:text-green-400'
                    : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                }`}
              >
                {inFlashcards ? (
                  <BookmarkCheck className='w-4 h-4' />
                ) : (
                  <BookmarkPlus className='w-4 h-4' />
                )}
              </button>
            </div>

            <div className='prose dark:prose-invert max-w-none'>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                {currentQuestion.content}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            <div className='space-y-3'>
              {currentQuestion.options.map((option, index) => {
                const optionId = option.id || `option-${index}`;
                const optionLetter = getOptionLetter(index);

                return (
                  <button
                    key={optionId}
                    onClick={() => handleAnswerSelect(option.text)}
                    disabled={!!currentAnswer}
                    className={getOptionClasses(option.text)}
                  >
                    <div className='flex items-center space-x-3'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          currentAnswer && isCorrectAnswer(option.text)
                            ? 'bg-green-500 text-white'
                            : currentAnswer &&
                                currentAnswer === option.text &&
                                !isCorrectAnswer(option.text)
                              ? 'bg-red-500 text-white'
                              : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        }`}
                      >
                        {optionLetter}
                      </div>
                      <span className='flex-1'>{option.text}</span>
                      {currentAnswer && isCorrectAnswer(option.text) && (
                        <CheckCircle className='w-5 h-5 text-green-500' />
                      )}
                      {currentAnswer &&
                        currentAnswer === option.text &&
                        !isCorrectAnswer(option.text) && (
                          <XCircle className='w-5 h-5 text-red-500' />
                        )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : currentQuestion.type === 'true-false' ? (
            <div className='space-y-3'>
              {['true', 'false'].map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!!currentAnswer}
                  className={getOptionClasses(option)}
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentAnswer && isCorrectAnswer(option)
                          ? 'bg-green-500 text-white'
                          : currentAnswer &&
                              currentAnswer === option &&
                              !isCorrectAnswer(option)
                            ? 'bg-red-500 text-white'
                            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      }`}
                    >
                      {option === 'true' ? 'T' : 'F'}
                    </div>
                    <span className='flex-1 capitalize'>{option}</span>
                    {currentAnswer && isCorrectAnswer(option) && (
                      <CheckCircle className='w-5 h-5 text-green-500' />
                    )}
                    {currentAnswer &&
                      currentAnswer === option &&
                      !isCorrectAnswer(option) && (
                        <XCircle className='w-5 h-5 text-red-500' />
                      )}
                  </div>
                </button>
              ))}
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
                This question doesn't have answer options configured. Please
                contact support or use manual mode to proceed.
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

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <div className='flex items-center space-x-2 mb-2'>
                <Info className='w-5 h-5 text-blue-600' />
                <p className='text-blue-800 dark:text-blue-200 font-medium'>
                  Explanation
                </p>
              </div>
              <p className='text-blue-700 dark:text-blue-300 text-sm'>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Question Button */}
          {currentAnswer && (
            <div className='mt-6 text-center'>
              <button
                onClick={proceedToNext}
                className='inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105'
              >
                <span>Next Question</span>
                <ArrowRight className='w-5 h-5' />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className='flex justify-between'>
          <Link
            href={`/features/guided-learning/${planId}`}
            className='inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Plan</span>
          </Link>

          <Link
            href='/features/guided-learning'
            className='inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors'
          >
            <BookOpen className='w-4 h-4' />
            <span>View All Plans</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
