// v1.0 - Unified Question Manager Component
// Centralized component for managing all questions from Firebase

'use client';

import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Loader2,
  Plus,
  Search,
  Filter,
  Download,
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

interface UnifiedQuestionManagerProps {
  className?: string;
}

export default function UnifiedQuestionManager({
  className,
}: UnifiedQuestionManagerProps) {
  const {
    questions,
    learningPaths,
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
  } = useUnifiedQuestions();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkJsonInput, setBulkJsonInput] = useState('');
  const [bulkInputMode, setBulkInputMode] = useState<'file' | 'json'>('file');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'single' as 'single' | 'multiple',
    category: '',
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
        category: selectedCategory || undefined,
        difficulty: selectedDifficulty || undefined,
        learningPath: selectedLearningPath || undefined,
      });
    } else {
      loadQuestions({
        category: selectedCategory || undefined,
        difficulty: selectedDifficulty || undefined,
        learningPath: selectedLearningPath || undefined,
      });
    }
  };

  // Handle filter change
  const handleFilterChange = () => {
    loadQuestions({
      category: selectedCategory || undefined,
      difficulty: selectedDifficulty || undefined,
      learningPath: selectedLearningPath || undefined,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingQuestion) {
      await updateQuestion(editingQuestion.id, formData);
      setEditingQuestion(null);
    } else {
      await createQuestion(formData);
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
      type: question.type,
      category: question.category,
      difficulty: question.difficulty,
      learningPath: question.learningPath,
      points: question.points,
      timeLimit: question.timeLimit || 30,
      explanation: question.explanation,
      options: question.options,
      correctAnswers: question.correctAnswers,
      tags: question.tags,
      isActive: question.isActive,
    });
    setShowCreateForm(true);
  };

  // Handle delete
  const handleDelete = async (question: UnifiedQuestion) => {
    if (confirm(`Are you sure you want to delete "${question.title}"?`)) {
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

  // Handle bulk import from file
  const handleBulkImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const questionsData: BulkQuestionData[] = JSON.parse(text);

      const results = await bulkImportQuestions(questionsData);
      alert(
        `Import completed: ${results.success} successful, ${results.failed} failed`
      );

      if (results.errors.length > 0) {
        console.error('Import errors:', results.errors);
      }
    } catch (error) {
      alert('Failed to import questions. Please check the file format.');
      console.error('Import error:', error);
    }
  };

  // Handle bulk import from JSON textarea
  const handleBulkJsonImport = async () => {
    try {
      const parsed = JSON.parse(bulkJsonInput);
      
      // Handle both array format and object with questions property
      let questionsData: BulkQuestionData[];
      if (Array.isArray(parsed)) {
        questionsData = parsed;
      } else if (parsed.questions && Array.isArray(parsed.questions)) {
        questionsData = parsed.questions;
      } else {
        alert('Invalid format. Expected an array of questions or an object with a "questions" property.');
        return;
      }

      const results = await bulkImportQuestions(questionsData);
      alert(
        `Import completed: ${results.success} successful, ${results.failed} failed`
      );

      if (results.errors.length > 0) {
        console.error('Import errors:', results.errors);
      }

      // Clear the input
      setBulkJsonInput('');
    } catch (error) {
      alert(`JSON parsing error: ${error instanceof Error ? error.message : 'Invalid JSON format'}`);
      console.error('Import error:', error);
    }
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
                {stats.incompleteQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Incomplete
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {stats.averagePoints.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Points
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
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="CSS">CSS</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
                <SelectItem value="Testing">Testing</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
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
                <SelectItem value="">All Difficulties</SelectItem>
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
                <SelectItem value="">All Paths</SelectItem>
                {learningPaths.map(path => (
                  <SelectItem key={path.id} value={path.name}>
                    {path.name}
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
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bulk Import Questions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Import multiple questions at once using JSON format
              </p>
              
              {/* Input Mode Toggle */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Import Method:
                </span>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setBulkInputMode('file')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      bulkInputMode === 'file'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    onClick={() => setBulkInputMode('json')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      bulkInputMode === 'json'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Paste JSON
                  </button>
                </div>
              </div>

              {/* File Upload Mode */}
              {bulkInputMode === 'file' && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Upload a JSON file containing an array of question objects
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleBulkImport}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}

              {/* JSON Input Mode */}
              {bulkInputMode === 'json' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Paste JSON Array of Questions:
                    </label>
                    <textarea
                      value={bulkJsonInput}
                      onChange={(e) => setBulkJsonInput(e.target.value)}
                      placeholder={`Paste your questions array here, for example:
[
  {
    "title": "What is React?",
    "content": "React is a JavaScript library for building user interfaces.",
    "type": "single",
    "difficulty": "easy",
    "options": [
      { "id": "a", "text": "A JavaScript library", "isCorrect": true },
      { "id": "b", "text": "A CSS framework", "isCorrect": false },
      { "id": "c", "text": "A database", "isCorrect": false },
      { "id": "d", "text": "A server", "isCorrect": false }
    ],
    "correctAnswers": ["a"],
    "explanation": "React is indeed a JavaScript library for building user interfaces.",
    "category": "Frontend",
    "learningPath": "react-mastery",
    "tags": ["react", "javascript"],
    "points": 1
  }
]`}
                      className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleBulkJsonImport}
                      disabled={!bulkJsonInput.trim()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Import Questions</span>
                    </Button>
                    <Button
                      onClick={() => setBulkJsonInput('')}
                      variant="outline"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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
                  <Input
                    value={formData.category}
                    onChange={e =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
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
                      {learningPaths.map(path => (
                        <SelectItem key={path.id} value={path.name}>
                          {path.name}
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
        ) : (
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
                      <Badge
                        variant={
                          question.isComplete ? 'default' : 'destructive'
                        }
                      >
                        {question.isComplete ? 'Complete' : 'Incomplete'}
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
                    {question.tags.length > 0 && (
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
        )}
      </div>

      {questions.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No questions found. Create your first question!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
