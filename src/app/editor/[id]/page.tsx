'use client';

import { useState, useEffect } from 'react';
import { getChallengeById } from '@/lib/challenges';
import { Challenge } from '@/types/challenge';
import { notFound } from 'next/navigation';
import CodeEditor from '@/components/CodeEditor';
import TestRunner from '@/components/TestRunner';

interface EditorPageProps {
  params: {
    id: string;
  };
}

export default function EditorPage({ params }: EditorPageProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [javascriptCode, setJavascriptCode] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [isTestRunnerVisible, setIsTestRunnerVisible] = useState(false);

  useEffect(() => {
    const foundChallenge = getChallengeById(params.id);
    if (!foundChallenge) {
      notFound();
    }
    setChallenge(foundChallenge);
    setHtmlCode(foundChallenge.starterCode.html);
    setCssCode(foundChallenge.starterCode.css);
    setJavascriptCode(foundChallenge.starterCode.javascript);
  }, [params.id]);

  const handleCodeChange = (html: string, css: string, javascript: string) => {
    setHtmlCode(html);
    setCssCode(css);
    setJavascriptCode(javascript);
  };

  const getPreviewContent = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${challenge?.title || 'Challenge Preview'}</title>
          <style>
              ${cssCode}
          </style>
      </head>
      <body>
          ${htmlCode}
          <script>
              // Capture console.log for display
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;
              
              const logs = [];
              
              console.log = function(...args) {
                  logs.push({ type: 'log', args, timestamp: new Date().toLocaleTimeString() });
                  originalLog.apply(console, args);
              };
              
              console.error = function(...args) {
                  logs.push({ type: 'error', args, timestamp: new Date().toLocaleTimeString() });
                  originalError.apply(console, args);
              };
              
              console.warn = function(...args) {
                  logs.push({ type: 'warn', args, timestamp: new Date().toLocaleTimeString() });
                  originalWarn.apply(console, args);
              };
              
              // Send logs to parent
              window.addEventListener('message', function(event) {
                  if (event.data.type === 'getLogs') {
                      event.source.postMessage({ type: 'logs', logs }, event.origin);
                  }
              });
              
              ${javascriptCode}
          </script>
      </body>
      </html>
    `;
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="text-gray-300 hover:text-white"
            >
              ← Back
            </button>
            <h1 className="text-white font-semibold">{challenge.title}</h1>
            <div className="flex space-x-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  challenge.difficulty === 'easy'
                    ? 'bg-green-600 text-white'
                    : challenge.difficulty === 'medium'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-red-600 text-white'
                }`}
              >
                {challenge.difficulty}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-600 text-white">
                {challenge.category.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isPreviewVisible
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {isPreviewVisible ? 'Hide' : 'Show'} Preview
            </button>
            <button
              onClick={() => setIsConsoleVisible(!isConsoleVisible)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isConsoleVisible
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {isConsoleVisible ? 'Hide' : 'Show'} Console
            </button>
            <button
              onClick={() => setIsTestRunnerVisible(!isTestRunnerVisible)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isTestRunnerVisible
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {isTestRunnerVisible ? 'Hide' : 'Show'} Tests
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div
          className={`${isPreviewVisible ? 'w-1/2' : 'w-full'} flex flex-col`}
        >
          <CodeEditor challenge={challenge} onCodeChange={handleCodeChange} />
        </div>

        {/* Preview */}
        {isPreviewVisible && (
          <div className="w-1/2 flex flex-col bg-white">
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
              <h3 className="text-sm font-medium text-gray-700">
                Live Preview
              </h3>
            </div>

            <div className="flex-1 relative">
              <iframe
                srcDoc={getPreviewContent()}
                className="w-full h-full border-0"
                title="Challenge Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            {/* Console */}
            {isConsoleVisible && (
              <div className="h-48 bg-gray-900 border-t border-gray-700">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <h3 className="text-sm font-medium text-gray-300">Console</h3>
                </div>
                <div className="p-4 text-green-400 text-sm font-mono overflow-y-auto h-40">
                  <div>Console output will appear here...</div>
                  <div>Use console.log() to see your output</div>
                </div>
              </div>
            )}

            {/* Test Runner */}
            {isTestRunnerVisible && (
              <div className="h-96 border-t border-gray-200 overflow-y-auto">
                <TestRunner
                  testCases={challenge.testCases}
                  userCode={{
                    html: htmlCode,
                    css: cssCode,
                    javascript: javascriptCode,
                  }}
                  onTestComplete={results => {
                    console.log('Test results:', results);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
