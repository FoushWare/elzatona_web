'use client';

import React, { useState, useEffect } from 'react';
import { FormModal, QuestionContent } from '@elzatona/shared-components';
import { UnifiedQuestion } from '@elzatona/shared-types';
import { Target, Info, BookOpen, Video, FileText, GraduationCap, CheckCircle, XCircle } from 'lucide-react';

// Helper function to format code with proper line breaks and indentation
const formatCodeForDisplay = (code: string): string => {
  if (!code) return '';
  
  // Convert code to string if it's not already
  let codeStr = String(code);
  
  // CRITICAL: Convert \n escape sequences to actual newlines FIRST
  // The code might come from database as a string with literal "\n" characters
  // We MUST convert these to actual newline characters before any other processing
  
  // Step 1: Replace literal backslash-n sequences (the two characters: \ and n)
  // This is the most important step - it converts "\\n" (literal) to "\n" (actual newline)
  let formatted = codeStr.replace(/\\n/g, '\n');
  
  // Step 2: Handle \r\n combinations (escape sequences)
  formatted = formatted.replace(/\\r\\n/g, '\n');
  
  // Step 3: Handle \r escape sequences
  formatted = formatted.replace(/\\r/g, '\n');
  
  // Step 4: Normalize actual line breaks (Windows, Mac, Unix)
  formatted = formatted.replace(/\r\n/g, '\n');  // Windows line breaks
  formatted = formatted.replace(/\r/g, '\n');    // Mac line breaks
  
  // IMPORTANT: At this point, we have actual \n characters in the string
  // We must preserve ALL of them - don't collapse or remove any
  
  // Remove only leading/trailing whitespace (not newlines)
  formatted = formatted.trim();
  
  // Remove empty lines ONLY at the very start (not all leading newlines)
  while (formatted.startsWith('\n')) {
    formatted = formatted.substring(1);
  }
  
  // Check if code already has proper formatting (multiple lines with indentation)
  const lines = formatted.split('\n');
  const hasMultipleLines = lines.length > 1;
  const hasIndentation = lines.some(line => line.trim().length > 0 && /^\s+/.test(line));
  const hasProperStructure = hasMultipleLines && (hasIndentation || lines.filter(l => l.trim()).length > 3);
  
  // If code already has proper formatting, just normalize indentation
  // BUT preserve ALL newlines - don't collapse them
  if (hasProperStructure) {
    // Preserve existing structure, just normalize indentation
    const codeLines = formatted.split('\n');
    let indentLevel = 0;
    const formattedLines: string[] = [];
    
    for (let i = 0; i < codeLines.length; i++) {
      const originalLine = codeLines[i];
      const trimmed = originalLine.trim();
      
      // CRITICAL: Preserve empty lines - don't skip them
      if (!trimmed) {
        formattedLines.push('');
        continue;
      }
      
      // Decrease indent before closing braces/brackets
      if (trimmed.match(/^[}\]\)]/)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      // Add the line with proper indentation
      formattedLines.push('  '.repeat(indentLevel) + trimmed);
      
      // Calculate net braces/brackets/parens for this line
      const openBraces = (trimmed.match(/{/g) || []).length;
      const closeBraces = (trimmed.match(/}/g) || []).length;
      const openBrackets = (trimmed.match(/\[/g) || []).length;
      const closeBrackets = (trimmed.match(/\]/g) || []).length;
      const openParens = (trimmed.match(/\(/g) || []).length;
      const closeParens = (trimmed.match(/\)/g) || []).length;
      
      // Increase indent after opening braces/brackets/parens
      const netIncrease = Math.max(
        openBraces - closeBraces,
        openBrackets - closeBrackets,
        openParens - closeParens
      );
      
      if (netIncrease > 0) {
        indentLevel += netIncrease;
      }
    }
    
    // Join with newlines - preserve ALL newlines
    let result = formattedLines.join('\n');
    // Only limit excessive empty lines (3+ consecutive), but preserve single and double newlines
    result = result.replace(/\n{4,}/g, '\n\n\n'); // Max 3 consecutive newlines
    return result.trimEnd();
  }
  
  // If code is on a single line or poorly formatted, try to format it intelligently
  // Add line breaks after semicolons (but not in strings)
  formatted = formatted.replace(/;(?![^"']*["'])/g, ';\n');
  
  // Add line breaks after opening braces
  formatted = formatted.replace(/\{\s*/g, '{\n');
  
  // Add line breaks before closing braces
  formatted = formatted.replace(/\s*\}/g, '\n}');
  
  // Add line breaks after closing braces followed by non-whitespace
  formatted = formatted.replace(/\}\s*([^\s}])/g, '}\n\n$1');
  
  // Clean up multiple consecutive line breaks (max 2)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  // Now apply indentation formatting
  const codeLines = formatted.split('\n').map(line => line.trimEnd());
  let indentLevel = 0;
  const formattedLines: string[] = [];
  
  for (let i = 0; i < codeLines.length; i++) {
    let line = codeLines[i].trim();
    if (!line) {
      // Only add empty line if previous line wasn't empty
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }
    
    // Decrease indent before closing braces/brackets
    if (line.match(/^[}\]\)]/)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    // Add the line with proper indentation
    formattedLines.push('  '.repeat(indentLevel) + line);
    
    // Calculate net braces/brackets/parens for this line
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    const openBrackets = (line.match(/\[/g) || []).length;
    const closeBrackets = (line.match(/\]/g) || []).length;
    const openParens = (line.match(/\(/g) || []).length;
    const closeParens = (line.match(/\)/g) || []).length;
    
    // Increase indent after opening braces/brackets/parens
    const netIncrease = Math.max(
      openBraces - closeBraces,
      openBrackets - closeBrackets,
      openParens - closeParens
    );
    
    if (netIncrease > 0) {
      indentLevel += netIncrease;
    }
  }
  
  // Clean up final result
  let result = formattedLines.join('\n');
  result = result.replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines
  return result.trimEnd();
};

