'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';

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
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [showMarkdownExtractor, setShowMarkdownExtractor] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [viewingQuestion, setViewingQuestion] =
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
      // Get all questions from current state
      const allQuestions = questions;

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

  const difficulties = useMemo(
    () => [
      { id: 'all', name: 'All Difficulties' },
      { id: 'easy', name: 'Easy' },
      { id: 'medium', name: 'Medium' },
      { id: 'hard', name: 'Hard' },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { id: 'all', name: 'All Categories' },
      { id: 'CSS', name: 'CSS' },
      { id: 'JavaScript', name: 'JavaScript' },
      { id: 'React', name: 'React' },
      { id: 'TypeScript', name: 'TypeScript' },
      { id: 'Testing', name: 'Testing' },
      { id: 'Performance', name: 'Performance' },
      { id: 'Security', name: 'Security' },
    ],
    []
  );

  // Auto-apply filters when values change
  useEffect(() => {
    const filters: string[] = [];
    const queryFilters: any = {};

    // Category filter (independent)
    if (selectedCategory !== 'all') {
      queryFilters.category = selectedCategory;
      const categoryName =
        categories.find(c => c.id === selectedCategory)?.name ||
        selectedCategory;
      filters.push(`Category: ${categoryName}`);
    }

    // Learning Path filter (independent)
    if (selectedLearningPath !== 'all') {
      queryFilters.learningPath = selectedLearningPath;
      const pathName =
        learningPaths.find(p => p.id === selectedLearningPath)?.name ||
        selectedLearningPath;
      filters.push(`Learning Path: ${pathName}`);
    }

    // Difficulty filter (independent)
    if (selectedDifficulty !== 'all') {
      queryFilters.difficulty = selectedDifficulty;
      const difficultyName =
        difficulties.find(d => d.id === selectedDifficulty)?.name ||
        selectedDifficulty;
      filters.push(`Difficulty: ${difficultyName}`);
    }

    setAppliedFilters(filters);
    loadQuestions(queryFilters);
  }, [
    selectedCategory,
    selectedDifficulty,
    selectedLearningPath,
    loadQuestions,
  ]);

  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(questionId);
      // Reload stats after deletion
      await loadStats();
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedLearningPath('all');
    setSearchTerm('');
    setAppliedFilters([]);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
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
            <span className="hidden sm:inline">Initialize Learning Paths</span>
            <span className="sm:hidden">Init Paths</span>
          </Button>
          <Button
            onClick={async () => {
              try {
                const response = await fetch(
                  '/api/admin/learning-paths/cleanup-duplicates',
                  {
                    method: 'POST',
                  }
                );
                const result = await response.json();
                if (result.success) {
                  alert('Duplicate learning paths cleaned up successfully!');
                  await loadLearningPaths(); // Reload learning paths
                } else {
                  alert(`Error: ${result.error}`);
                }
              } catch (error) {
                alert(`Error cleaning up duplicates: ${error}`);
              }
            }}
            variant="outline"
            className="bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 flex-shrink-0"
          >
            <Bug className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Cleanup Duplicates</span>
            <span className="sm:hidden">Cleanup</span>
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
            <span className="hidden sm:inline">Migrate Learning Path IDs</span>
            <span className="sm:hidden">Migrate</span>
          </Button>
          <Button
            onClick={() => (window.location.href = '/admin/questions/unified')}
            className="flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Go to Unified Manager</span>
            <span className="sm:hidden">Unified</span>
          </Button>
          <Button
            onClick={() => (window.location.href = '/admin/content/topics')}
            variant="outline"
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 flex-shrink-0"
          >
            <Tag className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Manage Topics</span>
            <span className="sm:hidden">Topics</span>
          </Button>
          <Button
            onClick={async () => {
              try {
                const response = await fetch('/api/admin/topics/initialize', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ force: false }),
                });

                const data = await response.json();

                if (data.success) {
                  alert(
                    `Successfully initialized ${data.data.count} common topics!`
                  );
                } else {
                  if (data.error.includes('already exist')) {
                    const force = confirm(
                      'Topics already exist. Do you want to overwrite them with common topics?'
                    );
                    if (force) {
                      const forceResponse = await fetch(
                        '/api/admin/topics/initialize',
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ force: true }),
                        }
                      );

                      const forceData = await forceResponse.json();
                      if (forceData.success) {
                        alert(
                          `Successfully initialized ${forceData.data.count} common topics!`
                        );
                      } else {
                        alert(`Error: ${forceData.error}`);
                      }
                    }
                  } else {
                    alert(`Error: ${data.error}`);
                  }
                }
              } catch (error) {
                alert('Failed to initialize topics');
                console.error('Error initializing topics:', error);
              }
            }}
            variant="outline"
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Init Common Topics</span>
            <span className="sm:hidden">Init Topics</span>
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
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            variant="outline"
            className={`flex-shrink-0 ${
              showDebugInfo
                ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
            }`}
          >
            <Bug className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">
              {showDebugInfo ? 'Hide Debug' : 'Show Debug'}
            </span>
            <span className="sm:hidden">Debug</span>
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
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              {appliedFilters.length > 0 && (
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Applied Filters Display */}
            {appliedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active filters:
                </span>
                {appliedFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                  >
                    {filter}
                  </span>
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({questions.length} results)
                </span>
              </div>
            )}

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
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
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Learning Path
                </label>
                <Select
                  value={selectedLearningPath}
                  onValueChange={setSelectedLearningPath}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Learning Paths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Learning Paths</SelectItem>
                    {learningPaths.map(path => (
                      <SelectItem key={path.id} value={path.id}>
                        {path.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty.id} value={difficulty.id}>
                        {difficulty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            Questions
            {appliedFilters.length > 0 && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                (filtered)
              </span>
            )}
          </h2>
          <Badge variant="outline" className="text-sm">
            {filteredQuestions.length}{' '}
            {filteredQuestions.length === 1 ? 'question' : 'questions'}
            {appliedFilters.length > 0 && ' found'}
          </Badge>
        </div>
        {appliedFilters.length > 0 && (
          <Button
            onClick={clearAllFilters}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            Clear Filters
          </Button>
        )}
      </div>

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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewingQuestion(question)}
                      title="View question details"
                    >
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
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                {appliedFilters.length > 0
                  ? `No questions found matching your filters.`
                  : `No questions found.`}
              </p>
              {appliedFilters.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Current filters:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {appliedFilters.map((filter, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={clearAllFilters}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Try adjusting your filters or create new questions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Debug Info - Only show when debug toggle is enabled */}
      {showDebugInfo && (
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
      )}

      {/* Markdown Question Extractor Modal */}
      {showMarkdownExtractor && (
        <MarkdownQuestionExtractor
          learningPaths={learningPaths}
          onClose={() => setShowMarkdownExtractor(false)}
          onRefreshLearningPaths={loadLearningPaths}
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

      {/* Question View Modal */}
      {viewingQuestion && (
        <QuestionViewModal
          question={viewingQuestion}
          learningPaths={learningPaths}
          onClose={() => setViewingQuestion(null)}
        />
      )}
    </div>
  );
}
