'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionQuestionsManager } from '@/components/SectionQuestionsManager';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  ArrowLeft,
  Save,
  Eye,
  Target,
  Clock,
  XCircle,
  AlertCircle,
  BookOpen,
  Settings,
  Filter,
  Menu,
  X,
} from 'lucide-react';

interface LearningPlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LearningSection {
  id: string;
  name: string;
  category: string;
  questions: string[]; // Question IDs
  weight: number;
  order: number;
  description?: string;
}

interface Question {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'text' | 'code' | 'open-ended' | 'yes-no';
  options?: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  category: string;
  subcategory?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  learningPath: string;
  points: number;
  timeLimit?: number;
  hints?: QuestionHint[];
  isActive: boolean;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  order?: number;
}

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionHint {
  id: string;
  title: string;
  description?: string;
  url: string;
  type:
    | 'article'
    | 'documentation'
    | 'tutorial'
    | 'video'
    | 'example'
    | 'reference';
  category?: string;
  priority?: number;
}

interface QuestionCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: 'html',
    name: 'HTML',
    description: 'HTML fundamentals and best practices',
    color: 'bg-orange-100 text-orange-800',
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'CSS styling, layout, and animations',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript fundamentals and ES6+',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript and type systems',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'react',
    name: 'React',
    description: 'React components, hooks, and patterns',
    color: 'bg-cyan-100 text-cyan-800',
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Web performance optimization',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Algorithm and problem-solving skills',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'patterns',
    name: 'Design Patterns',
    description: 'Frontend design patterns and architecture',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Frontend system design and architecture',
    color: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Web security best practices',
    color: 'bg-red-100 text-red-800',
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Frontend testing strategies',
    color: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Web accessibility standards',
    color: 'bg-teal-100 text-teal-800',
  },
];

