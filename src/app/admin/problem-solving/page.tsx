// v1.0 - Admin page for managing problem solving tasks

'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Play, Code } from 'lucide-react';
import ClientCodeRunner, {
  TestCase,
} from '@/shared/components/admin/ClientCodeRunner';
import { ProblemSolvingTask, ProblemSolvingTaskFormData } from '@/types/admin';

export default function ProblemSolvingAdminPage() {
  const [tasks, setTasks] = useState<ProblemSolvingTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ProblemSolvingTask | null>(
    null
  );
  const [viewingTask, setViewingTask] = useState<ProblemSolvingTask | null>(
    null
  );
  const [testingTask, setTestingTask] = useState<ProblemSolvingTask | null>(
    null
  );

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);

      const response = await fetch(`/api/admin/problem-solving?${params}`);
      const data = await response.json();

      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Delete task
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/admin/problem-solving/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const categories = [
    'Arrays',
    'Strings',
    'Linked Lists',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Sorting',
    'Searching',
    'Math',
    'Hash Tables',
    'Stacks & Queues',
    'Greedy',
    'Backtracking',
    'Bit Manipulation',
  ];
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Problem Solving Tasks</h1>
            <p className="text-gray-400 mt-2">
              Manage algorithmic coding challenges
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No tasks found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Difficulty</th>
                    <th className="text-left p-4">Function</th>
                    <th className="text-left p-4">Test Cases</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr
                      key={task.id}
                      className="border-t border-gray-700 hover:bg-gray-750"
                    >
                      <td className="p-4">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {task.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-600 text-xs rounded">
                          {task.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            task.difficulty === 'easy'
                              ? 'bg-green-600'
                              : task.difficulty === 'medium'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                          }`}
                        >
                          {task.difficulty}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-sm">
                        {task.functionName}
                      </td>
                      <td className="p-4">{task.testCases.length}</td>
                      <td className="p-4 text-sm text-gray-400">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewingTask(task)}
                            className="p-1 text-gray-400 hover:text-blue-400"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setTestingTask(task)}
                            className="p-1 text-gray-400 hover:text-green-400"
                            title="Test"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingTask(task)}
                            className="p-1 text-gray-400 hover:text-yellow-400"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="p-1 text-gray-400 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {(showCreateModal || editingTask) && (
          <ProblemSolvingTaskModal
            task={editingTask}
            onClose={() => {
              setShowCreateModal(false);
              setEditingTask(null);
            }}
            onSave={() => {
              fetchTasks();
              setShowCreateModal(false);
              setEditingTask(null);
            }}
          />
        )}

        {/* View Modal */}
        {viewingTask && (
          <ProblemSolvingTaskViewModal
            task={viewingTask}
            onClose={() => setViewingTask(null)}
          />
        )}

        {/* Test Modal */}
        {testingTask && (
          <ProblemSolvingTestModal
            task={testingTask}
            onClose={() => setTestingTask(null)}
          />
        )}
      </div>
    </div>
  );
}

// Problem Solving Task Modal Component
function ProblemSolvingTaskModal({
  task,
  onClose,
  onSave,
}: {
  task: ProblemSolvingTask | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState<ProblemSolvingTaskFormData>({
    title: '',
    description: '',
    difficulty: 'easy',
    category: '',
    functionName: '',
    starterCode: '',
    solution: '',
    testCases: [{ id: 't1', input: [], expected: null }],
    constraints: [''],
    examples: [{ input: '', output: '', explanation: '' }],
    tags: [],
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        difficulty: task.difficulty,
        category: task.category,
        functionName: task.functionName,
        starterCode: task.starterCode,
        solution: task.solution,
        testCases: task.testCases,
        constraints: task.constraints,
        examples: task.examples,
        tags: task.tags,
      });
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = task
        ? `/api/admin/problem-solving/${task.id}`
        : '/api/admin/problem-solving';
      const method = task ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const addTestCase = () => {
    const newId = `t${formData.testCases.length + 1}`;
    setFormData({
      ...formData,
      testCases: [
        ...formData.testCases,
        { id: newId, input: [], expected: null },
      ],
    });
  };

  const removeTestCase = (index: number) => {
    setFormData({
      ...formData,
      testCases: formData.testCases.filter((_, i) => i !== index),
    });
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: any) => {
    const updated = [...formData.testCases];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, testCases: updated });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={e =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value as any,
                  })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Function Name
              </label>
              <input
                type="text"
                value={formData.functionName}
                onChange={e =>
                  setFormData({ ...formData, functionName: e.target.value })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Starter Code
            </label>
            <textarea
              value={formData.starterCode}
              onChange={e =>
                setFormData({ ...formData, starterCode: e.target.value })
              }
              rows={6}
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Solution</label>
            <textarea
              value={formData.solution}
              onChange={e =>
                setFormData({ ...formData, solution: e.target.value })
              }
              rows={6}
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded font-mono"
              required
            />
          </div>

          {/* Test Cases */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Test Cases</label>
              <button
                type="button"
                onClick={addTestCase}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              >
                Add Test Case
              </button>
            </div>
            <div className="space-y-2">
              {formData.testCases.map((testCase, index) => (
                <div
                  key={testCase.id}
                  className="flex gap-2 items-center p-2 bg-gray-700 rounded"
                >
                  <input
                    type="text"
                    placeholder="Input (JSON array)"
                    value={JSON.stringify(testCase.input)}
                    onChange={e => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateTestCase(index, 'input', parsed);
                      } catch {
                        // Invalid JSON, keep as is
                      }
                    }}
                    className="flex-1 p-2 bg-gray-600 border border-gray-500 rounded text-sm font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Expected (JSON)"
                    value={JSON.stringify(testCase.expected)}
                    onChange={e => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateTestCase(index, 'expected', parsed);
                      } catch {
                        // Invalid JSON, keep as is
                      }
                    }}
                    className="flex-1 p-2 bg-gray-600 border border-gray-500 rounded text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Problem Solving Task View Modal Component
function ProblemSolvingTaskViewModal({
  task,
  onClose,
}: {
  task: ProblemSolvingTask;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="px-2 py-1 bg-blue-600 text-xs rounded">
              {task.category}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded ${
                task.difficulty === 'easy'
                  ? 'bg-green-600'
                  : task.difficulty === 'medium'
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
              }`}
            >
              {task.difficulty}
            </span>
            <span className="text-sm text-gray-400">
              Function: {task.functionName}
            </span>
          </div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-300">{task.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Starter Code</h3>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
              <code>{task.starterCode}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">Solution</h3>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
              <code>{task.solution}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">Test Cases</h3>
            <div className="space-y-2">
              {task.testCases.map((testCase, index) => (
                <div key={testCase.id} className="bg-gray-700 p-3 rounded">
                  <div className="text-sm">
                    <span className="text-gray-400">Input:</span>{' '}
                    {JSON.stringify(testCase.input)}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Expected:</span>{' '}
                    {JSON.stringify(testCase.expected)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Problem Solving Test Modal Component
function ProblemSolvingTestModal({
  task,
  onClose,
}: {
  task: ProblemSolvingTask;
  onClose: () => void;
}) {
  const [useSolution, setUseSolution] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Test: {task.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={useSolution}
                onChange={e => setUseSolution(e.target.checked)}
              />
              Run solution instead of starter (for verification)
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Live Test Runner
            </label>
            <ClientCodeRunner
              functionName={task.functionName}
              userCode={useSolution ? task.solution : task.starterCode}
              testCases={task.testCases}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
