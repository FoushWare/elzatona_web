'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Trash2,
  Copy,
  Eye,
  Calendar,
  Clock,
  BookOpen,
  Target,
  XCircle,
  Edit,
  Users,
} from 'lucide-react';

// Enhanced Learning Plan Template Interface
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
  completionRate?: number;
  enrolledUsers?: number;
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

export default function GuidedLearningAdminPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<LearningPlanTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockPlans: LearningPlanTemplate[] = [
      {
        id: '1-day-plan',
        name: '1-Day Frontend Quick Start',
        duration: 1,
        description: 'Quick introduction to HTML, CSS, and JavaScript basics',
        difficulty: 'Beginner',
        totalQuestions: 15,
        dailyQuestions: 15,
        sections: [
          {
            id: 'html',
            name: 'HTML',
            category: 'html',
            questions: ['q1', 'q2', 'q3'],
            weight: 33,
            order: 1,
          },
          {
            id: 'css',
            name: 'CSS',
            category: 'css',
            questions: ['q4', 'q5', 'q6'],
            weight: 33,
            order: 2,
          },
          {
            id: 'js',
            name: 'JavaScript',
            category: 'javascript',
            questions: ['q7', 'q8', 'q9'],
            weight: 34,
            order: 3,
          },
        ],
        features: ['Quick preparation', 'Essential topics', '2-3 hours'],
        estimatedTime: '2-3 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 85,
        enrolledUsers: 120,
      },
      {
        id: '2-day-plan',
        name: '2-Day Frontend Fundamentals',
        duration: 2,
        description: 'Complete guide to HTML, CSS, and JavaScript fundamentals',
        difficulty: 'Beginner',
        totalQuestions: 30,
        dailyQuestions: 15,
        sections: [
          {
            id: 'html',
            name: 'HTML',
            category: 'html',
            questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
            weight: 33,
            order: 1,
          },
          {
            id: 'css',
            name: 'CSS',
            category: 'css',
            questions: ['q6', 'q7', 'q8', 'q9', 'q10'],
            weight: 33,
            order: 2,
          },
          {
            id: 'js',
            name: 'JavaScript',
            category: 'javascript',
            questions: ['q11', 'q12', 'q13', 'q14', 'q15'],
            weight: 34,
            order: 3,
          },
        ],
        features: ['Fundamental concepts', 'Practical examples', '4-5 hours'],
        estimatedTime: '4-5 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 72,
        enrolledUsers: 89,
      },
      {
        id: '3-day-plan',
        name: '3-Day React Development',
        duration: 3,
        description: 'Master React.js from basics to intermediate concepts',
        difficulty: 'Intermediate',
        totalQuestions: 45,
        dailyQuestions: 15,
        sections: [
          {
            id: 'components',
            name: 'Components',
            category: 'react',
            questions: ['q16', 'q17', 'q18', 'q19', 'q20'],
            weight: 33,
            order: 1,
          },
          {
            id: 'hooks',
            name: 'Hooks',
            category: 'react',
            questions: ['q21', 'q22', 'q23', 'q24', 'q25'],
            weight: 33,
            order: 2,
          },
          {
            id: 'state',
            name: 'State Management',
            category: 'react',
            questions: ['q26', 'q27', 'q28', 'q29', 'q30'],
            weight: 34,
            order: 3,
          },
        ],
        features: ['React fundamentals', 'Modern patterns', '6-7 hours'],
        estimatedTime: '6-7 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 68,
        enrolledUsers: 156,
      },
      {
        id: '4-day-plan',
        name: '4-Day Vue.js Mastery',
        duration: 4,
        description: 'Complete Vue.js development course with composition API',
        difficulty: 'Intermediate',
        totalQuestions: 60,
        dailyQuestions: 15,
        sections: [
          {
            id: 'basics',
            name: 'Vue Basics',
            category: 'vue',
            questions: ['q31', 'q32', 'q33', 'q34', 'q35'],
            weight: 25,
            order: 1,
          },
          {
            id: 'components',
            name: 'Components',
            category: 'vue',
            questions: ['q36', 'q37', 'q38', 'q39', 'q40'],
            weight: 25,
            order: 2,
          },
          {
            id: 'composition',
            name: 'Composition API',
            category: 'vue',
            questions: ['q41', 'q42', 'q43', 'q44', 'q45'],
            weight: 25,
            order: 3,
          },
          {
            id: 'routing',
            name: 'Vue Router',
            category: 'vue',
            questions: ['q46', 'q47', 'q48', 'q49', 'q50'],
            weight: 25,
            order: 4,
          },
        ],
        features: ['Vue 3 mastery', 'Composition API', '8-9 hours'],
        estimatedTime: '8-9 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 70,
        enrolledUsers: 78,
      },
      {
        id: '5-day-plan',
        name: '5-Day Angular Development',
        duration: 5,
        description: 'Comprehensive Angular framework development course',
        difficulty: 'Intermediate',
        totalQuestions: 75,
        dailyQuestions: 15,
        sections: [
          {
            id: 'basics',
            name: 'Angular Basics',
            category: 'angular',
            questions: ['q51', 'q52', 'q53', 'q54', 'q55'],
            weight: 20,
            order: 1,
          },
          {
            id: 'components',
            name: 'Components & Services',
            category: 'angular',
            questions: ['q56', 'q57', 'q58', 'q59', 'q60'],
            weight: 20,
            order: 2,
          },
          {
            id: 'routing',
            name: 'Routing',
            category: 'angular',
            questions: ['q61', 'q62', 'q63', 'q64', 'q65'],
            weight: 20,
            order: 3,
          },
          {
            id: 'forms',
            name: 'Forms & Validation',
            category: 'angular',
            questions: ['q66', 'q67', 'q68', 'q69', 'q70'],
            weight: 20,
            order: 4,
          },
          {
            id: 'http',
            name: 'HTTP & APIs',
            category: 'angular',
            questions: ['q71', 'q72', 'q73', 'q74', 'q75'],
            weight: 20,
            order: 5,
          },
        ],
        features: ['Angular framework', 'Enterprise patterns', '10-12 hours'],
        estimatedTime: '10-12 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 68,
        enrolledUsers: 92,
      },
      {
        id: '6-day-plan',
        name: '6-Day Node.js Backend',
        duration: 6,
        description:
          'Complete Node.js backend development with Express and databases',
        difficulty: 'Advanced',
        totalQuestions: 90,
        dailyQuestions: 15,
        sections: [
          {
            id: 'basics',
            name: 'Node.js Basics',
            category: 'nodejs',
            questions: ['q76', 'q77', 'q78', 'q79', 'q80'],
            weight: 17,
            order: 1,
          },
          {
            id: 'express',
            name: 'Express Framework',
            category: 'nodejs',
            questions: ['q81', 'q82', 'q83', 'q84', 'q85'],
            weight: 17,
            order: 2,
          },
          {
            id: 'database',
            name: 'Database Integration',
            category: 'nodejs',
            questions: ['q86', 'q87', 'q88', 'q89', 'q90'],
            weight: 17,
            order: 3,
          },
          {
            id: 'auth',
            name: 'Authentication',
            category: 'nodejs',
            questions: ['q91', 'q92', 'q93', 'q94', 'q95'],
            weight: 17,
            order: 4,
          },
          {
            id: 'api',
            name: 'RESTful APIs',
            category: 'nodejs',
            questions: ['q96', 'q97', 'q98', 'q99', 'q100'],
            weight: 16,
            order: 5,
          },
          {
            id: 'deployment',
            name: 'Deployment',
            category: 'nodejs',
            questions: ['q101', 'q102', 'q103', 'q104', 'q105'],
            weight: 16,
            order: 6,
          },
        ],
        features: ['Backend mastery', 'Database integration', '12-15 hours'],
        estimatedTime: '12-15 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 58,
        enrolledUsers: 134,
      },
      {
        id: '7-day-plan',
        name: '7-Day Full-Stack Mastery',
        duration: 7,
        description: 'Complete full-stack development with modern technologies',
        difficulty: 'Advanced',
        totalQuestions: 105,
        dailyQuestions: 15,
        sections: [
          {
            id: 'frontend',
            name: 'Frontend Development',
            category: 'javascript',
            questions: ['q106', 'q107', 'q108', 'q109', 'q110'],
            weight: 14,
            order: 1,
          },
          {
            id: 'backend',
            name: 'Backend Development',
            category: 'nodejs',
            questions: ['q111', 'q112', 'q113', 'q114', 'q115'],
            weight: 14,
            order: 2,
          },
          {
            id: 'database',
            name: 'Database Design',
            category: 'database',
            questions: ['q116', 'q117', 'q118', 'q119', 'q120'],
            weight: 14,
            order: 3,
          },
          {
            id: 'api',
            name: 'API Integration',
            category: 'api',
            questions: ['q121', 'q122', 'q123', 'q124', 'q125'],
            weight: 14,
            order: 4,
          },
          {
            id: 'security',
            name: 'Security',
            category: 'security',
            questions: ['q126', 'q127', 'q128', 'q129', 'q130'],
            weight: 14,
            order: 5,
          },
          {
            id: 'deployment',
            name: 'Deployment & DevOps',
            category: 'devops',
            questions: ['q131', 'q132', 'q133', 'q134', 'q135'],
            weight: 15,
            order: 6,
          },
          {
            id: 'testing',
            name: 'Testing',
            category: 'testing',
            questions: ['q136', 'q137', 'q138', 'q139', 'q140'],
            weight: 15,
            order: 7,
          },
        ],
        features: ['Full-stack mastery', 'Production-ready', '15-18 hours'],
        estimatedTime: '15-18 hours',
        isRecommended: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionRate: 45,
        enrolledUsers: 98,
      },
    ];
    setPlans(mockPlans);
    setLoading(false);
  }, []);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 'all' ||
      plan.difficulty.toLowerCase() === filterDifficulty;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && plan.isActive) ||
      (filterStatus === 'inactive' && !plan.isActive);

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = QUESTION_CATEGORIES.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading guided learning plans...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Guided Learning Plans
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Create and manage structured learning plans with daily progress
                tracking
              </p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Plan</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Learning Plan</DialogTitle>
                </DialogHeader>
                <PlanEditor
                  plan={null}
                  onSave={plan => {
                    setPlans(prev => [
                      ...prev,
                      {
                        ...plan,
                        id: Date.now().toString(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    ]);
                    setShowCreateDialog(false);
                  }}
                  onCancel={() => setShowCreateDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <Input
              placeholder="Search plans..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPlans.map(plan => (
            <Card
              key={plan.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getDifficultyColor(plan.difficulty)}>
                        {plan.difficulty}
                      </Badge>
                      <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {plan.isRecommended && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `/guided-practice/enhanced?plan=${plan.id}`,
                          '_blank'
                        )
                      }
                      title="View Plan"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/guided-learning/${plan.id}/edit`)
                      }
                      title="Edit Plan"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Copy plan functionality
                        const newPlan = {
                          ...plan,
                          id: `${plan.id}-copy-${Date.now()}`,
                        };
                        setPlans([...plans, newPlan]);
                      }}
                      title="Duplicate Plan"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${plan.name}"?`
                          )
                        ) {
                          setPlans(plans.filter(p => p.id !== plan.id));
                        }
                      }}
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {plan.description}
                </p>

                {/* Plan Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.duration} day{plan.duration > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.totalQuestions} questions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.estimatedTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.enrolledUsers || 0} enrolled
                    </span>
                  </div>
                </div>

                {/* Completion Rate */}
                {plan.completionRate && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Completion Rate
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {plan.completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plan.completionRate}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Sections */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Sections ({plan.sections.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.sections.slice(0, 3).map(section => (
                      <Badge
                        key={section.id}
                        className={`text-xs ${getCategoryColor(section.category)}`}
                      >
                        {section.name}
                      </Badge>
                    ))}
                    {plan.sections.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{plan.sections.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600 dark:text-gray-400"
                      >
                        • {feature}
                      </span>
                    ))}
                    {plan.features.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{plan.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No learning plans found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm ||
              filterDifficulty !== 'all' ||
              filterStatus !== 'all'
                ? 'Try adjusting your search filters'
                : 'Create your first learning plan to get started'}
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Plan Editor Component
interface PlanEditorProps {
  plan: LearningPlanTemplate | null;
  onSave: (plan: LearningPlanTemplate) => void;
  onCancel: () => void;
}

function PlanEditor({ plan, onSave, onCancel }: PlanEditorProps) {
  const [formData, setFormData] = useState({
    name: plan?.name || '',
    duration: plan?.duration || 1,
    description: plan?.description || '',
    difficulty: plan?.difficulty || 'Beginner',
    estimatedTime: plan?.estimatedTime || '',
    features: plan?.features || [''],
    sections: plan?.sections || [],
    isRecommended: plan?.isRecommended || false,
    isActive: plan?.isActive || true,
  });

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `section-${Date.now()}`,
          name: '',
          category: '',
          questions: [],
          weight: 10,
          order: prev.sections.length + 1,
        },
      ],
    }));
  };

  const updateSection = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const calculateTotalQuestions = () => {
    return formData.sections.reduce(
      (total, section) => total + section.questions.length,
      0
    );
  };

  const handleSave = () => {
    const totalQuestions = calculateTotalQuestions();
    const dailyQuestions = Math.ceil(totalQuestions / formData.duration);

    onSave({
      ...formData,
      totalQuestions,
      dailyQuestions,
    } as LearningPlanTemplate);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Plan Name
          </label>
          <Input
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., 3 Day Comprehensive Plan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duration (days)
          </label>
          <Select
            value={formData.duration.toString()}
            onValueChange={value =>
              setFormData(prev => ({ ...prev, duration: parseInt(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <SelectItem key={day} value={day.toString()}>
                  {day} day{day > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={e =>
            setFormData(prev => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe what this plan covers and who it's for..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty
          </label>
          <Select
            value={formData.difficulty}
            onValueChange={(value: string) =>
              setFormData(prev => ({
                ...prev,
                difficulty: value as 'Beginner' | 'Intermediate' | 'Advanced',
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estimated Time
          </label>
          <Input
            value={formData.estimatedTime}
            onChange={e =>
              setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))
            }
            placeholder="e.g., 2-3 hours"
          />
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Features
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Feature
          </Button>
        </div>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={feature}
                onChange={e => updateFeature(index, e.target.value)}
                placeholder="e.g., Daily milestones, Progress tracking"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFeature(index)}
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Learning Sections
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSection}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Section
          </Button>
        </div>
        <div className="space-y-4">
          {formData.sections.map((section, index) => (
            <Card key={section.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Section Name
                  </label>
                  <Input
                    value={section.name}
                    onChange={e => updateSection(index, 'name', e.target.value)}
                    placeholder="e.g., JavaScript Fundamentals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <Select
                    value={section.category}
                    onValueChange={value =>
                      updateSection(index, 'category', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {QUESTION_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Weight (%)
                    </label>
                    <Input
                      type="number"
                      value={section.weight}
                      onChange={e =>
                        updateSection(
                          index,
                          'weight',
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="0"
                      max="100"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSection(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Plan Summary */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          Plan Summary
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Total Questions:
            </span>
            <span className="ml-2 font-medium">
              {calculateTotalQuestions()}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Daily Questions:
            </span>
            <span className="ml-2 font-medium">
              {Math.ceil(calculateTotalQuestions() / formData.duration)}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Sections:</span>
            <span className="ml-2 font-medium">{formData.sections.length}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Features:</span>
            <span className="ml-2 font-medium">
              {formData.features.filter(f => f.trim()).length}
            </span>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
          {plan ? 'Update Plan' : 'Create Plan'}
        </Button>
      </div>
    </div>
  );
}
