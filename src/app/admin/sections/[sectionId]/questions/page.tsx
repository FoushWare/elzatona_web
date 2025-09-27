'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  BookOpen,
  Target,
  Clock,
  Eye,
  EyeOff,
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  topic?: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Section {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  order: number;
  isActive: boolean;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

const DIFFICULTY_OPTIONS = [
  {
    value: 'beginner',
    label: 'Beginner',
    color: 'bg-green-100 text-green-800',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    color: 'bg-yellow-100 text-yellow-800',
  },
  { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' },
];

export default function SectionQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = params.sectionId as string;

  const [section, setSection] = useState<Section | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    difficulty: 'beginner' as const,
    category: '',
    topic: '',
    tags: '',
    isActive: true,
  });

  // Load section and questions
  useEffect(() => {
    loadSection();
    loadQuestions();
  }, [sectionId]);

  const loadSection = async () => {
    try {
      const response = await fetch(`/api/admin/sections/${sectionId}`);
      const data = await response.json();

      if (data.success) {
        setSection(data.data);
      } else {
        console.error('Failed to load section:', data.error);
      }
    } catch (error) {
      console.error('Error loading section:', error);
    }
  };

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/questions/unified');
      const data = await response.json();

      if (data.success) {
        setQuestions(data.data || []);
      } else {
        console.error('Failed to load questions:', data.error);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const questionData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag),
      };

      const response = await fetch('/api/enhanced-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();

      if (data.success) {
        await loadQuestions();
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        alert('Failed to create question: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question');
    }
  };

  const handleEditQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    try {
      const questionData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag),
      };

      const response = await fetch(
        `/api/enhanced-questions/${editingQuestion.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(questionData),
        }
      );

      const data = await response.json();

      if (data.success) {
        await loadQuestions();
        setIsEditModalOpen(false);
        setEditingQuestion(null);
        resetForm();
      } else {
        alert('Failed to update question: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Error updating question');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const response = await fetch(`/api/enhanced-questions/${questionId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await loadQuestions();
      } else {
        alert('Failed to delete question: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Error deleting question');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      difficulty: 'beginner',
      category: '',
      topic: '',
      tags: '',
      isActive: true,
    });
  };

  const openEditModal = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      title: question.title,
      content: question.content,
      difficulty: question.difficulty,
      category: question.category,
      topic: question.topic || '',
      tags: question.tags.join(', '),
      isActive: question.isActive,
    });
    setIsEditModalOpen(true);
  };

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 'all' || question.difficulty === filterDifficulty;
    const matchesCategory =
      filterCategory === 'all' || question.category === filterCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyInfo = (difficulty: string) => {
    return (
      DIFFICULTY_OPTIONS.find(opt => opt.value === difficulty) ||
      DIFFICULTY_OPTIONS[0]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading questions...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sections</span>
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {section?.name || 'Section'} Questions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {section?.description || 'Manage questions for this section'}
              </p>
            </div>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterDifficulty}
                  onValueChange={setFilterDifficulty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {DIFFICULTY_OPTIONS.map(difficulty => (
                      <SelectItem
                        key={difficulty.value}
                        value={difficulty.value}
                      >
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                    setFilterDifficulty('all');
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map(question => {
            const difficultyInfo = getDifficultyInfo(question.difficulty);

            return (
              <Card
                key={question.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {question.title}
                        </h3>
                        <Badge className={difficultyInfo.color}>
                          {difficultyInfo.label}
                        </Badge>
                        <Badge variant="outline">{question.category}</Badge>
                        {question.topic && (
                          <Badge variant="secondary">{question.topic}</Badge>
                        )}
                        {question.isActive ? (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                        {question.content}
                      </p>
                      {question.tags && question.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {question.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>
                          Created:{' '}
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                          Updated:{' '}
                          {new Date(question.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditModal(question)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm ||
              filterCategory !== 'all' ||
              filterDifficulty !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first question'}
            </p>
            {!searchTerm &&
              filterCategory === 'all' &&
              filterDifficulty === 'all' && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              )}
          </div>
        )}

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Create New Question</h2>
              <form onSubmit={handleCreateQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter question title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Content *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={e =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Enter question content"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <Input
                      value={formData.category}
                      onChange={e =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="Enter category"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as any,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Topic
                    </label>
                    <Input
                      value={formData.topic}
                      onChange={e =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      placeholder="Enter topic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      value={formData.tags}
                      onChange={e =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={e =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Active
                  </label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Create Question
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Question</h2>
              <form onSubmit={handleEditQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter question title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Content *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={e =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Enter question content"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <Input
                      value={formData.category}
                      onChange={e =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="Enter category"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as any,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Topic
                    </label>
                    <Input
                      value={formData.topic}
                      onChange={e =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      placeholder="Enter topic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      value={formData.tags}
                      onChange={e =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActiveEdit"
                    checked={formData.isActive}
                    onChange={e =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <label
                    htmlFor="isActiveEdit"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Active
                  </label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingQuestion(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Update Question
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
