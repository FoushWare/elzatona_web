'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ClientAudioUploadService } from '@/lib/audio-upload-client';
import { BackupClientService } from '@/lib/backup-client';
import {
  Plus,
  Trash2,
  Upload,
  Play,
  Pause,
  Volume2,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
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
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

interface LearningPath {
  id: string;
  name: string;
  description?: string;
}

export default function NewQuestionPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'single' as 'single' | 'multiple',
    section: 'learning',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    explanation: '',
    category: '',
    learningPath: '',
    sector: '',
    topicId: '',
  });

  const [options, setOptions] = useState<QuestionOption[]>([
    { id: 'a', text: '', isCorrect: false },
    { id: 'b', text: '', isCorrect: false },
  ]);

  const [audioFiles, setAudioFiles] = useState({
    question: null as File | null,
    answer: null as File | null,
  });

  const [audioUrls, setAudioUrls] = useState({
    question: '',
    answer: '',
  });

  const [isPlaying, setIsPlaying] = useState({
    question: false,
    answer: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Data for dropdowns
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, topicsRes, learningPathsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/topics'),
        fetch('/api/learning-paths'),
      ]);

      const [categoriesData, topicsData, learningPathsData] = await Promise.all(
        [categoriesRes.json(), topicsRes.json(), learningPathsRes.json()]
      );

      if (categoriesData.success) setCategories(categoriesData.data || []);
      if (topicsData.success) setTopics(topicsData.data || []);
      if (learningPathsData.success)
        setLearningPaths(learningPathsData.data || []);
    } catch (err) {
      console.error('Error loading dropdown data:', err);
      toast.error('Failed to load form data');
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    const newId = String.fromCharCode(97 + options.length);
    setOptions([...options, { id: newId, text: '', isCorrect: false }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const updateOption = (
    id: string,
    field: keyof QuestionOption,
    value: any
  ) => {
    setOptions(
      options.map(option =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  const handleAudioUpload = async (type: 'question' | 'answer', file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const audioService = new ClientAudioUploadService();
      const url = await audioService.uploadAudio(file);

      setAudioUrls(prev => ({ ...prev, [type]: url }));
      setAudioFiles(prev => ({ ...prev, [type]: file }));
      toast.success(`${type} audio uploaded successfully`);
    } catch (err) {
      const errorMsg = `Failed to upload ${type} audio: ${err instanceof Error ? err.message : 'Unknown error'}`;
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAudioPlay = async (type: 'question' | 'answer') => {
    const url = audioUrls[type];
    if (!url) return;

    try {
      const audio = new Audio(url);
      audio.onended = () => setIsPlaying(prev => ({ ...prev, [type]: false }));

      if (isPlaying[type]) {
        audio.pause();
        setIsPlaying(prev => ({ ...prev, [type]: false }));
      } else {
        await audio.play();
        setIsPlaying(prev => ({ ...prev, [type]: true }));
      }
    } catch (err) {
      const errorMsg = `Failed to play ${type} audio: ${err instanceof Error ? err.message : 'Unknown error'}`;
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Question title is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Question content is required');
      }
      if (!formData.category) {
        throw new Error('Category is required');
      }
      if (!formData.learningPath) {
        throw new Error('Learning path is required');
      }
      if (options.length < 2) {
        throw new Error('At least 2 options are required');
      }
      if (options.some(opt => !opt.text.trim())) {
        throw new Error('All options must have text');
      }
      if (!options.some(opt => opt.isCorrect)) {
        throw new Error('At least one option must be marked as correct');
      }

      // Prepare question data
      const questionData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        type: formData.type,
        section: formData.section,
        difficulty: formData.difficulty,
        explanation: formData.explanation.trim(),
        category: formData.category,
        learningPath: formData.learningPath,
        sector: formData.sector.trim() || undefined,
        topicId: formData.topicId || undefined,
        options: options.map(opt => ({
          id: opt.id,
          text: opt.text.trim(),
          isCorrect: opt.isCorrect,
        })),
        audioUrls: {
          question: audioUrls.question || undefined,
          answer: audioUrls.answer || undefined,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Submit to API
      const response = await fetch('/api/questions/unified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create question');
      }

      // Backup to local storage
      try {
        const backupService = new BackupClientService();
        await backupService.backupQuestion(questionData);
      } catch (backupErr) {
        console.warn('Failed to backup question:', backupErr);
      }

      setSuccess(true);
      toast.success('Question created successfully!');
      setTimeout(() => {
        window.location.href = '/admin/content/questions';
      }, 2000);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to create question';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTopics = topics.filter(
    topic => !formData.category || topic.category === formData.category
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/content/questions">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Questions
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Question
            </h1>
            <p className="text-gray-600">
              Add a new question with proper categorization
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Success</h3>
            <p className="text-sm text-green-700 mt-1">
              Question created successfully! Redirecting...
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Essential details about the question
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Question Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., JavaScript Closures"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Question Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={e =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="What is a closure in JavaScript?"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                value={formData.explanation}
                onChange={e =>
                  setFormData({ ...formData, explanation: e.target.value })
                }
                placeholder="Detailed explanation of the answer"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categorization */}
        <Card>
          <CardHeader>
            <CardTitle>Categorization</CardTitle>
            <CardDescription>
              Organize the question with categories, topics, and learning paths
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={value =>
                    setFormData({ ...formData, category: value, topicId: '' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="topic">Topic</Label>
                <Select
                  value={formData.topicId}
                  onValueChange={value =>
                    setFormData({ ...formData, topicId: value })
                  }
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        formData.category
                          ? 'Select a topic'
                          : 'Select category first'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTopics.map(topic => (
                      <SelectItem key={topic.id} value={topic.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{topic.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {topic.difficulty}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="learningPath">Learning Path *</Label>
                <Select
                  value={formData.learningPath}
                  onValueChange={value =>
                    setFormData({ ...formData, learningPath: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a learning path" />
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

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
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
            </div>
          </CardContent>
        </Card>

        {/* Question Type and Options */}
        <Card>
          <CardHeader>
            <CardTitle>Question Type & Options</CardTitle>
            <CardDescription>
              Configure the question type and answer options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="type">Question Type</Label>
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
              <div className="flex items-center justify-between mb-4">
                <Label>Answer Options *</Label>
                <Button type="button" onClick={addOption} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`correct-${option.id}`}
                        checked={option.isCorrect}
                        onCheckedChange={checked =>
                          updateOption(option.id, 'isCorrect', checked)
                        }
                      />
                      <Label
                        htmlFor={`correct-${option.id}`}
                        className="text-sm"
                      >
                        Correct
                      </Label>
                    </div>
                    <Input
                      value={option.text}
                      onChange={e =>
                        updateOption(option.id, 'text', e.target.value)
                      }
                      placeholder={`Option ${option.id.toUpperCase()}`}
                      className="flex-1"
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(option.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Audio Files (Optional)</CardTitle>
            <CardDescription>
              Upload audio for question and answer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Question Audio</Label>
                <div className="mt-2 space-y-2">
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioUpload('question', file);
                    }}
                    disabled={isUploading}
                  />
                  {audioUrls.question && (
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAudioPlay('question')}
                      >
                        {isPlaying.question ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <span className="text-sm text-gray-600">
                        Audio uploaded
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Answer Audio</Label>
                <div className="mt-2 space-y-2">
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioUpload('answer', file);
                    }}
                    disabled={isUploading}
                  />
                  {audioUrls.answer && (
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAudioPlay('answer')}
                      >
                        {isPlaying.answer ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <span className="text-sm text-gray-600">
                        Audio uploaded
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/content/questions">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Question
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
