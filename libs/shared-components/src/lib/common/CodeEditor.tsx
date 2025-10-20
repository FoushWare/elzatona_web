'use client';

import { useState, useRef, memo } from 'react';
import Editor from '@monaco-editor/react';
import { Challenge } from '@/types/challenge';

interface CodeEditorProps {
  challenge: Challenge;
  onCodeChange?: (html: string, css: string, javascript: string) => void;
}

const CodeEditor = memo(function CodeEditor({
  challenge,
  onCodeChange,
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>(
    'html'
  );
  const [htmlCode, setHtmlCode] = useState(challenge.starterCode.html);
  const [cssCode, setCssCode] = useState(challenge.starterCode.css);
  const [javascriptCode, setJavascriptCode] = useState(
    challenge.starterCode.javascript
  );

  const htmlEditorRef = useRef<unknown>(null);
  const cssEditorRef = useRef<unknown>(null);
  const javascriptEditorRef = useRef<unknown>(null);

  const handleEditorDidMount = (
    editor: unknown,
    monaco: unknown,
    language: string
  ) => {
    if (language === 'html') {
      htmlEditorRef.current = editor;
    } else if (language === 'css') {
      cssEditorRef.current = editor;
    } else if (language === 'javascript') {
      javascriptEditorRef.current = editor;
    }
  };

  const handleCodeChange = (value: string | undefined, language: string) => {
    if (!value) return;

    if (language === 'html') {
      setHtmlCode(value);
    } else if (language === 'css') {
      setCssCode(value);
    } else if (language === 'javascript') {
      setJavascriptCode(value);
    }

    // Notify parent component of code changes
    if (onCodeChange) {
      onCodeChange(htmlCode, cssCode, javascriptCode);
    }
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html':
        return htmlCode;
      case 'css':
        return cssCode;
      case 'javascript':
        return javascriptCode;
      default:
        return '';
    }
  };

  const getLanguage = () => {
    switch (activeTab) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'javascript':
        return 'javascript';
      default:
        return 'html';
    }
  };

  const resetToStarter = () => {
    setHtmlCode(challenge.starterCode.html);
    setCssCode(challenge.starterCode.css);
    setJavascriptCode(challenge.starterCode.javascript);
  };

  const resetToSolution = () => {
    setHtmlCode(challenge.solution.html);
    setCssCode(challenge.solution.css);
    setJavascriptCode(challenge.solution.javascript);
  };

  return (
    <div className='h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden'>
      {/* Editor Header */}
      <div className='bg-muted border-b border-border'>
        <div className='flex items-center justify-between px-4 py-2'>
          <div className='flex space-x-1'>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === 'html'
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === 'css'
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab('javascript')}
              className={`px-3 py-1 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === 'javascript'
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              JavaScript
            </button>
          </div>

          <div className='flex space-x-2'>
            <button
              onClick={resetToStarter}
              className='px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors'
            >
              Reset to Starter
            </button>
            <button
              onClick={resetToSolution}
              className='px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors'
            >
              Show Solution
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className='flex-1'>
        <Editor
          height='100%'
          language={getLanguage()}
          value={getCurrentCode()}
          onChange={value => handleCodeChange(value, getLanguage())}
          onMount={(editor, monaco) =>
            handleEditorDidMount(editor, monaco, getLanguage())
          }
          theme='vs-dark'
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: {
              enabled: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
              showVariables: true,
            },
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: true,
            trimAutoWhitespace: true,
            largeFileOptimizations: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
});

export default CodeEditor;
