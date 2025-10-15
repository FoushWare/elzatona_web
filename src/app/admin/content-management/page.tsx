'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  Suspense,
} from 'react';
import {
  useCards,
  usePlans,
  useCategories,
  useTopics,
  useQuestionsUnified,
  useCreateCard,
  useUpdateCard,
  useDeleteCard,
  useCreatePlan,
  useUpdatePlan,
  useDeletePlan,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from '@/hooks/useTanStackQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationActions } from '@/hooks/useNotificationActions';
import { BulkOperations } from '@/shared/components/admin/BulkOperations';
import { LearningCard } from '@/types/learning-cards';
import { UnifiedQuestion } from '@/lib/unified-question-schema';

// Define types for other entities (these should be moved to proper type files)
type LearningPlan = any;
type Category = any;
type Topic = any;

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
import { Modal } from '@/shared/components/ui/modal';

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
const EmptyState = React.lazy(() =>
  import('@/shared/components/ui/empty-state').then(module => ({
    default: module.EmptyState,
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
  // Use TanStack Query hooks for data fetching
  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards();

  const {
    data: plansData,
    isLoading: plansLoading,
    error: plansError,
  } = usePlans();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    data: topicsData,
    isLoading: topicsLoading,
    error: topicsError,
  } = useTopics();

  const {
    data: questionsData,
    isLoading: questionsLoading,
    error: questionsError,
  } = useQuestionsUnified();

  // Mutation hooks
  const createCardMutation = useCreateCard();
  const updateCardMutation = useUpdateCard();
  const deleteCardMutation = useDeleteCard();
  const createPlanMutation = useCreatePlan();
  const updatePlanMutation = useUpdatePlan();
  const deletePlanMutation = useDeletePlan();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const createTopicMutation = useCreateTopic();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();

  // Notification actions
  const { notifyContentUpdate, notifyAdminAction } = useNotificationActions();

  // Query client for manual invalidation
  const queryClient = useQueryClient();

  // Debug logging for TanStack Query
  console.log('TanStack Query Status:', {
    cardsLoading,
    cardsError,
    cardsData: cardsData
      ? { count: cardsData.count, dataLength: cardsData.data?.length }
      : null,
    plansLoading,
    plansError,
    plansData: plansData
      ? { count: plansData.count, dataLength: plansData.data?.length }
      : null,
    categoriesLoading,
    categoriesError,
    categoriesData: categoriesData
      ? { count: categoriesData.count, dataLength: categoriesData.data?.length }
      : null,
    topicsLoading,
    topicsError,
    topicsData: topicsData
      ? { count: topicsData.count, dataLength: topicsData.data?.length }
      : null,
    questionsLoading,
    questionsError,
    questionsData: questionsData
      ? {
          count: questionsData.pagination?.totalCount || 0,
          dataLength: questionsData.data?.length,
        }
      : null,
  });

  // Derived data
  const cards = cardsData?.data || [];
  const plans = plansData?.data || [];
  const categories = categoriesData?.data || [];
  const topics = topicsData?.data || [];
  const questions = questionsData?.data || [];

  // Force fresh data on mount
  useEffect(() => {
    console.log('🔄 Force refreshing all queries on mount...');
    queryClient.invalidateQueries({ queryKey: ['cards'] });
    queryClient.invalidateQueries({ queryKey: ['plans'] });
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    queryClient.invalidateQueries({ queryKey: ['topics'] });
    queryClient.invalidateQueries({ queryKey: ['questionsUnified'] });
  }, []); // Only run on mount

  // Immediate retry on mount if no data
  useEffect(() => {
    console.log('🚀 Component mounted, checking initial data...');

    // If we have loading states but no data after a short delay, retry immediately
    const immediateTimer = setTimeout(() => {
      if (cardsLoading && !cardsData) {
        console.log('🔄 Immediate retry for cards');
        queryClient.invalidateQueries({ queryKey: ['cards'] });
      }
      if (plansLoading && !plansData) {
        console.log('🔄 Immediate retry for plans');
        queryClient.invalidateQueries({ queryKey: ['plans'] });
      }
    }, 500); // Very short delay for immediate retry

    return () => clearTimeout(immediateTimer);
  }, []); // Only run on mount

  // Fallback mechanism - refetch if no data after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔍 Checking data availability after 2 seconds...');

      if (
        !cardsLoading &&
        (!cardsData || !cardsData.data || cardsData.data.length === 0)
      ) {
        console.log('🔄 Refetching cards due to empty data');
        queryClient.invalidateQueries({ queryKey: ['cards'] });
      }
      if (
        !plansLoading &&
        (!plansData || !plansData.data || plansData.data.length === 0)
      ) {
        console.log('🔄 Refetching plans due to empty data');
        queryClient.invalidateQueries({ queryKey: ['plans'] });
      }
      if (
        !categoriesLoading &&
        (!categoriesData ||
          !categoriesData.data ||
          categoriesData.data.length === 0)
      ) {
        console.log('🔄 Refetching categories due to empty data');
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      }
      if (
        !topicsLoading &&
        (!topicsData || !topicsData.data || topicsData.data.length === 0)
      ) {
        console.log('🔄 Refetching topics due to empty data');
        queryClient.invalidateQueries({ queryKey: ['topics'] });
      }
      if (
        !questionsLoading &&
        (!questionsData ||
          !questionsData.data ||
          questionsData.data.length === 0)
      ) {
        console.log('🔄 Refetching questions due to empty data');
        queryClient.invalidateQueries({ queryKey: ['questionsUnified'] });
      }
    }, 2000); // Wait 2 seconds after component mount

    return () => clearTimeout(timer);
  }, [
    cardsLoading,
    cardsData,
    plansLoading,
    plansData,
    categoriesLoading,
    categoriesData,
    topicsLoading,
    topicsData,
    questionsLoading,
    questionsData,
    queryClient,
  ]);

  // Loading state
  const loading =
    cardsLoading ||
    plansLoading ||
    categoriesLoading ||
    topicsLoading ||
    questionsLoading;

  // Stats calculation
  const stats = useMemo(
    () => ({
      totalCards: cardsData?.count || 0,
      totalPlans: plansData?.count || 0,
      totalCategories: categoriesData?.count || 0,
      totalTopics: topicsData?.count || 0,
      totalQuestions: questionsData?.pagination?.totalCount || 0,
    }),
    [cardsData, plansData, categoriesData, topicsData, questionsData]
  );

  // UI state
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

  // Confirmation modal states
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);
  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] =
    useState(false);

  // Item to delete states
  const [cardToDelete, setCardToDelete] = useState<LearningCard | null>(null);
  const [planToDelete, setPlanToDelete] = useState<LearningPlan | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const [questionToDelete, setQuestionToDelete] =
    useState<UnifiedQuestion | null>(null);

  const [editingCard, setEditingCard] = useState<LearningCard | null>(null);
  const [editingPlan, setEditingPlan] = useState<LearningPlan | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] =
    useState<UnifiedQuestion | null>(null);

  // Questions state
  const [questionsByTopic, setQuestionsByTopic] = useState<
    Record<
      string,
      { id: string; title: string; difficulty: string; type: string }[]
    >
  >({});

  // Bulk operations state
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [activeBulkSection, setActiveBulkSection] = useState<
    'cards' | 'plans' | 'categories' | 'topics' | 'questions'
  >('cards');

  // CRUD handlers using TanStack Query mutations
  const handleCreateCard = async (cardData: Partial<LearningCard>) => {
    try {
      await createCardMutation.mutateAsync(cardData);
      await notifyContentUpdate('Learning Card', 'created');
      // Close modal on successful creation
      setIsCardModalOpen(false);
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  const handleUpdateCard = async (
    cardId: string,
    cardData: Partial<LearningCard>
  ) => {
    try {
      await updateCardMutation.mutateAsync({ id: cardId, data: cardData });
      await notifyContentUpdate('Learning Card', 'updated');
      // Close modal on successful update
      setIsCardModalOpen(false);
      setEditingCard(null);
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  // Form submission wrappers
  const handleCardFormSubmit = (data: any) => {
    if (editingCard?.id) {
      handleUpdateCard(editingCard.id, data);
    } else {
      handleCreateCard(data);
    }
  };

  const handlePlanFormSubmit = (data: any) => {
    if (editingPlan?.id) {
      handleUpdatePlan(editingPlan.id, data);
    } else {
      handleCreatePlan(data);
    }
  };

  const handleCategoryFormSubmit = async (data: any) => {
    if (editingCategory?.id) {
      await handleUpdateCategory(editingCategory.id, data);
    } else {
      await handleCreateCategory(data);
    }
  };

  const handleTopicFormSubmit = async (data: any) => {
    if (editingTopic?.id) {
      await handleUpdateTopic(editingTopic.id, data);
    } else {
      await handleCreateTopic(data);
    }
  };

  const handleQuestionFormSubmit = async (data: any) => {
    if (editingQuestion?.id) {
      await handleUpdateQuestion(editingQuestion.id, data);
    } else {
      await handleCreateQuestion(data);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setCardToDelete(card);
      setIsDeleteCardModalOpen(true);
    }
  };

  const handleCreatePlan = async (planData: Partial<LearningPlan>) => {
    try {
      await createPlanMutation.mutateAsync(planData);
      await notifyContentUpdate('Learning Plan', 'created');
    } catch (error) {
      console.error('Failed to create plan:', error);
    }
  };

  const handleUpdatePlan = async (
    planId: string,
    planData: Partial<LearningPlan>
  ) => {
    try {
      await updatePlanMutation.mutateAsync({ id: planId, data: planData });
      await notifyContentUpdate('Learning Plan', 'updated');
      // Close modal on successful update
      setIsPlanModalOpen(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Failed to update plan:', error);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setPlanToDelete(plan);
      setIsDeletePlanModalOpen(true);
    }
  };

  const confirmDeletePlan = async () => {
    if (!planToDelete) return;

    try {
      await deletePlanMutation.mutateAsync(planToDelete.id);
      await notifyContentUpdate('Learning Plan', 'deleted');
      setIsDeletePlanModalOpen(false);
      setPlanToDelete(null);
    } catch (error) {
      console.error('Failed to delete plan:', error);
    }
  };

  const handleCreateCategory = async (categoryData: Partial<Category>) => {
    try {
      await createCategoryMutation.mutateAsync(categoryData);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdateCategory = async (
    categoryId: string,
    categoryData: Partial<Category>
  ) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: categoryId,
        data: categoryData,
      });
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleCreateTopic = async (topicData: Partial<Topic>) => {
    try {
      await createTopicMutation.mutateAsync(topicData);
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  const handleUpdateTopic = async (
    topicId: string,
    topicData: Partial<Topic>
  ) => {
    try {
      await updateTopicMutation.mutateAsync({ id: topicId, data: topicData });
    } catch (error) {
      console.error('Failed to update topic:', error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      await deleteTopicMutation.mutateAsync(topicId);
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  const handleCreateQuestion = async (
    questionData: Partial<UnifiedQuestion>
  ) => {
    try {
      await createQuestionMutation.mutateAsync(questionData);
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const handleUpdateQuestion = async (
    questionId: string,
    questionData: Partial<UnifiedQuestion>
  ) => {
    try {
      await updateQuestionMutation.mutateAsync({
        id: questionId,
        data: questionData,
      });
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await deleteQuestionMutation.mutateAsync(questionId);
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

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
  const toggleCard = useCallback((cardId: string) => {
    setExpandedCards(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(cardId)) {
        newExpanded.delete(cardId);
      } else {
        newExpanded.add(cardId);
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

  const togglePlan = useCallback((planId: string) => {
    setExpandedPlans(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(planId)) {
        newExpanded.delete(planId);
      } else {
        newExpanded.add(planId);
      }
      return newExpanded;
    });
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

  // Error handling
  if (
    cardsError ||
    plansError ||
    categoriesError ||
    topicsError ||
    questionsError
  ) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              There was an error loading the admin data. Please try refreshing
              the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
            <div className="mt-4 text-sm text-gray-500">
              {cardsError && <p>Cards Error: {cardsError.message}</p>}
              {plansError && <p>Plans Error: {plansError.message}</p>}
              {categoriesError && (
                <p>Categories Error: {categoriesError.message}</p>
              )}
              {topicsError && <p>Topics Error: {topicsError.message}</p>}
              {questionsError && (
                <p>Questions Error: {questionsError.message}</p>
              )}
            </div>
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
          Comprehensive admin interface for managing learning cards, plans,
          categories, topics, and questions
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

      {/* Bulk Operations */}
      <div className="mb-8">
        <BulkOperations
          targetType={activeBulkSection}
          selectedItems={
            activeBulkSection === 'cards'
              ? selectedCards
              : activeBulkSection === 'plans'
                ? selectedPlans
                : activeBulkSection === 'categories'
                  ? selectedCategories
                  : activeBulkSection === 'topics'
                    ? selectedTopics
                    : selectedQuestions
          }
          onSelectionChange={items => {
            if (activeBulkSection === 'cards') setSelectedCards(items);
            else if (activeBulkSection === 'plans') setSelectedPlans(items);
            else if (activeBulkSection === 'categories')
              setSelectedCategories(items);
            else if (activeBulkSection === 'topics') setSelectedTopics(items);
            else setSelectedQuestions(items);
          }}
          onOperationComplete={() => {
            // Refresh data after bulk operation
            queryClient.invalidateQueries();
          }}
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
        </div>

        <div className="space-y-4">
          {filteredCards.length === 0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <EmptyState
                icon={Layers}
                title="No Learning Cards"
                description="Create your first learning card to organize categories and topics for structured learning."
                action={{
                  label: 'Create First Card',
                  onClick: () => {
                    setEditingCard(null);
                    setIsCardModalOpen(true);
                  },
                }}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </Suspense>
          ) : (
            filteredCards.map(card => {
              const cardCategories = categories.filter(
                cat => cat.cardType === card.title
              );
              const IconComponent =
                CARD_ICONS[card.title as keyof typeof CARD_ICONS]?.icon ||
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
                          <CardTitle className="text-lg">
                            {card.title}
                          </CardTitle>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingCard(card);
                            setIsCardModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          disabled={deleteCardMutation?.isPending}
                        >
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
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingCategory(category);
                                      setIsCategoryModalOpen(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
                                    }
                                    disabled={deleteCategoryMutation?.isPending}
                                  >
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
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                setEditingTopic(topic);
                                                setIsTopicModalOpen(true);
                                              }}
                                            >
                                              <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                handleDeleteTopic(topic.id)
                                              }
                                              disabled={
                                                deleteTopicMutation?.isPending
                                              }
                                            >
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
                                                    onClick={() => {
                                                      setEditingQuestion(
                                                        question as UnifiedQuestion
                                                      );
                                                      setIsQuestionModalOpen(
                                                        true
                                                      );
                                                    }}
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                      handleDeleteQuestion(
                                                        question.id
                                                      )
                                                    }
                                                    disabled={
                                                      deleteQuestionMutation?.isPending
                                                    }
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
            })
          )}
        </div>
      </div>

      {/* Plans Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            Learning Plans ({stats.totalPlans})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredPlans.length === 0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <EmptyState
                icon={Calendar}
                title="No Learning Plans"
                description="Create your first learning plan to provide structured learning paths for users."
                action={{
                  label: 'Create First Plan',
                  onClick: () => {
                    setEditingPlan(null);
                    setIsPlanModalOpen(true);
                  },
                }}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </Suspense>
          ) : (
            filteredPlans.map(plan => (
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingPlan(plan);
                          setIsPlanModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        disabled={deletePlanMutation?.isPending}
                      >
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
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingCard(null);
        }}
        title={editingCard ? 'Edit Card' : 'Create New Card'}
      >
        <CardForm
          card={editingCard}
          onSubmit={handleCardFormSubmit}
          onCancel={() => {
            setIsCardModalOpen(false);
            setEditingCard(null);
          }}
          isLoading={
            createCardMutation.isPending || updateCardMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isPlanModalOpen}
        onClose={() => {
          setIsPlanModalOpen(false);
          setEditingPlan(null);
        }}
        title={editingPlan ? 'Edit Plan' : 'Create New Plan'}
      >
        <PlanForm
          plan={editingPlan}
          onSubmit={handlePlanFormSubmit}
          onCancel={() => {
            setIsPlanModalOpen(false);
            setEditingPlan(null);
          }}
          isLoading={
            createPlanMutation.isPending || updatePlanMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? 'Edit Category' : 'Create New Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleCategoryFormSubmit}
          onCancel={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          isLoading={
            createCategoryMutation.isPending || updateCategoryMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isTopicModalOpen}
        onClose={() => {
          setIsTopicModalOpen(false);
          setEditingTopic(null);
        }}
        title={editingTopic ? 'Edit Topic' : 'Create New Topic'}
      >
        <TopicForm
          topic={editingTopic}
          categories={categories}
          onSubmit={handleTopicFormSubmit}
          onCancel={() => {
            setIsTopicModalOpen(false);
            setEditingTopic(null);
          }}
          isLoading={
            createTopicMutation.isPending || updateTopicMutation.isPending
          }
        />
      </Modal>

      <Modal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setEditingQuestion(null);
        }}
        title={editingQuestion ? 'Edit Question' : 'Create New Question'}
      >
        <QuestionForm
          question={editingQuestion as any}
          topics={topics}
          categories={categories}
          onSubmit={handleQuestionFormSubmit}
          onCancel={() => {
            setIsQuestionModalOpen(false);
            setEditingQuestion(null);
          }}
          isLoading={
            createQuestionMutation.isPending || updateQuestionMutation.isPending
          }
        />
      </Modal>
    </div>
  );
}
