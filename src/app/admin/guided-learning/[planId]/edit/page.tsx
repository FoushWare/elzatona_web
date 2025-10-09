'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import {
  ArrowLeft,
  Save,
  Eye,
  Target,
  Clock,
  BookOpen,
  Settings,
  Plus,
  List,
  Grid,
  Trash2,
} from 'lucide-react';
import { SectionQuestionManager } from '@/shared/components/common/SectionQuestionManager';

import type { LearningSection } from '@/shared/components/common/SectionQuestionManager';

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

export default function PlanEditorPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params?.planId as string;

  // Question manager state
  const [isQuestionManagerOpen, setIsQuestionManagerOpen] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<LearningSection | null>(null);
  const [questionToRemove, setQuestionToRemove] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [questions, setQuestions] = useState<
    Array<{
      id: string;
      title: string;
      content: string;
      difficulty: string;
      category: string;
      tags?: string[];
    }>
  >([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState('section');
  const [planQuestions, setPlanQuestions] = useState<
    Array<{
      id: string;
      title: string;
      content: string;
      difficulty: string;
      category: string;
      tags?: string[];
    }>
  >([]);
  const [isLoadingPlanQuestions, setIsLoadingPlanQuestions] = useState(false);

  // Dynamic sections state
  const [sections, setSections] = useState<LearningSection[]>([]);
  const [isLoadingSections, setIsLoadingSections] = useState(true);
  const [plan, setPlan] = useState<LearningPlanTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadPlanAndSections = useCallback(async () => {
    console.log('🔍 Starting loadPlanAndSections...');
    try {
      setIsLoadingSections(true);

      // Load plan template
      console.log('🔍 Loading plan data...');
      const planResponse = await fetch(`/api/guided-learning/plans/${planId}`);
      const planData = await planResponse.json();
      console.log('🔍 Plan data response:', planData);

      if (planData.success) {
        setPlan(planData.data);
      } else {
        // Create a fallback plan if not found
        const fallbackPlan: LearningPlanTemplate = {
          id: planId,
          name: `${planId} - Learning Plan`,
          duration: parseInt(planId.split('-')[0]) || 1,
          description: `Comprehensive ${planId} learning plan`,
          difficulty: 'Intermediate',
          totalQuestions: 0,
          dailyQuestions: 0,
          sections: [],
          features: [],
          estimatedTime: `${parseInt(planId.split('-')[0]) || 1} day${(parseInt(planId.split('-')[0]) || 1) > 1 ? 's' : ''}`,
          isRecommended: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setPlan(fallbackPlan);
      }

      // Load all available sections
      console.log('🔍 Loading sections data...');
      const sectionsResponse = await fetch('/api/admin/sections');
      const sectionsData = await sectionsResponse.json();
      console.log('🔍 Sections data response:', sectionsData);

      if (sectionsData.success) {
        // Convert sections to LearningSection format
        const learningSections: LearningSection[] = sectionsData.data.map(
          (section: {
            id: string;
            name: string;
            category: string;
            order: number;
            description: string;
          }) => ({
            id: section.id,
            name: section.name,
            category: section.category,
            questions: [], // Will be populated from plan
            weight: 100 / sectionsData.data.length, // Equal weight distribution
            order: section.order,
            description: section.description,
          })
        );

        setSections(learningSections);

        // If plan has sections, use them directly
        if (planData.success && planData.data.sections) {
          const planSections = planData.data.sections;
          // Handle both array and object formats
          const sectionsArray = Array.isArray(planSections)
            ? planSections
            : Object.values(planSections);

          console.log('🔍 Plan sections from API:', sectionsArray);
          console.log('🔍 Learning sections from API:', learningSections);

          // Use plan sections directly instead of merging
          setSections(sectionsArray);
        } else {
          // Fallback to learning sections if no plan sections
          setSections(learningSections);
        }
      }
    } catch (error) {
      console.error('Error loading plan and sections:', error);
    } finally {
      setIsLoadingSections(false);
    }
  }, [planId]);

  // Load dynamic data
  useEffect(() => {
    loadPlanAndSections();
    loadPlanQuestions();
  }, [loadPlanAndSections]);

  // Filter sections based on search term
  const filteredSections = sections.filter(
    section =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (section.description || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Mock plan is now replaced by dynamic data loading

  const handleSave = async () => {
    if (!plan) {
      console.error('No plan data to save');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/guided-learning/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Plan saved successfully');
        // You could add a toast notification here
        alert('Plan saved successfully!');
      } else {
        console.error('Failed to save plan:', result.error);
        alert(`Failed to save plan: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Error saving plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/admin/guided-learning');
  };

  const handlePreview = () => {
    window.open(`/guided-learning/${planId}`, '_blank');
  };

  const handleSectionClick = (section: LearningSection) => {
    setSelectedSection(section);
    loadSectionQuestions(section);

    // Store section category in localStorage for auto-selection in question manager
    if (section.category) {
      localStorage.setItem(
        'selectedSectionCategory',
        section.category.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
    }
  };

  const loadSectionQuestions = async (section: LearningSection) => {
    if (!section.questions || section.questions.length === 0) {
      setQuestions([]);
      return;
    }

    try {
      setIsLoadingQuestions(true);
      const response = await fetch('/api/questions/unified');
      const data = await response.json();

      if (data.success) {
        // Filter questions that are assigned to this section
        const sectionQuestions = data.data.filter(
          (question: {
            id: string;
            title: string;
            content: string;
            difficulty: string;
            category: string;
            tags?: string[];
          }) => section.questions.includes(question.id)
        );
        setQuestions(sectionQuestions);
      } else {
        console.error('Failed to load questions:', data.error);
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const loadPlanQuestions = useCallback(async () => {
    setIsLoadingPlanQuestions(true);
    try {
      const response = await fetch(`/api/guided-learning/plans/${planId}`);
      const data = await response.json();

      if (data.success && data.data.sections) {
        // Get all question IDs from all sections in the plan
        // Handle both array and object formats
        const sections = Array.isArray(data.data.sections)
          ? data.data.sections
          : Object.values(data.data.sections);

        const allQuestionIds = sections.flatMap(
          (section: { questions?: string[] }) => section.questions || []
        );

        console.log(
          '🔍 Plan sections:',
          sections.map(
            (s: { id: string; name: string; questions?: string[] }) => ({
              id: s.id,
              name: s.name,
              questions: s.questions,
            })
          )
        );
        console.log('🔍 All question IDs from plan:', allQuestionIds);

        if (allQuestionIds.length > 0) {
          // Fetch question details for all question IDs
          const questionsResponse = await fetch('/api/questions/unified');
          const questionsData = await questionsResponse.json();

          if (questionsData.success) {
            const allQuestions = questionsData.data || [];
            const planQuestionsData = allQuestions.filter(
              (question: { id: string }) => allQuestionIds.includes(question.id)
            );
            console.log(
              '🔍 Plan questions found:',
              planQuestionsData.map(
                (q: { id: string; title: string; category: string }) => ({
                  id: q.id,
                  title: q.title,
                  category: q.category,
                })
              )
            );
            setPlanQuestions(planQuestionsData);
          }
        } else {
          setPlanQuestions([]);
        }
      } else {
        setPlanQuestions([]);
      }
    } catch (error) {
      console.error('Error loading plan questions:', error);
      setPlanQuestions([]);
    } finally {
      setIsLoadingPlanQuestions(false);
    }
  }, [planId]);

  // Load plan questions when switching to plan tab
  useEffect(() => {
    if (activeTab === 'plan') {
      loadPlanQuestions();
    }
  }, [activeTab, loadPlanQuestions]);

  const handleAddSection = () => {
    router.push('/admin/sections');
  };

  const getQuestionSection = (questionId: string) => {
    return sections.find(
      section => section.questions && section.questions.includes(questionId)
    );
  };

  const handleRemoveQuestionFromPlan = (
    questionId: string,
    questionTitle: string
  ) => {
    setQuestionToRemove({ id: questionId, title: questionTitle });
  };

  const confirmRemoveQuestion = async () => {
    if (!questionToRemove) return;

    try {
      // Find which section contains this question
      const sectionWithQuestion = getQuestionSection(questionToRemove.id);

      if (!sectionWithQuestion) {
        console.error('Question not found in any section');
        return;
      }

      // Remove the question from the section
      const updatedQuestions = sectionWithQuestion.questions.filter(
        id => id !== questionToRemove.id
      );

      const response = await fetch(
        `/api/guided-learning/plans/${planId}/sections/${sectionWithQuestion.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questions: updatedQuestions,
          }),
        }
      );

      if (response.ok) {
        // Reload all data to reflect the changes
        loadPlanAndSections();
        loadPlanQuestions();
        if (selectedSection) {
          loadSectionQuestions(selectedSection);
        }
        setQuestionToRemove(null);
      } else {
        console.error('Failed to remove question from section');
      }
    } catch (error) {
      console.error('Error removing question from plan:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      html: '#E34F26',
      css: '#1572B6',
      javascript: '#F7DF1E',
      typescript: '#3178C6',
      react: '#61DAFB',
      vue: '#4FC08D',
      angular: '#DD0031',
      performance: '#10B981',
      algorithms: '#8B5CF6',
      patterns: '#F59E0B',
      'system-design': '#EF4444',
      security: '#DC2626',
      testing: '#059669',
      accessibility: '#7C3AED',
      backend: '#6B7280',
      devops: '#F97316',
      mobile: '#EC4899',
      tools: '#6366F1',
      'soft-skills': '#10B981',
    };
    return colors[category] || '#6B7280';
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Plans</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {plan?.name || 'Loading...'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {plan?.description || 'Loading plan details...'}
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {sections.reduce(
                        (total, section) => total + section.questions.length,
                        0
                      )}{' '}
                      total questions
                    </span>
                  </span>
                  <span className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <Target className="w-4 h-4" />
                    <span>
                      {
                        sections.filter(section => section.questions.length > 0)
                          .length
                      }{' '}
                      sections with questions
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving || !plan}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Plan'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Questions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sections.reduce(
                      (total, section) => total + section.questions.length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Daily Questions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan?.dailyQuestions || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Sections
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sections.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Settings className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Duration
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan?.duration || 0} day
                    {(plan?.duration || 0) > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Sections */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>
                      Plan Sections ({filteredSections.length}/{sections.length}
                      )
                    </span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddSection}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search sections..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingSections ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Loading sections...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-96 overflow-y-auto">
                    <div className="space-y-1 p-1">
                      {filteredSections.map(section => (
                        <div
                          key={section.id}
                          className={`p-4 border-l-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            selectedSection?.id === section.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'border-transparent hover:border-gray-300'
                          }`}
                          onClick={() => handleSectionClick(section)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {section.name}
                            </h3>
                            <Badge
                              style={{
                                backgroundColor: getCategoryColor(
                                  section.category
                                ),
                                color: 'white',
                              }}
                            >
                              {section.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {section.description || 'No description available'}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{section.questions.length} questions</span>
                            </span>
                            <span>Weight: {section.weight}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Questions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>
                    {selectedSection
                      ? `${selectedSection.name} Questions`
                      : 'Select a Section'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="flex-1 flex flex-col"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="section"
                      className="flex items-center space-x-2"
                    >
                      <List className="w-4 h-4" />
                      <span>Section Questions</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="plan"
                      className="flex items-center space-x-2"
                    >
                      <Grid className="w-4 h-4" />
                      <span>All Plan Questions</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="section"
                    className="flex-1 overflow-y-auto mt-4"
                  >
                    {!selectedSection ? (
                      <div className="text-center py-12">
                        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No Section Selected
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Click on a section from the left panel to view its
                          questions
                        </p>
                      </div>
                    ) : isLoadingQuestions ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Loading questions...
                          </p>
                        </div>
                      </div>
                    ) : questions.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No Questions Assigned
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          This section doesn&apos;t have any questions assigned
                          yet
                        </p>
                        <Button
                          onClick={() => setIsQuestionManagerOpen(true)}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Questions
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {questions.map(question => (
                          <div
                            key={question.id}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {question.title}
                                  </h4>
                                  <Badge
                                    className={
                                      question.difficulty === 'beginner'
                                        ? 'bg-green-100 text-green-800'
                                        : question.difficulty === 'intermediate'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                    }
                                  >
                                    {question.difficulty}
                                  </Badge>
                                  <Badge variant="outline">
                                    {question.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {question.content}
                                </p>
                                {question.tags && question.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {question.tags
                                      .slice(0, 3)
                                      .map((tag: string, index: number) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    {question.tags.length > 3 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        +{question.tags.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button
                            onClick={() => setIsQuestionManagerOpen(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Manage Questions
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent
                    value="plan"
                    className="flex-1 overflow-y-auto mt-4"
                  >
                    {isLoadingPlanQuestions ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Loading plan questions...
                          </p>
                        </div>
                      </div>
                    ) : planQuestions.length === 0 ? (
                      <div className="text-center py-12">
                        <Grid className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No Plan Questions Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Add questions to sections to see them here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {planQuestions.map(question => {
                          const questionSection = getQuestionSection(
                            question.id
                          );
                          return (
                            <div
                              key={question.id}
                              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                      {question.title}
                                    </h4>
                                    <Badge
                                      className={
                                        question.difficulty === 'beginner'
                                          ? 'bg-green-100 text-green-800'
                                          : question.difficulty ===
                                              'intermediate'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                      }
                                    >
                                      {question.difficulty}
                                    </Badge>
                                    <Badge variant="outline">
                                      {question.category}
                                    </Badge>
                                    {questionSection && (
                                      <Badge
                                        variant="secondary"
                                        className="bg-blue-100 text-blue-800"
                                      >
                                        {questionSection.name}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {question.content}
                                  </p>
                                  {question.tags &&
                                    question.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {question.tags
                                          .slice(0, 3)
                                          .map((tag: string, index: number) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {tag}
                                            </Badge>
                                          ))}
                                        {question.tags.length > 3 && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            +{question.tags.length - 3} more
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleRemoveQuestionFromPlan(
                                        question.id,
                                        question.title
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Question Manager Modal */}
      <SectionQuestionManager
        isOpen={isQuestionManagerOpen}
        onClose={() => {
          setIsQuestionManagerOpen(false);
          setSelectedSection(null);
        }}
        section={selectedSection}
        planId={planId}
        onUpdate={async () => {
          // Add a small delay to ensure the data is saved before reloading
          await new Promise(resolve => setTimeout(resolve, 500));
          // Reload all data after questions are updated
          loadPlanAndSections();
          loadPlanQuestions();
          // Also reload questions for the selected section
          if (selectedSection) {
            loadSectionQuestions(selectedSection);
          }
        }}
      />

      {/* Confirmation Dialog */}
      {questionToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Remove Question
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to remove &quot;{questionToRemove.title}
              &quot; from the plan? This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setQuestionToRemove(null)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmRemoveQuestion}>
                Remove Question
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
