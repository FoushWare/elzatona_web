'use client';

import { useState } from 'react';
import Link from 'next/link';

const gitQuestions = [
  {
    id: 1,
    question: 'What is the difference between git merge and git rebase?',
    answer:
      'Git merge creates a new commit that combines changes from two branches, preserving the complete history. Git rebase moves commits from one branch to another, creating a linear history by replaying commits on top of the target branch.',
    category: 'Git Workflow',
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    question: 'Explain the concept of Git branching strategy.',
    answer:
      'Git branching strategy defines how teams organize and manage code across different branches. Common strategies include Git Flow (master, develop, feature, release, hotfix branches), GitHub Flow (simpler with main and feature branches), and trunk-based development (single main branch with short-lived feature branches).',
    category: 'Branching',
    difficulty: 'Intermediate',
  },
  {
    id: 3,
    question: 'What are Git hooks and how are they used?',
    answer:
      'Git hooks are scripts that run automatically at certain points in the Git workflow. Common hooks include pre-commit (runs before a commit is created), post-commit (runs after a commit is created), pre-push (runs before pushing to remote), and post-merge (runs after a merge). They are commonly used for running tests, linting code, checking commit message format, and automating deployment processes.',
    category: 'Automation',
    difficulty: 'Advanced',
  },
  {
    id: 4,
    question: 'How do you resolve merge conflicts in Git?',
    answer:
      'To resolve merge conflicts: 1) Identify conflicted files with "git status", 2) Open conflicted files and look for conflict markers (<<<<<<<, =======, >>>>>>>), 3) Edit files to resolve conflicts by choosing which changes to keep, 4) Remove conflict markers, 5) Stage resolved files with "git add", 6) Complete the merge with "git commit".',
    category: 'Conflict Resolution',
    difficulty: 'Beginner',
  },
  {
    id: 5,
    question: 'What is the difference between git reset and git revert?',
    answer:
      'Git reset moves the HEAD and branch pointer to a previous commit, effectively rewriting history. This is destructive and should not be used on commits that have been pushed to a shared repository. Git revert creates a new commit that undoes the changes from a previous commit, preserving history and making it safe for shared repositories.',
    category: 'History Management',
    difficulty: 'Intermediate',
  },
  {
    id: 6,
    question: 'What is Git cherry-pick and when would you use it?',
    answer:
      "Git cherry-pick allows you to apply specific commits from one branch to another. This is useful when you want to bring a specific feature or bug fix from one branch to another without merging the entire branch. It's commonly used in scenarios where you have a hotfix that needs to be applied to multiple release branches.",
    category: 'Advanced Git',
    difficulty: 'Advanced',
  },
  {
    id: 7,
    question: 'Explain Git submodules and their use cases.',
    answer:
      'Git submodules allow you to include other Git repositories as subdirectories within your main repository. They are useful for including third-party libraries, shared components, or documentation that you want to track separately but include in your project. Submodules maintain their own Git history and can be updated independently.',
    category: 'Advanced Git',
    difficulty: 'Advanced',
  },
  {
    id: 8,
    question: 'What is the Git staging area and how does it work?',
    answer:
      'The Git staging area (also called the index) is a temporary storage area where you place changes that you want to include in your next commit. It acts as a buffer between your working directory and the Git repository. You use "git add" to stage changes and "git commit" to commit staged changes to the repository.',
    category: 'Git Basics',
    difficulty: 'Beginner',
  },
  {
    id: 9,
    question: 'How do you create and manage Git tags?',
    answer:
      'Git tags are references to specific points in Git history, typically used to mark release versions. Create a tag with "git tag <tagname>" for a lightweight tag or "git tag -a <tagname> -m <message>" for an annotated tag. Push tags with "git push origin <tagname>" or "git push origin --tags" for all tags.',
    category: 'Version Management',
    difficulty: 'Intermediate',
  },
  {
    id: 10,
    question: 'What is Git bisect and how do you use it?',
    answer:
      'Git bisect is a debugging tool that helps you find which commit introduced a bug. It uses binary search to efficiently narrow down the problematic commit. Start with "git bisect start", mark the current version as bad with "git bisect bad", mark a known good version with "git bisect good <commit>", then Git will checkout commits for you to test.',
    category: 'Debugging',
    difficulty: 'Advanced',
  },
];

export default function GitPracticePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <nav className="mb-8">
            <Link
              href="/preparation-guides"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Preparation Guides
            </Link>
          </nav>

          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl">🌿</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Git Practice Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Master Git fundamentals with these essential interview questions
              covering version control, branching, and collaboration workflows
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-xl text-sm font-bold border-2 border-green-200 dark:border-green-700 shadow-sm">
                {gitQuestions.length} Questions
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                Beginner to Advanced
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-bold border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                Version Control & Collaboration
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {gitQuestions.map(question => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-green-200 dark:border-green-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <button
                onClick={() => handleQuestionClick(question.id)}
                className="w-full p-8 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">
                          {question.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${
                            question.difficulty === 'Beginner'
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                              : question.difficulty === 'Intermediate'
                                ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
                                : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700'
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold border-2 border-blue-200 dark:border-blue-700">
                          {question.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                  <div className="ml-6 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedQuestion === question.id && showAnswer
                          ? 'bg-green-500 text-white rotate-180'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 group-hover:text-green-600 dark:group-hover:text-green-400'
                      }`}
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {selectedQuestion === question.id && showAnswer && (
                <div className="border-t-2 border-green-200 dark:border-green-800 p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center text-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      Answer
                    </h4>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 shadow-md">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {question.answer}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/coding"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      🎯 Practice Coding
                    </Link>
                    <Link
                      href="https://git-scm.com/doc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      📚 Git Docs
                    </Link>
                    <Link
                      href="/practice/fundamentals"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
        <div className="mt-16 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              Ready for More Practice?
            </h2>
            <p className="text-green-100 mb-8 text-lg leading-relaxed">
              Continue your learning journey with related topics and master the
              complete frontend stack
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/practice/fundamentals/html"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 HTML Practice
              </Link>
              <Link
                href="/practice/fundamentals/css"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎨 CSS Practice
              </Link>
              <Link
                href="/practice/fundamentals/javascript"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ⚡ JavaScript Practice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
