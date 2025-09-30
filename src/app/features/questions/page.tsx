'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  greatFrontendQuestions,
  getCompanies,
  getTags,
} from '@/lib/greatfrontendQuestions';
// import { useTranslation } from "@/hooks/useTranslation";

export default function QuestionsPage() {
  const router = useRouter();
  // const { t, isRTL } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    'coding' | 'system-design' | 'quiz'
  >('coding');
  const [activeSubCategory, setActiveSubCategory] = useState<string>(
    'javascript-functions'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popularity' | 'difficulty' | 'newest'>(
    'popularity'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter questions based on current selections
  const filteredQuestions = greatFrontendQuestions.filter(question => {
    // Map categories to tabs
    const categoryToTab = {
      'JavaScript Functions': 'coding',
      'User Interface Coding': 'coding',
      'Algorithmic Coding': 'coding',
      'System Design': 'system-design',
      React: 'coding',
      CSS: 'coding',
      'Web APIs': 'coding',
      Testing: 'quiz',
    };

    const questionTab =
      categoryToTab[question.category as keyof typeof categoryToTab] ||
      'coding';
    if (questionTab !== activeTab) return false;

    if (
      searchTerm &&
      !question.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !question.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (
      selectedTopics.length > 0 &&
      !selectedTopics.some(topic =>
        question.tags.some(tag =>
          tag.toLowerCase().includes(topic.toLowerCase())
        )
      )
    )
      return false;
    if (
      selectedCompanies.length > 0 &&
      !selectedCompanies.some(company => question.companies?.includes(company))
    )
      return false;
    if (
      selectedDifficulty !== 'all' &&
      question.difficulty !== selectedDifficulty
    )
      return false;
    return true;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return (b.completionRate || 0) - (a.completionRate || 0);
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalQuestions = greatFrontendQuestions.length;
  const totalHours = greatFrontendQuestions.reduce(
    (sum, q) => sum + q.estimatedTime,
    0
  );
  const filteredCount = filteredQuestions.length;

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  // Get available topics and companies from the data
  const availableTopics = getTags();
  const availableCompanies = getCompanies();

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedCompanies([]);
    setSearchTerm('');
    setSelectedDifficulty('all');
  };

  const handleQuestionClick = (questionId: string) => {
    // Navigate to the question detail page or editor
    router.push(`/questions/${questionId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            All Practice Questions
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            The largest question bank of 500+ practice questions for front end
            interviews
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center bg-card border border-border px-3 py-1 rounded-full text-sm text-foreground">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Solved by ex-interviewers
            </span>
            <span className="flex items-center bg-card border border-border px-3 py-1 rounded-full text-sm text-foreground">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              Test cases
            </span>
            <span className="flex items-center bg-card border border-border px-3 py-1 rounded-full text-sm text-foreground">
              <svg
                className="w-4 h-4 mr-2 text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Code in browser
            </span>
          </div>

          <p className="text-muted-foreground max-w-3xl mb-6">
            Save the trouble of searching the web for front end interview
            questions. We have 500+ practice questions in every framework,
            format, and topic, each with high quality answers and tests from big
            tech senior / staff engineers.
          </p>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/questions/multiple-choice"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
            >
              🎯 Multiple Choice Quiz
            </Link>
            <Link
              href="/questions/behavioral"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-medium shadow-lg"
            >
              🤝 Behavioral Questions
            </Link>
            <Link
              href="/questions/company-specific"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg"
            >
              🏢 Company-Specific Questions
            </Link>
            <Link
              href="/coding"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
            >
              💻 Coding Challenges
            </Link>
          </div>

          {/* Mobile Toggle Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 md:hidden">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search within this list of questions"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={e =>
              setSortBy(
                e.target.value as 'popularity' | 'difficulty' | 'newest'
              )
            }
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          >
            <option value="popularity">Sort by popularity</option>
            <option value="difficulty">Sort by difficulty</option>
            <option value="newest">Sort by newest</option>
          </select>
        </div>

        {/* Content Tabs */}
        <div className="flex space-x-1 mb-6">
          {['coding', 'system-design', 'quiz'].map(tab => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as 'coding' | 'system-design' | 'quiz')
              }
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Special Collections */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Special Collections
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/questions/javascript')}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>JavaScript Interview Questions (155)</span>
            </button>
          </div>
        </div>

        {/* Coding Sub-categories */}
        {activeTab === 'coding' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'JavaScript Functions',
              'User Interface Coding',
              'Algorithmic Coding',
              'React',
              'CSS',
              'Web APIs',
            ].map(subCategory => (
              <button
                key={subCategory}
                onClick={() => setActiveSubCategory(subCategory)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeSubCategory === subCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {subCategory}
              </button>
            ))}
          </div>
        )}

        {/* Question Statistics */}
        <div className={`${showStatistics ? 'block' : 'hidden md:block'} mb-6`}>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300">
                <span className="font-semibold text-white">
                  {filteredCount}
                </span>{' '}
                of {totalQuestions} questions
              </span>
              <span className="text-gray-300">
                <span className="font-semibold text-white">{totalHours}</span>{' '}
                hours of content
              </span>
            </div>

            {(selectedTopics.length > 0 ||
              selectedCompanies.length > 0 ||
              selectedDifficulty !== 'all') && (
              <button
                onClick={clearFilters}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Questions List */}
          <div className="flex-1">
            <div className="space-y-4">
              {sortedQuestions.map(question => (
                <div
                  key={question.id}
                  onClick={() => handleQuestionClick(question.id)}
                  className="p-6 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors">
                      {question.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {question.isWarmUp && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Warm up
                        </span>
                      )}
                      {question.hasTestCases && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Test cases
                        </span>
                      )}
                      {question.hasSolution && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Solution
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {question.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          question.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty.charAt(0).toUpperCase() +
                          question.difficulty.slice(1)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {question.estimatedTime} min
                      </span>
                      <span className="text-gray-400 text-sm">
                        {question.completionRate || 0}% completed
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {question.companies?.slice(0, 2).map((company, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                        >
                          {company}
                        </span>
                      ))}
                      {question.companies && question.companies.length > 2 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          +{question.companies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {sortedQuestions.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p>No questions found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-blue-400 hover:text-blue-300"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div
            className={`${showFilters ? 'block' : 'hidden md:block'} w-80 space-y-6`}
          >
            {/* Topics Filter */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Filter by Topics</h3>
              <div className="space-y-3">
                <select
                  value=""
                  onChange={e => {
                    const topic = e.target.value;
                    if (topic && !selectedTopics.includes(topic)) {
                      toggleTopic(topic);
                    }
                    e.target.value = ''; // Reset dropdown
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a topic to add...</option>
                  {availableTopics
                    .filter(topic => !selectedTopics.includes(topic))
                    .slice(0, 50)
                    .map(topic => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                </select>

                {selectedTopics.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">
                      Selected topics:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopics.map(topic => (
                        <span
                          key={topic}
                          className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                        >
                          {topic}
                          <button
                            onClick={() => toggleTopic(topic)}
                            className="ml-1 text-blue-200 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Companies Filter */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">
                Filter by Companies
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableCompanies.map(company => (
                  <label
                    key={company}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company)}
                      onChange={() => toggleCompany(company)}
                      className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{company}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Difficulty</h3>
              <div className="space-y-2">
                {['all', 'easy', 'medium', 'hard'].map(difficulty => (
                  <label
                    key={difficulty}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty}
                      checked={selectedDifficulty === difficulty}
                      onChange={e => setSelectedDifficulty(e.target.value)}
                      className="border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-300 capitalize">
                      {difficulty}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
