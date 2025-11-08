// v1.0 - Admin page for managing problem solving tasks

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Plus, Edit, Trash2, Eye, Search, Play, Code } from 'lucide-react';
import {
  ClientCodeRunner,
  TestCase,
  ProblemSolvingEditor,
} from '@elzatona/shared-components';
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
} from '../../../../types/admin';
import {
  useProblemSolvingTasks,
  useCreateProblemSolvingTask,
  useUpdateProblemSolvingTask,
  useDeleteProblemSolvingTask,
} from '@elzatona/shared-hooks';

export default function ProblemSolvingAdminPage() {
  // TanStack Query hooks
  const {
    data: tasksData,
    isLoading: tasksLoading,
    error: tasksError,
  } = useProblemSolvingTasks();

  // Mutation hooks
  const createTaskMutation = useCreateProblemSolvingTask();
  const updateTaskMutation = useUpdateProblemSolvingTask();
  const deleteTaskMutation = useDeleteProblemSolvingTask();

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit' | 'view'>(
    'create'
  );
  const [editingTask, setEditingTask] = useState<ProblemSolvingTask | null>(
    null
  );
  const [testingTask, setTestingTask] = useState<ProblemSolvingTask | null>(
    null
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

  // Editor handlers
  const handleEditorSave = useCallback(
    async (taskData: ProblemSolvingTaskFormData) => {
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

  const handleEditorCancel = () => {
    setShowEditor(false);
    setEditingTask(null);
  };

  const openCreateEditor = () => {
    setEditorMode('create');
    setEditingTask(null);
    setShowEditor(true);
  };

  const openEditEditor = (task: ProblemSolvingTask) => {
    setEditorMode('edit');
    setEditingTask(task);
    setShowEditor(true);
  };

  const openViewEditor = (task: ProblemSolvingTask) => {
    setEditorMode('view');
    setEditingTask(task);
    setShowEditor(true);
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
    <div className='bg-gray-900 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Problem Solving Tasks</h1>
            <p className='text-gray-400 mt-2'>
              Manage algorithmic coding challenges
            </p>
          </div>
          <button
            onClick={openCreateEditor}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
          >
            <Plus className='w-4 h-4' />
            Create Task
          </button>
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
            <div className='p-8 text-center text-gray-400'>No tasks found</div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-700'>
                  <tr>
                    <th className='text-left p-4'>Title</th>
                    <th className='text-left p-4'>Category</th>
                    <th className='text-left p-4'>Difficulty</th>
                    <th className='text-left p-4'>Function</th>
                    <th className='text-left p-4'>Test Cases</th>
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
                      <td className='p-4 font-mono text-sm'>
                        {task.functionName}
                      </td>
                      <td className='p-4'>{task.testCases.length}</td>
                      <td className='p-4 text-sm text-gray-400'>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </td>
                      <td className='p-4'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => openViewEditor(task)}
                            className='p-1 text-gray-400 hover:text-blue-400'
                            title='View'
                          >
                            <Eye className='w-4 h-4' />
                          </button>
                          <button
                            onClick={() => setTestingTask(task)}
                            className='p-1 text-gray-400 hover:text-green-400'
                            title='Test'
                          >
                            <Play className='w-4 h-4' />
                          </button>
                          <button
                            onClick={() => openEditEditor(task)}
                            className='p-1 text-gray-400 hover:text-yellow-400'
                            title='Edit'
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

        {/* Problem Solving Editor */}
        {showEditor && (
          <ProblemSolvingEditor
            task={editingTask}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
            isEditing={editorMode === 'edit'}
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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-start mb-4'>
          <h2 className='text-2xl font-bold'>Test: {task.title}</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white'>
            ✕
          </button>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <label className='inline-flex items-center gap-2 text-sm text-gray-300'>
              <input
                type='checkbox'
                checked={useSolution}
                onChange={e => setUseSolution(e.target.checked)}
              />
              Run solution instead of starter (for verification)
            </label>
          </div>

          <div>
            <label className='block text-sm text-gray-400 mb-1'>
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
