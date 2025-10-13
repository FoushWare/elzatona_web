'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from 'react';

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

interface BasicCard {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}

interface BasicPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  color: string;
  estimatedHours: number;
}

// Lazy load UI components to improve initial bundle size
const Button = React.lazy(() =>
  import('@/shared/components/ui/button').then(module => ({
    default: module.Button,
  }))
);
const Input = React.lazy(() =>
  import('@/shared/components/ui/input').then(module => ({
    default: module.Input,
  }))
);
const Badge = React.lazy(() =>
  import('@/shared/components/ui/badge').then(module => ({
    default: module.Badge,
  }))
);
const Card = React.lazy(() =>
  import('@/shared/components/ui/card').then(module => ({
    default: module.Card,
  }))
);
const CardContent = React.lazy(() =>
  import('@/shared/components/ui/card').then(module => ({
    default: module.CardContent,
  }))
);
const CardHeader = React.lazy(() =>
  import('@/shared/components/ui/card').then(module => ({
    default: module.CardHeader,
  }))
);
const CardTitle = React.lazy(() =>
  import('@/shared/components/ui/card').then(module => ({
    default: module.CardTitle,
  }))
);
const Select = React.lazy(() =>
  import('@/shared/components/ui/select').then(module => ({
    default: module.Select,
  }))
);
const SelectContent = React.lazy(() =>
  import('@/shared/components/ui/select').then(module => ({
    default: module.SelectContent,
  }))
);
const SelectItem = React.lazy(() =>
  import('@/shared/components/ui/select').then(module => ({
    default: module.SelectItem,
  }))
);
const SelectTrigger = React.lazy(() =>
  import('@/shared/components/ui/select').then(module => ({
    default: module.SelectTrigger,
  }))
);
const SelectValue = React.lazy(() =>
  import('@/shared/components/ui/select').then(module => ({
    default: module.SelectValue,
  }))
);
const Modal = React.lazy(() =>
  import('@/shared/components/ui/modal').then(module => ({
    default: module.Modal,
  }))
);

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
  Database,
} from 'lucide-react';

// Lazy load forms to reduce initial bundle size
const CategoryForm = React.lazy(() =>
  import('@/shared/components/forms/CategoryForm').then(module => ({
    default: module.CategoryForm,
  }))
);
const TopicForm = React.lazy(() =>
  import('@/shared/components/forms/TopicForm').then(module => ({
    default: module.TopicForm,
  }))
);
const QuestionForm = React.lazy(() =>
  import('@/shared/components/forms/QuestionForm').then(module => ({
    default: module.QuestionForm,
  }))
);
const CardForm = React.lazy(() =>
  import('@/shared/components/forms/CardForm').then(module => ({
    default: module.CardForm,
  }))
);
const PlanForm = React.lazy(() =>
  import('@/shared/components/forms/PlanForm').then(module => ({
    default: module.PlanForm,
  }))
);

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
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
      <CardContent className="p-4">
        <div className="flex items-center">
          <Icon className="h-8 w-8 mr-3" style={{ color }} />
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
);

StatsCard.displayName = 'StatsCard';

