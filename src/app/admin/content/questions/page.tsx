'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';

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
  FileText,
  AlertCircle,
  RefreshCw,
  Bug,
  Tag,
} from 'lucide-react';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';
import { MarkdownQuestionExtractor } from '@/components/MarkdownQuestionExtractor';
import { QuestionEditModal } from '@/components/QuestionEditModal';
import { QuestionViewModal } from '@/components/QuestionViewModal';
import { EnhancedQuestionService } from '@/lib/enhanced-question-schema';

export default function QuestionsManagementPage() {
  const {
    questions,
    learningPaths,
    stats,
    isLoading,
    error,
    loadQuestions,
    loadLearningPaths,
    loadStats,
    deleteQuestion,
    clearError,
  } = useUnifiedQuestions();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [showMarkdownExtractor, setShowMarkdownExtractor] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [viewingQuestion, setViewingQuestion] = useState<any>(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [topics, setTopics] = useState([]);

  // Load topics
  const loadTopics = useCallback(async () => {
    try {
      const topicsData = await EnhancedQuestionService.getTopics();
      setTopics(topicsData);
    } catch (error) {
      console.error('Failed to load topics:', error);
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadQuestions();
    loadLearningPaths();
    loadStats();
    loadTopics();
  }, [loadQuestions, loadLearningPaths, loadStats, loadTopics]);

  // Get unique categories and topics for filters
  const categories = useMemo(() => {
    const cats = new Set(questions.map(q => q.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [questions]);

  // Helper function to get topic name by ID
  const getTopicName = useCallback(
    (topicId: string) => {
      const topic = topics.find(t => t.id === topicId);
      return topic?.name || topicId; // Fallback to ID if topic not found
    },
    [topics]
  );

  // Deduplicate learning paths to avoid duplicate keys
  const uniqueLearningPaths = useMemo(() => {
    const seen = new Set();
    return learningPaths.filter(path => {
      if (seen.has(path.id)) {
        return false;
      }
      seen.add(path.id);
      return true;
    });
  }, [learningPaths]);

  // Filter questions based on search and filters
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch =
        searchTerm === '' ||
        question.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLearningPath =
        selectedLearningPath === 'all' ||
        question.learningPath === selectedLearningPath;

      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        question.difficulty === selectedDifficulty;

      const matchesCategory =
        selectedCategory === 'all' || question.category === selectedCategory;

      const matchesTopic =
        selectedTopic === 'all' || question.topicId === selectedTopic;

      return (
        matchesSearch &&
        matchesLearningPath &&
        matchesDifficulty &&
        matchesCategory &&
        matchesTopic
      );
    });
  }, [
    questions,
    searchTerm,
    selectedLearningPath,
    selectedDifficulty,
    selectedCategory,
    selectedTopic,
  ]);

  const handleDeleteQuestion = useCallback(
    async (questionId: string) => {
      if (window.confirm('Are you sure you want to delete this question?')) {
        try {
          await deleteQuestion(questionId);
          // Refresh the list
          loadQuestions();
        } catch (error) {
          console.error('Error deleting question:', error);
        }
      }
    },
    [deleteQuestion, loadQuestions]
  );

  const handleEditQuestion = useCallback((question: any) => {
    setEditingQuestion(question);
  }, []);

  const handleViewQuestion = useCallback((question: any) => {
    setViewingQuestion(question);
  }, []);

  const handleQuestionSaved = useCallback(() => {
    setEditingQuestion(null);
    loadQuestions(); // Refresh the list
  }, [loadQuestions]);

  const handleBulkImport = useCallback(() => {
    setShowMarkdownExtractor(true);
  }, []);

  const handleMarkdownExtracted = useCallback(
    (questions: any[]) => {
      setShowMarkdownExtractor(false);
      loadQuestions(); // Refresh the list
    },
    [loadQuestions]
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading questions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Questions Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all questions in the system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkImport}>
            <FileText className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button
            onClick={() =>
              (window.location.href = '/admin/content/questions/new')
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={clearError}
            className="mt-2"
          >
            Dismiss
          </Button>
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Questions
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalQuestions || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Tag className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalCategories || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <RefreshCw className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Learning Paths
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalLearningPaths || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Bug className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Topics</p>
                  <p className="text-2xl font-bold">{stats.totalTopics || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Search
              </label>
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Learning Path
              </label>
              <Select
                value={selectedLearningPath}
                onValueChange={setSelectedLearningPath}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Learning Paths</SelectItem>
                  {uniqueLearningPaths.map(path => (
                    <SelectItem key={path.id} value={path.id}>
                      {path.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Difficulty
              </label>
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue />
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
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Topic
              </label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {topics.map(topic => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Questions ({filteredQuestions.length})
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDebugInfo(!showDebugInfo)}
              >
                <Bug className="h-4 w-4 mr-2" />
                Debug
              </Button>
              <Button variant="outline" size="sm" onClick={loadQuestions}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No questions found.</p>
              <Button
                className="mt-4"
                onClick={() =>
                  (window.location.href = '/admin/content/questions/new')
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Question
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map(question => (
                <div
                  key={question.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{question.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {question.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Category: {question.category}
                        </Badge>
                        <Badge
                          variant={
                            question.difficulty === 'easy'
                              ? 'default'
                              : question.difficulty === 'medium'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {question.difficulty}
                        </Badge>
                        {question.learningPath && (
                          <Badge variant="outline">
                            Path: {question.learningPath}
                          </Badge>
                        )}
                        {question.topicId && (
                          <Badge variant="outline">
                            Topic: {getTopicName(question.topicId)}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {showDebugInfo && (
                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                          <p>
                            <strong>ID:</strong> {question.id}
                          </p>
                          <p>
                            <strong>Section ID:</strong>{' '}
                            {question.sectionId || 'None'}
                          </p>
                          <p>
                            <strong>Order in Section:</strong>{' '}
                            {question.orderInSection || 'None'}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewQuestion(question)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuestion(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {showMarkdownExtractor && (
        <MarkdownQuestionExtractor
          learningPaths={uniqueLearningPaths}
          onClose={() => setShowMarkdownExtractor(false)}
          onRefreshLearningPaths={loadLearningPaths}
          onExtract={handleMarkdownExtracted}
        />
      )}

      {editingQuestion && (
        <QuestionEditModal
          question={editingQuestion}
          learningPaths={uniqueLearningPaths}
          onSuccess={handleQuestionSaved}
          onClose={() => setEditingQuestion(null)}
        />
      )}

      {viewingQuestion && (
        <QuestionViewModal
          question={viewingQuestion}
          onClose={() => setViewingQuestion(null)}
        />
      )}
    </div>
  );
}
