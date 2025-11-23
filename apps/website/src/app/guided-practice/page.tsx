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
} from 'lucide-react';
import { addFlashcard, isInFlashcards } from '../../lib/flashcards';
import { addToCart } from '../../lib/cart';
import { useNotifications } from '@/components/NotificationSystem';
import { useLearningType } from '../../context/LearningTypeContext';
import ProblemSolvingQuestion from '@/components/ProblemSolvingQuestion';
import CodeEditor from '@/components/CodeEditor';

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
  let processedText = cleanedText;

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

// Utility function to clean question titles (converts <code> tags to backticks)
const cleanQuestionTitle = (title: string): string => {
  if (!title || typeof title !== 'string') return title || '';
  
  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (!text) return '';
    const entityMap: Record<string, string> = {
      '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"',
      '&#39;': "'", '&#x27;': "'", '&#x2F;': '/', '&nbsp;': ' ',
      '&#160;': ' ', '&apos;': "'",
    };
    let decoded = text;
    for (const [entity, char] of Object.entries(entityMap)) {
      decoded = decoded.replace(new RegExp(entity, 'gi'), char);
    }
    decoded = decoded.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    if (typeof window !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = decoded;
        decoded = textarea.value;
      } catch (e) {}
    }
    return decoded;
  };
  
  let cleaned = decodeHtmlEntities(title);
  
  // Convert inline <code> tags to backticks
  cleaned = cleaned.replace(/<code[^>]*>([^<]+)<\/code>/gi, (_, codeContent) => {
    return `\`${decodeHtmlEntities(codeContent).trim()}\``;
  });
  
  // Remove any remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  
  // Clean up artifacts
  cleaned = cleaned
    .replace(/e>e>e>/g, '')
    .replace(/e>e>/g, '')
    .replace(/^e>+/g, '')
    .replace(/e>+$/g, '')
    .replace(/(\w+)e>/g, '$1')
    .replace(/e>(\w+)/g, '$1')
    .replace(/\s*e>\s*/g, ' ')
    .trim();
  
  return cleaned;
};

