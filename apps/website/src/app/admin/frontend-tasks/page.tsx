// v1.0 - Admin page for managing frontend tasks

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Plus, Edit, Trash2, Eye, Search, Filter, Code } from 'lucide-react';
import {
  FrontendTask,
  FrontendTaskFormData,
  FrontendTaskFile,
} from '@/types/admin';
import FrontendTaskEditor from '@/shared/components/admin/FrontendTaskEditor';
import {
  useFrontendTasks,
  useCreateFrontendTask,
  useUpdateFrontendTask,
  useDeleteFrontendTask,
} from '@/hooks/useTanStackQuery';

export default function FrontendTasksAdminPage() {
  // TanStack Query hooks
  const {
    data: tasksData,
    isLoading: tasksLoading,
    error: tasksError,
  } = useFrontendTasks();

  // Mutation hooks
  const createTaskMutation = useCreateFrontendTask();
  const updateTaskMutation = useUpdateFrontendTask();
  const deleteTaskMutation = useDeleteFrontendTask();

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [editingTask, setEditingTask] = useState<FrontendTask | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit' | 'view'>(
    'create'
  );

  // Derived data
  const tasks = tasksData?.data || [];
  const loading = tasksLoading;

  // Filtered tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || task.category === selectedCategory;
      const matchesDifficulty =
        !selectedDifficulty || task.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [tasks, searchTerm, selectedCategory, selectedDifficulty]);

  // CRUD handlers using TanStack Query mutations
  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this task?')) return;

      try {
        await deleteTaskMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    },
    [deleteTaskMutation]
  );

  // Handle editor save
  const handleEditorSave = useCallback(
    async (taskData: FrontendTaskFormData) => {
      try {
        if (editorMode === 'create') {
          await createTaskMutation.mutateAsync(taskData);
        } else if (editingTask?.id) {
          await updateTaskMutation.mutateAsync({
            id: editingTask.id,
            data: taskData,
          });
        }

        setShowEditor(false);
        setEditingTask(null);
      } catch (error) {
        console.error('Error saving task:', error);
        alert('Failed to save task. Please try again.');
      }
    },
    [editorMode, editingTask?.id, createTaskMutation, updateTaskMutation]
  );

  // Handle editor cancel
  const handleEditorCancel = () => {
    setShowEditor(false);
    setEditingTask(null);
  };

  // Open editor for create
  const openCreateEditor = () => {
    setEditorMode('create');
    setEditingTask(null);
    setShowEditor(true);
  };

  // Open editor for edit
  const openEditEditor = (task: FrontendTask) => {
    setEditorMode('edit');
    setEditingTask(task);
    setShowEditor(true);
  };

  // Open editor for view (read-only)
  const openViewEditor = (task: FrontendTask) => {
    setEditorMode('view');
    setEditingTask(task);
    setShowEditor(true);
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
    <>
      <div className='bg-gray-900 text-white p-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='text-3xl font-bold'>Frontend Tasks</h1>
              <p className='text-gray-400 mt-2'>
                Manage React and frontend coding challenges
              </p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={openCreateEditor}
                className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
              >
                <Code className='w-4 h-4' />
                Create Task
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className='bg-gray-800 rounded-lg p-4 mb-6'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='text'
                    placeholder='Search tasks...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500'
                  />
                </div>
              </div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className='px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500'
              >
                <option value=''>All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className='px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500'
              >
                <option value=''>All Difficulties</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tasks Table */}
          <div className='bg-gray-800 rounded-lg overflow-hidden'>
            {loading ? (
              <div className='p-8 text-center text-gray-400'>
                Loading tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className='p-8 text-center text-gray-400'>
                No tasks found
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-700'>
                    <tr>
                      <th className='text-left p-4'>Title</th>
                      <th className='text-left p-4'>Category</th>
                      <th className='text-left p-4'>Difficulty</th>
                      <th className='text-left p-4'>Time</th>
                      <th className='text-left p-4'>Author</th>
                      <th className='text-left p-4'>Created</th>
                      <th className='text-left p-4'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map(task => (
                      <tr
                        key={task.id}
                        className='border-t border-gray-700 hover:bg-gray-750'
                      >
                        <td className='p-4'>
                          <div className='font-medium'>{task.title}</div>
                          <div className='text-sm text-gray-400 truncate max-w-xs'>
                            {task.description}
                          </div>
                        </td>
                        <td className='p-4'>
                          <span className='px-2 py-1 bg-blue-600 text-xs rounded'>
                            {task.category}
                          </span>
                        </td>
                        <td className='p-4'>
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
                        <td className='p-4'>{task.estimatedTime}min</td>
                        <td className='p-4'>{task.author}</td>
                        <td className='p-4 text-sm text-gray-400'>
                          {new Date(task.createdAt).toLocaleDateString()}
                        </td>
                        <td className='p-4'>
                          <div className='flex gap-2'>
                            <button
                              onClick={() => openViewEditor(task)}
                              className='p-1 text-gray-400 hover:text-blue-400'
                              title='View with Editor'
                            >
                              <Eye className='w-4 h-4' />
                            </button>
                            <button
                              onClick={() => openEditEditor(task)}
                              className='p-1 text-gray-400 hover:text-green-400'
                              title='Edit with Editor'
                            >
                              <Edit className='w-4 h-4' />
                            </button>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className='p-1 text-gray-400 hover:text-red-400'
                              title='Delete'
                            >
                              <Trash2 className='w-4 h-4' />
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

          {/* Frontend Task Editor */}
          {showEditor && (
            <FrontendTaskEditor
              task={editingTask}
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
              mode={editorMode}
            />
          )}
        </div>
      </div>
    </>
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
    files: [
      {
        id: '1',
        name: 'App.tsx',
        type: 'tsx',
        content: '',
        isEntryPoint: true,
      },
    ],
    testCases: [],
    tags: [],
    is_active: true,
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
        files: task.files || [
          {
            id: '1',
            name: 'App.tsx',
            type: 'tsx',
            content: task.starterCode,
            isEntryPoint: true,
          },
        ],
        testCases: task.testCases || [],
        tags: task.tags,
        is_active: task.is_active,
      });
    }
  }, [task]);

  const addFile = () => {
    const newFile = {
      id: Date.now().toString(),
      name: 'NewFile.tsx',
      type: 'tsx' as const,
      content: '',
      isEntryPoint: false,
    };
    setFormData({
      ...formData,
      files: [...formData.files, newFile],
    });
  };

  const removeFile = (fileId: string) => {
    if (formData.files.length <= 1) return; // Keep at least one file
    setFormData({
      ...formData,
      files: formData.files.filter(f => f.id !== fileId),
    });
  };

  const updateFile = (fileId: string, updates: Partial<FrontendTaskFile>) => {
    setFormData({
      ...formData,
      files: formData.files.map(f =>
        f.id === fileId ? { ...f, ...updates } : f
      ),
    });
  };

  const addHint = () => {
    setFormData({
      ...formData,
      hints: [...formData.hints, ''],
    });
  };

  const removeHint = (index: number) => {
    setFormData({
      ...formData,
      hints: formData.hints.filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, ''],
    });
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto'>
        <h2 className='text-2xl font-bold mb-4'>
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Basic Information */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Title</label>
              <input
                type='text'
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Category</label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
                required
              >
                <option value=''>Select Category</option>
                <option value='React'>React</option>
                <option value='JavaScript'>JavaScript</option>
                <option value='TypeScript'>TypeScript</option>
                <option value='CSS'>CSS</option>
                <option value='HTML'>HTML</option>
                <option value='Vue.js'>Vue.js</option>
                <option value='Angular'>Angular</option>
                <option value='Svelte'>Svelte</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
              required
            />
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
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
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
              >
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Estimated Time (min)
              </label>
              <input
                type='number'
                value={formData.estimatedTime}
                onChange={e =>
                  setFormData({
                    ...formData,
                    estimatedTime: parseInt(e.target.value),
                  })
                }
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
                min='1'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Author</label>
              <input
                type='text'
                value={formData.author}
                onChange={e =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>
              Requirements
            </label>
            <textarea
              value={formData.requirements}
              onChange={e =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              rows={4}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded'
              required
            />
          </div>

          {/* Dynamic Files Section */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <label className='block text-sm font-medium'>Files</label>
              <button
                type='button'
                onClick={addFile}
                className='px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm'
              >
                + Add File
              </button>
            </div>
            <div className='space-y-3'>
              {formData.files.map((file, index) => (
                <div key={file.id} className='bg-gray-700 rounded p-4'>
                  <div className='grid grid-cols-4 gap-2 mb-2'>
                    <div>
                      <label className='block text-xs font-medium mb-1'>
                        Name
                      </label>
                      <input
                        type='text'
                        value={file.name}
                        onChange={e =>
                          updateFile(file.id, { name: e.target.value })
                        }
                        className='w-full p-1 bg-gray-600 border border-gray-500 rounded text-sm'
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-xs font-medium mb-1'>
                        Type
                      </label>
                      <select
                        value={file.type}
                        onChange={e =>
                          updateFile(file.id, { type: e.target.value as any })
                        }
                        className='w-full p-1 bg-gray-600 border border-gray-500 rounded text-sm'
                      >
                        <option value='tsx'>TSX</option>
                        <option value='ts'>TS</option>
                        <option value='js'>JS</option>
                        <option value='css'>CSS</option>
                        <option value='html'>HTML</option>
                        <option value='json'>JSON</option>
                      </select>
                    </div>
                    <div className='flex items-end'>
                      <label className='flex items-center'>
                        <input
                          type='checkbox'
                          checked={file.isEntryPoint}
                          onChange={e =>
                            updateFile(file.id, {
                              isEntryPoint: e.target.checked,
                            })
                          }
                          className='mr-1'
                        />
                        <span className='text-xs'>Entry Point</span>
                      </label>
                    </div>
                    <div className='flex items-end'>
                      {formData.files.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeFile(file.id)}
                          className='px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs'
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className='block text-xs font-medium mb-1'>
                      Content
                    </label>
                    <textarea
                      value={file.content}
                      onChange={e =>
                        updateFile(file.id, { content: e.target.value })
                      }
                      rows={6}
                      className='w-full p-2 bg-gray-900 border border-gray-600 rounded font-mono text-sm'
                      placeholder={`Enter ${file.type.toUpperCase()} code here...`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hints Section */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <label className='block text-sm font-medium'>Hints</label>
              <button
                type='button'
                onClick={addHint}
                className='px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm'
              >
                + Add Hint
              </button>
            </div>
            <div className='space-y-2'>
              {formData.hints.map((hint, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    value={hint}
                    onChange={e => {
                      const newHints = [...formData.hints];
                      newHints[index] = e.target.value;
                      setFormData({ ...formData, hints: newHints });
                    }}
                    className='flex-1 p-2 bg-gray-700 border border-gray-600 rounded'
                    placeholder={`Hint ${index + 1}`}
                  />
                  <button
                    type='button'
                    onClick={() => removeHint(index)}
                    className='px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm'
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <label className='block text-sm font-medium'>Tags</label>
              <button
                type='button'
                onClick={addTag}
                className='px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm'
              >
                + Add Tag
              </button>
            </div>
            <div className='space-y-2'>
              {formData.tags.map((tag, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    value={tag}
                    onChange={e => {
                      const newTags = [...formData.tags];
                      newTags[index] = e.target.value;
                      setFormData({ ...formData, tags: newTags });
                    }}
                    className='flex-1 p-2 bg-gray-700 border border-gray-600 rounded'
                    placeholder={`Tag ${index + 1}`}
                  />
                  <button
                    type='button'
                    onClick={() => removeTag(index)}
                    className='px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm'
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Solution</label>
            <textarea
              value={formData.solution}
              onChange={e =>
                setFormData({ ...formData, solution: e.target.value })
              }
              rows={6}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded font-mono'
              required
            />
          </div>

          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded'
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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-start mb-4'>
          <h2 className='text-2xl font-bold'>{task.title}</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white'>
            ✕
          </button>
        </div>

        <div className='space-y-6'>
          <div className='flex gap-4'>
            <span className='px-2 py-1 bg-blue-600 text-xs rounded'>
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
            <span className='text-sm text-gray-400'>
              {task.estimatedTime} minutes
            </span>
            <span className='text-sm text-gray-400'>by {task.author}</span>
          </div>

          <div>
            <h3 className='font-medium mb-2'>Description</h3>
            <p className='text-gray-300'>{task.description}</p>
          </div>

          <div>
            <h3 className='font-medium mb-2'>Requirements</h3>
            <p className='text-gray-300 whitespace-pre-wrap'>
              {task.requirements}
            </p>
          </div>

          {/* Dynamic Files Section */}
          {task.files && task.files.length > 0 && (
            <div>
              <h3 className='font-medium mb-2'>Files</h3>
              <div className='space-y-3'>
                {task.files.map((file, index) => (
                  <div key={file.id} className='bg-gray-700 rounded p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='font-mono text-sm text-blue-400'>
                        {file.name}
                      </span>
                      <span className='px-2 py-1 bg-gray-600 text-xs rounded'>
                        {file.type.toUpperCase()}
                      </span>
                      {file.isEntryPoint && (
                        <span className='px-2 py-1 bg-green-600 text-xs rounded'>
                          Entry Point
                        </span>
                      )}
                    </div>
                    <pre className='bg-gray-900 p-3 rounded text-sm overflow-x-auto'>
                      <code>{file.content}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legacy Starter Code (for backward compatibility) */}
          {!task.files && task.starterCode && (
            <div>
              <h3 className='font-medium mb-2'>Starter Code</h3>
              <pre className='bg-gray-900 p-4 rounded text-sm overflow-x-auto'>
                <code>{task.starterCode}</code>
              </pre>
            </div>
          )}

          {/* Hints */}
          {task.hints && task.hints.length > 0 && (
            <div>
              <h3 className='font-medium mb-2'>Hints</h3>
              <ul className='list-disc list-inside space-y-1'>
                {task.hints.map((hint, index) => (
                  <li key={index} className='text-gray-300 text-sm'>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <h3 className='font-medium mb-2'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-2 py-1 bg-purple-600 text-xs rounded'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className='font-medium mb-2'>Solution</h3>
            <pre className='bg-gray-900 p-4 rounded text-sm overflow-x-auto'>
              <code>{task.solution}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
