'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Plus,
  X,
  Save,
  XCircle,
  CheckCircle,
  Target,
  BookOpen,
  Filter,
  Clock,
} from 'lucide-react';

interface QuestionCreationFormProps {
  onQuestionAdded: (question: any) => void;
  onCancel: () => void;
}

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export function QuestionCreationForm({
  onQuestionAdded,
  onCancel,
}: QuestionCreationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'single' as 'single' | 'multiple',
    category: 'javascript',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    learningPath: 'JavaScript Deep Dive',
    explanation: '',
  });

  const [options, setOptions] = useState<QuestionOption[]>([
    { id: 'a', text: '', isCorrect: false },
    { id: 'b', text: '', isCorrect: false },
  ]);

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'css', name: 'CSS' },
    { id: 'html', name: 'HTML' },
    { id: 'typescript', name: 'TypeScript' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const learningPaths = [
    { id: 'JavaScript Deep Dive', name: 'JavaScript Deep Dive' },
    { id: 'React Mastery', name: 'React Mastery' },
    { id: 'Frontend Basics', name: 'Frontend Basics' },
  ];

  const addOption = () => {
    const newId = String.fromCharCode(97 + options.length);
    setOptions([...options, { id: newId, text: '', isCorrect: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (
    index: number,
    field: keyof QuestionOption,
    value: string | boolean
  ) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };

    // If single choice and marking as correct, unmark others
    if (field === 'isCorrect' && value === true && formData.type === 'single') {
      newOptions.forEach((option, i) => {
        if (i !== index) option.isCorrect = false;
      });
    }

    setOptions(newOptions);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error('Title and content are required');
      }

      if (options.some(opt => !opt.text.trim())) {
        throw new Error('All options must have text');
      }

      if (!options.some(opt => opt.isCorrect)) {
        throw new Error('At least one option must be correct');
      }

      // Create question object
      const newQuestion = {
        id: `q_${Date.now()}`,
        title: formData.title,
        content: formData.content,
        type: formData.type,
        category: formData.category,
        difficulty: formData.difficulty,
        learningPath: formData.learningPath,
        explanation: formData.explanation,
        options: options.map(opt => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
        tags: tags,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onQuestionAdded(newQuestion);
    } catch (error) {
      console.error('Error creating question:', error);
      alert(
        error instanceof Error ? error.message : 'Failed to create question'
      );
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Question Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter question title"
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Question Type *
              </label>
              <Select
                value={formData.type}
                onValueChange={value =>
                  setFormData({
                    ...formData,
                    type: value as 'single' | 'multiple',
                  })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Choice</SelectItem>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Question Content *
            </label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={e =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Enter the question content..."
              rows={3}
              required
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-green-600" />
            Answer Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <input
                  type={formData.type === 'single' ? 'radio' : 'checkbox'}
                  checked={option.isCorrect}
                  onChange={e =>
                    updateOption(index, 'isCorrect', e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="font-medium text-sm w-6">
                  {option.id.toUpperCase()}
                </span>
              </div>
              <Input
                value={option.text}
                onChange={e => updateOption(index, 'text', e.target.value)}
                placeholder={`Option ${option.id.toUpperCase()}`}
                className="flex-1 h-9"
                required
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addOption}
            className="w-full text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-purple-600" />
            Metadata
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Category *
              </label>
              <Select
                value={formData.category}
                onValueChange={value =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="difficulty"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Difficulty *
              </label>
              <Select
                value={formData.difficulty}
                onValueChange={value =>
                  setFormData({
                    ...formData,
                    difficulty: value as 'easy' | 'medium' | 'hard',
                  })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.id} value={difficulty.id}>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${getDifficultyColor(difficulty.id)}`}
                        >
                          {difficulty.name}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="learningPath"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Learning Path *
              </label>
              <Select
                value={formData.learningPath}
                onValueChange={value =>
                  setFormData({ ...formData, learningPath: value })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {learningPaths.map(path => (
                    <SelectItem key={path.id} value={path.id}>
                      {path.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="explanation"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Explanation
            </label>
            <Textarea
              id="explanation"
              value={formData.explanation}
              onChange={e =>
                setFormData({ ...formData, explanation: e.target.value })
              }
              placeholder="Explain why the correct answer is correct..."
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 h-9"
                onKeyPress={e =>
                  e.key === 'Enter' && (e.preventDefault(), addTag())
                }
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="h-9"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="px-6"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="px-6 bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
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
  );
}
