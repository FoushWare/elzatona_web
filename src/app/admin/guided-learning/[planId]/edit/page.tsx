'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  ArrowLeft,
  Save,
  Eye,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Settings,
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
  type: 'single' | 'multiple' | 'text' | 'code' | 'open-ended';
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
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterLearningPath, setFilterLearningPath] = useState('all');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

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
    const mockPlan: LearningPlanTemplate = {
      id: planId,
      name: '3 Day Comprehensive Plan',
      duration: 3,
      description: 'Balanced preparation covering all major topics',
      difficulty: 'Intermediate',
      totalQuestions: 150,
      dailyQuestions: 50,
      sections: [
        {
          id: 'html-css',
          name: 'HTML & CSS',
          category: 'html',
          questions: ['q1', 'q2'],
          weight: 20,
          order: 1,
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          category: 'javascript',
          questions: ['q3', 'q4', 'q5'],
          weight: 40,
          order: 2,
        },
        {
          id: 'react',
          name: 'React',
          category: 'react',
          questions: ['q6', 'q7'],
          weight: 20,
          order: 3,
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'typescript',
          questions: ['q8', 'q9'],
          weight: 20,
          order: 4,
        },
      ],
      features: ['Balanced coverage', 'Daily milestones', 'TypeScript basics'],
      estimatedTime: '4-5 hours',
      isRecommended: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockQuestions: Question[] = [
      {
        id: 'q1',
        title: 'What is HTML5 semantic markup?',
        content: 'Explain the purpose and benefits of HTML5 semantic elements.',
        type: 'text',
        category: 'html',
        difficulty: 'easy',
        tags: ['html5', 'semantic', 'accessibility'],
        isActive: true,
      },
      {
        id: 'q2',
        title: 'CSS Flexbox vs Grid',
        content: 'Compare CSS Flexbox and Grid layout systems.',
        type: 'text',
        category: 'css',
        difficulty: 'medium',
        tags: ['css', 'flexbox', 'grid', 'layout'],
        isActive: true,
      },
      {
        id: 'q3',
        title: 'JavaScript Hoisting',
        content: 'Explain JavaScript hoisting with examples.',
        type: 'code',
        category: 'javascript',
        difficulty: 'medium',
        tags: ['javascript', 'hoisting', 'scope'],
        isActive: true,
      },
      {
        id: 'q4',
        title: 'Closures in JavaScript',
        content: 'What are closures and how do they work?',
        type: 'text',
        category: 'javascript',
        difficulty: 'hard',
        tags: ['javascript', 'closures', 'scope'],
        isActive: true,
      },
      {
        id: 'q5',
        title: 'Promise vs Async/Await',
        content: 'Compare Promise and async/await patterns.',
        type: 'code',
        category: 'javascript',
        difficulty: 'medium',
        tags: ['javascript', 'promises', 'async'],
        isActive: true,
      },
      {
        id: 'q6',
        title: 'React Hooks Rules',
        content: 'What are the rules of React hooks?',
        type: 'text',
        category: 'react',
        difficulty: 'easy',
        tags: ['react', 'hooks', 'rules'],
        isActive: true,
      },
      {
        id: 'q7',
        title: 'React Performance Optimization',
        content: 'How to optimize React application performance?',
        type: 'text',
        category: 'react',
        difficulty: 'hard',
        tags: ['react', 'performance', 'optimization'],
        isActive: true,
      },
      {
        id: 'q8',
        title: 'TypeScript Generics',
        content: 'Explain TypeScript generics with examples.',
        type: 'code',
        category: 'typescript',
        difficulty: 'hard',
        tags: ['typescript', 'generics', 'types'],
        isActive: true,
      },
      {
        id: 'q9',
        title: 'TypeScript Interfaces vs Types',
        content: 'Compare TypeScript interfaces and type aliases.',
        type: 'text',
        category: 'typescript',
        difficulty: 'medium',
        tags: ['typescript', 'interfaces', 'types'],
        isActive: true,
      },
    ];

    setPlan(mockPlan);
    setLoading(false);

    // Fetch questions from API
    fetchQuestions();
  }, [planId]);

  // Filter questions based on search and filters
  useEffect(() => {
    let filtered = allQuestions;

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

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(
        question => question.category === filterCategory
      );
    }

    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(
        question => question.difficulty === filterDifficulty
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
    searchTerm,
    filterCategory,
    filterDifficulty,
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Sections */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Plan Sections</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.sections.map(section => (
                  <Card
                    key={section.id}
                    className={`cursor-pointer transition-colors ${
                      selectedSection === section.id
                        ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20'
                        : ''
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {section.name}
                          </h3>
                          <Badge
                            className={`text-xs ${getCategoryColor(section.category)}`}
                          >
                            {QUESTION_CATEGORIES.find(
                              cat => cat.id === section.category
                            )?.name || section.category}
                          </Badge>
                        </div>
                        <Badge variant="secondary">
                          {section.questions.length} questions
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Weight: {section.weight}%
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Order: {section.order}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Questions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Available Questions</span>
                  </div>
                  <Dialog
                    open={showQuestionDialog}
                    onOpenChange={setShowQuestionDialog}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Question</DialogTitle>
                      </DialogHeader>
                      <p>Question creation form would go here...</p>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="mb-4 flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select
                    value={filterCategory}
                    onValueChange={setFilterCategory}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {QUESTION_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterDifficulty}
                    onValueChange={setFilterDifficulty}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Questions List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {questions.map(question => (
                    <Card
                      key={question.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                              {question.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {question.content}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge
                                className={getCategoryColor(question.category)}
                              >
                                {QUESTION_CATEGORIES.find(
                                  cat => cat.id === question.category
                                )?.name || question.category}
                              </Badge>
                              <Badge
                                className={getDifficultyColor(
                                  question.difficulty
                                )}
                              >
                                {question.difficulty}
                              </Badge>
                              {question.tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {question.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{question.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col space-y-2">
                            {selectedSection && (
                              <Button
                                size="sm"
                                variant={
                                  isQuestionInSection(
                                    question.id,
                                    selectedSection
                                  )
                                    ? 'destructive'
                                    : 'default'
                                }
                                onClick={() => {
                                  if (
                                    isQuestionInSection(
                                      question.id,
                                      selectedSection
                                    )
                                  ) {
                                    removeQuestionFromSection(
                                      question.id,
                                      selectedSection
                                    );
                                  } else {
                                    addQuestionToSection(
                                      question.id,
                                      selectedSection
                                    );
                                  }
                                }}
                              >
                                {isQuestionInSection(
                                  question.id,
                                  selectedSection
                                ) ? (
                                  <>
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Remove
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Add
                                  </>
                                )}
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredQuestions.length === 0 && (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your search filters or create a new
                      question.
                    </p>
                    <Button onClick={() => setShowQuestionDialog(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
