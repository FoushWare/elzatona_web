'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Code,
  Info,
  GitBranch,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default function GitWorktreeBlogPost() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-sm font-medium rounded-full">
                Git
              </span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400">
                15 min read
              </span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400">
                January 15, 2024
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What is Git Worktree and How to Make Use of It
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A comprehensive guide to Git worktrees - the powerful feature that
              allows you to work on multiple branches simultaneously without
              stashing or committing incomplete work.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span>KodDev Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert max-w-none">
          {/* Table of Contents */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="#what-is-worktree"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  What is Git Worktree?
                </a>
              </li>
              <li>
                <a
                  href="#why-use-worktree"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Why Use Git Worktree?
                </a>
              </li>
              <li>
                <a
                  href="#basic-commands"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Basic Worktree Commands
                </a>
              </li>
              <li>
                <a
                  href="#practical-examples"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Practical Examples
                </a>
              </li>
              <li>
                <a
                  href="#advanced-usage"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Advanced Usage Patterns
                </a>
              </li>
            </ul>
          </div>

          {/* What is Git Worktree */}
          <section id="what-is-worktree">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-blue-500" />
              What is Git Worktree?
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Git worktree is a feature that allows you to check out multiple
              branches simultaneously in different directories. Unlike the
              traditional Git workflow where you can only have one branch
              checked out at a time, worktrees enable you to work on multiple
              branches without switching between them.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Key Concept
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    A worktree is essentially a separate working directory that
                    points to a specific branch. You can have multiple
                    worktrees, each pointing to different branches, allowing you
                    to work on multiple features simultaneously.
                  </p>
                </div>
              </div>
            </div>

            {/* Worktree Diagram */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Worktree Structure Diagram
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 font-mono text-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-blue-600 dark:text-blue-400">
                      📁 Project Root
                    </span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-600 dark:text-green-400">
                      main branch (primary worktree)
                    </span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-purple-600 dark:text-purple-400">
                        📁 feature-branch/
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-600 dark:text-green-400">
                        feature-branch (linked worktree)
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-600 dark:text-purple-400">
                        📁 hotfix-branch/
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-600 dark:text-green-400">
                        hotfix-branch (linked worktree)
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-600 dark:text-purple-400">
                        📁 experimental/
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-600 dark:text-green-400">
                        experimental-branch (linked worktree)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use Git Worktree */}
          <section id="why-use-worktree">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Use Git Worktree?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Advantages
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Work on multiple features simultaneously</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
