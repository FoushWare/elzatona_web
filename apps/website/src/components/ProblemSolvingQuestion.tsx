'use client';

import { useState, useEffect, useRef } from 'react';
import CodeEditor from './CodeEditor';
import { CheckCircle, XCircle, AlertCircle, Play, Loader2, Code2, Trophy, ChevronRight, Maximize2, Minimize2, Copy, Plus, Lightbulb, BookOpen } from 'lucide-react';
import { addFlashcard, isInFlashcards, removeFlashcard } from '../lib/flashcards';

interface TestCase {
  input: any | any[];
  expectedOutput: any;
  description?: string;
}

interface Example {
  input: any | Record<string, any>;
  output: any;
  explanation?: string;
}

interface ProblemSolvingQuestionProps {
  question: {
    id: string;
    title: string;
    content: string;
    code_template?: string;
    test_cases?: TestCase[] | string;
    examples?: Example[] | string;
    difficulty?: string;
    category?: string;
    topic?: string;
    hints?: string[] | null;
    constraints?: string[] | null;
    tags?: string[] | null;
    language?: string;
    topic_id?: string;
    topic_name?: string;
    topic_description?: string;
  };
  onComplete?: (isCorrect: boolean) => void;
  onNextQuestion?: () => void;
  language?: string; // Fallback only if not in question
  onSubmitSolution?: () => void;
}

