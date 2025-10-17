import * as React from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export interface CardFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}

interface CardFormProps {
  card?: any;
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CARD_ICONS = [
  'code',
  'layers',
  'puzzle',
  'network',
  'book-open',
  'atom',
  'server',
  'database',
  'globe',
  'shield',
  'zap',
  'star',
];

const CARD_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
];

export const CardForm: React.FC<CardFormProps> = ({
  card,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CardFormData>({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6',
    icon: 'code',
    order: 1,
  });
  const [errors, setErrors] = useState<Partial<CardFormData>>({});

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name || '',
        slug: card.slug || '',
        description: card.description || '',
        color: card.color || '#3B82F6',
        icon: card.icon || 'code',
        order: card.order || 1,
      });
    }
  }, [card]);

  const handleChange = (field: keyof CardFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate slug from name
    if (field === 'name') {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Card name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Card slug is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.order < 1) {
      newErrors.order = 'Order must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Card Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="e.g., Core Technologies"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={e => handleChange('slug', e.target.value)}
          placeholder="e.g., core-technologies"
          className={errors.slug ? 'border-red-500' : ''}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Describe what this card covers..."
          rows={3}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="color">Color</Label>
          <div className="flex gap-2 mt-1">
            {CARD_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color
                    ? 'border-gray-800'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleChange('color', color)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={formData.icon}
            onValueChange={value => handleChange('icon', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {CARD_ICONS.map(icon => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
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
          <p className="text-red-500 text-sm mt-1">{errors.order}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : card ? 'Update Card' : 'Create Card'}
        </Button>
      </div>
    </form>
  );
};
