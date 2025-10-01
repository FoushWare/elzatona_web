'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  BookOpen,
  Users,
  Plus,
  BarChart3,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import {
  Section,
  Topic,
  EnhancedQuestion,
  SectionConfig,
} from '@/lib/enhanced-question-schema';
import TopicManager from '@/components/admin/TopicManager';

export default function EnhancedStructurePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<EnhancedQuestion[]>([]);
  const [sectionConfig, setSectionConfig] = useState<SectionConfig | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        sectionsResponse,
        topicsResponse,
        questionsResponse,
        configResponse,
      ] = await Promise.all([
        fetch('/api/sections'),
        fetch('/api/topics'),
        fetch('/api/enhanced-questions'),
        fetch('/api/section-config'),
      ]);

      const sectionsData = await sectionsResponse.json();
      const topicsData = await topicsResponse.json();
      const questionsData = await questionsResponse.json();
      const configData = await configResponse.json();

      if (sectionsData.success) setSections(sectionsData.data || []);
      if (topicsData.success) setTopics(topicsData.data || []);
      if (questionsData.success) setQuestions(questionsData.data || []);
      if (configData.success) setSectionConfig(configData.data);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSectionStats = () => {
    const totalQuestions = questions.length;
    const assignedQuestions = questions.filter(q => q.sectionId).length;
    const unassignedQuestions = totalQuestions - assignedQuestions;

    const sectionStats = sections.map(section => {
      const sectionQuestions = questions.filter(
        q => q.sectionId === section.id
      );
      const capacity = (sectionQuestions.length / section.questionLimit) * 100;

      return {
        ...section,
        currentQuestionCount: sectionQuestions.length,
        capacity: Math.round(capacity),
        isFull: sectionQuestions.length >= section.questionLimit,
        isNearFull: capacity >= 80,
      };
    });

    return {
      totalQuestions,
      assignedQuestions,
      unassignedQuestions,
      sectionStats,
    };
  };

  const stats = getSectionStats();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enhanced structure data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Question Structure Management
        </h1>
        <p className="text-gray-600">
          Manage topics and automatic section assignment for questions
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalQuestions}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Assigned Questions
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.assignedQuestions}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unassigned Questions
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.unassignedQuestions}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Sections
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {sections.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="sections">Auto Sections</TabsTrigger>
        </TabsList>

        {/* Auto Sections Tab */}
        <TabsContent value="sections" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Auto-Generated Sections</h2>
            <div className="text-sm text-gray-600">
              Sections are automatically created when questions are added (15
              questions per section)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.sectionStats.map(section => (
              <Card
                key={section.id}
                className={section.isFull ? 'border-red-200 bg-red-50' : ''}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{section.name}</span>
                    <Badge
                      className={
                        section.isFull
                          ? 'bg-red-100 text-red-800'
                          : section.isNearFull
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }
                    >
                      {section.currentQuestionCount}/{section.questionLimit}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Learning Path:</span>
                      <span className="font-medium">
                        {section.learningPath}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{section.capacity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          section.isFull
                            ? 'bg-red-500'
                            : section.isNearFull
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(section.capacity, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <TopicManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
