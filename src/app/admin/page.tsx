'use client';

import { useState, lazy, Suspense, useMemo } from 'react';
import { Challenge } from '@/types/challenge';
import { sampleChallenges } from '@/lib/challenges';

export default function AdminPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(sampleChallenges);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);

  // Memoize challenge list to prevent unnecessary re-renders
  const challengeList = useMemo(() => challenges, [challenges]);

  const handleDeleteChallenge = (id: string) => {
    if (confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(challenges.filter(challenge => challenge.id !== id));
    }
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setShowAddForm(true);
  };

  const handleAddChallenge = () => {
    setEditingChallenge(null);
    setShowAddForm(true);
  };

  const handleSaveChallenge = (challengeData: Partial<Challenge>) => {
    if (editingChallenge) {
      // Update existing challenge
      setChallenges(
        challenges.map(challenge =>
          challenge.id === editingChallenge.id
            ? { ...challenge, ...challengeData }
            : challenge
        )
      );
    } else {
      // Add new challenge
      const newChallenge: Challenge = {
        id: Date.now().toString(),
        title: challengeData.title || '',
        description: challengeData.description || '',
        category: challengeData.category || 'html',
        difficulty: challengeData.difficulty || 'easy',
        starterCode: challengeData.starterCode || {
          html: '',
          css: '',
          javascript: '',
        },
        testCases: challengeData.testCases || [],
        solution: challengeData.solution || {
          html: '',
          css: '',
          javascript: '',
          explanation: '',
        },
        ...challengeData,
      };
      setChallenges([...challenges, newChallenge]);
    }
    setShowAddForm(false);
    setEditingChallenge(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Challenge Management
          </h1>
          <p className="text-muted-foreground">
            Manage coding challenges, add new ones, and edit existing content.
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={handleAddChallenge}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add New Challenge
          </button>
        </div>

        {showAddForm && (
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-card rounded-lg p-6 border border-border">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-card-foreground">Loading form...</p>
                </div>
              </div>
            }
          >
            <ChallengeForm
              challenge={editingChallenge}
              onSave={handleSaveChallenge}
              onCancel={() => {
                setShowAddForm(false);
                setEditingChallenge(null);
              }}
            />
          </Suspense>
        )}

        <div className="grid gap-6">
          {challengeList.map(challenge => (
            <div
              key={challenge.id}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {challenge.description}
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Category: {challenge.category}</span>
                    <span>Difficulty: {challenge.difficulty}</span>
                    <span>Tests: {challenge.testCases.length}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditChallenge(challenge)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteChallenge(challenge.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ChallengeFormProps {
  challenge?: Challenge | null;
  onSave: (data: Partial<Challenge>) => void;
  onCancel: () => void;
}

function ChallengeForm({ challenge, onSave, onCancel }: ChallengeFormProps) {
  const [formData, setFormData] = useState({
    title: challenge?.title || '',
    description: challenge?.description || '',
    category: challenge?.category || 'html',
    difficulty: challenge?.difficulty || 'easy',
    htmlCode: challenge?.starterCode?.html || '',
    cssCode: challenge?.starterCode?.css || '',
    javascriptCode: challenge?.starterCode?.javascript || '',
    solutionHtml: challenge?.solution?.html || '',
    solutionCss: challenge?.solution?.css || '',
    solutionJavascript: challenge?.solution?.javascript || '',
    explanation: challenge?.solution?.explanation || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      difficulty: formData.difficulty,
      starterCode: {
        html: formData.htmlCode,
        css: formData.cssCode,
        javascript: formData.javascriptCode,
      },
      solution: {
        html: formData.solutionHtml,
        css: formData.solutionCss,
        javascript: formData.solutionJavascript,
        explanation: formData.explanation,
      },
      testCases: challenge?.testCases || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">
            {challenge ? 'Edit Challenge' : 'Add New Challenge'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
                  <option value="react">React</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={e =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Starter HTML
                </label>
                <textarea
                  value={formData.htmlCode}
                  onChange={e =>
                    setFormData({ ...formData, htmlCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-mono text-sm"
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Starter CSS
                </label>
                <textarea
                  value={formData.cssCode}
                  onChange={e =>
                    setFormData({ ...formData, cssCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-mono text-sm"
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Starter JavaScript
                </label>
                <textarea
                  value={formData.javascriptCode}
                  onChange={e =>
                    setFormData({ ...formData, javascriptCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-mono text-sm"
                  rows={8}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Solution HTML
                </label>
                <textarea
                  value={formData.solutionHtml}
                  onChange={e =>
                    setFormData({ ...formData, solutionHtml: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-mono text-sm"
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Solution CSS
                </label>
                <textarea
                  value={formData.solutionCss}
                  onChange={e =>
                    setFormData({ ...formData, solutionCss: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-mono text-sm"
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Solution JavaScript
                </label>
                <textarea
                  value={formData.solutionJavascript}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      solutionJavascript: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-mono text-sm"
                  rows={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Solution Explanation
              </label>
              <textarea
                value={formData.explanation}
                onChange={e =>
                  setFormData({ ...formData, explanation: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                rows={4}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-border rounded-lg text-card-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {challenge ? 'Update Challenge' : 'Add Challenge'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
