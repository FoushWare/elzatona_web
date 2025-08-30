"use client";

import { useState } from "react";
import Link from "next/link";

const behavioralQuestions = [
  {
    id: 1,
    question: "Describe the STAR method for behavioral interviews.",
    answer: "STAR stands for Situation, Task, Action, Result. Describe a specific situation, explain your task/responsibility, detail the actions you took, and share the results/outcomes. This structured approach helps provide comprehensive answers.",
    category: "Interview Method",
    difficulty: "Beginner"
  },
  {
    id: 2,
    question: "Tell me about a time you had to learn a new technology quickly.",
    answer: "Use STAR method: Describe the situation (new project requirement), your task (implement feature with unfamiliar tech), actions (research, tutorials, pair programming), and results (successful delivery, improved skills).",
    category: "Learning",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    question: "How do you handle disagreements with team members?",
    answer: "Focus on collaboration, active listening, finding common ground, and data-driven decisions. Emphasize maintaining professional relationships and focusing on project success over personal preferences.",
    category: "Teamwork",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    question: "Describe a challenging bug you had to debug.",
    answer: "Explain your systematic approach: reproducing the issue, checking logs, using debugging tools, isolating the problem, testing solutions, and documenting the fix. Show problem-solving and persistence.",
    category: "Problem Solving",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    question: "How do you stay updated with frontend technologies?",
    answer: "Follow industry blogs, attend conferences, participate in online communities, contribute to open source, take courses, read documentation, and experiment with new technologies in side projects.",
    category: "Growth",
    difficulty: "Beginner"
  },
  {
    id: 6,
    question: "Tell me about a project where you had to work with a tight deadline.",
    answer: "Describe how you prioritized tasks, communicated with stakeholders, managed scope, used efficient development practices, and delivered quality results under pressure. Show time management skills.",
    category: "Time Management",
    difficulty: "Intermediate"
  },
  {
    id: 7,
    question: "How do you approach code reviews?",
    answer: "Focus on constructive feedback, code quality, best practices, security, performance, and maintainability. Be respectful, specific, and helpful. Also mention how you handle receiving feedback.",
    category: "Code Quality",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    question: "Describe a time you had to mentor a junior developer.",
    answer: "Explain your approach to teaching, providing guidance, setting expectations, giving constructive feedback, and helping them grow. Show leadership and communication skills.",
    category: "Leadership",
    difficulty: "Advanced"
  },
  {
    id: 9,
    question: "How do you handle scope creep in projects?",
    answer: "Document requirements clearly, communicate with stakeholders, assess impact on timeline/budget, propose alternatives, and maintain focus on project goals. Show project management skills.",
    category: "Project Management",
    difficulty: "Intermediate"
  },
  {
    id: 10,
    question: "Tell me about a time you failed and what you learned from it.",
    answer: "Choose a genuine example, explain what went wrong, your role in the failure, what you learned, and how you've applied those lessons. Show humility, growth mindset, and resilience.",
    category: "Growth",
    difficulty: "Intermediate"
  }
];

export default function BehavioralPracticePage() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleQuestionClick = (questionId: number) => {
    if (selectedQuestion === questionId) {
      setShowAnswer(!showAnswer);
    } else {
      setSelectedQuestion(questionId);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-6">
            <Link 
              href="/preparation-guides" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Preparation Guides
            </Link>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              🎭 Behavioral Practice Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Master behavioral interviews with these essential questions and techniques
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {behavioralQuestions.length} Questions
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                Beginner to Advanced
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                STAR Method & Leadership
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {behavioralQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleQuestionClick(question.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                        {question.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        question.difficulty === 'Beginner' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : question.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {question.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {question.question}
                    </h3>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ml-4 flex-shrink-0 ${
                      selectedQuestion === question.id && showAnswer ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {selectedQuestion === question.id && showAnswer && (
                <div className="border-t border-border p-6 bg-muted/20">
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Answer
                    </h4>
                    <p className="text-foreground leading-relaxed">
                      {question.answer}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/study-plans"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      📅 Study Plan
                    </Link>
                    <Link
                      href="https://www.indeed.com/career-advice/interviewing/star-method-interview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      📚 STAR Method Guide
                    </Link>
                    <Link
                      href="/practice/fundamentals"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      🔄 More Questions
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for More Practice?</h2>
          <p className="text-blue-100 mb-6">
            Continue your learning journey with related topics
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/practice/fundamentals/javascript"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              ⚡ Technical Questions
            </Link>
            <Link
              href="/study-plans"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              📅 Study Plans
            </Link>
            <Link
              href="/preparation-guides"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              📚 Preparation Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
