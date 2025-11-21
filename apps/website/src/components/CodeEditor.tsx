'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Play, CheckCircle, XCircle, AlertCircle, Code2, RotateCcw, Copy, Check, Palette, Settings, ZoomIn, ZoomOut, ChevronRight } from 'lucide-react';

// Dynamically import Monaco Editor with SSR disabled
const Editor = dynamic(
  () => import('@monaco-editor/react').then((mod) => {
    console.log('✅ Monaco Editor module loaded');
    return mod;
  }),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-[350px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 sm:w-10 sm:h-10 animate-spin text-indigo-600 mx-auto mb-3' />
          <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Loading editor...</p>
        </div>
      </div>
    ),
  }
);

type MonacoTheme = 'vs-dark' | 'vs-light' | 'hc-black' | 'hc-light' | 'github-dark' | 'github-light' | 'monokai' | 'solarized-dark' | 'solarized-light';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (value: string | undefined) => void;
  onRun?: (code: string, language: string) => Promise<void>;
  height?: string;
  readOnly?: boolean;
  theme?: MonacoTheme;
  showThemeSelector?: boolean;
  showAdvancedOptions?: boolean;
  onSubmitSolution?: () => void;
  onNextQuestion?: () => void;
  isRunningTests?: boolean;
  hideActionButtons?: boolean; // Hide Run/Submit/Next buttons in toolbar
}

const availableThemes: { value: MonacoTheme; label: string; description: string }[] = [
  { value: 'vs-dark', label: 'VS Dark', description: 'Visual Studio Dark' },
  { value: 'vs-light', label: 'VS Light', description: 'Visual Studio Light' },
  { value: 'hc-black', label: 'High Contrast Dark', description: 'High contrast dark theme' },
  { value: 'hc-light', label: 'High Contrast Light', description: 'High contrast light theme' },
  { value: 'github-dark', label: 'GitHub Dark', description: 'GitHub dark theme' },
  { value: 'github-light', label: 'GitHub Light', description: 'GitHub light theme' },
  { value: 'monokai', label: 'Monokai', description: 'Monokai color scheme' },
  { value: 'solarized-dark', label: 'Solarized Dark', description: 'Solarized dark theme' },
  { value: 'solarized-light', label: 'Solarized Light', description: 'Solarized light theme' },
];

