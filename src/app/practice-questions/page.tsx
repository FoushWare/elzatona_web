"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: "coding" | "system-design" | "quiz";
  subcategory: string;
  tags: string[];
  frameworks: string[];
  estimatedTime: number; // in minutes
  completionRate?: number;
  companies?: string[];
  isCompleted?: boolean;
}

// Sample questions data - this would be expanded with real data
const sampleQuestions: Question[] = [
  {
    id: "js-functions-1",
    title: "Implement debounce function",
    description: "Create a debounce function that delays the execution of a function until after a specified wait time has elapsed since the last time it was invoked.",
    difficulty: "medium",
    category: "coding",
    subcategory: "JavaScript functions",
    tags: ["JavaScript", "Functions", "Performance"],
    frameworks: ["Vanilla JS"],
    estimatedTime: 30,
    completionRate: 85,
    companies: ["Google", "Facebook", "Amazon"]
  },
  {
    id: "ui-coding-1",
    title: "Build a responsive navigation bar",
    description: "Create a responsive navigation bar that collapses into a hamburger menu on mobile devices with smooth animations.",
    difficulty: "easy",
    category: "coding",
    subcategory: "User interface coding",
    tags: ["CSS", "HTML", "Responsive Design"],
    frameworks: ["Vanilla JS", "React"],
    estimatedTime: 45,
    completionRate: 92,
    companies: ["Apple", "Microsoft"]
  },
  {
    id: "algo-coding-1",
    title: "Implement binary search",
    description: "Write a binary search algorithm to find a target element in a sorted array with O(log n) time complexity.",
    difficulty: "medium",
    category: "coding",
    subcategory: "Algorithmic coding",
    tags: ["Algorithms", "Search", "Arrays"],
    frameworks: ["Vanilla JS"],
    estimatedTime: 25,
    completionRate: 78,
    companies: ["Google", "Microsoft", "Amazon"]
  },
  {
    id: "system-design-1",
    title: "Design an autocomplete system",
    description: "Design a system that provides autocomplete suggestions as users type, similar to Google's search suggestions.",
    difficulty: "hard",
    category: "system-design",
    subcategory: "Search systems",
    tags: ["System Design", "Search", "Performance"],
    frameworks: ["React", "Node.js"],
    estimatedTime: 60,
    completionRate: 65,
    companies: ["Google", "Amazon"]
  },
  {
    id: "quiz-1",
    title: "JavaScript hoisting explained",
    description: "Explain how hoisting works in JavaScript and provide examples of variable and function hoisting.",
    difficulty: "easy",
    category: "quiz",
    subcategory: "JavaScript fundamentals",
    tags: ["JavaScript", "Hoisting", "Scope"],
    frameworks: ["Vanilla JS"],
    estimatedTime: 15,
    completionRate: 88,
    companies: ["Facebook", "Netflix"]
  },
  {
    id: "js-functions-2",
    title: "Implement throttle function",
    description: "Create a throttle function that limits the rate at which a function can be called.",
    difficulty: "medium",
    category: "coding",
    subcategory: "JavaScript functions",
    tags: ["JavaScript", "Functions", "Performance"],
    frameworks: ["Vanilla JS"],
    estimatedTime: 35,
    completionRate: 72,
    companies: ["Google", "Uber"]
  },
  {
    id: "ui-coding-2",
    title: "Create a modal component",
    description: "Build a reusable modal component with backdrop, close functionality, and keyboard navigation support.",
    difficulty: "medium",
    category: "coding",
    subcategory: "User interface coding",
    tags: ["React", "Accessibility", "UI Components"],
    frameworks: ["React"],
    estimatedTime: 40,
    completionRate: 81,
    companies: ["Facebook", "Airbnb"]
  },
  {
    id: "system-design-2",
    title: "Design a URL shortener",
    description: "Design a URL shortening service like bit.ly that can handle millions of requests per day.",
    difficulty: "medium",
    category: "system-design",
    subcategory: "Web services",
    tags: ["System Design", "Databases", "Scalability"],
    frameworks: ["Node.js", "React"],
    estimatedTime: 50,
    completionRate: 70,
    companies: ["Amazon", "Microsoft"]
  }
];

const topics = [
  "JavaScript", "React", "CSS", "HTML", "OOP", "Arrays", "Functions", 
  "DOM", "Events", "Async", "Promises", "Closures", "Hoisting", 
  "Accessibility", "Performance", "Security", "Testing", "State Management"
];

