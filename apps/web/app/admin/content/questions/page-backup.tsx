'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Trash2,
  Edit,
  Eye,
  Plus,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
} from 'lucide-react';

interface Question {
  id: string;
  title?: string;
  content?: string;
  question?: string;
  category?: string;
  difficulty?: string;
  type?: string;
  options?: string[];
  correctAnswer?: string;
  topicIds?: string[];
  tags?: string[];
  learningPath?: string;
}

interface Topic {
  id: string;
  name: string;
  description?: string;
  category?: string;
  difficulty?: string;
}

export default function QuestionsManagementPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Prevent duplicate API calls
  const [isLoadingRef, setIsLoadingRef] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  // Topics state
  const [topics, setTopics] = useState<Topic[]>([]);

  // Load questions with error handling for Firestore internal assertion errors
  const loadQuestions = useCallback(
    async (
      page = currentPage,
      category = selectedCategory,
      size = pageSize
    ) => {
      // Prevent duplicate API calls
      if (isLoadingRef) {
        console.log('⏸️ Skipping duplicate API call');
        return;
      }

      console.log(
        `🔄 Loading questions - Page: ${page}, Category: ${category}, PageSize: ${size} (isLoadingRef: ${isLoadingRef})`
      );
      setIsLoadingRef(true);
      setIsLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: size.toString(),
        });

        if (category !== 'all') {
          params.append('category', category);
        }

        // Use a simple API call instead of the hook to avoid Firestore issues
        const response = await fetch(`/api/questions/unified?${params}`);
        const data = await response.json();

        console.log('🔍 API Response:', {
          success: data.success,
          dataLength: data.data?.length,
          totalCount: data.pagination?.totalCount,
          page: data.pagination?.page,
          error: data.error,
        });

        if (data.success) {
          console.log('✅ Questions loaded:', data.data.length);
          setQuestions(data.data || []);

          // Update pagination state
          if (data.pagination) {
            setTotalCount(data.pagination.totalCount);
            setTotalPages(data.pagination.totalPages);
            setHasNextPage(data.pagination.hasNextPage);
            setHasPrevPage(data.pagination.hasPrevPage);
            setCurrentPage(data.pagination.page);
          }
        } else {
          console.error('❌ API error:', data.error);
          setError(data.error || 'Failed to load questions');
        }
      } catch (err) {
        console.error('❌ Fetch error:', err);
        // Check if it's a Firestore internal assertion error
        if (
          err instanceof Error &&
          err.message.includes('INTERNAL ASSERTION FAILED')
        ) {
          console.warn(
            '⚠️ Firestore internal error (non-critical), showing empty state'
          );
          setQuestions([]);
          setError('Database temporarily unavailable. Please try again later.');
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setIsLoadingRef(false);
        setIsLoading(false);
      }
    },
    [currentPage, selectedCategory, pageSize]
  );

  // Load topics
  const loadTopics = useCallback(async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();

      if (data.success) {
        setTopics(data.data || []);
        console.log('✅ Topics loaded:', data.data?.length || 0);
      } else {
        console.error('❌ Failed to load topics:', data.error);
      }
    } catch (error) {
      console.error('❌ Error loading topics:', error);
    }
  }, []);

  // Load data on mount and when category changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes

    // Add a small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      console.log('🔄 useEffect triggered - loading questions with timeout');
      loadQuestions(1, selectedCategory, pageSize);
    }, 100);

    // Cleanup function to prevent race conditions
    return () => {
      clearTimeout(timer);
      setIsLoadingRef(false);
    };
  }, [selectedCategory, pageSize]); // Remove loadQuestions from dependencies

  // Load data when currentPage changes (for pagination)
  useEffect(() => {
    if (currentPage > 1) {
      loadQuestions(currentPage, selectedCategory, pageSize);
    }
  }, [currentPage]);

  // Load topics on mount
  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  // Pagination functions
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      loadQuestions(newPage, selectedCategory, pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    loadQuestions(1, selectedCategory, newPageSize);
  };

  // Handle edit question
  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowEditModal(true);
  };

  // Handle preview question
  const handlePreviewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowPreviewModal(true);
  };

  // Handle save edited question
  const handleSaveQuestion = async (updatedQuestion: Question) => {
    try {
      const response = await fetch(
        `/api/questions/unified/${updatedQuestion.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedQuestion),
        }
      );
      const data = await response.json();

      if (data.success) {
        // Reload current page after update
        loadQuestions(currentPage, selectedCategory, pageSize);
        setShowEditModal(false);
        setSelectedQuestion(null);
      } else {
        console.error('Failed to update question:', data.error);
        setError(data.error || 'Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // Delete question
  const deleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const response = await fetch(`/api/questions/unified/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        // Reload current page after deletion
        loadQuestions(currentPage, selectedCategory, pageSize);
      } else {
        console.error('Failed to delete question:', data.error);
        setError(data.error || 'Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // Helper function to get topic names by IDs
  const getTopicNames = (topicIds: string[] = []) => {
    return topicIds
      .map(id => topics.find(topic => topic.id === id)?.name)
      .filter(Boolean);
  };

  // Get unique categories from questions
  const categories = [...new Set(questions.map(q => q.category))].filter(
    Boolean
  );

  // Filter questions based on search and category
  const filteredQuestions = questions.filter(question => {
    const matchesSearch =
      !searchTerm ||
      question.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || question.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Debug logging
  console.log('🔍 Debug - Questions state:', {
    questionsLength: questions.length,
    filteredLength: filteredQuestions.length,
    selectedCategory,
    searchTerm,
    isLoading,
    error,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading questions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => loadQuestions()}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Questions Management</h1>
        <div className="flex space-x-2">
          <Button onClick={() => loadQuestions()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              console.log('🔄 Manual load triggered');
              loadQuestions(1, selectedCategory, pageSize);
            }}
          >
            Load Questions
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category || ''}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'No questions available. Add some questions to get started.'}
              </p>
              <Button
                onClick={() =>
                  (window.location.href = '/admin/content/questions/new')
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredQuestions.map(question => (
            <Card
              key={question.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {question.title || 'Untitled Question'}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {question.content ||
                        question.question ||
                        'No content available'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">
                        {question.category || 'No Category'}
                      </Badge>
                      <Badge variant="outline">
                        {question.difficulty || 'Unknown'}
                      </Badge>
                      <Badge variant="outline">
                        {question.type || 'Unknown Type'}
                      </Badge>
                      {question.learningPath && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {question.learningPath}
                        </Badge>
                      )}
                    </div>

                    {/* Topics and Tags */}
                    {((question.topicIds?.length ?? 0) > 0 ||
                      (question.tags?.length ?? 0) > 0) && (
                      <div className="mb-3">
                        {/* Topics */}
                        {question.topicIds && question.topicIds.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Topics:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {getTopicNames(question.topicIds).map(
                                (topicName, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200"
                                  >
                                    {topicName}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {question.tags && question.tags.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Tags:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {question.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewQuestion(question)}
                      title="Preview Question"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditQuestion(question)}
                      title="Edit Question"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteQuestion(question.id)}
                      title="Delete Question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Page Size Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Show:</label>
                <Select
                  value={pageSize.toString()}
                  onValueChange={value => handlePageSizeChange(parseInt(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-500">per page</span>
              </div>

              {/* Pagination Info */}
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
                questions
              </div>

              {/* Page Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevPage}
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Question</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedQuestion(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={selectedQuestion.title || ''}
                  onChange={e =>
                    setSelectedQuestion(prev =>
                      prev
                        ? {
                            ...prev,
                            title: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="Question title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                  value={
                    selectedQuestion.content || selectedQuestion.question || ''
                  }
                  onChange={e =>
                    setSelectedQuestion(prev =>
                      prev
                        ? {
                            ...prev,
                            content: e.target.value,
                            question: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="Question content"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <Input
                    value={selectedQuestion.category || ''}
                    onChange={e =>
                      setSelectedQuestion(prev =>
                        prev
                          ? {
                              ...prev,
                              category: e.target.value,
                            }
                          : null
                      )
                    }
                    placeholder="Category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Difficulty
                  </label>
                  <Select
                    value={selectedQuestion.difficulty || 'medium'}
                    onValueChange={value =>
                      setSelectedQuestion(prev =>
                        prev
                          ? {
                              ...prev,
                              difficulty: value,
                            }
                          : null
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <Select
                  value={selectedQuestion.type || 'multiple-choice'}
                  onValueChange={value =>
                    setSelectedQuestion(prev =>
                      prev
                        ? {
                            ...prev,
                            type: value,
                          }
                        : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value="single-choice">Single Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="text">Text Input</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedQuestion(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => handleSaveQuestion(selectedQuestion)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Question Preview</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedQuestion(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedQuestion.title || 'Untitled Question'}
                </h3>
                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: (
                        selectedQuestion.content ||
                        selectedQuestion.question ||
                        'No content available'
                      )
                        .replace(/\n/g, '<br>')
                        .replace(
                          /```([\s\S]*?)```/g,
                          '<pre><code>$1</code></pre>'
                        )
                        .replace(/`([^`]+)`/g, '<code>$1</code>'),
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {selectedQuestion.category || 'No Category'}
                </Badge>
                <Badge variant="outline">
                  {selectedQuestion.difficulty || 'Unknown'}
                </Badge>
                <Badge variant="outline">
                  {selectedQuestion.type || 'Unknown Type'}
                </Badge>
                {selectedQuestion.learningPath && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {selectedQuestion.learningPath}
                  </Badge>
                )}
              </div>

              {/* Topics and Tags in Preview */}
              {((selectedQuestion.topicIds?.length ?? 0) > 0 ||
                (selectedQuestion.tags?.length ?? 0) > 0) && (
                <div className="space-y-3">
                  {/* Topics */}
                  {selectedQuestion.topicIds &&
                    selectedQuestion.topicIds.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-gray-700">
                          Topics:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {getTopicNames(selectedQuestion.topicIds).map(
                            (topicName, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-green-50 text-green-700 border-green-200"
                              >
                                {topicName}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Tags */}
                  {selectedQuestion.tags &&
                    selectedQuestion.tags.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-gray-700">
                          Tags:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedQuestion.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}

              {selectedQuestion.options &&
                selectedQuestion.options.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Options:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedQuestion.options?.map(
                        (option: string, index: number) => (
                          <li key={index} className="text-sm">
                            {option}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {selectedQuestion.correctAnswer && (
                <div>
                  <h4 className="font-medium mb-2">Correct Answer:</h4>
                  <p className="text-sm bg-green-50 p-2 rounded">
                    {selectedQuestion.correctAnswer}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedQuestion(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
