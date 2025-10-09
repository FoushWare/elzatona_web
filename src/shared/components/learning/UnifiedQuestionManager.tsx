// v1.0 - Unified Question Manager Component
// Centralized component for managing all questions from Firebase

'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Badge } from '@/shared/components/ui/badge';
import { Textarea } from '@/shared/components/ui/textarea';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import {
  Loader2,
  Plus,
  Search,
  Filter,
  Upload,
  Trash2,
  Edit,
  Eye,
} from 'lucide-react';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';
import {
  UnifiedQuestion,
  BulkQuestionData,
} from '@/lib/unified-question-schema';
import BulkQuestionUploader from '../common/BulkQuestionUploader';

interface UnifiedQuestionManagerProps {
  className?: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

interface Topic {
  id: string;
  name: string;
  description?: string;
}

interface LearningPath {
  id: string;
  name: string;
  title?: string;
}

export default function UnifiedQuestionManager({
  className,
}: UnifiedQuestionManagerProps) {
  console.log('🔍 UnifiedQuestionManager: Component rendered');

  const {
    questions,
    learningPaths: hookLearningPaths,
    stats,
    isLoading,
    isCreating,
    error,
    loadQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    bulkImportQuestions,
    searchQuestions,
    clearError,
    // Pagination
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
  } = useUnifiedQuestions();

  // Debug logging
  console.log('🔍 UnifiedQuestionManager - questions:', questions);
  console.log(
    '🔍 UnifiedQuestionManager - questions.length:',
    questions.length
  );
  console.log('🔍 UnifiedQuestionManager - isLoading:', isLoading);
  console.log('🔍 UnifiedQuestionManager - error:', error);
  console.log('🔍 UnifiedQuestionManager - questions type:', typeof questions);
  console.log(
    '🔍 UnifiedQuestionManager - questions is array:',
    Array.isArray(questions)
  );

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLearningPath, setSelectedLearningPath] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);

  // Dynamic data state
  const [categories, setCategories] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [dynamicLearningPaths, setDynamicLearningPaths] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load dynamic data on mount
  React.useEffect(() => {
    loadDynamicData();
    // Questions are loaded automatically by useUnifiedQuestions hook
    // But let's also call it manually to ensure it loads
    loadQuestions();
  }, [loadQuestions]);

  // Fetch dynamic data
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.map((cat: Category) => cat.name));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      if (data.success) {
        setTopics(data.data.map((topic: Topic) => topic.name));
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const fetchLearningPaths = async () => {
    try {
      const response = await fetch('/api/learning-paths');
      const data = await response.json();
      if (data.success) {
        setDynamicLearningPaths(
          data.data.map((path: LearningPath) => ({
            id: path.id,
            name: path.name,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching learning paths:', error);
    }
  };

  // Load all dynamic data
  const loadDynamicData = async () => {
    setIsLoadingData(true);
    try {
      await Promise.all([
        fetchCategories(),
        fetchTopics(),
        fetchLearningPaths(),
      ]);
    } catch (error) {
      console.error('Error loading dynamic data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'single' as 'single' | 'multiple',
    category: '',
    topic: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    learningPath: '',
    points: 5,
    timeLimit: 30,
    explanation: '',
    options: [
      { id: 'a', text: '', isCorrect: false },
      { id: 'b', text: '', isCorrect: false },
      { id: 'c', text: '', isCorrect: false },
      { id: 'd', text: '', isCorrect: false },
    ],
    correctAnswers: [] as string[],
    tags: [] as string[],
    isActive: true,
  });

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchQuestions(searchTerm, {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        difficulty:
          selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
        learningPath:
          selectedLearningPath !== 'all' ? selectedLearningPath : undefined,
        topic: selectedTopic || undefined,
      });
    } else {
      loadQuestions({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        difficulty:
          selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
        learningPath:
          selectedLearningPath !== 'all' ? selectedLearningPath : undefined,
        topic: selectedTopic || undefined,
      });
    }
  };

  // Handle filter change
  const handleFilterChange = () => {
    loadQuestions({
      category:
        selectedCategory && selectedCategory !== 'all'
          ? selectedCategory
          : undefined,
      difficulty:
        selectedDifficulty && selectedDifficulty !== 'all'
          ? selectedDifficulty
          : undefined,
      learningPath:
        selectedLearningPath && selectedLearningPath !== 'all'
          ? selectedLearningPath
          : undefined,
      topic: selectedTopic || undefined,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map form type and difficulty to UnifiedQuestion types
    const mappedFormData = {
      ...formData,
      type:
        formData.type === 'single'
          ? 'multiple-choice'
          : ('multiple-choice' as const),
      difficulty: (formData.difficulty === 'easy'
        ? 'beginner'
        : formData.difficulty === 'medium'
          ? 'intermediate'
          : 'advanced') as 'beginner' | 'intermediate' | 'advanced',
    };

    if (editingQuestion) {
      await updateQuestion(editingQuestion.id, mappedFormData);
      setEditingQuestion(null);
    } else {
      await createQuestion(mappedFormData);
    }

    setShowCreateForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'single',
      category: '',
      topic: '',
      difficulty: 'easy',
      learningPath: '',
      points: 5,
      timeLimit: 30,
      explanation: '',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ],
      correctAnswers: [],
      tags: [],
      isActive: true,
    });
  };

  // Handle edit
  const handleEdit = (question: UnifiedQuestion) => {
    setEditingQuestion(question);
    setFormData({
      title: question.title,
      content: question.content,
      type:
        question.type === 'multiple-choice'
          ? 'single'
          : ('multiple' as 'single' | 'multiple'),
      category: question.category || '',
      topic: question.topic || '',
      difficulty:
        question.difficulty === 'beginner'
          ? 'easy'
          : question.difficulty === 'intermediate'
            ? 'medium'
            : ('hard' as 'easy' | 'medium' | 'hard'),
      learningPath: question.learningPath || '',
      points: question.points || 5,
      timeLimit: question.timeLimit || 30,
      explanation: question.explanation || '',
      options: question.options || [],
      correctAnswers: (question.options || [])
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id),
      tags: question.tags || [],
      isActive: question.isActive ?? true,
    });
    setShowCreateForm(true);
  };

  // Handle delete
  const handleDelete = async (question: UnifiedQuestion) => {
    if (
      confirm(`Are you sure you want to delete &quot;${question.title}&quot;?`)
    ) {
      await deleteQuestion(question.id);
    }
  };

  // Handle option change
  const handleOptionChange = (
    index: number,
    field: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };

    // Update correct answers
    const correctAnswers = newOptions
      .filter(option => option.isCorrect)
      .map(option => option.id);

    setFormData({
      ...formData,
      options: newOptions,
      correctAnswers,
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Unified Question Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all questions from a single source of truth
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowBulkImport(!showBulkImport)}
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.activeQuestions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active Questions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {stats.inactiveQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Inactive
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {stats.averageDifficulty.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Difficulty
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedLearningPath}
              onValueChange={setSelectedLearningPath}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Learning Path" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Paths</SelectItem>
                {dynamicLearningPaths.map(path => (
                  <SelectItem key={path.id} value={path.name}>
                    {path.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedTopic || 'all'}
              onValueChange={value =>
                setSelectedTopic(value === 'all' ? null : value)
              }
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={handleFilterChange}
              variant="outline"
              disabled={isLoading}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Import */}
      {showBulkImport && (
        <BulkQuestionUploader
          sectionId="general-questions"
          sectionName="General Questions"
          onQuestionsAdded={questions => {
            console.log('Questions added via bulk import:', questions);
            // Refresh the questions list
            loadQuestions();
            // Close the bulk import modal
            setShowBulkImport(false);
          }}
          onClose={() => setShowBulkImport(false)}
        />
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={clearError}
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Create/Edit Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingQuestion ? 'Edit Question' : 'Create New Question'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content
                </label>
                <Textarea
                  value={formData.content}
                  onChange={e =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'single' | 'multiple') =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Choice</SelectItem>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Difficulty
                  </label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                      setFormData({ ...formData, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Learning Path
                  </label>
                  <Select
                    value={formData.learningPath}
                    onValueChange={value =>
                      setFormData({ ...formData, learningPath: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select path" />
                    </SelectTrigger>
                    <SelectContent>
                      {hookLearningPaths.map((path: LearningPath) => (
                        <SelectItem key={path.id} value={path.title}>
                          {path.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topic
                  </label>
                  <Select
                    value={formData.topic}
                    onValueChange={value =>
                      setFormData({ ...formData, topic: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map(topic => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Points
                  </label>
                  <Input
                    type="number"
                    value={formData.points}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        points: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Time Limit (seconds)
                  </label>
                  <Input
                    type="number"
                    value={formData.timeLimit}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        timeLimit: parseInt(e.target.value),
                      })
                    }
                    min="10"
                    max="300"
                  />
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <span className="w-8 text-sm font-medium">
                        {option.id.toUpperCase()}
                      </span>
                      <Input
                        value={option.text}
                        onChange={e =>
                          handleOptionChange(index, 'text', e.target.value)
                        }
                        placeholder={`Option ${option.id.toUpperCase()}`}
                      />
                      <Checkbox
                        checked={option.isCorrect}
                        onCheckedChange={checked =>
                          handleOptionChange(index, 'isCorrect', checked)
                        }
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Correct
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Explanation
                </label>
                <Textarea
                  value={formData.explanation}
                  onChange={e =>
                    setFormData({ ...formData, explanation: e.target.value })
                  }
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                    setEditingQuestion(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingQuestion ? 'Update Question' : 'Create Question'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : questions.length > 0 ? (
          questions.map(question => (
            <Card key={question.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {question.title}
                      </h3>
                      <Badge
                        variant={question.isActive ? 'default' : 'secondary'}
                      >
                        {question.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {question.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Category: {question.category}</span>
                      <span>Difficulty: {question.difficulty}</span>
                      <span>Path: {question.learningPath}</span>
                      <span>Points: {question.points}</span>
                      <span>Type: {question.type}</span>
                    </div>
                    {question.tags && question.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {question.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(question)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(question)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No questions found. Create your first question!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
                questions
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={value => changePageSize(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                per page
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={!hasPrev}
              >
                Previous
              </Button>

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
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => goToPage(pageNum)}
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
                onClick={nextPage}
                disabled={!hasNext}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
