'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Play,
  ArrowRight,
  Loader2,
  Zap,
  XCircle,
  Info,
  BookmarkPlus,
  BookmarkCheck,
  ShoppingCart,
  BarChart3,
  Video,
  FileText,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { addFlashcard, isInFlashcards } from '../../lib/flashcards';
import { addToCart } from '../../lib/cart';
import { useNotifications } from '@/components/NotificationSystem';
import { useLearningType } from '../../context/LearningTypeContext';
import ProblemSolvingQuestion from '@/components/ProblemSolvingQuestion';
import CodeEditor from '@/components/CodeEditor';
import { QuestionContent, isValidCode } from '@elzatona/shared-components';
import { createHighlighter, type Highlighter } from 'shiki';

interface Resource {
  type: 'video' | 'course' | 'article';
  title: string;
  url: string;
  description?: string;
  duration?: string;
  author?: string;
}

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  type: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correct_answer?: string;
  explanation?: string;
  code_template?: string;
  test_cases?: any;
  examples?: Array<{
    input: any | Record<string, any>;
    output: any;
    explanation?: string;
  }> | string;
  hints?: string[] | null;
  resources?: Resource[] | null;
  constraints?: string[] | null;
  tags?: string[] | null;
  language?: string;
  topic_id?: string;
  topic_name?: string;
  topic_description?: string;
}

interface Topic {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  questionCount: number;
}

interface Category {
  id: string;
  name: string;
  topics: Topic[];
  questionCount: number;
}

interface Card {
  id: string;
  title: string;
  type: string;
  description: string;
  color: string;
  icon: string;
  categories: Category[];
  questionCount: number;
  hasQuestions: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  cards: Card[];
  totalQuestions: number;
}

interface Progress {
  planId: string;
  completedQuestions: string[];
  completedTopics: string[];
  completedCategories: string[];
  completedCards: string[];
  correctAnswers: string[]; // Track correct answers for scoring
  currentPosition: {
    cardIndex: number;
    categoryIndex: number;
    topicIndex: number;
    questionIndex: number;
  };
  lastUpdated: string;
}