export default function UnifiedAdminPage() {
  // Data state
  const [cards, setCards] = useState<BasicCard[]>([]);
  const [plans, setPlans] = useState<BasicPlan[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; description: string; cardType: string }[]
  >([]);
  const [topics, setTopics] = useState<
    { id: string; name: string; description: string; categoryId: string }[]
  >([]);
  const [stats, setStats] = useState<Stats>({
    totalCards: 0,
    totalPlans: 0,
    totalCategories: 0,
    totalTopics: 0,
    totalQuestions: 0,
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCardType, setFilterCardType] = useState('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  // Modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const [editingCard, setEditingCard] = useState<unknown>(null);
  const [editingPlan, setEditingPlan] = useState<unknown>(null);
  const [editingCategory, setEditingCategory] = useState<unknown>(null);
  const [editingTopic, setEditingTopic] = useState<unknown>(null);
  const [editingQuestion, setEditingQuestion] = useState<unknown>(null);

  // Questions state
  const [questionsByTopic, setQuestionsByTopic] = useState<
    Record<
      string,
      { id: string; title: string; difficulty: string; type: string }[]
    >
  >({});

  // Loading states for each section
  const [loadingStates, setLoadingStates] = useState({
    cards: false,
    plans: false,
    categories: false,
    topics: false,
    questions: false,
  });

  // Data loaded states
  const [dataLoaded, setDataLoaded] = useState({
    cards: false,
    plans: false,
    categories: false,
    topics: false,
    questions: false,
  });

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
      if (!card || !card.name || !card.description) {
        return false;
      }

      const matchesSearch =
        card.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        card.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      const matchesCardType =
        filterCardType === 'all' || card.name === filterCardType;
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

  // Optimized data loading with caching
  const loadInitialStructure = useCallback(async () => {
    try {
      setLoading(true);

      // Use Promise.allSettled to prevent one failed request from breaking everything
      const [
        cardsResult,
        plansResult,
        categoriesResult,
        topicsResult,
        questionsResult,
      ] = await Promise.allSettled([
        fetch('/api/cards'),
        fetch('/api/plans'),
        fetch('/api/categories'),
        fetch('/api/topics'),
        fetch('/api/questions'),
      ]);

      // Process results safely
      const processResult = async (result: PromiseSettledResult<Response>) => {
        if (result.status === 'fulfilled') {
          const data = await result.value.json();
          return data.success ? data : { success: false, count: 0 };
        }
        return { success: false, count: 0 };
      };

      const [cardsData, plansData, categoriesData, topicsData, questionsData] =
        await Promise.all([
          processResult(cardsResult),
          processResult(plansResult),
          processResult(categoriesResult),
          processResult(topicsResult),
          processResult(questionsResult),
        ]);

      // Set stats immediately for quick display
      setStats({
        totalCards: cardsData.count || 0,
        totalPlans: plansData.count || 0,
        totalCategories: categoriesData.count || 0,
        totalTopics: topicsData.count || 0,
        totalQuestions: questionsData.count || 0,
      });

      // Load basic structure data (just IDs and names for quick rendering)
      if (cardsData.success && cardsData.data) {
        const basicCards = cardsData.data
          .filter(
            (card: BasicCard) =>
              card && card.id && card.name && card.description
          )
          .map((card: BasicCard) => ({
            id: card.id,
            name: card.name,
            description: card.description,
            color: card.color || '#3B82F6',
            icon: card.icon || 'layers',
            order: card.order || 0,
          }));
        setCards(basicCards);
        setDataLoaded(prev => ({ ...prev, cards: true }));
      }

      if (plansData.success && plansData.data) {
        const basicPlans = plansData.data
          .filter(
            (plan: BasicPlan) =>
              plan && plan.id && plan.name && plan.description
          )
          .map((plan: BasicPlan) => ({
            id: plan.id,
            name: plan.name,
            description: plan.description,
            duration: plan.duration || 'N/A',
            difficulty: plan.difficulty || 'beginner',
            color: plan.color || '#10B981',
            estimatedHours: plan.estimatedHours || 0,
          }));
        setPlans(basicPlans);
        setDataLoaded(prev => ({ ...prev, plans: true }));
      }
    } catch (error) {
      console.error('Error loading initial structure:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialStructure();
  }, [loadInitialStructure]);

  // Optimized data loading functions with error handling
  const loadCardsData = useCallback(async () => {
    if (dataLoaded.cards) return;

    try {
      setLoadingStates(prev => ({ ...prev, cards: true }));
      const response = await fetch('/api/cards');
      const data: ApiResponse<BasicCard[]> = await response.json();

      if (data.success && data.data) {
        // Filter out invalid cards and add defaults
        const validCards = data.data
          .filter(card => card && card.id && card.name && card.description)
          .map(card => ({
            ...card,
            color: card.color || '#3B82F6',
            icon: card.icon || 'layers',
            order: card.order || 0,
          }));
        setCards(validCards);
        setDataLoaded(prev => ({ ...prev, cards: true }));
      }
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, cards: false }));
    }
  }, [dataLoaded.cards]);

  const loadPlansData = useCallback(async () => {
    if (dataLoaded.plans) return;

    try {
      setLoadingStates(prev => ({ ...prev, plans: true }));
      const response = await fetch('/api/plans');
      const data: ApiResponse<BasicPlan[]> = await response.json();

      if (data.success && data.data) {
        // Filter out invalid plans and add defaults
        const validPlans = data.data
          .filter(plan => plan && plan.id && plan.name && plan.description)
          .map(plan => ({
            ...plan,
            duration: plan.duration || 'N/A',
            difficulty: plan.difficulty || 'beginner',
            color: plan.color || '#10B981',
            estimatedHours: plan.estimatedHours || 0,
          }));
        setPlans(validPlans);
        setDataLoaded(prev => ({ ...prev, plans: true }));
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, plans: false }));
    }
  }, [dataLoaded.plans]);

  const loadCategoriesData = useCallback(async () => {
    if (dataLoaded.categories) return;

    try {
      setLoadingStates(prev => ({ ...prev, categories: true }));
      const response = await fetch('/api/categories');
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
        setDataLoaded(prev => ({ ...prev, categories: true }));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, categories: false }));
    }
  }, [dataLoaded.categories]);

  const loadTopicsData = useCallback(async () => {
    if (dataLoaded.topics) return;

    try {
      setLoadingStates(prev => ({ ...prev, topics: true }));
      const response = await fetch('/api/topics');
      const data = await response.json();

      if (data.success) {
        setTopics(data.data);
        setDataLoaded(prev => ({ ...prev, topics: true }));
      }
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, topics: false }));
    }
  }, [dataLoaded.topics]);

  // Optimized toggle functions with lazy loading
  const toggleCard = useCallback(
    async (cardId: string) => {
      const newExpanded = new Set(expandedCards);
      if (newExpanded.has(cardId)) {
        newExpanded.delete(cardId);
      } else {
        newExpanded.add(cardId);
        // Load categories and topics data when expanding a card
        if (!dataLoaded.categories) {
          await loadCategoriesData();
        }
        if (!dataLoaded.topics) {
          await loadTopicsData();
        }
      }
      setExpandedCards(newExpanded);
    },
    [
      expandedCards,
      dataLoaded.categories,
      dataLoaded.topics,
      loadCategoriesData,
      loadTopicsData,
    ]
  );

  const toggleCategory = useCallback(
    async (categoryId: string) => {
      const newExpanded = new Set(expandedCategories);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
        // Ensure topics data is loaded
        if (!dataLoaded.topics) {
          await loadTopicsData();
        }
      }
      setExpandedCategories(newExpanded);
    },
    [expandedCategories, dataLoaded.topics, loadTopicsData]
  );

  const toggleTopic = useCallback(
    async (topicId: string) => {
      const newExpanded = new Set(expandedTopics);
      if (newExpanded.has(topicId)) {
        newExpanded.delete(topicId);
      } else {
        newExpanded.add(topicId);
        // Load questions for this topic
        try {
          const response = await fetch(`/api/questions/by-topic/${topicId}`);
          const data = await response.json();
          if (data.success) {
            setQuestionsByTopic(prev => ({
              ...prev,
              [topicId]: data.data,
            }));
          }
        } catch (error) {
          console.error('Error loading questions for topic:', error);
        }
      }
      setExpandedTopics(newExpanded);
    },
    [expandedTopics]
  );

  const togglePlan = useCallback(
    (planId: string) => {
      const newExpanded = new Set(expandedPlans);
      if (newExpanded.has(planId)) {
        newExpanded.delete(planId);
      } else {
        newExpanded.add(planId);
      }
      setExpandedPlans(newExpanded);
    },
    [expandedPlans]
  );

  // Optimized CRUD handlers with error handling
  const handleCreateCard = useCallback(
    async (data: unknown) => {
      try {
        const response = await fetch('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create card');
        setIsCardModalOpen(false);
        await loadCardsData();
        setStats(prev => ({ ...prev, totalCards: prev.totalCards + 1 }));
      } catch (error) {
        console.error('Error creating card:', error);
        alert('Failed to create card');
      }
    },
    [loadCardsData]
  );

  const handleCreatePlan = useCallback(
    async (data: unknown) => {
      try {
        const response = await fetch('/api/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create plan');
        setIsPlanModalOpen(false);
        await loadPlansData();
        setStats(prev => ({ ...prev, totalPlans: prev.totalPlans + 1 }));
      } catch (error) {
        console.error('Error creating plan:', error);
        alert('Failed to create plan');
      }
    },
    [loadPlansData]
  );

  const handleCreateCategory = useCallback(
    async (data: unknown) => {
      try {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create category');
        setIsCategoryModalOpen(false);
        await loadCategoriesData();
        setStats(prev => ({
          ...prev,
          totalCategories: prev.totalCategories + 1,
        }));
      } catch (error) {
        console.error('Error creating category:', error);
        alert('Failed to create category');
      }
    },
    [loadCategoriesData]
  );

  const handleCreateTopic = useCallback(
    async (data: unknown) => {
      try {
        const response = await fetch('/api/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create topic');
        setIsTopicModalOpen(false);
        await loadTopicsData();
        setStats(prev => ({ ...prev, totalTopics: prev.totalTopics + 1 }));
      } catch (error) {
        console.error('Error creating topic:', error);
        alert('Failed to create topic');
      }
    },
    [loadTopicsData]
  );

  const handleCreateQuestion = useCallback(async (data: unknown) => {
    try {
      const response = await fetch('/api/questions/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: [data] }),
      });

      if (!response.ok) throw new Error('Failed to create question');
      setIsQuestionModalOpen(false);
      setStats(prev => ({ ...prev, totalQuestions: prev.totalQuestions + 1 }));
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question');
    }
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading unified admin data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 Unified Learning Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage Cards, Plans, Categories, Topics, and Questions in one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatsCard
          icon={Layers}
          label="Cards"
          value={stats.totalCards}
          color="#3B82F6"
        />
        <StatsCard
          icon={Users}
          label="Plans"
          value={stats.totalPlans}
          color="#10B981"
        />
        <StatsCard
          icon={BookOpen}
          label="Categories"
          value={stats.totalCategories}
          color="#8B5CF6"
        />
        <StatsCard
          icon={Target}
          label="Topics"
          value={stats.totalTopics}
          color="#F59E0B"
        />
        <StatsCard
          icon={MessageSquare}
          label="Questions"
          value={stats.totalQuestions}
          color="#EF4444"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Suspense fallback={<LoadingSkeleton />}>
            <Input
              placeholder="Search cards, plans, categories, topics..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </Suspense>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <Select value={filterCardType} onValueChange={setFilterCardType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by card type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Card Types</SelectItem>
              <SelectItem value="Core Technologies">
                Core Technologies
              </SelectItem>
              <SelectItem value="Framework Questions">
                Framework Questions
              </SelectItem>
              <SelectItem value="Problem Solving">Problem Solving</SelectItem>
              <SelectItem value="System Design">System Design</SelectItem>
            </SelectContent>
          </Select>
        </Suspense>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <Button
            onClick={() => {
              setEditingCard(null);
              setIsCardModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Button
            onClick={() => {
              setEditingPlan(null);
              setIsPlanModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Button
            onClick={() => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Button
            onClick={() => {
              setEditingTopic(null);
              setIsTopicModalOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Topic
          </Button>
        </Suspense>
      </div>

      {/* Cards Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Layers className="h-5 w-5 mr-2 text-blue-600" />
            Learning Cards ({stats.totalCards})
          </h2>
          {!dataLoaded.cards && (
            <Suspense fallback={<LoadingSkeleton />}>
              <Button
                onClick={loadCardsData}
                disabled={loadingStates.cards}
                variant="outline"
                size="sm"
              >
                {loadingStates.cards ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Load Cards Data
                  </>
                )}
              </Button>
            </Suspense>
          )}
        </div>

        {!dataLoaded.cards ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click &quot;Load Cards Data&quot; to view learning cards</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCards.map(card => {
              const cardCategories = categories.filter(
                cat => cat.cardType === card.name
              );
              const IconComponent =
                CARD_ICONS[card.name as keyof typeof CARD_ICONS]?.icon ||
                Layers;

              return (
                <Card
                  key={card.id}
                  className="border-l-4"
                  style={{ borderLeftColor: card.color }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleCard(card.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {expandedCards.has(card.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        <IconComponent
                          className="h-5 w-5"
                          style={{ color: card.color }}
                        />
                        <div>
                          <CardTitle className="text-lg">{card.name}</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {cardCategories.length} Categories
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                        >
                          {cardCategories.reduce((total, cat) => {
                            const categoryTopics = topics.filter(
                              topic => topic.categoryId === cat.id
                            );
                            return total + categoryTopics.length;
                          }, 0)}{' '}
                          Topics
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                        >
                          {cardCategories.reduce((total, cat) => {
                            const categoryTopics = topics.filter(
                              topic => topic.categoryId === cat.id
                            );
                            return (
                              total +
                              categoryTopics.reduce((topicTotal, topic) => {
                                const topicQuestions =
                                  questionsByTopic[topic.id] || [];
                                return topicTotal + topicQuestions.length;
                              }, 0)
                            );
                          }, 0)}{' '}
                          Questions
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedCards.has(card.id) && (
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Categories under this card */}
                        {cardCategories.map(category => {
                          const categoryTopics = topics.filter(
                            topic => topic.categoryId === category.id
                          );

                          return (
                            <div
                              key={category.id}
                              className="ml-6 border-l-2 border-gray-200 pl-4"
                            >
                              <div className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    {expandedCategories.has(category.id) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </button>
                                  <BookOpen className="h-4 w-4 text-purple-600" />
                                  <div>
                                    <h4 className="font-medium">
                                      {category.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {category.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                  >
                                    {categoryTopics.length} Topics
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  >
                                    {categoryTopics.reduce((total, topic) => {
                                      const topicQuestions =
                                        questionsByTopic[topic.id] || [];
                                      return total + topicQuestions.length;
                                    }, 0)}{' '}
                                    Questions
                                  </Badge>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {expandedCategories.has(category.id) && (
                                <div className="ml-6 space-y-2">
                                  {categoryTopics.map(topic => {
                                    const topicQuestions =
                                      questionsByTopic[topic.id] || [];

                                    return (
                                      <div
                                        key={topic.id}
                                        className="border-l-2 border-gray-100 pl-4 py-2"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() =>
                                                toggleTopic(topic.id)
                                              }
                                              className="p-1 hover:bg-gray-100 rounded"
                                            >
                                              {expandedTopics.has(topic.id) ? (
                                                <ChevronDown className="h-4 w-4" />
                                              ) : (
                                                <ChevronRight className="h-4 w-4" />
                                              )}
                                            </button>
                                            <Target className="h-4 w-4 text-orange-600" />
                                            <div>
                                              <h5 className="font-medium">
                                                {topic.name}
                                              </h5>
                                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {topic.description}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Badge
                                              variant="outline"
                                              className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                            >
                                              {topicQuestions.length} Questions
                                            </Badge>
                                            <Button variant="ghost" size="sm">
                                              <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>

                                        {expandedTopics.has(topic.id) && (
                                          <div className="ml-6 space-y-2">
                                            {topicQuestions.map(question => (
                                              <div
                                                key={question.id}
                                                className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded"
                                              >
                                                <div className="flex items-center space-x-2">
                                                  <MessageSquare className="h-4 w-4 text-red-600" />
                                                  <div>
                                                    <h6 className="font-medium text-sm">
                                                      {question.title}
                                                    </h6>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                      {question.difficulty} •{' '}
                                                      {question.type}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            ))}
                                            <Button
                                              onClick={() => {
                                                setEditingQuestion(null);
                                                setIsQuestionModalOpen(true);
                                              }}
                                              variant="outline"
                                              size="sm"
                                              className="ml-6"
                                            >
                                              <Plus className="h-3 w-3 mr-1" />
                                              Add Question
                                            </Button>
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
            })}
          </div>
        )}
      </div>

      {/* Plans Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            Learning Plans ({stats.totalPlans})
          </h2>
          {!dataLoaded.plans && (
            <Suspense fallback={<LoadingSkeleton />}>
              <Button
                onClick={loadPlansData}
                disabled={loadingStates.plans}
                variant="outline"
                size="sm"
              >
                {loadingStates.plans ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Load Plans Data
                  </>
                )}
              </Button>
            </Suspense>
          )}
        </div>

        {!dataLoaded.plans ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click &quot;Load Plans Data&quot; to view learning plans</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlans.map(plan => (
              <Card
                key={plan.id}
                className="border-l-4"
                style={{ borderLeftColor: plan.color }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => togglePlan(plan.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedPlans.has(plan.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <Calendar
                        className="h-5 w-5"
                        style={{ color: plan.color }}
                      />
                      <div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {plan.duration} • {plan.difficulty}
                      </Badge>
                      <Badge variant="outline">{plan.estimatedHours}h</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedPlans.has(plan.id) && (
                  <CardContent className="pt-0">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Duration:</strong> {plan.duration}
                      </p>
                      <p>
                        <strong>Difficulty:</strong> {plan.difficulty}
                      </p>
                      <p>
                        <strong>Estimated Hours:</strong> {plan.estimatedHours}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <Suspense fallback={<LoadingSkeleton />}>
        <Modal
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          title={editingCard ? 'Edit Card' : 'Create New Card'}
        >
          <CardForm
            onSubmit={handleCreateCard}
            onCancel={() => setIsCardModalOpen(false)}
          />
        </Modal>
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <Modal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          title={editingPlan ? 'Edit Plan' : 'Create New Plan'}
        >
          <PlanForm
            onSubmit={handleCreatePlan}
            onCancel={() => setIsPlanModalOpen(false)}
          />
        </Modal>
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title={editingCategory ? 'Edit Category' : 'Create New Category'}
        >
          <CategoryForm
            onSubmit={handleCreateCategory}
            onCancel={() => setIsCategoryModalOpen(false)}
          />
        </Modal>
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <Modal
          isOpen={isTopicModalOpen}
          onClose={() => setIsTopicModalOpen(false)}
          title={editingTopic ? 'Edit Topic' : 'Create New Topic'}
        >
          <TopicForm
            onSubmit={handleCreateTopic}
            categories={categories}
            onCancel={() => setIsTopicModalOpen(false)}
          />
        </Modal>
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <Modal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          title={editingQuestion ? 'Edit Question' : 'Create New Question'}
        >
          <QuestionForm
            onSubmit={handleCreateQuestion}
            topics={topics}
            categories={categories}
            onCancel={() => setIsQuestionModalOpen(false)}
          />
        </Modal>
      </Suspense>
    </div>
  );
}
