'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GitTip {
  id: string;
  title: string;
  description: string;
  command: string;
  explanation: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const gitTips: GitTip[] = [
  // Beginner Tips
  {
    id: 'init',
    title: 'Initialize a Git Repository',
    description: 'Start tracking changes in your project',
    command: 'git init',
    explanation:
      'Creates a new Git repository in the current directory. This is the first command you run when starting a new project.',
    category: 'beginner',
    tags: ['setup', 'repository'],
  },
  {
    id: 'clone',
    title: 'Clone a Repository',
    description: 'Download a repository from a remote source',
    command: 'git clone <repository-url>',
    explanation:
      'Downloads a complete copy of a repository from GitHub, GitLab, or other remote sources. Creates a local copy with all history.',
    category: 'beginner',
    tags: ['setup', 'remote'],
  },
  {
    id: 'add',
    title: 'Stage Changes',
    description: 'Prepare files for commit',
    command: 'git add <filename>',
    explanation:
      "Stages changes to be included in the next commit. Use 'git add .' to stage all changes, or specify individual files.",
    category: 'beginner',
    tags: ['staging', 'commit'],
  },
  {
    id: 'commit',
    title: 'Commit Changes',
    description: 'Save your changes with a message',
    command: 'git commit -m "Your commit message"',
    explanation:
      'Creates a snapshot of your staged changes with a descriptive message. Good commit messages explain what and why, not how.',
    category: 'beginner',
    tags: ['commit', 'history'],
  },
  {
    id: 'status',
    title: 'Check Repository Status',
    description: "See what's changed in your repository",
    command: 'git status',
    explanation:
      'Shows the current state of your repository, including staged changes, unstaged changes, and untracked files.',
    category: 'beginner',
    tags: ['status', 'information'],
  },
  {
    id: 'log',
    title: 'View Commit History',
    description: 'See all commits in your repository',
    command: 'git log',
    explanation:
      "Displays the commit history with details like author, date, and commit messages. Use 'git log --oneline' for a compact view.",
    category: 'beginner',
    tags: ['history', 'information'],
  },

  // Intermediate Tips
  {
    id: 'branch',
    title: 'Create and Switch Branches',
    description: 'Work on features without affecting main code',
    command:
      'git branch <branch-name>\ngit checkout <branch-name>\n# or: git checkout -b <branch-name>',
    explanation:
      'Branches allow you to work on features in isolation. Create a new branch, make changes, then merge back to main when ready.',
    category: 'intermediate',
    tags: ['branching', 'workflow'],
  },
  {
    id: 'merge',
    title: 'Merge Branches',
    description: 'Combine changes from different branches',
    command: 'git merge <branch-name>',
    explanation:
      'Integrates changes from one branch into another. Usually done to bring feature branch changes into main branch.',
    category: 'intermediate',
    tags: ['merging', 'workflow'],
  },
  {
    id: 'pull',
    title: 'Pull Latest Changes',
    description: 'Download and merge remote changes',
    command: 'git pull origin <branch-name>',
    explanation:
      "Downloads the latest changes from the remote repository and merges them into your current branch. Equivalent to 'git fetch' + 'git merge'.",
    category: 'intermediate',
    tags: ['remote', 'collaboration'],
  },
  {
    id: 'push',
    title: 'Push Changes to Remote',
    description: 'Upload your commits to remote repository',
    command: 'git push origin <branch-name>',
    explanation:
      'Uploads your local commits to the remote repository, making them available to other team members.',
    category: 'intermediate',
    tags: ['remote', 'collaboration'],
  },
  {
    id: 'stash',
    title: 'Stash Changes',
    description: 'Temporarily save changes without committing',
    command: 'git stash\ngit stash pop',
    explanation:
      "Saves your current changes in a temporary area so you can switch branches or pull changes. Use 'git stash pop' to restore them.",
    category: 'intermediate',
    tags: ['workflow', 'temporary'],
  },
  {
    id: 'reset',
    title: 'Reset Changes',
    description: 'Undo commits or unstage changes',
    command: 'git reset --soft HEAD~1\ngit reset --hard HEAD~1',
    explanation:
      'Undoes commits. --soft keeps changes staged, --hard discards changes completely. Be careful with --hard!',
    category: 'intermediate',
    tags: ['undo', 'history'],
  },

  // Advanced Tips
  {
    id: 'rebase',
    title: 'Rebase Branches',
    description: 'Replay commits on top of another branch',
    command: 'git rebase <base-branch>',
    explanation:
      'Moves your commits to the tip of another branch, creating a linear history. Useful for keeping feature branches up to date.',
    category: 'advanced',
    tags: ['rebase', 'history', 'workflow'],
  },
  {
    id: 'cherry-pick',
    title: 'Cherry-pick Commits',
    description: 'Apply specific commits to current branch',
    command: 'git cherry-pick <commit-hash>',
    explanation:
      'Applies a specific commit from another branch to your current branch. Useful for backporting fixes or features.',
    category: 'advanced',
    tags: ['cherry-pick', 'selective'],
  },
  {
    id: 'reflog',
    title: 'Reference Log',
    description: 'View all Git operations history',
    command: 'git reflog',
    explanation:
      'Shows a log of all Git operations, including commits, merges, resets, etc. Useful for recovering lost commits.',
    category: 'advanced',
    tags: ['recovery', 'history'],
  },
  {
    id: 'bisect',
    title: 'Binary Search for Bugs',
    description: 'Find which commit introduced a bug',
    command: 'git bisect start\ngit bisect bad\ngit bisect good <commit-hash>',
    explanation:
      'Uses binary search to find the exact commit that introduced a bug. Git will checkout commits for you to test.',
    category: 'advanced',
    tags: ['debugging', 'bisect'],
  },
  {
    id: 'submodule',
    title: 'Git Submodules',
    description: 'Include other repositories in your project',
    command:
      'git submodule add <repository-url>\ngit submodule update --init --recursive',
    explanation:
      'Allows you to include other Git repositories as subdirectories in your project. Useful for shared libraries or components.',
    category: 'advanced',
    tags: ['submodules', 'dependencies'],
  },
  {
    id: 'hooks',
    title: 'Git Hooks',
    description: 'Automate actions on Git events',
    command: '.git/hooks/pre-commit\n.git/hooks/post-merge',
    explanation:
      'Scripts that run automatically on Git events like commit, push, merge. Useful for running tests, linting, or other checks.',
    category: 'advanced',
    tags: ['automation', 'hooks'],
  },
];

export default function GitTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTips = gitTips.filter(tip => {
    const matchesCategory =
      selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Git Tips & Tricks
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Master Git from beginner to advanced with practical commands and
              explanations
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {gitTips.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Tips
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {gitTips.filter(tip => tip.category === 'beginner').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Beginner
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {
                    gitTips.filter(tip => tip.category === 'intermediate')
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Intermediate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {gitTips.filter(tip => tip.category === 'advanced').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Advanced
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search Git tips..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map(category => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category as
                        | 'all'
                        | 'beginner'
                        | 'intermediate'
                        | 'advanced'
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map(tip => (
            <div
              key={tip.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tip.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(tip.category)}`}
                >
                  {tip.category}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {tip.description}
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <code className="text-sm text-gray-900 dark:text-gray-100 font-mono break-all">
                  {tip.command}
                </code>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {tip.explanation}
              </p>

              <div className="flex flex-wrap gap-2">
                {tip.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No Git tips found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
