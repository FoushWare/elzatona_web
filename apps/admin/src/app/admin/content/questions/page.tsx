'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, Button } from '@elzatona/components';
import { FormModal } from '@elzatona/components';
import { QuestionPracticeView } from '../../../../components/QuestionPracticeView';
import { ViewQuestionModal } from '../../../../components/ViewQuestionModal';
import { Loader2 } from 'lucide-react';
import { AdvancedSearch } from '@elzatona/components';
import { StatsCards } from './components/StatsCards';
import { CategoriesOverview } from './components/CategoriesOverview';
import { FiltersCard } from './components/FiltersCard';
import { QuestionsList } from './components/QuestionsList';
import { PaginationControls } from './components/PaginationControls';
import { QuestionForm, type UnifiedQuestion } from './components/QuestionForm';

// Re-export UnifiedQuestion type for use in this file
export type { UnifiedQuestion };

export default function AdminContentQuestionsPage() {
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

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
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form ref for modal submission
  const questionFormRef = useRef<HTMLFormElement>(null);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: pageSize.toString(),
        });

        // Add filters if selected
        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        if (selectedTopic) {
          params.append('topic', selectedTopic);
        }

        const url = `/api/questions/unified?${params.toString()}`;
        console.log('Fetching questions from:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
          });
          throw new Error(
            `Failed to fetch questions: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        console.log('Questions fetched successfully:', {
          count: result.data?.length || 0,
          total: result.pagination?.totalCount || 0,
        });

        setQuestions(result.data || []);
        setTotalCount(result.pagination?.totalCount || 0);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : err instanceof TypeError && err.message === 'Failed to fetch'
            ? 'Network error: Unable to connect to the server. Please check your connection and try again.'
            : 'Unknown error occurred while fetching questions';
        setError(errorMessage);
        setLoading(false);
        // Set empty state on error to prevent UI issues
        setQuestions([]);
        setTotalCount(0);
      }
    };

    fetchQuestions();
  }, [currentPage, pageSize, selectedCategory, selectedTopic]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedCategory, selectedTopic]);

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
          console.log('Categories data:', data); // Debug log
          setCategoriesData(data);
        } else {
          console.error('Failed to fetch categories:', response.statusText);
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
    setIsQuestionModalOpen(false);
    setSelectedQuestion(null);
    setIsEditMode(false);
  };

  // Handlers for CRUD operations
  const handleCreateQuestion = async (
    questionData: Partial<UnifiedQuestion>
  ) => {
    try {
      if (isEditMode && selectedQuestion) {
        // Update existing question
      const updatedQuestion: UnifiedQuestion = {
          ...selectedQuestion,
          ...questionData,
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
      } else {
        // Create new question
        const response = await fetch('/api/questions/unified', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(questionData),
        });

        if (response.ok) {
          alert('Question created successfully');
          closeModals();
          window.location.reload();
        } else {
          throw new Error('Failed to create question');
        }
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} question:`, error);
      alert(`Error ${isEditMode ? 'updating' : 'creating'} question`);
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
    setIsEditMode(true);
    setIsQuestionModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedQuestion(null);
    setIsEditMode(false);
    setIsQuestionModalOpen(true);
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
          Question Management ...
        </h1>

        {/* Stats Cards */}
        <StatsCards
          totalCount={totalCount}
          categoryCount={categoryCounts.length}
          activeQuestionsCount={questions.filter(q => q.isActive).length}
          filteredResultsCount={displayQuestions.length}
        />

        {/* Categories Overview */}
        <CategoriesOverview categoryCounts={categoryCounts} />

        {/* Category and Topic Filters */}
        <FiltersCard
          selectedCategory={selectedCategory}
          selectedTopic={selectedTopic}
          categoriesData={categoriesData}
          topicsData={topicsData}
          onCategoryChange={(value) => {
                      setSelectedCategory(value);
            setCurrentPage(1);
                    }}
          onTopicChange={(value) => {
                      setSelectedTopic(value);
            setCurrentPage(1);
                    }}
          onClearFilters={() => {
                    setSelectedCategory('');
                    setSelectedTopic('');
                    setCurrentPage(1);
                  }}
        />

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
        <QuestionsList
          questions={displayQuestions}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={handleDeleteQuestion}
          onCreate={openCreateModal}
        />

        {/* Pagination After Questions List */}
        {totalCount > 0 && (
          <div className='mt-6'>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      {/* View Question Modal with Edit Toggle */}
      <ViewQuestionModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        question={selectedQuestion}
        cards={cards}
        allCategories={allCategories}
        onUpdate={handleCreateQuestion}
        editFormRef={questionFormRef}
      />

      {/* Unified Question Modal (Create/Edit) */}
      <FormModal
        isOpen={isQuestionModalOpen}
        onClose={closeModals}
        title={isEditMode ? 'Edit Question' : 'Add Question'}
        maxWidth="max-w-6xl"
        cancelLabel="Cancel"
        saveLabel={isEditMode ? 'Update Question' : 'Create Question'}
        onSave={() => {
          if (questionFormRef.current) {
            questionFormRef.current.requestSubmit();
          }
        }}
        onCancel={closeModals}
      >
          <QuestionForm
          ref={questionFormRef}
          initialData={isEditMode && selectedQuestion ? selectedQuestion : undefined}
          onSubmit={handleCreateQuestion}
          onCancel={closeModals}
          cards={cards}
          allCategories={allCategories}
          allTags={[]}
        />
      </FormModal>
    </div>
  );
}
