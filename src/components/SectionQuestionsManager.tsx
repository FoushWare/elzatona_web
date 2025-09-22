'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Search,
  Plus,
  Trash2,
  Eye,
  Edit,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Save,
  ChevronUp,
} from 'lucide-react';
import { UnifiedQuestion } from '@/lib/unified-question-schema';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';
import { QuestionViewModal } from '@/components/QuestionViewModal';

interface SectionQuestionsManagerProps {
  sectionId: string;
  sectionName: string;
  currentQuestionIds: string[];
  onQuestionsChange: (questionIds: string[]) => void;
  onClose: () => void;
  sectionCategory?: string;
}

export function SectionQuestionsManager({
  sectionId,
  sectionName,
  currentQuestionIds,
  onQuestionsChange,
  onClose,
  sectionCategory,
}: SectionQuestionsManagerProps) {
  const { questions, learningPaths, loadQuestions } = useUnifiedQuestions({
    autoLoad: true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuestions, setSelectedQuestions] =
    useState<string[]>(currentQuestionIds);
  const [viewingQuestion, setViewingQuestion] =
    useState<UnifiedQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Auto-set category filter based on section category
  useEffect(() => {
    if (sectionCategory) {
      setSelectedCategory(sectionCategory);
    }
  }, [sectionCategory]);

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter(question => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      question.difficulty === selectedDifficulty;
    const matchesType =
      selectedType === 'all' || question.type === selectedType;
    const matchesCategory =
      selectedCategory === 'all' ||
      question.category === selectedCategory ||
      question.tags?.includes(selectedCategory);

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesType &&
      matchesCategory
    );
  });

  // Get unique difficulties, types, and categories for filters
  const difficulties = Array.from(new Set(questions.map(q => q.difficulty)));
  const types = Array.from(new Set(questions.map(q => q.type)));
  const categories = Array.from(
    new Set(questions.map(q => q.category).filter(Boolean))
  );

  const handleQuestionToggle = (questionId: string) => {
    setSelectedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedQuestions(filteredQuestions.map(q => q.id));
  };

  const handleDeselectAll = () => {
    setSelectedQuestions([]);
  };

  const handleSave = () => {
    onQuestionsChange(selectedQuestions);
    onClose();
  };

  const handleCancel = () => {
    setSelectedQuestions(currentQuestionIds);
    onClose();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setShowScrollToTop(target.scrollTop > 100);
  };

  const scrollToTop = () => {
    const container = document.querySelector('.questions-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'multiple':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'open-ended':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <BookOpen className="w-6 h-6 text-blue-600" />
                Add Questions to &quot;{sectionName}&quot;
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose from existing questions to add to this learning section. You
            can search, filter, and preview questions before adding them.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-full space-y-4">
          {/* Filters and Search */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Filters & Search
              </h3>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <Input
                  placeholder="Search questions by title or content..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <Target className="w-4 h-4 text-orange-500" />
                  Difficulty
                </label>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-10 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <Filter className="w-4 h-4 text-green-500" />
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDifficulty('all');
                    setSelectedType('all');
                    setSelectedCategory('all');
                  }}
                  className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 font-medium rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons and Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/20 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeselectAll}
                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-700 dark:hover:bg-red-900/20 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Deselect All
                </Button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {selectedQuestions.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">
                    {filteredQuestions.length}
                  </span>{' '}
                  questions selected
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {filteredQuestions.length === 0
                  ? 'No questions match filters'
                  : filteredQuestions.length === 1
                    ? '1 question found'
                    : `${filteredQuestions.length} questions found`}
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div 
            className="questions-container flex-1 overflow-y-auto space-y-4 pr-2 max-h-[500px] min-h-[300px] relative"
            onScroll={handleScroll}
          >
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  No questions found
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  Try adjusting your search filters or check if questions exist
                  for this category. You can also create new questions if
                  needed.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Question
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredQuestions.map(question => (
                  <Card
                    key={question.id}
                    className={`group cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                      selectedQuestions.includes(question.id)
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleQuestionToggle(question.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-1">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedQuestions.includes(question.id)}
                              onChange={() => handleQuestionToggle(question.id)}
                              className="w-6 h-6 text-blue-600 rounded-lg focus:ring-blue-500 focus:ring-2 cursor-pointer"
                            />
                            {selectedQuestions.includes(question.id) && (
                              <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-blue-600 bg-white rounded-full" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight pr-4">
                              {question.title}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={e => {
                                e.stopPropagation();
                                setViewingQuestion(question);
                              }}
                              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg p-2"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                            {question.content}
                          </p>

                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 ${getDifficultyColor(question.difficulty)}`}
                            >
                              <Target className="w-3 h-3" />
                              {question.difficulty}
                            </Badge>
                            <Badge
                              className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 ${getTypeColor(question.type)}`}
                            >
                              <BookOpen className="w-3 h-3" />
                              {question.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold px-3 py-1.5 rounded-full border-gray-300 dark:border-gray-600 flex items-center gap-1"
                            >
                              <Filter className="w-3 h-3" />
                              {question.category}
                            </Badge>
                            {question.isActive && (
                              <Badge className="text-xs font-medium px-2 py-1 bg-green-500 text-white">
                                Active
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Scroll Indicator */}
            {filteredQuestions.length > 10 && (
              <div className="sticky bottom-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent h-8 flex items-center justify-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                  Scroll for more questions
                </div>
              </div>
            )}
            
            {/* Scroll to Top Button */}
            {showScrollToTop && (
              <div className="absolute bottom-4 right-4 z-10">
                <Button
                  onClick={scrollToTop}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  title="Scroll to top"
                >
                  <ChevronUp className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Confirmation Banner */}
          {selectedQuestions.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mx-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    Ready to Add Questions
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You have selected{' '}
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-semibold">
                      {selectedQuestions.length}
                    </span>
                    {' '}of{' '}
                    <span className="font-bold">{filteredQuestions.length}</span>
                    {' '}question{filteredQuestions.length === 1 ? '' : 's'} to add to "{sectionName}".
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <DialogFooter className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 -mx-6 -mb-6 px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-semibold">
                    {selectedQuestions.length}
                  </span>
                  <span>of</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {filteredQuestions.length}
                  </span>
                  <span>questions selected</span>
                </div>
                {selectedQuestions.length > 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                    Ready to save
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-medium rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className={`px-8 py-3 font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedQuestions.length > 0
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-400 text-gray-200'
                  }`}
                  disabled={selectedQuestions.length === 0}
                >
                  <Save className="w-5 h-5 mr-2" />
                  {selectedQuestions.length > 0 
                    ? (
                        <span className="flex items-center gap-2">
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-semibold">
                            {selectedQuestions.length}
                          </span>
                          <span>of</span>
                          <span className="font-semibold">{filteredQuestions.length}</span>
                          <span>added</span>
                        </span>
                      )
                    : (
                        <span className="flex items-center gap-2">
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm font-semibold">
                            0
                          </span>
                          <span>of</span>
                          <span className="font-semibold">{filteredQuestions.length}</span>
                          <span>added</span>
                        </span>
                      )
                  }
                </Button>
              </div>
            </div>
          </DialogFooter>
        </div>

        {/* Floating Action Button */}
        {selectedQuestions.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <Save className="w-5 h-5 mr-2" />
              <span className="flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-semibold">
                  {selectedQuestions.length}
                </span>
                <span>of</span>
                <span className="font-semibold">{filteredQuestions.length}</span>
                <span>added</span>
              </span>
            </Button>
          </div>
        )}

        {/* Question View Modal */}
        {viewingQuestion && (
          <QuestionViewModal
            question={viewingQuestion}
            learningPaths={learningPaths}
            onClose={() => setViewingQuestion(null)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
