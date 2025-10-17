'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { AdvancedSearch } from '@/shared/components/common/AdvancedSearch';

type Question = UnifiedQuestion;

export default function AdminContentQuestionsPage() {
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Additional data for forms (cards)
  const [cardsData, setCardsData] = useState<any>(null);

  // Modal states
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('🔍 Fetching questions...', { currentPage, pageSize });
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/questions/unified?page=${currentPage}&pageSize=${pageSize}`
        );

        console.log('📡 Response:', response.status, response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📊 Result:', result);

        setQuestions(result.data || []);
        setTotalCount(result.pagination?.totalCount || 0);
        setLoading(false);
        console.log('✅ Questions loaded:', result.data?.length || 0);
      } catch (err) {
        console.error('❌ Error:', err);
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

  const cards = cardsData?.data || [];

  // Derived data
  const allCategories = useMemo(() => {
    if (!questions || !Array.isArray(questions)) {
      return [];
    }
    const categories = [
      ...new Set(questions.map((q: Question) => q.category).filter(Boolean)),
    ] as string[];
    return categories.sort();
  }, [questions]);

  const allTypes = useMemo(() => {
    if (!questions || !Array.isArray(questions)) {
      return [];
    }
    const types = [
      ...new Set(questions.map((q: Question) => q.type).filter(Boolean)),
    ] as string[];
    return types.sort();
  }, [questions]);

  // Questions list - now managed by AdvancedSearch component
  const displayQuestions = questions;

  const totalPages = Math.ceil(totalCount / pageSize);

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedQuestion(null);
  };

  // Handlers for CRUD operations
  const handleCreateQuestion = async (newQuestion: Partial<Question>) => {
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

  const handleUpdateQuestion = async (updatedQuestion: Question) => {
    try {
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

  const openViewModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsViewModalOpen(true);
  };

  const openEditModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  const getCardTitleById = (cardId: string) => {
    return cards.find((card: any) => card.id === cardId)?.title || 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Question Management
          </h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Question Management
          </h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
              <p className="font-semibold mb-2">Error loading questions:</p>
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Question Management
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  Q
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalCount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold">
                  C
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Categories
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {allCategories.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  A
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {questions.filter(q => q.isActive).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 font-bold">
                  F
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Filtered Results
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {displayQuestions.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Search */}
        <AdvancedSearch
          onResultsChange={results => {
            setQuestions(results);
            setTotalCount(results.length);
          }}
          onFacetsChange={facets => {
            // Update facets if needed
          }}
          placeholder="Search questions by title, content, tags..."
          showFilters={true}
          showFacets={true}
          showSuggestions={true}
          showAnalytics={true}
        />

        {/* Questions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Questions ({displayQuestions.length})</span>
              <Button
                className="flex items-center space-x-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Add New Question
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              {displayQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No questions available
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {displayQuestions.map(question => (
                    <div
                      key={question.id}
                      className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {question.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {question.content}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {question.category && (
                              <Badge variant="secondary">
                                {question.category}
                              </Badge>
                            )}
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
                            {question.type && (
                              <Badge variant="outline">{question.type}</Badge>
                            )}
                            {question.learningCardId && (
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-800"
                              >
                                {getCardTitleById(question.learningCardId)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openViewModal(question)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(question)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteQuestion(question.id)}
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
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalCount > pageSize && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)}{' '}
              to {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
              questions
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* View Question Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedQuestion.title}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Content</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedQuestion.content}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Answer</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedQuestion.answer || 'No answer provided'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedQuestion.category && (
                  <Badge variant="secondary">{selectedQuestion.category}</Badge>
                )}
                {selectedQuestion.difficulty && (
                  <Badge variant="outline">{selectedQuestion.difficulty}</Badge>
                )}
                {selectedQuestion.type && (
                  <Badge variant="outline">{selectedQuestion.type}</Badge>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Question Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>

      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Question</DialogTitle>
          </DialogHeader>
          <QuestionForm
            onSubmit={handleCreateQuestion}
            onCancel={() => setIsCreateModalOpen(false)}
            cards={cards}
            allCategories={allCategories}
            allTags={[]}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface QuestionFormProps {
  initialData?: Question | undefined;
  onSubmit: (question: Partial<Question>) => void;
  onCancel: () => void;
  cards: any[];
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
  const [formData, setFormData] = useState<Partial<Question>>(
    initialData || {
      title: '',
      content: '',
      type: 'multiple-choice',
      difficulty: 'beginner',
      isActive: true,
      options: [],
      sampleAnswers: [],
      tags: [],
      points: 1,
      timeLimit: 60,
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        options: initialData.options || [],
        sampleAnswers: initialData.sampleAnswers || [],
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

  const handleSelectChange = (name: keyof Question, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const questionTypes = ['multiple-choice', 'open-ended', 'true-false', 'code'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type || 'multiple-choice'}
            onValueChange={value => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
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
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category || ''}
            onValueChange={value => handleSelectChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
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
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty || 'beginner'}
            onValueChange={value => handleSelectChange('difficulty', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Difficulty" />
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
          <Label htmlFor="learningCardId">Learning Card</Label>
          <Select
            value={formData.learningCardId || ''}
            onValueChange={value => handleSelectChange('learningCardId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Learning Card" />
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
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            name="points"
            type="number"
            value={formData.points || 1}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content || ''}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          name="answer"
          value={formData.answer || ''}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          name="isActive"
          checked={formData.isActive || false}
          onCheckedChange={checked =>
            setFormData(prev => ({ ...prev, isActive: !!checked }))
          }
        />
        <Label htmlFor="isActive">Is Active</Label>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Save Changes' : 'Create Question'}
        </Button>
      </DialogFooter>
    </form>
  );
};
