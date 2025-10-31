'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  BookOpen,
  Loader2,
  Target,
  TrendingUp,
  Clock,
  Star,
  BookmarkPlus,
  BookmarkCheck,
  ShoppingCart,
} from 'lucide-react';
import { useUserType, useAuth } from '@elzatona/shared-contexts';
import { addFlashcard, isInFlashcards, FlashcardItem } from '@/lib/flashcards';
import { addToCart, CartItem } from '@/lib/cart';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  topicId?: string;
  categoryId?: string;
}

interface DatabaseQuestion {
  id: string;
  question?: string; // Transformed from question_text
  question_text?: string; // Raw database field
  options: any; // Already parsed JSON or string
  correct_answer?: string | number;
  correctAnswer?: number; // Transformed field
  answer?: string | number; // Alternative transformed field
  explanation?: string;
  difficulty: string;
  tags: any; // Already parsed JSON or string
  topic_id?: string;
  topicId?: string; // Transformed field
  category_id?: string;
  categoryId?: string; // Transformed field
  question_type?: string;
  type?: string; // Transformed field
}

interface FilterOptions {
  sections: string[];
  difficulties: string[];
  tags: string[];
  categories: string[];
}

export default function FreeStylePracticePage() {
  const { userType } = useUserType();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const router = useRouter();

  // Save progress function
  const saveProgress = async (data: {
    sessionId: string;
    question_id: string;
    answer: number;
    isCorrect: boolean;
    timeSpent: number;
    section: string;
    difficulty: string;
    timestamp: number;
    learningMode: 'free-style';
  }) => {
    if (!isAuthenticated || !user) {
      return false;
    }

    try {
      const response = await fetch('/api/progress/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Failed to save progress:', response.statusText);
        return false;
      }

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [inFlashcards, setInFlashcards] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [answeredQuestionsData, setAnsweredQuestionsData] = useState<
    Record<
      string,
      {
        selectedAnswer: number;
        isCorrect: boolean;
        timestamp: number;
      }
    >
  >({});
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    timeSpent: 0,
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(
    Date.now()
  );
  const [filters, setFilters] = useState<FilterOptions>({
    sections: [],
    difficulties: [],
    tags: [],
    categories: [],
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionStartTime] = useState(Date.now());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [totalQuestionCount, setTotalQuestionCount] = useState(0);
  const [questionsLimit, setQuestionsLimit] = useState(5); // Start with 5 questions
  const [hasMoreQuestions, setHasMoreQuestions] = useState(true);
  const [availableSections, setAvailableSections] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [userProgress, setUserProgress] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    timeSpent: number;
  } | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  // Available difficulties
  const availableDifficulties = ['easy', 'medium', 'hard'];

  // Fetch questions from database
  const fetchQuestions = async () => {
    try {
      setIsLoadingQuestions(true);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.difficulties.length > 0) {
        params.append('difficulty', filters.difficulties[0]); // API supports single difficulty
      }
      params.append('limit', questionsLimit.toString()); // Use configurable limit

      const response = await fetch(`/api/questions?${params.toString()}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response not OK:', response.status, errorText);
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Questions API response:', {
        success: data.success,
        count: data.count,
        dataLength: data.data?.length,
        sampleQuestion: data.data?.[0]
          ? {
              id: data.data[0].id,
              question: data.data[0].question,
              question_text: data.data[0].question_text,
              options: data.data[0].options,
              optionsType: typeof data.data[0].options,
              correctAnswer: data.data[0].correctAnswer,
              answer: data.data[0].answer,
              correct_answer: data.data[0].correct_answer,
            }
          : null,
      });

      if (data.success && Array.isArray(data.data)) {
        console.log('Raw questions from API:', {
          count: data.data.length,
          firstQuestion: data.data[0],
        });

        // Get category map for section names
        const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
        console.log('Category map:', Array.from(categoryMap.entries()));

        // Transform database questions to component format
        let skippedCount = 0;
        const transformedQuestions: Question[] = data.data
          .filter((q: DatabaseQuestion) => {
            // Filter by search term
            if (searchTerm) {
              const searchLower = searchTerm.toLowerCase();
              const questionText = (
                q.question ||
                q.question_text ||
                ''
              ).toLowerCase();
              if (!questionText.includes(searchLower)) {
                return false;
              }
            }
            return true;
          })
          .map((q: DatabaseQuestion) => {
            // Parse options
            let options: string[] = [];
            let correctAnswerIndex: number | null = null;

            try {
              // Get question text (could be from API transformation or raw)
              const questionText = q.question || q.question_text || '';

              // Log raw question data for debugging
              if (
                !q.options ||
                (Array.isArray(q.options) && q.options.length === 0)
              ) {
                console.warn('Question has no options:', {
                  id: q.id,
                  question_text: questionText.substring(0, 50),
                  options: q.options,
                  rawOptions: typeof q.options,
                });
              }

              if (q.options) {
                let parsedOptions;

                // Handle string JSON
                if (typeof q.options === 'string') {
                  try {
                    parsedOptions = JSON.parse(q.options);
                  } catch (parseError) {
                    console.error(
                      'Failed to parse options JSON string:',
                      parseError,
                      q.options
                    );
                    parsedOptions = null;
                  }
                } else {
                  parsedOptions = q.options;
                }

                if (parsedOptions) {
                  // Handle array format
                  if (Array.isArray(parsedOptions)) {
                    if (parsedOptions.length > 0) {
                      // Check if options are objects with isCorrect property
                      const firstOption = parsedOptions[0];
                      if (
                        firstOption &&
                        typeof firstOption === 'object' &&
                        firstOption !== null &&
                        'isCorrect' in firstOption
                      ) {
                        // Format: [{text: "...", isCorrect: true}, ...]
                        options = parsedOptions.map((opt: any) => {
                          if (typeof opt === 'string') return opt;
                          return (
                            opt.text || opt.label || opt.content || String(opt)
                          );
                        });
                        const correctOption = parsedOptions.findIndex(
                          (opt: any) => opt.isCorrect === true
                        );
                        if (correctOption >= 0) {
                          correctAnswerIndex = correctOption;
                        }
                      } else {
                        // Format: ["Option A", "Option B", ...] or array of strings
                        options = parsedOptions.map((opt: any) => {
                          if (typeof opt === 'string') return opt;
                          if (typeof opt === 'object' && opt !== null) {
                            return (
                              opt.text ||
                              opt.label ||
                              opt.content ||
                              opt.value ||
                              String(opt)
                            );
                          }
                          return String(opt);
                        });
                      }
                    }
                  } else if (
                    typeof parsedOptions === 'object' &&
                    parsedOptions !== null
                  ) {
                    // Handle object format { options: [...], correctAnswer: ... }
                    if (Array.isArray(parsedOptions.options)) {
                      options = parsedOptions.options.map((opt: any) => {
                        if (typeof opt === 'string') return opt;
                        if (typeof opt === 'object' && opt !== null) {
                          return (
                            opt.text ||
                            opt.label ||
                            opt.content ||
                            opt.value ||
                            String(opt)
                          );
                        }
                        return String(opt);
                      });
                    } else if (parsedOptions.choices) {
                      // Alternative format: { choices: [...] }
                      options = Array.isArray(parsedOptions.choices)
                        ? parsedOptions.choices.map((opt: any) => {
                            if (typeof opt === 'string') return opt;
                            if (typeof opt === 'object' && opt !== null) {
                              return (
                                opt.text ||
                                opt.label ||
                                opt.content ||
                                opt.value ||
                                String(opt)
                              );
                            }
                            return String(opt);
                          })
                        : [];
                    }
                    correctAnswerIndex =
                      parsedOptions.correctAnswer ??
                      parsedOptions.correct_index ??
                      parsedOptions.correctAnswerIndex ??
                      null;
                  }
                }
              }

              // If no options parsed and we have a question, try to fetch from API
              if (options.length === 0 && q.id) {
                console.warn(
                  'No options found for question, will attempt to fetch details:',
                  q.id
                );
                // We'll handle this below by skipping invalid questions
              }

              // If still no options, log but don't skip - allow display without options for debugging
              if (options.length === 0) {
                console.warn(
                  'Question has no options, creating placeholder options:',
                  {
                    id: q.id,
                    question_text: questionText.substring(0, 50),
                  }
                );
                // Create placeholder options instead of skipping
                options = [
                  'Option A (No options in database)',
                  'Option B (No options in database)',
                  'Option C (No options in database)',
                  'Option D (No options in database)',
                ];
              }

              // Parse correct answer - handle different formats (only if not already set from options)
              if (correctAnswerIndex === null && options.length > 0) {
                // Try transformed fields first
                if (typeof q.correctAnswer === 'number') {
                  correctAnswerIndex =
                    q.correctAnswer >= 0 && q.correctAnswer < options.length
                      ? q.correctAnswer
                      : 0;
                } else if (typeof q.correct_answer === 'number') {
                  correctAnswerIndex =
                    q.correct_answer >= 0 && q.correct_answer < options.length
                      ? q.correct_answer
                      : 0;
                } else if (q.answer !== undefined) {
                  // Handle transformed answer field
                  if (typeof q.answer === 'number') {
                    correctAnswerIndex =
                      q.answer >= 0 && q.answer < options.length ? q.answer : 0;
                  } else if (typeof q.answer === 'string') {
                    const parsedNum = parseInt(q.answer, 10);
                    if (
                      !isNaN(parsedNum) &&
                      parsedNum >= 0 &&
                      parsedNum < options.length
                    ) {
                      correctAnswerIndex = parsedNum;
                    } else {
                      const correctIndex = options.findIndex(
                        opt => opt.toLowerCase() === q.answer?.toLowerCase()
                      );
                      correctAnswerIndex = correctIndex >= 0 ? correctIndex : 0;
                    }
                  }
                } else if (typeof q.correct_answer === 'string') {
                  // Try to parse as number first
                  const parsedNum = parseInt(q.correct_answer, 10);
                  if (
                    !isNaN(parsedNum) &&
                    parsedNum >= 0 &&
                    parsedNum < options.length
                  ) {
                    correctAnswerIndex = parsedNum;
                  } else {
                    // Try to find the index of the correct answer in options
                    const correctIndex = options.findIndex(
                      opt =>
                        opt.toLowerCase() === q.correct_answer.toLowerCase()
                    );
                    if (correctIndex >= 0) {
                      correctAnswerIndex = correctIndex;
                    } else {
                      correctAnswerIndex = 0; // Default to first option
                    }
                  }
                } else {
                  correctAnswerIndex = 0; // Default to first option
                }
              }

              // Ensure correctAnswerIndex is valid
              if (
                correctAnswerIndex === null ||
                correctAnswerIndex < 0 ||
                correctAnswerIndex >= options.length
              ) {
                correctAnswerIndex = 0;
              }

              // Parse tags
              let tags: string[] = [];
              if (q.tags) {
                try {
                  if (typeof q.tags === 'string') {
                    tags = JSON.parse(q.tags);
                  } else if (Array.isArray(q.tags)) {
                    tags = q.tags;
                  } else {
                    tags = [];
                  }
                  if (!Array.isArray(tags)) tags = [];
                } catch {
                  tags = [];
                }
              }

              // Get section name from category (try both field names)
              let section = 'General';
              const categoryId = q.categoryId || q.category_id;
              if (categoryId && categoryMap.has(categoryId)) {
                section = categoryMap.get(categoryId)!;
              }

              // Validate that we have actual question text
              if (!questionText || questionText.trim() === '') {
                console.warn('Skipping question with no question text:', {
                  id: q.id,
                  availableFields: Object.keys(q),
                  q: q,
                });
                return null;
              }

              // Ensure we have at least one option (even if placeholder)
              if (options.length === 0) {
                console.warn(
                  'Question has no options after parsing, creating placeholders:',
                  q.id
                );
                options = [
                  'Option A (No options available)',
                  'Option B (No options available)',
                  'Option C (No options available)',
                  'Option D (No options available)',
                ];
              }

              return {
                id: q.id,
                question: questionText.trim(),
                options: options.filter(opt => opt && opt.trim() !== ''), // Remove empty options
                correctAnswer: correctAnswerIndex ?? 0,
                explanation: q.explanation || '',
                section,
                difficulty: (q.difficulty || 'medium') as
                  | 'easy'
                  | 'medium'
                  | 'hard',
                tags,
                topicId: q.topicId || q.topic_id,
                categoryId: categoryId,
              };
            } catch (error) {
              console.error('Error parsing question:', error, q);
              skippedCount++;
              return null;
            }
          })
          .filter((q: Question | null): q is Question => {
            if (q === null) {
              skippedCount++;
              return false;
            }
            return true;
          });

        console.log(
          `📊 Transformation complete: ${transformedQuestions.length} valid, ${skippedCount} skipped`
        );

        setQuestions(transformedQuestions);
        const totalInDB = data.count || transformedQuestions.length;
        setTotalQuestionCount(totalInDB);

        // Check if there are more questions to load
        setHasMoreQuestions(transformedQuestions.length < totalInDB);

        console.log(
          `✅ Loaded ${transformedQuestions.length} of ${totalInDB} questions`,
          {
            loaded: transformedQuestions.length,
            totalInDB,
            hasMore: transformedQuestions.length < totalInDB,
            sampleQuestion: transformedQuestions[0]
              ? {
                  id: transformedQuestions[0].id,
                  question: transformedQuestions[0].question.substring(0, 50),
                  section: transformedQuestions[0].section,
                  difficulty: transformedQuestions[0].difficulty,
                  optionsCount: transformedQuestions[0].options.length,
                }
              : null,
          }
        );

        // Extract unique tags from questions
        const allTags = new Set<string>();
        transformedQuestions.forEach(q => {
          if (q.tags && Array.isArray(q.tags)) {
            q.tags.forEach(tag => allTags.add(tag));
          }
        });
        setAvailableTags(Array.from(allTags).sort());

        // If no questions found, log helpful info
        if (transformedQuestions.length === 0) {
          console.warn('⚠️ No questions transformed. Raw data:', {
            rawDataLength: data.data?.length,
            sampleQuestion: data.data?.[0],
          });
        }
      } else {
        console.error(
          'Failed to fetch questions:',
          data.error || 'Unknown error'
        );
        setQuestions([]);
        setTotalQuestionCount(0);

        // Show user-friendly error message
        if (data.error) {
          console.error('API Error details:', data.error);
        }
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
      setTotalQuestionCount(0);

      // Log full error for debugging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Fetch categories for sections
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success && data.data) {
        const categoryList = data.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
        }));
        setCategories(categoryList);
        const categoryNames = categoryList.map(
          (cat: { id: string; name: string }) => cat.name
        );
        setAvailableSections(categoryNames);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default sections
      setAvailableSections([
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'System Design',
        'Performance',
        'Security',
        'Design Patterns',
        'Problem Solving',
      ]);
    }
  };

  // Fetch question count
  const fetchQuestionCount = async () => {
    try {
      const response = await fetch('/api/questions/count');
      const data = await response.json();
      if (data.success && data.data) {
        setTotalQuestionCount(data.data.totalCount || 0);
      }
    } catch (error) {
      console.error('Error fetching question count:', error);
    }
  };

  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!isAuthenticated) {
      setUserProgress(null);
      return;
    }

    try {
      setIsLoadingProgress(true);
      const response = await fetch('/api/progress/get?mode=free-style');
      const data = await response.json();

      if (data.success && data.progress) {
        setUserProgress({
          totalQuestions: data.progress.totalQuestions || 0,
          correctAnswers: data.progress.correctAnswers || 0,
          accuracy: data.progress.accuracy || 0,
          timeSpent: data.progress.timeSpent || 0,
        });
      } else {
        // Initialize with zero if no progress found
        setUserProgress({
          totalQuestions: 0,
          correctAnswers: 0,
          accuracy: 0,
          timeSpent: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
      setUserProgress(null);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (!isAuthLoading && userType !== 'self-directed') {
      router.push('/learning-mode');
      return;
    }

    // Fetch categories, question count, and user progress first
    fetchCategories();
    fetchQuestionCount();
    fetchUserProgress();
  }, [userType, isAuthLoading, router, isAuthenticated]);

  // Fetch questions when filters, search, or limit changes
  useEffect(() => {
    if (userType === 'self-directed' && !isAuthLoading) {
      // Don't wait for categories - questions can load with default section names
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchTerm, userType, isAuthLoading, questionsLimit]);

  // Re-fetch questions when categories load (to update section names)
  useEffect(() => {
    if (
      userType === 'self-directed' &&
      !isAuthLoading &&
      categories.length > 0 &&
      questions.length === 0
    ) {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.category-dropdown-container') &&
        !target.closest('.difficulty-dropdown-container') &&
        !target.closest('.limit-dropdown-container')
      ) {
        setShowCategoryDropdown(false);
        setShowDifficultyDropdown(false);
        setShowLimitDropdown(false);
      }
    };

    if (showCategoryDropdown || showDifficultyDropdown || showLimitDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCategoryDropdown, showDifficultyDropdown, showLimitDropdown]);

  // Reset to saved/last question when questions load or filters change
  useEffect(() => {
    const filtered = getFilteredQuestions();
    console.log('🔄 Questions/filters changed:', {
      totalQuestions: questions.length,
      filteredCount: filtered.length,
      filters,
      searchTerm,
    });

    if (filtered.length > 0) {
      // Try to restore last question index from localStorage
      try {
        const savedProgress = localStorage.getItem(
          'free-style-practice-progress'
        );
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          const savedIndex = progress.lastQuestionIndex || 0;

          // Validate saved index is still valid for current filtered questions
          if (savedIndex >= 0 && savedIndex < filtered.length) {
            // Try to find the question by ID from saved progress
            const savedQuestionId = progress.lastQuestionId;
            if (savedQuestionId) {
              const foundIndex = filtered.findIndex(
                q => q.id === savedQuestionId
              );
              if (foundIndex >= 0) {
                setCurrentQuestionIndex(foundIndex);
                loadQuestion(foundIndex);
                return;
              }
            }
            // If question ID not found, use saved index if valid
            setCurrentQuestionIndex(savedIndex);
            loadQuestion(savedIndex);
            return;
          }
        }
      } catch (error) {
        console.error('Error restoring last question:', error);
      }

      // Fallback to first question if no saved progress
      setCurrentQuestionIndex(0);
      loadQuestion(0);
    } else {
      setCurrentQuestion(null);
      if (questions.length > 0) {
        console.warn('⚠️ Questions loaded but all filtered out!', {
          totalQuestions: questions.length,
          filters,
          searchTerm,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, filters, searchTerm]);

  const getFilteredQuestions = () => {
    const filtered = questions.filter(question => {
      // Filter by categories (using categoryId)
      if (
        filters.categories.length > 0 &&
        question.categoryId &&
        !filters.categories.includes(question.categoryId)
      ) {
        return false;
      }

      // Filter by sections
      if (
        filters.sections.length > 0 &&
        !filters.sections.includes(question.section)
      ) {
        return false;
      }

      // Filter by difficulties
      if (
        filters.difficulties.length > 0 &&
        !filters.difficulties.includes(question.difficulty)
      ) {
        return false;
      }

      // Filter by tags
      if (
        filters.tags.length > 0 &&
        !filters.tags.some(tag => question.tags.includes(tag))
      ) {
        return false;
      }

      // Filter by search term
      if (
        searchTerm &&
        !question.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Debug logging
    if (filtered.length === 0 && questions.length > 0) {
      console.log('⚠️ All questions filtered out:', {
        totalQuestions: questions.length,
        filters,
        searchTerm,
        sampleQuestion: questions[0]
          ? {
              section: questions[0].section,
              difficulty: questions[0].difficulty,
              tags: questions[0].tags,
              categoryId: questions[0].categoryId,
            }
          : null,
      });
    }

    return filtered;
  };

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(
        'free-style-practice-progress'
      );
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        console.log('📦 Loading saved progress:', {
          lastQuestionIndex: progress.lastQuestionIndex,
          lastQuestionId: progress.lastQuestionId,
          answeredCount: progress.answeredQuestions?.length || 0,
        });

        if (
          progress.answeredQuestions &&
          Array.isArray(progress.answeredQuestions)
        ) {
          setAnsweredQuestions(new Set(progress.answeredQuestions));
        }
        if (progress.answeredQuestionsData) {
          setAnsweredQuestionsData(progress.answeredQuestionsData);
        }
        // Note: We don't set currentQuestionIndex here because questions aren't loaded yet
        // It will be restored when questions load in the next useEffect
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    }
  }, []);

  // Save progress to localStorage
  const saveProgressToLocalStorage = () => {
    try {
      const progress = {
        lastQuestionIndex: currentQuestionIndex,
        lastQuestionId: currentQuestion?.id,
        answeredQuestions: Array.from(answeredQuestions),
        answeredQuestionsData,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(
        'free-style-practice-progress',
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  };

  // Save to localStorage whenever current question index or answered questions change
  useEffect(() => {
    if (currentQuestion) {
      saveProgressToLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentQuestionIndex,
    currentQuestion?.id,
    answeredQuestions,
    answeredQuestionsData,
  ]);

  const loadQuestion = (index: number) => {
    const filteredQuestions = getFilteredQuestions();
    if (
      filteredQuestions.length === 0 ||
      index < 0 ||
      index >= filteredQuestions.length
    ) {
      setCurrentQuestion(null);
      return;
    }

    const question = filteredQuestions[index];
    setCurrentQuestion(question);
    setCurrentQuestionIndex(index);
    setQuestionStartTime(Date.now());
    setInFlashcards(question ? isInFlashcards(question.id) : false);

    // Check if this question has been answered
    const answerData = answeredQuestionsData[question.id];
    if (answerData && answeredQuestions.has(question.id)) {
      // Restore previous answer state
      setSelectedAnswer(answerData.selectedAnswer);
      setIsCorrect(answerData.isCorrect);
      setShowExplanation(true);
    } else {
      // Reset for new unanswered question
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    }

    // Save current question index to localStorage
    saveProgressToLocalStorage();
  };

  const handleNextQuestion = () => {
    const filteredQuestions = getFilteredQuestions();

    // Auto-load more questions when approaching the end (within 5 questions)
    const isNearEnd = currentQuestionIndex >= filteredQuestions.length - 5;
    if (
      isNearEnd &&
      hasMoreQuestions &&
      !isLoadingQuestions &&
      questions.length < totalQuestionCount
    ) {
      const newLimit = Math.min(questionsLimit + 50, totalQuestionCount);
      console.log(
        `📥 Auto-loading more questions: ${questionsLimit} → ${newLimit}`
      );
      setQuestionsLimit(newLimit);
      // Questions will auto-fetch via useEffect when limit changes
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      loadQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      loadQuestion(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showExplanation || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Track this question as answered
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestion.id);
    setAnsweredQuestions(newAnsweredQuestions);

    // Save answer data
    const newAnsweredData = {
      ...answeredQuestionsData,
      [currentQuestion.id]: {
        selectedAnswer: answerIndex,
        isCorrect: correct,
        timestamp: Date.now(),
      },
    };
    setAnsweredQuestionsData(newAnsweredData);

    // Calculate time spent on this question
    const timeSpent = Date.now() - questionStartTime;

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      total: prev.total + 1,
      correct: prev.correct + (correct ? 1 : 0),
      timeSpent: prev.timeSpent + Math.round(timeSpent / 1000),
    }));

    // Save progress securely
    if (isAuthenticated && currentQuestion) {
      try {
        const success = await saveProgress({
          sessionId: `free-style_${Date.now()}`,
          question_id: currentQuestion.id,
          answer: answerIndex,
          isCorrect: correct,
          timeSpent: Math.round(timeSpent / 1000), // Convert to seconds
          section: currentQuestion.section,
          difficulty: currentQuestion.difficulty,
          timestamp: Date.now(),
          learningMode: 'free-style',
        });

        if (success) {
          console.log('✅ Progress saved successfully');
          // Refresh user progress after saving
          fetchUserProgress();
        } else {
          console.log('⚠️ Progress save failed, but continuing');
        }
      } catch (error) {
        console.error('❌ Error saving progress:', error);
        // Continue with the question flow even if progress save fails
      }
    }

    // Auto-add to flashcards on wrong answer
    if (!correct && currentQuestion) {
      const item: FlashcardItem = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        section: currentQuestion.section,
        difficulty: currentQuestion.difficulty,
        addedAt: Date.now(),
      };
      addFlashcard(item);
      setInFlashcards(true);
    }
  };

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      sections: [],
      difficulties: [],
      tags: [],
      categories: [],
    });
    setSearchTerm('');
  };

  const getAccuracyPercentage = () => {
    if (sessionStats.total === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.total) * 100);
  };

  const getSessionTime = () => {
    return Math.round((Date.now() - sessionStartTime) / 1000 / 60); // minutes
  };

  if (isAuthLoading || isLoadingQuestions) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <Loader2 className='w-8 h-8 animate-spin text-indigo-600' />
        <p className='ml-3 text-lg text-gray-700 dark:text-gray-300'>
          Loading free style practice...
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900'>
      {/* Header */}
      <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => router.push('/free-style-roadmap')}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                <ArrowLeft className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Free Style Practice
                </h1>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Practice questions at your own pace
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <button
                onClick={() => router.push('/free-style-analytics')}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                <TrendingUp className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
              <div className='text-center'>
                <div className='text-lg font-bold text-gray-900 dark:text-white'>
                  {sessionStats.correct}/{sessionStats.total}
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  Session
                </div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-gray-900 dark:text-white'>
                  {currentQuestion
                    ? `${currentQuestionIndex + 1} / ${getFilteredQuestions().length}`
                    : '0 / 0'}
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  Questions
                </div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-gray-900 dark:text-white'>
                  {questions.length} / {totalQuestionCount}
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  Loaded / Total
                </div>
              </div>
              {isAuthenticated && userProgress && (
                <div className='text-center border-l border-gray-300 dark:border-gray-600 pl-4'>
                  <div className='text-lg font-bold text-gray-900 dark:text-white'>
                    {userProgress.totalQuestions}
                  </div>
                  <div className='text-xs text-gray-600 dark:text-gray-400'>
                    Total Answered
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar - Always Visible - Modern Design */}
      <div className='bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm'>
        <div className='container mx-auto px-4 py-3'>
          <div className='flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between'>
            {/* Left Side: Search and Quick Filters */}
            <div className='flex flex-col sm:flex-row gap-3 flex-1 items-start sm:items-center'>
              {/* Search */}
              <div className='relative flex-1 sm:max-w-xs'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <input
                  type='text'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder='Search questions...'
                  className='w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all'
                />
              </div>

              {/* Category Filter - Button-based */}
              <div className='relative category-dropdown-container'>
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowDifficultyDropdown(false);
                    setShowLimitDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    filters.categories.length > 0
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>Category</span>
                  {filters.categories.length > 0 && (
                    <span className='bg-purple-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center'>
                      {filters.categories.length}
                    </span>
                  )}
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {/* Category Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className='absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[200px] max-h-64 overflow-y-auto'>
                    <div className='p-2'>
                      {categories.map(category => {
                        const isSelected = filters.categories.includes(
                          category.id
                        );
                        return (
                          <label
                            key={category.id}
                            className='flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer'
                          >
                            <input
                              type='checkbox'
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setFilters(prev => ({
                                    ...prev,
                                    categories: prev.categories.filter(
                                      id => id !== category.id
                                    ),
                                  }));
                                } else {
                                  setFilters(prev => ({
                                    ...prev,
                                    categories: [
                                      ...prev.categories,
                                      category.id,
                                    ],
                                  }));
                                }
                              }}
                              className='mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
                            />
                            <span className='text-sm text-gray-700 dark:text-gray-300'>
                              {category.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Difficulty Filter - Button-based */}
              <div className='relative difficulty-dropdown-container'>
                <button
                  onClick={() => {
                    setShowDifficultyDropdown(!showDifficultyDropdown);
                    setShowCategoryDropdown(false);
                    setShowLimitDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    filters.difficulties.length > 0
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>Difficulty</span>
                  {filters.difficulties.length > 0 && (
                    <span className='bg-purple-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center'>
                      {filters.difficulties.length}
                    </span>
                  )}
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {/* Difficulty Dropdown Menu */}
                {showDifficultyDropdown && (
                  <div className='absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[160px]'>
                    <div className='p-2'>
                      {availableDifficulties.map(difficulty => {
                        const isSelected =
                          filters.difficulties.includes(difficulty);
                        return (
                          <label
                            key={difficulty}
                            className='flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer'
                          >
                            <input
                              type='checkbox'
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setFilters(prev => ({
                                    ...prev,
                                    difficulties: prev.difficulties.filter(
                                      d => d !== difficulty
                                    ),
                                  }));
                                } else {
                                  setFilters(prev => ({
                                    ...prev,
                                    difficulties: [
                                      ...prev.difficulties,
                                      difficulty,
                                    ],
                                  }));
                                }
                              }}
                              className='mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
                            />
                            <span className='text-sm text-gray-700 dark:text-gray-300 capitalize'>
                              {difficulty}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Limit Dropdown - In Filters Bar */}
              <div className='relative limit-dropdown-container'>
                <button
                  onClick={() => {
                    setShowLimitDropdown(!showLimitDropdown);
                    setShowCategoryDropdown(false);
                    setShowDifficultyDropdown(false);
                  }}
                  disabled={isLoadingQuestions}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    isLoadingQuestions
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                  } ${
                    questionsLimit !== 5
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>Load: {questionsLimit}</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {/* Limit Dropdown Menu */}
                {showLimitDropdown && (
                  <div className='absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[220px] max-h-96 overflow-y-auto'>
                    <div className='p-2'>
                      {/* Quick Options */}
                      {totalQuestionCount > 0 && totalQuestionCount <= 200 ? (
                        // If total is small, show all options
                        <div>
                          <div className='px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1'>
                            Select Limit
                          </div>
                          {Array.from(
                            { length: Math.min(totalQuestionCount - 4, 100) },
                            (_, i) => i + 5
                          ).map(limit => (
                            <button
                              key={limit}
                              onClick={() => {
                                setQuestionsLimit(limit);
                                setShowLimitDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                questionsLimit === limit
                                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {limit} questions
                            </button>
                          ))}
                        </div>
                      ) : (
                        // For large totals, show quick selects + custom input
                        <>
                          <div className='pb-2 mb-2 border-b border-gray-200 dark:border-gray-700'>
                            <div className='px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1'>
                              Quick Select
                            </div>
                            {[5, 10, 25, 50, 100, 200, 500].map(limit => {
                              if (limit > (totalQuestionCount || 0))
                                return null;
                              return (
                                <button
                                  key={limit}
                                  onClick={() => {
                                    setQuestionsLimit(limit);
                                    setShowLimitDropdown(false);
                                  }}
                                  className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                    questionsLimit === limit
                                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {limit} questions
                                </button>
                              );
                            })}
                          </div>

                          {/* All Questions Option */}
                          {totalQuestionCount > 0 && (
                            <div className='pb-2 mb-2 border-b border-gray-200 dark:border-gray-700'>
                              <button
                                onClick={() => {
                                  setQuestionsLimit(totalQuestionCount);
                                  setShowLimitDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  questionsLimit === totalQuestionCount
                                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                All ({totalQuestionCount} questions)
                              </button>
                            </div>
                          )}

                          {/* Custom Input */}
                          <div>
                            <div className='px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1'>
                              Custom (5 - {totalQuestionCount || 'N/A'})
                            </div>
                            <div className='flex items-center gap-2 px-2'>
                              <input
                                type='number'
                                min={5}
                                max={totalQuestionCount || 1000}
                                value={questionsLimit}
                                onChange={e => {
                                  const value = Math.min(
                                    Math.max(5, Number(e.target.value) || 5),
                                    totalQuestionCount || 1000
                                  );
                                  setQuestionsLimit(value);
                                }}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    setShowLimitDropdown(false);
                                  }
                                }}
                                className='w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder='Enter number'
                              />
                              <button
                                onClick={() => setShowLimitDropdown(false)}
                                className='px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap'
                              >
                                Set
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className='flex items-center gap-2'>
              {/* Clear Filters Button */}
              {(filters.categories.length > 0 ||
                filters.difficulties.length > 0 ||
                filters.sections.length > 0 ||
                filters.tags.length > 0 ||
                searchTerm) && (
                <button
                  onClick={clearFilters}
                  className='px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium'
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Selected Filters Chips */}
          {(filters.categories.length > 0 ||
            filters.difficulties.length > 0) && (
            <div className='mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2'>
              {filters.categories.map(catId => {
                const category = categories.find(c => c.id === catId);
                return category ? (
                  <span
                    key={catId}
                    className='inline-flex items-center px-2.5 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md'
                  >
                    {category.name}
                    <button
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          categories: prev.categories.filter(
                            id => id !== catId
                          ),
                        }));
                      }}
                      className='ml-1.5 hover:text-purple-900 dark:hover:text-purple-100'
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
              {filters.difficulties.map(diff => (
                <span
                  key={diff}
                  className='inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md'
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  <button
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        difficulties: prev.difficulties.filter(d => d !== diff),
                      }));
                    }}
                    className='ml-1.5 hover:text-blue-900 dark:hover:text-blue-100'
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* No Questions Message */}
        {!isLoadingQuestions && getFilteredQuestions().length === 0 && (
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 text-center'>
            <Target className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              {questions.length === 0 && totalQuestionCount === 0
                ? 'No Questions Available'
                : 'No Questions Match Your Filters'}
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              {questions.length === 0 && totalQuestionCount === 0
                ? 'There are no questions in the database yet. Please check back later or contact support.'
                : questions.length === 0 && totalQuestionCount > 0
                  ? `There are ${totalQuestionCount} questions in the database, but none could be loaded. Please check the browser console for errors.`
                  : `You have ${questions.length} questions loaded, but none match your current filters. Try adjusting your search criteria.`}
            </p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              {questions.length === 0 && totalQuestionCount > 0 && (
                <button
                  onClick={() => {
                    console.log('Reloading questions...');
                    fetchQuestions();
                  }}
                  className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
                >
                  Reload Questions
                </button>
              )}
              {questions.length > 0 && (
                <button
                  onClick={clearFilters}
                  className='px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors'
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Single Question Card */}
        {!isLoadingQuestions && currentQuestion && (
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <BookOpen className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    {currentQuestion.section}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 capitalize'>
                    {currentQuestion.difficulty} difficulty
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                {currentQuestion.tags.map(tag => (
                  <span
                    key={tag}
                    className='px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full'
                  >
                    {tag}
                  </span>
                ))}
                {/* Manual add to flashcards */}
                <button
                  title={
                    inFlashcards ? 'Added to Flashcards' : 'Add to Flashcards'
                  }
                  onClick={() => {
                    if (!currentQuestion) return;
                    if (inFlashcards) return;
                    const item: FlashcardItem = {
                      id: currentQuestion.id,
                      question: currentQuestion.question,
                      section: currentQuestion.section,
                      difficulty: currentQuestion.difficulty,
                      addedAt: Date.now(),
                    };
                    addFlashcard(item);
                    setInFlashcards(true);
                  }}
                  className={`ml-2 p-2 rounded-md border transition-colors ${
                    inFlashcards
                      ? 'border-green-300 text-green-600 dark:text-green-400'
                      : 'border-purple-200 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  {inFlashcards ? (
                    <BookmarkCheck className='w-4 h-4' />
                  ) : (
                    <BookmarkPlus className='w-4 h-4' />
                  )}
                </button>

                {/* Add to Plan (cart) */}
                <button
                  title='Add to Plan'
                  onClick={() => {
                    if (!currentQuestion) return;
                    const item: CartItem = {
                      id: currentQuestion.id,
                      question: currentQuestion.question,
                      section: currentQuestion.section,
                      difficulty: currentQuestion.difficulty,
                      addedAt: Date.now(),
                    };
                    addToCart(item);
                  }}
                  className='ml-1 p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  <ShoppingCart className='w-4 h-4' />
                </button>
              </div>
            </div>

            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
              {currentQuestion.question}
            </h3>

            <div className='space-y-3 mb-6'>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : selectedAnswer === index
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      : selectedAnswer === index
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showExplanation
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : selectedAnswer === index
                              ? 'border-red-500 bg-red-500'
                              : 'border-gray-300 dark:border-gray-600'
                          : selectedAnswer === index
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {showExplanation &&
                        index === currentQuestion.correctAnswer && (
                          <CheckCircle className='w-4 h-4 text-white' />
                        )}
                      {showExplanation &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correctAnswer && (
                          <XCircle className='w-4 h-4 text-white' />
                        )}
                    </div>
                    <span className='text-gray-900 dark:text-white'>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6'>
                <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  Explanation:
                </h4>
                <p className='text-gray-700 dark:text-gray-300'>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Question Status Indicator */}
            {answeredQuestions.has(currentQuestion.id) && (
              <div className='mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg'>
                <div className='flex items-center space-x-2'>
                  <CheckCircle
                    className={`w-5 h-5 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                  />
                  <span
                    className={`text-sm font-medium ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}
                  >
                    {isCorrect ? 'Correct ✓' : 'Incorrect ✗'} - This question
                    was answered previously
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className='inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Previous</span>
              </button>

              <div className='text-center'>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Question {currentQuestionIndex + 1} of{' '}
                  {getFilteredQuestions().length}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                  {answeredQuestions.size} answered •{' '}
                  {getFilteredQuestions().length - answeredQuestions.size}{' '}
                  remaining
                </div>
                {answeredQuestions.size > 0 && (
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          'Clear all progress? This will reset all answered questions.'
                        )
                      ) {
                        localStorage.removeItem('free-style-practice-progress');
                        setAnsweredQuestions(new Set());
                        setAnsweredQuestionsData({});
                        setSelectedAnswer(null);
                        setShowExplanation(false);
                        setIsCorrect(null);
                        console.log('✅ Progress cleared');
                      }
                    }}
                    className='mt-2 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline'
                  >
                    Clear Progress
                  </button>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex >= getFilteredQuestions().length - 1 &&
                  !hasMoreQuestions
                }
                className='inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors'
              >
                <span>
                  {isLoadingQuestions &&
                  currentQuestionIndex >= getFilteredQuestions().length - 5
                    ? 'Loading...'
                    : 'Next'}
                </span>
                <ArrowRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        )}

        {/* Session Stats */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 mb-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
            <TrendingUp className='w-5 h-5 mr-2 text-green-500' />
            Session Statistics
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {sessionStats.total}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Questions Answered
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {getAccuracyPercentage()}%
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Accuracy Rate
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {getSessionTime()}m
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Time Spent
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress (if authenticated) */}
        {isAuthenticated && userProgress && (
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
              <Star className='w-5 h-5 mr-2 text-yellow-500' />
              Overall Progress
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {userProgress.totalQuestions}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Total Questions
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {userProgress.correctAnswers}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Correct Answers
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {userProgress.accuracy.toFixed(1)}%
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Overall Accuracy
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {Math.round(userProgress.timeSpent / 60)}m
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Total Time
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