export default function ProblemSolvingQuestion({
  question,
  onComplete,
  onNextQuestion,
  language, // Fallback prop, but prefer question.language from DB
  onSubmitSolution,
}: ProblemSolvingQuestionProps) {
  // Use language from database, fallback to prop, then default
  const currentLanguage = question.language || language || 'javascript';
  // Refs for scrolling
  const outputRef = useRef<HTMLDivElement>(null);
  const testCasesRef = useRef<HTMLDivElement>(null);
  
  // Resize state
  const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('problem-solving-left-panel-width');
      return saved ? parseFloat(saved) : 40; // Default 40% width
    }
    return 40;
  });
  const [testPanelHeight, setTestPanelHeight] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('problem-solving-test-panel-height');
      return saved ? parseFloat(saved) : 30; // Default 30% height
    }
    return 30;
  });
  const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
  const [isResizingVertical, setIsResizingVertical] = useState(false);
  
  // UI State - Always use code_template from database
  const [code, setCode] = useState(() => {
    // Always use code_template from database - no fallback
    if (question.code_template) {
      return question.code_template;
    }
    // If no template, return empty string (should not happen if DB is properly seeded)
    return '';
  });
  
  const [testResults, setTestResults] = useState<
    Array<{
      testCase: TestCase;
      passed: boolean;
      actualOutput?: any;
      error?: string;
    }>
  >([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [inFlashcards, setInFlashcards] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'testcase' | 'result'>('testcase');
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [customTestCases, setCustomTestCases] = useState<TestCase[]>([]); // Editable custom test cases
  const [editingTestCaseIndex, setEditingTestCaseIndex] = useState<number | null>(null); // Full index of test case being edited
  const [editingTestCaseData, setEditingTestCaseData] = useState<Partial<TestCase> | null>(null); // Data being edited
  // Input mode is always 'raw' now
  const [runOutput, setRunOutput] = useState<{
    stdout: string;
    stderr: string;
    exitCode: number;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Update code when question changes - always use database value
  useEffect(() => {
    // Always use code_template from database - no fallback generation
    if (question.code_template) {
      setCode(question.code_template);
    } else {
      // If no template in DB, set empty (should be populated in database)
      setCode('');
    }
    setTestResults([]);
    setAllTestsPassed(false);
    setRunOutput(null);
    setInFlashcards(isInFlashcards(question.id));
    // Reset to first test case when question changes
    setSelectedTestCaseIndex(0);
    setCustomTestCases([]);
    setEditingTestCaseIndex(null);
    setEditingTestCaseData(null);
  }, [question.id, question.code_template]);

  // Parse test cases
  const parseTestCases = (): TestCase[] => {
    if (!question.test_cases) return [];
    if (typeof question.test_cases === 'string') {
      try {
        return JSON.parse(question.test_cases);
      } catch {
        return [];
      }
    }
    return question.test_cases as TestCase[];
  };

  const baseTestCases = parseTestCases();
  // Combine base test cases from database with custom test cases
  const testCases = [...baseTestCases, ...customTestCases];

  // Parse input into structured fields (for LeetCode-style display)
  const parseInputFields = (input: any): Record<string, any> => {
    if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
      return input;
    }
    if (Array.isArray(input)) {
      // If it's an array, try to infer parameter names from common patterns
      // For now, use generic names
      return { 'input': input };
    }
    return { 'input': input };
  };

  // Get parameter names from input
  const getInputFields = (testCase: TestCase): Record<string, any> => {
    return parseInputFields(testCase.input);
  };

  // Add new custom test case (clone last selected)
  const handleAddCustomTestCase = () => {
    const lastSelected = testCases[selectedTestCaseIndex] || (testCases.length > 0 ? testCases[0] : null);
    const newTestCase: TestCase = {
      input: lastSelected ? JSON.parse(JSON.stringify(lastSelected.input)) : {},
      expectedOutput: lastSelected ? JSON.parse(JSON.stringify(lastSelected.expectedOutput)) : null,
      description: 'Custom',
    };
    const newIndex = testCases.length;
    setCustomTestCases([...customTestCases, newTestCase]);
    setSelectedTestCaseIndex(newIndex);
    setEditingTestCaseIndex(newIndex); // Start editing immediately
    setEditingTestCaseData({ ...newTestCase });
  };

  // Save edited test case
  const handleSaveTestCase = () => {
    if (editingTestCaseData && editingTestCaseIndex !== null && editingTestCaseIndex >= baseTestCases.length) {
      // Custom test case
      const customIndex = editingTestCaseIndex - baseTestCases.length;
      const updated = [...customTestCases];
      updated[customIndex] = editingTestCaseData as TestCase;
      setCustomTestCases(updated);
      setEditingTestCaseIndex(null);
      setEditingTestCaseData(null);
    }
  };

  // Delete custom test case
  const handleDeleteTestCase = (index: number) => {
    if (index >= baseTestCases.length) {
      const customIndex = index - baseTestCases.length;
      const updated = [...customTestCases];
      updated.splice(customIndex, 1);
      setCustomTestCases(updated);
      if (selectedTestCaseIndex === index) {
        setSelectedTestCaseIndex(Math.max(0, baseTestCases.length - 1));
      } else if (selectedTestCaseIndex > index) {
        setSelectedTestCaseIndex(selectedTestCaseIndex - 1);
      }
      setEditingTestCaseIndex(null);
      setEditingTestCaseData(null);
    }
  };

  // Extract function name from code
  const getFunctionName = (code: string): string => {
    const functionMatch = code.match(/(?:function\s+|const\s+|let\s+|var\s+)(\w+)\s*[=\(]/);
    if (functionMatch) return functionMatch[1];
    const arrowMatch = code.match(/(\w+)\s*=>/);
    if (arrowMatch) return arrowMatch[1];
    return 'solution';
  };

  // Run code with selected test case from database
  const handleRunCode = async () => {
    setIsRunning(true);
    setRunOutput(null);
    setActiveTab('result');

    try {
      const functionName = getFunctionName(code);
      let codeToExecute = code;

      // Use selected test case from database
      if (testCases.length > 0 && selectedTestCaseIndex >= 0 && selectedTestCaseIndex < testCases.length) {
        const testCase = testCases[selectedTestCaseIndex];
        const inputFields = parseInputFields(testCase.input);
        // If input is an object, spread it as arguments
        if (typeof testCase.input === 'object' && testCase.input !== null && !Array.isArray(testCase.input)) {
          const args = Object.values(inputFields).map((arg: any) => JSON.stringify(arg)).join(', ');
          codeToExecute = `${code}\n\n// Test with test case ${selectedTestCaseIndex + 1}\nconst result = ${functionName}(${args});\nconsole.log('Output:', result);`;
        } else {
          // Array or single value
          const input = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
          codeToExecute = `${code}\n\n// Test with test case ${selectedTestCaseIndex + 1}\nconst result = ${functionName}(${input.map((arg: any) => JSON.stringify(arg)).join(', ')});\nconsole.log('Output:', result);`;
        }
      } else if (testCases.length > 0) {
        // Use first test case if none selected
        const testCase = testCases[0];
        const inputFields = parseInputFields(testCase.input);
        if (typeof testCase.input === 'object' && testCase.input !== null && !Array.isArray(testCase.input)) {
          const args = Object.values(inputFields).map((arg: any) => JSON.stringify(arg)).join(', ');
          codeToExecute = `${code}\n\n// Test with test case 1\nconst result = ${functionName}(${args});\nconsole.log('Output:', result);`;
        } else {
          const input = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
          codeToExecute = `${code}\n\n// Test with test case 1\nconst result = ${functionName}(${input.map((arg: any) => JSON.stringify(arg)).join(', ')});\nconsole.log('Output:', result);`;
        }
      } else {
        // Default test if no test cases available
        codeToExecute = `${code}\n\n// Auto-execute function\nif (typeof ${functionName} === 'function') {\n  try {\n    const result = ${functionName}();\n    console.log('Result:', result);\n  } catch (err) {\n    console.error('Error:', err.message);\n  }\n}`;
      }

      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToExecute, language: currentLanguage }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to execute code');
      }

      setRunOutput({
        stdout: data.data.stdout || data.data.output || '',
        stderr: data.data.stderr || '',
        exitCode: data.data.exitCode || 0,
      });

      // Scroll to output
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      setRunOutput({
        stdout: '',
        stderr: error instanceof Error ? error.message : 'Failed to execute code',
        exitCode: 1,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit solution and run all test cases
  const handleSubmitSolution = async () => {
    if (!onSubmitSolution) {
      handleRunTests();
      return;
    }
    onSubmitSolution();
  };

  // Run all test cases
  const handleRunTests = async () => {
    if (testCases.length === 0) {
      handleRunCode();
      return;
    }

    setIsRunningTests(true);
    setTestResults([]);
    setAllTestsPassed(false);
    setActiveTab('result');

    const results: Array<{
      testCase: TestCase;
      passed: boolean;
      actualOutput?: any;
      error?: string;
      consoleOutput?: string; // Store full console output including console.log statements
    }> = [];

    const functionName = getFunctionName(code);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const input = Array.isArray(testCase.input) ? testCase.input : [testCase.input];

      try {
        // Execute code with test case - preserve all console.log output
        const codeToExecute = `${code}\n\n// Test case ${i + 1}\nconst result = ${functionName}(${input.map((arg: any) => JSON.stringify(arg)).join(', ')});\nconsole.log(JSON.stringify(result));`;

        const response = await fetch('/api/code/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeToExecute, language: currentLanguage }),
        });

        const data = await response.json();

        if (!data.success) {
          results.push({
            testCase,
            passed: false,
            error: data.error || 'Execution failed',
            consoleOutput: data.data?.stderr || data.error || 'Execution failed',
          });
          continue;
        }

        // Capture full stdout (includes all console.log statements from user code)
        const stdout = data.data.stdout || data.data.output || '';
        const stderr = data.data.stderr || '';
        
        // Combine stdout and stderr for full console output
        const fullConsoleOutput = [stdout, stderr].filter(Boolean).join('\n').trim();
        
        let actualOutput: any;

        try {
          // Try to parse the last line as JSON (our console.log output with result)
          const lines = stdout.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          actualOutput = JSON.parse(lastLine);
        } catch {
          // If not JSON, use the raw output
          actualOutput = stdout.trim();
        }

        const passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);

        results.push({
          testCase,
          passed,
          actualOutput,
          consoleOutput: fullConsoleOutput || undefined, // Include full console output
        });
      } catch (error) {
        results.push({
          testCase,
          passed: false,
          error: error instanceof Error ? error.message : 'Test execution failed',
        });
      }
    }

    setTestResults(results);
    setAllTestsPassed(results.every(r => r.passed));
    setIsRunningTests(false);

    if (results.every(r => r.passed)) {
      onComplete?.(true);
    }

    // Scroll to test results
    setTimeout(() => {
      testCasesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleToggleFlashcard = () => {
    if (inFlashcards) {
      removeFlashcard(question.id);
      setInFlashcards(false);
    } else {
      addFlashcard({
        id: question.id,
        question: question.title || question.content || 'Question',
        section: question.category || question.topic || 'Problem Solving',
        difficulty: question.difficulty || 'beginner',
        addedAt: Date.now(),
      });
      setInFlashcards(true);
    }
  };


  // Parse examples if they're stored as JSON string
  const parseExamples = (): Example[] => {
    if (!question.examples) return [];
    if (typeof question.examples === 'string') {
      try {
        return JSON.parse(question.examples);
      } catch {
        return [];
      }
    }
    return question.examples as Example[];
  };

  const examples = parseExamples();

  // Resize handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingHorizontal) {
        const container = document.querySelector('[data-problem-container]') as HTMLElement;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const relativeX = e.clientX - containerRect.left;
          const containerWidth = containerRect.width;
          const newWidth = (relativeX / containerWidth) * 100;
          const clampedWidth = Math.max(25, Math.min(60, newWidth)); // Min 25%, Max 60%
          setLeftPanelWidth(clampedWidth);
          localStorage.setItem('problem-solving-left-panel-width', clampedWidth.toString());
        }
      }
      if (isResizingVertical) {
        const rightPanel = document.querySelector('[data-right-panel]') as HTMLElement;
        if (rightPanel) {
          const rightPanelRect = rightPanel.getBoundingClientRect();
          const relativeY = e.clientY - rightPanelRect.top;
          const containerHeight = rightPanelRect.height;
          // Calculate test panel height as percentage of right panel
          const newHeight = ((containerHeight - relativeY) / containerHeight) * 100;
          const clampedHeight = Math.max(20, Math.min(60, newHeight)); // Min 20%, Max 60%
          setTestPanelHeight(clampedHeight);
          localStorage.setItem('problem-solving-test-panel-height', clampedHeight.toString());
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingHorizontal(false);
      setIsResizingVertical(false);
    };

    if (isResizingHorizontal || isResizingVertical) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizingHorizontal ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingHorizontal, isResizingVertical]);

  // Format input for display (LeetCode style)
  const formatInput = (input: any): string => {
    if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
      // Object with multiple keys - format as key = value pairs (LeetCode style)
      const entries = Object.entries(input);
      return entries.map(([key, value]) => {
        const formattedValue = typeof value === 'string' ? `"${value}"` : JSON.stringify(value);
        return `${key} = ${formattedValue}`;
      }).join(', ');
    }
    // For arrays or primitives, format nicely
    if (Array.isArray(input)) {
      return JSON.stringify(input);
    }
    return typeof input === 'string' ? `"${input}"` : JSON.stringify(input);
  };

  return (
    <div 
      data-problem-container
      className={`w-full ${isFocusMode ? 'h-screen fixed inset-0 z-50' : 'h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] lg:h-[calc(100vh-8rem)]'} flex flex-col lg:flex-row gap-0 bg-gray-50 dark:bg-gray-900 transition-all duration-300`}
    >
      {/* Left Panel - Problem Description (LeetCode Style) */}
      {!isFocusMode && (
        <div 
          className='overflow-y-auto bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 border-r-0 lg:border-r-2 border-gray-200/60 dark:border-gray-700/60 border-b lg:border-b-0 relative shadow-sm'
          style={{ width: `${leftPanelWidth}%`, minWidth: '300px', maxWidth: '60%' }}
        >
          {/* Resize Handle - Horizontal */}
          <div
            className='absolute right-0 top-0 bottom-0 w-1.5 bg-transparent hover:bg-indigo-500/80 dark:hover:bg-indigo-500/80 cursor-col-resize z-20 transition-all duration-200 select-none group'
            onMouseDown={(e) => {
              e.preventDefault();
              setIsResizingHorizontal(true);
            }}
          >
            <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-300/50 dark:bg-gray-600/50 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-400 transition-all duration-200' />
          </div>
          <div className='p-5 sm:p-7 md:p-9 lg:p-11'>
            {/* Header with Title and Difficulty */}
            <div className='mb-7 sm:mb-9 pb-6 sm:pb-7 border-b-2 border-gray-200/80 dark:border-gray-700/80'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 sm:gap-6 mb-5'>
                <div className='flex-1 min-w-0'>
                  <div className='flex flex-wrap items-center gap-3 sm:gap-4 mb-5'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white break-words leading-tight tracking-tight'>
                      {question.title}
                    </h2>
                    {question.difficulty && (
                      <span
                        className={`inline-flex items-center px-4 sm:px-4.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm ${
                          question.difficulty === 'beginner'
                            ? 'bg-gradient-to-br from-green-100 via-green-50 to-green-100 text-green-800 dark:from-green-900/40 dark:via-green-900/30 dark:to-green-900/20 dark:text-green-200 border-2 border-green-300/60 dark:border-green-700/60'
                            : question.difficulty === 'intermediate'
                              ? 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 text-yellow-800 dark:from-yellow-900/40 dark:via-yellow-900/30 dark:to-yellow-900/20 dark:text-yellow-200 border-2 border-yellow-300/60 dark:border-yellow-700/60'
                              : 'bg-gradient-to-br from-red-100 via-red-50 to-red-100 text-red-800 dark:from-red-900/40 dark:via-red-900/30 dark:to-red-900/20 dark:text-red-200 border-2 border-red-300/60 dark:border-red-700/60'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    )}
                  </div>
                  
                  {/* Topic Tags (LeetCode Style) */}
                  {question.tags && question.tags.length > 0 && (
                    <div className='flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5'>
                      {question.tags
                        .filter(tag => {
                          // Filter out generic tags, keep only topic-related tags
                          const genericTags = ['problem-solving', 'algorithms', 'javascript', 'typescript', 'python', 'easy', 'medium', 'hard', 'beginner', 'intermediate', 'advanced'];
                          return !genericTags.includes(tag.toLowerCase());
                        })
                        .map((tag, index) => (
                          <span
                            key={index}
                            className='inline-flex items-center px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-200 shadow-sm hover:shadow'
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                  
                  {/* Flashcard Button */}
                  <button
                    onClick={handleToggleFlashcard}
                    className={`inline-flex items-center gap-2 px-4 sm:px-4.5 py-2.5 rounded-xl border-2 transition-all duration-200 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 ${
                      inFlashcards
                        ? 'bg-gradient-to-br from-green-100 via-green-50 to-green-100 text-green-800 dark:from-green-900/40 dark:via-green-900/30 dark:to-green-900/20 dark:text-green-200 border-green-400/80 dark:border-green-600/80'
                        : 'bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-800 dark:to-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-300/80 dark:border-indigo-600/80 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/30 dark:hover:to-indigo-900/40'
                    }`}
                  >
                    <span className='text-base sm:text-lg'>🔖</span>
                    <span className='hidden sm:inline'>{inFlashcards ? 'Added to Flashcard' : 'Add to Flashcard'}</span>
                    <span className='sm:hidden'>{inFlashcards ? 'Added' : 'Add'}</span>
                  </button>
                </div>
                <button
                  onClick={() => setIsFocusMode(true)}
                  className='self-start sm:self-auto p-2.5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-transparent hover:border-indigo-200 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow'
                  title='Focus Mode'
                >
                  <Maximize2 className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
              </div>
            </div>

            {/* Problem Content */}
            <div className='mb-7 sm:mb-9'>
              <div
                className='text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-p:mb-4 prose-strong:text-gray-900 dark:prose-strong:text-gray-100'
                dangerouslySetInnerHTML={{ __html: question.content }}
              />
            </div>

            {/* Examples Section (LeetCode Style) */}
            {examples.length > 0 && (
              <div className='mt-9 sm:mt-11'>
                <h3 className='text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight'>
                  Examples
                </h3>
                <div className='space-y-6 sm:space-y-7'>
                  {examples.map((example, index) => (
                    <div
                      key={index}
                      className='bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/80 rounded-2xl p-5 sm:p-6 border-2 border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]'
                    >
                      <div className='flex items-center gap-2.5 mb-5'>
                        <span className='text-base sm:text-lg font-extrabold text-gray-900 dark:text-white tracking-tight'>
                          Example {index + 1}:
                        </span>
                      </div>
                      
                      {/* Input */}
                      <div className='mb-4 sm:mb-5'>
                        <div className='text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-3'>
                          <strong>Input:</strong>
                        </div>
                        <div className='bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 sm:p-5 border-2 border-gray-200/80 dark:border-gray-700/80 shadow-md'>
                          <pre className='text-sm sm:text-base font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words overflow-x-auto leading-relaxed'>
                            {formatInput(example.input)}
                          </pre>
                        </div>
                      </div>

                      {/* Output */}
                      <div className='mb-4 sm:mb-5'>
                        <div className='text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-3'>
                          <strong>Output:</strong>
                        </div>
                        <div className='bg-gradient-to-br from-green-50/50 to-white dark:from-green-900/20 dark:to-gray-800 rounded-xl p-4 sm:p-5 border-2 border-green-200/60 dark:border-green-800/60 shadow-md'>
                          <pre className='text-sm sm:text-base font-mono text-green-900 dark:text-green-100 whitespace-pre-wrap break-words overflow-x-auto leading-relaxed'>
                            {typeof example.output === 'string' 
                              ? `"${example.output}"` 
                              : JSON.stringify(example.output, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Explanation */}
                      {example.explanation && (
                        <div className='mt-5 pt-5 border-t-2 border-gray-200/80 dark:border-gray-700/80'>
                          <div className='text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-3'>
                            <strong>Explanation:</strong>
                          </div>
                          <p className='text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed'>
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Hints Section */}
            {question.hints && question.hints.length > 0 && (
              <div className='mt-9 sm:mt-11'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <Lightbulb className='w-6 h-6 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400' />
                    <h3 className='text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight'>
                      Hints ({question.hints.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className='px-4 py-2.5 text-sm font-bold text-indigo-700 dark:text-indigo-300 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/20 rounded-xl border-2 border-indigo-200/80 dark:border-indigo-700/80 hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-900/40 dark:hover:to-indigo-900/30 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  >
                    {showHints ? 'Hide Hints' : 'Show Hints'}
                  </button>
                </div>
                {showHints && (
                  <div className='bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 dark:from-amber-900/20 dark:via-gray-800/60 dark:to-amber-900/20 rounded-2xl p-5 sm:p-6 border-2 border-amber-200/60 dark:border-amber-800/60 shadow-lg space-y-4'>
                    {question.hints.map((hint, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          revealedHints.includes(index)
                            ? 'bg-gradient-to-br from-amber-100/80 to-white dark:from-amber-900/40 dark:to-gray-800/60 border-amber-300/80 dark:border-amber-700/80 shadow-md'
                            : 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/40 dark:to-gray-800/20 border-gray-200/60 dark:border-gray-700/60'
                        }`}
                      >
                        <div className='flex items-start gap-3'>
                          <div className='flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-600 dark:to-amber-700 flex items-center justify-center text-white font-bold text-sm shadow-md'>
                            {index + 1}
                          </div>
                          {revealedHints.includes(index) ? (
                            <div className='flex-1'>
                              <p className='text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed'>
                                {hint}
                              </p>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (!revealedHints.includes(index)) {
                                  setRevealedHints([...revealedHints, index]);
                                }
                              }}
                              className='flex-1 text-left text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium'
                            >
                              Click to reveal hint {index + 1}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Constraints Section - From Database */}
            {question.constraints && question.constraints.length > 0 && (
              <div className='mt-9 sm:mt-11'>
                <h3 className='text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight'>
                  Constraints
                </h3>
                <div className='bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/30 dark:from-indigo-900/20 dark:via-gray-800/60 dark:to-indigo-900/20 rounded-2xl p-5 sm:p-6 border-2 border-indigo-200/60 dark:border-indigo-800/60 shadow-lg'>
                  <ul className='space-y-3 text-sm sm:text-base text-gray-800 dark:text-gray-200 list-disc list-inside marker:text-indigo-600 dark:marker:text-indigo-400 font-medium'>
                    {question.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right Panel - Code Editor and Test Cases (LeetCode Style) */}
      <div 
        data-right-panel
        className={`${isFocusMode ? 'w-full' : 'flex-1'} flex flex-col overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900`}
        style={!isFocusMode ? { width: `${100 - leftPanelWidth}%` } : {}}
      >
        {/* Code Editor Header */}
        <div className='flex-shrink-0 border-b-2 border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/80 shadow-md'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 px-5 sm:px-6 py-4'>
            <div className='flex items-center justify-between sm:justify-start gap-2 sm:gap-4'>
              <div className='flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-700/50 border-2 border-indigo-200/80 dark:border-indigo-700/80 shadow-md'>
                <Code2 className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-700 dark:text-indigo-400' />
                <span className='text-sm sm:text-base font-bold text-indigo-900 dark:text-indigo-200 tracking-tight'>Code</span>
              </div>
              {isFocusMode && (
                <button
                  onClick={() => setIsFocusMode(false)}
                  className='p-1.5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-transparent hover:border-indigo-200 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow'
                  title='Exit Focus Mode'
                >
                  <Minimize2 className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                </button>
              )}
            </div>
            <div className='flex items-center gap-2 sm:gap-2.5 flex-wrap'>
              <button
                onClick={handleRunCode}
                disabled={isRunning || !code.trim()}
                className='inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-600 border-2 border-gray-300/80 dark:border-gray-600/80 text-gray-800 dark:text-gray-200 rounded-xl text-xs sm:text-sm font-bold hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/30 dark:hover:to-indigo-900/40 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-400/80 dark:hover:border-indigo-600/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial min-w-[90px] sm:min-w-0 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none'
              >
                {isRunning ? (
                  <>
                    <Loader2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin' />
                    <span className='hidden xs:inline'>Running...</span>
                    <span className='xs:hidden'>...</span>
                  </>
                ) : (
                  <>
                    <Play className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                    <span>Run</span>
                  </>
                )}
              </button>
              <button
                onClick={handleRunTests}
                disabled={isRunningTests || !code.trim()}
                className='inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-green-600 via-green-600 to-green-700 hover:from-green-700 hover:via-green-700 hover:to-green-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial min-w-[90px] sm:min-w-0 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none'
              >
                {isRunningTests ? (
                  <>
                    <Loader2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin' />
                    <span className='hidden xs:inline'>Running...</span>
                    <span className='xs:hidden'>...</span>
                  </>
                ) : (
                  <>
                    <Play className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                    <span>Submit</span>
                  </>
                )}
              </button>
              {onNextQuestion && (
                <button
                  onClick={onNextQuestion}
                  className='inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 hover:from-gray-700 hover:via-gray-700 hover:to-gray-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex-1 sm:flex-initial min-w-[110px] sm:min-w-0 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  <span className='hidden sm:inline'>Next Question</span>
                  <span className='sm:hidden'>Next</span>
                  <ChevronRight className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Code Editor */}
        <div 
          data-editor-container
          className='flex flex-col min-h-0 relative'
          style={{ height: `${100 - testPanelHeight}%`, minHeight: '200px' }}
        >
          <div className='flex-1 min-h-0 overflow-hidden'>
            <CodeEditor
              code={code}
              language={currentLanguage}
              onChange={setCode}
              height='100%'
              readOnly={false}
              showThemeSelector={true}
              showAdvancedOptions={true}
              onRun={handleRunCode}
              onSubmitSolution={handleSubmitSolution}
              onNextQuestion={onNextQuestion}
              isRunningTests={isRunningTests}
              hideActionButtons={true}
            />
          </div>
          <div ref={outputRef} />
          
          {/* Resize Handle - Vertical */}
          <div
            className='absolute bottom-0 left-0 right-0 h-2 bg-transparent hover:bg-indigo-500/80 dark:hover:bg-indigo-500/80 cursor-row-resize z-20 transition-all duration-200 select-none group'
            onMouseDown={(e) => {
              e.preventDefault();
              setIsResizingVertical(true);
            }}
          >
            <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-300/50 dark:bg-gray-600/50 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-400 transition-all duration-200' />
          </div>
        </div>

        {/* Test Cases / Console Panel */}
        <div 
          ref={testCasesRef} 
          className='border-t-2 border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col'
          style={{ height: `${testPanelHeight}%`, minHeight: '150px', maxHeight: '60%' }}
        >
          {/* Tabs: Testcase / Test Result */}
          <div className='flex items-center border-b-2 border-gray-200/80 dark:border-gray-700/80 overflow-x-auto bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/80'>
            <button
              onClick={() => setActiveTab('testcase')}
              className={`px-5 sm:px-6 py-3 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap relative ${
                activeTab === 'testcase'
                  ? 'text-indigo-700 dark:text-indigo-300 border-b-3 border-indigo-600 dark:border-indigo-400 bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/20 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
              }`}
            >
              Testcase
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-5 sm:px-6 py-3 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap relative ${
                activeTab === 'result'
                  ? 'text-indigo-700 dark:text-indigo-300 border-b-3 border-indigo-600 dark:border-indigo-400 bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/20 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
              }`}
            >
              Test Result
            </button>
          </div>
          
          <div className='p-4 sm:p-5 max-h-48 sm:max-h-64 overflow-y-auto'>
            {activeTab === 'testcase' ? (
              /* Test Cases - LeetCode Style with Custom Test Cases */
              <div className='space-y-4 sm:space-y-5'>
                {/* Test Case Selection Buttons */}
                <div className='flex items-center gap-2 flex-wrap overflow-x-auto pb-2 -mx-1 px-1'>
                  {testCases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedTestCaseIndex(index);
                        setEditingTestCaseIndex(null);
                        setEditingTestCaseData(null);
                      }}
                      className={`px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow ${
                        selectedTestCaseIndex === index
                          ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 dark:from-indigo-900/30 dark:to-indigo-900/20 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 hover:border-indigo-200 dark:hover:border-gray-500'
                      }`}
                    >
                      {selectedTestCaseIndex === index && (
                        <CheckCircle className='w-3 h-3 inline mr-1' />
                      )}
                      Case {index + 1}
                      {index >= baseTestCases.length && (
                        <span className='ml-1 text-indigo-600 dark:text-indigo-400'>*</span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={handleAddCustomTestCase}
                    className='px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-dashed border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 whitespace-nowrap transition-all duration-200 shadow-sm hover:shadow'
                  >
                    <Plus className='w-3 h-3 inline mr-1' />
                    Custom
                  </button>
                </div>

                {/* Selected Test Case Display/Edit */}
                {selectedTestCaseIndex >= 0 && selectedTestCaseIndex < testCases.length && (
                  <div className='bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-sm'>
                    {editingTestCaseIndex === selectedTestCaseIndex && selectedTestCaseIndex >= baseTestCases.length ? (
                      /* Edit Custom Test Case */
                      <div className='space-y-4'>
                        <div className='flex items-center justify-between mb-3'>
                          <span className='text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200'>
                            Edit Custom Test Case {selectedTestCaseIndex + 1}
                          </span>
                          <div className='flex items-center gap-2'>
                            <button
                              onClick={handleSaveTestCase}
                              className='px-3 py-1.5 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors'
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingTestCaseIndex(null);
                                setEditingTestCaseData(null);
                              }}
                              className='px-3 py-1.5 text-xs font-semibold bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors'
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeleteTestCase(selectedTestCaseIndex)}
                              className='px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        {editingTestCaseData && (() => {
                          const inputFields = parseInputFields(editingTestCaseData.input || {});
                          return (
                            <div className='space-y-3'>
                              {Object.entries(inputFields).map(([key, value]) => (
                                <div key={key} className='flex items-center gap-2'>
                                  <label className='text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[80px]'>
                                    {key} =
                                  </label>
                                  <input
                                    type='text'
                                    value={typeof value === 'string' ? value : JSON.stringify(value)}
                                    onChange={(e) => {
                                      try {
                                        const parsed = JSON.parse(e.target.value);
                                        const currentInput = parseInputFields(editingTestCaseData.input || {});
                                        setEditingTestCaseData({
                                          ...editingTestCaseData,
                                          input: { ...currentInput, [key]: parsed },
                                        });
                                      } catch {
                                        const currentInput = parseInputFields(editingTestCaseData.input || {});
                                        setEditingTestCaseData({
                                          ...editingTestCaseData,
                                          input: { ...currentInput, [key]: e.target.value },
                                        });
                                      }
                                    }}
                                    className='flex-1 px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent'
                                  />
                                </div>
                              ))}
                              <div className='flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700'>
                                <label className='text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[80px]'>
                                  Expected =
                                </label>
                                <input
                                  type='text'
                                  value={typeof editingTestCaseData.expectedOutput === 'string' 
                                    ? editingTestCaseData.expectedOutput 
                                    : JSON.stringify(editingTestCaseData.expectedOutput || '')}
                                  onChange={(e) => {
                                    try {
                                      const parsed = JSON.parse(e.target.value);
                                      setEditingTestCaseData({
                                        ...editingTestCaseData,
                                        expectedOutput: parsed,
                                      });
                                    } catch {
                                      setEditingTestCaseData({
                                        ...editingTestCaseData,
                                        expectedOutput: e.target.value,
                                      });
                                    }
                                  }}
                                  className='flex-1 px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent'
                                />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      /* Display Test Case (Read-only for base, editable for custom) */
                      <div>
                        <div className='flex items-center justify-between mb-3'>
                          <span className='text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200'>
                            Test Case {selectedTestCaseIndex + 1}
                            {testCases[selectedTestCaseIndex].description && (
                              <span className='ml-2 text-xs font-normal text-gray-600 dark:text-gray-400'>
                                - {testCases[selectedTestCaseIndex].description}
                              </span>
                            )}
                            {selectedTestCaseIndex >= baseTestCases.length && (
                              <span className='ml-2 text-xs text-indigo-600 dark:text-indigo-400'>(Custom)</span>
                            )}
                          </span>
                          {selectedTestCaseIndex >= baseTestCases.length && (
                            <button
                              onClick={() => {
                                setEditingTestCaseIndex(selectedTestCaseIndex);
                                setEditingTestCaseData({ ...testCases[selectedTestCaseIndex] });
                              }}
                              className='px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors'
                            >
                              Edit
                            </button>
                          )}
                        </div>
                        {(() => {
                          const inputFields = getInputFields(testCases[selectedTestCaseIndex]);
                          return (
                            <div className='space-y-2.5'>
                              {Object.entries(inputFields).map(([key, value]) => (
                                <div key={key} className='flex items-center gap-2'>
                                  <span className='text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[80px]'>
                                    {key} =
                                  </span>
                                  <code className='flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-gray-100'>
                                    {JSON.stringify(value)}
                                  </code>
                                </div>
                              ))}
                              <div className='flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700'>
                                <span className='text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[80px]'>
                                  Expected =
                                </span>
                                <code className='flex-1 px-3 py-1.5 text-xs font-mono bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-700 dark:text-green-300'>
                                  {JSON.stringify(testCases[selectedTestCaseIndex].expectedOutput)}
                                </code>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Test Result Panel */
              <div className='space-y-3 sm:space-y-4'>
                {/* Run Output (Console) */}
                {runOutput && (
                  <div className='bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 shadow-sm'>
                    <div className='flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700'>
                      <span className='text-xs font-semibold text-gray-700 dark:text-gray-400'>Console Output:</span>
                      {runOutput.exitCode === 0 ? (
                        <CheckCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-500' />
                      ) : (
                        <XCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 dark:text-red-500' />
                      )}
                    </div>
                    {runOutput.stdout && (
                      <pre className='text-xs font-mono text-green-800 dark:text-green-400 whitespace-pre-wrap mb-2 break-words overflow-x-auto bg-white dark:bg-gray-900 p-2 rounded border border-green-100 dark:border-green-900/50'>
                        {runOutput.stdout}
                      </pre>
                    )}
                    {runOutput.stderr && (
                      <pre className='text-xs font-mono text-red-800 dark:text-red-400 whitespace-pre-wrap break-words overflow-x-auto bg-white dark:bg-gray-900 p-2 rounded border border-red-100 dark:border-red-900/50'>
                        {runOutput.stderr}
                      </pre>
                    )}
                    {!runOutput.stdout && !runOutput.stderr && (
                      <p className='text-xs text-gray-500 dark:text-gray-500 italic bg-gray-50 dark:bg-gray-900/50 p-2 rounded border border-gray-200 dark:border-gray-700'>No output</p>
                    )}
                  </div>
                )}

                {/* Test Results */}
                {testResults.length > 0 && (
                  <>
                    {/* Test Case Selection */}
                    <div className='flex items-center gap-1.5 sm:gap-2 flex-wrap overflow-x-auto pb-2 -mx-1 px-1'>
                      {testResults.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTestCaseIndex(index)}
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
                            selectedTestCaseIndex === index
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                              : testResults[index].passed
                                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800'
                                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800'
                          }`}
                        >
                          {testResults[index].passed ? (
                            <CheckCircle className='w-3 h-3 inline mr-1' />
                          ) : (
                            <XCircle className='w-3 h-3 inline mr-1' />
                          )}
                          Case {index + 1}
                        </button>
                      ))}
                    </div>

                    {/* Selected Test Case Result */}
                    {selectedTestCaseIndex >= 0 && selectedTestCaseIndex < testResults.length && (
                      <div
                        className={`p-3 sm:p-4 rounded-lg border ${
                          testResults[selectedTestCaseIndex].passed
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        }`}
                      >
                        <div className='flex flex-wrap items-center gap-2.5 mb-3'>
                          {testResults[selectedTestCaseIndex].passed ? (
                            <CheckCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0' />
                          ) : (
                            <XCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 dark:text-red-400 flex-shrink-0' />
                          )}
                          <span className='text-xs sm:text-sm font-medium text-gray-900 dark:text-white'>
                            Test Case {selectedTestCaseIndex + 1}
                          </span>
                          {testResults[selectedTestCaseIndex].testCase.description && (
                            <span className='text-xs text-gray-500 dark:text-gray-400 hidden sm:inline'>
                              {testResults[selectedTestCaseIndex].testCase.description}
                            </span>
                          )}
                        </div>
                        <div className='space-y-2 sm:space-y-2.5 text-xs'>
                          <div className='break-words'>
                            <span className='text-gray-500 dark:text-gray-400'>Input: </span>
                            <code className='text-gray-900 dark:text-gray-100 font-mono break-all'>
                              {JSON.stringify(testResults[selectedTestCaseIndex].testCase.input)}
                            </code>
                          </div>
                          <div className='break-words'>
                            <span className='text-gray-500 dark:text-gray-400'>Expected: </span>
                            <code className='text-green-700 dark:text-green-300 font-mono break-all'>
                              {JSON.stringify(testResults[selectedTestCaseIndex].testCase.expectedOutput)}
                            </code>
                          </div>
                          {testResults[selectedTestCaseIndex].actualOutput !== undefined && (
                            <div className='break-words'>
                              <span className='text-gray-500 dark:text-gray-400'>Output: </span>
                              <code
                                className={`font-mono break-all ${
                                  testResults[selectedTestCaseIndex].passed
                                    ? 'text-green-700 dark:text-green-300'
                                    : 'text-red-700 dark:text-red-300'
                                }`}
                              >
                                {JSON.stringify(testResults[selectedTestCaseIndex].actualOutput)}
                              </code>
                            </div>
                          )}
                          {testResults[selectedTestCaseIndex].error && (
                            <div className='text-red-600 dark:text-red-400 font-mono break-words'>
                              Error: {testResults[selectedTestCaseIndex].error}
                            </div>
                          )}
                          {/* Console Output (console.log statements) */}
                          {testResults[selectedTestCaseIndex].consoleOutput && (
                            <div className='mt-3 pt-3 border-t border-gray-200 dark:border-gray-700'>
                              <div className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2'>
                                Console Output:
                              </div>
                              <pre className='text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded border border-gray-200 dark:border-gray-700'>
                                {testResults[selectedTestCaseIndex].consoleOutput}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* All Tests Passed Message */}
                    {allTestsPassed && (
                      <div className='p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
                        <div className='flex items-center gap-2 sm:gap-3'>
                          <Trophy className='w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0' />
                          <div>
                            <h4 className='text-xs sm:text-sm font-semibold text-green-800 dark:text-green-200'>
                              All Tests Passed! 🎉
                            </h4>
                            <p className='text-xs text-green-700 dark:text-green-300'>
                              Congratulations! Your solution is correct.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Empty State */}
                {!runOutput && testResults.length === 0 && (
                  <div className='text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400'>
                    <p className='text-xs sm:text-sm'>Click "Run" to test your code or "Submit" to run all test cases</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
