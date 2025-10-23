'use client';

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Textarea,
  Checkbox,
} from '@elzatona/shared-components';

// Import icons with tree shaking
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  BookOpen,
  Layers,
  Puzzle,
  Network,
  Users,
  Calendar,
  Target,
  Loader2,
} from 'lucide-react';

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

interface LearningCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface LearningPlan {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  is_public: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  learning_card_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  estimated_questions: number;
  order_index: number;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Question {
  id: string;
  title: string;
  content: string;
  type: string;
  difficulty: string;
  category_id: string;
  learning_card_id: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  hints: string[];
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Stats {
  totalCards: number;
  totalPlans: number;
  totalCategories: number;
  totalTopics: number;
  totalQuestions: number;
}

// Memoized constants to prevent recreation on each render
const CARD_ICONS = {
  'Core Technologies': { icon: BookOpen, color: '#3B82F6' },
  'Framework Questions': { icon: Layers, color: '#10B981' },
  'Problem Solving': { icon: Puzzle, color: '#F59E0B' },
  'System Design': { icon: Network, color: '#EF4444' },
} as const;

// Loading skeleton component for better UX
const LoadingSkeleton = () => (
  <div className='animate-pulse'>
    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
    <div className='h-3 bg-gray-200 rounded w-1/2'></div>
  </div>
);

// Memoized stats card component
const StatsCard = React.memo(
  ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    label: string;
    value: number;
    color: string;
  }) => (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-center'>
          <Icon className='h-8 w-8 mr-3' style={{ color }} />
          <div>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              {label}
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
);

StatsCard.displayName = 'StatsCard';

export default function ContentManagementPage() {
  // State for data
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCardType, setFilterCardType] = useState('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Fetch data from Supabase
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        cardsResult,
        plansResult,
        categoriesResult,
        topicsResult,
        questionsResult,
      ] = await Promise.all([
        supabase.from('learning_cards').select('*').order('order_index'),
        supabase.from('learning_plans').select('*').order('created_at'),
        supabase.from('categories').select('*').order('created_at'),
        supabase.from('topics').select('*').order('order_index'),
        supabase.from('questions').select('*').order('created_at').limit(1000), // Limit to prevent performance issues
      ]);

      if (cardsResult.error) throw cardsResult.error;
      if (plansResult.error) throw plansResult.error;
      if (categoriesResult.error) throw categoriesResult.error;
      if (topicsResult.error) throw topicsResult.error;
      if (questionsResult.error) throw questionsResult.error;

      setCards(cardsResult.data || []);
      setPlans(plansResult.data || []);
      setCategories(categoriesResult.data || []);
      setTopics(topicsResult.data || []);
      setQuestions(questionsResult.data || []);

      console.log('📊 Data loaded:', {
        cards: cardsResult.data?.length || 0,
        plans: plansResult.data?.length || 0,
        categories: categoriesResult.data?.length || 0,
        topics: topicsResult.data?.length || 0,
        questions: questionsResult.data?.length || 0,
      });
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Stats calculation
  const stats = useMemo(
    () => ({
      totalCards: cards.length,
      totalPlans: plans.length,
      totalCategories: categories.length,
      totalTopics: topics.length,
      totalQuestions: questions.length,
    }),
    [cards, plans, categories, topics, questions]
  );

  // Debounced search to improve performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Memoized filtered data to prevent unnecessary recalculations
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // Add null checks to prevent runtime errors
      if (!card || !card.title || !card.description) {
        return false;
      }

