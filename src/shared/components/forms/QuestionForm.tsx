// Question Form Component
// v1.0 - Form for creating and editing questions

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { CardType } from '@/types/learning-cards';

interface QuestionFormProps {
  question?: {
    id: string;
    title: string;
    content: string;
    type: string;
    difficulty: string;
    categoryId: string;
    topicId: string;
    cardType: string;
    tags: string[];
  };
  categories: Array<{ id: string; name: string }>;
  topics: Array<{ id: string; name: string; categoryId: string }>;
  onSubmit: (data: QuestionFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface QuestionFormData {
  title: string;
  content: string;
  type: string;
  difficulty: string;
  categoryId: string;
  topicId: string;
  cardType: string;
  tags: string[];
}

const QUESTION_TYPES = [
  { value: 'open-ended', label: 'Open Ended' },
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'code', label: 'Code Challenge' },
  { value: 'scenario', label: 'Scenario Based' },
];

const DIFFICULTIES = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const CARD_TYPES: CardType[] = [
  'core-technologies',
  'framework-questions',
  'problem-solving',
  'system-design',
];

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  categories,
  topics,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<QuestionFormData>({
    title: question?.title || '',
    content: question?.content || '',
    type: question?.type || 'open-ended',
    difficulty: question?.difficulty || 'beginner',
    categoryId: question?.categoryId || categories[0]?.id || '',
    topicId: question?.topicId || '',
    cardType: question?.cardType || CARD_TYPES[0],
    tags: question?.tags || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  // Filter topics based on selected category
  const filteredTopics = topics.filter(
    topic => topic.categoryId === formData.categoryId
  );

  // Update topicId when category changes
  useEffect(() => {
    if (
      formData.categoryId &&
      !filteredTopics.find(topic => topic.id === formData.topicId)
    ) {
      setFormData(prev => ({ ...prev, topicId: filteredTopics[0]?.id || '' }));
    }
  }, [formData.categoryId, filteredTopics, formData.topicId]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Question title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Question content is required';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (!formData.topicId) {
      newErrors.topicId = 'Topic is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleChange = (
    field: keyof QuestionFormData,
    value: string | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Question Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="e.g., What is React?"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <Select
            value={formData.categoryId}
            onValueChange={value => handleChange('categoryId', value)}
          >
            <SelectTrigger
              className={errors.categoryId ? 'border-red-500' : ''}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId}</p>
          )}
        </div>

        {/* Topic */}
        <div className="space-y-2">
          <Label htmlFor="topicId">Topic *</Label>
          <Select
            value={formData.topicId}
            onValueChange={value => handleChange('topicId', value)}
          >
            <SelectTrigger className={errors.topicId ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {filteredTopics.map(topic => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.topicId && (
            <p className="text-sm text-red-500">{errors.topicId}</p>
          )}
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Question Type</Label>
          <Select
            value={formData.type}
            onValueChange={value => handleChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {QUESTION_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={value => handleChange('difficulty', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map(difficulty => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Card Type */}
        <div className="space-y-2">
          <Label htmlFor="cardType">Card Type</Label>
          <Select
            value={formData.cardType}
            onValueChange={value => handleChange('cardType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              {CARD_TYPES.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Question Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={e => handleChange('content', e.target.value)}
          placeholder="Write the question content here... (Markdown supported)"
          rows={6}
          className={errors.content ? 'border-red-500' : ''}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag..."
            className="flex-1"
          />
          <Button type="button" onClick={addTag} variant="outline">
            Add
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Saving...'
            : question
              ? 'Update Question'
              : 'Create Question'}
        </Button>
      </div>
    </form>
  );
};
