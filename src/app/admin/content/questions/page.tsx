'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
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
import { Trash2, Edit, Eye, Plus, Search, Filter, Loader2, FileText } from 'lucide-react';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';
import { MarkdownQuestionExtractor } from '@/components/MarkdownQuestionExtractor';
import { QuestionEditModal } from '@/components/QuestionEditModal';
import { useEffect } from 'react';

export default function QuestionsManagementPage() {
  const {
    questions,
    learningPaths,
    stats,
    isLoading,
    error,
    loadQuestions,
    loadLearningPaths,
    deleteQuestion,
    clearError,
  } = useUnifiedQuestions();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMarkdownExtractor, setShowMarkdownExtractor] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  // Load learning paths when component mounts
  useEffect(() => {
    loadLearningPaths();
  }, []);

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'CSS', name: 'CSS' },
    { id: 'JavaScript', name: 'JavaScript' },
    { id: 'React', name: 'React' },
    { id: 'TypeScript', name: 'TypeScript' },
    { id: 'Testing', name: 'Testing' },
    { id: 'Performance', name: 'Performance' },
    { id: 'Security', name: 'Security' },
  ];

  const handleSearch = () => {
    loadQuestions({
      category:
        selectedCategory === 'all' ? undefined : selectedCategory || undefined,
      difficulty:
        selectedDifficulty === 'all'
          ? undefined
          : selectedDifficulty || undefined,
      learningPath:
        selectedLearningPath === 'all'
          ? undefined
          : selectedLearningPath || undefined,
    });
  };

  const handleFilterChange = () => {
    loadQuestions({
      category:
        selectedCategory === 'all' ? undefined : selectedCategory || undefined,
      difficulty:
        selectedDifficulty === 'all'
          ? undefined
          : selectedDifficulty || undefined,
      learningPath:
        selectedLearningPath === 'all'
          ? undefined
          : selectedLearningPath || undefined,
    });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(questionId);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Questions Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all questions from the unified system
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowMarkdownExtractor(true)}
              variant="outline"
            >
              <FileText className="w-4 h-4 mr-2" />
              Extract from Markdown
            </Button>
            <Button
              onClick={() => (window.location.href = '/admin/questions/unified')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Go to Unified Manager
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
                <div className="text-2xl font-bold">
                  {stats.activeQuestions}
                </div>
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
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
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
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </SelectItem>
                  ))}
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

        {/* Questions List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            filteredQuestions.map(question => (
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
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingQuestion(question)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteQuestion(question.id)}
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

        {filteredQuestions.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No questions found. Try adjusting your filters or create new
                questions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Markdown Question Extractor Modal */}
      {showMarkdownExtractor && (
        <MarkdownQuestionExtractor
          learningPaths={learningPaths}
          onClose={() => setShowMarkdownExtractor(false)}
        />
      )}

      {/* Question Edit Modal */}
      {editingQuestion && (
        <QuestionEditModal
          question={editingQuestion}
          learningPaths={learningPaths}
          onClose={() => setEditingQuestion(null)}
          onSuccess={() => {
            setEditingQuestion(null);
            loadQuestions();
          }}
        />
      )}
    </AdminLayout>
  );
}