const companies = [
  "Google", "Amazon", "Facebook", "Apple", "Microsoft", "Netflix", 
  "Airbnb", "Uber", "Twitter", "LinkedIn", "Spotify", "Stripe"
];

export default function PracticeQuestionsPage() {
  const [activeTab, setActiveTab] = useState<"coding" | "system-design" | "quiz">("coding");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "difficulty" | "time" | "completion">("relevance");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let filtered = sampleQuestions.filter(question => {
      // Category filter
      if (question.category !== activeTab) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          question.title.toLowerCase().includes(query) ||
          question.description.toLowerCase().includes(query) ||
          question.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      
      // Topics filter
      if (selectedTopics.length > 0) {
        const hasMatchingTopic = selectedTopics.some(topic => 
          question.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
        );
        if (!hasMatchingTopic) return false;
      }
      
      // Companies filter
      if (selectedCompanies.length > 0) {
        const hasMatchingCompany = selectedCompanies.some(company => 
          question.companies?.includes(company)
        );
        if (!hasMatchingCompany) return false;
      }
      
      // Difficulty filter
      if (selectedDifficulty.length > 0) {
        if (!selectedDifficulty.includes(question.difficulty)) return false;
      }
      
      return true;
    });

    // Sort questions
    switch (sortBy) {
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case "time":
        filtered.sort((a, b) => a.estimatedTime - b.estimatedTime);
        break;
      case "completion":
        filtered.sort((a, b) => (b.completionRate || 0) - (a.completionRate || 0));
        break;
      default: // relevance - keep original order
        break;
    }

    return filtered;
  }, [activeTab, searchQuery, sortBy, selectedTopics, selectedCompanies, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const totalQuestions = sampleQuestions.length;
  const totalHours = Math.round(sampleQuestions.reduce((sum, q) => sum + q.estimatedTime, 0) / 60);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Practice Questions
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Master frontend development with our comprehensive collection of practice questions
            </p>
            
            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Solved by ex-interviewers
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Test cases included
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Code in browser
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalHours}h</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="difficulty">Sort by Difficulty</option>
                    <option value="time">Sort by Time</option>
                    <option value="completion">Sort by Completion Rate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "coding", label: "Coding", count: sampleQuestions.filter(q => q.category === "coding").length },
                    { id: "system-design", label: "System Design", count: sampleQuestions.filter(q => q.category === "system-design").length },
                    { id: "quiz", label: "Quiz", count: sampleQuestions.filter(q => q.category === "quiz").length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Sub-filters */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {activeTab === "coding" && [
                    "JavaScript functions", "User interface coding", "Algorithmic coding"
                  ].map((subcategory) => (
                    <button
                      key={subcategory}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      {subcategory}
                    </button>
                  ))}
                  {activeTab === "system-design" && [
                    "Search systems", "Web services", "Data systems"
                  ].map((subcategory) => (
                    <button
                      key={subcategory}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      {subcategory}
                    </button>
                  ))}
                  {activeTab === "quiz" && [
                    "JavaScript fundamentals", "React concepts", "CSS & HTML"
                  ].map((subcategory) => (
                    <button
                      key={subcategory}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {question.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      {question.isCompleted && (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{question.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>⏱️ {question.estimatedTime} min</span>
                      {question.completionRate && (
                        <span>📊 {question.completionRate}% completed</span>
                      )}
                      {question.companies && question.companies.length > 0 && (
                        <span>🏢 {question.companies.slice(0, 2).join(", ")}{question.companies.length > 2 ? "..." : ""}</span>
                      )}
                    </div>
                    
                    <Link
                      href={`/questions/${question.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Practice
                    </Link>
                  </div>
                </div>
              ))}
              
              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No questions found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Topics */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Topics</h4>
                <div className="space-y-2">
                  {topics.map((topic) => (
                    <label key={topic} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Companies */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Companies</h4>
                <div className="space-y-2">
                  {companies.map((company) => (
                    <label key={company} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company)}
                        onChange={() => toggleCompany(company)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{company}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {["easy", "medium", "hard"].map((difficulty) => (
                    <label key={difficulty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDifficulty.includes(difficulty)}
                        onChange={() => toggleDifficulty(difficulty)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTopics.length > 0 || selectedCompanies.length > 0 || selectedDifficulty.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedTopics([]);
                    setSelectedCompanies([]);
                    setSelectedDifficulty([]);
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
