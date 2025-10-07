'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Badge } from '@/shared/components/ui/badge';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  Tag,
  Palette,
} from 'lucide-react';

export interface QuestionTopic {
  id: string;
  name: string;
  description: string;
  category:
    | 'javascript'
    | 'react'
    | 'css'
    | 'html'
    | 'typescript'
    | 'testing'
    | 'performance'
    | 'security'
    | 'general';
  color: string;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
}

interface TopicManagerProps {
  onTopicSelect?: (topic: QuestionTopic) => void;
  selectedTopics?: string[];
  multiple?: boolean;
}

const CATEGORIES = [
  { id: 'javascript', name: 'JavaScript', color: '#F7DF1E' },
  { id: 'react', name: 'React', color: '#61DAFB' },
  { id: 'css', name: 'CSS', color: '#1572B6' },
  { id: 'html', name: 'HTML', color: '#E34F26' },
  { id: 'typescript', name: 'TypeScript', color: '#3178C6' },
  { id: 'testing', name: 'Testing', color: '#99425B' },
  { id: 'performance', name: 'Performance', color: '#FF6B6B' },
  { id: 'security', name: 'Security', color: '#FF4757' },
  { id: 'general', name: 'General', color: '#6C757D' },
];

const COLORS = [
  '#3B82F6',
  '#8B5CF6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#06B6D4',
  '#84CC16',
  '#F97316',
  '#EC4899',
  '#6366F1',
  '#F43F5E',
  '#8B5A2B',
  '#059669',
  '#DC2626',
  '#7C3AED',
];

export const TopicManager: React.FC<TopicManagerProps> = ({
  onTopicSelect,
  selectedTopics = [],
  multiple = false,
}) => {
  const [topics, setTopics] = useState<QuestionTopic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<QuestionTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<QuestionTopic | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'javascript' as QuestionTopic['category'],
    color: '#3B82F6',
  });

  // Load topics
  useEffect(() => {
    loadTopics();
  }, []);

  // Filter topics
  useEffect(() => {
    let filtered = topics;

    if (searchTerm) {
      filtered = filtered.filter(
        topic =>
          topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(topic => topic.category === filterCategory);
    }

    setFilteredTopics(filtered);
  }, [topics, searchTerm, filterCategory]);

  const loadTopics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/topics');
      const data = await response.json();

      if (data.success) {
        setTopics(data.data);
      } else {
        setError(data.error || 'Failed to load topics');
      }
    } catch (error) {
      setError('Failed to load topics');
      console.error('Error loading topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeCommonTopics = async () => {
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
        setTopics(data.data.topics);
        setError(null);
        alert(`Successfully initialized ${data.data.count} common topics!`);
      } else {
        if (data.error.includes('already exist')) {
          const force = confirm(
            'Topics already exist. Do you want to overwrite them with common topics?'
          );
          if (force) {
            const forceResponse = await fetch('/api/admin/topics/initialize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ force: true }),
            });

            const forceData = await forceResponse.json();
            if (forceData.success) {
              setTopics(forceData.data.topics);
              setError(null);
              alert(
                `Successfully initialized ${forceData.data.count} common topics!`
              );
            } else {
              setError(forceData.error || 'Failed to initialize topics');
            }
          }
        } else {
          setError(data.error || 'Failed to initialize topics');
        }
      }
    } catch (error) {
      setError('Failed to initialize topics');
      console.error('Error initializing topics:', error);
    }
  };

  const handleCreateTopic = async () => {
    try {
      const response = await fetch('/api/admin/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setTopics([...topics, data.data]);
        setIsCreateDialogOpen(false);
        setFormData({
          name: '',
          description: '',
          category: 'javascript',
          color: '#3B82F6',
        });
      } else {
        setError(data.error || 'Failed to create topic');
      }
    } catch (error) {
      setError('Failed to create topic');
      console.error('Error creating topic:', error);
    }
  };

  const handleEditTopic = async () => {
    if (!editingTopic) return;

    try {
      const response = await fetch(`/api/admin/topics/${editingTopic.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setTopics(
          topics.map(topic =>
            topic.id === editingTopic.id ? data.data : topic
          )
        );
        setIsEditDialogOpen(false);
        setEditingTopic(null);
        setFormData({
          name: '',
          description: '',
          category: 'javascript',
          color: '#3B82F6',
        });
      } else {
        setError(data.error || 'Failed to update topic');
      }
    } catch (error) {
      setError('Failed to update topic');
      console.error('Error updating topic:', error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    if (!confirm('Are you sure you want to delete this topic?')) return;

    try {
      const response = await fetch(`/api/admin/topics/${topicId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setTopics(topics.filter(topic => topic.id !== topicId));
      } else {
        setError(data.error || 'Failed to delete topic');
      }
    } catch (error) {
      setError('Failed to delete topic');
      console.error('Error deleting topic:', error);
    }
  };

  const openEditDialog = (topic: QuestionTopic) => {
    setEditingTopic(topic);
    setFormData({
      name: topic.name,
      description: topic.description,
      category: topic.category,
      color: topic.color,
    });
    setIsEditDialogOpen(true);
  };

  const handleTopicClick = (topic: QuestionTopic) => {
    if (onTopicSelect) {
      onTopicSelect(topic);
    }
  };

  const getCategoryInfo = (category: string) => {
    return (
      CATEGORIES.find(cat => cat.id === category) ||
      CATEGORIES[CATEGORIES.length - 1]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Topic Management</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Organize questions by topics for better learning plan creation
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={initializeCommonTopics}
            variant="outline"
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Initialize Common Topics
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Topic</DialogTitle>
                <DialogDescription>
                  Add a new topic to organize questions by subject matter.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Closure, Hoisting, Async/Await"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of this topic"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      setFormData({
                        ...formData,
                        category: value as QuestionTopic['category'],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.color === color
                            ? 'border-gray-800'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTopic} disabled={!formData.name}>
                  Create Topic
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search topics..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map(topic => {
          const categoryInfo = getCategoryInfo(topic.category);
          const isSelected = selectedTopics.includes(topic.id);

          return (
            <Card
              key={topic.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleTopicClick(topic)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: topic.color }}
                    />
                    <CardTitle className="text-lg">{topic.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={e => {
                        e.stopPropagation();
                        openEditDialog(topic);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteTopic(topic.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: categoryInfo.color,
                      color: categoryInfo.color,
                    }}
                  >
                    {categoryInfo.name}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {topic.questionCount} questions
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Tag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No topics found. Create your first topic to get started.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Topic</DialogTitle>
            <DialogDescription>Update the topic information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Topic name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Topic description"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={value =>
                  setFormData({
                    ...formData,
                    category: value as QuestionTopic['category'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color
                        ? 'border-gray-800'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditTopic} disabled={!formData.name}>
              Update Topic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
