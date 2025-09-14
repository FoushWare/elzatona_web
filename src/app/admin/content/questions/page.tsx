'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Upload,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple';
  section: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  audioQuestion?: string;
  audioAnswer?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export default function QuestionsManagementPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const sections = [
    { id: 'all', name: 'All Sections' },
    { id: 'learning', name: 'Learning' },
    { id: 'practice', name: 'Practice' },
    { id: 'interview-prep', name: 'Interview Prep' },
    { id: 'media', name: 'Media' },
  ];

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  useEffect(() => {
    // Simulate loading questions
    setTimeout(() => {
      setQuestions([
        {
          id: '1',
          title: 'What is React?',
          content:
            'React is a JavaScript library for building user interfaces.',
          type: 'single',
          section: 'learning',
          difficulty: 'easy',
          options: [
            { id: 'a', text: 'A JavaScript library', isCorrect: true },
            { id: 'b', text: 'A CSS framework', isCorrect: false },
            { id: 'c', text: 'A database', isCorrect: false },
            { id: 'd', text: 'A server', isCorrect: false },
          ],
          correctAnswers: ['a'],
          explanation:
            'React is a JavaScript library developed by Facebook for building user interfaces.',
          audioQuestion: '/audio/questions/question-1.mp3',
          audioAnswer: '/audio/answers/answer-1.mp3',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
          isActive: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSection =
      selectedSection === 'all' || question.section === selectedSection;
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      question.difficulty === selectedDifficulty;
    return matchesSearch && matchesSection && matchesDifficulty;
  });

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const toggleQuestionStatus = (questionId: string) => {
    setQuestions(
      questions.map(q =>
        q.id === questionId ? { ...q, isActive: !q.isActive } : q
      )
    );
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Questions Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage all questions with audio support and multi-choice
                  options
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Section Filter */}
              <select
                value={selectedSection}
                onChange={e => setSelectedSection(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSection('all');
                  setSelectedDifficulty('all');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Questions List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading questions...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map(question => (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {question.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.type === 'single'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}
                        >
                          {question.type === 'single'
                            ? 'Single Choice'
                            : 'Multiple Choice'}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.difficulty === 'easy'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : question.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}
                        >
                          {question.difficulty.charAt(0).toUpperCase() +
                            question.difficulty.slice(1)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.isActive
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                          }`}
                        >
                          {question.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {question.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Section: {question.section}</span>
                        <span>•</span>
                        <span>
                          Created: {question.createdAt.toLocaleDateString()}
                        </span>
                        {question.audioQuestion && (
                          <>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Volume2 className="w-4 h-4" />
                              <span>Has Audio</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {question.audioQuestion && (
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingQuestion(question)}
                        className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleQuestionStatus(question.id)}
                        className={`p-2 ${
                          question.isActive
                            ? 'text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-200'
                            : 'text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map(option => (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg border ${
                          option.isCorrect
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                            : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {option.id.toUpperCase()}.
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {option.text}
                          </span>
                          {option.isCorrect && (
                            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                              ✓ Correct
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search criteria or create a new question.
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Question</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
