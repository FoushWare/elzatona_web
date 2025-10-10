'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  ArrowLeft,
  X,
  Sun,
  Moon,
  Monitor,
  Play,
  Save,
  Plus,
  Trash2,
  Eye,
  Code,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  FileText,
  FolderPlus,
  FilePlus,
  ChevronRight,
  ChevronDown,
  Menu,
} from 'lucide-react';
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
  TestCase,
} from '@/types/admin';
import ClientCodeRunner from './ClientCodeRunner';

interface ProblemSolvingEditorProps {
  task?: ProblemSolvingTask | null;
  onSave: (taskData: ProblemSolvingTaskFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  fileType?: string;
}

const categories = [
  'Array',
  'String',
  'Linked List',
  'Tree',
  'Graph',
  'Dynamic Programming',
  'Backtracking',
  'Greedy',
  'Math',
  'Hash Table',
  'Two Pointers',
  'Binary Search',
  'Stack',
  'Queue',
  'Heap',
  'Sorting',
  'Bit Manipulation',
  'Sliding Window',
  'Trie',
  'Union Find',
  'Design',
  'Simulation',
  'Other',
];

const difficulties = [
  { value: 'easy', label: 'Easy', color: 'bg-green-600' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-600' },
  { value: 'hard', label: 'Hard', color: 'bg-red-600' },
];

export default function ProblemSolvingEditor({
  task,
  onSave,
  onCancel,
  isEditing = false,
}: ProblemSolvingEditorProps) {
  // Theme management
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isDark, setIsDark] = useState(false);

  // Form data
  const [formData, setFormData] = useState<ProblemSolvingTaskFormData>({
    title: '',
    description: '',
    category: 'Array',
    difficulty: 'easy',
    functionName: 'solution',
    starterCode: '',
    solution: '',
    testCases: [],
    constraints: [],
    examples: [],
    tags: [],
  });

  // Code editor states
  const [starterCode, setStarterCode] = useState('');
  const [solutionCode, setSolutionCode] = useState('');
  const [activeTab, setActiveTab] = useState<'starter' | 'solution'>('starter');

  // File explorer states
  const [activeFile, setActiveFile] = useState<string>('');
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showAddFile, setShowAddFile] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);

  // Dynamic field states
  const [newConstraint, setNewConstraint] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newTag, setNewTag] = useState('');

  // Initialize form data when task prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Array',
        difficulty: task.difficulty || 'easy',
        functionName: task.functionName || 'solution',
        starterCode: task.starterCode || '',
        solution: task.solution || '',
        testCases: task.testCases || [],
        constraints: task.constraints || [],
        examples: task.examples || [],
        tags: task.tags || [],
      });
      setStarterCode(task.starterCode || '');
      setSolutionCode(task.solution || '');
    } else {
      // Set default starter code for new tasks
      const defaultStarterCode = `function ${formData.functionName || 'solution'}(nums) {
    // Your code here
    return [];
}`;
      setStarterCode(defaultStarterCode);
      setFormData(prev => ({
        ...prev,
        starterCode: defaultStarterCode,
      }));
    }
  }, [task]);

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      setIsDark(theme === 'dark' || (theme === 'system' && mediaQuery.matches));
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  // Initialize file tree with default files
  useEffect(() => {
    // Always update file tree when starterCode or solutionCode changes
    const defaultFiles: FileNode[] = [
      {
        id: 'starter',
        name: 'starter.js',
        type: 'file',
        content: starterCode,
        fileType: 'js',
      },
      {
        id: 'solution',
        name: 'solution.js',
        type: 'file',
        content: solutionCode,
        fileType: 'js',
      },
    ];
    setFileTree(defaultFiles);
    if (fileTree.length === 0) {
      setOpenFiles(['starter']);
      setActiveFile('starter');
    }
  }, [starterCode, solutionCode]);

  const getDifficultyColor = (difficulty: string) => {
    const diff = difficulties.find(d => d.value === difficulty);
    return diff?.color || 'bg-gray-600';
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      setFormData(prev => ({
        ...prev,
        constraints: [...prev.constraints, newConstraint.trim()],
      }));
      setNewConstraint('');
    }
  };

  const removeConstraint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== index),
    }));
  };

  const addExample = () => {
    if (newExample.trim()) {
      // Parse the input to handle both string and object formats
      try {
        // Try to parse as JSON first (for object format)
        const parsedExample = JSON.parse(newExample);
        if (parsedExample && typeof parsedExample === 'object') {
          setFormData(prev => ({
            ...prev,
            examples: [...prev.examples, parsedExample],
          }));
        } else {
          // Fallback to string format
          setFormData(prev => ({
            ...prev,
            examples: [...prev.examples, newExample.trim()],
          }));
        }
      } catch {
        // If JSON parsing fails, treat as string
        setFormData(prev => ({
          ...prev,
          examples: [...prev.examples, newExample.trim()],
        }));
      }
      setNewExample('');
    }
  };

  const removeExample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: '',
      expectedOutput: '',
      description: '',
    };
    setFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, newTestCase],
    }));
  };

  const removeTestCase = (id: string) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.filter(tc => tc.id !== id),
    }));
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.map(tc =>
        tc.id === id ? { ...tc, [field]: value } : tc
      ),
    }));
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const openFile = (fileId: string) => {
    setActiveFile(fileId);
    if (!openFiles.includes(fileId)) {
      setOpenFiles([...openFiles, fileId]);
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || 'txt';
  };

  const getFileLanguage = (fileType: string) => {
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      css: 'css',
      html: 'html',
      json: 'json',
      md: 'markdown',
    };
    return languageMap[fileType] || 'plaintext';
  };

  const getFileContent = (fileId: string) => {
    const file = fileTree.find(node => node.id === fileId);
    return file?.content || '';
  };

  const addFile = () => {
    if (newFileName.trim()) {
      const fileExtension = getFileExtension(newFileName);
      const newFile: FileNode = {
        id: Date.now().toString(),
        name: newFileName.trim(),
        type: 'file',
        content: '',
        fileType: fileExtension,
      };
      setFileTree(prev => [...prev, newFile]);
      setNewFileName('');
      setShowAddFile(false);
    }
  };

  const addFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FileNode = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        type: 'folder',
        children: [],
      };
      setFileTree(prev => [...prev, newFolder]);
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  const deleteFile = (fileId: string) => {
    setFileTree(prev => prev.filter(node => node.id !== fileId));
    setOpenFiles(prev => prev.filter(id => id !== fileId));
    if (activeFile === fileId) {
      const remainingFiles = fileTree.filter(node => node.id !== fileId);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[0].id : '');
    }
  };

  const updateFileContent = (fileId: string, content: string) => {
    setFileTree(prev =>
      prev.map(node => (node.id === fileId ? { ...node, content } : node))
    );
  };

  const handleSave = () => {
    const taskData = {
      ...formData,
      starterCode: starterCode,
      solution: solutionCode,
    };
    onSave(taskData);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Header */}
      <div
        className={`border-b transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </button>
            <h1
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isEditing ? 'Edit Problem' : 'Create Problem'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'light'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-800'
                    : isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}
                title="Light theme"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-800'
                    : isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}
                title="Dark theme"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'system'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-800'
                    : isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}
                title="System theme"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onCancel}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Task Details */}
        <div className="w-1/3 min-w-[300px] max-w-[500px]">
          <div
            className={`h-full border-r transition-colors duration-300 ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Problem Details
                  </h2>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter problem title"
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={e =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={e =>
                        setFormData({ ...formData, difficulty: e.target.value })
                      }
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty.value} value={difficulty.value}>
                          {difficulty.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Function Name
                    </label>
                    <input
                      type="text"
                      value={formData.functionName}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          functionName: e.target.value,
                        })
                      }
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g., twoSum"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Description
                  </h2>
                  <textarea
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={6}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Describe the problem..."
                  />
                </div>

                {/* Constraints */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Constraints
                  </h2>
                  <div className="space-y-2">
                    {formData.constraints.map((constraint, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          isDark ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {constraint}
                        </span>
                        <button
                          onClick={() => removeConstraint(index)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            isDark
                              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600'
                              : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newConstraint}
                        onChange={e => setNewConstraint(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addConstraint()}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Add constraint..."
                      />
                      <button
                        onClick={addConstraint}
                        className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isDark
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Examples
                  </h2>
                  <div className="space-y-2">
                    {formData.examples.map((example, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          isDark ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {typeof example === 'string'
                            ? example
                            : `${example.input} → ${example.output}`}
                        </span>
                        <button
                          onClick={() => removeExample(index)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            isDark
                              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600'
                              : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newExample}
                        onChange={e => setNewExample(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addExample()}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Add example (string or JSON format)"
                      />
                      <button
                        onClick={addExample}
                        className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isDark
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Tags
                  </h2>
                  <div className="space-y-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          isDark ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                        <button
                          onClick={() => removeTag(index)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            isDark
                              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600'
                              : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addTag()}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Add tag..."
                      />
                      <button
                        onClick={addTag}
                        className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isDark
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Test Cases */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Test Cases
                  </h2>
                  <div className="space-y-3">
                    {formData.testCases.map((testCase, index) => (
                      <div
                        key={testCase.id}
                        className={`p-3 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm font-medium ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Test Case {index + 1}
                          </span>
                          <button
                            onClick={() => removeTestCase(testCase.id)}
                            className={`p-1 rounded transition-colors duration-200 ${
                              isDark
                                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600'
                                : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                            }`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={testCase.description}
                            onChange={e =>
                              updateTestCase(
                                testCase.id,
                                'description',
                                e.target.value
                              )
                            }
                            className={`w-full px-2 py-1 text-sm rounded border transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              isDark
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Description..."
                          />
                          <input
                            type="text"
                            value={testCase.input}
                            onChange={e =>
                              updateTestCase(
                                testCase.id,
                                'input',
                                e.target.value
                              )
                            }
                            className={`w-full px-2 py-1 text-sm rounded border transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              isDark
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Input..."
                          />
                          <input
                            type="text"
                            value={testCase.expectedOutput}
                            onChange={e =>
                              updateTestCase(
                                testCase.id,
                                'expectedOutput',
                                e.target.value
                              )
                            }
                            className={`w-full px-2 py-1 text-sm rounded border transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              isDark
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Expected Output..."
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addTestCase}
                      className={`w-full py-2 rounded-lg border-2 border-dashed transition-colors duration-200 ${
                        isDark
                          ? 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400'
                          : 'border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500'
                      }`}
                    >
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Panel - File Explorer + Code Editor */}
        <div className="flex-1 flex">
          {/* File Explorer */}
          {showFileExplorer && (
            <div className="w-1/4 min-w-[200px] max-w-[300px]">
              <div
                className={`h-full border-r transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="h-full flex flex-col">
                  {/* File Explorer Header */}
                  <div
                    className={`border-b p-3 flex items-center justify-between transition-colors duration-300 ${
                      isDark
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <h3
                      className={`text-sm font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Files
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setShowAddFile(true)}
                        className={`p-1 rounded transition-colors duration-200 ${
                          isDark
                            ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                        title="Add File"
                      >
                        <FilePlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowAddFolder(true)}
                        className={`p-1 rounded transition-colors duration-200 ${
                          isDark
                            ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                        title="Add Folder"
                      >
                        <FolderPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* File Tree */}
                  <div className="flex-1 overflow-y-auto p-2">
                    <div className="space-y-1">
                      {fileTree.map(node => (
                        <div key={node.id}>
                          {node.type === 'folder' ? (
                            <div>
                              <button
                                onClick={() => toggleFolder(node.id)}
                                className={`w-full flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                                  isDark
                                    ? 'text-gray-300 hover:bg-gray-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {expandedFolders.has(node.id) ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                                <Folder className="w-4 h-4" />
                                <span className="text-sm">{node.name}</span>
                              </button>
                              {expandedFolders.has(node.id) &&
                                node.children && (
                                  <div className="ml-6 space-y-1">
                                    {node.children.map(child => (
                                      <button
                                        key={child.id}
                                        onClick={() => openFile(child.id)}
                                        className={`w-full flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                                          activeFile === child.id
                                            ? isDark
                                              ? 'bg-blue-600 text-white'
                                              : 'bg-blue-100 text-blue-800'
                                            : isDark
                                              ? 'text-gray-300 hover:bg-gray-700'
                                              : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                      >
                                        <FileText className="w-4 h-4" />
                                        <span className="text-sm">
                                          {child.name}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ) : (
                            <button
                              onClick={() => openFile(node.id)}
                              className={`w-full flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                                activeFile === node.id
                                  ? isDark
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-100 text-blue-800'
                                  : isDark
                                    ? 'text-gray-300 hover:bg-gray-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">{node.name}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Editor */}
          <div className="flex-1">
            <div className="h-full flex flex-col">
              {/* Editor Header with File Explorer Toggle and File Tabs */}
              <div
                className={`border-b transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFileExplorer(!showFileExplorer)}
                      className={`p-1 rounded transition-colors duration-200 ${
                        isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      title="Toggle File Explorer"
                    >
                      <Menu className="w-4 h-4" />
                    </button>
                    <div className="flex gap-1">
                      {openFiles.map(fileId => {
                        const file = fileTree.find(node => node.id === fileId);
                        return file ? (
                          <button
                            key={fileId}
                            onClick={() => setActiveFile(fileId)}
                            className={`px-3 py-1 text-sm rounded-t transition-colors duration-200 ${
                              activeFile === fileId
                                ? isDark
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-100 text-blue-800'
                                : isDark
                                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {file.name}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getFileLanguage(
                    fileTree.find(node => node.id === activeFile)?.fileType ||
                      'javascript'
                  )}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  value={getFileContent(activeFile)}
                  onChange={value => {
                    if (value !== undefined) {
                      updateFileContent(activeFile, value);
                    }
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview/Test Runner */}
        <div className="w-1/4 min-w-[300px] max-w-[500px]">
          <div
            className={`h-full border-l transition-colors duration-300 ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Test Runner */}
                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Test Runner
                  </h2>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // Run tests logic here
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          isDark
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run Tests
                      </button>
                      <button
                        onClick={() => {
                          // Reset code logic here
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          isDark
                            ? 'bg-gray-600 hover:bg-gray-700 text-white'
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                        }`}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                      </button>
                    </div>

                    {/* Live Test Runner */}
                    {formData.functionName && formData.testCases.length > 0 && (
                      <div className="mt-6">
                        <ClientCodeRunner
                          functionName={formData.functionName}
                          userCode={getFileContent(activeFile || '')}
                          testCases={formData.testCases}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        className={`border-t transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                formData.difficulty
              )} text-white`}
            >
              {formData.difficulty.charAt(0).toUpperCase() +
                formData.difficulty.slice(1)}
            </div>
            {formData.category && (
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {formData.category}
              </div>
            )}
            <span
              className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {formData.testCases.length} test cases
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isDark
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Save className="w-4 h-4 mr-2 inline" />
              {isEditing ? 'Update Problem' : 'Create Problem'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
