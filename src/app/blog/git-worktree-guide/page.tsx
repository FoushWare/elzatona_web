'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  GitBranch,
  Code,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

export default function GitWorktreeBlogPost() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
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
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">15 min read</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">January 15, 2024</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What is Git Worktree and How to Make Use of It
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              A comprehensive guide to Git worktrees - the powerful feature that
              allows you to work on multiple branches simultaneously without
              stashing or committing incomplete work.
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-muted-foreground">
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
              <li>
                <a
                  href="#best-practices"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Best Practices
                </a>
              </li>
              <li>
                <a
                  href="#troubleshooting"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Troubleshooting
                </a>
              </li>
            </ul>
          </div>

          {/* What is Git Worktree */}
          <section id="what-is-worktree">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-blue-500" />
              What is Git Worktree?
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
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
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
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
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Why Use Git Worktree?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Advantages
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Work on multiple features simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>No need to stash incomplete work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Faster context switching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Better for code reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Ideal for hotfixes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Considerations
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span>Disk space usage (each worktree is a full copy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span>
                      Potential for confusion with multiple directories
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span>Need to manage worktree lifecycle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span>Some Git operations require coordination</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Basic Commands */}
          <section id="basic-commands">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Basic Worktree Commands
            </h2>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  1. List Worktrees
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code>git worktree list</code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Shows all worktrees and their associated branches and paths.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  2. Add a New Worktree
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code>git worktree add ../feature-branch feature-branch</code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Creates a new worktree for the specified branch in the
                  specified directory.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  3. Create and Checkout New Branch
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code>
                    git worktree add -b new-feature ../new-feature main
                  </code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Creates a new branch from main and sets up a worktree for it.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  4. Remove a Worktree
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code>git worktree remove ../feature-branch</code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Removes the worktree and its directory. The branch remains in
                  the repository.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  5. Prune Worktrees
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code>git worktree prune</code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Removes references to deleted worktree directories.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Examples */}
          <section id="practical-examples">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Practical Examples
            </h2>

            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Example 1: Feature Development Workflow
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div># Start with main branch</div>
                    <div>git checkout main</div>
                    <div>git pull origin main</div>
                    <br />
                    <div># Create worktree for new feature</div>
                    <div>git worktree add -b user-auth ../user-auth main</div>
                    <br />
                    <div># Create worktree for bug fix</div>
                    <div>git worktree add -b bug-fix ../bug-fix main</div>
                    <br />
                    <div># Now you can work on both simultaneously</div>
                    <div># Main: ../project-root/</div>
                    <div># Feature: ../user-auth/</div>
                    <div># Bug fix: ../bug-fix/</div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Workflow Benefits:
                    </h4>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Work on user authentication in one directory</li>
                      <li>• Fix critical bugs in another directory</li>
                      <li>• Keep main branch clean for other tasks</li>
                      <li>• Easy to switch between tasks without stashing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Example 2: Hotfix Scenario
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div># Production issue discovered</div>
                    <div>
                      git worktree add -b hotfix/security-patch ../hotfix
                      production
                    </div>
                    <br />
                    <div># Fix the issue in hotfix worktree</div>
                    <div>cd ../hotfix</div>
                    <div># ... make changes ...</div>
                    <div>git add .</div>
                    <div>
                      git commit -m &quot;Fix security vulnerability&quot;
                    </div>
                    <br />
                    <div># Continue working on main feature</div>
                    <div>cd ../project-root</div>
                    <div># ... continue development ...</div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Hotfix Advantages:
                    </h4>
                    <ul className="text-green-700 dark:text-green-300 space-y-1">
                      <li>• Immediate response to production issues</li>
                      <li>• No interruption to ongoing development</li>
                      <li>• Clean separation of concerns</li>
                      <li>• Easy to merge and deploy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Usage */}
          <section id="advanced-usage">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Advanced Usage Patterns
            </h2>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Temporary Worktrees
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div># Create temporary worktree for quick testing</div>
                  <div>git worktree add --detach ../temp-test HEAD</div>
                  <br />
                  <div>
                    # Worktree is automatically removed when you&apos;re done
                  </div>
                  <div>cd ../temp-test</div>
                  <div># ... test something ...</div>
                  <div>cd ../project-root</div>
                  <div>git worktree remove ../temp-test</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Worktree with Specific Commit
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div># Create worktree pointing to specific commit</div>
                  <div>git worktree add --detach ../debug-commit abc1234</div>
                  <br />
                  <div># Useful for debugging specific versions</div>
                  <div>cd ../debug-commit</div>
                  <div># ... debug the specific commit ...</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Worktree Locking
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div># Lock a worktree to prevent accidental removal</div>
                  <div>git worktree lock ../important-feature</div>
                  <br />
                  <div># Unlock when done</div>
                  <div>git worktree unlock ../important-feature</div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Do&apos;s
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Use descriptive directory names</li>
                  <li>• Keep worktrees organized in a parent directory</li>
                  <li>• Regularly clean up unused worktrees</li>
                  <li>• Use worktrees for active development only</li>
                  <li>• Coordinate with team members</li>
                  <li>• Lock important worktrees</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Don&apos;ts
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Don&apos;t create too many worktrees</li>
                  <li>• Don&apos;t forget to remove worktrees</li>
                  <li>
                    • Don&apos;t modify the same files in multiple worktrees
                  </li>
                  <li>• Don&apos;t ignore worktree management</li>
                  <li>• Don&apos;t use worktrees for long-term storage</li>
                  <li>• Don&apos;t forget to sync with remote</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Troubleshooting
            </h2>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Common Issues and Solutions
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Issue: &quot;worktree is dirty&quot;
                    </h4>
                    <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div># Commit or stash changes before removing</div>
                      <div>
                        git add . && git commit -m &quot;Save changes&quot;
                      </div>
                      <div>git worktree remove ../worktree-name</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Issue: &quot;worktree already exists&quot;
                    </h4>
                    <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div># Remove existing worktree first</div>
                      <div>git worktree remove ../worktree-name</div>
                      <div># Or use force flag</div>
                      <div>
                        git worktree add --force ../worktree-name branch-name
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Issue: &quot;branch is already checked out&quot;
                    </h4>
                    <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div># Check where the branch is checked out</div>
                      <div>git worktree list</div>
                      <div>
                        # Remove the existing worktree or use different branch
                      </div>
                      <div>git worktree remove ../existing-worktree</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Conclusion
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Git worktrees are a powerful feature that can significantly
              improve your development workflow. They allow you to work on
              multiple branches simultaneously, handle hotfixes efficiently, and
              maintain a clean development environment. By following the best
              practices outlined in this guide, you can leverage worktrees to
              boost your productivity and streamline your Git workflow.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/practice/fundamentals"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Practice Git Fundamentals
              </Link>
              <Link
                href="/blog"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Explore More Articles
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
