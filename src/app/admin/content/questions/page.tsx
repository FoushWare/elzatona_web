'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Search,
  Filter,
  BookOpen,
  Eye,
} from 'lucide-react';
import {
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
  useCards,
} from '@/hooks/useTanStackQuery';
import { UnifiedQuestion } from '@/lib/unified-question-schema';
import { useQuestionsSearch } from '@/hooks/useAdvancedSearch';
import AdvancedSearch from '@/shared/components/common/AdvancedSearch';

// Use UnifiedQuestion instead of custom Question interface
type Question = UnifiedQuestion;

export default function AdminContentQuestionsPage() {
  // Advanced search hook
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    searchStats,
    suggestions,
  } = useQuestionsSearch({
    defaultPageSize: 10,
    debounceMs: 300,
  });

  // Additional data for forms
  const { data: cardsData } = useCards();

  // Mutation hooks
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();

  // Local state for UI
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Derived data
  const questions = results.data;
  const cards = cardsData?.data || [];

  // Extract unique categories and tags for search filters
  const allCategories = useMemo(() => {
    const categories = [
      ...new Set(questions.map((q: Question) => q.category).filter(Boolean)),
    ] as string[];
    return categories.sort();
  }, [questions]);

  const allTags = useMemo(() => {
    const tags = [...new Set(questions.flatMap((q: Question) => q.tags || []))];
    return tags.sort();
  }, [questions]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionType = (question: Question) => {
    const title = question.title || question.content || '';
    const answerCount = question.sampleAnswers?.length || 0;

    // Check for True/False questions
    if (title.toLowerCase().includes('true or false') || answerCount === 0) {
      return 'True/False';
    }

    // Check for multiple choice questions (multiple short answers)
    if (answerCount > 1) {
      const avgAnswerLength =
        (question.sampleAnswers?.reduce(
          (sum, answer) => sum + answer.length,
          0
        ) || 0) / answerCount;
      // If average answer length is short (< 50 chars), likely multiple choice
      if (avgAnswerLength < 50) {
        return 'Multiple Choice';
      }
    }

    // Default to open-ended
    return 'Open-ended';
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'Multiple Choice':
        return 'bg-purple-100 text-purple-800';
      case 'True/False':
        return 'bg-orange-100 text-orange-800';
      case 'Open-ended':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardName = (cardId?: string, cardType?: string) => {
    if (cardId) {
      const card = cards.find(c => c.id === cardId);
      if (card) return (card as any).name;
    }
    if (cardType) {
      return cardType;
    }
    return 'Unknown Card';
  };

  const getCardColor = (cardId?: string, cardType?: string) => {
    if (cardId) {
      const card = cards.find(c => c.id === cardId);
      if (card) return (card as any).color;
    }
    // Default colors for card types
    const defaultColors: Record<string, string> = {
      'Core Technologies': '#3B82F6',
      'Framework Questions': '#10B981',
      'Problem Solving': '#F59E0B',
      'System Design': '#EF4444',
    };
    return defaultColors[cardType || ''] || '#6B7280';
  };

  // Handle view question
  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setIsViewModalOpen(true);
  };

  // Handle edit question
  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  // Handle delete question
  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestionMutation.mutateAsync(questionId);
        alert('Question deleted successfully');
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Error deleting question');
      }
    }
  };

  // Handle update question
  const handleUpdateQuestion = async (
    questionId: string,
    updatedData: Partial<UnifiedQuestion>
  ) => {
    try {
      await updateQuestionMutation.mutateAsync({
        id: questionId,
        data: updatedData,
      });
      alert('Question updated successfully');
      closeModals();
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Error updating question');
    }
  };

  // Handle create question
  const handleCreateQuestion = async (
    questionData: Partial<UnifiedQuestion>
  ) => {
    try {
      await createQuestionMutation.mutateAsync(questionData);
      alert('Question created successfully');
      closeModals();
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question');
    }
  };

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedQuestion(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading questions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Questions Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage all questions across different categories and topics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchStats.totalItems}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Filter className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Categories
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchStats.categories.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Search className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Filtered Results
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {results.totalCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchStats.activeItems}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <AdvancedSearch
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
            placeholder="Search questions by title, content, or tags..."
            availableCategories={allCategories}
            availableTags={allTags}
            availableDifficulties={['easy', 'medium', 'hard', 'intermediate']}
            totalItems={searchStats.totalItems}
            activeItems={searchStats.activeItems}
            isLoading={isLoading}
            suggestions={suggestions}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing{' '}
          {results.data.length > 0
            ? (currentPage - 1) * (filters.limit || 10) + 1
            : 0}{' '}
          to {Math.min(currentPage * (filters.limit || 10), results.totalCount)}{' '}
          of {results.totalCount} questions
        </div>
        <div className="flex items-center space-x-4">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Per page:
            </span>
            <Select
              value={(filters.limit || 10).toString()}
              onValueChange={value =>
                setFilters(prev => ({ ...prev, limit: parseInt(value) }))
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Per Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-500">...</span>
                    <Button
                      variant={
                        currentPage === totalPages ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-8 h-8 p-0"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Questions ({results.totalCount})</span>
            <Button
              className="flex items-center space-x-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              {results.data.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm ||
                    Object.keys(filters).some(
                      key => filters[key as keyof typeof filters] !== undefined
                    )
                      ? 'Try adjusting your search criteria'
                      : 'No questions available'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.data.map(question => (
                    <div
                      key={question.id}
                      className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            {question.title ||
                              question.content ||
                              'No question text'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {question.sampleAnswers?.[0] || 'No answer text'}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Difficulty Badge */}
                            <Badge
                              className={getDifficultyColor(
                                question.difficulty
                              )}
                            >
                              {question.difficulty}
                            </Badge>

                            {/* Question Type Badge */}
                            <Badge
                              className={getQuestionTypeColor(
                                getQuestionType(question)
                              )}
                            >
                              {getQuestionType(question)}
                            </Badge>

                            {/* Card Badge */}
                            {((question as any).cardType ||
                              (question as any).cardId) && (
                              <Badge
                                variant="outline"
                                className="text-xs"
                                style={{
                                  borderColor: getCardColor(
                                    (question as any).cardId,
                                    (question as any).cardType
                                  ),
                                  color: getCardColor(
                                    (question as any).cardId,
                                    (question as any).cardType
                                  ),
                                }}
                              >
                                📚{' '}
                                {getCardName(
                                  (question as any).cardId,
                                  (question as any).cardType
                                )}
                              </Badge>
                            )}

                            {/* Category Badge */}
                            <Badge variant="outline" className="text-xs">
                              📁 {question.category}
                            </Badge>

                            {/* Topic Badge */}
                            {question.topic && (
                              <Badge variant="outline" className="text-xs">
                                🏷️ {question.topic}
                              </Badge>
                            )}

                            {/* Plans Badge */}
                            {(question as any).planAssignments &&
                              (question as any).planAssignments.length > 0 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  📋 {(question as any).planAssignments.length}{' '}
                                  Plan
                                  {(question as any).planAssignments.length > 1
                                    ? 's'
                                    : ''}
                                </Badge>
                              )}

                            {/* Included in Plans Badge */}
                            {(question as any).isIncludedInPlans && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-green-50 text-green-700 border-green-200"
                              >
                                ✅ In Plans
                              </Badge>
                            )}

                            {/* Additional Topics */}
                            {(question as any).topics &&
                              (question as any).topics.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  🏷️{' '}
                                  {(question as any).topics
                                    .slice(0, 2)
                                    .join(', ')}
                                  {(question as any).topics.length > 2 &&
                                    ` +${(question as any).topics.length - 2} more`}
                                </Badge>
                              )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewQuestion(question)}
                            title="View Question"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditQuestion(question)}
                            title="Edit Question"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteQuestion(question.id)}
                            title="Delete Question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Question Modal */}
      {isViewModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                View Question
              </h2>
              <Button variant="ghost" onClick={closeModals}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Question
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedQuestion.title ||
                    selectedQuestion.content ||
                    'No question text'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Answer
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedQuestion.sampleAnswers?.[0] || 'No answer text'}
                </p>
              </div>

              {selectedQuestion.explanation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Explanation
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relationships
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {/* Card Badge */}
                    {((selectedQuestion as any).cardType ||
                      (selectedQuestion as any).cardId) && (
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: getCardColor(
                            (selectedQuestion as any).cardId,
                            (selectedQuestion as any).cardType
                          ),
                          color: getCardColor(
                            (selectedQuestion as any).cardId,
                            (selectedQuestion as any).cardType
                          ),
                        }}
                      >
                        📚{' '}
                        {getCardName(
                          (selectedQuestion as any).cardId,
                          (selectedQuestion as any).cardType
                        )}
                      </Badge>
                    )}

                    {/* Category Badge */}
                    <Badge variant="outline" className="text-xs">
                      📁 {selectedQuestion.category}
                    </Badge>

                    {/* Topic Badge */}
                    {selectedQuestion.topic && (
                      <Badge variant="outline" className="text-xs">
                        🏷️ {selectedQuestion.topic}
                      </Badge>
                    )}

                    {/* Plans Badge */}
                    {(selectedQuestion as any).planAssignments &&
                      (selectedQuestion as any).planAssignments.length > 0 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          📋 {(selectedQuestion as any).planAssignments.length}{' '}
                          Plan
                          {(selectedQuestion as any).planAssignments.length > 1
                            ? 's'
                            : ''}
                        </Badge>
                      )}

                    {/* Included in Plans Badge */}
                    {(selectedQuestion as any).isIncludedInPlans && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-50 text-green-700 border-green-200"
                      >
                        ✅ In Plans
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Difficulty
                    </label>
                    <Badge
                      className={getDifficultyColor(
                        selectedQuestion.difficulty
                      )}
                    >
                      {selectedQuestion.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question Type
                    </label>
                    <Badge
                      className={getQuestionTypeColor(
                        getQuestionType(selectedQuestion)
                      )}
                    >
                      {getQuestionType(selectedQuestion)}
                    </Badge>
                  </div>
                </div>
              </div>

              {(selectedQuestion as any).topics &&
                (selectedQuestion as any).topics.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Topics
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(selectedQuestion as any).topics.map(
                        (topic: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={closeModals}>
                Close
              </Button>
              <Button
                onClick={() => {
                  closeModals();
                  handleEditQuestion(selectedQuestion);
                }}
              >
                Edit Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {isEditModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Question
              </h2>
              <Button variant="ghost" onClick={closeModals}>
                ✕
              </Button>
            </div>

            <form id="edit-question-form">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Title
                  </label>
                  <Input
                    name="title"
                    defaultValue={
                      selectedQuestion.title || selectedQuestion.content || ''
                    }
                    placeholder="Enter question title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Answer
                  </label>
                  <textarea
                    name="answer"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    rows={3}
                    defaultValue={selectedQuestion.sampleAnswers?.[0] || ''}
                    placeholder="Enter answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Explanation
                  </label>
                  <textarea
                    name="explanation"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    rows={3}
                    defaultValue={selectedQuestion.explanation || ''}
                    placeholder="Enter explanation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Difficulty
                    </label>
                    <Select
                      name="difficulty"
                      defaultValue={selectedQuestion.difficulty}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question Type
                    </label>
                    <Select
                      name="type"
                      defaultValue={getQuestionType(selectedQuestion)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open-ended">Open-ended</SelectItem>
                        <SelectItem value="Multiple Choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="True/False">True/False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <Input
                    name="category"
                    defaultValue={selectedQuestion.category}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Topic
                  </label>
                  <Input
                    name="topic"
                    defaultValue={selectedQuestion.topic}
                    placeholder="Enter topic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Type
                  </label>
                  <Select
                    name="cardType"
                    defaultValue={(selectedQuestion as any).cardType}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core Technologies">
                        Core Technologies
                      </SelectItem>
                      <SelectItem value="Framework Questions">
                        Framework Questions
                      </SelectItem>
                      <SelectItem value="Problem Solving">
                        Problem Solving
                      </SelectItem>
                      <SelectItem value="System Design">
                        System Design
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Get form data
                  const form = document.querySelector(
                    '#edit-question-form'
                  ) as HTMLFormElement;
                  if (!form) return;

                  const formData = new FormData(form);
                  const updatedData: Partial<UnifiedQuestion> = {
                    title: formData.get('title') as string,
                    content: formData.get('title') as string, // Use title as content if no separate content field
                    sampleAnswers: [formData.get('answer') as string],
                    explanation: formData.get('explanation') as string,
                    difficulty: formData.get('difficulty') as
                      | 'beginner'
                      | 'intermediate'
                      | 'advanced',
                    category: formData.get('category') as string,
                    topic: formData.get('topic') as string,
                    type: formData.get('type') as
                      | 'multiple-choice'
                      | 'open-ended'
                      | 'true-false'
                      | 'code',
                    updatedAt: new Date().toISOString(),
                  };

                  handleUpdateQuestion(selectedQuestion.id, updatedData);
                }}
              >
                Update Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Question Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create New Question
              </h2>
              <Button variant="ghost" onClick={closeModals}>
                ✕
              </Button>
            </div>

            <form id="create-question-form">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Title *
                  </label>
                  <Input
                    name="title"
                    placeholder="Enter question title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Answer *
                  </label>
                  <textarea
                    name="answer"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Enter answer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Explanation
                  </label>
                  <textarea
                    name="explanation"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Enter explanation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Difficulty *
                    </label>
                    <Select name="difficulty" defaultValue="medium" required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question Type
                    </label>
                    <Select name="type" defaultValue="Open-ended">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open-ended">Open-ended</SelectItem>
                        <SelectItem value="Multiple Choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="True/False">True/False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <Input name="category" placeholder="Enter category" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Topic
                  </label>
                  <Input name="topic" placeholder="Enter topic" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Type
                  </label>
                  <Select name="cardType" defaultValue="Core Technologies">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core Technologies">
                        Core Technologies
                      </SelectItem>
                      <SelectItem value="Framework Questions">
                        Framework Questions
                      </SelectItem>
                      <SelectItem value="Problem Solving">
                        Problem Solving
                      </SelectItem>
                      <SelectItem value="System Design">
                        System Design
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Get form data
                  const form = document.querySelector(
                    '#create-question-form'
                  ) as HTMLFormElement;
                  if (!form) return;

                  const formData = new FormData(form);
                  const questionData: Partial<UnifiedQuestion> = {
                    title: formData.get('title') as string,
                    content: formData.get('title') as string, // Use title as content if no separate content field
                    sampleAnswers: [formData.get('answer') as string],
                    explanation: formData.get('explanation') as string,
                    difficulty: formData.get('difficulty') as
                      | 'beginner'
                      | 'intermediate'
                      | 'advanced',
                    category: formData.get('category') as string,
                    topic: formData.get('topic') as string,
                    type: formData.get('type') as
                      | 'multiple-choice'
                      | 'open-ended'
                      | 'true-false'
                      | 'code',
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };

                  handleCreateQuestion(questionData);
                }}
              >
                Create Question
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
