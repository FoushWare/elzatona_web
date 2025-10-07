'use client';

import { useState, useCallback, useRef } from 'react';

interface LearningPlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: string;
  totalQuestions: number;
  dailyQuestions: number;
  sections: Array<{
    id: string;
    name: string;
    questions: any[];
    weight: number;
  }>;
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UseLearningPlanTemplatesReturn {
  templates: LearningPlanTemplate[];
  isLoading: boolean;
  error: string | null;
  refreshTemplates: () => Promise<void>;
  getTemplate: (templateId: string) => LearningPlanTemplate | null;
}

export function useLearningPlanTemplatesDirect(): UseLearningPlanTemplatesReturn {
  console.log('🔄 DirectHook: useLearningPlanTemplatesDirect called');
  const [templates, setTemplates] = useState<LearningPlanTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(false);

  const loadTemplates = useCallback(async () => {
    console.log('🔄 DirectHook: Starting to load templates...');
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔍 DirectHook: Fetching from /api/test-firebase');
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
      const response = await fetch(`${baseUrl}/api/test-firebase`);
      const apiData = await response.json();

      if (
        apiData.success &&
        apiData.templates &&
        apiData.templates.length > 0
      ) {
        console.log(
          '✅ DirectHook: Successfully loaded templates from API:',
          apiData.templates.length
        );
        const formattedTemplates: LearningPlanTemplate[] =
          apiData.templates.map((template: any) => ({
            id: template.id,
            name: template.name || `${template.duration} Day Plan`,
            duration: template.duration || 1,
            description:
              template.description ||
              `${template.duration}-day intensive preparation plan`,
            difficulty: template.difficulty || 'Intermediate',
            totalQuestions: template.totalQuestions || 100,
            dailyQuestions:
              template.dailyQuestions ||
              Math.ceil(
                (template.totalQuestions || 100) / (template.duration || 1)
              ),
            sections: template.sections || [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 25 },
              {
                id: 'javascript',
                name: 'JavaScript',
                questions: [],
                weight: 35,
              },
              { id: 'react', name: 'React', questions: [], weight: 25 },
              { id: 'general', name: 'General', questions: [], weight: 15 },
            ],
            features: template.features || [
              'Structured learning path',
              'Progress tracking',
              'Curated questions',
            ],
            estimatedTime:
              template.estimatedTime ||
              `${Math.ceil((template.duration || 1) * 2)}-${Math.ceil((template.duration || 1) * 3)} hours`,
            isRecommended:
              template.isRecommended ||
              template.duration === 3 ||
              template.duration === 7,
            isActive: template.isActive !== false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
        setTemplates(formattedTemplates);
      } else {
        console.log(
          '⚠️ DirectHook: API failed or returned no data, using mock data'
        );
        const mockTemplates: LearningPlanTemplate[] = [
          {
            id: 'mock-1-day',
            name: 'Mock 1 Day Plan',
            duration: 1,
            description: 'A simple mock plan for testing.',
            difficulty: 'Beginner',
            totalQuestions: 50,
            dailyQuestions: 50,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
              {
                id: 'javascript',
                name: 'JavaScript',
                questions: [],
                weight: 40,
              },
              { id: 'react', name: 'React', questions: [], weight: 20 },
            ],
            features: [
              'Quick review',
              'Essential concepts',
              'Common questions',
            ],
            estimatedTime: '1-2 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setTemplates(mockTemplates);
      }
    } catch (err) {
      console.error('❌ DirectHook: Error loading templates:', err);
      setError(err instanceof Error ? err.message : 'Failed to load templates');
      const mockTemplates: LearningPlanTemplate[] = [
        {
          id: 'mock-error-fallback',
          name: 'Mock Error Fallback Plan',
          duration: 1,
          description: 'Fallback plan due to error.',
          difficulty: 'Beginner',
          totalQuestions: 10,
          dailyQuestions: 10,
          sections: [
            { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 50 },
            { id: 'javascript', name: 'JavaScript', questions: [], weight: 50 },
          ],
          features: ['Basic concepts'],
          estimatedTime: '30 mins',
          isRecommended: false,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setTemplates(mockTemplates);
    } finally {
      console.log('🏁 DirectHook: Finished loading templates');
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

  // Initialize templates on first render only
  // This bypasses useEffect which seems to have hydration issues
  if (!hasLoaded.current && templates.length === 0 && isLoading && !error) {
    console.log('🔄 DirectHook: Calling loadTemplates immediately');
    hasLoaded.current = true;
    // Use setTimeout to avoid calling during render
    setTimeout(() => {
      loadTemplates();
    }, 0);
  }

  return {
    templates,
    isLoading,
    error,
    refreshTemplates,
    getTemplate,
  };
}
