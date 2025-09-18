'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
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
  Search,
  Filter,
  Loader2,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
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
    loadStats,
    deleteQuestion,
    clearError,
  } = useUnifiedQuestions();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [showMarkdownExtractor, setShowMarkdownExtractor] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);

  // Load learning paths when component mounts
  useEffect(() => {
    loadLearningPaths();
  }, [loadLearningPaths]);

  // Initialize default learning paths if none exist
  const initializeLearningPaths = async () => {
    try {
      const response = await fetch('/api/questions/learning-paths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Learning paths initialized successfully');
        // Reload learning paths after initialization
        await loadLearningPaths();
      } else {
        console.error('Failed to initialize learning paths');
      }
    } catch (error) {
      console.error('Error initializing learning paths:', error);
    }
  };

  // Activate all inactive questions
  const activateAllQuestions = async () => {
    try {
      const inactiveQuestions = questions.filter(q => !q.isActive);
      if (inactiveQuestions.length === 0) {
        alert('No inactive questions found');
        return;
      }

      const confirmActivate = confirm(
        `Are you sure you want to activate ${inactiveQuestions.length} inactive questions?`
      );
      if (!confirmActivate) return;

      for (const question of inactiveQuestions) {
        await fetch(`/api/questions/unified/${question.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: true }),
        });
      }

      // Reload questions and stats
      await loadQuestions();
      await loadStats();
      alert(`Successfully activated ${inactiveQuestions.length} questions!`);
    } catch (error) {
      console.error('Error activating questions:', error);
      alert('Error activating questions. Please try again.');
    }
  };

  const migrateQuestionLearningPaths = async () => {
    try {
      // Get all questions
      const allQuestions = await getQuestions();

      // Define the mapping from old IDs to new IDs
      const learningPathMapping = {
        // Map common patterns - you may need to adjust these based on your actual data
        'JavaScript Deep Dive': 'javascript-deep-dive',
        'javascript-deep-dive': 'javascript-deep-dive',
        'React Mastery': 'react-mastery',
        'react-mastery': 'react-mastery',
        'Frontend Fundamentals': 'frontend-basics',
        'frontend-basics': 'frontend-basics',
        'CSS Mastery': 'css-mastery',
        'css-mastery': 'css-mastery',
        'TypeScript Essentials': 'typescript-essentials',
        'typescript-essentials': 'typescript-essentials',
      };

      let migrated = 0;
      let errors = 0;

      for (const question of allQuestions) {
        const currentLearningPath = question.learningPath;
        const newLearningPath = learningPathMapping[currentLearningPath];

        if (newLearningPath && newLearningPath !== currentLearningPath) {
          try {
            await fetch(`/api/questions/unified/${question.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ learningPath: newLearningPath }),
            });
            migrated++;
            console.log(
              `Migrated question "${question.title}" from "${currentLearningPath}" to "${newLearningPath}"`
            );
          } catch (error) {
            console.error(
              `Failed to migrate question "${question.title}":`,
              error
            );
            errors++;
          }
        }
      }

      // Reload questions and stats
      await loadQuestions();
      await loadStats();
      return { migrated, errors };
    } catch (error) {
      console.error('Migration error:', error);
      throw error;
    }
  };

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
      // Reload stats after deletion
      await loadStats();
    }
  };

  // Reload stats when questions change
  useEffect(() => {
    if (questions.length > 0) {
      loadStats();
    }
  }, [questions.length, loadStats]);

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Questions Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all questions from the unified system
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowMarkdownExtractor(true)}
              variant="outline"
              className="flex-shrink-0"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Extract from Markdown</span>
              <span className="sm:hidden">Extract</span>
            </Button>
            <Button
              onClick={initializeLearningPaths}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 flex-shrink-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                Initialize Learning Paths
              </span>
              <span className="sm:hidden">Init Paths</span>
            </Button>
            <Button
              onClick={activateAllQuestions}
              variant="outline"
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 flex-shrink-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Activate All Questions</span>
              <span className="sm:hidden">Activate</span>
            </Button>
            <Button
              onClick={() => {
                const jsQuestions = questions.filter(
                  q => q.learningPath === 'javascript-deep-dive'
                );
                console.log('JavaScript Deep Dive Questions:', jsQuestions);
                alert(
                  `Found ${jsQuestions.length} questions for javascript-deep-dive. Check console for details.`
                );
              }}
              variant="outline"
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200 flex-shrink-0"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Check JS Questions</span>
              <span className="sm:hidden">Check JS</span>
            </Button>
            <Button
              onClick={async () => {
                try {
                  const result = await migrateQuestionLearningPaths();
                  alert(
                    `Migration completed! ${result.migrated} questions migrated, ${result.errors} errors.`
                  );
                } catch (error) {
                  console.error('Migration error:', error);
                  alert('Migration failed. Check console for details.');
                }
              }}
              variant="outline"
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                Migrate Learning Path IDs
              </span>
              <span className="sm:hidden">Migrate</span>
            </Button>
            <Button
              onClick={() =>
                (window.location.href = '/admin/questions/unified')
              }
              className="flex-shrink-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Go to Unified Manager</span>
              <span className="sm:hidden">Unified</span>
            </Button>
            <Button
              onClick={async () => {
                await loadStats();
                alert('Stats refreshed! Check the summary cards above.');
              }}
              variant="outline"
              className="bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Refresh Stats</span>
              <span className="sm:hidden">Refresh</span>
            </Button>
            <Button
              onClick={async () => {
                if (
                  confirm(
                    '⚠️ WARNING: This will delete ALL questions permanently! Are you sure?'
                  )
                ) {
                  if (
                    confirm(
                      'This action cannot be undone. Type "DELETE ALL" to confirm:'
                    )
                  ) {
                    try {
                      const allQuestions = questions;
                      let deleted = 0;
                      let errors = 0;

                      for (const question of allQuestions) {
                        try {
                          await fetch(
                            `/api/questions/unified?id=${question.id}`,
                            {
                              method: 'DELETE',
                            }
                          );
                          deleted++;
                          console.log(`Deleted question: ${question.title}`);
                        } catch (error) {
                          console.error(
                            `Failed to delete question "${question.title}":`,
                            error
                          );
                          errors++;
                        }
                      }

                      await loadQuestions();
                      await loadStats();
                      alert(
                        `✅ Deleted ${deleted} questions. ${errors} errors occurred.`
                      );
                    } catch (error) {
                      console.error('Error clearing questions:', error);
                      alert(
                        '❌ Failed to clear questions. Check console for details.'
                      );
                    }
                  }
                }
              }}
              variant="outline"
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Clear All Questions</span>
              <span className="sm:hidden">Clear All</span>
            </Button>
          </div>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {stats.totalQuestions}
                  </div>
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

      {/* Learning Paths Status */}
      {learningPaths.length === 0 && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No learning paths found. Click &quot;Initialize Learning Paths&quot;
            to create default learning paths.
          </AlertDescription>
        </Alert>
      )}

      {/* Debug Info */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Debug Info:
        </h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div>Total Questions: {questions.length}</div>
          <div>
            Active Questions: {questions.filter(q => q.isActive).length}
          </div>
          <div>Learning Paths: {learningPaths.length}</div>
          <div>
            Learning Path IDs: {learningPaths.map(p => p.id).join(', ')}
          </div>
          <div>Questions by Learning Path:</div>
          {learningPaths.map(path => (
            <div key={path.id} className="ml-4">
              - {path.name} ({path.id}):{' '}
              {questions.filter(q => q.learningPath === path.id).length}{' '}
              questions
            </div>
          ))}
        </div>
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

      {/* Floating Debug Panel */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        {/* Debug Toggle Button - Centered */}
        <Button
          onClick={() => setShowDebugInfo(!showDebugInfo)}
          size="sm"
          variant="outline"
          className={`shadow-lg transition-all duration-200 ${
            showDebugInfo
              ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
        </Button>

        {/* Debug Info Popup */}
        {showDebugInfo && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 max-w-sm min-w-80">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Debug Info
              </h4>
              <Button
                onClick={() => setShowDebugInfo(false)}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                ×
              </Button>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 max-h-64 overflow-y-auto">
              <div className="font-medium text-gray-800 dark:text-gray-200">
                Questions:
              </div>
              <div>Total: {questions.length}</div>
              <div>Active: {questions.filter(q => q.isActive).length}</div>
              <div>
                Incomplete: {questions.filter(q => !q.isComplete).length}
              </div>

              <div className="font-medium text-gray-800 dark:text-gray-200 mt-2">
                Stats:
              </div>
              <div>Total: {stats.totalQuestions}</div>
              <div>Active: {stats.activeQuestions}</div>
              <div>Incomplete: {stats.incompleteQuestions}</div>

              <div className="font-medium text-gray-800 dark:text-gray-200 mt-2">
                Learning Paths:
              </div>
              <div className="text-xs">
                {learningPaths.map(p => p.id).join(', ')}
              </div>

              <div className="font-medium text-gray-800 dark:text-gray-200 mt-2">
                By Path:
              </div>
              {learningPaths.map(path => (
                <div key={path.id} className="ml-2">
                  • {path.name}:{' '}
                  {questions.filter(q => q.learningPath === path.id).length}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
