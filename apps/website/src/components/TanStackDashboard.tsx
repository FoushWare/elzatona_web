'use client';

import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@elzatona/shared-components';
import { Badge } from '@elzatona/shared-components';
import { Button } from '@elzatona/shared-components';
import { Skeleton } from '@elzatona/shared-components';
import {
  useAdminStats,
  useCards,
  usePlans,
  useCategories,
  useTopics,
  useQuestionsUnified,
  usePrefetchRelatedData,
} from '@elzatona/shared-hooks';
import {
  BarChart3,
  BookOpen,
  Target,
  HelpCircle,
  Layers,
  Calendar,
  Code,
  Calculator,
  RefreshCw,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react';

// Loading skeleton component
const StatsCardSkeleton = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <Skeleton className='h-4 w-24' />
      <Skeleton className='h-4 w-4' />
    </CardHeader>
    <CardContent>
      <Skeleton className='h-8 w-16 mb-1' />
      <Skeleton className='h-3 w-32' />
    </CardContent>
  </Card>
);

// Individual stats card component
const StatsCard: React.FC<{
  title: string;
  value: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
  isLoading?: boolean;
}> = ({ title, value, description, icon: Icon, trend, isLoading }) => {
  if (isLoading) {
    return <StatsCardSkeleton />;
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
          {title}
        </CardTitle>
        <Icon className='h-4 w-4 text-gray-600 dark:text-gray-400' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-gray-900 dark:text-white'>
          {value.toLocaleString()}
        </div>
        <div className='flex items-center space-x-2'>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            {description}
          </p>
          {trend !== undefined && (
            <Badge
              variant={trend > 0 ? 'default' : 'secondary'}
              className='text-xs'
            >
              <TrendingUp className='h-3 w-3 mr-1' />
              {trend > 0 ? '+' : ''}
              {trend}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main dashboard component using TanStack Query
export const TanStackDashboard: React.FC = () => {
  // Fetch all data using custom hooks
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useAdminStats();

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

  // Prefetch related data for better UX
  const { prefetchCardData, prefetchCategoryData } = usePrefetchRelatedData();

  // Handle refresh
  const handleRefresh = () => {
    refetchStats();
  };

  // Check if any data is loading
  const isLoading =
    statsLoading ||
    cardsLoading ||
    plansLoading ||
    categoriesLoading ||
    topicsLoading ||
    questionsLoading;

  // Check if there are any errors
  const hasError =
    statsError ||
    cardsError ||
    plansError ||
    categoriesError ||
    topicsError ||
    questionsError;

  if (hasError) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Card className='w-full max-w-md'>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-red-500 mb-4'>
                <BarChart3 className='h-12 w-12 mx-auto' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                Error Loading Dashboard
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                There was an error loading the dashboard data. Please try again.
              </p>
              <Button onClick={handleRefresh} variant='outline'>
                <RefreshCw className='h-4 w-4 mr-2' />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Admin Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            Overview of your learning platform
          </p>
        </div>
        <Button onClick={handleRefresh} variant='outline' disabled={isLoading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Questions'
          value={stats?.questions || 0}
          description='Questions in database'
          icon={HelpCircle}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Categories'
          value={stats?.categories || 0}
          description='Learning categories'
          icon={BookOpen}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Topics'
          value={stats?.topics || 0}
          description='Learning topics'
          icon={Target}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Learning Cards'
          value={stats?.learningCards || 0}
          description='Card collections'
          icon={Layers}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Learning Plans'
          value={stats?.learningPlans || 0}
          description='Structured plans'
          icon={Calendar}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Frontend Tasks'
          value={stats?.frontendTasks || 0}
          description='Coding challenges'
          icon={Code}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Problem Solving'
          value={stats?.problemSolvingTasks || 0}
          description='Algorithm tasks'
          icon={Calculator}
          isLoading={statsLoading}
        />
        <StatsCard
          title='Total Content'
          value={
            (stats?.questions || 0) +
            (stats?.frontendTasks || 0) +
            (stats?.problemSolvingTasks || 0)
          }
          description='All learning content'
          icon={Users}
          isLoading={statsLoading}
        />
      </div>

      {/* Detailed Data Tables */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Cards Table */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Layers className='h-5 w-5 mr-2' />
              Learning Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cardsLoading ? (
              <div className='space-y-2'>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className='h-8 w-full' />
                ))}
              </div>
            ) : (
              <div className='space-y-2'>
                {cardsData?.data?.map(card => (
                  <div
                    key={card.id}
                    className='flex items-center justify-between p-2 border rounded'
                    onMouseEnter={() => prefetchCardData(card.title)}
                  >
                    <div className='flex items-center space-x-2'>
                      <div
                        className='w-3 h-3 rounded-full'
                        style={{ backgroundColor: card.color }}
                      />
                      <span className='font-medium'>{card.title}</span>
                    </div>
                    <Badge variant='outline'>{card.description}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Calendar className='h-5 w-5 mr-2' />
              Learning Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            {plansLoading ? (
              <div className='space-y-2'>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className='h-8 w-full' />
                ))}
              </div>
            ) : (
              <div className='space-y-2'>
                {plansData?.data?.map(plan => (
                  <div
                    key={plan.id}
                    className='flex items-center justify-between p-2 border rounded'
                  >
                    <div className='flex items-center space-x-2'>
                      <Clock className='h-4 w-4 text-gray-500' />
                      <span className='font-medium'>{plan.name}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Badge variant='outline'>{plan.duration}</Badge>
                      <Badge variant='secondary'>{plan.difficulty}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <TrendingUp className='h-5 w-5 mr-2' />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {isLoading ? '...' : 'Fast'}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Data Loading
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {isLoading ? '...' : 'Cached'}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Query Cache
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                {isLoading ? '...' : 'Optimized'}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Performance
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TanStackDashboard;
