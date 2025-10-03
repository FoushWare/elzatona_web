'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Users, BookOpen, Star, Filter } from 'lucide-react';
import Link from 'next/link';

interface CustomPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
  topics: string[];
  learningPaths: string[];
  questionCount: number;
  isPublic: boolean;
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
  estimatedTime: number;
  prerequisites: string[];
  learningObjectives: string[];
}

export default function CustomPlansPage() {
  const [customPlans, setCustomPlans] = useState<CustomPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomPlans();
  }, []);

  const fetchCustomPlans = async () => {
    try {
      const response = await fetch('/api/custom-plans?isPublic=true');
      const data = await response.json();

      if (data.success) {
        setCustomPlans(data.data);
      }
    } catch (error) {
      console.error('Error fetching custom plans:', error);
    } finally {
      setLoading(false);
    }
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

  const filteredPlans = customPlans.filter(plan => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'templates' && plan.isTemplate) ||
      (filter === 'public' && plan.isPublic && !plan.isTemplate);

    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesFilter && matchesSearch;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Custom Learning Plans
          </h1>
          <p className="text-gray-600">
            Create and discover personalized learning paths
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/custom-plans/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Custom Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All Plans
          </Button>
          <Button
            variant={filter === 'templates' ? 'default' : 'outline'}
            onClick={() => setFilter('templates')}
            size="sm"
          >
            Templates
          </Button>
          <Button
            variant={filter === 'public' ? 'default' : 'outline'}
            onClick={() => setFilter('public')}
            size="sm"
          >
            Public Plans
          </Button>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3">
                    {plan.description}
                  </CardDescription>
                </div>
                <Badge className={getDifficultyColor(plan.difficulty)}>
                  {plan.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {plan.duration} days
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {plan.questionCount} questions
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {plan.estimatedTime} min
                  </div>
                </div>

                {/* Categories */}
                {plan.categories.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Categories:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {plan.categories.slice(0, 3).map((category, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                      {plan.categories.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{plan.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {plan.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Tags:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {plan.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {plan.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Link href={`/custom-plans/${plan.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Link
                    href={`/custom-plans/${plan.id}/start`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full" size="sm">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No custom plans found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Be the first to create a custom learning plan!'}
          </p>
          <Link href="/custom-plans/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Plan
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
