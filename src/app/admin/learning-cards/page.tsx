'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Target,
  Clock,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { SupabaseLearningCardsService } from '@/lib/supabase-learning-cards-service';
import { CARD_TYPES } from '@/types/learning-cards';
import type {
  LearningCard,
  LearningCardFormData,
} from '@/types/learning-cards';

export default function LearningCardsAdminPage() {
  const router = useRouter();
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCard, setEditingCard] = useState<LearningCard | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  // Form state
  const [formData, setFormData] = useState<LearningCardFormData>({
    title: '',
    type: 'core-technologies',
    description: '',
    color: '#3B82F6',
    icon: '💻',
    order: 1,
    is_active: true,
    metadata: {
      question_count: 0,
      estimatedTime: '30 minutes',
      difficulty: 'beginner',
      topics: [],
      categories: [],
    },
  });

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const cardsData = await SupabaseLearningCardsService.getAllCards();
      setCards(cardsData);
    } catch (err) {
      console.error('Error loading cards:', err);
      setError('Failed to load learning cards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCard = () => {
    setIsCreating(true);
    setEditingCard(null);
    setFormData({
      title: '',
      type: 'core-technologies',
      description: '',
      color: '#3B82F6',
      icon: '💻',
      order: cards.length + 1,
      is_active: true,
      metadata: {
        question_count: 0,
        estimatedTime: '30 minutes',
        difficulty: 'beginner',
        topics: [],
        categories: [],
      },
    });
  };

  const handleEditCard = (card: LearningCard) => {
    setEditingCard(card);
    setIsCreating(false);
    setFormData({
      title: card.title,
      type: card.type,
      description: card.description,
      color: card.color,
      icon: card.icon,
      order: card.order,
      is_active: card.is_active,
      metadata: card.metadata,
    });
  };

  const handleSaveCard = async () => {
    try {
      if (editingCard) {
        await SupabaseLearningCardsService.updateCard(editingCard.id, formData);
      } else {
        await SupabaseLearningCardsService.createCard(formData);
      }

      await loadCards();
      setIsCreating(false);
      setEditingCard(null);
    } catch (err) {
      console.error('Error saving card:', err);
      setError('Failed to save learning card');
    }
  };

  const handleDeleteCard = async (card_id: string) => {
    try {
      await SupabaseLearningCardsService.deleteCard(card_id);
      await loadCards();
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting card:', err);
      setError('Failed to delete learning card');
    }
  };

  const handleTypeChange = (type: keyof typeof CARD_TYPES) => {
    const cardType = CARD_TYPES[type];
    setFormData({
      ...formData,
      type,
      title: cardType.title,
      color: cardType.color,
      icon: cardType.icon,
      description: cardType.description,
      metadata: {
        ...formData.metadata,
        topics: [...cardType.defaultTopics],
      },
    });
  };

  const getCardTypeColor = (type: string) => {
    return CARD_TYPES[type as keyof typeof CARD_TYPES]?.color || '#6B7280';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Learning Cards Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage learning cards for guided learning plans
              </p>
            </div>
            <Button
              onClick={handleCreateCard}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Card
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Create/Edit Form */}
        {(isCreating || editingCard) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingCard
                  ? 'Edit Learning Card'
                  : 'Create New Learning Card'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={e =>
                      handleTypeChange(
                        e.target.value as keyof typeof CARD_TYPES
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {Object.entries(CARD_TYPES).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.icon} {config.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Card title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={e =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={e =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="💻"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.metadata.difficulty}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        metadata: {
                          ...formData.metadata,
                          difficulty: e.target.value as
                            | 'beginner'
                            | 'intermediate'
                            | 'advanced',
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    value={formData.metadata.estimatedTime}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        metadata: {
                          ...formData.metadata,
                          estimatedTime: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="30 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Count
                  </label>
                  <input
                    type="number"
                    value={formData.metadata.question_count}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        metadata: {
                          ...formData.metadata,
                          question_count: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Card description"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.is_active}
                  onChange={e =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingCard(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCard}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {editingCard ? 'Update Card' : 'Create Card'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cards Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading learning cards...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map(card => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{card.icon}</span>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </div>
                    <Badge
                      style={{ backgroundColor: card.color, color: 'white' }}
                    >
                      {card.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {card.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1 text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>{card.metadata.question_count} questions</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{card.metadata.estimatedTime}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        className={getDifficultyColor(card.metadata.difficulty)}
                      >
                        {card.metadata.difficulty}
                      </Badge>
                      <Badge variant={card.is_active ? 'default' : 'secondary'}>
                        {card.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCard(card)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(card.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && cards.length === 0 && (
          <div className="text-center py-16">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Learning Cards Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first learning card to get started
            </p>
            <Button
              onClick={handleCreateCard}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Card
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Delete Learning Card
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this learning card? This action
              cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteCard(showDeleteConfirm)}
              >
                Delete Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
