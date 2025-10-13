// Topic Form Component
// v1.0 - Form for creating and editing topics

import React, { useState, useEffect } from 'react';
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

interface TopicFormProps {
  topic?: {
    id: string;
    name: string;
    description?: string;
    categoryId?: string;
    difficulty?: string;
    estimatedQuestions?: number;
    slug?: string;
    order?: number;
  };
  categories: Array<{ id: string; name: string }>;
  onSubmit: (data: TopicFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface TopicFormData {
  name: string;
  description: string;
  categoryId: string;
  difficulty: string;
  estimatedQuestions: number;
  slug: string;
  order: number;
}

const DIFFICULTIES = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const TopicForm: React.FC<TopicFormProps> = ({
  topic,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<TopicFormData>({
    name: topic?.name || '',
    description: topic?.description || '',
    categoryId: topic?.categoryId || categories[0]?.id || '',
    difficulty: topic?.difficulty || 'beginner',
    estimatedQuestions: topic?.estimatedQuestions || 10,
    slug: topic?.slug || '',
    order: topic?.order || 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from name
  useEffect(() => {
    if (!topic && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name, topic]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Topic name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }

    if (formData.estimatedQuestions < 1) {
      newErrors.estimatedQuestions = 'Estimated questions must be at least 1';
    }

    if (formData.order < 1) {
      newErrors.order = 'Order must be at least 1';
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
      console.error('Error submitting topic:', error);
    }
  };

  const handleChange = (field: keyof TopicFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Topic Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="e.g., React Hooks"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={e => handleChange('slug', e.target.value)}
            placeholder="e.g., react-hooks"
            className={errors.slug ? 'border-red-500' : ''}
          />
          {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
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

        {/* Estimated Questions */}
        <div className="space-y-2">
          <Label htmlFor="estimatedQuestions">Estimated Questions</Label>
          <Input
            id="estimatedQuestions"
            type="number"
            min="1"
            value={formData.estimatedQuestions}
            onChange={e =>
              handleChange('estimatedQuestions', parseInt(e.target.value) || 1)
            }
            className={errors.estimatedQuestions ? 'border-red-500' : ''}
          />
          {errors.estimatedQuestions && (
            <p className="text-sm text-red-500">{errors.estimatedQuestions}</p>
          )}
        </div>

        {/* Order */}
        <div className="space-y-2">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            min="1"
            value={formData.order}
            onChange={e => handleChange('order', parseInt(e.target.value) || 1)}
            className={errors.order ? 'border-red-500' : ''}
          />
          {errors.order && (
            <p className="text-sm text-red-500">{errors.order}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Describe what this topic covers..."
          rows={3}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : topic ? 'Update Topic' : 'Create Topic'}
        </Button>
      </div>
    </form>
  );
};
