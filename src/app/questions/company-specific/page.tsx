'use client';

import React, { useState } from 'react';
import { companySections } from '@/lib/companyQuestions';
import CompanyQuestionSection from '@/components/CompanyQuestionSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Building2,
  Users,
  Target,
  ArrowLeft,
  Filter,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

export default function CompanySpecificQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  // Get all unique categories from questions
  const allCategories = Array.from(
    new Set(
      companySections.flatMap(section =>
        section.questions.map(q => q.category).filter(Boolean)
      )
    )
  );

  // Filter sections based on search term and category
  const filteredSections = companySections.filter(section => {
    const matchesSearch =
      searchTerm === '' ||
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.questions.some(
        q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' ||
      section.questions.some(q => q.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const totalQuestions = companySections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const expandAllSections = () => {
    setExpandedSections(new Set(companySections.map(s => s.id)));
  };

  const collapseAllSections = () => {
    setExpandedSections(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/questions">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Questions
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🏢 Company-Specific Interview Questions
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Practice questions tailored for specific companies and their
              unique cultures
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {companySections.length}
                </div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {allCategories.length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search companies, questions, or answers..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm" onClick={expandAllSections}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAllSections}>
                Collapse All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Sections */}
        <div className="space-y-6">
          {filteredSections.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No companies found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or category filter.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredSections.map(section => (
              <CompanyQuestionSection key={section.id} section={section} />
            ))
          )}
        </div>

        {/* Footer Info */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              💡 Tips for Company-Specific Interviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Research the Company
                  </h4>
                  <p className="text-sm text-gray-600">
                    Understand their mission, values, and recent developments
                    before the interview.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Know Their Culture
                  </h4>
                  <p className="text-sm text-gray-600">
                    Learn about their work environment, values, and what they
                    look for in candidates.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Prepare Examples
                  </h4>
                  <p className="text-sm text-gray-600">
                    Have specific examples ready that align with their company
                    values and challenges.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
