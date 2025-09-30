'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Clock, BookOpen, Star, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

interface LearningCartItem {
  id: string;
  questionId: string;
  question: string;
  category: string;
  topic: string;
  learningPath: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'single' | 'multiple' | 'conceptual' | 'code';
  addedAt: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number;
  tags: string[];
}

interface LearningCart {
  id: string;
  userId: string;
  items: LearningCartItem[];
  totalQuestions: number;
  estimatedTime: number;
  categories: string[];
  topics: string[];
  learningPaths: string[];
  createdAt: string;
  updatedAt: string;
}

export default function LearningCartPage() {
  const [cart, setCart] = useState<LearningCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('addedAt');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const userId = 'test-user'; // In real app, get from auth
      const response = await fetch(`/api/learning-cart?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const userId = 'test-user';
      const response = await fetch(`/api/learning-cart?userId=${userId}&itemId=${itemId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchCart(); // Refresh cart
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateItemPriority = async (itemId: string, priority: 'low' | 'medium' | 'high') => {
    try {
      const userId = 'test-user';
      const response = await fetch('/api/learning-cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itemId,
          updates: { priority }
        })
      });
      
      if (response.ok) {
        await fetchCart(); // Refresh cart
      }
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'multiple': return 'bg-purple-100 text-purple-800';
      case 'conceptual': return 'bg-green-100 text-green-800';
      case 'code': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = cart?.items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'high') return item.priority === 'high';
    if (filter === 'medium') return item.priority === 'medium';
    if (filter === 'low') return item.priority === 'low';
    return true;
  }) || [];

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'addedAt':
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'priority':
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your learning cart is empty</h3>
          <p className="text-gray-600 mb-4">
            Start building your personalized learning plan by adding questions from learning paths.
          </p>
          <Link href="/learning-paths">
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Learning Paths
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Cart</h1>
          <p className="text-gray-600">Build your personalized learning plan</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/learning-paths">
            <Button variant="outline" className="mr-2">
              <Plus className="h-4 w-4 mr-2" />
              Add More Questions
            </Button>
          </Link>
          <Button>
            <Star className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      {/* Cart Summary */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{cart.totalQuestions}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{cart.estimatedTime}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{cart.categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{cart.topics.length}</div>
              <div className="text-sm text-gray-600">Topics</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All ({cart.totalQuestions})
          </Button>
          <Button
            variant={filter === 'high' ? 'default' : 'outline'}
            onClick={() => setFilter('high')}
            size="sm"
          >
            High Priority
          </Button>
          <Button
            variant={filter === 'medium' ? 'default' : 'outline'}
            onClick={() => setFilter('medium')}
            size="sm"
          >
            Medium Priority
          </Button>
          <Button
            variant={filter === 'low' ? 'default' : 'outline'}
            onClick={() => setFilter('low')}
            size="sm"
          >
            Low Priority
          </Button>
        </div>
        
        <div className="flex-1">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="addedAt">Recently Added</option>
            <option value="priority">Priority</option>
            <option value="difficulty">Difficulty</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {sortedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority} priority
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {item.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.estimatedTime} min
                    </div>
                    <div className="text-gray-500">
                      {item.topic} • {item.learningPath}
                    </div>
                  </div>

                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={item.priority === 'low' ? 'default' : 'outline'}
                      onClick={() => updateItemPriority(item.id, 'low')}
                    >
                      Low
                    </Button>
                    <Button
                      size="sm"
                      variant={item.priority === 'medium' ? 'default' : 'outline'}
                      onClick={() => updateItemPriority(item.id, 'medium')}
                    >
                      Med
                    </Button>
                    <Button
                      size="sm"
                      variant={item.priority === 'high' ? 'default' : 'outline'}
                      onClick={() => updateItemPriority(item.id, 'high')}
                    >
                      High
                    </Button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Plan Button */}
      <div className="mt-8 text-center">
        <Button size="lg" className="px-8">
          <Star className="h-5 w-5 mr-2" />
          Create Learning Plan ({cart.totalQuestions} questions, {cart.estimatedTime} minutes)
        </Button>
      </div>
    </div>
  );
}