// Utility function to clean and normalize text from database
// This handles HTML entities, malformed patterns, and other issues
const cleanOptionText = (text: string): string => {
  if (!text || typeof text !== 'string') return text || '';

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (!text) return '';
    
    // Comprehensive HTML entity decoding
    const entityMap: Record<string, string> = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&#39;': "'",
      '&#x27;': "'",
      '&#x2F;': '/',
      '&nbsp;': ' ',
      '&#160;': ' ',
      '&apos;': "'",
    };
    
    // Replace named entities
    let decoded = text;
    for (const [entity, char] of Object.entries(entityMap)) {
      decoded = decoded.replace(new RegExp(entity, 'gi'), char);
    }
    
    // Replace numeric entities (decimal)
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });
    
    // Replace numeric entities (hexadecimal)
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    
    // If client-side, use DOM API as fallback
    if (typeof window !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = decoded;
        decoded = textarea.value;
      } catch (e) {
        // Fallback to string replacement if DOM API fails
      }
    }
    
    return decoded;
  };

  // Step 1: Decode HTML entities first
  let cleaned = decodeHtmlEntities(text);
  
  // Step 2: Fix common malformed HTML tags before processing
  cleaned = cleaned
    .replace(/<article\$1>/gi, '<article>')
    .replace(/<sectionn>/gi, '<section>')
    .replace(/<articl\b/gi, '<article')
    .replace(/<\/articl>/gi, '</article>')
    .replace(/<sectio\b/gi, '<section')
    .replace(/<\/sectio>/gi, '</section>')
    .replace(/<nav\b/gi, '<nav')
    .replace(/<\/nav>/gi, '</nav>')
    .replace(/<head\b/gi, '<header')
    .replace(/<\/head>/gi, '</header>')
    .replace(/<foot\b/gi, '<footer')
    .replace(/<\/foot>/gi, '</footer>')
    .replace(/<mai\b/gi, '<main')
    .replace(/<\/mai>/gi, '</main>');
  
  // Step 3: Convert HTML tags to inline code format for display (but not if already in backticks)
  // This makes tags like <article> display as `article` in the UI
  cleaned = cleaned.replace(/([^`])<([a-zA-Z][a-zA-Z0-9]*)([^>]*)>([^`])/g, (match, before, tag, attrs, after) => {
    // Skip if it's a code/pre tag (will be handled separately)
    if (tag.toLowerCase() === 'code' || tag.toLowerCase() === 'pre') return match;
    return `${before}\`<${tag}${attrs}>\`${after}`;
  });
  cleaned = cleaned.replace(/([^`])<\/([a-zA-Z][a-zA-Z0-9]*)>([^`])/g, (match, before, tag, after) => {
    return `${before}\`</${tag}>\`${after}`;
  });
  
  // Step 4: Replace HTML <code> tags with backticks for consistent processing
  cleaned = cleaned.replace(/<code[^>]*>([^<]+)<\/code>/gi, (match, codeContent) => {
    const decoded = decodeHtmlEntities(codeContent);
    return `\`${decoded.trim()}\``;
  });
  
  // Step 5: Remove any remaining HTML tags (but preserve backtick-wrapped content)
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  
  // Step 4: Fix common malformed patterns from HTML parsing issues
  // First, handle the specific e> artifact pattern (from </code> tags)
  // This must come before other replacements
  cleaned = cleaned.replace(/(\w+)e>/g, '$1');
  
  // Apply multiple passes to catch all variations
  for (let i = 0; i < 3; i++) {
    cleaned = cleaned
      // Fix NaN patterns (most specific first) - handle all variations
      // These patterns handle cases where HTML tags were partially removed
      .replace(/NaNe>NaN/gi, 'NaN')
      .replace(/NaNe>/gi, 'NaN')
      .replace(/NaN>/gi, 'NaN')
      .replace(/NaN\s*e>/gi, 'NaN')
      .replace(/NaN\s*>/gi, 'NaN')
      // More aggressive: any word followed by e> is likely a tag artifact
      .replace(/(NaN)\s*e\s*>/gi, '$1')
      .replace(/(NaN)\s*>/gi, '$1')
      // Fix method name patterns
      .replace(/diameterameter/g, 'diameter')
      .replace(/perimeterimeter/g, 'perimeter')
      .replace(/consoleonsole\.log/g, 'console.log')
      .replace(/console\.loge>/g, 'console.log')
      .replace(/console\.log>/g, 'console.log')
      .replace(/console\.loge\.log/g, 'console.log')
      .replace(/console\.log\.log/g, 'console.log')
      // Fix general patterns like "somethinge>something" - more aggressive
      .replace(/([a-zA-Z]+)e>([a-zA-Z]+)/g, '$1$2') // worde>word -> wordword
      .replace(/([a-zA-Z]+)e>/g, '$1') // worde> -> word
      .replace(/([a-zA-Z]+)>([a-zA-Z]+)/g, '$1 $2') // word>word -> word word
      .replace(/([a-zA-Z]+)>/g, '$1') // word> -> word
      // Fix patterns where > appears after words with spaces
      .replace(/(\w+)\s*>\s*(\w+)/g, '$1 $2')
      .replace(/(\w+)\s*>/g, '$1')
      // Remove any remaining > characters that are not part of comparisons
      .replace(/([a-zA-Z0-9])\s*>\s*([a-zA-Z0-9])/g, '$1 $2') // Only if not a comparison operator
      // Clean up any remaining entity artifacts
      .replace(/&[a-z]+;/gi, (match) => {
        const entityMap: Record<string, string> = {
          '&lt;': '<',
          '&gt;': '>',
          '&amp;': '&',
          '&quot;': '"',
          '&#39;': "'",
          '&apos;': "'",
          '&nbsp;': ' ',
        };
        return entityMap[match.toLowerCase()] || match;
      });
  }
  
  // Fix duplicated text patterns (e.g., "Number"mber", "Array"rray", "object"ject", "NaN"NaN")
  // Pattern 1: "Word"word" where word is a suffix of Word
  cleaned = cleaned.replace(/"([A-Za-z]+)"([a-z]+)"/g, (match, word, suffix) => {
    // Check if suffix is actually the end of word
    if (word.toLowerCase().endsWith(suffix.toLowerCase())) {
      return `"${word}"`;
    }
    return match; // Don't change if it's not a duplicate
  });
  
  // Pattern 2: "Word"Word" - full word duplication after quote
  cleaned = cleaned.replace(/"([A-Za-z]+)"\1"/g, '"$1"');
  
  // Pattern 3: "Word"partial" where partial matches the end of Word (case-insensitive)
  cleaned = cleaned.replace(/"([A-Za-z]+)"([a-z]{2,})"/gi, (match, word, partial) => {
    const wordLower = word.toLowerCase();
    const partialLower = partial.toLowerCase();
    // Check if partial is the end of word (at least 2 characters to avoid false positives)
    if (wordLower.endsWith(partialLower) && partialLower.length >= 2) {
      return `"${word}"`;
    }
    return match;
  });
  
  // Pattern 4: Handle cases where the duplication happens without quotes in between
  // e.g., Number"mber" -> Number"
  cleaned = cleaned.replace(/([A-Za-z]+)"([a-z]{2,})"/g, (match, word, suffix) => {
    const wordLower = word.toLowerCase();
    const suffixLower = suffix.toLowerCase();
    if (wordLower.endsWith(suffixLower) && suffixLower.length >= 2) {
      return `"${word}"`;
    }
    return match;
  });
  
  // Pattern 5: Fix specific known patterns
  cleaned = cleaned
    .replace(/"Number"mber"/gi, '"Number"')
    .replace(/"Array"rray"/gi, '"Array"')
    .replace(/"object"ject"/gi, '"object"')
    .replace(/"NaN"NaN"/gi, '"NaN"')
    .replace(/"String"ring"/gi, '"String"')
    .replace(/"Boolean"oolean"/gi, '"Boolean"')
    .replace(/"undefined"efined"/gi, '"undefined"')
    .replace(/"function"unction"/gi, '"function"');
  
  // Final cleanup: remove any remaining > characters that are clearly artifacts
  cleaned = cleaned
    .replace(/\s+>\s+/g, ' ') // space>space -> space
    .replace(/([a-zA-Z0-9])>\s*([a-zA-Z0-9])/g, '$1 $2') // word>word -> word word (but preserve < and > in code)
    .trim();

  return cleaned;
};

// Component to render text with inline code snippets
const OptionText = ({ text }: { text: string }) => {
  if (!text) return null;

  // Clean the text first using our utility
  let cleanedText = cleanOptionText(text);
  
  // Remove ALL quotes from quoted strings in the display (but keep quotes in code blocks)
  // Handle multiple quoted strings like "two" "one" → two one
  // First, check if there are code blocks - if so, preserve quotes in those
  if (cleanedText.includes('`')) {
    // Split by code blocks, process text parts, keep code blocks as-is
    const parts: string[] = [];
    const codeBlockRegex = /`([^`]+)`/g;
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(cleanedText)) !== null) {
      // Add text before code block (with quotes removed)
      if (match.index > lastIndex) {
        const textPart = cleanedText.substring(lastIndex, match.index);
        // Remove quotes from individual quoted strings in this text part
        const cleanedPart = textPart
          .replace(/"([^"]*)"/g, '$1')  // Remove double quotes around words: "text" → text
          .replace(/'([^']*)'/g, '$1'); // Remove single quotes around words: 'text' → text
        parts.push(cleanedPart);
      }
      // Add code block as-is (preserve quotes in code)
      parts.push(match[0]);
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text after last code block
    if (lastIndex < cleanedText.length) {
      const textPart = cleanedText.substring(lastIndex);
      const cleanedPart = textPart
        .replace(/"([^"]*)"/g, '$1')
        .replace(/'([^']*)'/g, '$1');
      parts.push(cleanedPart);
    }
    
    cleanedText = parts.join('');
  } else {
    // No code blocks - remove all quotes from quoted strings
    // Pattern: "word" or 'word' - remove the quotes but keep the content
    // This handles cases like "two" "one" → two one
    cleanedText = cleanedText
      .replace(/"([^"]*)"/g, '$1')  // Remove double quotes: "text" → text
      .replace(/'([^']*)'/g, '$1')  // Remove single quotes: 'text' → text
      .trim();
  }

  // Use the cleaned text
  const processedText = cleanedText;

  // Parse inline code snippets (backticks)
  const parts: Array<{ type: 'text' | 'code'; content: string }> = [];
  const inlineCodeRegex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match;

  while ((match = inlineCodeRegex.exec(processedText)) !== null) {
    // Add text before code
    if (match.index > lastIndex) {
      const textContent = processedText.substring(lastIndex, match.index);
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // Add inline code
    parts.push({ type: 'code', content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < processedText.length) {
    const textContent = processedText.substring(lastIndex);
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // If no code snippets found, render as plain text
  if (parts.length === 0) {
    return <span className='flex-1 text-left'>{processedText}</span>;
  }

  return (
    <span className='flex-1 text-left'>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <code
              key={index}
              className='px-2 py-1 mx-0.5 rounded-md font-mono text-base sm:text-lg lg:text-xl shadow-sm border'
              style={{ 
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                color: '#f3f4f6',
                borderColor: '#374151'
              }}
            >
              {part.content}
            </code>
          );
        } else {
          return <span key={index}>{part.content}</span>;
        }
      })}
    </span>
  );
};

// Utility function to clean question titles
// Since database is clean, we just need minimal processing
const cleanQuestionTitle = (title: string): string => {
  if (!title || typeof title !== 'string') return title || '';
  // Database is clean, so just trim and return
  return title.trim();
};

// Helper function to format and normalize code content
// Intelligently adds indentation based on code structure (braces, blocks, classes, methods, etc.)
// Moved outside QuestionContent so it can be used by GuidedPracticePageContent
const formatCodeContent = (code: string): string => {
  if (!code) return '';
  
  // Normalize line endings
  let formatted = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Remove excessive leading/trailing whitespace from entire block
  formatted = formatted.trim();
  
  // Split into lines for processing
  const lines = formatted.split('\n').map(line => line.trimEnd());
  
  if (lines.length === 0) return '';
  
  // Check if code already has indentation
  const hasExistingIndent = lines.some(line => line.trim().length > 0 && /^\s/.test(line));
  
  // If code has no indentation, add it based on structure
  if (!hasExistingIndent) {
    let indentLevel = 0;
    let inClass = false;
    let inMethod = false;
    
    formatted = lines.map((line, index) => {
      const trimmed = line.trim();
      
      // Skip empty lines
      if (trimmed.length === 0) return '';
      
      // Detect class declaration
      if (/^(class|interface|type)\s+\w+/.test(trimmed)) {
        inClass = true;
        const indent = '  '.repeat(indentLevel);
        // Check if class has opening brace on same line
        if (trimmed.match(/[{\[\(]\s*$/)) {
          indentLevel++;
        } else {
          indentLevel++;
        }
        return indent + trimmed;
      }
      
      // Detect static methods, regular methods, or constructors
      if (inClass && (
        /^(static\s+)?\w+\s*\(/.test(trimmed) || // method declaration (static or regular)
        /^constructor\s*\(/.test(trimmed) || // constructor
        /^get\s+\w+\s*\(/.test(trimmed) || // getter
        /^set\s+\w+\s*\(/.test(trimmed) // setter
      )) {
        inMethod = true;
        const indent = '  '.repeat(indentLevel);
        // Check if method has opening brace on same line
        if (trimmed.match(/[{\[\(]\s*$/)) {
          indentLevel++;
        } else {
          indentLevel++;
        }
        return indent + trimmed;
      }
      
      // Count braces/brackets to determine net change
      const openBraces = (trimmed.match(/{/g) || []).length;
      const closeBraces = (trimmed.match(/}/g) || []).length;
      const openBrackets = (trimmed.match(/\[/g) || []).length;
      const closeBrackets = (trimmed.match(/\]/g) || []).length;
      const openParens = (trimmed.match(/\(/g) || []).length;
      const closeParens = (trimmed.match(/\)/g) || []).length;
      
      // Net change: positive = more opens, negative = more closes
      const netBraces = openBraces - closeBraces;
      const netBrackets = openBrackets - closeBrackets;
      const netParens = openParens - closeParens;
      
      // Decrease indent for closing braces/brackets/parens at the start of line
      if (trimmed.match(/^[}\]\)]/)) {
        indentLevel = Math.max(0, indentLevel - 1);
        // If we're closing a class or method, reset flags
        if (closeBraces > 0) {
          // Check if this is the end of a method or the class itself
          const nextNonEmptyLine = lines.slice(index + 1).find(l => l.trim().length > 0);
          if (!nextNonEmptyLine || /^(class|interface|type|const|let|var|function|export)/.test(nextNonEmptyLine.trim())) {
            inClass = false;
            inMethod = false;
          } else if (inMethod) {
            inMethod = false;
          }
        }
      }
      
      // Add indentation for current line
      const indent = '  '.repeat(indentLevel);
      const result = indent + trimmed;
      
      // Increase indent if line ends with opening brace/bracket/paren
      // This means the next line should be indented
      if (trimmed.match(/[{\[\(]\s*$/)) {
        indentLevel++;
      }
      // Also increase if there are more opens than closes (unclosed braces/brackets/parens)
      else if (netBraces > 0 || netBrackets > 0 || netParens > 0) {
        indentLevel += Math.max(netBraces, netBrackets, netParens);
      }
      
      return result;
    }).join('\n');
  } else {
    // Code already has indentation - normalize it
    const indentations = lines
      .filter(line => line.trim().length > 0)
      .map(line => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
      });
    
    if (indentations.length > 0) {
      const minIndent = Math.min(...indentations);
      
      // Normalize indentation: preserve relative indentation but use consistent spacing
      formatted = lines.map(line => {
        if (line.trim().length === 0) return '';
        
        // Count leading whitespace (tabs and spaces)
        const leadingWhitespace = line.match(/^(\s*)/)?.[1] || '';
        const indentCount = leadingWhitespace
          .split('')
          .reduce((count, char) => count + (char === '\t' ? 2 : 1), 0);
        
        // Calculate relative indent level (subtract minimum indent)
        const relativeIndent = Math.max(0, indentCount - minIndent);
        
        // Use 2 spaces per indent level for consistency
        const normalizedIndent = '  '.repeat(Math.floor(relativeIndent / 2) + (relativeIndent % 2));
        
        // Get content without leading whitespace
        const content = line.trimStart();
        
        return normalizedIndent + content;
      }).join('\n');
    }
  }
  
  // Remove excessive blank lines (more than 2 consecutive)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted;
};

// Note: QuestionContent is imported from @elzatona/shared-components
// Since database is clean, we use the shared component directly

function GuidedPracticePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { setLearningType } = useLearningType();
  const planId = searchParams?.get('plan');
  const categoryId = searchParams?.get('category');
  const cardId = searchParams?.get('card');

  const [plan, setPlan] = useState<Plan | null>(null);

  // Set learning type to 'guided' when component mounts to hide cart icon
  useEffect(() => {
    setLearningType('guided');
  }, [setLearningType]);
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Array<{ id: string; text: string; isCorrect: boolean }>>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [inFlashcards, setInFlashcards] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<{
    correct: number;
    total: number;
    percentage: number;
  } | null>(null);

  // Shiki syntax highlighting
  const [shikiHighlighter, setShikiHighlighter] = useState<Highlighter | null>(null);
  const [isLoadingShiki, setIsLoadingShiki] = useState(true);
  const [codeHighlightedHtml, setCodeHighlightedHtml] = useState<string>('');

  // Initialize Shiki highlighter with dual themes for automatic light/dark switching
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
    if (!shikiHighlighter || !currentQuestion?.code_template) {
      setCodeHighlightedHtml('');
      return;
    }

    try {
      const rawCode = String(currentQuestion.code_template || '');
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
      // This ensures no blank lines appear in the code
      const lines = codeWithNewlines.split('\n');
      const nonEmptyLines = lines.filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 0; // Only keep lines with actual content
      });
      codeWithNewlines = nonEmptyLines.join('\n');
      
      // Final check: ensure no consecutive newlines remain
      if (codeWithNewlines.includes('\n\n')) {
        codeWithNewlines = codeWithNewlines.replace(/\n{2,}/g, '\n');
      }
      
      // Debug: verify blank lines are removed
      console.log('Code after blank line removal:', JSON.stringify(codeWithNewlines));

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
      
      // Use single theme instead of dual themes for better control
      // This ensures proper colors are applied without CSS variable issues
      let html = shikiHighlighter.codeToHtml(codeWithNewlines, {
        lang: lang === 'typescript' ? 'ts' : lang === 'javascript' ? 'js' : lang,
        theme: themeName, // Use single theme based on current mode
      });
      
      // Post-process HTML for light mode: Replace dark colors with light theme colors
      // Shiki uses CSS variables, but inline styles might have dark colors
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (!prefersDark) {
          // In light mode, ensure background is light and text is dark
          // Replace any dark background colors that might be in inline styles
          html = html.replace(/background-color:\s*#[0-9a-fA-F]{6}/g, (match) => {
            // If it's a dark color (low brightness), replace with white
            const color = match.match(/#([0-9a-fA-F]{6})/i)?.[1];
            if (color) {
              const r = parseInt(color.substr(0, 2), 16);
              const g = parseInt(color.substr(2, 2), 16);
              const b = parseInt(color.substr(4, 2), 16);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              if (brightness < 128) {
                return 'background-color: #ffffff';
              }
            }
            return match;
          });
          
          // Replace any light text colors (that would be invisible on white) with darker versions
          html = html.replace(/color:\s*#[0-9a-fA-F]{6}/g, (match) => {
            const color = match.match(/#([0-9a-fA-F]{6})/i)?.[1];
            if (color) {
              const r = parseInt(color.substr(0, 2), 16);
              const g = parseInt(color.substr(2, 2), 16);
              const b = parseInt(color.substr(4, 2), 16);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              // If it's a light color (brightness > 180), darken it while preserving hue
              if (brightness > 180) {
                const factor = brightness > 220 ? 0.3 : 0.5;
                const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
                const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
                const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
                const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
                return `color: ${newColor}`;
              }
            }
            return match;
          });
        }
      }

      // Post-process Shiki HTML to remove empty line elements and fix light mode colors
      // First, if in light mode, remove ALL inline styles and add explicit dark text colors
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (!prefersDark) {
          // More aggressive: Remove ALL inline styles from all elements in light mode
          // This ensures CSS can fully control the colors
          html = html.replace(/style="[^"]*"/gi, '');
          
          // Then add explicit dark text color to all text-containing spans
          // This ensures text is always visible in light mode
          html = html.replace(/<span([^>]*class="[^"]*"[^>]*)>/gi, (match, attrs) => {
            // Add inline style with dark text color
            return `<span${attrs} style="color: #24292e;">`;
          });
        }
      }
      
      // Shiki creates <span class="line"></span> for blank lines - remove them completely
      // Use comprehensive regex patterns to catch all variations
      // Pattern 1: Simple empty lines (most common)
      html = html.replace(/<span class="line">[\s\u00A0\u200B]*<\/span>/g, '');
      // Pattern 2: Lines with attributes but empty content
      html = html.replace(/<span[^>]*class="[^"]*line[^"]*">[\s\u00A0\u200B]*<\/span>/g, '');
      // Pattern 3: Lines that might have nested empty spans or just whitespace
      html = html.replace(/<span class="line"><\/span>/g, '');
      html = html.replace(/<span class="line">\s+<\/span>/g, '');
      // Pattern 4: Handle any whitespace-only lines (spaces, tabs, non-breaking spaces, newlines)
      html = html.replace(/<span class="line">[ \t\u00A0\u200B\n\r]+<\/span>/g, '');
      
      // Additional cleanup: Remove any remaining empty line elements and fix colors for light mode
      if (typeof window !== 'undefined') {
        try {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          const preElement = tempDiv.querySelector('pre');
          if (preElement) {
            const codeElement = preElement.querySelector('code');
            if (codeElement) {
              // Remove empty lines
              const lines = Array.from(codeElement.querySelectorAll('.line'));
              let removedCount = 0;
              lines.forEach((line) => {
                const text = (line.textContent || '').trim();
                if (text.length === 0) {
                  line.remove();
                  removedCount++;
                }
              });
              
              // In light mode, ensure ALL syntax highlighting colors are visible
              // Darken any colors that are too light to be visible on white background
              if (!prefersDark) {
                // Process ALL spans (not just those with color styles) to ensure visibility
                const allSpans = codeElement.querySelectorAll('span');
                allSpans.forEach((el) => {
                  const style = (el as HTMLElement).getAttribute('style') || '';
                  const colorMatch = style.match(/color:\s*(#[0-9a-fA-F]{6}|rgb\([^)]+\))/i);
                  
                  if (colorMatch) {
                    const colorValue = colorMatch[1];
                    let shouldReplace = false;
                    let newColor = colorValue;
                    
                    if (colorValue.startsWith('#')) {
                      // Hex color
                      const hex = colorValue.substring(1);
                      const r = parseInt(hex.substr(0, 2), 16);
                      const g = parseInt(hex.substr(2, 2), 16);
                      const b = parseInt(hex.substr(4, 2), 16);
                      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                      
                      // If color is too light (brightness > 180), make it darker but preserve hue
                      // Lowered threshold to catch more light colors
                      if (brightness > 180) {
                        // Darken the color while preserving the hue
                        // Use a more aggressive darkening factor for very light colors
                        const factor = brightness > 220 ? 0.3 : 0.5; // More aggressive for very light colors
                        const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
                        const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
                        const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
                        newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
                        shouldReplace = true;
                      }
                    } else if (colorValue.startsWith('rgb')) {
                      // RGB color - parse and check brightness
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
                  } else if (style && !style.includes('color')) {
                    // If span has style but no color, check if it needs a default dark color
                    const text = (el as HTMLElement).textContent || '';
                    if (text.trim().length > 0) {
                      // Add default dark color for text without explicit color
                      (el as HTMLElement).setAttribute('style', `${style}; color: #24292e;`);
                    }
                  } else if (!style) {
                    // If no style at all, add default dark color
                    const text = (el as HTMLElement).textContent || '';
                    if (text.trim().length > 0) {
                      (el as HTMLElement).setAttribute('style', 'color: #24292e;');
                    }
                  }
                });
                
                // Ensure background is white
                const preStyle = preElement.getAttribute('style') || '';
                if (!preStyle.includes('background')) {
                  preElement.setAttribute('style', `${preStyle ? preStyle + '; ' : ''}background-color: #ffffff;`);
                }
              }
              
              // Get the cleaned HTML - reconstruct the full structure
              const cleanedCode = codeElement.innerHTML;
              html = `<pre><code>${cleanedCode}</code></pre>`;
              console.log(`Removed ${removedCount} empty lines from Shiki HTML`);
              if (!prefersDark) {
                console.log('Removed inline color styles for light mode');
              }
            }
          }
        } catch (e) {
          // If DOM parsing fails, continue with regex-cleaned HTML
          console.warn('DOM parsing for empty line removal failed:', e);
        }
      }

      setCodeHighlightedHtml(html);
    } catch (error) {
      console.error('Error highlighting code:', error);
      setCodeHighlightedHtml('');
    }
  }, [shikiHighlighter, currentQuestion?.code_template]);

  // Progress management functions
  const getProgressKey = () => `guided-practice-progress-${planId}`;

  const loadProgress = (): Progress | null => {
    if (!planId) return null;
    try {
      const saved = localStorage.getItem(getProgressKey());
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  };

  const saveProgress = (newProgress: Progress) => {
    if (!planId) return;
    try {
      localStorage.setItem(getProgressKey(), JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const resetProgress = (planData?: Plan) => {
    if (!planId) return;
    try {
      localStorage.removeItem(getProgressKey());
      const newProgress = initializeProgress();
      setProgress(newProgress);
      saveProgress(newProgress);
      if (planData) {
        findFirstQuestion(planData);
      } else if (plan) {
        findFirstQuestion(plan);
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  // Sync localStorage progress to database
  const syncProgressToDatabase = async () => {
    if (!progress || !planId) return;

    try {
      const response = await fetch('/api/progress/guided-learning/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          completedQuestions: progress.completedQuestions,
          completedTopics: progress.completedTopics,
          completedCategories: progress.completedCategories,
          completedCards: progress.completedCards,
          currentPosition: progress.currentPosition,
          lastUpdated: progress.lastUpdated,
        }),
      });

      if (response.ok) {
        console.log('✅ Progress synced to database');
      }
    } catch (error) {
      console.error('❌ Error syncing progress to database:', error);
    }
  };

  // Load progress from database on mount
  const loadProgressFromDatabase = async () => {
    if (!planId) return;

    try {
      const response = await fetch(
        `/api/progress/guided-learning/load?planId=${planId}`
      );
      const data = await response.json();

      if (data.success && data.progress) {
        // Merge database progress with localStorage if localStorage has more recent data
        const localProgress = loadProgress();

        if (
          !localProgress ||
          new Date(data.progress.lastUpdated) >
            new Date(localProgress.lastUpdated)
        ) {
          // Database is more recent, use it
          console.log('📥 Loading progress from database');
          setProgress(data.progress);
          saveProgress(data.progress);
        }
      }
    } catch (error) {
      console.error('❌ Error loading progress from database:', error);
    }
  };

  const initializeProgress = (): Progress => {
    return {
      planId: planId!,
      completedQuestions: [],
      completedTopics: [],
      completedCategories: [],
      completedCards: [],
      correctAnswers: [],
      currentPosition: {
        cardIndex: 0,
        categoryIndex: 0,
        topicIndex: 0,
        questionIndex: 0,
      },
      lastUpdated: new Date().toISOString(),
    };
  };

  const markQuestionCompleted = (questionId: string) => {
    try {
    // Always get the latest progress from localStorage to avoid stale state
      let latestProgress = loadProgress();
      
      // Initialize progress if it doesn't exist
    if (!latestProgress) {
        console.log('📝 Initializing progress for question completion');
        latestProgress = initializeProgress();
        saveProgress(latestProgress);
    }

    // Prevent duplicates
    if (latestProgress.completedQuestions.includes(questionId)) {
      console.log('⚠️ Question already marked as completed:', questionId);
      return;
    }

    console.log('✅ Marking question as completed:', {
      questionId,
      currentCompletedCount: latestProgress.completedQuestions.length,
      willBeCompletedCount: latestProgress.completedQuestions.length + 1,
    });

    const updatedProgress = {
      ...latestProgress,
      completedQuestions: [...latestProgress.completedQuestions, questionId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
    } catch (error) {
      console.error('❌ Error in markQuestionCompleted:', error);
    }
  };

  const markTopicCompleted = (topicId: string) => {
    if (!progress) return;
    const updatedProgress = {
      ...progress,
      completedTopics: [...progress.completedTopics, topicId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  const markCategoryCompleted = (categoryId: string) => {
    if (!progress) return;
    const updatedProgress = {
      ...progress,
      completedCategories: [...progress.completedCategories, categoryId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  const markCardCompleted = (cardId: string) => {
    if (!progress) return;
    const updatedProgress = {
      ...progress,
      completedCards: [...progress.completedCards, cardId],
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updatedProgress);
  };

  // Load progress from database on mount
  useEffect(() => {
    loadProgressFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  // Sync progress to database when it changes
  useEffect(() => {
    if (progress) {
      // Debounce database sync to avoid too many requests
      const timeoutId = setTimeout(() => {
        syncProgressToDatabase();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Fetch plan data
  useEffect(() => {
    const fetchPlanData = async () => {
      if (!planId) {
        setError('Plan ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(
          `${baseUrl}/api/guided-learning/plan-details/${planId}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
          });
          throw new Error(`Failed to fetch plan data: ${response.status} - ${errorText.substring(0, 200)}`);
        }

        const data = await response.json();

        if (!data.success) {
          console.error('❌ API returned success: false', data);
          throw new Error(data.error || 'API returned success: false');
        }

        setPlan(data.data);

        // Load or initialize progress
        const savedProgress = loadProgress();
        if (savedProgress) {
          // Ensure correctAnswers exists (for legacy data)
          if (!savedProgress.correctAnswers) {
            savedProgress.correctAnswers = [];
          }

          setProgress(savedProgress);

          // Check if all questions are completed
          const totalQuestionsWithOptions = data.data.cards.reduce(
            (total: number, card: Card) => {
              return (
                total +
                card.categories.reduce(
                  (catTotal: number, category: Category) => {
                    return (
                      catTotal +
                      category.topics.reduce(
                        (topicTotal: number, topic: Topic) => {
                          return (
                            topicTotal +
                            topic.questions.filter(
                              (q: Question) =>
                                q.options &&
                                Array.isArray(q.options) &&
                                q.options.length > 0
                            ).length
                          );
                        },
                        0
                      )
                    );
                  },
                  0
                )
              );
            },
            0
          );

          if (
            savedProgress.completedQuestions.length >=
              totalQuestionsWithOptions &&
            totalQuestionsWithOptions > 0
          ) {
            // Plan is completed, show score screen
            const correctCount = savedProgress.correctAnswers.length;
            const completedCount = savedProgress.completedQuestions.length;
            const percentage =
              completedCount > 0
                ? Math.round((correctCount / completedCount) * 100)
                : 0;
            setIsCompleted(true);
            setFinalScore({
              correct: correctCount,
              total: completedCount,
              percentage,
            });
            setIsLoading(false);
          } else {
            resumeFromProgress(data.data, savedProgress);
            setIsLoading(false);
          }
        } else {
          const newProgress = initializeProgress();
          setProgress(newProgress);
          saveProgress(newProgress);
          console.log('🔍 Initializing new progress, finding first question with filters:', {
            cardId,
            categoryId,
            planId,
          });
          findFirstQuestion(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('❌ Error fetching plan data:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to load plan data';
        const errorStack = error instanceof Error ? error.stack : undefined;
        console.error('❌ Error details:', {
          message: errorMessage,
          stack: errorStack,
          planId,
          categoryId,
          cardId,
        });
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchPlanData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]); // cardId and categoryId are read from searchParams, so they're available

  const resumeFromProgress = (planData: Plan, savedProgress: Progress) => {
    const { currentPosition } = savedProgress;

    console.log('🔍 resumeFromProgress called with filters:', {
      cardId,
      categoryId,
      savedPosition: currentPosition,
    });

    // Try to resume from saved position
    if (currentPosition.cardIndex < planData.cards.length) {
      const card = planData.cards[currentPosition.cardIndex];
      
      // Check if saved position matches cardId filter
      if (cardId && card.id !== cardId) {
        console.log('⏭️ Saved position card does not match cardId filter, skipping resume');
        // Don't resume - find first question with filter instead
        findFirstQuestion(planData);
        return;
      }

      if (currentPosition.categoryIndex < card.categories.length) {
        const category = card.categories[currentPosition.categoryIndex];
        
        // Check if saved position matches categoryId filter
        if (categoryId && category.id !== categoryId) {
          console.log('⏭️ Saved position category does not match categoryId filter, skipping resume');
          // Don't resume - find first question with filter instead
          findFirstQuestion(planData);
          return;
        }

        if (currentPosition.topicIndex < category.topics.length) {
          const topic = category.topics[currentPosition.topicIndex];
          if (
            topic.questions &&
            currentPosition.questionIndex < topic.questions.length
          ) {
            const question = topic.questions[currentPosition.questionIndex];

            // Check if this question has options (for multiple choice) or is a code question
            const hasOptions = question.options &&
              Array.isArray(question.options) &&
              question.options.length > 0;
            const isCodeQuestion = question.type === 'code';
            
            // Always resume from saved position if the question is valid (regardless of completion status)
            // This allows users to see the explanation and proceed to next question even if already answered
            if (hasOptions || isCodeQuestion) {
              const isCompleted = savedProgress.completedQuestions.includes(question.id);
              console.log('✅ Resuming from saved position:', {
                cardTitle: card.title,
                categoryName: category.name,
                questionTitle: question.title?.substring(0, 50),
                isCompleted,
              });
              setCurrentQuestion(question);
              setCurrentQuestionIndex(currentPosition.questionIndex);
              setCurrentTopicIndex(currentPosition.topicIndex);
              setCurrentCategoryIndex(currentPosition.categoryIndex);
              setCurrentCardIndex(currentPosition.cardIndex);
              
              // If the question was already answered, show the explanation automatically
              if (isCompleted && question.type !== 'code') {
                // Find the answer that was selected (if we can determine it)
                // For now, just show the explanation
                setShowExplanation(true);
              }
              
              // Ensure current position is saved (in case it wasn't saved before)
              const latestProgress = loadProgress();
              if (latestProgress) {
                const updatedProgress = {
                  ...latestProgress,
                  currentPosition: {
                    cardIndex: currentPosition.cardIndex,
                    categoryIndex: currentPosition.categoryIndex,
                    topicIndex: currentPosition.topicIndex,
                    questionIndex: currentPosition.questionIndex,
                  },
                  lastUpdated: new Date().toISOString(),
                };
                saveProgress(updatedProgress);
                console.log('💾 Confirmed saved position for resume:', currentPosition);
              }
              
              setIsLoading(false);
              return;
            }
          }
        }
      }
    }

    // If we can't resume from saved position, find next incomplete question
    console.log('⚠️ Cannot resume from saved position, finding first question with filters');
    findNextIncompleteQuestion(planData, savedProgress);
    // Note: findNextIncompleteQuestion will set loading to false when it finds a question
    // findFirstQuestion (called as fallback) will also set loading to false
  };

  const findFirstQuestion = (planData: Plan) => {
    console.log('🔍 findFirstQuestion called with:', {
      cardId,
      categoryId,
      totalCards: planData.cards.length,
      cardTitles: planData.cards.map(c => c.title),
    });

    // If categoryId is specified, find which card contains that category
    let cardsToSearch = planData.cards;
    if (categoryId) {
      const cardWithCategory = planData.cards.find(card =>
        card.categories.some(cat => cat.id === categoryId)
      );
      if (cardWithCategory) {
        cardsToSearch = [cardWithCategory];
        console.log('🔍 Filtering by categoryId - found card:', {
          categoryId,
          cardTitle: cardWithCategory.title,
          cardId: cardWithCategory.id,
        });
      } else {
        console.warn('⚠️ No card found containing categoryId:', categoryId);
        return;
      }
    } else if (cardId) {
      // If cardId is specified, only search within that card
      cardsToSearch = planData.cards.filter(card => card.id === cardId);
      console.log('🔍 Filtering by cardId:', {
        cardId,
        matchingCards: cardsToSearch.map(c => ({ id: c.id, title: c.title })),
      });
      if (cardsToSearch.length === 0) {
        console.warn('⚠️ No cards found matching cardId:', cardId);
        return;
      }
    }

    // Define the sequential order for cards
    const cardOrder = [
      'Core Technologies',
      'Framework Questions',
      'Problem Solving',
      'System Design',
      'Frontend Tasks',
    ];

    let foundQuestion: Question | null = null;
    let foundQuestionIndex = 0;
    let foundTopicIndex = 0;
    let foundCategoryIndex = 0;
    let foundCardIndex = 0;

    // Find cards in the specified order (only from cardsToSearch)
    for (const cardTitle of cardOrder) {
      const cardIndex = cardsToSearch.findIndex(card =>
        card.title.toLowerCase().includes(cardTitle.toLowerCase())
      );

      if (cardIndex !== -1) {
        const card = cardsToSearch[cardIndex];
        const actualCardIndex = planData.cards.findIndex(c => c.id === card.id);

        console.log('🔍 Checking card:', {
          cardTitle: card.title,
          cardId: card.id,
          requestedCardId: cardId,
          matches: !cardId || card.id === cardId,
          categoriesCount: card.categories.length,
        });

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) {
            console.log('⏭️ Skipping category (does not match categoryId filter):', {
              categoryName: category.name,
              categoryId: category.id,
              requestedCategoryId: categoryId,
            });
            continue;
          }

          for (
            let topicIndex = 0;
            topicIndex < category.topics.length;
            topicIndex++
          ) {
            const topic = category.topics[topicIndex];

            if (topic.questions && topic.questions.length > 0) {
              // Find first question with options (for multiple choice) or code question
              const questionWithOptions = topic.questions.find(
                q => {
                  const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
                  const isCodeQuestion = q.type === 'code';
                  return hasOptions || isCodeQuestion;
                }
              );

              if (questionWithOptions) {
                foundQuestion = questionWithOptions;
                foundQuestionIndex =
                  topic.questions.indexOf(questionWithOptions);
                foundTopicIndex = topicIndex;
                foundCategoryIndex = categoryIndex;
                foundCardIndex = actualCardIndex;
                console.log('✅ Found first question in card:', {
                  cardTitle: card.title,
                  categoryName: category.name,
                  topicName: topic.name,
                  questionTitle: foundQuestion.title?.substring(0, 50),
                });
                break;
              }
            }
          }
          if (foundQuestion) break;
        }
      }
      if (foundQuestion) break;
    }

    // Fallback: find any available question (only within the specified card/category if provided)
    // If cardId or categoryId is specified, we MUST find a question within that scope
    if (!foundQuestion) {
      if (cardId || categoryId) {
        console.warn('⚠️ No questions found in the specified card/category:', {
          cardId,
          categoryId,
          cardsSearched: cardsToSearch.map(c => ({ id: c.id, title: c.title })),
        });
        // Don't fall back to other cards if a specific card/category was requested
        return;
      }

      console.log('⚠️ No question found in ordered search, trying fallback (no card/category filter)...');
      for (let cardIndex = 0; cardIndex < cardsToSearch.length; cardIndex++) {
        const card = cardsToSearch[cardIndex];
        const actualCardIndex = planData.cards.findIndex(c => c.id === card.id);

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) {
            console.log('⏭️ Skipping category (does not match categoryId filter):', {
              categoryName: category.name,
              categoryId: category.id,
              requestedCategoryId: categoryId,
            });
            continue;
          }

          for (
            let topicIndex = 0;
            topicIndex < category.topics.length;
            topicIndex++
          ) {
            const topic = category.topics[topicIndex];

            if (topic.questions && topic.questions.length > 0) {
              // Find first question with options
              const questionWithOptions = topic.questions.find(
                q =>
                  q.options && Array.isArray(q.options) && q.options.length > 0
              );

              if (questionWithOptions) {
                foundQuestion = questionWithOptions;
                foundQuestionIndex =
                  topic.questions.indexOf(questionWithOptions);
                foundTopicIndex = topicIndex;
                foundCategoryIndex = categoryIndex;
                foundCardIndex = actualCardIndex;
                break;
              }
            }
          }
          if (foundQuestion) break;
        }
        if (foundQuestion) break;
      }
    }

    // Set all state at once if we found a question
    if (foundQuestion) {
      const foundCard = planData.cards[foundCardIndex];
      console.log('✅ Found first question:', {
        id: foundQuestion.id,
        title: foundQuestion.title?.substring(0, 50),
        hasOptions: foundQuestion.options?.length || 0,
        cardTitle: foundCard?.title,
        cardId: foundCard?.id,
        requestedCardId: cardId,
        matchesCardFilter: !cardId || foundCard?.id === cardId,
        categoryIndex: foundCategoryIndex,
        topicIndex: foundTopicIndex,
        questionIndex: foundQuestionIndex,
      });

      // Verify the question is from the correct card if cardId is specified
      if (cardId && foundCard?.id !== cardId) {
        console.error('❌ ERROR: Question found from wrong card!', {
          foundCardId: foundCard?.id,
          foundCardTitle: foundCard?.title,
          requestedCardId: cardId,
          requestedCardTitle: planData.cards.find(c => c.id === cardId)?.title,
          questionId: foundQuestion.id,
        });
        console.warn('⚠️ Not showing question - it belongs to a different card');
        setError(`No questions found in the selected card. Please try a different card or category.`);
        setIsLoading(false);
        return; // Don't show the question if it's from the wrong card
      }

      // Verify the question is from the correct category if categoryId is specified
      const foundCategory = foundCard?.categories[foundCategoryIndex];
      if (categoryId && foundCategory?.id !== categoryId) {
        console.error('❌ ERROR: Question found from wrong category!', {
          foundCategoryId: foundCategory?.id,
          foundCategoryName: foundCategory?.name,
          requestedCategoryId: categoryId,
          requestedCategoryName: planData.cards
            .flatMap(c => c.categories)
            .find(c => c.id === categoryId)?.name,
          questionId: foundQuestion.id,
          questionTitle: foundQuestion.title?.substring(0, 50),
        });
        console.warn('⚠️ Not showing question - it belongs to a different category');
        setError(`No questions found in the selected category. Please try a different category.`);
        setIsLoading(false);
        return; // Don't show the question if it's from the wrong category
      }

      setCurrentQuestion(foundQuestion);
      setCurrentQuestionIndex(foundQuestionIndex);
      setCurrentTopicIndex(foundTopicIndex);
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentCardIndex(foundCardIndex);
      
      // Save current position to progress so we can resume on refresh
      const latestProgress = loadProgress();
      if (latestProgress) {
        const updatedProgress = {
          ...latestProgress,
          currentPosition: {
            cardIndex: foundCardIndex,
            categoryIndex: foundCategoryIndex,
            topicIndex: foundTopicIndex,
            questionIndex: foundQuestionIndex,
          },
          lastUpdated: new Date().toISOString(),
        };
        saveProgress(updatedProgress);
        console.log('💾 Saved current position for resume:', {
          cardIndex: foundCardIndex,
          categoryIndex: foundCategoryIndex,
          topicIndex: foundTopicIndex,
          questionIndex: foundQuestionIndex,
        });
      }
      
      setIsLoading(false);
    } else {
      console.warn('⚠️ No question with options found in plan data', {
        cardId,
        categoryId,
        totalCards: planData.cards.length,
      });
      setIsLoading(false);
    }
  };

  const findNextIncompleteQuestion = (
    planData: Plan,
    savedProgress: Progress
  ) => {
    console.log('🔍 findNextIncompleteQuestion called with:', {
      cardId,
      categoryId,
      totalCards: planData.cards.length,
    });

    // If categoryId is specified, find which card contains that category
    let cardsToSearch = planData.cards;
    if (categoryId) {
      const cardWithCategory = planData.cards.find(card =>
        card.categories.some(cat => cat.id === categoryId)
      );
      if (cardWithCategory) {
        cardsToSearch = [cardWithCategory];
        console.log('🔍 Filtering by categoryId - found card:', {
          categoryId,
          cardTitle: cardWithCategory.title,
          cardId: cardWithCategory.id,
        });
      } else {
        console.warn('⚠️ No card found containing categoryId:', categoryId);
        setIsLoading(false);
        return;
      }
    } else if (cardId) {
      // If cardId is specified, only search within that card
      cardsToSearch = planData.cards.filter(card => card.id === cardId);
      console.log('🔍 Filtering by cardId:', {
        cardId,
        matchingCards: cardsToSearch.map(c => ({ id: c.id, title: c.title })),
      });
      if (cardsToSearch.length === 0) {
        console.warn('⚠️ No cards found matching cardId:', cardId);
        setIsLoading(false);
        return;
      }
    }

    let foundQuestion: Question | null = null;
    let foundQuestionIndex = 0;
    let foundTopicIndex = 0;
    let foundCategoryIndex = 0;
    let foundCardIndex = 0;

    // Find next incomplete question following the sequential order of cards in the plan
    for (let cardIdx = 0; cardIdx < cardsToSearch.length; cardIdx++) {
      const card = cardsToSearch[cardIdx];
      const actualCardIndex = planData.cards.findIndex(c => c.id === card.id);

        for (
          let categoryIndex = 0;
          categoryIndex < card.categories.length;
          categoryIndex++
        ) {
          const category = card.categories[categoryIndex];

          // Skip if we're looking for a specific category and this isn't it
          if (categoryId && category.id !== categoryId) {
            console.log('⏭️ Skipping category (does not match categoryId filter):', {
              categoryName: category.name,
              categoryId: category.id,
              requestedCategoryId: categoryId,
            });
            continue;
          }

          for (
            let topicIndex = 0;
            topicIndex < category.topics.length;
            topicIndex++
          ) {
            const topic = category.topics[topicIndex];

            if (topic.questions && topic.questions.length > 0) {
              for (
                let questionIndex = 0;
                questionIndex < topic.questions.length;
                questionIndex++
              ) {
                const question = topic.questions[questionIndex];

                // Check if this question is not completed and has options (for multiple choice) or is a code question
                const hasOptions = question.options &&
                  Array.isArray(question.options) &&
                  question.options.length > 0;
                const isCodeQuestion = question.type === 'code';
                
                if (
                  !savedProgress.completedQuestions.includes(question.id) &&
                  (hasOptions || isCodeQuestion)
                ) {
                  foundQuestion = question;
                  foundQuestionIndex = questionIndex;
                  foundTopicIndex = topicIndex;
                  foundCategoryIndex = categoryIndex;
                  foundCardIndex = actualCardIndex;
                  console.log('✅ Found next incomplete question in card:', {
                    cardTitle: card.title,
                    categoryName: category.name,
                    topicName: topic.name,
                    questionTitle: question.title?.substring(0, 50),
                  });
                  break;
                }
              }
            }
            if (foundQuestion) break;
          }
          if (foundQuestion) break;
      }
      if (foundQuestion) break;
    }

    // Set all state at once if we found a question
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
      setCurrentQuestionIndex(foundQuestionIndex);
      setCurrentTopicIndex(foundTopicIndex);
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentCardIndex(foundCardIndex);
      
      // Save current position to progress so we can resume on refresh
      const latestProgress = loadProgress();
      if (latestProgress) {
        const updatedProgress = {
          ...latestProgress,
          currentPosition: {
            cardIndex: foundCardIndex,
            categoryIndex: foundCategoryIndex,
            topicIndex: foundTopicIndex,
            questionIndex: foundQuestionIndex,
          },
          lastUpdated: new Date().toISOString(),
        };
        saveProgress(updatedProgress);
        console.log('💾 Saved current position for resume:', {
          cardIndex: foundCardIndex,
          categoryIndex: foundCategoryIndex,
          topicIndex: foundTopicIndex,
          questionIndex: foundQuestionIndex,
        });
      }
      
      setIsLoading(false);
    }
    // Fallback: if no next incomplete question found, start from first available
    else {
      findFirstQuestion(planData);
      // findFirstQuestion will set loading to false
    }
  };

  const handleAnswerSelect = (answer: string | { text: string }) => {
    try {
    if (currentAnswer) return; // Already answered
      if (!currentQuestion) {
        console.error('❌ Cannot select answer: currentQuestion is null');
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Question not found. Please refresh the page.',
        });
        return;
      }

      // Normalize answer - handle both string and object formats
      const answerText = typeof answer === 'string' ? answer : answer.text;
      
      if (!answerText) {
        console.error('❌ Invalid answer format:', answer);
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Invalid answer format. Please try again.',
        });
        return;
      }

      setCurrentAnswer(answerText);
    setShowExplanation(true);

      console.log('📝 Answer selected for question:', {
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        answer: answerText,
      });

      // Mark question as completed - ensure progress is initialized first
      try {
        // Initialize progress if it doesn't exist
        let latestProgress = loadProgress();
        if (!latestProgress) {
          latestProgress = initializeProgress();
          saveProgress(latestProgress);
        }
      markQuestionCompleted(currentQuestion.id);
      } catch (error) {
        console.error('❌ Error marking question as completed:', error);
        // Don't show error to user for this - it's not critical
      }

      // Track correct answers for scoring - get latest progress after marking completed
      let latestProgress: Progress | null = null;
      try {
        latestProgress = loadProgress();
      } catch (error) {
        console.error('❌ Error loading progress:', error);
        // Initialize progress if loading fails
        latestProgress = initializeProgress();
        saveProgress(latestProgress);
      }

      let correct = false;
      try {
        correct = isCorrectAnswer(answerText);
      } catch (error) {
        console.error('❌ Error checking answer correctness:', error);
        // If we can't check correctness, assume incorrect
        correct = false;
      }

      console.log('🎯 Answer correctness:', {
        questionId: currentQuestion.id,
        isCorrect: correct,
        selectedAnswer: answerText,
      });

      if (latestProgress) {
        try {
        if (
          correct &&
          !latestProgress.correctAnswers.includes(currentQuestion.id)
        ) {
          const updatedProgress = {
            ...latestProgress,
            correctAnswers: [
              ...latestProgress.correctAnswers,
              currentQuestion.id,
            ],
            lastUpdated: new Date().toISOString(),
          };
          saveProgress(updatedProgress);
          }
        } catch (error) {
          console.error('❌ Error saving progress:', error);
          // Don't show error to user - progress will sync later
        }
      }

      // Auto-add to flashcards on wrong answer
      if (!correct) {
        try {
          addFlashcard({
            id: currentQuestion.id,
            question:
              currentQuestion.title || currentQuestion.content || '',
            section: currentCategory?.name || 'Unknown',
            difficulty: currentQuestion.difficulty || 'intermediate',
            addedAt: Date.now(),
          });
          setInFlashcards(true);
        } catch (error) {
          console.error('❌ Error adding to flashcards:', error);
          // Don't show error to user - flashcard addition is not critical
        }
      }
    } catch (error) {
      console.error('❌ Error in handleAnswerSelect:', error);
      // Only show error notification if it's a critical error
      try {
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'An error occurred while processing your answer. Please try again.',
        });
      } catch (notifError) {
        console.error('❌ Error showing notification:', notifError);
      }
    }
  };

  const proceedToNext = () => {
    if (!plan || !currentQuestion) {
      console.warn('⚠️ Cannot proceed: plan or currentQuestion is missing');
      return;
    }

    console.log('➡️ Proceeding to next question in sequence...', {
      currentQuestionId: currentQuestion.id,
      currentQuestionTitle: currentQuestion.title?.substring(0, 50),
      currentCardIndex,
      currentCategoryIndex,
      currentTopicIndex,
      currentQuestionIndex,
    });

    // Get current position
    const currentCard = plan.cards[currentCardIndex];
    if (!currentCard) {
      console.error('❌ Current card not found');
      return;
    }

    const currentCategory = currentCard.categories[currentCategoryIndex];
    if (!currentCategory) {
      console.error('❌ Current category not found');
      return;
    }

    const currentTopic = currentCategory.topics[currentTopicIndex];
    if (!currentTopic) {
      console.error('❌ Current topic not found');
      return;
    }

    // Try to find next question in current topic
    if (currentQuestionIndex + 1 < currentTopic.questions.length) {
      // Next question in same topic
      const nextQuestion = currentTopic.questions[currentQuestionIndex + 1];
      const hasOptions = nextQuestion.options && Array.isArray(nextQuestion.options) && nextQuestion.options.length > 0;
      const isCodeQuestion = nextQuestion.type === 'code';
      
      if (hasOptions || isCodeQuestion) {
        console.log('✅ Found next question in same topic:', {
          questionId: nextQuestion.id,
          questionTitle: nextQuestion.title?.substring(0, 50),
        });
        
        setCurrentQuestion(nextQuestion);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        
        // Update progress
        const latestProgress = loadProgress();
        if (latestProgress) {
          const updatedProgress = {
            ...latestProgress,
            currentPosition: {
              cardIndex: currentCardIndex,
              categoryIndex: currentCategoryIndex,
              topicIndex: currentTopicIndex,
              questionIndex: currentQuestionIndex + 1,
            },
            lastUpdated: new Date().toISOString(),
          };
          saveProgress(updatedProgress);
        }
        
        setCurrentAnswer(null);
        setShowExplanation(false);
        return;
      }
    }

    // Try next topic in same category
    if (currentTopicIndex + 1 < currentCategory.topics.length) {
      const nextTopic = currentCategory.topics[currentTopicIndex + 1];
      if (nextTopic.questions && nextTopic.questions.length > 0) {
        // Find first valid question in next topic
        const nextQuestion = nextTopic.questions.find(q => {
          const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
          const isCodeQuestion = q.type === 'code';
          return hasOptions || isCodeQuestion;
        });
        
        if (nextQuestion) {
          const questionIndex = nextTopic.questions.indexOf(nextQuestion);
          console.log('✅ Found next question in next topic:', {
            questionId: nextQuestion.id,
            questionTitle: nextQuestion.title?.substring(0, 50),
          });
          
          setCurrentQuestion(nextQuestion);
          setCurrentQuestionIndex(questionIndex);
          setCurrentTopicIndex(currentTopicIndex + 1);

          // Update progress
          const latestProgress = loadProgress();
          if (latestProgress) {
            const updatedProgress = {
              ...latestProgress,
              currentPosition: {
                cardIndex: currentCardIndex,
                categoryIndex: currentCategoryIndex,
                topicIndex: currentTopicIndex + 1,
                questionIndex,
              },
              lastUpdated: new Date().toISOString(),
            };
            saveProgress(updatedProgress);
          }
          
          setCurrentAnswer(null);
          setShowExplanation(false);
          return;
        }
      }
    }

    // Try next category in same card
    if (currentCategoryIndex + 1 < currentCard.categories.length) {
      const nextCategory = currentCard.categories[currentCategoryIndex + 1];

      // Find first valid question in next category
      for (let topicIndex = 0; topicIndex < nextCategory.topics.length; topicIndex++) {
        const topic = nextCategory.topics[topicIndex];
            if (topic.questions && topic.questions.length > 0) {
          const nextQuestion = topic.questions.find(q => {
            const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
            const isCodeQuestion = q.type === 'code';
            return hasOptions || isCodeQuestion;
          });
          
          if (nextQuestion) {
            const questionIndex = topic.questions.indexOf(nextQuestion);
            console.log('✅ Found next question in next category:', {
              questionId: nextQuestion.id,
              questionTitle: nextQuestion.title?.substring(0, 50),
            });
            
            setCurrentQuestion(nextQuestion);
            setCurrentQuestionIndex(questionIndex);
            setCurrentTopicIndex(topicIndex);
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            
            // Update progress
            const latestProgress = loadProgress();
            if (latestProgress) {
              const updatedProgress = {
                ...latestProgress,
                currentPosition: {
                  cardIndex: currentCardIndex,
                  categoryIndex: currentCategoryIndex + 1,
                    topicIndex,
                    questionIndex,
                },
                lastUpdated: new Date().toISOString(),
              };
              saveProgress(updatedProgress);
            }
            
            setCurrentAnswer(null);
            setShowExplanation(false);
            return;
          }
        }
      }
    }

    // Try next card
    if (currentCardIndex + 1 < plan.cards.length) {
      const nextCard = plan.cards[currentCardIndex + 1];
      
      // Find first valid question in next card
      for (let categoryIndex = 0; categoryIndex < nextCard.categories.length; categoryIndex++) {
        const category = nextCard.categories[categoryIndex];
        
        for (let topicIndex = 0; topicIndex < category.topics.length; topicIndex++) {
          const topic = category.topics[topicIndex];
          if (topic.questions && topic.questions.length > 0) {
            const nextQuestion = topic.questions.find(q => {
              const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
              const isCodeQuestion = q.type === 'code';
              return hasOptions || isCodeQuestion;
            });
            
            if (nextQuestion) {
              const questionIndex = topic.questions.indexOf(nextQuestion);
              console.log('✅ Found next question in next card:', {
                questionId: nextQuestion.id,
                questionTitle: nextQuestion.title?.substring(0, 50),
              });
              
              setCurrentQuestion(nextQuestion);
              setCurrentQuestionIndex(questionIndex);
              setCurrentTopicIndex(topicIndex);
              setCurrentCategoryIndex(categoryIndex);
              setCurrentCardIndex(currentCardIndex + 1);

              // Update progress
              const latestProgress = loadProgress();
              if (latestProgress) {
      const updatedProgress = {
                  ...latestProgress,
        currentPosition: {
                    cardIndex: currentCardIndex + 1,
                    categoryIndex,
                    topicIndex,
                    questionIndex,
        },
        lastUpdated: new Date().toISOString(),
      };
      saveProgress(updatedProgress);
              }

      setCurrentAnswer(null);
      setShowExplanation(false);
      return;
            }
          }
        }
      }
    }

    // If we reach here, we're at the last question
    console.log('ℹ️ Already at the last question');
    const latestProgress = loadProgress();
    if (latestProgress) {
      const completedCount = latestProgress.completedQuestions.length;
      const correctCount = latestProgress.correctAnswers.length;
      const percentage = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;
      
      setIsCompleted(true);
      setFinalScore({ correct: correctCount, total: completedCount, percentage });
    }

    // If we reach here, all questions are completed
    const completedCount = progress?.completedQuestions?.length || 0;
    const correctCount = progress?.correctAnswers?.length || 0;
    const percentage =
      completedCount > 0
        ? Math.round((correctCount / completedCount) * 100)
        : 0;

    // Mark plan as completed
    setIsCompleted(true);
    setFinalScore({ correct: correctCount, total: completedCount, percentage });

    // Save completion and score to localStorage
    if (planId) {
      try {
        // Save completed plan
        const completedPlansData = localStorage.getItem(
          'completed-guided-plans'
        );
        const completedPlans = completedPlansData
          ? JSON.parse(completedPlansData)
          : [];
        if (!completedPlans.includes(planId)) {
          completedPlans.push(planId);
          localStorage.setItem(
            'completed-guided-plans',
            JSON.stringify(completedPlans)
          );
        }

        // Save plan grade
        const planGradesData = localStorage.getItem('plan-grades');
        const planGrades = planGradesData ? JSON.parse(planGradesData) : {};
        planGrades[planId] = percentage;
        localStorage.setItem('plan-grades', JSON.stringify(planGrades));
      } catch (error) {
        console.error('Error saving completion data:', error);
      }
    }

    addNotification({
      type: 'success',
      title: 'Congratulations! 🎉',
      message: `You completed the plan with ${percentage}% accuracy!`,
      duration: 5000,
    });
  };

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  // Shuffle options deterministically based on question ID
  // This ensures the same question always has the same order (consistent UX)
  // but different questions have different orders (prevents always selecting "A")
  const shuffleOptions = React.useCallback((options: Array<{ id: string; text: string; isCorrect: boolean }>, questionId: string): Array<{ id: string; text: string; isCorrect: boolean }> => {
    if (!options || options.length === 0) return [];
    
    // Create a simple hash from question ID for deterministic shuffling
    let hash = 0;
    for (let i = 0; i < questionId.length; i++) {
      const char = questionId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use seeded random for deterministic shuffle
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Fisher-Yates shuffle with seed
    const shuffled = [...options];
    let seed = Math.abs(hash);
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280; // Linear congruential generator
      const j = Math.floor(seededRandom(seed) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }, []);

  // Shuffle options whenever the question changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.id && currentQuestion.options && Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0) {
      try {
        const shuffled = shuffleOptions(currentQuestion.options, currentQuestion.id);
        setShuffledOptions(shuffled);
        // Reset answer when question changes
        setCurrentAnswer(null);
        setShowExplanation(false);
      } catch (error) {
        console.error('Error shuffling options:', error);
        // Fallback to original order if shuffling fails
        setShuffledOptions(currentQuestion.options);
      }
    } else {
      setShuffledOptions([]);
    }
  }, [currentQuestion?.id, shuffleOptions]); // Only shuffle when question ID changes

  // Scroll to explanation when it becomes visible
  useEffect(() => {
    if (showExplanation && explanationRef.current) {
      // Small delay to ensure the explanation is rendered
      setTimeout(() => {
        explanationRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [showExplanation]);

  // Helper function to extract code for code editor preview
  // Since database is clean (no HTML tags), we just normalize the code
  const extractCodeForEditor = (content: string): string => {
    if (!content || typeof content !== 'string') return '';
    
    try {
      let code = content;
      
      // Since database is clean, we just need to:
      // 1. Normalize line endings
      code = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      
      // 2. Handle escaped newlines (if any)
      code = code.replace(/\\\\n/g, '\n');
      code = code.replace(/\\n/g, '\n');
      
      // 3. Format the code
      code = formatCodeContent(code);
      
      return code.trim();
    } catch (error) {
      console.error('Error extracting code:', error);
      return '';
    }
  };

  const isCorrectAnswer = (option: string) => {
    if (!currentQuestion) return false;

    // Clean the input option text for comparison
    const cleanedOption = cleanOptionText(option);

    // If currentQuestion has options array, find the option by text
    if (currentQuestion.options && Array.isArray(currentQuestion.options)) {
      // Find the option object by comparing cleaned text
      const optionObj = currentQuestion.options.find(
        opt => cleanOptionText(opt.text) === cleanedOption
      );
      
      if (optionObj) {
        // First, check if the option has an isCorrect field (most reliable)
        if (typeof optionObj.isCorrect === 'boolean') {
          return optionObj.isCorrect;
        }
        
        // Fallback: Compare option id (e.g., "o2", "A") with correct_answer if it's an ID
        const optionId = optionObj.id?.toLowerCase();
        const correctAnswer = String(currentQuestion.correct_answer || '').toLowerCase();
        
        // If correct_answer matches the option ID, it's correct
        if (optionId === correctAnswer) {
          return true;
        }
        
        // Fallback: Compare cleaned option text with cleaned correct_answer
        const cleanedCorrectAnswer = cleanOptionText(String(currentQuestion.correct_answer || ''));
        if (cleanedOption === cleanedCorrectAnswer) {
          return true;
        }
      }
      
      // Also check if correct_answer matches any option's text directly (using cleaned text)
      const cleanedCorrectAnswer = cleanOptionText(String(currentQuestion.correct_answer || ''));
      const correctOption = currentQuestion.options.find(
        opt => cleanOptionText(opt.text) === cleanedCorrectAnswer
      );
      if (correctOption && cleanOptionText(correctOption.text) === cleanedOption) {
        return true;
      }
    }

    // Fallback: direct text comparison using cleaned text (for backwards compatibility)
    const cleanedCorrectAnswer = cleanOptionText(String(currentQuestion.correct_answer || ''));
    return cleanedOption === cleanedCorrectAnswer;
  };

  // Reflect flashcard state when question changes
  useEffect(() => {
    try {
      if (currentQuestion) setInFlashcards(isInFlashcards(currentQuestion.id));
      else setInFlashcards(false);
    } catch (_) {
      setInFlashcards(false);
    }
  }, [currentQuestion]);

  const getOptionClasses = (option: string) => {
    if (!currentAnswer) {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors';
    }

    const isCorrect = isCorrectAnswer(option);
    const isSelected = currentAnswer === option;

    if (isCorrect) {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-100 transition-colors';
    } else if (isSelected && !isCorrect) {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-100 transition-colors';
    } else {
      return 'w-full text-left p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors';
    }
  };

  // Calculate overall progress
  const getOverallProgress = () => {
    if (!plan || !progress)
      return { completed: 0, total: plan?.totalQuestions || 0, percentage: 0 };

    let completed = 0;
    for (const card of plan.cards) {
      for (const category of card.categories) {
        for (const topic of category.topics) {
          for (const question of topic.questions) {
            if (progress.completedQuestions.includes(question.id)) {
              completed++;
            }
          }
        }
      }
    }

    const percentage =
      plan.totalQuestions > 0
        ? Math.round((completed / plan.totalQuestions) * 100)
        : 0;
    return { completed, total: plan.totalQuestions, percentage };
  };

  // Get current question number across all questions (absolute sequential position)
  const getCurrentQuestionNumber = () => {
    if (!plan || !currentQuestion) return 1;

    let questionNumber = 0;
    
    // Count all questions before the current one, in sequential order
    // Following the structure: Cards → Categories → Topics → Questions
    for (let cardIdx = 0; cardIdx < plan.cards.length; cardIdx++) {
      const card = plan.cards[cardIdx];
      
      for (let categoryIdx = 0; categoryIdx < card.categories.length; categoryIdx++) {
        const category = card.categories[categoryIdx];
        
        for (let topicIdx = 0; topicIdx < category.topics.length; topicIdx++) {
          const topic = category.topics[topicIdx];
          
          if (topic.questions && topic.questions.length > 0) {
            for (let questionIdx = 0; questionIdx < topic.questions.length; questionIdx++) {
              const question = topic.questions[questionIdx];
              
              // Check if this is a valid question (has options or is code type)
              const hasOptions = question.options && 
                Array.isArray(question.options) && 
                question.options.length > 0;
              const isCodeQuestion = question.type === 'code';
              
              if (hasOptions || isCodeQuestion) {
                questionNumber++;
                
                // If we found the current question, return the count
            if (question.id === currentQuestion.id) {
              return questionNumber;
            }
            }
          }
        }
      }
    }
    }
    
    // If current question not found, return the count (shouldn't happen)
    return questionNumber || 1;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600 mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-400'>
            Loading practice session...
          </p>
        </div>
      </div>
    );
  }

  if (error || !planId) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-4'>
        <div className='text-center max-w-md w-full'>
          <XCircle className='w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4 sm:mb-6' />
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
            {error || 'Plan ID Required'}
          </h1>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6'>
            {error || 'Please provide a plan ID to start the practice session.'}
          </p>
          <Link
            href='/features/guided-learning'
            className='inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-4'>
        <div className='text-center max-w-md w-full'>
          <XCircle className='w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4 sm:mb-6' />
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
            Plan Not Found
          </h1>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6'>
            The requested learning plan could not be found.
          </p>
          <Link
            href='/features/guided-learning'
            className='inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base'
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  // Show completion screen with score
  if (isCompleted && finalScore) {
    const getGradeColor = (percentage: number) => {
      if (percentage >= 90) return 'text-yellow-600 dark:text-yellow-400';
      if (percentage >= 80) return 'text-green-600 dark:text-green-400';
      if (percentage >= 70) return 'text-blue-600 dark:text-blue-400';
      if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
      return 'text-red-600 dark:text-red-400';
    };

    const getGradeText = (percentage: number) => {
      if (percentage >= 90) return 'A+ (Excellent!)';
      if (percentage >= 80) return 'A (Great!)';
      if (percentage >= 70) return 'B+ (Good!)';
      if (percentage >= 60) return 'B (Not bad!)';
      return 'C (Keep practicing!)';
    };

    const gradeColor = getGradeColor(finalScore.percentage);
    const gradeText = getGradeText(finalScore.percentage);

    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-3 sm:px-4'>
        <div className='max-w-2xl mx-auto w-full'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20 text-center'>
            {/* Celebration Icon */}
            <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg'>
              <CheckCircle className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white' />
            </div>

            {/* Title */}
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
              Congratulations! 🎉
            </h1>
            <p className='text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8'>
              You completed {plan.name}
            </p>

            {/* Score Display */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8 border border-blue-200 dark:border-blue-800'>
              <div className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-2'>
                <span className={gradeColor}>{finalScore.percentage}%</span>
              </div>
              <div className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 ${gradeColor}`}>
                {gradeText}
              </div>
              <div className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {finalScore.correct}
                </span>{' '}
                out of{' '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {finalScore.total}
                </span>{' '}
                questions answered correctly
              </div>
            </div>

            {/* Progress Stats */}
            <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8'>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4'>
                <div className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>
                  {getOverallProgress().completed}
                </div>
                <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  Questions Done
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4'>
                <div className='text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400'>
                  {finalScore.correct}
                </div>
                <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  Correct Answers
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4'>
                <div className='text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {progress?.completedCards.length || 0}
                </div>
                <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  Cards Completed
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <Link
                href='/dashboard'
                title='Go to Dashboard'
                className='group relative inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white hover:bg-green-50 text-green-600 hover:text-green-700 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 hover:shadow-md hover:scale-105'
              >
                <BarChart3 className='w-4 h-4 transition-transform duration-200 group-hover:scale-110' />
                <span className='transition-all duration-200'>
                  Go to Dashboard
                </span>
              </Link>
              <Link
                href={`/features/guided-learning/${planId}`}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Plan</span>
              </Link>
              <Link
                href='/features/guided-learning'
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <BookOpen className='w-4 h-4' />
                <span>View All Plans</span>
              </Link>
              <button
                onClick={() => {
                  resetProgress(plan);
                  setIsCompleted(false);
                  setFinalScore(null);
                }}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    // Debug info
    const totalQuestionsWithOptions =
      plan?.cards.reduce((total, card) => {
        return (
          total +
          card.categories.reduce((catTotal, category) => {
            return (
              catTotal +
              category.topics.reduce((topicTotal, topic) => {
                return (
                  topicTotal +
                  topic.questions.filter(
                    q =>
                      q.options &&
                      Array.isArray(q.options) &&
                      q.options.length > 0
                  ).length
                );
              }, 0)
            );
          }, 0)
        );
      }, 0) || 0;

    console.error(
      'No question found with valid options. Total questions with options:',
      totalQuestionsWithOptions
    );

    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
        <div className='text-center max-w-2xl mx-auto px-3 sm:px-4'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
            <CheckCircle className='w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4 sm:mb-6' />
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
              No Questions Available
            </h1>
            <p className='text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8'>
              This plan doesn&apos;t have any questions with answer options
              available for practice.
              <br />
              <span className='text-xs sm:text-sm'>
                Total questions: {plan?.totalQuestions || 0}, Questions with
                options: {totalQuestionsWithOptions}
              </span>
            </p>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <Link
                href={`/features/guided-learning/${planId}`}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to Plan</span>
              </Link>

              <Link
                href='/features/guided-learning'
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
              >
                <BookOpen className='w-4 h-4' />
                <span>View All Plans</span>
              </Link>
              <button
                onClick={() => resetProgress(plan!)}
                className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors'
              >
                <span>Reset Progress</span>
              </button>
              <button
                title='Add to Plan'
                onClick={() => {
                  if (!currentQuestion) return;
                  try {
                    const question: Question = currentQuestion;
                    addToCart({
                      id: question.id,
                      question:
                        question.title || question.content || '',
                      section: currentCategory?.name,
                      difficulty: question.difficulty,
                      addedAt: Date.now(),
                    });
                  } catch (_) {}
                }}
                className='p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              >
                <ShoppingCart className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = plan.cards[currentCardIndex];
  const currentCategory = currentCard?.categories[currentCategoryIndex];
  const currentTopic = currentCategory?.topics[currentTopicIndex];

  // Different layout for code type questions
  const isCodeQuestion = currentQuestion.type === 'code';

  return (
    <div className={`min-h-screen ${isCodeQuestion ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'} pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8`}>
      <div className={isCodeQuestion ? 'w-full h-[calc(100vh-4rem)]' : 'max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'}>
        {/* Compact Header for Code Questions */}
        {isCodeQuestion ? (
          <div className='mb-4 sm:mb-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-none'>
            <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5'>
              {/* Top Row: Navigation Links and Progress */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-700'>
                {/* Left: Navigation Links and Breadcrumb */}
                <div className='flex items-center gap-2.5 sm:gap-3 flex-wrap'>
          <Link
            href={`/features/guided-learning/${planId}`}
                    className='inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white dark:text-gray-100 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 border border-blue-400/50 dark:border-blue-500/50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  >
                    <ArrowLeft className='w-4 h-4' />
                    <span>Back to Plan</span>
                  </Link>
                  <Link
                    href='/features/guided-learning'
                    className='inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white dark:text-gray-100 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 border border-purple-400/50 dark:border-purple-500/50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  >
                    <BookOpen className='w-4 h-4' />
                    <span>View All Plans</span>
                  </Link>
                  {/* Breadcrumb Navigation */}
                  <div className='flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-gray-300 dark:border-gray-600'>
                    <span className='truncate px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-900/30 text-indigo-800 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-700/60 shadow-sm font-semibold'>{currentCard?.icon} {currentCard?.title}</span>
                    {/* Only show category if it's different from card title */}
                    {currentCategory?.name && currentCategory.name !== currentCard?.title && (
                      <>
                        <span className='hidden sm:inline text-indigo-500 dark:text-indigo-400 font-bold'>→</span>
                        <span className='truncate px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-900/30 text-purple-800 dark:text-purple-200 border border-purple-300/60 dark:border-purple-700/60 shadow-sm font-semibold'>{currentCategory?.name}</span>
                      </>
                    )}
                    {/* Show topic if it exists */}
                    {currentTopic?.name && (
                      <>
                        <span className='hidden sm:inline text-purple-500 dark:text-purple-400 font-bold'>→</span>
                        <span className='truncate px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-900/30 text-pink-800 dark:text-pink-200 border border-pink-300/60 dark:border-pink-700/60 shadow-sm font-semibold'>{currentTopic?.name}</span>
                      </>
                    )}
                  </div>
                </div>
                {/* Right: Progress Indicators */}
                <div className='flex items-center gap-3 sm:gap-4 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-700/20 rounded-xl border border-gray-200/80 dark:border-gray-600 shadow-sm'>
                  <div className='text-right'>
                    <div className='text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300'>
                      Q {getCurrentQuestionNumber()}/{plan.totalQuestions}
                    </div>
                    <div className='text-xs text-gray-600 dark:text-gray-400'>
                      {getOverallProgress().completed}/{getOverallProgress().total} ({getOverallProgress().percentage}%)
                    </div>
                  </div>
                  <div className='w-20 sm:w-28 bg-gray-200/80 dark:bg-gray-600 rounded-full h-2 sm:h-2.5 flex-shrink-0 border border-gray-300/50 dark:border-gray-500 shadow-inner'>
                    <div
                      className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 sm:h-2.5 rounded-full transition-all duration-500 shadow-sm'
                      style={{ width: `${getOverallProgress().percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Header for Multiple Choice Questions */
          <div className='mb-4 sm:mb-6 lg:mb-8'>
            <Link
              href={`/features/guided-learning/${planId}`}
              className='inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white dark:text-gray-100 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 border border-blue-400/50 dark:border-blue-500/50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 mb-3 sm:mb-4'
          >
              <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span>Back to Plan</span>
          </Link>

            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4'>
                <div className='flex-1 min-w-0'>
                  <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2'>
                  {plan.name}
                </h1>
              </div>
                <div className='text-left sm:text-right flex-shrink-0'>
                  <div className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                  Question
                </div>
                  <div className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white'>
                  {getCurrentQuestionNumber()} of {plan.totalQuestions}
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
              <div className='mb-3 sm:mb-4'>
                <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                  <span className='text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Overall Progress
                </span>
                  <span className='text-xs sm:text-sm font-medium text-gray-900 dark:text-white'>
                  {getOverallProgress().completed}/{getOverallProgress().total}{' '}
                  ({getOverallProgress().percentage}%)
                </span>
              </div>
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3'>
                <div
                    className='bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500'
                  style={{ width: `${getOverallProgress().percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Progress indicators */}
              <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-0 sm:mb-4'>
              <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 ${
                  progress?.completedCards.includes(currentCard?.id || '')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}
              >
                  <span className='truncate max-w-[120px] sm:max-w-none'>
                  {currentCard?.icon} {currentCard?.title}
                </span>
                {progress?.completedCards.includes(currentCard?.id || '') && (
                    <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
                )}
              </span>
              <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 ${
                  progress?.completedCategories.includes(
                    currentCategory?.id || ''
                  )
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                }`}
              >
                  <span className='truncate max-w-[100px] sm:max-w-none'>{currentCategory?.name}</span>
                {progress?.completedCategories.includes(
                  currentCategory?.id || ''
                  ) && <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />}
              </span>
              <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 ${
                  progress?.completedTopics.includes(currentTopic?.id || '')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                }`}
              >
                  <span className='truncate max-w-[100px] sm:max-w-none'>{currentTopic?.name}</span>
                {progress?.completedTopics.includes(currentTopic?.id || '') && (
                    <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
                )}
              </span>
            </div>
          </div>
        </div>
        )}

        {/* Question */}
        <div className={isCodeQuestion ? '' : 'bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-gray-200 dark:border-gray-700 mb-8 transition-all duration-300'}>
          {/* Code-based questions (Problem Solving) */}
          {currentQuestion.type === 'code' ? (
            <ProblemSolvingQuestion
              question={{
                ...currentQuestion,
                category: currentCategory?.name,
                topic: currentTopic?.name,
                topic_id: currentTopic?.id,
                topic_name: currentTopic?.name,
                topic_description: (currentTopic as any)?.description || currentQuestion.topic_description,
                hints: currentQuestion.hints || null,
                constraints: currentQuestion.constraints || null,
                tags: currentQuestion.tags || null,
                language: currentQuestion.language || 'javascript',
              } as any}
              onComplete={(isCorrect) => {
                if (isCorrect && currentQuestion) {
                  markQuestionCompleted(currentQuestion.id);
                }
              }}
              onNextQuestion={() => {
                proceedToNext();
              }}
            />
          ) : (
            <>
              {/* Question Header */}
              <div className='mb-6 sm:mb-8'>
                <div className='flex items-center justify-between mb-4 sm:mb-5'>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <div className='p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/50 dark:to-purple-800/50 rounded-lg shadow-sm'>
                      <Target className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-300' />
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                      <span className='px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'>
                        {currentQuestion.difficulty}
                      </span>
                      <span className='px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600'>
                        {currentQuestion.type}
              </span>
            </div>
                  </div>
              <button
                title={
                  inFlashcards ? 'Added to Flashcards' : 'Add to Flashcards'
                }
                onClick={() => {
                  if (!currentQuestion) return;
                  if (inFlashcards) return;
                  try {
                    addFlashcard({
                      id: currentQuestion.id,
                      question:
                        currentQuestion.title ||
                        currentQuestion.content ||
                            '',
                      section: currentCategory?.name,
                      difficulty: currentQuestion.difficulty,
                      addedAt: Date.now(),
                    });
                    setInFlashcards(true);
                        addNotification({
                          type: 'success',
                          title: 'Added to flashcards',
                          message: 'Question has been added to your flashcards',
                        });
                  } catch (_) {}
                }}
                    className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md transform hover:scale-105 ${
                  inFlashcards
                        ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                }`}
              >
                {inFlashcards ? (
                      <BookmarkCheck className='w-5 h-5 sm:w-6 sm:h-6' />
                ) : (
                      <BookmarkPlus className='w-5 h-5 sm:w-6 sm:h-6' />
                )}
              </button>
            </div>

                {/* Question Content - Display content first, then code if available (matching admin view) */}
                <div className="space-y-4 mb-6 sm:mb-8">
                  {/* Question Content */}
                  {currentQuestion.content && (
                    <div className="text-lg sm:text-xl lg:text-2xl font-mono text-gray-900 dark:text-white leading-relaxed">
                      <QuestionContent content={currentQuestion.content} />
                    </div>
                  )}

                  {/* Question Code - Display after content if code exists */}
                  {currentQuestion.code_template && (() => {
                    // Format code function - removes all blank lines
                    const formatCodeForDisplay = (code: string): string => {
                      if (!code) return '';
                      
                      const codeStr = String(code);
                      
                      // Convert \n escape sequences to actual newlines FIRST
                      let formatted = codeStr.replace(/\\n/g, '\n');
                      formatted = formatted.replace(/\\r\\n/g, '\n');
                      formatted = formatted.replace(/\\r/g, '\n');
                      
                      // Normalize actual line breaks
                      formatted = formatted.replace(/\r\n/g, '\n');
                      formatted = formatted.replace(/\r/g, '\n');
                      
                      // Remove only leading/trailing whitespace (not newlines)
                      formatted = formatted.trim();
                      
                      // Remove empty lines at the start
                      while (formatted.startsWith('\n')) {
                        formatted = formatted.substring(1);
                      }
                      
                      // Remove empty lines at the end
                      while (formatted.endsWith('\n')) {
                        formatted = formatted.slice(0, -1);
                      }
                      
                      // Remove ALL blank lines - split by newlines, filter out empty lines, rejoin
                      const lines = formatted.split('\n');
                      const nonEmptyLines = lines.filter(line => {
                        const trimmed = line.trim();
                        return trimmed.length > 0; // Only keep lines with actual content
                      });
                      formatted = nonEmptyLines.join('\n');
                      
                      // Final check: ensure no blank lines remain
                      if (formatted.includes('\n\n')) {
                        formatted = formatted.replace(/\n{2,}/g, '\n');
                      }
                      
                      return formatted;
                    };

                    const rawCode = String(currentQuestion.code_template || '');
                    const codeWithNewlines = rawCode
                      .replace(/\\n/g, '\n')
                      .replace(/\\r\\n/g, '\n')
                      .replace(/\\r/g, '\n')
                      .replace(/\r\n/g, '\n')
                      .replace(/\r/g, '\n');
                    
                    const formattedCode = formatCodeForDisplay(codeWithNewlines);
                    // Split and filter again to ensure no empty lines in codeLines array
                    const codeLines = formattedCode.split('\n').filter(line => line.trim().length > 0);

                    // Detect language from code
                    let detectedLanguage = 'javascript';
                    const codeText = formattedCode.toLowerCase();
                    if (codeText.includes('def ') || codeText.includes('import ') && codeText.includes('print')) {
                      detectedLanguage = 'python';
                    } else if (codeText.includes('public class') || codeText.includes('public static')) {
                      detectedLanguage = 'java';
                    } else if (codeText.includes('interface ') || codeText.includes('type ') || codeText.includes(': string')) {
                      detectedLanguage = 'typescript';
                    } else if (codeText.includes('function ') || codeText.includes('const ') || codeText.includes('let ')) {
                      detectedLanguage = 'javascript';
                    }

                    // Detect theme based on system preference
                    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const codeTheme = prefersDark ? 'dark' : 'light';

                    return (
                      <>
                        {/* Compact Code display with Shiki syntax highlighting - Light/Dark mode support */}
                        <div className={`relative rounded-lg overflow-hidden shadow-lg border ${
                          codeTheme === 'dark' 
                            ? 'border-gray-700 bg-gray-900' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {/* Compact Code editor header bar */}
                          <div className={`flex items-center justify-between px-2 py-1.5 border-b ${
                            codeTheme === 'dark'
                              ? 'bg-gray-800 border-gray-700'
                              : 'bg-gray-100 border-gray-200'
                          }`}>
                            <div className="flex items-center gap-2">
                              {/* Window controls - smaller */}
                              <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              </div>
                              {/* File name - compact */}
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
                            {/* Language badge - compact */}
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
                          
                          {/* Code content with Shiki highlighting - compact */}
                          <div className={`overflow-x-auto ${codeTheme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
                            {isLoadingShiki ? (
                              <div className="p-2 text-center text-xs text-gray-500">Loading...</div>
                            ) : codeHighlightedHtml ? (
                              <div className="relative">
                                {/* Line numbers background - narrower */}
                                <div className={`absolute left-0 top-0 bottom-0 w-10 border-r ${
                                  codeTheme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'
                                }`}></div>
                                
                                {/* Shiki highlighted code with line numbers */}
                                <div className="relative">
                                  {/* Shiki highlighted code */}
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
                                  
                                  {/* Line numbers - compact - only for non-empty lines */}
                                  <div className="absolute left-0 top-0 flex flex-col" style={{ paddingTop: '0.375rem' }}>
                                    {codeLines.map((_, index) => (
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
                              // Fallback: plain code display - compact
                              <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-10 border-r ${
                                  codeTheme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'
                                }`}></div>
                                <pre className="m-0 p-2 pl-10 text-sm font-mono font-medium leading-relaxed">
                                  <code className="block">
                                    {codeLines.map((line, index) => (
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
          </div>

          {/* Answer Options */}
          {shuffledOptions && shuffledOptions.length > 0 ? (
            <div className='space-y-3 sm:space-y-4'>
              {shuffledOptions.map((option, index) => {
                const optionId = option.id || `option-${index}`;
                const optionLetter = getOptionLetter(index);
                const isCorrect = currentAnswer && isCorrectAnswer(option.text);
                const isSelected = currentAnswer === option.text;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={optionId}
                    onClick={() => handleAnswerSelect(option.text)}
                    disabled={!!currentAnswer}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                      !currentAnswer
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100'
                        : isCorrect
                          ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]'
                          : isWrong
                            ? 'border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60'
                    } ${currentAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className='flex items-center space-x-4 sm:space-x-5'>
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${
                          isCorrect
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50'
                            : isWrong
                              ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50'
                              : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200'
                        }`}
                      >
                        {optionLetter}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <OptionText text={option.text} />
                      </div>
                      {isCorrect && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <CheckCircle className='w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400' />
                        </div>
                      )}
                      {isWrong && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <XCircle className='w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400' />
                        </div>
                        )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : currentQuestion.type === 'true-false' ? (
            <div className='space-y-3 sm:space-y-4'>
              {(shuffledOptions && shuffledOptions.length > 0
                ? shuffledOptions.map(opt => opt.text.toLowerCase())
                : ['true', 'false']
              ).map(option => {
                const isCorrect = currentAnswer && isCorrectAnswer(option);
                const isSelected = currentAnswer === option;
                const isWrong = isSelected && !isCorrect;

                return (
                <button
                  key={option}
                    onClick={() => handleAnswerSelect(String(option))}
                  disabled={!!currentAnswer}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                      !currentAnswer
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100'
                        : isCorrect
                          ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]'
                          : isWrong
                            ? 'border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60'
                    } ${currentAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className='flex items-center space-x-4 sm:space-x-5'>
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${
                          isCorrect
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50'
                            : isWrong
                              ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50'
                              : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200'
                      }`}
                    >
                      {option === 'true' ? 'T' : 'F'}
                    </div>
                      <span className='flex-1 capitalize text-base sm:text-lg font-semibold text-left'>{option}</span>
                      {isCorrect && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <CheckCircle className='w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400' />
                        </div>
                      )}
                      {isWrong && (
                        <div className='flex-shrink-0 animate-in fade-in slide-in-from-right-2 duration-300'>
                          <XCircle className='w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400' />
                        </div>
                      )}
                  </div>
                </button>
                );
              })}
            </div>
          ) : (
            <div className='mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <XCircle className='w-5 h-5 text-red-600' />
                <p className='text-red-800 dark:text-red-200 font-medium'>
                  No answer options available for this question
                </p>
              </div>
              <p className='text-red-700 dark:text-red-300 text-sm mt-2'>
                This question doesn&apos;t have answer options configured.
                Please contact support or use manual mode to proceed.
              </p>
              <div className='mt-4'>
                <button
                  onClick={proceedToNext}
                  className='inline-flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors'
                >
                  <span>Skip This Question</span>
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          )}

              {/* Explanation - Only show for non-code questions */}
              {currentQuestion.type !== 'code' && showExplanation && currentQuestion.explanation && (
                <div 
                  ref={explanationRef}
                  className='mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200/50 dark:shadow-blue-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                  <div className='flex items-center space-x-3 mb-4'>
                    <div className='p-2.5 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-md'>
                      <Info className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                    </div>
                    <p className='text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100'>
                  Explanation
                </p>
              </div>
                  <div className='text-sm sm:text-base text-blue-800 dark:text-blue-200 leading-relaxed pl-1'>
                    <QuestionContent content={currentQuestion.explanation} />
                  </div>
            </div>
          )}

              {/* Resources - Show after explanation if available */}
              {currentQuestion.type !== 'code' && showExplanation && currentQuestion.resources && Array.isArray(currentQuestion.resources) && currentQuestion.resources.length > 0 && (
                <div className='mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-xl sm:rounded-2xl shadow-xl shadow-purple-200/50 dark:shadow-purple-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                  <div className='flex items-center space-x-3 mb-4'>
                    <div className='p-2.5 bg-purple-500 dark:bg-purple-600 rounded-lg shadow-md'>
                      <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                    </div>
                    <p className='text-base sm:text-lg font-bold text-purple-900 dark:text-purple-100'>
                      Learning Resources
                    </p>
                  </div>
                  <div className='space-y-3 sm:space-y-4'>
                    {currentQuestion.resources.map((resource, index) => {
                      const getIcon = () => {
                        switch (resource.type) {
                          case 'video':
                            return <Video className='w-5 h-5 sm:w-6 sm:h-6' />;
                          case 'course':
                            return <GraduationCap className='w-5 h-5 sm:w-6 sm:h-6' />;
                          case 'article':
                            return <FileText className='w-5 h-5 sm:w-6 sm:h-6' />;
                          default:
                            return <BookOpen className='w-5 h-5 sm:w-6 sm:h-6' />;
                        }
                      };

                      const getTypeColor = () => {
                        switch (resource.type) {
                          case 'video':
                            return 'from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700';
                          case 'course':
                            return 'from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700';
                          case 'article':
                            return 'from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700';
                          default:
                            return 'from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700';
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
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group block p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 transform hover:scale-[1.02] active:scale-[0.98]'
                        >
                          <div className='flex items-start space-x-4'>
                            <div className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${getTypeColor()} text-white shadow-md flex-shrink-0`}>
                              {getIcon()}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center space-x-2 mb-1'>
                                <span className='text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400'>
                                  {getTypeLabel()}
                                </span>
                                <ExternalLink className='w-3 h-3 sm:w-4 sm:h-4 text-purple-500 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                              </div>
                              <h4 className='text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
                                {resource.title}
                              </h4>
                              {resource.description && (
                                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2'>
                                  {resource.description}
                                </p>
                              )}
                              <div className='flex items-center space-x-3 text-xs sm:text-sm text-gray-500 dark:text-gray-500'>
                                {resource.duration && (
                                  <div className='flex items-center space-x-1'>
                                    <Clock className='w-3 h-3 sm:w-4 sm:h-4' />
                                    <span>{resource.duration}</span>
                                  </div>
                                )}
                                {resource.author && (
                                  <div className='flex items-center space-x-1'>
                                    <span className='text-gray-400 dark:text-gray-500'>by</span>
                                    <span className='font-medium'>{resource.author}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Next Question Button - Only show for non-code questions */}
              {currentQuestion.type !== 'code' && currentAnswer && (
                <div className='mt-6 sm:mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <button
                onClick={proceedToNext}
                    className='group inline-flex items-center space-x-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 active:scale-95'
              >
                <span>Next Question</span>
                    <ArrowRight className='w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300' />
              </button>
            </div>
              )}
            </>
          )}
        </div>

        {/* Navigation - Only show for non-code questions */}
        {!isCodeQuestion && (
          <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4 sm:mt-6'>
          <Link
            href={`/features/guided-learning/${planId}`}
              className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Plan</span>
          </Link>

          <Link
            href='/features/guided-learning'
              className='inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
          >
            <BookOpen className='w-4 h-4' />
            <span>View All Plans</span>
          </Link>
        </div>
        )}
      </div>
    </div>
  );
}

export default function GuidedPracticePage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center'>
          <div className='text-center'>
            <Loader2 className='w-8 h-8 animate-spin text-blue-600 mx-auto mb-4' />
            <p className='text-gray-600 dark:text-gray-400'>
              Loading practice session...
            </p>
          </div>
        </div>
      }
    >
      <GuidedPracticePageContent />
    </Suspense>
  );
}
