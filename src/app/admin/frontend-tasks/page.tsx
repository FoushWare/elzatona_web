// v1.0 - Admin page for managing frontend tasks

'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { FrontendTask, FrontendTaskFormData } from '@/types/admin';

export default function FrontendTasksAdminPage() {
  const [tasks, setTasks] = useState<FrontendTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<FrontendTask | null>(null);
  const [viewingTask, setViewingTask] = useState<FrontendTask | null>(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);

      const response = await fetch(`/api/admin/frontend-tasks?${params}`);
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
      const response = await fetch(`/api/admin/frontend-tasks/${id}`, {
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
    'React',
    'JavaScript',
    'TypeScript',
    'CSS',
    'HTML',
    'Vue.js',
    'Angular',
    'Svelte',
  ];
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Frontend Tasks</h1>
            <p className="text-gray-400 mt-2">
              Manage React and frontend coding challenges
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
                    <th className="text-left p-4">Time</th>
                    <th className="text-left p-4">Author</th>
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
                      <td className="p-4">{task.estimatedTime}min</td>
                      <td className="p-4">{task.author}</td>
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
          <FrontendTaskModal
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
          <FrontendTaskViewModal
            task={viewingTask}
            onClose={() => setViewingTask(null)}
          />
        )}
      </div>
    </div>
  );
}

// Frontend Task Modal Component
function FrontendTaskModal({
  task,
  onClose,
  onSave,
}: {
  task: FrontendTask | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState<FrontendTaskFormData>({
    title: '',
    description: '',
    difficulty: 'easy',
    category: '',
    estimatedTime: 30,
    author: '',
    company: '',
    requirements: '',
    hints: [''],
    solution: '',
    starterCode: '',
    tags: [],
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        difficulty: task.difficulty,
        category: task.category,
        estimatedTime: task.estimatedTime,
        author: task.author,
        company: task.company || '',
        requirements: task.requirements,
        hints: task.hints,
        solution: task.solution,
        starterCode: task.starterCode,
        tags: task.tags,
      });
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = task
        ? `/api/admin/frontend-tasks/${task.id}`
        : '/api/admin/frontend-tasks';
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-3 gap-4">
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
                Estimated Time (min)
              </label>
              <input
                type="number"
                value={formData.estimatedTime}
                onChange={e =>
                  setFormData({
                    ...formData,
                    estimatedTime: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={e =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Requirements
            </label>
            <textarea
              value={formData.requirements}
              onChange={e =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              rows={4}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
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
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Starter Code
            </label>
            <textarea
              value={formData.starterCode}
              onChange={e =>
                setFormData({
                  ...formData,
                  starterCode: e.target.value,
                })
              }
              rows={8}
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded font-mono"
              required
            />
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

// Frontend Task View Modal Component
function FrontendTaskViewModal({
  task,
  onClose,
}: {
  task: FrontendTask;
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
              {task.estimatedTime} minutes
            </span>
          </div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-300">{task.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Requirements</h3>
            <p className="text-gray-300 whitespace-pre-wrap">
              {task.requirements}
            </p>
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
        </div>
      </div>
    </div>
  );
}
