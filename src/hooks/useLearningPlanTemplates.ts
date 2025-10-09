import { useState, useEffect, useCallback } from 'react';
import { LearningPlanTemplate } from '@/lib/guided-learning-service';

interface ApiPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  topics: string[];
  questions: string[];
  createdAt:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | string;
  updatedAt:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | string;
}

interface ApiResponse {
  success: boolean;
  plans: ApiPlan[];
  error?: string;
}

interface UseLearningPlanTemplatesReturn {
  templates: LearningPlanTemplate[];
  isLoading: boolean;
  error: string | null;
  refreshTemplates: () => Promise<void>;
  getTemplate: (templateId: string) => LearningPlanTemplate | null;
}

export function useLearningPlanTemplates(): UseLearningPlanTemplatesReturn {
  console.log('🔄 Hook: useLearningPlanTemplates called');
  const [templates, setTemplates] = useState<LearningPlanTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    console.log('🔄 Hook: Starting to load templates...');
    setIsLoading(true);
    setError(null);

    try {
      // Try the proper guided learning plans API endpoint
      console.log('🔍 Hook: Calling API endpoint /api/guided-learning/plans');
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.WEB_URL ||
            process.env.NEXT_PUBLIC_WEB_URL ||
            (() => {
              throw new Error(
                'WEB_URL or NEXT_PUBLIC_WEB_URL environment variable must be set'
              );
            })();
      const response = await fetch(`${baseUrl}/api/guided-learning/plans`);
      const apiData = await response.json();

      if (apiData.success && apiData.plans && apiData.plans.length > 0) {
        console.log(
          '✅ Hook: Successfully loaded plans from API:',
          apiData.plans.length
        );

        // Convert API data to our format with safe defaults
        const formattedTemplates: LearningPlanTemplate[] = apiData.plans.map(
          (plan: ApiPlan) => {
            // Handle Firestore timestamp format
            const parseFirestoreTimestamp = (
              timestamp: ApiPlan['createdAt']
            ) => {
              if (!timestamp) return new Date();
              if (typeof timestamp === 'string') {
                return new Date(timestamp);
              }
              if (typeof timestamp === 'object' && timestamp.seconds) {
                return new Date(timestamp.seconds * 1000);
              }
              if (timestamp.toDate && typeof timestamp.toDate === 'function') {
                return timestamp.toDate();
              }
              return new Date(timestamp);
            };

            // Calculate total questions from sections
            const sections = plan.sections || [];
            const totalQuestions = sections.reduce(
              (total: number, section: { questions: string[] }) => {
                return (
                  total + (section.questions ? section.questions.length : 0)
                );
              },
              0
            );

            // Calculate daily questions based on total questions and duration
            const duration = plan.duration || 1;
            const dailyQuestions =
              totalQuestions > 0 ? Math.ceil(totalQuestions / duration) : 0;

            return {
              id: plan.id,
              name: plan.name || `${plan.duration} Day Plan`,
              duration: duration,
              description:
                plan.description ||
                `${plan.duration}-day intensive preparation plan`,
              difficulty: plan.difficulty || 'Intermediate',
              totalQuestions: totalQuestions || plan.totalQuestions || 100,
              dailyQuestions:
                dailyQuestions ||
                plan.dailyQuestions ||
                Math.ceil((plan.totalQuestions || 100) / duration),
              sections: sections.map((section: { questions: string[] }) => ({
                id: section.id,
                name: section.name,
                questions: section.questions || [],
                weight: section.weight || 0,
              })),
              features: plan.features || [
                'Structured learning path',
                'Progress tracking',
                'Curated questions',
              ],
              estimatedTime:
                plan.estimatedTime ||
                `${Math.ceil(duration * 2)}-${Math.ceil(duration * 3)} hours`,
              isRecommended:
                plan.isRecommended || duration === 3 || duration === 7,
              isActive: plan.isActive !== false,
              createdAt: parseFirestoreTimestamp(plan.createdAt),
              updatedAt: parseFirestoreTimestamp(plan.updatedAt),
            };
          }
        );

        setTemplates(formattedTemplates);
      } else {
        console.log('⚠️ Hook: API failed, using mock data');
        // Fallback to mock data
        const mockTemplates: LearningPlanTemplate[] = [
          {
            id: '1-day-plan',
            name: '1 Day Plan',
            duration: 1,
            description: "Intensive preparation for tomorrow's interview",
            difficulty: 'Beginner',
            totalQuestions: 100,
            dailyQuestions: 100,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: new Array(40).fill(null).map((_, i) => `q${i + 1}`),
                weight: 40,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: new Array(40).fill(null).map((_, i) => `q${i + 41}`),
                weight: 40,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: new Array(20).fill(null).map((_, i) => `q${i + 81}`),
                weight: 20,
                order: 3,
              },
            ],
            features: [
              'Quick review',
              'Essential concepts',
              'Common questions',
            ],
            estimatedTime: '2-3 hours',
            isRecommended: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2-day-plan',
            name: '2 Day Plan',
            duration: 2,
            description: 'Perfect for weekend preparation',
            difficulty: 'Beginner',
            totalQuestions: 150,
            dailyQuestions: 75,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: new Array(60).fill(null).map((_, i) => `q${i + 1}`),
                weight: 40,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: new Array(60).fill(null).map((_, i) => `q${i + 61}`),
                weight: 40,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: new Array(30)
                  .fill(null)
                  .map((_, i) => `q${i + 121}`),
                weight: 20,
                order: 3,
              },
            ],
            features: [
              'Balanced coverage',
              'Practice sessions',
              'Progress tracking',
            ],
            estimatedTime: '3-4 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '3-day-plan',
            name: '3 Day Plan',
            duration: 3,
            description: 'Comprehensive 3-day preparation',
            difficulty: 'Intermediate',
            totalQuestions: 200,
            dailyQuestions: 67,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: new Array(40).fill(null).map((_, i) => `q${i + 1}`),
                weight: 20,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: new Array(80).fill(null).map((_, i) => `q${i + 41}`),
                weight: 40,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: new Array(40)
                  .fill(null)
                  .map((_, i) => `q${i + 121}`),
                weight: 20,
                order: 3,
              },
              {
                id: 'typescript',
                name: 'TypeScript',
                category: 'frontend',
                questions: new Array(40)
                  .fill(null)
                  .map((_, i) => `q${i + 161}`),
                weight: 20,
                order: 4,
              },
            ],
            features: [
              'Extended coverage',
              'Daily milestones',
              'TypeScript basics',
            ],
            estimatedTime: '4-5 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '4-day-plan',
            name: '4 Day Plan',
            duration: 4,
            description: '4-day intensive preparation plan',
            difficulty: 'Intermediate',
            totalQuestions: 250,
            dailyQuestions: 63,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: [],
                weight: 25,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: [],
                weight: 35,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: [],
                weight: 25,
                order: 3,
              },
              {
                id: 'general',
                name: 'General',
                category: 'general',
                questions: [],
                weight: 15,
                order: 4,
              },
            ],
            features: [
              'Structured learning path',
              'Progress tracking',
              'Curated questions',
            ],
            estimatedTime: '6-8 hours',
            isRecommended: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '5-day-plan',
            name: '5 Day Plan',
            duration: 5,
            description: '5-day intensive preparation plan',
            difficulty: 'Intermediate',
            totalQuestions: 300,
            dailyQuestions: 60,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: [],
                weight: 25,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: [],
                weight: 35,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: [],
                weight: 25,
                order: 3,
              },
              {
                id: 'general',
                name: 'General',
                category: 'general',
                questions: [],
                weight: 15,
                order: 4,
              },
            ],
            features: [
              'Structured learning path',
              'Progress tracking',
              'Curated questions',
            ],
            estimatedTime: '8-10 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '6-day-plan',
            name: '6 Day Plan',
            duration: 6,
            description: '6-day intensive preparation plan',
            difficulty: 'Advanced',
            totalQuestions: 350,
            dailyQuestions: 58,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: [],
                weight: 25,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: [],
                weight: 35,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: [],
                weight: 25,
                order: 3,
              },
              {
                id: 'general',
                name: 'General',
                category: 'general',
                questions: [],
                weight: 15,
                order: 4,
              },
            ],
            features: [
              'Structured learning path',
              'Progress tracking',
              'Curated questions',
            ],
            estimatedTime: '10-12 hours',
            isRecommended: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '7-day-plan',
            name: '7 Day Plan',
            duration: 7,
            description: 'Complete week-long preparation',
            difficulty: 'Advanced',
            totalQuestions: 400,
            dailyQuestions: 57,
            sections: [
              {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                questions: [],
                weight: 20,
                order: 1,
              },
              {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                questions: [],
                weight: 40,
                order: 2,
              },
              {
                id: 'react',
                name: 'React',
                category: 'frontend',
                questions: [],
                weight: 20,
                order: 3,
              },
              {
                id: 'typescript',
                name: 'TypeScript',
                category: 'frontend',
                questions: [],
                weight: 20,
                order: 4,
              },
            ],
            features: [
              'Complete coverage',
              'Daily milestones',
              'Master-level prep',
            ],
            estimatedTime: '12-14 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setTemplates(mockTemplates);
      }
    } catch (error) {
      console.error('❌ Hook: Error loading learning plan templates:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load learning plan templates'
      );

      // Fallback to mock data on error
      const mockTemplates: LearningPlanTemplate[] = [
        {
          id: '1-day-plan',
          name: '1 Day Plan',
          duration: 1,
          description: "Intensive preparation for tomorrow's interview",
          difficulty: 'Beginner',
          totalQuestions: 100,
          dailyQuestions: 100,
          sections: [
            {
              id: 'html-css',
              name: 'HTML & CSS',
              category: 'frontend',
              questions: [],
              weight: 40,
              order: 1,
            },
            {
              id: 'javascript',
              name: 'JavaScript',
              category: 'frontend',
              questions: [],
              weight: 40,
              order: 2,
            },
            {
              id: 'react',
              name: 'React',
              category: 'frontend',
              questions: [],
              weight: 20,
              order: 3,
            },
          ],
          features: ['Quick review', 'Essential concepts', 'Common questions'],
          estimatedTime: '2-3 hours',
          isRecommended: false,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setTemplates(mockTemplates);
    } finally {
      console.log('🏁 Hook: Finished loading templates');
      setIsLoading(false);
    }
  }, []);

  const refreshTemplates = useCallback(async () => {
    await loadTemplates();
  }, [loadTemplates]);

  const getTemplate = useCallback(
    (templateId: string): LearningPlanTemplate | null => {
      return templates.find(template => template.id === templateId) || null;
    },
    [templates]
  );

  // Load templates on mount
  useEffect(() => {
    console.log('🔄 Hook: useEffect triggered, calling loadTemplates');
    loadTemplates();
  }, []); // Remove loadTemplates dependency to avoid infinite loop

  return {
    templates,
    isLoading,
    error,
    refreshTemplates,
    getTemplate,
  };
}
