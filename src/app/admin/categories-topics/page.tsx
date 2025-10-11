'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  FileText,
  BarChart3,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

interface Question {
  id: string;
  title?: string;
  content?: string;
  category: string;
  subcategory?: string;
  difficulty?: string;
  sampleAnswers?: string[];
}

interface Category {
  name: string;
  topics: Topic[];
  questionCount: number;
}

interface Topic {
  name: string;
  questionCount: number;
}

interface Stats {
  totalCategories: number;
  totalTopics: number;
  totalQuestions: number;
}

export default function CategoriesTopicsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCategories: 0,
    totalTopics: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const loadCategoriesAndTopics = async () => {
    try {
      console.log('Loading categories and topics...');
      const response = await fetch(
        '/api/questions/unified?page=1&pageSize=500'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      if (data.success && Array.isArray(data.data)) {
        const questions: Question[] = data.data;
        console.log('Fetched questions:', questions.length);

        const processedData = processCategoriesAndTopics(questions);
        setCategories(processedData.categories);
        setStats(processedData.stats);
      } else {
        console.error('Invalid API response structure:', data);
        setCategories([]);
        setStats({ totalCategories: 0, totalTopics: 0, totalQuestions: 0 });
      }
    } catch (error) {
      console.error('Error loading categories and topics:', error);
      setCategories([]);
      setStats({ totalCategories: 0, totalTopics: 0, totalQuestions: 0 });
    } finally {
      setLoading(false);
    }
  };

  const processCategoriesAndTopics = (questions: Question[]) => {
    const categoryMap = new Map<string, Map<string, number>>();
    let totalQuestions = 0;

    questions.forEach(question => {
      const category = question.category || 'Uncategorized';
      const topic = question.subcategory || 'General';

      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Map());
      }

      const topicMap = categoryMap.get(category)!;
      topicMap.set(topic, (topicMap.get(topic) || 0) + 1);
      totalQuestions++;
    });

    const categories: Category[] = Array.from(categoryMap.entries()).map(
      ([categoryName, topicMap]) => ({
        name: categoryName,
        topics: Array.from(topicMap.entries()).map(([topicName, count]) => ({
          name: topicName,
          questionCount: count,
        })),
        questionCount: Array.from(topicMap.values()).reduce(
          (sum, count) => sum + count,
          0
        ),
      })
    );

    const stats: Stats = {
      totalCategories: categories.length,
      totalTopics: categories.reduce((sum, cat) => sum + cat.topics.length, 0),
      totalQuestions,
    };

    return { categories, stats };
  };

  useEffect(() => {
    loadCategoriesAndTopics();
  }, []);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleTopic = (topicKey: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicKey)) {
      newExpanded.delete(topicKey);
    } else {
      newExpanded.add(topicKey);
    }
    setExpandedTopics(newExpanded);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.topics.some(topic =>
        topic.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      filterCategory === 'all' || category.name === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const getCategories = () => {
    return ['all', ...categories.map(cat => cat.name)];
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading categories and topics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Categories & Topics Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage categories and topics for your learning content.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Topics</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTopics}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Questions
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories and topics..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {getCategories().map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filterCategory !== 'all'
                  ? 'No categories match your search criteria.'
                  : 'No categories found. Add some categories to get started.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCategories.map(category => (
            <Card key={category.name} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedCategories.has(category.name) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge variant="secondary">
                      {category.questionCount} questions
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedCategories.has(category.name) && (
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.topics.map(topic => (
                      <div
                        key={`${category.name}-${topic.name}`}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{topic.name}</span>
                          <Badge variant="outline">
                            {topic.questionCount} questions
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Topic
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