interface ViewQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: UnifiedQuestion | null;
  cards: any[];
  allCategories: string[];
  categoriesData: any[];
  topicsData: any[];
}

const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

export function ViewQuestionModal({
  isOpen,
  onClose,
  question,
  cards,
  allCategories,
  categoriesData,
  topicsData,
}: ViewQuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    if (question) {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [question?.id]);

  if (!question) return null;

  const cleanQuestionTitle = (title: string) => {
    if (!title) return '';
    return title.replace(/"/g, '').replace(/'/g, '').trim();
  };


  const handleAnswerSelect = (optionText: string) => {
    if (selectedAnswer) return; // Already answered
    setSelectedAnswer(optionText);
    setShowExplanation(true);
  };

  const isCorrectAnswer = (optionText: string) => {
    const correctOption = question.options?.find((opt: any) => opt.isCorrect);
    return correctOption?.text === optionText;
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Question Details"
      maxWidth="max-w-4xl"
      bodyClassName="space-y-6"
      cancelLabel="Close"
    >
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/50 dark:to-purple-800/50 rounded-lg shadow-sm">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                {question.difficulty || 'beginner'}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                {question.type || 'multiple-choice'}
              </span>
            </div>
          </div>
        </div>

        {/* Question Content - Display content first, then code if available */}
        <div className="space-y-4">
          {/* Question Content */}
          {question.content && (
            <div className="text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed">
              <QuestionContent content={question.content} />
            </div>
          )}

          {/* Question Code - Display after content if code exists */}
          {question.code && (
            <>
              {/* Empty line before code */}
              <div className="mt-4"></div>
              {/* Code display styled like an image/screenshot */}
              <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-300 dark:border-gray-600 bg-gray-900">
                {/* Code editor header bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2 font-mono">code.js</span>
                  </div>
                </div>
                {/* Code content - styled like a code editor */}
                <div className="overflow-x-auto bg-gray-900">
                  <pre className="m-0 p-4 text-sm font-mono text-gray-100 leading-relaxed whitespace-pre">
                    <code className="block">
                      {(() => {
                        // Get the raw code from question
                        const rawCode = String(question.code || '');
                        
                        // CRITICAL: Convert \n escape sequences to actual newlines FIRST
                        // The code might come from database as a string with literal "\n" characters (backslash + n)
                        // We MUST convert these to actual newline characters (\n) before formatting
                        let codeWithNewlines = rawCode
                          .replace(/\\n/g, '\n')      // Replace \n escape sequences with actual newlines
                          .replace(/\\r\\n/g, '\n')   // Replace \r\n escape sequences
                          .replace(/\\r/g, '\n')      // Replace \r escape sequences
                          .replace(/\r\n/g, '\n')     // Normalize Windows line breaks
                          .replace(/\r/g, '\n');      // Normalize Mac line breaks
                        
                        // Now format the code (this preserves structure and adds indentation)
                        const formattedCode = formatCodeForDisplay(codeWithNewlines);
                        
                        // Split by newlines - each line will be displayed separately
                        const codeLines = formattedCode.split('\n');
                        
                        // Map each line to a div with line number
                        return codeLines.map((line, index) => (
                          <div key={index} className="flex">
                            <span className="text-gray-500 select-none pr-4 text-right min-w-[3rem]">
                              {index + 1}
                            </span>
                            <span className="flex-1 whitespace-pre">{line || ' '}</span>
                          </div>
                        ));
                      })()}
                    </code>
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Answer Options */}
        {question.options && question.options.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Answer Options
            </h3>
            {question.options.map((option: any, index: number) => {
              const optionId = option.id || `option-${index}`;
              const optionLetter = getOptionLetter(index);
              const isCorrect = option.isCorrect;
              const isSelected = selectedAnswer === option.text;
              const isWrong = isSelected && !isCorrect;
              const showFeedback = selectedAnswer !== null;

              return (
                <button
                  key={optionId}
                  onClick={() => handleAnswerSelect(option.text)}
                  disabled={!!selectedAnswer}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                    !selectedAnswer
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100 cursor-pointer'
                      : isCorrect
                        ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]'
                        : isWrong
                          ? 'border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60'
                  } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-4 sm:space-x-5">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${
                        isCorrect && showFeedback
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50'
                          : isWrong
                            ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50'
                            : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200'
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <QuestionContent content={option.text || ''} />
                      {option.explanation && showFeedback && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                          {option.explanation}
                        </p>
                      )}
                    </div>
                    {isCorrect && showFeedback && (
                      <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300">
                        <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                    {isWrong && (
                      <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300">
                        <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              No answer options available for this question
            </p>
          </div>
        )}

        {/* Explanation - Show after answer selection or always visible */}
        {question.explanation && (showExplanation || !selectedAnswer) && (
          <div className={`mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200/50 dark:shadow-blue-900/30 ${showExplanation ? 'animate-in fade-in slide-in-from-bottom-4 duration-500' : ''}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-md">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
                Explanation
              </p>
            </div>
            <div className="text-sm sm:text-base text-blue-800 dark:text-blue-200 leading-relaxed pl-1">
              <QuestionContent content={question.explanation} />
            </div>
          </div>
        )}

        {/* Learning Resources */}
        {question.resources && Array.isArray(question.resources) && question.resources.length > 0 && (
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 dark:from-indigo-900/40 dark:via-violet-900/40 dark:to-purple-900/40 border-2 border-indigo-300 dark:border-indigo-600 rounded-xl sm:rounded-2xl shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/40">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-indigo-600 dark:bg-indigo-500 rounded-lg shadow-md">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-base sm:text-lg font-bold text-indigo-900 dark:text-indigo-100">
                Learning Resources
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {question.resources.map((resource: any, index: number) => {
                const getIcon = () => {
                  switch (resource.type) {
                    case 'video':
                      return <Video className="w-5 h-5 sm:w-6 sm:h-6" />;
                    case 'course':
                      return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />;
                    case 'article':
                      return <FileText className="w-5 h-5 sm:w-6 sm:h-6" />;
                    default:
                      return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />;
                  }
                };

                const getTypeColor = () => {
                  switch (resource.type) {
                    case 'video':
                      return 'from-red-500 to-pink-600 dark:from-red-500 dark:to-rose-600 border-red-400 dark:border-red-500';
                    case 'course':
                      return 'from-blue-500 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 border-blue-400 dark:border-blue-400';
                    case 'article':
                      return 'from-green-500 to-emerald-600 dark:from-green-500 dark:to-emerald-500 border-green-400 dark:border-green-400';
                    default:
                      return 'from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-500 border-indigo-400 dark:border-indigo-400';
                  }
                };

                const getTypeLabel = () => {
                  switch (resource.type) {
                    case 'video':
                      return 'Video';
                    case 'course':
                      return 'Course';
                    case 'article':
                      return 'Article';
                    default:
                      return 'Resource';
                  }
                };

                return (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-4 rounded-xl border-2 bg-gradient-to-r ${getTypeColor()} text-white shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all transform hover:scale-[1.02]`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">{getIcon()}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold uppercase tracking-wider text-white/95">
                            {getTypeLabel()}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold mb-1 truncate text-white">
                          {resource.title}
                        </h4>
                        {resource.description && (
                          <p className="text-sm text-white/95 line-clamp-2 leading-relaxed">
                            {resource.description}
                          </p>
                        )}
                        {resource.duration && (
                          <p className="text-xs text-white/85 mt-1">
                            Duration: {resource.duration}
                          </p>
                        )}
                        {resource.author && (
                          <p className="text-xs text-white/85">
                            By: {resource.author}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </FormModal>
  );
}

