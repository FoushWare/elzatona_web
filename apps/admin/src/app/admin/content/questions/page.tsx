'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Textarea,
  Checkbox,
} from '@elzatona/shared-components';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  BookOpen,
  BarChart3,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle,
} from 'lucide-react';
import { AdvancedSearch } from '@elzatona/shared-components';

// Define the UnifiedQuestion type based on Elzatona-web-ui schema
interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category?: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPath?: string;
  sectionId?: string;
  topic?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  tags?: string[];
  explanation?: string;
  hints?: string[];
  timeLimit?: number;
  points?: number;
  metadata?: {
    source?: string;
    version?: string;
    references?: string[];
    [key: string]: unknown;
  };
  // For multiple choice questions
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  // For code questions
  codeTemplate?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
  // For open-ended questions
  sampleAnswers?: string[];
  // Statistics
  stats?: {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    difficultyRating: number;
  };
  // Legacy fields for compatibility
  correct_answer?: string;
  test_cases?: string[];
  learning_card_id?: string;
  category_id?: string;
  topic_id?: string;
  // New fields with junction table data
  topics?: Array<{
    id: string;
    name: string;
    slug: string;
    difficulty: string;
    is_primary: boolean;
    order_index: number;
  }>;
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
    card_type: string;
    is_primary: boolean;
    order_index: number;
  }>;
  learning_card?: {
    id: string;
    title: string;
    type: string;
    color: string;
    icon: string;
  };
}