export default function CodeEditor({
  code,
  language,
  onChange,
  onRun,
  height = '400px',
  readOnly = false,
  theme: initialTheme = 'vs-dark',
  showThemeSelector = true,
  showAdvancedOptions = true,
  onSubmitSolution,
  onNextQuestion,
  isRunningTests = false,
  hideActionButtons = false,
}: CodeEditorProps) {
  const [editorValue, setEditorValue] = useState(code);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<{
    stdout: string;
    stderr: string;
    exitCode: number;
    compileOutput?: {
      stdout: string;
      stderr: string;
      exitCode: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<MonacoTheme>(initialTheme);
  const [fontSize, setFontSize] = useState(15);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditorValue(code);
  }, [code]);

  // Detect system theme and set appropriate editor theme
  useEffect(() => {
    const detectSystemTheme = () => {
      if (typeof window === 'undefined') return;
      
      // Check if user has a saved theme preference
      const savedTheme = localStorage.getItem('monaco-editor-theme') as MonacoTheme;
      if (savedTheme && availableThemes.some(t => t.value === savedTheme)) {
        setCurrentTheme(savedTheme);
        return;
      }

      // Detect system theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains('dark') || prefersDark;

      // Always use dark theme for code editor (better readability)
      // But if system is light and no preference saved, use a dark theme that works well
      if (!isDarkMode) {
        // In light mode, use a dark theme for the editor for better contrast
        setCurrentTheme('vs-dark');
      } else {
        // In dark mode, use dark theme
        setCurrentTheme('vs-dark');
      }
    };

    detectSystemTheme();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('monaco-editor-theme') as MonacoTheme;
      if (!savedTheme || !availableThemes.some(t => t.value === savedTheme)) {
        // Always prefer dark themes for code editors
        setCurrentTheme('vs-dark');
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // Save theme preference
  const handleThemeChange = (theme: MonacoTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('monaco-editor-theme', theme);
    setShowThemeMenu(false);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 10));
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.theme-menu-container') && !target.closest('.theme-button')) {
        setShowThemeMenu(false);
      }
    };

    if (showThemeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showThemeMenu]);

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || '';
    setEditorValue(newValue);
    onChange?.(newValue);
  };

  const handleRun = async () => {
    if (!onRun) return;

    setIsRunning(true);
    setError(null);
    setOutput(null);

    try {
      await onRun(editorValue, language);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run code');
    } finally {
      setIsRunning(false);
    }
  };

  // Extract function name from code
  const getFunctionName = (code: string): string | null => {
    const functionMatch = code.match(/function\s+(\w+)\s*\(/);
    if (functionMatch) {
      return functionMatch[1];
    }
    // Try arrow function or const function
    const arrowMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\(/);
    if (arrowMatch) {
      return arrowMatch[1];
    }
    return null;
  };

  const executeCode = async (codeToRun: string, lang: string) => {
    try {
      // For JavaScript, try to detect and call the function if it exists
      let codeToExecute = codeToRun;
      if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
        const functionName = getFunctionName(codeToRun);
        if (functionName) {
          // Try to call the function with sample inputs
          // For twoSum example: twoSum([2, 7, 11, 15], 9)
          codeToExecute = `${codeToRun}\n\n// Auto-execute function for testing\nif (typeof ${functionName} === 'function') {\n  try {\n    console.log('Calling ${functionName}...');\n    const result = ${functionName}([2, 7, 11, 15], 9);\n    console.log('Result:', result);\n  } catch (err) {\n    console.error('Error calling function:', err.message);\n  }\n} else {\n  console.log('Function ${functionName} not found or not callable');\n}`;
        }
      }

      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: codeToExecute,
          language: lang,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to execute code');
      }

      // Ensure we capture all output fields
      const outputData = {
        stdout: data.data.stdout || data.data.output || '',
        stderr: data.data.stderr || '',
        exitCode: data.data.exitCode || 0,
        compileOutput: data.data.compileOutput || null,
      };

      console.log('Code execution result:', outputData);
      setOutput(outputData);
      setError(null);
      
      // Scroll to output after a short delay
      setTimeout(() => {
        const outputElement = document.getElementById('code-editor-output');
        if (outputElement) {
          outputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (outputRef.current) {
          outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute code');
      throw err;
    }
  };

  const runCode = async (codeToRun: string, lang: string) => {
    if (onRun) {
      // If onRun is provided, call it (it should handle execution)
      await onRun(codeToRun, lang);
    } else {
      // Otherwise use default execution
      await executeCode(codeToRun, lang);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setEditorValue(code);
    setOutput(null);
    setError(null);
    onChange?.(code);
  };

  return (
    <div className='flex flex-col gap-2 sm:gap-4 h-full'>
      {/* Toolbar - Top Row: Language, Reset, Copy, Font Size, Theme */}
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg sm:rounded-t-xl border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
          <div className='flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm'>
            <Code2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400' />
            <span className='text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300'>
              {language.toUpperCase()}
            </span>
          </div>
          {!readOnly && (
            <>
              <button
                onClick={handleReset}
                className='inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600'
                title='Reset to original code'
              >
                <RotateCcw className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                <span className='hidden xs:inline'>Reset</span>
              </button>
              <button
                onClick={handleCopy}
                className='inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600'
                title='Copy code'
              >
                {copied ? (
                  <>
                    <Check className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600' />
                    <span className='text-green-600 hidden xs:inline'>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                    <span className='hidden xs:inline'>Copy</span>
                  </>
                )}
              </button>
            </>
          )}
          {showAdvancedOptions && (
            <>
              <div className='h-4 sm:h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block' />
              <div className='flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'>
                <button
                  onClick={decreaseFontSize}
                  className='p-0.5 sm:p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors'
                  title='Decrease font size'
                >
                  <ZoomOut className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400' />
                </button>
                <span className='text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[1.75rem] sm:min-w-[2rem] text-center'>
                  {fontSize}px
                </span>
                <button
                  onClick={increaseFontSize}
                  className='p-0.5 sm:p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors'
                  title='Increase font size'
                >
                  <ZoomIn className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400' />
                </button>
              </div>
            </>
          )}
        </div>
        <div className='flex items-center gap-1.5 sm:gap-2'>
          {showThemeSelector && (
            <div className='relative theme-menu-container'>
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  setShowSettingsMenu(false);
                }}
                className='theme-button inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600'
                title='Select theme'
              >
                <Palette className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                <span className='hidden sm:inline'>{availableThemes.find(t => t.value === currentTheme)?.label || 'Theme'}</span>
              </button>
              {showThemeMenu && (
                <div className='absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto'>
                  <div className='p-2'>
                    <div className='px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                      Select Theme
                    </div>
                    {availableThemes.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => handleThemeChange(theme.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          currentTheme === theme.value
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className='font-medium'>{theme.label}</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>{theme.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons Row - Bottom: Run, Submit, Next */}
      {!readOnly && !hideActionButtons && (
        <div className='flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700'>
          <button
            onClick={() => runCode(editorValue, language)}
            disabled={isRunning || !editorValue.trim()}
            className='inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none'
          >
            {isRunning ? (
              <>
                <Loader2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin' />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                <span>Run</span>
              </>
            )}
          </button>
          {onSubmitSolution && (
            <button
              onClick={onSubmitSolution}
              disabled={isRunningTests || !editorValue.trim()}
              className='inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none'
            >
              {isRunningTests ? (
                <>
                  <Loader2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin' />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                  <span>Submit</span>
                </>
              )}
            </button>
          )}
          {onNextQuestion && (
            <button
              onClick={onNextQuestion}
              className='inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
            >
              <span>Next Question</span>
              <ChevronRight className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
            </button>
          )}
        </div>
      )}

      {/* Editor Container - Use dark background for dark themes, light for light themes */}
      <div className={`border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg ${
        currentTheme.includes('dark') || currentTheme === 'monokai' || currentTheme === 'solarized-dark'
          ? 'bg-gray-900 dark:bg-gray-900'
          : 'bg-white dark:bg-gray-50'
      } ${height === '100%' ? 'flex-1 min-h-0 flex flex-col' : ''}`}>
        <Editor
          height={height === '100%' ? '100%' : height}
        language={language}
        value={editorValue}
        onChange={handleEditorChange}
        theme={currentTheme}
        options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: fontSize,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
            fontLigatures: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
              other: true,
              comments: false,
              strings: true,
            },
            parameterHints: {
              enabled: true,
            },
            bracketPairColorization: {
              enabled: true,
            },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            renderWhitespace: 'selection',
            selectOnLineNumbers: true,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            matchBrackets: 'always',
            colorDecorators: true,
            multiCursorModifier: 'ctrlCmd',
            accessibilitySupport: 'auto',
            // Advanced features
            codeLens: true,
            colorDecorators: true,
            contextmenu: true,
            copyWithSyntaxHighlighting: true,
            cursorSurroundingLines: 3,
            cursorSurroundingLinesStyle: 'all',
            dragAndDrop: true,
            emptySelectionClipboard: true,
            find: {
              addExtraSpaceOnTop: true,
              autoFindInSelection: 'never',
              seedSearchStringFromSelection: 'always',
            },
            fixedOverflowWidgets: true,
            links: true,
            mouseWheelZoom: true,
            multiCursorMergeOverlapping: true,
            occurrencesHighlight: true,
            renderControlCharacters: false,
            renderFinalNewline: 'on',
            renderLineHighlight: 'all',
            renderWhitespace: 'selection',
            scrollbar: {
              alwaysConsumeMouseWheel: true,
              vertical: 'auto',
              horizontal: 'auto',
            },
            snippetSuggestions: 'top',
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
              showVariables: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showIssues: true,
              showUsers: true,
              showStatuses: true,
            },
            tabCompletion: 'on',
            unicodeHighlight: {
              ambiguousCharacters: true,
              invisibleCharacters: true,
              nonBasicASCII: true,
            },
            wordBasedSuggestions: 'matchingDocuments',
          }}
          onMount={(editor, monaco) => {
            // Configure Monaco if needed
            try {
              if (monaco && editor) {
                console.log('✅ Monaco Editor initialized successfully');
                
                // Add keyboard shortcuts
                try {
                  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                    if (!readOnly && !isRunning) {
                      runCode(editorValue, language);
                    }
                  });
                } catch (cmdError) {
                  console.warn('Could not add keyboard shortcut:', cmdError);
                }
              } else {
                console.error('Monaco Editor or editor instance is null');
              }
            } catch (error) {
              console.error('Error configuring Monaco Editor:', error);
            }
          }}
          beforeMount={(monaco) => {
            // Configure Monaco before mounting
            if (monaco) {
              console.log('🔧 Configuring Monaco Editor before mount...');
              
              // Configure Monaco to use local build instead of CDN
              // This prevents CSP issues by not loading from external CDN
              if (typeof window !== 'undefined') {
                // Set the loader path to use local Monaco build
                // @monaco-editor/react bundles Monaco locally, so we don't need CDN
                const monacoEnv = (window as any).monaco?.env || {};
                if (!monacoEnv.baseUrl) {
                  // Monaco is bundled, no need for CDN loader
                  console.log('✅ Using bundled Monaco Editor (no CDN required)');
                }
              }
              
              // Define custom themes
              monaco.editor.defineTheme('github-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
                  { token: 'keyword', foreground: 'd73a49' },
                  { token: 'string', foreground: '032f62' },
                  { token: 'number', foreground: '005cc5' },
                ],
                colors: {
                  'editor.background': '#0d1117',
                  'editor.foreground': '#c9d1d9',
                },
              });

              monaco.editor.defineTheme('github-light', {
                base: 'vs',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
                  { token: 'keyword', foreground: 'd73a49' },
                  { token: 'string', foreground: '032f62' },
                  { token: 'number', foreground: '005cc5' },
                ],
                colors: {
                  'editor.background': '#ffffff',
                  'editor.foreground': '#24292e',
                },
              });

              monaco.editor.defineTheme('monokai', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
                  { token: 'keyword', foreground: 'f92672' },
                  { token: 'string', foreground: 'e6db74' },
                  { token: 'number', foreground: 'ae81ff' },
                ],
                colors: {
                  'editor.background': '#272822',
                  'editor.foreground': '#f8f8f2',
                },
              });

              monaco.editor.defineTheme('solarized-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '586e75', fontStyle: 'italic' },
                  { token: 'keyword', foreground: '859900' },
                  { token: 'string', foreground: '2aa198' },
                  { token: 'number', foreground: 'd33682' },
                ],
                colors: {
                  'editor.background': '#002b36',
                  'editor.foreground': '#839496',
                },
              });

              monaco.editor.defineTheme('solarized-light', {
                base: 'vs',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
                  { token: 'keyword', foreground: '859900' },
                  { token: 'string', foreground: '2aa198' },
                  { token: 'number', foreground: 'd33682' },
                ],
                colors: {
                  'editor.background': '#fdf6e3',
                  'editor.foreground': '#657b83',
                },
              });

              console.log('✅ Custom themes defined');
            }
          }}
          onValidate={(markers) => {
            // Handle validation markers if needed
            if (markers.length > 0) {
              console.log('Editor validation markers:', markers);
            }
          }}
        />
      </div>

      {output && (
        <div ref={outputRef} className='mt-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md'>
          <div className='flex items-center gap-3 mb-4'>
            {output.exitCode === 0 ? (
              <div className='flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800'>
                <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                <span className='font-semibold text-green-800 dark:text-green-200'>
                  Execution Successful
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800'>
                <XCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
                <span className='font-semibold text-red-800 dark:text-red-200'>
                  Execution Failed (Exit Code: {output.exitCode})
                </span>
              </div>
            )}
          </div>

          {output.compileOutput && (
            <div className='mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800'>
              <div className='flex items-center gap-2 mb-2'>
                <AlertCircle className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
                <span className='text-sm font-semibold text-yellow-800 dark:text-yellow-200'>
                  Compilation Output
                </span>
              </div>
              {output.compileOutput.stderr && (
                <pre className='text-sm text-yellow-700 dark:text-yellow-300 whitespace-pre-wrap font-mono bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded border border-yellow-300 dark:border-yellow-700'>
                  {output.compileOutput.stderr}
                </pre>
              )}
              {output.compileOutput.stdout && (
                <pre className='text-sm text-yellow-700 dark:text-yellow-300 whitespace-pre-wrap font-mono bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded border border-yellow-300 dark:border-yellow-700'>
                  {output.compileOutput.stdout}
                </pre>
              )}
            </div>
          )}

          {output.stderr && (
            <div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-800'>
              <div className='flex items-center gap-2 mb-2'>
                <XCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
                <span className='text-sm font-semibold text-red-800 dark:text-red-200'>Runtime Error</span>
              </div>
              <pre className='text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono bg-red-100 dark:bg-red-900/30 p-3 rounded border border-red-300 dark:border-red-700'>
                {output.stderr}
              </pre>
            </div>
          )}

          {(output.stdout || output.stderr) && (
            <div id='code-editor-output' className='p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700'>
              <div className='flex items-center gap-2 mb-2'>
                <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                <span className='text-sm font-semibold text-gray-800 dark:text-gray-200'>Output</span>
              </div>
              {output.stdout && (
                <pre className='text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-300 dark:border-gray-600 mb-2'>
                  {output.stdout}
                </pre>
              )}
              {output.stderr && (
                <pre className='text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono bg-red-50 dark:bg-red-900/30 p-3 rounded border border-red-300 dark:border-red-700'>
                  {output.stderr}
                </pre>
              )}
            </div>
          )}

          {!output.stdout && !output.stderr && output.exitCode === 0 && (
            <div id='code-editor-output' className='p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700'>
              <p className='text-sm text-gray-500 dark:text-gray-400 italic text-center'>
                Code executed successfully but produced no output. Use console.log() to see output.
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className='mt-2 p-5 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border-2 border-red-200 dark:border-red-800 shadow-md'>
          <div className='flex items-center gap-3 mb-2'>
            <XCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
            <span className='font-semibold text-red-800 dark:text-red-200'>Execution Error</span>
          </div>
          <p className='text-sm text-red-700 dark:text-red-300 mt-2 font-mono bg-red-100 dark:bg-red-900/30 p-3 rounded border border-red-300 dark:border-red-700'>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

