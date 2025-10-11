'use client';

import React, { useState, useEffect } from 'react';
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

interface Question {
  id: string;
  title: string;
  content: string;
  sampleAnswers: string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'intermediate';
  category: string;
  topic?: string;
  topics?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminContentQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterQuestionType, setFilterQuestionType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load questions and categories
  useEffect(() => {
    loadQuestions();
    loadAllCategories();
  }, []);

  // Reload questions when page size changes
  useEffect(() => {
    loadQuestions(1); // Reset to first page when page size changes
  }, [questionsPerPage]);

  const loadQuestions = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/questions/unified?page=${page}&pageSize=${questionsPerPage}`
      );
      const data = await response.json();

      if (data.success) {
        setQuestions(data.data || []);
        setTotalQuestions(
          data.pagination?.totalCount || data.data?.length || 0
        );
        setTotalPages(
          data.pagination?.totalPages ||
            Math.ceil(
              (data.pagination?.totalCount || data.data?.length || 0) /
                questionsPerPage
            )
        );
        setCurrentPage(page);
      } else {
        console.error('Failed to load questions:', data.error);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllCategories = async () => {
    try {
      // Load a large sample to get all categories
      const response = await fetch(
        `/api/questions/unified?page=1&pageSize=1000`
      );
      const data = await response.json();

      if (data.success) {
        const categories = [
          ...new Set(data.data.map((q: Question) => q.category)),
        ];
        setAllCategories(categories.sort());
      } else {
        console.error('Failed to load categories:', data.error);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    // Add null checks for question and answer fields
    const questionText = question.title || question.content || '';
    const answerText = question.sampleAnswers?.[0] || '';

    const matchesSearch =
      questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answerText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 'all' || question.difficulty === filterDifficulty;
    const matchesCategory =
      filterCategory === 'all' || question.category === filterCategory;
    const matchesQuestionType =
      filterQuestionType === 'all' ||
      getQuestionType(question) === filterQuestionType;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesCategory &&
      matchesQuestionType
    );
  });

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
        question.sampleAnswers.reduce((sum, answer) => sum + answer.length, 0) /
        answerCount;
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

  const getCategories = () => {
    return allCategories;
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
        const response = await fetch(`/api/questions/unified/${questionId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove question from local state
          setQuestions(questions.filter(q => q.id !== questionId));
          alert('Question deleted successfully');
        } else {
          alert('Failed to delete question');
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Error deleting question');
      }
    }
  };

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
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
                  {totalQuestions}
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
                  {getCategories().length}
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
                  {filteredQuestions.length}
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
                  Easy Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {questions.filter(q => q.difficulty === 'easy').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select
                value={filterDifficulty}
                onValueChange={setFilterDifficulty}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getCategories().map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filterQuestionType}
                onValueChange={setFilterQuestionType}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Open-ended">Open-ended</SelectItem>
                  <SelectItem value="Multiple Choice">
                    Multiple Choice
                  </SelectItem>
                  <SelectItem value="True/False">True/False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination - Moved here after filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {(currentPage - 1) * questionsPerPage + 1} to{' '}
          {Math.min(currentPage * questionsPerPage, totalQuestions)} of{' '}
          {totalQuestions} questions
        </div>
        <div className="flex items-center space-x-4">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Per page:
            </span>
            <Select
              value={questionsPerPage.toString()}
              onValueChange={value => setQuestionsPerPage(parseInt(value))}
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
                onClick={() => loadQuestions(currentPage - 1)}
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
                      onClick={() => loadQuestions(pageNum)}
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
                      onClick={() => loadQuestions(totalPages)}
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
                onClick={() => loadQuestions(currentPage + 1)}
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
            <span>Questions ({filteredQuestions.length})</span>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm ||
                    filterDifficulty !== 'all' ||
                    filterCategory !== 'all'
                      ? 'Try adjusting your search criteria'
                      : 'No questions available'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredQuestions.map(question => (
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
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getDifficultyColor(
                                question.difficulty
                              )}
                            >
                              {question.difficulty}
                            </Badge>
                            <Badge
                              className={getQuestionTypeColor(
                                getQuestionType(question)
                              )}
                            >
                              {getQuestionType(question)}
                            </Badge>
                            <Badge variant="outline">{question.category}</Badge>
                            {question.topic && (
                              <Badge variant="outline" className="text-xs">
                                {question.topic}
                              </Badge>
                            )}
                            {question.topics && question.topics.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {question.topics.slice(0, 2).join(', ')}
                                {question.topics.length > 2 &&
                                  ` +${question.topics.length - 2} more`}
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

              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Difficulty
                  </label>
                  <Badge
                    className={getDifficultyColor(selectedQuestion.difficulty)}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <Badge variant="outline">{selectedQuestion.category}</Badge>
                </div>
              </div>

              {selectedQuestion.topics &&
                selectedQuestion.topics.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Topics
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuestion.topics.map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Question Title
                </label>
                <Input
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
                  <Select defaultValue={selectedQuestion.difficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Type
                  </label>
                  <Select defaultValue={getQuestionType(selectedQuestion)}>
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
                  defaultValue={selectedQuestion.category}
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement update functionality
                  alert('Update functionality will be implemented');
                  closeModals();
                }}
              >
                Update Question
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