export default function AdminContentQuestionsPage() {
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data state
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Additional data for forms (cards, topics, categories)
  const [cardsData, setCardsData] = useState<{
    data?: Array<{ id: string; title: string }>;
  } | null>(null);
  const [topicsData, setTopicsData] = useState<{
    data?: Array<{ id: string; name: string }>;
  } | null>(null);
  const [categoriesData, setCategoriesData] = useState<{
    data?: Array<{ id: string; name: string }>;
  } | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<
    Array<{
      id: string;
      name: string;
      description?: string;
      slug: string;
      questionCount: number;
    }>
  >([]);

  // Modal states
  const [selectedQuestion, setSelectedQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setQuestions(result.data || []);
        setTotalCount(result.pagination?.totalCount || 0);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentPage, pageSize]);

  // Fetch cards data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards');
        if (response.ok) {
          const data = await response.json();
          setCardsData(data);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  // Fetch topics data
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics');
        if (response.ok) {
          const data = await response.json();
          setTopicsData(data);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    fetchTopics();
  }, []);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategoriesData(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch category question counts
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch('/api/categories/question-counts');
        if (response.ok) {
          const data = await response.json();
          setCategoryCounts(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching category question counts:', error);
      }
    };
    fetchCategoryCounts();
  }, []);

  const cards = cardsData?.data || [];
  const allTopics = topicsData?.data || [];
  const allCategories = (categoriesData?.data || []).map(
    (cat: { id: string; name: string }) => cat.name
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allTypes = useMemo(() => {
    if (!questions || !Array.isArray(questions)) {
      return [];
    }
    const types = Array.from(
      new Set(questions.map((q: UnifiedQuestion) => q.type).filter(Boolean))
    ) as string[];
    return types.sort();
  }, [questions]);

  // Questions list - now managed by AdvancedSearch component
  const displayQuestions = questions;

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedQuestion(null);
  };

  // Handlers for CRUD operations
  const handleCreateQuestion = async (
    newQuestion: Partial<UnifiedQuestion>
  ) => {
    try {
      const response = await fetch('/api/questions/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        alert('Question created successfully');
        closeModals();
        window.location.reload();
      } else {
        throw new Error('Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question');
    }
  };

  const handleUpdateQuestion = async (formData: Partial<UnifiedQuestion>) => {
    try {
      // Convert form data to UnifiedQuestion format
      const updatedQuestion: UnifiedQuestion = {
        ...selectedQuestion!,
        ...formData,
      };

      const response = await fetch(
        `/api/questions/unified/${updatedQuestion.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (response.ok) {
        alert('Question updated successfully');
        closeModals();
        window.location.reload();
      } else {
        throw new Error('Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Error updating question');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        const response = await fetch(`/api/questions/unified/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Question deleted successfully');
          window.location.reload();
        } else {
          throw new Error('Failed to delete question');
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Error deleting question');
      }
    }
  };

  const openViewModal = (question: UnifiedQuestion) => {
    setSelectedQuestion(question);
    setIsViewModalOpen(true);
  };

  const openEditModal = (question: UnifiedQuestion) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  const getCardTitleById = (cardId: string) => {
    return (
      cards.find((card: { id: string; title: string }) => card.id === cardId)
        ?.title || 'N/A'
    );
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
            Question Management
          </h1>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-blue-600' />
              <p className='text-gray-600 dark:text-gray-400'>
                Loading questions...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
            Question Management
          </h1>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg'>
              <p className='font-semibold mb-2'>Error loading questions:</p>
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} className='mt-4'>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
          Question Management
        </h1>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardContent className='p-6 flex items-center space-x-4'>
              <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center'>
                <span className='text-blue-600 dark:text-blue-400 font-bold'>
                  Q
                </span>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Total Questions
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {totalCount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardContent className='p-6 flex items-center space-x-4'>
              <div className='w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center'>
                <span className='text-green-600 dark:text-green-400 font-bold'>
                  C
                </span>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Categories
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {categoryCounts.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardContent className='p-6 flex items-center space-x-4'>
              <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center'>
                <span className='text-purple-600 dark:text-purple-400 font-bold'>
                  A
                </span>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Active Questions
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {questions.filter(q => q.isActive).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardContent className='p-6 flex items-center space-x-4'>
              <div className='w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center'>
                <span className='text-orange-600 dark:text-orange-400 font-bold'>
                  F
                </span>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Filtered Results
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {displayQuestions.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Overview */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <BookOpen className='h-5 w-5 text-blue-600' />
              <span>Categories Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryCounts.length === 0 ? (
              <div className='text-center py-8'>
                <BookOpen className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                  No Categories Found
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  No categories available in the system.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {categoryCounts.map(category => {
                  return (
                    <div
                      key={category.id}
                      className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold text-gray-900 dark:text-white'>
                          {category.name}
                        </h4>
                        <Badge
                          variant='outline'
                          className='bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        >
                          {category.questionCount} questions
                        </Badge>
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                        {category.description || 'No description available'}
                      </p>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-xs text-gray-500 dark:text-gray-400'>
                            Slug: {category.slug}
                          </span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => {
                              // TODO: Implement view category questions functionality
                              console.log(
                                'View category questions:',
                                category.id
                              );
                            }}
                            className='h-8 px-2 text-blue-600 hover:bg-blue-100'
                          >
                            <Eye className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => {
                              // TODO: Implement edit category functionality
                              console.log('Edit category:', category.id);
                            }}
                            className='h-8 px-2 text-green-600 hover:bg-green-100'
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advanced Search */}
        {categoriesData && topicsData ? (
          <AdvancedSearch
            onResultsChange={results => {
              // Update questions with server-side search results
              setQuestions(results);
              // Server-side search handles pagination, so we don't override totalCount
            }}
            onFacetsChange={_facets => {
              // Update facets if needed
            }}
            placeholder='Search questions by title, content, tags...'
            showFilters={true}
            showFacets={false}
            showSuggestions={false}
            showAnalytics={true}
            allCategories={allCategories}
            allTopics={allTopics}
            // Pagination props
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / pageSize)}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        ) : (
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-center'>
                <div className='text-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Loading search filters...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions List */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>Questions ({displayQuestions.length})</span>
              <Button
                className='flex items-center space-x-2'
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className='w-4 h-4' />
                Add New Question
              </Button>
            </CardTitle>
          </CardHeader>

          {/* Pagination Before Questions List */}
          {totalCount > 0 && (
            <div className='px-6 pb-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-gray-700 dark:text-gray-300'>
                  Showing{' '}
                  {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{' '}
                  {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
                  questions
                </div>
                <div className='flex items-center space-x-4'>
                  {/* Per Page Select */}
                  <div className='flex items-center space-x-2'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Show:
                    </span>
                    <Select
                      value={pageSize.toString()}
                      onValueChange={value => setPageSize(parseInt(value))}
                    >
                      <SelectTrigger className='w-20'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='10'>10</SelectItem>
                        <SelectItem value='20'>20</SelectItem>
                        <SelectItem value='50'>50</SelectItem>
                        <SelectItem value='100'>100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Navigation Buttons */}
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CardContent className='p-0'>
            <div className='overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800'>
              {displayQuestions.length === 0 ? (
                <div className='text-center py-12'>
                  <BookOpen className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                    No questions found
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    No questions available
                  </p>
                </div>
              ) : (
                <div className='space-y-1'>
                  {displayQuestions.map(question => (
                    <div
                      key={question.id}
                      className='p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex-1 pr-4'>
                          <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                            {question.title}
                          </h4>
                          <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                            {question.content}
                          </p>
                          <div className='mt-2 flex flex-wrap gap-2'>
                            {/* Topics Badges */}
                            {question.topics && question.topics.length > 0 ? (
                              question.topics.map((topic, index) => (
                                <Badge
                                  key={`${question.id}-topic-${index}`}
                                  variant={
                                    topic.is_primary ? 'default' : 'outline'
                                  }
                                  className={`${
                                    topic.is_primary
                                      ? 'bg-purple-600 text-white'
                                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  }`}
                                >
                                  {topic.is_primary && '⭐ '}Topic: {topic.name}
                                </Badge>
                              ))
                            ) : (
                              <Badge
                                variant='outline'
                                className='bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              >
                                Topic: No Topic
                              </Badge>
                            )}

                            {/* Categories Badges */}
                            {question.categories &&
                            question.categories.length > 0 ? (
                              question.categories.map((category, index) => (
                                <Badge
                                  key={`${question.id}-category-${index}`}
                                  variant={
                                    category.is_primary
                                      ? 'default'
                                      : 'secondary'
                                  }
                                  className={`${
                                    category.is_primary
                                      ? 'bg-green-600 text-white'
                                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  }`}
                                >
                                  {category.is_primary && '⭐ '}Category:{' '}
                                  {category.name}
                                </Badge>
                              ))
                            ) : (
                              <Badge
                                variant='outline'
                                className='bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              >
                                Category: No Category
                              </Badge>
                            )}

                            {/* Card Badge */}
                            {question.learning_card ? (
                              <Badge
                                variant='secondary'
                                className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              >
                                Card: {question.learning_card.title}
                              </Badge>
                            ) : (
                              <Badge
                                variant='outline'
                                className='bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              >
                                Card: No Card
                              </Badge>
                            )}

                            {/* Difficulty Badge */}
                            {question.difficulty && (
                              <Badge
                                variant={
                                  question.difficulty === 'beginner'
                                    ? 'default'
                                    : question.difficulty === 'intermediate'
                                      ? 'outline'
                                      : 'destructive'
                                }
                              >
                                {question.difficulty}
                              </Badge>
                            )}

                            {/* Type Badge */}
                            {question.type && (
                              <Badge variant='outline'>{question.type}</Badge>
                            )}
                          </div>
                        </div>
                        <div className='flex space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => openViewModal(question)}
                          >
                            <Eye className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => openEditModal(question)}
                          >
                            <Edit className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <Trash2 className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pagination After Questions List */}
        {totalCount > 0 && (
          <div className='flex items-center justify-between mt-6'>
            <div className='text-sm text-gray-700 dark:text-gray-300'>
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)}{' '}
              to {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
              questions
            </div>
            <div className='flex items-center space-x-4'>
              {/* Per Page Select */}
              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  Show:
                </span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={value => setPageSize(parseInt(value))}
                >
                  <SelectTrigger className='w-20'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='5'>5</SelectItem>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='20'>20</SelectItem>
                    <SelectItem value='50'>50</SelectItem>
                    <SelectItem value='100'>100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Navigation Buttons */}
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Question Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className='!max-w-6xl max-h-[90vh] overflow-y-auto mx-auto'>
          <DialogHeader className='pb-4 border-b'>
            <div className='flex items-center justify-between'>
              <div>
                <DialogTitle className='text-2xl font-bold flex items-center gap-2'>
                  <Eye className='w-6 h-6 text-blue-600' />
                  Question Details
                </DialogTitle>
                <DialogDescription className='text-gray-600 dark:text-gray-400'>
                  View and analyze question information
                </DialogDescription>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsViewModalOpen(false)}
                className='ml-auto'
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          </DialogHeader>
          <div className='flex-1 overflow-y-auto p-1'>
            {selectedQuestion && (
              <>
                {/* Header Section */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                        {selectedQuestion.title}
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        <Badge
                          variant='outline'
                          className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        >
                          {selectedQuestion.type
                            ?.replace('-', ' ')
                            .toUpperCase()}
                        </Badge>
                        <Badge
                          variant={
                            selectedQuestion.difficulty === 'beginner'
                              ? 'default'
                              : selectedQuestion.difficulty === 'intermediate'
                                ? 'outline'
                                : 'destructive'
                          }
                        >
                          {selectedQuestion.difficulty?.toUpperCase()}
                        </Badge>
                        <Badge
                          variant='secondary'
                          className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        >
                          {selectedQuestion.points || 1} Points
                        </Badge>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant={
                          selectedQuestion.isActive ? 'default' : 'secondary'
                        }
                      >
                        {selectedQuestion.isActive
                          ? '✅ Active'
                          : '❌ Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  {/* Left Column */}
                  <div className='space-y-6'>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
                      <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                        <BookOpen className='w-5 h-5 text-blue-600' />
                        Question Content
                      </h4>
                      <div className='prose prose-sm max-w-none dark:prose-invert'>
                        <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                          {selectedQuestion.content}
                        </p>
                      </div>
                    </div>

                    {/* Categories and Topics */}
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
                      <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                        <BarChart3 className='w-5 h-5 text-green-600' />
                        Categories & Topics
                      </h4>
                      <div className='space-y-4'>
                        {/* Topics */}
                        {selectedQuestion.topics &&
                        selectedQuestion.topics.length > 0 ? (
                          <div>
                            <Label className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                              Topics
                            </Label>
                            <div className='flex flex-wrap gap-2 mt-2'>
                              {selectedQuestion.topics.map((topic, index) => (
                                <Badge
                                  key={`${selectedQuestion.id}-topic-${index}`}
                                  variant={
                                    topic.is_primary ? 'default' : 'secondary'
                                  }
                                  className={`${
                                    topic.is_primary
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  }`}
                                >
                                  {topic.is_primary && '⭐ '}
                                  {topic.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Label className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                              Topics
                            </Label>
                            <Badge
                              variant='outline'
                              className='mt-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            >
                              No Topics Assigned
                            </Badge>
                          </div>
                        )}

                        {/* Categories */}
                        {selectedQuestion.categories &&
                        selectedQuestion.categories.length > 0 ? (
                          <div>
                            <Label className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                              Categories
                            </Label>
                            <div className='flex flex-wrap gap-2 mt-2'>
                              {selectedQuestion.categories.map(
                                (category, index) => (
                                  <Badge
                                    key={`${selectedQuestion.id}-category-${index}`}
                                    variant={
                                      category.is_primary
                                        ? 'default'
                                        : 'secondary'
                                    }
                                    className={`${
                                      category.is_primary
                                        ? 'bg-green-600 text-white'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}
                                  >
                                    {category.is_primary && '⭐ '}
                                    {category.name}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Label className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                              Categories
                            </Label>
                            <Badge
                              variant='outline'
                              className='mt-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            >
                              No Categories Assigned
                            </Badge>
                          </div>
                        )}

                        {/* Learning Card */}
                        {selectedQuestion.learning_card && (
                          <div>
                            <Label className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                              Learning Card
                            </Label>
                            <div className='mt-2'>
                              <Badge
                                variant='secondary'
                                className='bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              >
                                📚 {selectedQuestion.learning_card.title}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-6'>
                    {/* Options Display for Multiple Choice Questions */}
                    {selectedQuestion.type === 'multiple-choice' &&
                      selectedQuestion.options &&
                      selectedQuestion.options.length > 0 && (
                        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
                          <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                            <TrendingUp className='w-5 h-5 text-purple-600' />
                            Answer Options
                          </h4>
                          <div className='space-y-3'>
                            {selectedQuestion.options.map((option, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                  option.isCorrect
                                    ? 'bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-600 shadow-md'
                                    : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                }`}
                              >
                                <div className='flex items-center space-x-3'>
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                      option.isCorrect
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                                    }`}
                                  >
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <div className='flex-1'>
                                    <p
                                      className={`text-sm leading-relaxed ${
                                        option.isCorrect
                                          ? 'text-green-800 dark:text-green-200 font-medium'
                                          : 'text-gray-700 dark:text-gray-300'
                                      }`}
                                    >
                                      {option.text}
                                    </p>
                                  </div>
                                  {option.isCorrect && (
                                    <Badge
                                      variant='default'
                                      className='bg-green-600 text-white text-xs px-2 py-1'
                                    >
                                      ✅ Correct Answer
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Answer/Explanation Section */}
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
                      <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                        <HelpCircle className='w-5 h-5 text-orange-600' />
                        {selectedQuestion.type === 'multiple-choice'
                          ? 'Explanation'
                          : 'Correct Answer'}
                      </h4>
                      <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                        <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                          {selectedQuestion.explanation ||
                            'No explanation provided'}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Section */}
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
                      <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                        <BarChart3 className='w-5 h-5 text-gray-600' />
                        Question Metadata
                      </h4>
                      <div className='grid grid-cols-2 gap-4 text-sm'>
                        <div>
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Question ID
                          </Label>
                          <p className='font-mono text-xs text-gray-500 dark:text-gray-400 mt-1'>
                            {selectedQuestion.id}
                          </p>
                        </div>
                        <div>
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Created
                          </Label>
                          <p className='text-gray-700 dark:text-gray-300 mt-1'>
                            {selectedQuestion.createdAt
                              ? new Date(
                                  selectedQuestion.createdAt
                                ).toLocaleDateString()
                              : 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Last Updated
                          </Label>
                          <p className='text-gray-700 dark:text-gray-300 mt-1'>
                            {selectedQuestion.updatedAt
                              ? new Date(
                                  selectedQuestion.updatedAt
                                ).toLocaleDateString()
                              : 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Status
                          </Label>
                          <p className='text-gray-700 dark:text-gray-300 mt-1'>
                            {selectedQuestion.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter className='flex-shrink-0 border-t pt-4'>
            <Button variant='outline' onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Question Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='!max-w-6xl max-h-[90vh] overflow-y-auto mx-auto'>
          <DialogHeader className='pb-4 border-b'>
            <div className='flex items-center justify-between'>
              <div>
                <DialogTitle className='text-2xl font-bold flex items-center gap-2'>
                  <Edit className='w-6 h-6 text-green-600' />
                  Edit Question
                </DialogTitle>
                <DialogDescription className='text-gray-600 dark:text-gray-400'>
                  Modify question details and options
                </DialogDescription>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsEditModalOpen(false)}
                className='ml-auto'
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          </DialogHeader>
          <div className='flex-1 overflow-y-auto'>
            {selectedQuestion && (
              <QuestionForm
                initialData={selectedQuestion}
                onSubmit={handleUpdateQuestion}
                onCancel={() => setIsEditModalOpen(false)}
                cards={cards}
                allCategories={allCategories}
                allTags={[]}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className='!max-w-6xl max-h-[90vh] overflow-y-auto mx-auto'>
          <DialogHeader className='pb-4 border-b'>
            <div className='flex items-center justify-between'>
              <div>
                <DialogTitle className='text-2xl font-bold flex items-center gap-2'>
                  <Plus className='w-6 h-6 text-blue-600' />
                  Create New Question
                </DialogTitle>
                <DialogDescription className='text-gray-600 dark:text-gray-400'>
                  Add a new question to the database
                </DialogDescription>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsCreateModalOpen(false)}
                className='ml-auto'
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          </DialogHeader>
          <div className='flex-1 overflow-y-auto'>
            <QuestionForm
              onSubmit={handleCreateQuestion}
              onCancel={() => setIsCreateModalOpen(false)}
              cards={cards}
              allCategories={allCategories}
              allTags={[]}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface QuestionFormProps {
  initialData?: UnifiedQuestion | undefined;
  onSubmit: (question: Partial<UnifiedQuestion>) => void;
  onCancel: () => void;
  cards: Array<{ id: string; title: string }>;
  allCategories: string[];
  allTags: string[];
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  cards,
  allCategories,
  allTags,
}) => {
  const [formData, setFormData] = useState<Partial<UnifiedQuestion>>(
    initialData || {
      title: '',
      content: '',
      explanation: '',
      type: 'multiple-choice',
      difficulty: 'beginner',
      isActive: true,
      options: [],
      tags: [],
      points: 1,
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        options: initialData.options || [],
        tags: initialData.tags || [],
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name: keyof UnifiedQuestion, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const questionTypes = ['multiple-choice', 'open-ended', 'true-false', 'code'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <form onSubmit={handleSubmit} className='space-y-8 p-1'>
      {/* Header Section */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Question Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div>
            <Label htmlFor='title' className='text-sm font-medium'>
              Title
            </Label>
            <Input
              id='title'
              name='title'
              value={formData.title || ''}
              onChange={handleChange}
              required
              className='mt-1'
              placeholder='Enter question title...'
            />
          </div>
          <div>
            <Label htmlFor='type' className='text-sm font-medium'>
              Type
            </Label>
            <Select
              value={formData.type || 'multiple-choice'}
              onValueChange={value => handleSelectChange('type', value)}
            >
              <SelectTrigger className='mt-1'>
                <SelectValue placeholder='Select Type' />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='difficulty' className='text-sm font-medium'>
              Difficulty
            </Label>
            <Select
              value={formData.difficulty || 'beginner'}
              onValueChange={value => handleSelectChange('difficulty', value)}
            >
              <SelectTrigger className='mt-1'>
                <SelectValue placeholder='Select Difficulty' />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='category' className='text-sm font-medium'>
              Category
            </Label>
            <Select
              value={formData.category || ''}
              onValueChange={value => handleSelectChange('category', value)}
            >
              <SelectTrigger className='mt-1'>
                <SelectValue placeholder='Select Category' />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='learning_card_id' className='text-sm font-medium'>
              Learning Card
            </Label>
            <Select
              value={formData.learning_card_id || ''}
              onValueChange={value =>
                handleSelectChange('learning_card_id', value)
              }
            >
              <SelectTrigger className='mt-1'>
                <SelectValue placeholder='Select Learning Card' />
              </SelectTrigger>
              <SelectContent>
                {cards.map(card => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='points' className='text-sm font-medium'>
              Points
            </Label>
            <Input
              id='points'
              name='points'
              type='number'
              value={formData.points || 1}
              onChange={handleChange}
              className='mt-1'
              min='1'
              max='10'
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
        <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
          <BookOpen className='w-5 h-5 text-blue-600' />
          Question Content
        </h4>
        <div>
          <Label htmlFor='content' className='text-sm font-medium'>
            Content
          </Label>
          <Textarea
            id='content'
            name='content'
            value={formData.content || ''}
            onChange={handleChange}
            rows={5}
            required
            className='mt-1'
            placeholder='Enter the question content...'
          />
        </div>
      </div>

      {/* Options Section for Multiple Choice Questions */}
      {formData.type === 'multiple-choice' && (
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='text-lg font-semibold flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-purple-600' />
              Answer Options
            </h4>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  options: [
                    ...(prev.options || []),
                    { id: `option-${Date.now()}`, text: '', isCorrect: false },
                  ],
                }));
              }}
              className='bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Option
            </Button>
          </div>

          <div className='space-y-4'>
            {(formData.options || []).map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  option.isCorrect
                    ? 'bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-600'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                }`}
              >
                <div className='flex items-center space-x-3'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      option.isCorrect
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>

                  <div className='flex-1'>
                    <Input
                      value={option.text}
                      onChange={e => {
                        const newOptions = [...(formData.options || [])];
                        newOptions[index] = { ...option, text: e.target.value };
                        setFormData(prev => ({ ...prev, options: newOptions }));
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className='border-0 bg-transparent p-0 text-sm'
                    />
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      checked={option.isCorrect}
                      onCheckedChange={checked => {
                        const newOptions = [...(formData.options || [])];
                        newOptions[index] = { ...option, isCorrect: !!checked };
                        setFormData(prev => ({ ...prev, options: newOptions }));
                      }}
                    />
                    <Label className='text-sm font-medium'>
                      {option.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                    </Label>
                  </div>

                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      const newOptions = (formData.options || []).filter(
                        (_, i) => i !== index
                      );
                      setFormData(prev => ({ ...prev, options: newOptions }));
                    }}
                    className='text-red-600 hover:text-red-700 hover:bg-red-50'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {(!formData.options || formData.options.length === 0) && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg'>
              <TrendingUp className='w-12 h-12 mx-auto mb-4 text-gray-400' />
              <p className='text-lg font-medium mb-2'>No options added yet</p>
              <p className='text-sm'>
                Click &quot;Add Option&quot; to get started with multiple choice
                answers
              </p>
            </div>
          )}
        </div>
      )}

      {/* Answer/Explanation Section */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
        <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
          <HelpCircle className='w-5 h-5 text-orange-600' />
          {formData.type === 'multiple-choice'
            ? 'Explanation'
            : 'Correct Answer'}
        </h4>
        <div>
          <Label htmlFor='explanation' className='text-sm font-medium'>
            {formData.type === 'multiple-choice' ? 'Explanation' : 'Answer'}
          </Label>
          <Textarea
            id='explanation'
            name='explanation'
            value={formData.explanation || ''}
            onChange={handleChange}
            rows={4}
            className='mt-1'
            placeholder={
              formData.type === 'multiple-choice'
                ? 'Enter explanation for the correct answer...'
                : 'Enter the correct answer...'
            }
          />
        </div>
      </div>

      {/* Metadata Section */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm'>
        <h4 className='text-lg font-semibold mb-4 flex items-center gap-2'>
          <BarChart3 className='w-5 h-5 text-gray-600' />
          Additional Settings
        </h4>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='isActive'
            name='isActive'
            checked={formData.isActive || false}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, isActive: !!checked }))
            }
          />
          <Label htmlFor='isActive' className='text-sm font-medium'>
            Question is Active
          </Label>
        </div>
      </div>

      <div className='pt-6 border-t flex justify-end space-x-3'>
        <Button variant='outline' onClick={onCancel} type='button'>
          Cancel
        </Button>
        <Button type='submit' className='bg-blue-600 hover:bg-blue-700'>
          {initialData ? 'Update Question' : 'Create Question'}
        </Button>
      </div>
    </form>
  );
};
