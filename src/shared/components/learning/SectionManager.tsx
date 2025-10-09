'use client';

import React, { useState, useEffect } from 'react';
import { SectionClientService } from '@/lib/section-client';
import { LearningSection, SectionQuestion } from '@/lib/section-service';
import {
  UnifiedSectionClientService,
  UnifiedSection,
} from '@/lib/unified-section-client';
import QuestionCreator from './QuestionCreator';
import BulkQuestionUploader from '../common/BulkQuestionUploader';
import { autoLinkingService, QuestionData } from '@/lib/auto-linking-service';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  GripVertical,
  BookOpen,
  Users,
  Settings,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  X,
} from 'lucide-react';

export default function SectionManager() {
  const [sections, setSections] = useState<UnifiedSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showQuestionCreator, setShowQuestionCreator] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);

  // Form states
  const [editingSection, setEditingSection] = useState<UnifiedSection | null>(
    null
  );
  const [selectedSection, setSelectedSection] = useState<UnifiedSection | null>(
    null
  );
  const [sectionQuestions, setSectionQuestions] = useState<SectionQuestion[]>(
    []
  );
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionData[]>(
    []
  );
  const [editingQuestion, setEditingQuestion] =
    useState<SectionQuestion | null>(null);

  // Add/Edit form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use unified sections service instead of file-based service
      const result = await UnifiedSectionClientService.getSections();

      if (result.success) {
        setSections(result.data);
      } else {
        setError(result.error || 'Failed to load sections');
      }
    } catch (error) {
      setError('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const loadFilteredQuestions = async (section: UnifiedSection) => {
    try {
      setLoading(true);
      setError(null);

      // Get questions filtered by section's category and learning path
      const questions = await autoLinkingService.getQuestionsForSection(
        section.id
      );
      setFilteredQuestions(questions);

      console.log(
        `📋 Loaded ${questions.length} filtered questions for section: ${section.name}`
      );
    } catch (error) {
      console.error('Error loading filtered questions:', error);
      setError('Failed to load filtered questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Section name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await SectionClientService.addSection(
        formData.name.trim(),
        formData.description.trim()
      );

      if (result.success) {
        setSuccess('Section added successfully');
        setShowAddModal(false);
        setFormData({ name: '', description: '' });
        await loadSections();
      } else {
        setError(result.error || 'Failed to add section');
      }
    } catch (error) {
      setError('Failed to add section');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingSection || !formData.name.trim()) {
      setError('Section name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await SectionClientService.updateSection(
        editingSection.id,
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
        }
      );

      if (result.success) {
        setSuccess('Section updated successfully');
        setShowEditModal(false);
        setEditingSection(null);
        setFormData({ name: '', description: '' });
        await loadSections();
      } else {
        setError(result.error || 'Failed to update section');
      }
    } catch (error) {
      setError('Failed to update section');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (
    sectionId: string,
    sectionName: string
  ) => {
    if (
      !confirm(
        `Are you sure you want to delete "${sectionName}"? This will also delete all associated questions.`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await SectionClientService.deleteSection(sectionId);

      if (result.success) {
        setSuccess('Section deleted successfully');
        await loadSections();
      } else {
        setError(result.error || 'Failed to delete section');
      }
    } catch (error) {
      setError('Failed to delete section');
    } finally {
      setLoading(false);
    }
  };

  const handleViewQuestions = async (section: UnifiedSection) => {
    try {
      setLoading(true);
      setError(null);

      // Load filtered questions based on section's category and learning path
      await loadFilteredQuestions(section);

      setSelectedSection(section);
      setShowQuestionsModal(true);
    } catch (error) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (section: UnifiedSection) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      description: section.description,
    });
    setShowEditModal(true);
  };

  const openBulkModal = (section: UnifiedSection) => {
    setSelectedSection(section);
    setShowBulkModal(true);
  };

  const openQuestionCreator = (section: UnifiedSection) => {
    setSelectedSection(section);
    setShowQuestionCreator(true);
  };

  const handleQuestionAdded = async () => {
    if (selectedSection) {
      await handleViewQuestions(selectedSection);
    }
    await loadSections(); // Refresh section counts
  };

  // Handle edit question
  const handleEditQuestion = (question: SectionQuestion) => {
    setEditingQuestion(question);
    setShowEditQuestionModal(true);
  };

  // Handle delete question
  const handleDeleteQuestion = async (question: SectionQuestion) => {
    if (
      !confirm(
        `Are you sure you want to delete the question "${question.title}"?`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: Implement delete question API call
      // For now, we'll show an error since we need to implement the delete functionality
      setError(
        'Delete functionality not yet implemented. Please use the unified question manager for now.'
      );

      // Refresh questions list
      if (selectedSection) {
        await handleViewQuestions(selectedSection);
      }
      await loadSections();
    } catch (error) {
      setError('Failed to delete question');
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading && sections.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading sections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📚 Learning Paths Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage learning sections and their questions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-600 dark:text-green-400 text-sm">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Sections
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sections.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Sections
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sections.filter(s => s.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Questions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sections.reduce((sum, s) => sum + s.questionCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Avg Questions/Section
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sections.length > 0
                  ? Math.round(
                      sections.reduce((sum, s) => sum + s.questionCount, 0) /
                        sections.length
                    )
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(section => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {SectionClientService.getSectionIcon(section.name)}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {section.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(section)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Edit section"
                  >
                    <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteSection(section.id, section.name)
                    }
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {section.questionCount} questions
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    section.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}
                >
                  {section.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleViewQuestions(section)}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Questions</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openQuestionCreator(section)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add One</span>
                  </button>
                  <button
                    onClick={() => openBulkModal(section)}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors flex items-center justify-center space-x-1"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Bulk Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Section
              </h2>
            </div>

            <form onSubmit={handleAddSection} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter section name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', description: '' });
                    clearMessages();
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {loading ? 'Adding...' : 'Add Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {showEditModal && editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Section
              </h2>
            </div>

            <form onSubmit={handleEditSection} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter section name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingSection(null);
                    setFormData({ name: '', description: '' });
                    clearMessages();
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {loading ? 'Updating...' : 'Update Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Questions Modal - Placeholder for now */}
      {showQuestionsModal && selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {SectionClientService.getSectionIcon(selectedSection.name)}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedSection.name} Questions
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredQuestions.length} questions (filtered by category
                      and learning path)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuestionsModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-gray-500 dark:text-gray-400">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    No questions found for this section&apos;s category and
                    learning path
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Questions are automatically linked based on category:{' '}
                    {selectedSection.category} and learning path:{' '}
                    {selectedSection.learningPathId}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map(question => (
                    <div
                      key={question.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            {question.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {question.content}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span
                              className={`px-2 py-1 rounded ${
                                question.difficulty === 'beginner'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : question.difficulty === 'intermediate'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}
                            >
                              {question.difficulty.charAt(0).toUpperCase() +
                                question.difficulty.slice(1)}
                            </span>
                            <span
                              className={`px-2 py-1 rounded ${
                                question.type === 'single'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                  : question.type === 'multiple'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                              }`}
                            >
                              {question.type === 'single'
                                ? 'Single Choice'
                                : question.type === 'multiple'
                                  ? 'Multiple Choice'
                                  : question.type}
                            </span>
                            <span
                              className={`px-2 py-1 rounded ${
                                question.isComplete
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}
                            >
                              {question.isComplete ? 'Complete' : 'Incomplete'}
                            </span>
                            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                              {question.category}
                            </span>
                            <span>Type: {question.type}</span>
                          </div>
                        </div>

                        {/* Edit and Delete Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() =>
                              handleEditQuestion({
                                ...question,
                                difficulty:
                                  question.difficulty === 'beginner'
                                    ? 'easy'
                                    : question.difficulty === 'intermediate'
                                      ? 'medium'
                                      : 'hard',
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                              } as SectionQuestion)
                            }
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit question"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteQuestion({
                                ...question,
                                difficulty:
                                  question.difficulty === 'beginner'
                                    ? 'easy'
                                    : question.difficulty === 'intermediate'
                                      ? 'medium'
                                      : 'hard',
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                              } as SectionQuestion)
                            }
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Question Creator Modal */}
      {showQuestionCreator && selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <QuestionCreator
              sectionId={selectedSection.id}
              sectionName={selectedSection.name}
              onQuestionAdded={handleQuestionAdded}
              onClose={() => setShowQuestionCreator(false)}
            />
          </div>
        </div>
      )}

      {/* Bulk Questions Modal */}
      {showBulkModal && selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <BulkQuestionUploader
              sectionId={selectedSection.id}
              sectionName={selectedSection.name}
              onQuestionsAdded={handleQuestionAdded}
              onClose={() => setShowBulkModal(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {showEditQuestionModal && editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Question
                </h2>
                <button
                  onClick={() => setShowEditQuestionModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Question Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={editingQuestion.title}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>

                {/* Question Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Content
                  </label>
                  <textarea
                    value={editingQuestion.content}
                    readOnly
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>

                {/* Question Type and Difficulty */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question Type
                    </label>
                    <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      {editingQuestion.type === 'single'
                        ? 'Single Choice'
                        : 'Multiple Choice'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      {editingQuestion.difficulty.charAt(0).toUpperCase() +
                        editingQuestion.difficulty.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Answer Options
                  </label>
                  <div className="space-y-2">
                    {editingQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <div className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          {option.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <div
                    className={`px-3 py-2 rounded-md ${
                      editingQuestion.isComplete
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}
                  >
                    {editingQuestion.isComplete ? 'Complete' : 'Incomplete'}
                  </div>
                </div>

                {/* Note about full editing */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                        Full Editing Available
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        For complete question editing (title, content, options,
                        etc.), please use the
                        <strong> Unified Question Manager</strong> in the admin
                        panel. This view shows the current question details for
                        reference.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowEditQuestionModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowEditQuestionModal(false);
                      // TODO: Navigate to unified question manager with this question pre-selected
                      window.open('/admin/content/questions', '_blank');
                    }}
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    Edit in Question Manager
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
