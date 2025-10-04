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
import { Badge } from '@/components/ui/badge';
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
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { CARD_TYPES, CARD_TYPE_CONFIG } from '@/types/learning-cards';
import type { LearningCard } from '@/types/learning-cards';

export default function LearningCardsPage() {
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<LearningCard | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for now - will be replaced with Firebase integration
  useEffect(() => {
    const mockCards: LearningCard[] = [
      {
        id: '1',
        title: 'Core Technologies',
        description: 'HTML, CSS, JavaScript, TypeScript fundamentals',
        type: 'core-technologies',
        icon: 'code',
        color: 'blue',
        order: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        config: {
          questionCount: 20,
          timeLimit: 60,
          difficulty: 'beginner',
          topics: ['html', 'css', 'javascript', 'typescript'],
        },
        content: {
          questionIds: [],
          learningPathIds: [],
          resources: [],
        },
      },
      {
        id: '2',
        title: 'Framework Questions',
        description: 'React.js, Next.js, Vue.js, Angular and more',
        type: 'framework-questions',
        icon: 'layers',
        color: 'green',
        order: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        config: {
          questionCount: 25,
          timeLimit: 90,
          difficulty: 'intermediate',
          topics: ['react', 'nextjs', 'vue', 'angular'],
        },
        content: {
          questionIds: [],
          learningPathIds: [],
          resources: [],
        },
      },
      {
        id: '3',
        title: 'Problem Solving',
        description: 'Frontend-specific coding challenges',
        type: 'problem-solving',
        icon: 'puzzle',
        color: 'purple',
        order: 3,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        config: {
          questionCount: 15,
          timeLimit: 120,
          difficulty: 'advanced',
          topics: ['algorithms', 'data-structures', 'frontend-challenges'],
        },
        content: {
          questionIds: [],
          learningPathIds: [],
          resources: [],
        },
      },
      {
        id: '4',
        title: 'System Design',
        description: 'Frontend system design patterns and architecture',
        type: 'system-design',
        icon: 'network',
        color: 'orange',
        order: 4,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        config: {
          questionCount: 10,
          timeLimit: 150,
          difficulty: 'advanced',
          topics: [
            'architecture',
            'scalability',
            'performance',
            'design-patterns',
          ],
        },
        content: {
          questionIds: [],
          learningPathIds: [],
          resources: [],
        },
      },
    ];

    setCards(mockCards);
    setLoading(false);
  }, []);

  const filteredCards = cards.filter(
    card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCard = () => {
    const newCard: LearningCard = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: 'core-technologies',
      icon: 'code',
      color: 'blue',
      order: cards.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      config: {
        questionCount: 10,
        difficulty: 'beginner',
        topics: [],
      },
      content: {
        questionIds: [],
        learningPathIds: [],
        resources: [],
      },
    };
    setEditingCard(newCard);
    setIsCreating(true);
  };

  const handleEditCard = (card: LearningCard) => {
    setEditingCard({ ...card });
    setIsCreating(false);
  };

  const handleSaveCard = () => {
    if (!editingCard) return;

    if (isCreating) {
      setCards([...cards, editingCard]);
    } else {
      setCards(
        cards.map(card => (card.id === editingCard.id ? editingCard : card))
      );
    }

    setEditingCard(null);
    setIsCreating(false);
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    setIsCreating(false);
  };

  const getCardTypeConfig = (type: string) => {
    return (
      CARD_TYPE_CONFIG[type as keyof typeof CARD_TYPE_CONFIG] ||
      CARD_TYPE_CONFIG['core-technologies']
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading learning cards...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Learning Cards Management</h1>
          <p className="text-gray-600">
            Manage learning cards for guided learning plans
          </p>
        </div>
        <Button
          onClick={handleCreateCard}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Card</span>
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search cards..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Badge variant="outline">{filteredCards.length} cards</Badge>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map(card => {
          const typeConfig = getCardTypeConfig(card.type);
          return (
            <Card key={card.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{typeConfig.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-${card.color}-600 border-${card.color}-200`}
                  >
                    {typeConfig.title}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Questions:</span>{' '}
                    {card.config.questionCount}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>{' '}
                    {card.config.timeLimit || 'No limit'} min
                  </div>
                  <div>
                    <span className="font-medium">Difficulty:</span>{' '}
                    {card.config.difficulty}
                  </div>
                  <div>
                    <span className="font-medium">Topics:</span>{' '}
                    {card.config.topics.length}
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
                    onClick={() => handleDeleteCard(card.id)}
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {isCreating ? 'Create New Card' : 'Edit Card'}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingCard.title}
                    onChange={e =>
                      setEditingCard({
                        ...editingCard,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={editingCard.type}
                    onValueChange={value =>
                      setEditingCard({
                        ...editingCard,
                        type: value as any,
                        ...getCardTypeConfig(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CARD_TYPE_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingCard.description}
                  onChange={e =>
                    setEditingCard({
                      ...editingCard,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="questionCount">Question Count</Label>
                  <Input
                    id="questionCount"
                    type="number"
                    value={editingCard.config.questionCount}
                    onChange={e =>
                      setEditingCard({
                        ...editingCard,
                        config: {
                          ...editingCard.config,
                          questionCount: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={editingCard.config.timeLimit || ''}
                    onChange={e =>
                      setEditingCard({
                        ...editingCard,
                        config: {
                          ...editingCard.config,
                          timeLimit: parseInt(e.target.value) || undefined,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={editingCard.config.difficulty}
                    onValueChange={value =>
                      setEditingCard({
                        ...editingCard,
                        config: {
                          ...editingCard.config,
                          difficulty: value as any,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="topics">Topics (comma-separated)</Label>
                <Input
                  id="topics"
                  value={editingCard.config.topics.join(', ')}
                  onChange={e =>
                    setEditingCard({
                      ...editingCard,
                      config: {
                        ...editingCard.config,
                        topics: e.target.value
                          .split(',')
                          .map(t => t.trim())
                          .filter(t => t),
                      },
                    })
                  }
                  placeholder="html, css, javascript, typescript"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCard}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isCreating ? 'Create' : 'Save'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