// Helper function to determine if content is valid code or should be rendered as text
// Uses a scoring system to make intelligent decisions
const isValidCode = (content: string): { isValid: boolean; score: number; reasons: string[] } => {
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return { isValid: false, score: 0, reasons: ['Empty or invalid content'] };
  }

  let score = 0;
  const reasons: string[] = [];
  const trimmed = content.trim();

  // ============================================
  // CODE INDICATORS (Positive Points)
  // ============================================
  
  // Strong code keywords (high weight)
  const strongKeywords = [
    /\b(class|function|const|let|var|import|export|return|async|await)\b/,
    /\b(if|else|for|while|switch|case|break|continue|try|catch|finally|throw)\b/,
    /\b(console\.(log|error|warn|info|debug|trace))\b/,
    /\b(setTimeout|setInterval|Promise|async|await)\b/,
    /\b(this\.|Math\.|Array\.|Object\.|String\.|Number\.)\b/,
    /\b(=>|=>|\.then\(|\.catch\(|\.finally\()/,
  ];
  
  strongKeywords.forEach((pattern) => {
    if (pattern.test(trimmed)) {
      score += 3;
      reasons.push(`Strong code keyword found`);
    }
  });

  // Code structure patterns (medium weight)
  const structurePatterns = [
    /\{\s*[\s\S]*\s*\}/, // Object/block with braces
    /\[\s*[\s\S]*\s*\]/, // Array brackets
    /\(\s*[\s\S]*\s*\)\s*\{/, // Function call with block
    /=\s*\{/, // Object assignment
    /=\s*\[/, // Array assignment
    /:\s*function/, // Method definition
    /:\s*\(/, // Arrow function
  ];
  
  structurePatterns.forEach(() => {
    score += 2;
    reasons.push('Code structure pattern found');
  });

  // Code operators and syntax (medium weight)
  const operatorPatterns = [
    /[=<>!]+/, // Assignment/comparison operators
    /[+\-*/%]/, // Arithmetic operators
    /&&|\|\||!/, // Logical operators
    /\.\w+\(/, // Method calls
    /\.\w+\s*=/, // Property assignment
    /;\s*$/, // Semicolon at end of line
  ];
  
  const operatorMatches = operatorPatterns.filter(p => p.test(trimmed)).length;
  if (operatorMatches > 0) {
    score += operatorMatches;
    reasons.push(`${operatorMatches} code operator(s) found`);
  }

  // Multiple lines with indentation (strong indicator)
  const lines = trimmed.split('\n');
  const hasMultipleLines = lines.length > 1;
  const hasIndentation = lines.some(line => /^\s{2,}/.test(line));
  const hasConsistentIndentation = lines.filter(line => line.trim().length > 0).length > 2 && 
                                   lines.filter(line => /^\s{2,}/.test(line)).length > 1;
  
  if (hasMultipleLines) {
    score += 2;
    reasons.push('Multiple lines detected');
  }
  if (hasIndentation) {
    score += 3;
    reasons.push('Indentation detected');
  }
  if (hasConsistentIndentation) {
    score += 2;
    reasons.push('Consistent indentation pattern');
  }

  // Code-specific patterns (high weight)
  if (/for\s*\(/.test(trimmed) || /while\s*\(/.test(trimmed) || /if\s*\(/.test(trimmed)) {
    score += 4;
    reasons.push('Control flow statement found');
  }
  
  if (/function\s+\w+/.test(trimmed) || /const\s+\w+\s*=\s*\(/.test(trimmed) || /let\s+\w+\s*=\s*\(/.test(trimmed)) {
    score += 4;
    reasons.push('Function definition found');
  }
  
  if (/class\s+\w+/.test(trimmed)) {
    score += 5;
    reasons.push('Class definition found');
  }

  // ============================================
  // TEXT INDICATORS (Negative Points)
  // ============================================
  
  // Common text patterns (reduce score)
  const textPatterns = [
    /^[A-Z][^.!?]*[.!?]\s*$/, // Sentence structure
    /\b(the|a|an|is|are|was|were|be|been|being)\b/i, // Common words
    /\b(explain|describe|what|when|where|why|how)\b/i, // Question words
    /[.!?]\s+[A-Z]/, // Multiple sentences
    /\b(should|would|could|might|may)\b/i, // Modal verbs
  ];
  
  const textMatches = textPatterns.filter(p => p.test(trimmed)).length;
  if (textMatches > 2) {
    score -= textMatches;
    reasons.push(`${textMatches} text pattern(s) found (reducing score)`);
  }

  // Very long sentences without code structure (likely text)
  const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
  const hasCodeStructure = (
    (trimmed.includes('{') && trimmed.includes('}')) ||
    (trimmed.includes('(') && trimmed.includes(')')) ||
    (trimmed.includes('[') && trimmed.includes(']')) ||
    /function|class|const|let|var/.test(trimmed)
  );
  
  if (avgLineLength > 80 && !hasCodeStructure) {
    score -= 2;
    reasons.push('Long lines without code structure (likely text)');
  }

  // High word-to-symbol ratio (likely text)
  const wordCount = trimmed.split(/\s+/).length;
  const symbolCount = (trimmed.match(/[{}();=<>[\]]/g) || []).length;
  if (wordCount > 0 && symbolCount / wordCount < 0.1 && wordCount > 10) {
    score -= 3;
    reasons.push('High word-to-symbol ratio (likely text)');
  }

  // ============================================
  // FINAL DECISION
  // ============================================
  
  // Minimum score threshold for code
  const MIN_CODE_SCORE = 5;
  const isValid = score >= MIN_CODE_SCORE;

  return {
    isValid,
    score,
    reasons,
  };
};

// Component to render question content with code blocks
const QuestionContent = ({ content }: { content: string }) => {
  if (!content) return null;

  // Step 0: IMMEDIATELY fix malformed HTML patterns before any processing
  // This must be the first thing we do
  let fixedContent = content;
  for (let i = 0; i < 3; i++) {
    fixedContent = fixedContent
      // Fix malformed opening tags
      .replace(/<pr<cod<cod/gi, '<pre><code>')
      .replace(/<pr<code<code/gi, '<pre><code>')
      .replace(/<pr<codee<code/gi, '<pre><code>')
      .replace(/<pr<codee<cod/gi, '<pre><code>')
      .replace(/<pr<code<cod/gi, '<pre><code>')
      .replace(/<pr<codee/gi, '<pre><code>')
      .replace(/<pr<code/gi, '<pre><code>')
      .replace(/<pr<cod/gi, '<pre><code>')
      .replace(/<pr<co/gi, '<pre><code>')
      .replace(/<pr</gi, '<pre>')
      // Fix malformed closing tags
      .replace(/<\/cod<\/cod<\/pr/gi, '</code></pre>')
      .replace(/<\/code<\/code<\/pr/gi, '</code></pre>')
      .replace(/<\/codee<\/codee<\/pree/gi, '</code></pre>')
      .replace(/<\/cod<\/cod<\/pree/gi, '</code></pre>')
      .replace(/<\/code<\/code<\/pree/gi, '</code></pre>')
      .replace(/<\/codee<\/pree/gi, '</code></pre>')
      .replace(/<\/cod<\/pree/gi, '</code></pre>')
      .replace(/<\/code<\/pree/gi, '</code></pre>')
      .replace(/<\/code><\/pre>e>/gi, '</code></pre>')
      .replace(/<\/code><\/pre>\s*e>/gi, '</code></pre>')
      .replace(/<\/pree/gi, '</pre>')
      .replace(/<\/codee/gi, '</code>')
      .replace(/<\/cod/gi, '</code>')
      // Fix efor -> for
      .replace(/efor\s*\(/gi, 'for (')
      .replace(/efor\s+/gi, 'for ')
      // Fix econsole -> console
      .replace(/econsole\./gi, 'console.')
      .replace(/econsole\.log/gi, 'console.log')
      // Fix patterns where code tags are merged with content
      .replace(/<cod([a-zA-Z])/gi, '<code>$1')
      .replace(/<code([a-zA-Z])/gi, '<code>$1')
      // Fix patterns where closing tags are merged
      .replace(/([a-zA-Z])<\/cod/gi, '$1</code>')
      .replace(/([a-zA-Z])<\/code/gi, '$1</code>');
  }

  // Parse content to extract code blocks and text
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  
  // Helper function to decode HTML entities (works in both server and client)
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
      '&#x60;': '`',
      '&#96;': '`',
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
    
    // If client-side, use DOM API as fallback for any remaining entities
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

  // Helper function to clean HTML and extract text
  const cleanHtml = (html: string): string => {
    // First decode HTML entities
    let cleaned = decodeHtmlEntities(html);
    // Remove all HTML tags
    cleaned = cleaned.replace(/<[^>]+>/g, '');
    // Clean up whitespace
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  };

  // Helper function to format and normalize code content
  // Intelligently adds indentation based on code structure (braces, blocks, etc.)
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
      
      formatted = lines.map((line, index) => {
        const trimmed = line.trim();
        
        // Skip empty lines
        if (trimmed.length === 0) return '';
        
        // Count braces/brackets to determine net change
        const openBraces = (trimmed.match(/{/g) || []).length;
        const closeBraces = (trimmed.match(/}/g) || []).length;
        const openBrackets = (trimmed.match(/\[/g) || []).length;
        const closeBrackets = (trimmed.match(/\]/g) || []).length;
        
        // Net change: positive = more opens, negative = more closes
        const netBraces = openBraces - closeBraces;
        const netBrackets = openBrackets - closeBrackets;
        
        // Decrease indent for closing braces/brackets at the start of line
        if (trimmed.match(/^[}\]\)]/)) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // Add indentation for current line
        const indent = '  '.repeat(indentLevel);
        const result = indent + trimmed;
        
        // Increase indent if line ends with opening brace/bracket
        // This means the next line should be indented
        if (trimmed.match(/[{\[\(]\s*$/)) {
          indentLevel++;
        }
        // Also increase if there are more opens than closes (unclosed braces/brackets)
        else if (netBraces > 0 || netBrackets > 0) {
          indentLevel += Math.max(netBraces, netBrackets);
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

  // Helper function to extract and format code from HTML code blocks (handles nested tags)
  // Updated to handle both cleaned database content and raw HTML
  const extractCodeFromHtml = (html: string): string => {
    if (!html) return '';
    
    let code = html;
    
    // Step 1: Check if content is already cleaned (starts with code, not HTML tags)
    // If it's already clean code, just normalize it
    if (!html.includes('<pre') && !html.includes('<code') && !html.includes('&lt;')) {
      // Already clean code - just normalize
      code = decodeHtmlEntities(html);
      code = formatCodeContent(code);
      return code;
    }
    
    // Step 2: Find the outermost <pre><code> or <code> block using proper tag matching
    // This handles nested tags correctly by finding the matching closing tag
    const findMatchingCloseTag = (html: string, openTag: string, closeTag: string, startIndex: number): number => {
      let depth = 0;
      let i = startIndex;
      
      while (i < html.length) {
        const openMatch = html.indexOf(openTag, i);
        const closeMatch = html.indexOf(closeTag, i);
        
        if (closeMatch === -1) return -1; // No closing tag found
        
        if (openMatch !== -1 && openMatch < closeMatch) {
          // Found an opening tag before the closing tag
          depth++;
          i = openMatch + openTag.length;
        } else {
          // Found a closing tag
          if (depth === 0) {
            return closeMatch; // This is the matching closing tag
          }
          depth--;
          i = closeMatch + closeTag.length;
        }
      }
      
      return -1; // No matching closing tag found
    };
    
    // Step 1: Fix malformed HTML patterns BEFORE trying to extract
    // Handle patterns like <pr<cod<cod, </cod</cod</pr, etc.
    let fixedHtml = html
      // Fix malformed opening tags
      .replace(/<pr<cod<cod/gi, '<pre><code>')
      .replace(/<pr<code<code/gi, '<pre><code>')
      .replace(/<pr<codee<code/gi, '<pre><code>')
      .replace(/<pr<codee<cod/gi, '<pre><code>')
      .replace(/<pr<code<cod/gi, '<pre><code>')
      .replace(/<pr<codee/gi, '<pre><code>')
      .replace(/<pr<code/gi, '<pre><code>')
      .replace(/<pr<cod/gi, '<pre><code>')
      .replace(/<pr<co/gi, '<pre><code>')
      .replace(/<pr</gi, '<pre>')
      // Fix malformed closing tags
      .replace(/<\/cod<\/cod<\/pr/gi, '</code></pre>')
      .replace(/<\/code<\/code<\/pr/gi, '</code></pre>')
      .replace(/<\/codee<\/codee<\/pree/gi, '</code></pre>')
      .replace(/<\/cod<\/cod<\/pree/gi, '</code></pre>')
      .replace(/<\/code<\/code<\/pree/gi, '</code></pre>')
      .replace(/<\/codee<\/pree/gi, '</code></pre>')
      .replace(/<\/cod<\/pree/gi, '</code></pre>')
      .replace(/<\/code<\/pree/gi, '</code></pre>')
      .replace(/<\/pree/gi, '</pre>')
      .replace(/<\/codee/gi, '</code>')
      .replace(/<\/cod/gi, '</code>')
      // Fix patterns where code tags are merged with content
      .replace(/<cod([a-zA-Z])/gi, '<code>$1')
      .replace(/<code([a-zA-Z])/gi, '<code>$1')
      // Fix patterns where closing tags are merged
      .replace(/([a-zA-Z])<\/cod/gi, '$1</code>')
      .replace(/([a-zA-Z])<\/code/gi, '$1</code>');

    // Try <pre><code> first (most common format from database)
    const preStart = fixedHtml.indexOf('<pre');
    if (preStart !== -1) {
      const codeStart = fixedHtml.indexOf('<code', preStart);
      if (codeStart !== -1) {
        const contentStart = fixedHtml.indexOf('>', codeStart) + 1;
        // Find the matching </code> tag (handles nested tags)
        const codeEnd = findMatchingCloseTag(fixedHtml, '<code', '</code>', codeStart + '<code'.length);
        if (codeEnd > contentStart) {
          code = fixedHtml.substring(contentStart, codeEnd);
        }
      }
    } else {
      // Try just <code>
      const codeStart = fixedHtml.indexOf('<code');
      if (codeStart !== -1) {
        const contentStart = fixedHtml.indexOf('>', codeStart) + 1;
        // Find the matching </code> tag (handles nested tags)
        const codeEnd = findMatchingCloseTag(fixedHtml, '<code', '</code>', codeStart + '<code'.length);
        if (codeEnd > contentStart) {
          code = fixedHtml.substring(contentStart, codeEnd);
        }
      }
    }
    
    // Step 3: Decode HTML entities FIRST (before removing tags)
    // This is critical because entities like &lt; and &gt; need to be decoded
    // before we remove tags, otherwise we might lose content
    code = decodeHtmlEntities(code);
    
    // Step 4: Recursively remove ALL HTML tags (including nested code tags)
    // IMPORTANT: We need to be careful not to remove content that looks like tags
    // Do this in a loop to handle deeply nested tags
    let previousCode = '';
    let iterations = 0;
    const maxIterations = 20;
    
    while (code !== previousCode && iterations < maxIterations) {
      previousCode = code;
      // Decode entities first in each iteration
      code = decodeHtmlEntities(code);
      // Then remove all HTML tags, but use a more precise pattern
      // Only match actual HTML tags: <tag>, </tag>, or <tag attr="value">
      // Does NOT match: i < 3 (because there's no tag name after <)
      // The pattern: < or </, followed by a letter (tag name), then optional attributes, then >
      code = code.replace(/<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/gi, '');
      iterations++;
    }
    
    // Step 5: Final entity decode pass to ensure everything is decoded
    code = decodeHtmlEntities(code);
    
    // Step 6: Clean up common HTML artifacts and malformed patterns
    // Fix console.log artifacts from HTML encoding issues
    // Multiple passes to catch all variations
    for (let pass = 0; pass < 3; pass++) {
      code = code
        // Remove e> artifacts FIRST (most aggressive - handles e>e>, e>e>e>, etc.)
        .replace(/e>e>e>/g, '') // Remove triple e>
        .replace(/e>e>/g, '') // Remove double e>
        .replace(/^e>+/g, '') // Remove e> at start (one or more)
        .replace(/e>+$/g, '') // Remove e> at end (one or more)
        .replace(/(\w+)e>/g, '$1') // Remove e> after words
        .replace(/e>(\w+)/g, '$1') // Remove e> before words
        .replace(/\s*e>\s*/g, ' ') // Remove standalone e> with spaces
        // Fix malformed console.log patterns (order matters - most specific first)
        .replace(/consoleonsole\.loge>\.log/g, 'console.log')
        .replace(/consoleonsole\.log/g, 'console.log')
        .replace(/console\.loge>\.log/g, 'console.log')
        .replace(/console\.loge>/g, 'console.log')
        .replace(/console\.log>/g, 'console.log')
        .replace(/console\.loge\.log/g, 'console.log')
        .replace(/console\.log\.log/g, 'console.log')
        .replace(/(\w+)onsole\.log/g, 'console.log')
        .replace(/console\.log([^a-zA-Z])/g, 'console.log$1')
        // Fix method name patterns (diameterameter, perimeterimeter, etc.)
        .replace(/diameterameter/g, 'diameter')
        .replace(/perimeterimeter/g, 'perimeter')
        .replace(/newColorwColor/g, 'newColor')
        .replace(/(\w+)ameter/g, '$1') // Fix patterns like "somethingameter"
        .replace(/(\w+)imeter/g, '$1') // Fix patterns like "somethingimeter"
        // Fix NaN patterns
        .replace(/NaNe>NaN/g, 'NaN')
        .replace(/NaNe>/g, 'NaN')
        .replace(/NaN>/g, 'NaN')
        // Fix any remaining entity issues (double-check after decoding)
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        // Fix common patterns where entities break code structure
        .replace(/(\w+)\s*&lt;\s*(\d+)\s*&gt;/g, '$1 < $2 >') // Fix "i &lt; 3 &gt;"
        .replace(/(\w+)\s*&lt;\s*(\d+)/g, '$1 < $2') // Fix "i &lt; 3"
        .replace(/(\d+)\s*&gt;/g, '$1 >') // Fix "3 &gt;"
        // Remove any remaining HTML-like artifacts (but be careful not to remove code)
        // Only remove if it looks like an actual HTML tag (starts with a letter after <)
        .replace(/<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/gi, '')
        // Remove standalone > characters that are clearly artifacts
        .replace(/^>\s*/g, '')
        .replace(/\s*>$/g, '')
        .replace(/\s+>\s+/g, ' ');
    }
    
    // Step 7: Final aggressive cleanup pass for any remaining artifacts
    for (let i = 0; i < 2; i++) {
      code = code
        // Remove any remaining e> artifacts
        .replace(/e>e>e>/g, '')
        .replace(/e>e>/g, '')
        .replace(/^e>+/g, '')
        .replace(/e>+$/g, '')
        .replace(/(\w+)e>/g, '$1')
        .replace(/e>(\w+)/g, '$1')
        .replace(/\s*e>\s*/g, ' ')
        // Remove malformed closing tags that might have leaked through
        .replace(/<\/cod<\/pr/gi, '')
        .replace(/<\/code<\/pr/gi, '')
        .replace(/<\/pr/gi, '')
        .replace(/<\/cod/gi, '')
        // Remove standalone > characters
        .replace(/^>\s*/g, '')
        .replace(/\s*>$/g, '')
        .replace(/\s+>\s+/g, ' ');
    }
    
    // Step 8: Normalize and format the code
    code = formatCodeContent(code);
    
    return code;
  };

  // First, replace ALL inline <code> tags (single words/short phrases) with backticks
  // This prevents them from being treated as code blocks
  // We'll do this by processing the content and replacing short <code> tags
  let processedContent = fixedContent;
  
  // Replace short inline <code> tags with backticks (not inside <pre>)
  // Pattern: <code>content</code> where content is 1-50 characters and not inside <pre>
  processedContent = processedContent.replace(/<code[^>]*>([^<]{1,50})<\/code>/gi, (match, codeContent, offset) => {
    // Check if this is inside a <pre> tag
    const beforeMatch = fixedContent.substring(0, offset);
    const lastPreOpen = beforeMatch.lastIndexOf('<pre');
    const lastPreClose = beforeMatch.lastIndexOf('</pre>');
    
    // If there's an open <pre> without a closing </pre> before this match, it's inside <pre>
    if (lastPreOpen > lastPreClose) {
      return match; // Keep as is, will be handled by code block extraction
    }
    
    // Replace with backtick format for inline code
    return `\`${codeContent.trim()}\``;
  });
  
  // Now parse HTML code blocks - also match malformed patterns
  // Match both proper <pre><code> blocks and malformed patterns like <pr<cod
  // Use a more flexible regex that catches malformed patterns
  const htmlCodeBlockRegex = /<pre[^>]*><code[^>]*>[\s\S]*?<\/code><\/pre>|<pr<cod[^>]*>[\s\S]*?<\/cod<\/pr|<pr<code[^>]*>[\s\S]*?<\/code<\/pr|<code[^>]*>[\s\S]{20,}?<\/code>/gi;
  let htmlMatches: Array<{ index: number; content: string; fullMatch: string }> = [];
  let htmlMatch;
  
  // Reset regex lastIndex
  htmlCodeBlockRegex.lastIndex = 0;
  
  // Use fixed content for matching to get correct indices
  while ((htmlMatch = htmlCodeBlockRegex.exec(fixedContent)) !== null) {
    // Fix the match if it's malformed before extracting
    let matchContent = htmlMatch[0];
    // Fix any remaining malformed patterns in the match
    matchContent = matchContent
      .replace(/<pr<cod/gi, '<pre><code>')
      .replace(/<pr<code/gi, '<pre><code>')
      .replace(/<\/cod<\/pr/gi, '</code></pre>')
      .replace(/<\/code<\/pr/gi, '</code></pre>');
    
    const extractedCode = extractCodeFromHtml(matchContent);
    if (extractedCode) {
      htmlMatches.push({
        index: htmlMatch.index,
        content: extractedCode,
        fullMatch: htmlMatch[0],
      });
    }
  }
  
  // Also try to match malformed patterns that might not have been caught
  // Look for patterns like <pr<cod...content... without proper closing
  const malformedPattern = /<pr<cod[^>]*>([\s\S]*?)(?:<\/cod<\/pr|$)/gi;
  let malformedMatch;
  malformedPattern.lastIndex = 0;
  
  while ((malformedMatch = malformedPattern.exec(fixedContent)) !== null) {
    // Check if this match was already captured by the previous regex
    const alreadyCaptured = htmlMatches.some(m => 
      Math.abs(m.index - malformedMatch.index) < 10
    );
    
    if (!alreadyCaptured && malformedMatch[1]) {
      // Extract code from malformed pattern
      let code = malformedMatch[1];
      // Clean up the code
      code = decodeHtmlEntities(code);
      code = code.replace(/<[^>]+>/g, '');
      // Clean malformed patterns
      for (let i = 0; i < 3; i++) {
        code = code
          .replace(/e>e>e>/g, '')
          .replace(/e>e>/g, '')
          .replace(/^e>+/g, '')
          .replace(/e>+$/g, '')
          .replace(/(\w+)e>/g, '$1')
          .replace(/consoleonsole\.log/g, 'console.log')
          .replace(/console\.loge>/g, 'console.log')
          .replace(/diameterameter/g, 'diameter')
          .replace(/perimeterimeter/g, 'perimeter')
          .replace(/newColorwColor/g, 'newColor')
          .replace(/NaNe>/g, 'NaN');
      }
      code = formatCodeContent(code);
      
      if (code.trim()) {
        htmlMatches.push({
          index: malformedMatch.index,
          content: code,
          fullMatch: malformedMatch[0],
        });
      }
    }
  }
  
  // Sort matches by index
  htmlMatches.sort((a, b) => a.index - b.index);

  // Then, try to parse markdown code blocks (```)
  const markdownCodeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let markdownMatches: Array<{ index: number; content: string; language?: string; fullMatch: string }> = [];
  let mdMatch;
  
  // Reset regex lastIndex
  markdownCodeBlockRegex.lastIndex = 0;
  
  while ((mdMatch = markdownCodeBlockRegex.exec(fixedContent)) !== null) {
    markdownMatches.push({
      index: mdMatch.index,
      content: mdMatch[2].trim(),
      language: mdMatch[1] || 'javascript',
      fullMatch: mdMatch[0],
    });
  }

  // Combine and sort all matches by index
  const allMatches = [
    ...htmlMatches.map(m => ({ ...m, type: 'html' as const, language: 'javascript' as string })),
    ...markdownMatches.map(m => ({ ...m, type: 'markdown' as const })),
  ].sort((a, b) => a.index - b.index);

  let lastIndex = 0;

  // Process all matches - use fixed content for indices, but process text with inline code conversion
  for (const match of allMatches) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = fixedContent.substring(lastIndex, match.index);
      if (textContent.trim()) {
        // Clean up HTML in text content
        let cleanText = decodeHtmlEntities(textContent);
        // Replace inline <code> tags with backticks (for short inline code)
        cleanText = cleanText.replace(/<code[^>]*>([^<]{1,30})<\/code>/gi, '`$1`');
        // Remove remaining HTML tags (including any malformed ones)
        cleanText = cleanText.replace(/<[^>]+>/g, '');
        // Aggressively remove any remaining malformed patterns
        for (let i = 0; i < 3; i++) {
          cleanText = cleanText
            // Remove malformed opening patterns
            .replace(/<pr<cod?/gi, '')
            .replace(/<pr</gi, '')
            .replace(/<pr/gi, '')
            // Remove malformed closing patterns
            .replace(/<\/cod?<\/pr/gi, '')
            .replace(/<\/cod?/gi, '')
            .replace(/<\/pr/gi, '')
            .replace(/<\/cod/gi, '')
            // Remove e> artifacts
            .replace(/e>e>e>/g, '')
            .replace(/e>e>/g, '')
            .replace(/^e>+/g, '')
            .replace(/e>+$/g, '')
            .replace(/(\w+)e>/g, '$1')
            .replace(/e>(\w+)/g, '$1')
            .replace(/\s*e>\s*/g, ' ')
            // Remove standalone > characters
            .replace(/^>\s*/g, '')
            .replace(/\s*>$/g, '')
            .replace(/\s+>\s+/g, ' ');
        }
        // Clean up whitespace but preserve line breaks
        cleanText = cleanText.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
        if (cleanText) {
          parts.push({ type: 'text', content: cleanText });
        }
      }
    }

    // Add code block - format and normalize
    if (match.content) {
      // Final cleanup pass on code content before formatting
      let cleanCode = match.content;
      for (let i = 0; i < 2; i++) {
        cleanCode = cleanCode
          // Remove any remaining e> artifacts
          .replace(/e>e>e>/g, '')
          .replace(/e>e>/g, '')
          .replace(/^e>+/g, '')
          .replace(/e>+$/g, '')
          .replace(/(\w+)e>/g, '$1')
          .replace(/e>(\w+)/g, '$1')
          .replace(/\s*e>\s*/g, ' ')
          // Remove malformed closing tags
          .replace(/<\/cod<\/pr/gi, '')
          .replace(/<\/code<\/pr/gi, '')
          .replace(/<\/pr/gi, '')
          .replace(/<\/cod/gi, '')
          // Remove standalone > characters
          .replace(/^>\s*/g, '')
          .replace(/\s*>$/g, '')
          .replace(/\s+>\s+/g, ' ');
      }
      const formattedCode = formatCodeContent(cleanCode);
      parts.push({ type: 'code', content: formattedCode, language: match.language || 'javascript' });
    }

    lastIndex = match.index + match.fullMatch.length;
  }

  // Add remaining text
  if (lastIndex < fixedContent.length) {
    const textContent = fixedContent.substring(lastIndex);
    if (textContent.trim()) {
      // Clean up HTML in remaining text
      let cleanText = decodeHtmlEntities(textContent);
      // Replace inline <code> tags with backticks (for short inline code)
      cleanText = cleanText.replace(/<code[^>]*>([^<]{1,30})<\/code>/gi, '`$1`');
      // Remove remaining HTML tags (including any malformed ones)
      cleanText = cleanText.replace(/<[^>]+>/g, '');
      // Aggressively remove any remaining malformed patterns
      for (let i = 0; i < 3; i++) {
        cleanText = cleanText
          // Remove malformed opening patterns
          .replace(/<pr<cod?/gi, '')
          .replace(/<pr</gi, '')
          .replace(/<pr/gi, '')
          // Remove malformed closing patterns
          .replace(/<\/cod?<\/pr/gi, '')
          .replace(/<\/cod?/gi, '')
          .replace(/<\/pr/gi, '')
          .replace(/<\/cod/gi, '')
          // Remove e> artifacts
          .replace(/e>e>e>/g, '')
          .replace(/e>e>/g, '')
          .replace(/^e>+/g, '')
          .replace(/e>+$/g, '')
          .replace(/(\w+)e>/g, '$1')
          .replace(/e>(\w+)/g, '$1')
          .replace(/\s*e>\s*/g, ' ')
          // Remove standalone > characters
          .replace(/^>\s*/g, '')
          .replace(/\s*>$/g, '')
          .replace(/\s+>\s+/g, ' ');
      }
      // Clean up whitespace but preserve line breaks
      cleanText = cleanText.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
      if (cleanText) {
        parts.push({ type: 'text', content: cleanText });
      }
    }
  }

  // If no code blocks found, check if the entire content is code
  if (parts.length === 0) {
    // Clean the content thoroughly before rendering
    let cleanContent = fixedContent;
    
    // Multiple passes for aggressive cleaning
    for (let i = 0; i < 3; i++) {
      cleanContent = cleanContent
        // Fix malformed patterns first
        .replace(/<pr<cod/gi, '')
        .replace(/<\/cod<\/pr/gi, '')
        .replace(/<pr</gi, '')
        .replace(/<\/cod/gi, '')
        .replace(/<\/pr/gi, '')
        .replace(/<pr/gi, '')
        // Remove all HTML tags
        .replace(/<[^>]+>/g, '')
        // Remove e> artifacts
        .replace(/e>e>e>/g, '')
        .replace(/e>e>/g, '')
        .replace(/^e>+/g, '')
        .replace(/e>+$/g, '')
        .replace(/(\w+)e>/g, '$1')
        .replace(/e>(\w+)/g, '$1')
        .replace(/\s*e>\s*/g, ' ')
        // Remove standalone > characters
        .replace(/^>\s*/g, '')
        .replace(/\s*>$/g, '')
        .replace(/\s+>\s+/g, ' ');
    }
    
    // Decode entities
    cleanContent = cleanContent
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
    
    // Use the intelligent code detection algorithm
    const codeValidation = isValidCode(cleanContent);
    
    // If it's valid code, render it as a code block
    if (codeValidation.isValid && cleanContent.length > 10) {
      const formattedCode = formatCodeContent(cleanContent);
      return (
        <div className='relative group' style={{ backgroundColor: '#111827' }}>
          {/* Code block header */}
          <div className='flex items-center justify-end px-4 py-2.5 rounded-t-xl border-b-2 shadow-sm' style={{ background: 'linear-gradient(to right, #1f2937, #111827)', borderColor: '#374151' }}>
            <span className='text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md' style={{ color: '#e5e7eb', backgroundColor: 'rgba(55, 65, 81, 0.5)' }}>
              javascript
            </span>
          </div>
          {/* Code block content - Always dark background for readability */}
          <div className='relative overflow-hidden rounded-b-xl border-x-2 border-b-2 shadow-lg' style={{ backgroundColor: '#111827', borderColor: '#374151' }}>
            <pre 
              className='overflow-x-auto relative z-10' 
              style={{ 
                backgroundColor: '#111827', 
                margin: 0, 
                padding: '1.5rem 1.75rem',
                color: '#f3f4f6',
                fontSize: '0.875rem',
                lineHeight: '1.8',
                fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", "Consolas", "Monaco", "Courier New", monospace',
                overflowX: 'auto',
                whiteSpace: 'pre',
                tabSize: 2,
                WebkitTabSize: 2,
                MozTabSize: 2,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                letterSpacing: '0.01em'
              }}
            >
              <code 
                style={{ 
                  color: '#f3f4f6', 
                  display: 'block', 
                  backgroundColor: 'transparent',
                  fontFamily: 'inherit',
                  whiteSpace: 'pre',
                  margin: 0,
                  padding: 0,
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  tabSize: 2,
                  WebkitTabSize: 2,
                  MozTabSize: 2,
                  wordBreak: 'normal',
                  overflowWrap: 'normal',
                  letterSpacing: '0.01em'
                }}
              >
                {formattedCode}
              </code>
            </pre>
            {/* Subtle gradient overlay for depth */}
            <div className='absolute inset-0 pointer-events-none rounded-b-xl z-0' style={{ background: 'linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.2))' }}></div>
          </div>
        </div>
      );
    }
    
    // Otherwise render as plain text
    return (
      <p 
        className='text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 sm:mb-5'
        style={{ 
          lineHeight: '1.75',
          wordSpacing: '0.05em',
          letterSpacing: '0.01em'
        }}
      >
        {cleanContent}
      </p>
    );
  }

  return (
    <div className='space-y-5 sm:space-y-6'>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <div key={index} className='relative group my-4 sm:my-6' style={{ backgroundColor: '#111827' }}>
              {/* Code block header */}
              <div className='flex items-center justify-end px-4 py-2.5 rounded-t-xl border-b-2 shadow-sm' style={{ background: 'linear-gradient(to right, #1f2937, #111827)', borderColor: '#374151' }}>
                <span className='text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md' style={{ color: '#e5e7eb', backgroundColor: 'rgba(55, 65, 81, 0.5)' }}>
                  {part.language || 'code'}
                </span>
              </div>
              {/* Code block content - Always dark background for readability */}
              <div className='relative overflow-hidden rounded-b-xl border-x-2 border-b-2 shadow-lg' style={{ backgroundColor: '#111827', borderColor: '#374151' }}>
                <pre 
                  className='overflow-x-auto relative z-10' 
                  style={{ 
                    backgroundColor: '#111827', 
                    margin: 0, 
                    padding: '1.5rem 1.75rem',
                    color: '#f3f4f6',
                    fontSize: '0.875rem',
                    lineHeight: '1.8',
                    fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", "Consolas", "Monaco", "Courier New", monospace',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    tabSize: 2,
                    WebkitTabSize: 2,
                    MozTabSize: 2,
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    letterSpacing: '0.01em'
                  }}
                >
                  <code 
                    style={{ 
                      color: '#f3f4f6', 
                      display: 'block', 
                      backgroundColor: 'transparent',
                      fontFamily: 'inherit',
                      whiteSpace: 'pre',
                      margin: 0,
                      padding: 0,
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      tabSize: 2,
                      WebkitTabSize: 2,
                      MozTabSize: 2,
                      wordBreak: 'normal',
                      overflowWrap: 'normal',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {part.content}
                  </code>
                </pre>
                {/* Subtle gradient overlay for depth - moved behind content */}
                <div className='absolute inset-0 pointer-events-none rounded-b-xl z-0' style={{ background: 'linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.2))' }}></div>
              </div>
            </div>
          );
        } else {
          // Process text to handle inline code (backticks)
          const textParts: Array<{ type: 'text' | 'code'; content: string }> = [];
          const inlineCodeRegex = /`([^`]+)`/g;
          let lastIndex = 0;
          let match;
          
          while ((match = inlineCodeRegex.exec(part.content)) !== null) {
            // Add text before inline code
            if (match.index > lastIndex) {
              const textBefore = part.content.substring(lastIndex, match.index);
              if (textBefore) {
                textParts.push({ type: 'text', content: textBefore });
              }
            }
            // Add inline code
            textParts.push({ type: 'code', content: match[1] });
            lastIndex = match.index + match[0].length;
          }
          
          // Add remaining text
          if (lastIndex < part.content.length) {
            const remainingText = part.content.substring(lastIndex);
            if (remainingText) {
              textParts.push({ type: 'text', content: remainingText });
            }
          }
          
          // If no inline code found, just use the original text
          if (textParts.length === 0) {
            textParts.push({ type: 'text', content: part.content });
          }
          
          return (
            <p
              key={index}
              className='text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 sm:mb-5'
              style={{ 
                lineHeight: '1.75',
                wordSpacing: '0.05em',
                letterSpacing: '0.01em'
              }}
            >
              {textParts.map((textPart, textIndex) => {
                if (textPart.type === 'code') {
                  return (
                    <code
                      key={textIndex}
                      className='px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded text-sm font-mono'
                    >
                      {textPart.content}
                    </code>
                  );
                }
                return <span key={textIndex}>{decodeHtmlEntities(textPart.content)}</span>;
              })}
            </p>
          );
        }
      })}
    </div>
  );
};

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

            // Check if this question is already completed and has options (for multiple choice) or is a code question
            const hasOptions = question.options &&
              Array.isArray(question.options) &&
              question.options.length > 0;
            const isCodeQuestion = question.type === 'code';
            
            if (
              !savedProgress.completedQuestions.includes(question.id) &&
              (hasOptions || isCodeQuestion)
            ) {
              console.log('✅ Resuming from saved position:', {
                cardTitle: card.title,
                categoryName: category.name,
                questionTitle: question.title?.substring(0, 50),
              });
              setCurrentQuestion(question);
              setCurrentQuestionIndex(currentPosition.questionIndex);
              setCurrentTopicIndex(currentPosition.topicIndex);
              setCurrentCategoryIndex(currentPosition.categoryIndex);
              setCurrentCardIndex(currentPosition.cardIndex);
              
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
    const completedCount = progress.completedQuestions.length;
    const correctCount = progress.correctAnswers.length;
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

  // Helper function to extract code from HTML for code editor preview
  const extractCodeForEditor = (html: string): string => {
    if (!html || typeof html !== 'string') return '';
    
    try {
      // First, fix malformed opening tags like <pr<cod -> <pre><code>
      // Handle case where <pr<cod is immediately followed by code (no space)
      // Pattern: <pr<codfor -> <pre><code>for
      // Also handle: <pr<codfor -> <pre><code>for (with word boundary)
      let fixedHtml = html
        .replace(/<pr<cod([a-zA-Z])/gi, '<pre><code>$1') // <pr<codfor -> <pre><code>for
        .replace(/<pr<cod([a-zA-Z])/gi, '<pre><code>$1') // Handle again for edge cases
        .replace(/<pr<cod\s/gi, '<pre><code>') // <pr<cod followed by space
        .replace(/<pr<cod/gi, '<pre><code>')
        .replace(/<pr<code/gi, '<pre><code>')
        .replace(/<pr<co/gi, '<pre><code>')
        .replace(/<pr</gi, '<pre>');
      
      // Fix malformed closing tags like </cod</pr -> </code></pre>
      fixedHtml = fixedHtml
        .replace(/<\/cod<\/pr/gi, '</code></pre>')
        .replace(/<\/code<\/pr/gi, '</code></pre>')
        .replace(/<\/cod<\/pre/gi, '</code></pre>')
        .replace(/<\/cod</gi, '</code>');
      
      console.log('🔍 Fixed HTML:', fixedHtml.substring(0, 200));
      
      // Try extracting from <pre><code> blocks first
      // Handle both proper closing tags and malformed ones like </cod</pr
      const preCodeRegex = /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i;
      const preCodeMatch = fixedHtml.match(preCodeRegex);
      if (preCodeMatch && preCodeMatch[1]) {
        let code = preCodeMatch[1];
        console.log('🔍 Raw code before processing:', {
          raw: code.substring(0, 200),
          hasLt: code.includes('<'),
          hasGt: code.includes('>'),
          hasLtEntity: code.includes('&lt;'),
          hasGtEntity: code.includes('&gt;')
        });
        
        // Decode HTML entities FIRST - this is critical!
        // If the content has &lt; and &gt;, decode them to < and >
        code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
        // Decode numeric entities
        code = code.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
        code = code.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        
        // CRITICAL: Don't remove < and > characters - they're part of the code!
        // The previous regex /<[^>]+>/g was removing code like "i < 3" because it matched "< 3"
        // We should NOT remove any HTML tags here because the code is already extracted from <pre><code>
        // If there are any remaining HTML tags, they're likely artifacts, but we need to be careful
        // Only remove obvious HTML tag patterns that couldn't be code
        // But preserve all < and > that are likely code operators or comparisons
        // Actually, since we're extracting from <pre><code>, there shouldn't be HTML tags in the code
        // So we can skip this step entirely or be very conservative
        // CRITICAL: Convert escaped newlines to actual newlines
        // The database stores \n as literal backslash + n, so we need to convert it
        // Handle \\\\n first (if double-escaped in the string)
        code = code.replace(/\\\\n/g, '\n');
        // Then handle \n (single backslash + n) - this is what's in the database
        code = code.replace(/\\n/g, '\n');
        // Handle HTML entity newlines
        code = code.replace(/&#10;/g, '\n');
        code = code.replace(/&#x0a;/gi, '\n');
        // Handle literal \r\n
        code = code.replace(/\\r\\n/g, '\n');
        code = code.replace(/\\r/g, '\n');
        
        // Remove any trailing closing tag artifacts
        code = code.replace(/<\/code><\/pre>.*$/i, '');
        code = code.replace(/<\/cod.*$/i, '');
        
        console.log('🔍 Extracted code from <pre><code>:', {
          length: code.length,
          preview: code.substring(0, 200),
          hasNewlines: code.includes('\n'),
          newlineCount: code.split('\n').length,
          rawPreview: preCodeMatch[1].substring(0, 100),
          lines: code.split('\n').slice(0, 10)
        });
        return code.trim();
      }
      
      // Also try to extract from <pre><code> with malformed closing tags like </cod</pr
      const preCodeMalformedRegex = /<pre[^>]*><code[^>]*>([\s\S]*?)<\/cod/i;
      const preCodeMalformedMatch = fixedHtml.match(preCodeMalformedRegex);
      if (preCodeMalformedMatch && preCodeMalformedMatch[1]) {
        let code = preCodeMalformedMatch[1];
        console.log('🔍 Raw extracted from malformed <pre><code>:', {
          rawLength: code.length,
          rawPreview: code.substring(0, 200),
          hasBackslashN: code.includes('\\n')
        });
        
        // Same cleaning as above
        code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
        code = code.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
        code = code.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        // CRITICAL: DO NOT use /<[^>]+>/g - it removes code like "i < 3"!
        // Only remove obvious HTML tags, preserve all < and > for code operators
        code = code.replace(/<\/?(?:div|span|p|br|hr|img|a|strong|em|b|i|u|h[1-6]|ul|ol|li|table|tr|td|th|thead|tbody|tfoot)[^>]*>/gi, '');
        
        // CRITICAL: Convert escaped newlines to actual newlines
        // Handle \\n (double backslash + n) first
        code = code.replace(/\\\\n/g, '\n');
        // Handle \n (single backslash + n)
        code = code.replace(/\\n/g, '\n');
        code = code.replace(/&#10;/g, '\n');
        code = code.replace(/&#x0a;/gi, '\n');
        code = code.replace(/\\r\\n/g, '\n');
        code = code.replace(/\\r/g, '\n');
        
        // Remove any trailing closing tag artifacts
        code = code.replace(/<\/cod.*$/i, '');
        
        console.log('🔍 Processed code from malformed <pre><code>:', {
          length: code.length,
          preview: code.substring(0, 200),
          hasNewlines: code.includes('\n'),
          newlineCount: code.split('\n').length,
          lines: code.split('\n').slice(0, 10)
        });
        return code.trim();
      }
      
      // Try extracting from markdown code blocks (handle both ```javascript and ```)
      // Use matchAll to find all code blocks and get the largest one
      const markdownCodeRegex = /```(?:javascript|js|typescript|ts|python|py|java)?\s*\n?([\s\S]*?)```/gi;
      const markdownMatches = Array.from(fixedHtml.matchAll(markdownCodeRegex));
      if (markdownMatches && markdownMatches.length > 0) {
        // Find the largest code block (most likely the main code)
        let largestCode = '';
        for (const match of markdownMatches) {
          if (match[1] && match[1].length > largestCode.length) {
            largestCode = match[1];
          }
        }
        if (largestCode) {
          let code = largestCode;
          // Decode HTML entities first
          code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
          code = code.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
          code = code.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
          // Remove any HTML tags
          code = code.replace(/<[^>]+>/g, '');
          // Fix escaped newlines
          code = code.replace(/\\n/g, '\n');
          code = code.replace(/\\\\n/g, '\n');
          code = code.replace(/&#10;/g, '\n');
          code = code.replace(/&#x0a;/gi, '\n');
          console.log('🔍 Extracted code from markdown:', {
            length: code.length,
            preview: code.substring(0, 150),
            hasNewlines: code.includes('\n'),
            blockCount: markdownMatches.length
          });
          return code.trim();
        }
      }
      
      // Try extracting from <code> blocks
      const codeRegex = /<code[^>]*>([\s\S]*?)<\/code>/i;
      const codeMatch = fixedHtml.match(codeRegex);
      if (codeMatch && codeMatch[1]) {
        let code = codeMatch[1];
        // Decode HTML entities
        code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
        code = code.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
        code = code.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        code = code.replace(/<[^>]+>/g, '');
        // Fix escaped newlines
        code = code.replace(/\\n/g, '\n');
        code = code.replace(/\\\\n/g, '\n');
        console.log('🔍 Extracted code from <code>:', code.substring(0, 100));
        return code.trim();
      }
    } catch (error) {
      console.error('Error extracting code:', error);
      return '';
    }
    
    // If no code tags found, check if the entire content or a large portion is code-like
    // Use fixedHtml if it was created, otherwise use original html
    const htmlToProcess = typeof fixedHtml !== 'undefined' ? fixedHtml : html;
    
    // Also try to extract from content that has markdown code blocks mixed with text
    // Look for markdown code blocks even if they're not at the start
    const allMarkdownBlocks = htmlToProcess.match(/```[\s\S]*?```/gi);
    if (allMarkdownBlocks && allMarkdownBlocks.length > 0) {
      // Get the largest code block
      let largestBlock = '';
      for (const block of allMarkdownBlocks) {
        const codeMatch = block.match(/```(?:javascript|js|typescript|ts|python|py|java)?\s*\n?([\s\S]*?)```/i);
        if (codeMatch && codeMatch[1] && codeMatch[1].length > largestBlock.length) {
          largestBlock = codeMatch[1];
        }
      }
      if (largestBlock) {
        let code = largestBlock;
        // Decode and clean
        code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        code = code.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
        code = code.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        code = code.replace(/<[^>]+>/g, '');
        code = code.replace(/\\n/g, '\n');
        code = code.replace(/\\\\n/g, '\n');
        console.log('🔍 Extracted code from markdown block in content:', {
          length: code.length,
          preview: code.substring(0, 150)
        });
        if (code.trim().length > 10) {
          return code.trim();
        }
      }
    }
    
    // Remove HTML tags first to get plain text
    let plainText = htmlToProcess.replace(/<[^>]+>/g, ' ');
    // Decode HTML entities
    plainText = plainText.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
    plainText = plainText.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    plainText = plainText.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    // Fix escaped newlines
    plainText = plainText.replace(/\\n/g, '\n');
    plainText = plainText.replace(/\\\\n/g, '\n');
    plainText = plainText.trim();
    
    // Check if plain text looks like code (has code patterns and multiple lines)
    const codePatterns = [
      /console\.log/,
      /setTimeout/,
      /setInterval/,
      /for\s*\(/,
      /while\s*\(/,
      /if\s*\(/,
      /this\.\w+/,
      /Math\.\w+/,
      /\w+\(\)/,
      /return\s+/,
      /const\s+\w+\s*=/,
      /let\s+\w+\s*=/,
      /var\s+\w+\s*=/,
      /function\s+\w+/,
      /class\s+\w+/,
      /\{\s*[\s\S]*\s*\}/,
      /\[\s*[\s\S]*\s*\]/,
    ];
    
    const hasCodePattern = codePatterns.some(pattern => pattern.test(plainText));
    const hasMultipleLines = plainText.split('\n').length > 1;
    const hasCodeStructure = (plainText.includes('{') && plainText.includes('}')) || 
                            (plainText.includes('(') && plainText.includes(')')) ||
                            (plainText.includes('[') && plainText.includes(']'));
    
    // If it looks like code, return it (lowered threshold to catch shorter code blocks)
    if (hasCodePattern && (hasMultipleLines || hasCodeStructure) && plainText.length > 10) {
      return plainText;
    }
    
    return '';
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
                topic_description: currentTopic?.description,
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

                <h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight'>
                  <QuestionContent content={cleanQuestionTitle(currentQuestion.title)} />
                </h2>

                {/* Check if content has significant code - if so, show in editor instead of QuestionContent */}
                {currentQuestion?.content ? (() => {
                  // Extract code from content (this function tries multiple methods)
                  let extractedCode = '';
                  try {
                    if (currentQuestion.content) {
                      extractedCode = extractCodeForEditor(currentQuestion.content);
                      console.log('🔍 Code extraction result:', {
                        hasCode: !!extractedCode,
                        codeLength: extractedCode.length,
                        preview: extractedCode.substring(0, 100),
                        fullContent: currentQuestion.content.substring(0, 200)
                      });
                    }
                  } catch (error) {
                    console.error('Error extracting code for editor:', error);
                    extractedCode = '';
                  }
                  
                  // Use the intelligent code detection algorithm
                  const codeValidation = isValidCode(extractedCode);
                  
                  console.log('🔍 Code validation result:', {
                    isValid: codeValidation.isValid,
                    score: codeValidation.score,
                    reasons: codeValidation.reasons,
                    extractedCodeLength: extractedCode.length,
                    extractedCodePreview: extractedCode.substring(0, 150),
                  });
                  
                  // Decision: Show editor if code is valid AND has minimum length
                  const shouldShowEditor = codeValidation.isValid && extractedCode.length > 10;
                  
                  console.log('🔍 Final decision - shouldShowEditor:', {
                    shouldShowEditor,
                    isValid: codeValidation.isValid,
                    score: codeValidation.score,
                    extractedCodeLength: extractedCode.length,
                    extractedCodePreview: extractedCode.substring(0, 100),
                    reasons: codeValidation.reasons
                  });
                  
                  if (shouldShowEditor) {
                    // Detect language from code
                    let detectedLanguage = 'javascript';
                    if (extractedCode.includes('class ') && (extractedCode.includes('constructor') || extractedCode.includes('static '))) {
                      detectedLanguage = 'javascript';
                    } else if (extractedCode.includes('def ') || (extractedCode.includes('import ') && extractedCode.includes('print'))) {
                      detectedLanguage = 'python';
                    } else if (extractedCode.includes('public class') || extractedCode.includes('public static')) {
                      detectedLanguage = 'java';
                    } else if (extractedCode.includes('interface ') || extractedCode.includes('type ') || extractedCode.includes(': string')) {
                      detectedLanguage = 'typescript';
                    }
                    
                    // Show ONLY the code editor when code is detected
                    return (
                      <div className='mb-6 sm:mb-8'>
                        <div className='my-4 sm:my-6'>
                          <CodeEditor
                            code={extractedCode}
                            language={detectedLanguage}
                            readOnly={true}
                            height='400px'
                            theme='vs-dark'
                            hideActionButtons={true}
                          />
                        </div>
                      </div>
                    );
                  } else {
                    // No significant code, show content normally
                    return (
                      <div className='prose dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg'>
                        <QuestionContent content={currentQuestion.content} />
                      </div>
                    );
                  }
                })() : null}
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
