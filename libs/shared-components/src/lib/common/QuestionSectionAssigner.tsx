'use client';

import React, { useState, useEffect } from 'react';
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
import { Button } from '@elzatona/shared-components';
import { Badge } from '@elzatona/shared-components';
import { Alert, AlertDescription } from '@elzatona/shared-components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@elzatona/shared-components';
import {
  Loader2,
  Save,
  AlertCircle,
  CheckCircle,
  Database,
  Users,
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  sectionId?: string;
  orderInSection?: number;
}

interface Section {
  id: string;
  name: string;
  learningPathId: string;
  questionLimit: number;
  currentQuestionCount: number;
}

interface QuestionSectionAssignerProps {
  onAssignmentChange?: (assignments: Record<string, string>) => void;
}

export default function QuestionSectionAssigner({
  onAssignmentChange,
}: QuestionSectionAssignerProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [questionsResponse, sectionsResponse] = await Promise.all([
        fetch('/api/enhanced-questions'),
        fetch('/api/sections'),
      ]);

      const questionsData = await questionsResponse.json();
      const sectionsData = await sectionsResponse.json();

      if (questionsData.success) {
        setQuestions(questionsData.data || []);
        // Initialize assignments
        const initialAssignments: Record<string, string> = {};
        questionsData.data?.forEach((q: Question) => {
          if (q.sectionId) {
            initialAssignments[q.id] = q.sectionId;
          }
        });
        setAssignments(initialAssignments);
      }

      if (sectionsData.success) {
        setSections(sectionsData.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignmentChange = (question_id: string, sectionId: string) => {
    const newAssignments = {
      ...assignments,
    };

    if (sectionId === 'none') {
      delete newAssignments[question_id];
    } else {
      newAssignments[question_id] = sectionId;
    }

    setAssignments(newAssignments);
    onAssignmentChange?.(newAssignments);
  };

  const handleSaveAssignments = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/enhanced-questions/assign-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignments }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccess('Assignments saved successfully!');
          setTimeout(() => setSuccess(null), 3000);
        } else {
          throw new Error(data.error || 'Failed to save assignments');
        }
      } else {
        throw new Error('Failed to save assignments');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save assignments'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const getSectionStats = () => {
    const sectionStats = sections.map(section => {
      const assignedQuestions = Object.values(assignments).filter(
        sectionId => sectionId === section.id
      ).length;
      const capacity = (assignedQuestions / section.questionLimit) * 100;

      return {
        ...section,
        assignedQuestions,
        capacity: Math.round(capacity),
        isFull: assignedQuestions >= section.questionLimit,
        isNearFull: capacity >= 80,
      };
    });

    return sectionStats;
  };

  const sectionStats = getSectionStats();

  if (isLoading) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin mr-2' />
            <span>Loading questions and sections...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Database className='h-5 w-5' />
            Question Section Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {error && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className='h-4 w-4' />
              <AlertDescription className='text-green-600'>
                {success}
              </AlertDescription>
            </Alert>
          )}

          <div className='space-y-4'>
            {questions.map(question => (
              <div
                key={question.id}
                className='flex items-center justify-between p-4 border rounded-lg'
              >
                <div className='flex-1'>
                  <h4 className='font-medium'>{question.question}</h4>
                  <div className='flex items-center gap-2 mt-1'>
                    <Badge variant='outline'>{question.category}</Badge>
                    <Badge
                      variant={
                        question.difficulty === 'easy'
                          ? 'default'
                          : question.difficulty === 'medium'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {question.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className='ml-4'>
                  <Select
                    value={assignments[question.id] || ''}
                    onValueChange={value =>
                      handleAssignmentChange(question.id, value)
                    }
                  >
                    <SelectTrigger className='w-48'>
                      <SelectValue placeholder='Select section' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='none'>No Section</SelectItem>
                      {sections.map(section => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.name} ({section.currentQuestionCount}/
                          {section.questionLimit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-end'>
            <Button onClick={handleSaveAssignments} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Save Assignments
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            Section Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {sectionStats.map(section => (
              <div
                key={section.id}
                className={`p-4 border rounded-lg ${
                  section.isFull ? 'border-red-200 bg-red-50' : ''
                }`}
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-medium'>{section.name}</h4>
                  <Badge
                    className={
                      section.isFull
                        ? 'bg-red-100 text-red-800'
                        : section.isNearFull
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }
                  >
                    {section.assignedQuestions}/{section.questionLimit}
                  </Badge>
                </div>
                <div className='space-y-1'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Learning Path:</span>
                    <span className='font-medium'>
                      {section.learningPathId}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Capacity:</span>
                    <span className='font-medium'>{section.capacity}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