export default function PlanEditorPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.planId as string;

  const [plan, setPlan] = useState<LearningPlanTemplate | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLearningPath] = useState('all');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [showSectionQuestionsManager, setShowSectionQuestionsManager] =
    useState(false);
  const [showAddQuestionsDialog, setShowAddQuestionsDialog] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [showMobileSections, setShowMobileSections] = useState(false);

  // Fetch questions from the API
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(
        '/api/questions/unified?isActive=true&isComplete=true'
      );
      if (response.ok) {
        const data = await response.json();
        setAllQuestions(data.data || []);
        setQuestions(data.data || []);
      } else {
        console.error('Failed to fetch questions');
        // Fallback to mock data
        loadMockQuestions();
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback to mock data
      loadMockQuestions();
    }
  }, []);

  // Mock data fallback
  const loadMockQuestions = () => {
    const mockData: Question[] = [
      {
        id: 'q1',
        title: 'What is HTML5 semantic markup?',
        content: 'Explain the purpose and benefits of HTML5 semantic elements.',
        type: 'text',
        options: [],
        correctAnswers: [],
        explanation:
          'HTML5 semantic elements provide meaning to the structure of web pages.',
        category: 'html',
        difficulty: 'easy',
        tags: ['html5', 'semantic', 'accessibility'],
        learningPath: 'frontend-basics',
        points: 10,
        isActive: true,
        isComplete: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'q2',
        title: 'CSS Flexbox vs Grid',
        content: 'Compare CSS Flexbox and Grid layout systems.',
        type: 'text',
        options: [],
        correctAnswers: [],
        explanation: 'Flexbox is for 1D layouts while Grid is for 2D layouts.',
        category: 'css',
        difficulty: 'medium',
        tags: ['css', 'flexbox', 'grid', 'layout'],
        learningPath: 'frontend-basics',
        points: 15,
        isActive: true,
        isComplete: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'q3',
        title: 'JavaScript Hoisting',
        content: 'Explain JavaScript hoisting with examples.',
        type: 'code',
        options: [
          { id: 'a', text: 'Variables are moved to the top', isCorrect: true },
          {
            id: 'b',
            text: 'Functions can be called before declaration',
            isCorrect: true,
          },
          { id: 'c', text: 'Only let and const are hoisted', isCorrect: false },
          {
            id: 'd',
            text: 'Hoisting only works in strict mode',
            isCorrect: false,
          },
        ],
        correctAnswers: ['a', 'b'],
        explanation:
          'Hoisting moves variable and function declarations to the top of their scope.',
        category: 'javascript',
        difficulty: 'medium',
        tags: ['javascript', 'hoisting', 'scope'],
        learningPath: 'javascript-deep-dive',
        points: 20,
        isActive: true,
        isComplete: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setAllQuestions(mockData);
    setQuestions(mockData);
  };

  // Load data on component mount
  useEffect(() => {
    const loadPlanData = async () => {
      try {
        // Fetch comprehensive sections from API
        const response = await fetch('/api/admin/sections');
        const sectionsData = await response.json();

        if (!sectionsData.success || !sectionsData.data) {
          console.error('Failed to fetch sections:', sectionsData);
          return;
        }

        const comprehensiveSections = sectionsData.data;

        const mockPlan: LearningPlanTemplate = {
          id: planId,
          name:
            planId === '1-day-plan'
              ? '1-Day Frontend Quick Start'
              : planId === '2-day-plan'
                ? '2-Day Frontend Fundamentals'
                : planId === '3-day-plan'
                  ? '3-Day React Development'
                  : planId === '4-day-plan'
                    ? '4-Day Vue.js Mastery'
                    : planId === '5-day-plan'
                      ? '5-Day Angular Development'
                      : planId === '6-day-plan'
                        ? '6-Day Node.js Backend'
                        : planId === '7-day-plan'
                          ? '7-Day Full-Stack Mastery'
                          : 'Learning Plan',
          duration:
            planId === '1-day-plan'
              ? 1
              : planId === '2-day-plan'
                ? 2
                : planId === '3-day-plan'
                  ? 3
                  : planId === '4-day-plan'
                    ? 4
                    : planId === '5-day-plan'
                      ? 5
                      : planId === '6-day-plan'
                        ? 6
                        : planId === '7-day-plan'
                          ? 7
                          : 1,
          description:
            planId === '1-day-plan'
              ? 'Quick introduction to HTML, CSS, and JavaScript basics'
              : planId === '2-day-plan'
                ? 'Complete guide to HTML, CSS, and JavaScript fundamentals'
                : planId === '3-day-plan'
                  ? 'Master React.js from basics to intermediate concepts'
                  : planId === '4-day-plan'
                    ? 'Complete Vue.js development course with composition API'
                    : planId === '5-day-plan'
                      ? 'Comprehensive Angular framework development course'
                      : planId === '6-day-plan'
                        ? 'Complete Node.js backend development with Express and databases'
                        : planId === '7-day-plan'
                          ? 'Complete full-stack development with modern technologies'
                          : 'Learning plan description',
          difficulty:
            planId === '1-day-plan' || planId === '2-day-plan'
              ? 'Beginner'
              : planId === '6-day-plan' || planId === '7-day-plan'
                ? 'Advanced'
                : 'Intermediate',
          totalQuestions: comprehensiveSections.length * 3,
          dailyQuestions: Math.max(
            15,
            Math.floor((comprehensiveSections.length * 3) / 7)
          ),
          sections: comprehensiveSections.map((section: any, index: number) => ({
            id: section.id,
            name: section.name,
            category: section.category || 'foundation',
            questions: Array.from(
              { length: 3 },
              (_, i) => `q${index * 3 + i + 1}`
            ),
            weight: Math.floor(100 / comprehensiveSections.length),
            order: index + 1,
          })),
          features:
            planId === '1-day-plan'
              ? ['Quick preparation', 'Essential topics', '2-3 hours']
              : planId === '2-day-plan'
                ? ['Fundamental concepts', 'Practical examples', '4-5 hours']
                : planId === '3-day-plan'
                  ? ['React fundamentals', 'Modern patterns', '6-7 hours']
                  : planId === '4-day-plan'
                    ? ['Vue 3 mastery', 'Composition API', '8-9 hours']
                    : planId === '5-day-plan'
                      ? [
                          'Angular framework',
                          'Enterprise patterns',
                          '10-12 hours',
                        ]
                      : planId === '6-day-plan'
                        ? [
                            'Backend mastery',
                            'Database integration',
                            '12-15 hours',
                          ]
                        : planId === '7-day-plan'
                          ? [
                              'Full-stack mastery',
                              'Production-ready',
                              '15-18 hours',
                            ]
                          : [
                              'Balanced coverage',
                              'Daily milestones',
                              'TypeScript basics',
                            ],
          estimatedTime:
            planId === '1-day-plan'
              ? '2-3 hours'
              : planId === '2-day-plan'
                ? '4-5 hours'
                : planId === '3-day-plan'
                  ? '6-7 hours'
                  : planId === '4-day-plan'
                    ? '8-9 hours'
                    : planId === '5-day-plan'
                      ? '10-12 hours'
                      : planId === '6-day-plan'
                        ? '12-15 hours'
                        : planId === '7-day-plan'
                          ? '15-18 hours'
                          : '4-5 hours',
          isRecommended: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Mock questions removed for linting

        setPlan(mockPlan);
      } catch (error) {
        console.error('Error loading plan data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlanData();
    fetchQuestions();
  }, [planId, fetchQuestions]);

  // Handle adding questions from existing questions
  // const handleAddFromExisting = (sectionId: string) => {
  //   setEditingSectionId(sectionId);
  //   setShowSectionQuestionsManager(true);
  // };

  const handleSectionQuestionsChange = (questionIds: string[]) => {
    if (!plan || !editingSectionId) return;

    setPlan(prevPlan => {
      if (!prevPlan) return prevPlan;

      const updatedSections = prevPlan.sections.map(section =>
        section.id === editingSectionId
          ? { ...section, questions: questionIds }
          : section
      );

      return {
        ...prevPlan,
        sections: updatedSections,
        totalQuestions: updatedSections.reduce(
          (total, section) => total + section.questions.length,
          0
        ),
        dailyQuestions: Math.ceil(
          updatedSections.reduce(
            (total, section) => total + section.questions.length,
            0
          ) / prevPlan.duration
        ),
      };
    });
  };

  const handleCloseSectionQuestionsManager = () => {
    setShowSectionQuestionsManager(false);
    setEditingSectionId(null);
  };

  // Filter questions based on selected section and search/filters
  useEffect(() => {
    let filtered = allQuestions;

    // If a section is selected, show only questions assigned to that section
    if (selectedSection && plan) {
      const section = plan.sections.find(s => s.id === selectedSection);
      if (section) {
        filtered = filtered.filter(question =>
          section.questions.includes(question.id)
        );
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        question =>
          question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }


    // Apply learning path filter
    if (filterLearningPath !== 'all') {
      filtered = filtered.filter(
        question => question.learningPath === filterLearningPath
      );
    }

    setQuestions(filtered);
  }, [
    allQuestions,
    selectedSection,
    plan,
    searchTerm,
    filterLearningPath,
  ]);

  // Questions are now filtered in useEffect, so we use the filtered questions directly

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = QUESTION_CATEGORIES.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800';
  };

  const addQuestionToSection = (questionId: string, sectionId: string) => {
    if (!plan) return;

    setPlan(prev => {
      if (!prev) return null;
      return {
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId
            ? { ...section, questions: [...section.questions, questionId] }
            : section
        ),
      };
    });
  };

  const removeQuestionFromSection = (questionId: string, sectionId: string) => {
    if (!plan) return;

    setPlan(prev => {
      if (!prev) return null;
      return {
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId
            ? {
                ...section,
                questions: section.questions.filter(id => id !== questionId),
              }
            : section
        ),
      };
    });
  };

  const isQuestionInSection = (questionId: string, sectionId: string) => {
    if (!plan) return false;
    const section = plan.sections.find(s => s.id === sectionId);
    return section?.questions.includes(questionId) || false;
  };

  const savePlan = () => {
    // Here you would save the plan to your backend
    console.log('Saving plan:', plan);
    router.push('/admin/guided-learning');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading plan editor...
          </p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Plan Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The learning plan you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/admin/guided-learning')}>
            Back to Plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/guided-learning')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Edit Plan: {plan.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Configure sections and assign questions to each section
              </p>
            </div>
            <Button onClick={savePlan} className="bg-red-600 hover:bg-red-700">
              <Save className="w-4 h-4 mr-2" />
              Save Plan
            </Button>
          </div>

          {/* Plan Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Questions
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.sections.reduce(
                        (total, section) => total + section.questions.length,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Daily Questions
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.ceil(
                        plan.sections.reduce(
                          (total, section) => total + section.questions.length,
                          0
                        ) / plan.duration
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sections
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.sections.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Difficulty
                    </p>
                    <Badge
                      className={
                        plan.difficulty === 'Beginner'
                          ? 'bg-green-100 text-green-800'
                          : plan.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }
                    >
                      {plan.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="xl:hidden mb-4">
          <Button
            onClick={() => setShowMobileSections(!showMobileSections)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Menu className="w-4 h-4 mr-2" />
            {showMobileSections ? 'Hide' : 'Show'} Plan Sections
            <Badge variant="secondary" className="ml-2 text-xs">
              {plan.sections.length}
            </Badge>
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Sections */}
          <div
            className={`xl:col-span-1 order-2 xl:order-1 ${showMobileSections ? 'block' : 'hidden xl:block'}`}
          >
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-semibold">Plan Sections</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {plan.sections.length} sections
                    </Badge>
                    {/* Mobile Close Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMobileSections(false)}
                      className="xl:hidden p-1 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {plan.sections.map(section => (
                  <Card
                    key={section.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      selectedSection === section.id
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => {
                      setSelectedSection(section.id);
                      setShowMobileSections(false); // Close mobile menu when section is selected
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-2 truncate">
                            {section.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(section.category)}`}
                            >
                              {QUESTION_CATEGORIES.find(
                                cat => cat.id === section.category
                              )?.name || section.category}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {section.questions.length} questions
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Weight: {section.weight}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Settings className="w-3 h-3" />
                            Order: {section.order}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Questions */}
          <div className="xl:col-span-2 order-1 xl:order-2">
            {/* Mobile Section Selection Notice */}
            {!selectedSection && (
              <div className="xl:hidden mb-4">
                <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Select a section first
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                          Use the "Show Plan Sections" button above to select a
                          section and view its questions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex flex-col space-y-4">
                  {/* Title and Description */}
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="text-lg font-semibold">
                        Available Questions
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedSection
                          ? `Questions assigned to "${plan.sections.find(s => s.id === selectedSection)?.name}" section`
                          : 'Select a section from the left to view its assigned questions'}
                      </p>
                    </div>
                  </div>

                  {/* Add Questions Button - Better positioned */}
                  {selectedSection && (
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingSectionId(selectedSection);
                          setShowAddQuestionsDialog(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 shadow-sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Questions
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="mb-6 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search questions in this section..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    </div>
                  </div>
                </div>

                {/* Section Selection Notice */}
                {!selectedSection && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-2">
                        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                          Select a Section First
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Choose a section from the left panel to start adding
                          questions to it.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Questions List */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {questions.map(question => (
                    <Card
                      key={question.id}
                      className="hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-base leading-tight">
                              {question.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                              {question.content}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge
                                className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(question.category)}`}
                              >
                                {QUESTION_CATEGORIES.find(
                                  cat => cat.id === question.category
                                )?.name || question.category}
                              </Badge>
                              <Badge
                                className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                                  question.difficulty
                                )}`}
                              >
                                {question.difficulty}
                              </Badge>
                              {question.tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs font-medium px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {question.tags.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs font-medium px-2 py-1 rounded-full"
                                >
                                  +{question.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:ml-4">
                            {selectedSection ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  removeQuestionFromSection(
                                    question.id,
                                    selectedSection
                                  );
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Remove from Section
                              </Button>
                            ) : (
                              <div className="text-center py-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Select a section to add questions
                                </p>
                              </div>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {questions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Target className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      No questions found
                    </h3>
                    <div className="max-w-md mx-auto space-y-3">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedSection
                          ? `No questions are currently assigned to &quot;${plan.sections.find(s => s.id === selectedSection)?.name}&quot; section. Use the &quot;Add Questions&quot; button to add questions to this section.`
                          : 'Select a section from the left to view its assigned questions.'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchTerm('');
                          }}
                          className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
                        >
                          <Filter className="w-4 h-4 mr-2" />
                          Clear Filters
                        </Button>
                        {selectedSection && (
                          <Button
                            onClick={() => {
                              setEditingSectionId(selectedSection);
                              setShowAddQuestionsDialog(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Questions
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Section Questions Manager Modal */}
      {showSectionQuestionsManager && editingSectionId && plan && (
        <SectionQuestionsManager
          sectionId={editingSectionId}
          sectionName={
            plan.sections.find(s => s.id === editingSectionId)?.name || ''
          }
          currentQuestionIds={
            plan.sections.find(s => s.id === editingSectionId)?.questions || []
          }
          onQuestionsChange={handleSectionQuestionsChange}
          onClose={handleCloseSectionQuestionsManager}
          sectionCategory={
            plan.sections.find(s => s.id === editingSectionId)?.category
          }
        />
      )}

      {/* Add Questions Options Dialog */}
      {showAddQuestionsDialog && editingSectionId && plan && (
        <Dialog
          open={showAddQuestionsDialog}
          onOpenChange={setShowAddQuestionsDialog}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Add Questions to "
                {plan.sections.find(s => s.id === editingSectionId)?.name}"
              </DialogTitle>
              <DialogDescription>
                Choose how you want to add questions to this section.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Button
                onClick={() => {
                  setShowAddQuestionsDialog(false);
                  setShowQuestionDialog(true);
                }}
                className="w-full h-16 text-left justify-start bg-green-50 hover:bg-green-100 text-green-800 border-green-200 hover:border-green-300 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400 dark:border-green-800"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                    <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Add Questions</div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Create a new question
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => {
                  setShowAddQuestionsDialog(false);
                  setShowSectionQuestionsManager(true);
                }}
                className="w-full h-16 text-left justify-start bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200 hover:border-blue-300 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Add from Existing</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      Choose from existing questions
                    </div>
                  </div>
                </div>
              </Button>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddQuestionsDialog(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
