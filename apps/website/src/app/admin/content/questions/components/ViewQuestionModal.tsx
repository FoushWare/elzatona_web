'use client';

import React, { useState, useEffect } from 'react';
import { FormModal, QuestionContent } from '@elzatona/components';
import { UnifiedQuestion } from '@elzatona/shared-types';
import { Target, Info, BookOpen, Video, FileText, GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import { createHighlighter, type Highlighter } from 'shiki';

// Helper function to format code with proper line breaks and indentation
const formatCodeForDisplay = (code: string): string => {
  if (!code) return '';
  
  // Convert code to string if it's not already
  const codeStr = String(code);
  
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
    const line = codeLines[i].trim();
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

  // Shiki syntax highlighting
  const [shikiHighlighter, setShikiHighlighter] = useState<Highlighter | null>(null);
  const [isLoadingShiki, setIsLoadingShiki] = useState(true);
  const [codeHighlightedHtml, setCodeHighlightedHtml] = useState<string>('');

  // Initialize Shiki highlighter
  useEffect(() => {
    let mounted = true;
    
    const initShiki = async () => {
      try {
        const highlighter = await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: ['javascript', 'typescript', 'python', 'java', 'jsx', 'tsx', 'json', 'html', 'css'],
        });
        
        if (mounted) {
          setShikiHighlighter(highlighter);
          setIsLoadingShiki(false);
        }
      } catch (error) {
        console.error('Error initializing Shiki:', error);
        setIsLoadingShiki(false);
      }
    };

    initShiki();

    return () => {
      mounted = false;
    };
  }, []);

  // Highlight code when it changes or highlighter is ready
  useEffect(() => {
    if (!shikiHighlighter || !question?.codeTemplate) {
      setCodeHighlightedHtml('');
      console.log('ViewQuestionModal - Shiki highlighting skipped:', {
        hasHighlighter: !!shikiHighlighter,
        hasCode: !!question?.codeTemplate,
        codeValue: question?.codeTemplate ? String(question.codeTemplate).substring(0, 50) : null,
      });
      return;
    }

    try {
      const rawCode = String(question.codeTemplate || '');
      console.log('ViewQuestionModal - Processing code for highlighting:', {
        rawCodeLength: rawCode.length,
        rawCodePreview: rawCode.substring(0, 100),
      });
      let codeWithNewlines = rawCode
        .replace(/\\n/g, '\n')
        .replace(/\\r\\n/g, '\n')
        .replace(/\\r/g, '\n')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim();
      
      // Remove empty lines at the start
      while (codeWithNewlines.startsWith('\n')) {
        codeWithNewlines = codeWithNewlines.substring(1);
      }
      
      // Remove empty lines at the end
      while (codeWithNewlines.endsWith('\n')) {
        codeWithNewlines = codeWithNewlines.slice(0, -1);
      }
      
      // Remove ALL blank lines - split by newlines, filter out empty lines, rejoin
      const lines = codeWithNewlines.split('\n');
      const nonEmptyLines = lines.filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 0;
      });
      codeWithNewlines = nonEmptyLines.join('\n');
      
      // Final check: ensure no consecutive newlines remain
      if (codeWithNewlines.includes('\n\n')) {
        codeWithNewlines = codeWithNewlines.replace(/\n{2,}/g, '\n');
      }

      // Detect language
      let lang = 'javascript';
      const codeText = codeWithNewlines.toLowerCase();
      if (codeText.includes('def ') || (codeText.includes('import ') && codeText.includes('print'))) {
        lang = 'python';
      } else if (codeText.includes('public class') || codeText.includes('public static')) {
        lang = 'java';
      } else if (codeText.includes('interface ') || codeText.includes('type ') || codeText.includes(': string')) {
        lang = 'typescript';
      }

      // Detect theme based on system preference
      const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themeName = prefersDark ? 'github-dark' : 'github-light';
      
      let html = shikiHighlighter.codeToHtml(codeWithNewlines, {
        lang: lang === 'typescript' ? 'ts' : lang === 'javascript' ? 'js' : lang,
        theme: themeName,
      });
      
      // Post-process HTML for light mode color adjustments
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (!prefersDark) {
          // In light mode, darken any colors that are too light
          try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const preElement = tempDiv.querySelector('pre');
            if (preElement) {
              const codeElement = preElement.querySelector('code');
              if (codeElement) {
                // Remove empty lines
                const lines = Array.from(codeElement.querySelectorAll('.line'));
                lines.forEach((line) => {
                  const text = (line.textContent || '').trim();
                  if (text.length === 0) {
                    line.remove();
                  }
                });
                
                // Process all spans to ensure visibility in light mode
                const allSpans = codeElement.querySelectorAll('span');
                allSpans.forEach((el) => {
                  const style = (el as HTMLElement).getAttribute('style') || '';
                  const colorMatch = style.match(/color:\s*(#[0-9a-fA-F]{6}|rgb\([^)]+\))/i);
                  
                  if (colorMatch) {
                    const colorValue = colorMatch[1];
                    let shouldReplace = false;
                    let newColor = colorValue;
                    
                    if (colorValue.startsWith('#')) {
                      const hex = colorValue.substring(1);
                      const r = parseInt(hex.substr(0, 2), 16);
                      const g = parseInt(hex.substr(2, 2), 16);
                      const b = parseInt(hex.substr(4, 2), 16);
                      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                      
                      if (brightness > 180) {
                        const factor = brightness > 220 ? 0.3 : 0.5;
                        const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
                        const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
                        const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
                        newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
                        shouldReplace = true;
                      }
                    } else if (colorValue.startsWith('rgb')) {
                      const rgbMatch = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                      if (rgbMatch) {
                        const r = parseInt(rgbMatch[1]);
                        const g = parseInt(rgbMatch[2]);
                        const b = parseInt(rgbMatch[3]);
                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                        
                        if (brightness > 180) {
                          const factor = brightness > 220 ? 0.3 : 0.5;
                          const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
                          const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
                          const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
                          newColor = `rgb(${newR}, ${newG}, ${newB})`;
                          shouldReplace = true;
                        }
                      }
                    }
                    
                    if (shouldReplace) {
                      const newStyle = style.replace(/color:\s*(#[0-9a-fA-F]{6}|rgb\([^)]+\))/i, `color: ${newColor}`);
                      (el as HTMLElement).setAttribute('style', newStyle);
                    }
                  } else if (!style) {
                    const text = (el as HTMLElement).textContent || '';
                    if (text.trim().length > 0) {
                      (el as HTMLElement).setAttribute('style', 'color: #24292e;');
                    }
                  }
                });
                
                html = `<pre><code>${codeElement.innerHTML}</code></pre>`;
              }
            }
          } catch (e) {
            console.warn('DOM parsing for color adjustment failed:', e);
          }
        }
      }

      console.log('ViewQuestionModal - Code highlighted successfully:', {
        htmlLength: html.length,
        hasContent: html.length > 0,
        htmlPreview: html.substring(0, 200),
      });
      setCodeHighlightedHtml(html);
    } catch (error) {
      console.error('ViewQuestionModal - Error highlighting code:', error);
      setCodeHighlightedHtml('');
    }
  }, [shikiHighlighter, question?.codeTemplate]);

  // Reset state when question changes
  useEffect(() => {
    if (question) {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [question?.id]);

  // Debug: Log question data to check if code field exists
  useEffect(() => {
    if (question) {
      console.log('ViewQuestionModal - Question data:', {
        id: question.id,
        hasCode: !!question.codeTemplate,
        codeType: typeof question.codeTemplate,
        codeValue: question.codeTemplate ? String(question.codeTemplate).substring(0, 100) : null,
      });
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
          {question.codeTemplate && (() => {
            // Check if code exists and is not empty
            const codeStr = String(question.codeTemplate || '').trim();
            if (!codeStr) return null;
            const rawCode = codeStr;
            let codeWithNewlines = rawCode
              .replace(/\\n/g, '\n')
              .replace(/\\r\\n/g, '\n')
              .replace(/\\r/g, '\n')
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              .trim();
            
            // Remove empty lines
            const lines = codeWithNewlines.split('\n');
            const nonEmptyLines = lines.filter(line => line.trim().length > 0);
            codeWithNewlines = nonEmptyLines.join('\n');
            
            // Detect language
            let detectedLanguage = 'javascript';
            const codeText = codeWithNewlines.toLowerCase();
            if (codeText.includes('def ') || (codeText.includes('import ') && codeText.includes('print'))) {
              detectedLanguage = 'python';
            } else if (codeText.includes('public class') || codeText.includes('public static')) {
              detectedLanguage = 'java';
            } else if (codeText.includes('interface ') || codeText.includes('type ') || codeText.includes(': string')) {
              detectedLanguage = 'typescript';
            }

            // Detect theme
            const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const codeTheme = prefersDark ? 'dark' : 'light';

            return (
              <>
                {/* Empty line before code */}
                <div className="mt-4"></div>
                {/* Code display with Shiki syntax highlighting */}
                <div className={`relative rounded-lg overflow-hidden shadow-lg border ${
                  codeTheme === 'dark' 
                    ? 'border-gray-700 bg-gray-900' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {/* Code editor header bar */}
                  <div className={`flex items-center justify-between px-2 py-1.5 border-b ${
                    codeTheme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {/* Window controls */}
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      {/* File name */}
                      <div className={`flex items-center gap-1.5 ml-1 px-2 py-0.5 rounded border ${
                        codeTheme === 'dark'
                          ? 'bg-gray-700/50 border-gray-600'
                          : 'bg-gray-200 border-gray-300'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${codeTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                        <span className={`text-xs font-medium font-mono ${
                          codeTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          code.{detectedLanguage === 'python' ? 'py' : detectedLanguage === 'java' ? 'java' : detectedLanguage === 'typescript' ? 'ts' : 'js'}
                        </span>
                      </div>
                    </div>
                    {/* Language badge */}
                    <div className={`px-2 py-0.5 rounded border ${
                      codeTheme === 'dark'
                        ? 'bg-gray-700/50 border-gray-600'
                        : 'bg-gray-200 border-gray-300'
                    }`}>
                      <span className={`text-xs font-medium uppercase ${
                        codeTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {detectedLanguage}
                      </span>
                    </div>
                  </div>
                  
                  {/* Code content with Shiki highlighting */}
                  <div className={`overflow-x-auto ${codeTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    {isLoadingShiki ? (
                      <div className="p-2 text-center text-xs text-gray-500">Loading...</div>
                    ) : codeHighlightedHtml ? (
                      <div className="relative">
                        {/* Line numbers background */}
                        <div className={`absolute left-0 top-0 bottom-0 w-10 border-r ${
                          codeTheme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'
                        }`}></div>
                        
                        {/* Shiki highlighted code */}
                        <div className="relative">
                          <div 
                            className={`shiki-wrapper pl-10 ${codeTheme === 'light' ? 'shiki-light-mode' : 'shiki-dark-mode'}`}
                            dangerouslySetInnerHTML={{ __html: codeHighlightedHtml }}
                          />
                          
                          {/* Custom styles for Shiki output - compact with better light mode support */}
                          <style dangerouslySetInnerHTML={{
                            __html: `
                              .shiki-wrapper pre {
                                margin: 0 !important;
                                padding: 0.375rem 0 0.375rem 0 !important;
                                background: transparent !important;
                                overflow: visible !important;
                                font-size: 0.875rem !important;
                                line-height: 1.25 !important;
                                font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace !important;
                                font-weight: 500 !important;
                              }
                              .shiki-wrapper pre code {
                                display: block !important;
                                background: transparent !important;
                              }
                              .shiki-wrapper pre code .line {
                                display: block !important;
                                padding: 0 !important;
                                margin: 0 !important;
                                line-height: 1.25 !important;
                              }
                              /* Remove min-height to prevent spacing from empty lines */
                              .shiki-wrapper pre code .line:empty {
                                display: none !important;
                                height: 0 !important;
                                min-height: 0 !important;
                                margin: 0 !important;
                                padding: 0 !important;
                              }
                              /* Also hide lines that only contain whitespace */
                              .shiki-wrapper pre code .line:has(> :empty) {
                                display: none !important;
                              }
                              /* Shiki theme support - preserve syntax highlighting colors */
                              /* Dark mode */
                              @media (prefers-color-scheme: dark) {
                                .shiki-wrapper,
                                .shiki-wrapper pre,
                                .shiki-wrapper pre code {
                                  background-color: #0d1117 !important;
                                }
                                .shiki-wrapper pre code .line {
                                  color: inherit !important;
                                }
                              }
                              /* Light mode - preserve syntax colors but ensure visibility */
                              .shiki-light-mode .shiki-wrapper,
                              .shiki-light-mode .shiki-wrapper pre,
                              .shiki-light-mode .shiki-wrapper pre code {
                                background-color: #ffffff !important;
                              }
                              .shiki-light-mode .shiki-wrapper pre code .line {
                                background-color: transparent !important;
                              }
                              /* In light mode, only override very light colors (invisible on white) */
                              /* Let Shiki's syntax highlighting colors show through */
                              .shiki-light-mode .shiki-wrapper pre code .line span[style*="color"] {
                                /* Only override if color is too light - preserve syntax highlighting */
                              }
                              /* Media query for light mode (fallback) */
                              @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
                                .shiki-wrapper:not(.shiki-dark-mode) {
                                  background-color: #ffffff !important;
                                }
                                .shiki-wrapper:not(.shiki-dark-mode) pre,
                                .shiki-wrapper:not(.shiki-dark-mode) pre code {
                                  background-color: #ffffff !important;
                                }
                              }
                              /* Preserve syntax highlighting - don't override colors */
                              .shiki-wrapper pre code .line {
                                color: inherit !important;
                              }
                            `
                          }} />
                          
                          {/* Line numbers */}
                          <div className="absolute left-0 top-0 flex flex-col" style={{ paddingTop: '0.375rem' }}>
                            {nonEmptyLines.map((_, index) => (
                              <span 
                                key={index}
                                className={`select-none pr-2 pl-2 text-right min-w-[2.5rem] text-xs font-medium ${
                                  codeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}
                                style={{ 
                                  lineHeight: '1.25',
                                  minHeight: '1.25rem',
                                  display: 'block',
                                }}
                              >
                                {index + 1}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Fallback: plain code display
                      <div className="relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-10 border-r ${
                          codeTheme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'
                        }`}></div>
                        <pre className="m-0 p-2 pl-10 text-sm font-mono font-medium leading-relaxed">
                          <code className="block">
                            {nonEmptyLines.map((line, index) => (
                              <div key={index} className="flex items-start">
                                <span className={`select-none pr-2 text-right min-w-[2.5rem] text-xs font-medium ${
                                  codeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {index + 1}
                                </span>
                                <span className={`flex-1 whitespace-pre pl-2 pr-2 py-0.5 text-sm ${
                                  codeTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {line || ' '}
                                </span>
                              </div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
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

