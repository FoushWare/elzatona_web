import { useState, useEffect, useCallback } from 'react';
import { useFirebaseAuth } from '@elzatona/shared/contexts';
import { LearningPlanProgress } from '@/types/firestore';

interface UseLearningPlansReturn {
  plans: LearningPlanProgress[];
  currentPlan: LearningPlanProgress | null;
  isLoading: boolean;
  error: string | null;
  startPlan: (planData: LearningPlanProgress) => Promise<boolean>;
  updatePlan: (
    planId: string,
    updates: Partial<LearningPlanProgress>
  ) => Promise<boolean>;
  getPlan: (planId: string) => Promise<LearningPlanProgress | null>;
  syncPlans: () => Promise<void>;
}

export function useLearningPlans(): UseLearningPlansReturn {
  const { user, isAuthenticated } = useFirebaseAuth();
  const [plans, setPlans] = useState<LearningPlanProgress[]>([]);
  const [currentPlan, setCurrentPlan] = useState<LearningPlanProgress | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load plans from user context on mount
  useEffect(() => {
    // Note: learningPlans is not part of the simplified Firebase user type
    // This will be loaded from Firestore separately
  }, [isAuthenticated, user]);

  const startPlan = useCallback(
    async (planData: LearningPlanProgress): Promise<boolean> => {
      if (!isAuthenticated) {
        setError('User not authenticated');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/user/learning-plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(planData),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to start learning plan');
        }

        // Update local state
        setPlans(prev => [...prev, planData]);
        setCurrentPlan(planData);

        return true;
      } catch (error) {
        console.error('Error starting learning plan:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to start learning plan'
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated]
  );

  const updatePlan = useCallback(
    async (
      planId: string,
      updates: Partial<LearningPlanProgress>
    ): Promise<boolean> => {
      if (!isAuthenticated) {
        setError('User not authenticated');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/user/learning-plans?planId=${planId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
            credentials: 'include',
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update learning plan');
        }

        // Update local state
        setPlans(prev =>
          prev.map(plan =>
            plan.planId === planId ? { ...plan, ...updates } : plan
          )
        );

        if (currentPlan?.planId === planId) {
          setCurrentPlan(prev => (prev ? { ...prev, ...updates } : null));
        }

        return true;
      } catch (error) {
        console.error('Error updating learning plan:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to update learning plan'
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, currentPlan?.planId]
  );

  const getPlan = useCallback(
    async (planId: string): Promise<LearningPlanProgress | null> => {
      if (!isAuthenticated) {
        setError('User not authenticated');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/user/learning-plans?planId=${planId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch learning plan');
        }

        const result = await response.json();

        if (result.success && result.plan) {
          return result.plan;
        }
        return null;
      } catch (error) {
        console.error('Error getting learning plan:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to get learning plan'
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated]
  );

  const syncPlans = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/learning-plans', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch learning plans');
      }

      const result = await response.json();

      if (result.success && result.plans) {
        setPlans(result.plans);
        // Find active plan
        const activePlan = result.plans.find(
          (plan: LearningPlanProgress) => plan.status === 'active'
        );
        setCurrentPlan(activePlan || null);
      }
    } catch (error) {
      console.error('Error syncing learning plans:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to sync learning plans'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    plans,
    currentPlan,
    isLoading,
    error,
    startPlan,
    updatePlan,
    getPlan,
    syncPlans,
  };
}