      const matchesSearch =
        card.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        card.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      const matchesCardType =
        filterCardType === 'all' || card.title === filterCardType;
      return matchesSearch && matchesCardType;
    });
  }, [cards, debouncedSearchTerm, filterCardType]);

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      // Add null checks to prevent runtime errors
      if (!plan || !plan.name || !plan.description) {
        return false;
      }

      return (
        plan.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        plan.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    });
  }, [plans, debouncedSearchTerm]);

  // Helper functions for UI interactions
  const toggleCard = useCallback((card_id: string) => {
    setExpandedCards(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(card_id)) {
        newExpanded.delete(card_id);
      } else {
        newExpanded.add(card_id);
      }
      return newExpanded;
    });
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      return newExpanded;
    });
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setExpandedTopics(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(topicId)) {
        newExpanded.delete(topicId);
      } else {
        newExpanded.add(topicId);
      }
      return newExpanded;
    });
  }, []);

  const togglePlan = useCallback((plan_id: string) => {
    setExpandedPlans(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(plan_id)) {
        newExpanded.delete(plan_id);
      } else {
        newExpanded.add(plan_id);
      }
      return newExpanded;
    });
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-blue-600' />
              <p className='text-gray-600 dark:text-gray-400'>
                Loading content management data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='text-red-500 text-6xl mb-4'>⚠️</div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Error Loading Data
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                There was an error loading the content management data. Please
                try refreshing the page.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                Refresh Page
              </Button>
              <div className='mt-4 text-sm text-gray-500'>
                <p>Error: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            🎯 Unified Learning Management
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Comprehensive admin interface for managing learning cards, plans,
            categories, topics, and questions
          </p>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-8'>
          <StatsCard
            icon={Layers}
            label='Cards'
            value={stats.totalCards}
            color='#3B82F6'
          />
          <StatsCard
            icon={Users}
            label='Plans'
            value={stats.totalPlans}
            color='#10B981'
          />
          <StatsCard
            icon={BookOpen}
            label='Categories'
            value={stats.totalCategories}
            color='#8B5CF6'
          />
          <StatsCard
            icon={Target}
            label='Topics'
            value={stats.totalTopics}
            color='#F59E0B'
          />
          <StatsCard
            icon={MessageSquare}
            label='Questions'
            value={stats.totalQuestions}
            color='#EF4444'
          />
        </div>

        {/* Search and Filters */}
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <div className='flex-1'>
            <Suspense fallback={<LoadingSkeleton />}>
              <Input
                placeholder='Search cards, plans, categories, topics...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full'
              />
            </Suspense>
          </div>
          <Suspense fallback={<LoadingSkeleton />}>
            <Select value={filterCardType} onValueChange={setFilterCardType}>
              <SelectTrigger className='w-full md:w-48'>
                <SelectValue placeholder='Filter by card type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Card Types</SelectItem>
                <SelectItem value='Core Technologies'>
                  Core Technologies
                </SelectItem>
                <SelectItem value='Framework Questions'>
                  Framework Questions
                </SelectItem>
                <SelectItem value='Problem Solving'>Problem Solving</SelectItem>
                <SelectItem value='System Design'>System Design</SelectItem>
              </SelectContent>
            </Select>
          </Suspense>
        </div>

        {/* Cards Section */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center'>
              <Layers className='h-5 w-5 mr-2 text-blue-600' />
              Learning Cards ({stats.totalCards})
            </h2>
          </div>

          <div className='space-y-4'>
            {filteredCards.length === 0 ? (
              <Card className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg'>
                <CardContent className='p-8 text-center'>
                  <Layers className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                    No Learning Cards
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Create your first learning card to organize categories and
                    topics for structured learning.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredCards.map(card => {
                const cardCategories = categories.filter(
                  cat => cat.learning_card_id === card.id
                );
                const IconComponent =
                  CARD_ICONS[card.title as keyof typeof CARD_ICONS]?.icon ||
                  Layers;

                return (
                  <Card
                    key={card.id}
                    className='border-l-4'
                    style={{ borderLeftColor: card.color }}
                  >
                    <CardHeader className='pb-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                          <button
                            onClick={() => toggleCard(card.id)}
                            className='p-1 hover:bg-gray-100 rounded'
                          >
                            {expandedCards.has(card.id) ? (
                              <ChevronDown className='h-4 w-4' />
                            ) : (
                              <ChevronRight className='h-4 w-4' />
                            )}
                          </button>
                          <IconComponent
                            className='h-5 w-5'
                            style={{ color: card.color }}
                          />
                          <div>
                            <CardTitle className='text-lg'>
                              {card.title}
                            </CardTitle>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                              {card.description}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Badge
                            variant='outline'
                            className='bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          >
                            {cardCategories.length} Categories
                          </Badge>
                          <Badge
                            variant='outline'
                            className='bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                          >
                            {cardCategories.reduce((total, cat) => {
                              const categoryTopics = topics.filter(
                                topic => topic.category_id === cat.id
                              );
                              return total + categoryTopics.length;
                            }, 0)}{' '}
                            Topics
                          </Badge>
                          <Badge
                            variant='outline'
                            className='bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'
                          >
                            {cardCategories.reduce((total, cat) => {
                              const categoryTopics = topics.filter(
                                topic => topic.category_id === cat.id
                              );
                              return (
                                total +
                                categoryTopics.reduce((topicTotal, topic) => {
                                  const topicQuestions = questions.filter(
                                    q => q.category_id === cat.id
                                  );
                                  return topicTotal + topicQuestions.length;
                                }, 0)
                              );
                            }, 0)}{' '}
                            Questions
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    {expandedCards.has(card.id) && (
                      <CardContent className='pt-0'>
                        <div className='space-y-4'>
                          {/* Categories under this card */}
                          {cardCategories.map(category => {
                            const categoryTopics = topics.filter(
                              topic => topic.category_id === category.id
                            );

                            return (
                              <div
                                key={category.id}
                                className='ml-6 border-l-2 border-gray-200 pl-4'
                              >
                                <div className='flex items-center justify-between py-2'>
                                  <div className='flex items-center space-x-2'>
                                    <button
                                      onClick={() =>
                                        toggleCategory(category.id)
                                      }
                                      className='p-1 hover:bg-gray-100 rounded'
                                    >
                                      {expandedCategories.has(category.id) ? (
                                        <ChevronDown className='h-4 w-4' />
                                      ) : (
                                        <ChevronRight className='h-4 w-4' />
                                      )}
                                    </button>
                                    <BookOpen className='h-4 w-4 text-purple-600' />
                                    <div>
                                      <h4 className='font-medium'>
                                        {category.name}
                                      </h4>
                                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        {category.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='flex items-center space-x-2'>
                                    <Badge
                                      variant='outline'
                                      className='bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                    >
                                      {categoryTopics.length} Topics
                                    </Badge>
                                    <Badge
                                      variant='outline'
                                      className='bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'
                                    >
                                      {
                                        questions.filter(
                                          q => q.category_id === category.id
                                        ).length
                                      }{' '}
                                      Questions
                                    </Badge>
                                  </div>
                                </div>

                                {expandedCategories.has(category.id) && (
                                  <div className='ml-6 space-y-2'>
                                    {categoryTopics.map(topic => {
                                      const topicQuestions = questions.filter(
                                        q => q.category_id === category.id
                                      );

                                      return (
                                        <div
                                          key={topic.id}
                                          className='border-l-2 border-gray-100 pl-4 py-2'
                                        >
                                          <div className='flex items-center justify-between'>
                                            <div className='flex items-center space-x-2'>
                                              <button
                                                onClick={() =>
                                                  toggleTopic(topic.id)
                                                }
                                                className='p-1 hover:bg-gray-100 rounded'
                                              >
                                                {expandedTopics.has(
                                                  topic.id
                                                ) ? (
                                                  <ChevronDown className='h-4 w-4' />
                                                ) : (
                                                  <ChevronRight className='h-4 w-4' />
                                                )}
                                              </button>
                                              <Target className='h-4 w-4 text-orange-600' />
                                              <div>
                                                <h5 className='font-medium'>
                                                  {topic.name}
                                                </h5>
                                                <p className='text-sm text-gray-600 dark:text-gray-400'>
                                                  {topic.description}
                                                </p>
                                              </div>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                              <Badge
                                                variant='outline'
                                                className='bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'
                                              >
                                                {topicQuestions.length}{' '}
                                                Questions
                                              </Badge>
                                            </div>
                                          </div>

                                          {expandedTopics.has(topic.id) && (
                                            <div className='ml-6 space-y-2'>
                                              {topicQuestions
                                                .slice(0, 5)
                                                .map(question => (
                                                  <div
                                                    key={question.id}
                                                    className='flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded'
                                                  >
                                                    <div className='flex items-center space-x-2'>
                                                      <MessageSquare className='h-4 w-4 text-red-600' />
                                                      <div>
                                                        <h6 className='font-medium text-sm'>
                                                          {question.title}
                                                        </h6>
                                                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                                                          {question.difficulty}{' '}
                                                          • {question.type}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              {topicQuestions.length > 5 && (
                                                <p className='text-xs text-gray-500 ml-6'>
                                                  ... and{' '}
                                                  {topicQuestions.length - 5}{' '}
                                                  more questions
                                                </p>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Plans Section */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center'>
              <Users className='h-5 w-5 mr-2 text-green-600' />
              Learning Plans ({stats.totalPlans})
            </h2>
          </div>

          <div className='space-y-4'>
            {filteredPlans.length === 0 ? (
              <Card className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg'>
                <CardContent className='p-8 text-center'>
                  <Calendar className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                    No Learning Plans
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Create your first learning plan to provide structured
                    learning paths for users.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredPlans.map(plan => (
                <Card key={plan.id} className='border-l-4 border-l-green-500'>
                  <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-3'>
                        <button
                          onClick={() => togglePlan(plan.id)}
                          className='p-1 hover:bg-gray-100 rounded'
                        >
                          {expandedPlans.has(plan.id) ? (
                            <ChevronDown className='h-4 w-4' />
                          ) : (
                            <ChevronRight className='h-4 w-4' />
                          )}
                        </button>
                        <Calendar className='h-5 w-5 text-green-600' />
                        <div>
                          <CardTitle className='text-lg'>{plan.name}</CardTitle>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Badge variant='outline'>
                          {plan.estimated_duration} days
                        </Badge>
                        <Badge variant='outline'>
                          {plan.is_public ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedPlans.has(plan.id) && (
                    <CardContent className='pt-0'>
                      <div className='text-sm text-gray-600 dark:text-gray-400'>
                        <p>
                          <strong>Duration:</strong> {plan.estimated_duration}{' '}
                          days
                        </p>
                        <p>
                          <strong>Status:</strong>{' '}
                          {plan.is_active ? 'Active' : 'Inactive'}
                        </p>
                        <p>
                          <strong>Visibility:</strong>{' '}
                          {plan.is_public ? 'Public' : 'Private'}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
