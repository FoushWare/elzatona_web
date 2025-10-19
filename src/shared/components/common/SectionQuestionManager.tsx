'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Search, Filter, BookOpen, Check } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  topic?: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LearningSection {
  id: string;
  name: string;
  category: string;
  questions: string[];
  weight: number;
  order: number;
  description?: string;
}

interface SectionQuestionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  section: LearningSection | null;
  planId: string;
  onUpdate: () => void;
}

export const SectionQuestionManager: React.FC<SectionQuestionManagerProps> = ({
  isOpen,
  onClose,
  section,
  planId,
  onUpdate,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Load questions and categories when modal opens
  useEffect(() => {
    if (isOpen && section) {
      loadQuestions();
      loadCategories();
      setSelectedQuestions(section.questions || []);

      // Auto-select category based on section category or localStorage
      const sectionCategory = section.category
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      const storedCategory = localStorage.getItem('selectedSectionCategory');

      if (sectionCategory) {
        setFilterCategory(sectionCategory);
      } else if (storedCategory) {
        setFilterCategory(storedCategory);
        // Clear the stored category after using it
        localStorage.removeItem('selectedSectionCategory');
      }
    }
  }, [isOpen, section]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/questions/unified');
      const data = await response.json();

      if (data.success) {
        setQuestions(data.data || []);
      } else {
        console.error('Failed to load questions:', data.error);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();

      if (data.success) {
        setCategories(data.data || []);
      } else {
        console.error('Failed to load categories:', data.error);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleQuestionToggle = (question_id: string) => {
    setSelectedQuestions(prev => {
      if (prev.includes(question_id)) {
        return prev.filter(id => id !== question_id);
      } else {
        return [...prev, question_id];
      }
    });
  };

  const handleSave = async () => {
    if (!section) return;

    try {
      setIsSaving(true);

      // Update the section with selected questions
      const response = await fetch(
        `/api/guided-learning/plans/${planId}/sections/${section.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questions: selectedQuestions,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        onUpdate();
        onClose();
      } else {
        alert('Failed to save questions: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving questions:', error);
      alert('Error saving questions');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase());

    // Normalize category names for comparison
    const questionCategory = question.category
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    const filterCategoryNormalized =
      filterCategory === 'all'
        ? 'all'
        : filterCategory.toLowerCase().replace(/[^a-z0-9]/g, '');

    const matchesCategory =
      filterCategory === 'all' || questionCategory === filterCategoryNormalized;
    const matchesDifficulty =
      filterDifficulty === 'all' || question.difficulty === filterDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Manage Questions for: {section.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {/* Filters */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex-shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem
                      key={category.id}
                      value={category.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '')}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filterDifficulty}
                onValueChange={setFilterDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterDifficulty('all');
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Selected Questions Summary */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Selected Questions: {selectedQuestions.length}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedQuestions([])}
                disabled={selectedQuestions.length === 0}
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQuestions.map(question => {
                  const isSelected = selectedQuestions.includes(question.id);

                  return (
                    <Card
                      key={question.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => handleQuestionToggle(question.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {question.title}
                              </h3>
                              <Badge
                                className={getDifficultyColor(
                                  question.difficulty
                                )}
                              >
                                {question.difficulty}
                              </Badge>
                              <Badge variant="outline">
                                {question.category}
                              </Badge>
                              {question.topic && (
                                <Badge variant="secondary">
                                  {question.topic}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {question.content}
                            </p>
                            {question.tags && question.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {question.tags.slice(0, 3).map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {question.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{question.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            {isSelected ? (
                              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredQuestions.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedQuestions.length} question
              {selectedQuestions.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Save Questions
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
