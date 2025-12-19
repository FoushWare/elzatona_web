"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  BookOpen,
  Loader2,
  Target,
  TrendingUp,
  Clock,
  Star,
  BookmarkPlus,
  BookmarkCheck,
  Trophy,
  BarChart3,
} from "lucide-react";
import { useUserType, useAuth } from "@elzatona/contexts";
import { QuestionContent as SharedQuestionContent } from "@elzatona/components";
import { addFlashcard, isInFlashcards, FlashcardItem } from "@/lib/flashcards";

interface Question {
  id: string;
  question: string;
  content?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  topicId?: string;
  categoryId?: string;
}

interface DatabaseQuestion {
  id: string;
  question?: string; // Transformed from question_text
  question_text?: string; // Raw database field
  content?: string; // Question content/body
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any; // Already parsed JSON or string
  correct_answer?: string | number;
  correctAnswer?: number; // Transformed field
  answer?: string | number; // Alternative transformed field
  explanation?: string;
  difficulty: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any; // Already parsed JSON or string
  topic_id?: string;
  topicId?: string; // Transformed field
  category_id?: string;
  categoryId?: string; // Transformed field
  question_type?: string;
  type?: string; // Transformed field
}

interface FilterOptions {
  sections: string[];
  difficulties: string[];
  tags: string[];
  categories: string[];
  topics: string[];
}

// Helper function to format text with code detection
const formatTextWithCode = (text: string) => {
  if (!text) return text;

  // Check if the entire text is code (starts with {, [, `, or common code patterns)
  const trimmedText = text.trim();
  const isEntirelyCode =
    /^[`{\[].*[`}\]]$|^(undefined|ReferenceError|TypeError|SyntaxError|true|false|null)$/i.test(
      trimmedText,
    );

  if (isEntirelyCode) {
    return (
      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-sm font-mono inline-block">
        {text}
      </code>
    );
  }

  // Detect code patterns: objects {}, arrays [], backticks, code-like syntax, or emoji objects
  // Pattern matches: backticks, objects with properties, arrays, JS keywords, function calls, emoji objects
  const codePattern =
    /(`[^`]+`|{[^}]+}|\[[^\]]+\]|const\s+\w+|let\s+\w+|var\s+\w+|function\s*\w*|=>|\.\w+\(\)|undefined|ReferenceError|TypeError|SyntaxError)/g;

  // Check if text contains code patterns
  const hasCode = codePattern.test(text);

  if (!hasCode) {
    return <span>{text}</span>;
  }

  // Split text into parts and format code sections
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  // Reset regex
  codePattern.lastIndex = 0;

  while ((match = codePattern.exec(text)) !== null) {
    // Add text before code
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(textBefore);
      }
    }

    // Add formatted code
    parts.push(
      <code
        key={`code-${keyCounter++}`}
        className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-sm font-mono"
      >
        {match[0]}
      </code>,
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(remainingText);
    }
  }

  return <span>{parts}</span>;
};

// Helper function to validate if content is code
function isValidCode(content: string): {
  isValid: boolean;
  score: number;
  reasons: string[];
} {
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return { isValid: false, score: 0, reasons: ["Empty or invalid content"] };
  }

  let score = 0;
  const reasons: string[] = [];
  const trimmed = content.trim();

  // CODE INDICATORS (Positive Points)
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

  const structurePatterns = [
    /\{\s*[\s\S]*\s*\}/,
    /\[\s*[\s\S]*\s*\]/,
    /\(\s*[\s\S]*\s*\)\s*\{/,
    /=\s*\{/,
    /=\s*\[/,
    /:\s*function/,
    /:\s*\(/,
  ];

  structurePatterns.forEach(() => {
    score += 2;
    reasons.push("Code structure pattern found");
  });

  const operatorPatterns = [
    /[=<>!]+/,
    /[+\-*/%]/,
    /&&|\|\||!/,
    /\.\w+\(/,
    /\.\w+\s*=/,
    /;\s*$/,
  ];

  const operatorMatches = operatorPatterns.filter((p) =>
    p.test(trimmed),
  ).length;
  if (operatorMatches > 0) {
    score += operatorMatches;
    reasons.push(`${operatorMatches} code operator(s) found`);
  }

  const lines = trimmed.split("\n");
  const hasMultipleLines = lines.length > 1;
  const hasIndentation = lines.some((line) => /^\s{2,}/.test(line));
  const hasConsistentIndentation =
    lines.filter((line) => line.trim().length > 0).length > 2 &&
    lines.filter((line) => /^\s{2,}/.test(line)).length > 1;

  if (hasMultipleLines) {
    score += 2;
    reasons.push("Multiple lines detected");
  }
  if (hasIndentation) {
    score += 3;
    reasons.push("Indentation detected");
  }
  if (hasConsistentIndentation) {
    score += 2;
    reasons.push("Consistent indentation pattern");
  }

  if (
    /for\s*\(/.test(trimmed) ||
    /while\s*\(/.test(trimmed) ||
    /if\s*\(/.test(trimmed)
  ) {
    score += 4;
    reasons.push("Control flow statement found");
  }

  if (
    /function\s+\w+/.test(trimmed) ||
    /const\s+\w+\s*=\s*\(/.test(trimmed) ||
    /let\s+\w+\s*=\s*\(/.test(trimmed)
  ) {
    score += 4;
    reasons.push("Function definition found");
  }

  if (/class\s+\w+/.test(trimmed)) {
    score += 5;
    reasons.push("Class definition found");
  }

  // TEXT INDICATORS (Negative Points)
  const textPatterns = [
    /^[A-Z][^.!?]*[.!?]\s*$/,
    /\b(the|a|an|is|are|was|were|be|been|being)\b/i,
    /\b(explain|describe|what|when|where|why|how|requires|enables|creates|scales)\b/i,
    /[.!?]\s+[A-Z]/,
    /\b(should|would|could|might|may)\b/i,
    /\b(requires|enables|allows|provides|offers|supports)\b/i,
    /\b(typography|responsive|viewport|fluid|sizing|scaling|purpose)\b/i,
  ];

  const textMatches = textPatterns.filter((p) => p.test(trimmed)).length;
  if (textMatches > 2) {
    score -= textMatches * 2;
    reasons.push(`${textMatches} text pattern(s) found (reducing score)`);
  }

  const strongTextIndicators = [
    /\b(explain|describe|what|how|why|when|where)\b/i,
    /\b(requires|enables|allows|provides|offers|supports|creates)\b/i,
    /\b(typography|responsive|viewport|fluid|sizing|scaling|purpose)\b/i,
  ];

  const strongTextMatches = strongTextIndicators.filter((p) =>
    p.test(trimmed),
  ).length;
  if (strongTextMatches >= 2) {
    score -= 5;
    reasons.push(
      `${strongTextMatches} strong text indicators found (heavy penalty)`,
    );
  }

  const avgLineLength =
    lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
  const hasCodeStructure =
    (trimmed.includes("{") && trimmed.includes("}")) ||
    (trimmed.includes("(") && trimmed.includes(")")) ||
    (trimmed.includes("[") && trimmed.includes("]")) ||
    /function|class|const|let|var/.test(trimmed);

  if (avgLineLength > 80 && !hasCodeStructure) {
    score -= 2;
    reasons.push("Long lines without code structure (likely text)");
  }

  const wordCount = trimmed.split(/\s+/).length;
  const symbolCount = (trimmed.match(/[{}();=<>[\]]/g) || []).length;
  if (wordCount > 0 && symbolCount / wordCount < 0.1 && wordCount > 10) {
    score -= 3;
    reasons.push("High word-to-symbol ratio (likely text)");
  }

  const MIN_CODE_SCORE = 5;
  const isValid = score >= MIN_CODE_SCORE;

  return {
    isValid,
    score,
    reasons,
  };
}

// Helper function to format and normalize code content
const formatCodeContent = (code: string): string => {
  if (!code) return "";

  let formatted = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  formatted = formatted.trim();
  const lines = formatted.split("\n").map((line) => line.trimEnd());

  if (lines.length === 0) return "";

  const hasExistingIndent = lines.some(
    (line) => line.trim().length > 0 && /^\s/.test(line),
  );

  if (!hasExistingIndent) {
    let indentLevel = 0;
    let inClass = false;
    let inMethod = false;

    formatted = lines
      .map((line, index) => {
        const trimmed = line.trim();
        if (trimmed.length === 0) return "";

        if (/^(class|interface|type)\s+\w+/.test(trimmed)) {
          inClass = true;
          const indent = "  ".repeat(indentLevel);
          if (trimmed.match(/[{\[\(]\s*$/)) {
            indentLevel++;
          } else {
            indentLevel++;
          }
          return indent + trimmed;
        }

        if (
          inClass &&
          (/^(static\s+)?\w+\s*\(/.test(trimmed) ||
            /^constructor\s*\(/.test(trimmed) ||
            /^get\s+\w+\s*\(/.test(trimmed) ||
            /^set\s+\w+\s*\(/.test(trimmed))
        ) {
          inMethod = true;
          const indent = "  ".repeat(indentLevel);
          if (trimmed.match(/[{\[\(]\s*$/)) {
            indentLevel++;
          } else {
            indentLevel++;
          }
          return indent + trimmed;
        }

        const openBraces = (trimmed.match(/{/g) || []).length;
        const closeBraces = (trimmed.match(/}/g) || []).length;
        const openBrackets = (trimmed.match(/\[/g) || []).length;
        const closeBrackets = (trimmed.match(/\]/g) || []).length;
        const openParens = (trimmed.match(/\(/g) || []).length;
        const closeParens = (trimmed.match(/\)/g) || []).length;

        const netBraces = openBraces - closeBraces;
        const netBrackets = openBrackets - closeBrackets;
        const netParens = openParens - closeParens;

        if (trimmed.match(/^[}\]\)]/)) {
          indentLevel = Math.max(0, indentLevel - 1);
          if (closeBraces > 0) {
            const nextNonEmptyLine = lines
              .slice(index + 1)
              .find((l) => l.trim().length > 0);
            if (
              !nextNonEmptyLine ||
              /^(class|interface|type|const|let|var|function|export)/.test(
                nextNonEmptyLine.trim(),
              )
            ) {
              inClass = false;
              inMethod = false;
            } else if (inMethod) {
              inMethod = false;
            }
          }
        }

        const indent = "  ".repeat(indentLevel);
        const result = indent + trimmed;

        if (trimmed.match(/[{\[\(]\s*$/)) {
          indentLevel++;
        } else if (netBraces > 0 || netBrackets > 0 || netParens > 0) {
          indentLevel += Math.max(netBraces, netBrackets, netParens);
        }

        return result;
      })
      .join("\n");
  } else {
    const indentations = lines
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
      });

    if (indentations.length > 0) {
      const minIndent = Math.min(...indentations);

      formatted = lines
        .map((line) => {
          if (line.trim().length === 0) return "";

          const leadingWhitespace = line.match(/^(\s*)/)?.[1] || "";
          const indentCount = leadingWhitespace
            .split("")
            .reduce((count, char) => count + (char === "\t" ? 2 : 1), 0);

          const relativeIndent = Math.max(0, indentCount - minIndent);
          const normalizedIndent = "  ".repeat(
            Math.floor(relativeIndent / 2) + (relativeIndent % 2),
          );
          const content = line.trimStart();

          return normalizedIndent + content;
        })
        .join("\n");
    }
  }

  formatted = formatted.replace(/\n{3,}/g, "\n\n");

  return formatted;
};

// Component to render question content with code blocks (same as guided-practice)
const QuestionContent = ({ content }: { content: string }) => {
  if (!content) return null;

  // Fix malformed HTML patterns
  let fixedContent = content;
  for (let i = 0; i < 3; i++) {
    fixedContent = fixedContent
      .replace(/<pr<cod<cod/gi, "<pre><code>")
      .replace(/<pr<code<code/gi, "<pre><code>")
      .replace(/<pr<codee<code/gi, "<pre><code>")
      .replace(/<pr<codee<cod/gi, "<pre><code>")
      .replace(/<pr<code<cod/gi, "<pre><code>")
      .replace(/<pr<codee/gi, "<pre><code>")
      .replace(/<pr<code/gi, "<pre><code>")
      .replace(/<pr<cod/gi, "<pre><code>")
      .replace(/<pr<co/gi, "<pre><code>")
      .replace(/<pr</gi, "<pre>")
      .replace(/<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/codee<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/code><\/pre>e>/gi, "</code></pre>")
      .replace(/<\/code><\/pre>\s*e>/gi, "</code></pre>")
      .replace(/<\/pree/gi, "</pre>")
      .replace(/<\/codee/gi, "</code>")
      .replace(/<\/cod/gi, "</code>")
      .replace(/efor\s*\(/gi, "for (")
      .replace(/efor\s+/gi, "for ")
      .replace(/econsole\./gi, "console.")
      .replace(/econsole\.log/gi, "console.log")
      .replace(/<cod([a-zA-Z])/gi, "<code>$1")
      .replace(/<code([a-zA-Z])/gi, "<code>$1")
      .replace(/([a-zA-Z])<\/cod/gi, "$1</code>")
      .replace(/([a-zA-Z])<\/code/gi, "$1</code>")
      .replace(/<cod(\d+[a-zA-Z]+)/gi, "<code>$1</code>")
      .replace(/<cod(\d+)/gi, "<code>$1</code>");
  }

  const parts: Array<{
    type: "text" | "code";
    content: string;
    language?: string;
  }> = [];

  const decodeHtmlEntities = (text: string): string => {
    if (!text) return "";

    const entityMap: Record<string, string> = {
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
      "&quot;": '"',
      "&#39;": "'",
      "&#x27;": "'",
      "&#x2F;": "/",
      "&nbsp;": " ",
      "&#160;": " ",
      "&apos;": "'",
      "&#x60;": "`",
      "&#96;": "`",
    };

    let decoded = text;
    for (const [entity, char] of Object.entries(entityMap)) {
      decoded = decoded.replace(new RegExp(entity, "gi"), char);
    }

    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });

    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });

    if (typeof window !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = decoded;
        decoded = textarea.value;
      } catch (_e) {
        // Fallback
      }
    }

    return decoded;
  };

  const extractCodeFromHtml = (html: string): string => {
    if (!html) return "";

    let code = html;

    if (
      !html.includes("<pre") &&
      !html.includes("<code") &&
      !html.includes("&lt;")
    ) {
      code = decodeHtmlEntities(html);
      code = formatCodeContent(code);
      return code;
    }

    const fixedHtml = html
      .replace(/<pr<cod<cod/gi, "<pre><code>")
      .replace(/<pr<code<code/gi, "<pre><code>")
      .replace(/<pr<codee<code/gi, "<pre><code>")
      .replace(/<pr<codee<cod/gi, "<pre><code>")
      .replace(/<pr<code<cod/gi, "<pre><code>")
      .replace(/<pr<codee/gi, "<pre><code>")
      .replace(/<pr<code/gi, "<pre><code>")
      .replace(/<pr<cod/gi, "<pre><code>")
      .replace(/<pr<co/gi, "<pre><code>")
      .replace(/<pr</gi, "<pre>")
      .replace(/<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pr/gi, "</code></pre>")
      .replace(/<\/codee<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/codee<\/pree/gi, "</code></pre>")
      .replace(/<\/cod<\/pree/gi, "</code></pre>")
      .replace(/<\/code<\/pree/gi, "</code></pre>")
      .replace(/<\/pree/gi, "</pre>")
      .replace(/<\/codee/gi, "</code>")
      .replace(/<\/cod/gi, "</code>")
      .replace(/<cod([a-zA-Z])/gi, "<code>$1")
      .replace(/<code([a-zA-Z])/gi, "<code>$1")
      .replace(/([a-zA-Z])<\/cod/gi, "$1</code>")
      .replace(/([a-zA-Z])<\/code/gi, "$1</code>")
      .replace(/<cod(\d+[a-zA-Z]+)/gi, "<code>$1</code>")
      .replace(/<cod(\d+)/gi, "<code>$1</code>");

    const findMatchingCloseTag = (
      html: string,
      openTag: string,
      closeTag: string,
      startIndex: number,
    ): number => {
      let depth = 0;
      let i = startIndex;

      while (i < html.length) {
        const openMatch = html.indexOf(openTag, i);
        const closeMatch = html.indexOf(closeTag, i);

        if (closeMatch === -1) return -1;

        if (openMatch !== -1 && openMatch < closeMatch) {
          depth++;
          i = openMatch + openTag.length;
        } else {
          if (depth === 0) {
            return closeMatch;
          }
          depth--;
          i = closeMatch + closeTag.length;
        }
      }

      return -1;
    };

    const preStart = fixedHtml.indexOf("<pre");
    if (preStart !== -1) {
      const codeStart = fixedHtml.indexOf("<code", preStart);
      if (codeStart !== -1) {
        const contentStart = fixedHtml.indexOf(">", codeStart) + 1;
        const codeEnd = findMatchingCloseTag(
          fixedHtml,
          "<code",
          "</code>",
          codeStart + "<code".length,
        );
        if (codeEnd > contentStart) {
          code = fixedHtml.substring(contentStart, codeEnd);
        }
      }
    } else {
      const codeStart = fixedHtml.indexOf("<code");
      if (codeStart !== -1) {
        const contentStart = fixedHtml.indexOf(">", codeStart) + 1;
        const codeEnd = findMatchingCloseTag(
          fixedHtml,
          "<code",
          "</code>",
          codeStart + "<code".length,
        );
        if (codeEnd > contentStart) {
          code = fixedHtml.substring(contentStart, codeEnd);
        }
      }
    }

    code = decodeHtmlEntities(code);

    let previousCode = "";
    let iterations = 0;
    const maxIterations = 20;

    while (code !== previousCode && iterations < maxIterations) {
      previousCode = code;
      code = decodeHtmlEntities(code);
      code = code.replace(/<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/gi, "");
      iterations++;
    }

    code = decodeHtmlEntities(code);

    for (let pass = 0; pass < 3; pass++) {
      code = code
        .replace(/e>e>e>/g, "")
        .replace(/e>e>/g, "")
        .replace(/^e>+/g, "")
        .replace(/e>+$/g, "")
        .replace(/(\w+)e>/g, "$1")
        .replace(/e>(\w+)/g, "$1")
        .replace(/\s*e>\s*/g, " ")
        .replace(/consoleonsole\.loge>\.log/g, "console.log")
        .replace(/consoleonsole\.log/g, "console.log")
        .replace(/console\.loge>\.log/g, "console.log")
        .replace(/console\.loge>/g, "console.log")
        .replace(/console\.log>/g, "console.log")
        .replace(/console\.loge\.log/g, "console.log")
        .replace(/console\.log\.log/g, "console.log")
        .replace(/(\w+)onsole\.log/g, "console.log")
        .replace(/console\.log([^a-zA-Z])/g, "console.log$1")
        .replace(/diameterameter/g, "diameter")
        .replace(/perimeterimeter/g, "perimeter")
        .replace(/newColorwColor/g, "newColor")
        .replace(/(\w+)ameter/g, "$1")
        .replace(/(\w+)imeter/g, "$1")
        .replace(/NaNe>NaN/g, "NaN")
        .replace(/NaNe>/g, "NaN")
        .replace(/NaN>/g, "NaN")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/(\w+)\s*&lt;\s*(\d+)\s*&gt;/g, "$1 < $2 >")
        .replace(/(\w+)\s*&lt;\s*(\d+)/g, "$1 < $2")
        .replace(/(\d+)\s*&gt;/g, "$1 >")
        .replace(/<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/gi, "")
        .replace(/^>\s*/g, "")
        .replace(/\s*>$/g, "")
        .replace(/\s+>\s+/g, " ");
    }

    for (let i = 0; i < 2; i++) {
      code = code
        .replace(/e>e>e>/g, "")
        .replace(/e>e>/g, "")
        .replace(/^e>+/g, "")
        .replace(/e>+$/g, "")
        .replace(/(\w+)e>/g, "$1")
        .replace(/e>(\w+)/g, "$1")
        .replace(/\s*e>\s*/g, " ")
        .replace(/<\/cod<\/pr/gi, "")
        .replace(/<\/code<\/pr/gi, "")
        .replace(/<\/pr/gi, "")
        .replace(/<\/cod/gi, "")
        .replace(/^>\s*/g, "")
        .replace(/\s*>$/g, "")
        .replace(/\s+>\s+/g, " ");
    }

    code = formatCodeContent(code);

    return code;
  };

  let processedContent = fixedContent;

  processedContent = processedContent.replace(
    /<code[^>]*>([^<]{1,50})<\/code>/gi,
    (match, codeContent, offset) => {
      const beforeMatch = fixedContent.substring(0, offset);
      const lastPreOpen = beforeMatch.lastIndexOf("<pre");
      const lastPreClose = beforeMatch.lastIndexOf("</pre>");

      if (lastPreOpen > lastPreClose) {
        return match;
      }

      return `\`${codeContent.trim()}\``;
    },
  );

  const htmlCodeBlockRegex =
    /<pre[^>]*><code[^>]*>[\s\S]*?<\/code><\/pre>|<pr<cod[^>]*>[\s\S]*?<\/cod<\/pr|<pr<code[^>]*>[\s\S]*?<\/code<\/pr|<code[^>]*>[\s\S]{20,}?<\/code>/gi;
  const htmlMatches: Array<{
    index: number;
    content: string;
    fullMatch: string;
  }> = [];
  let htmlMatch;

  htmlCodeBlockRegex.lastIndex = 0;

  while ((htmlMatch = htmlCodeBlockRegex.exec(fixedContent)) !== null) {
    let matchContent = htmlMatch[0];
    matchContent = matchContent
      .replace(/<pr<cod/gi, "<pre><code>")
      .replace(/<pr<code/gi, "<pre><code>")
      .replace(/<\/cod<\/pr/gi, "</code></pre>")
      .replace(/<\/code<\/pr/gi, "</code></pre>");

    const extractedCode = extractCodeFromHtml(matchContent);
    if (extractedCode) {
      htmlMatches.push({
        index: htmlMatch.index,
        content: extractedCode,
        fullMatch: htmlMatch[0],
      });
    }
  }

  const markdownCodeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  const markdownMatches: Array<{
    index: number;
    content: string;
    language?: string;
    fullMatch: string;
  }> = [];
  let mdMatch;

  markdownCodeBlockRegex.lastIndex = 0;

  while ((mdMatch = markdownCodeBlockRegex.exec(fixedContent)) !== null) {
    markdownMatches.push({
      index: mdMatch.index,
      content: mdMatch[2].trim(),
      language: mdMatch[1] || "javascript",
      fullMatch: mdMatch[0],
    });
  }

  const allMatches = [
    ...htmlMatches.map((m) => ({
      ...m,
      type: "html" as const,
      language: "javascript" as string,
    })),
    ...markdownMatches.map((m) => ({ ...m, type: "markdown" as const })),
  ].sort((a, b) => a.index - b.index);

  let lastIndex = 0;

  for (const match of allMatches) {
    if (match.index > lastIndex) {
      const textContent = fixedContent.substring(lastIndex, match.index);
      if (textContent.trim()) {
        let cleanText = decodeHtmlEntities(textContent);
        cleanText = cleanText.replace(
          /<code[^>]*>([^<]{1,30})<\/code>/gi,
          "`$1`",
        );
        cleanText = cleanText.replace(/<[^>]+>/g, "");
        for (let i = 0; i < 3; i++) {
          cleanText = cleanText
            .replace(/<pr<cod?/gi, "")
            .replace(/<pr</gi, "")
            .replace(/<pr/gi, "")
            .replace(/<\/cod?<\/pr/gi, "")
            .replace(/<\/cod?/gi, "")
            .replace(/<\/pr/gi, "")
            .replace(/<\/cod/gi, "")
            .replace(/e>e>e>/g, "")
            .replace(/e>e>/g, "")
            .replace(/^e>+/g, "")
            .replace(/e>+$/g, "")
            .replace(/(\w+)e>/g, "$1")
            .replace(/e>(\w+)/g, "$1")
            .replace(/\s*e>\s*/g, " ")
            .replace(/^>\s*/g, "")
            .replace(/\s*>$/g, "")
            .replace(/\s+>\s+/g, " ");
        }
        cleanText = cleanText
          .replace(/[ \t]+/g, " ")
          .replace(/\n\s*\n/g, "\n\n")
          .trim();
        if (cleanText) {
          parts.push({ type: "text", content: cleanText });
        }
      }
    }

    if (match.content) {
      let cleanCode = match.content;
      for (let i = 0; i < 2; i++) {
        cleanCode = cleanCode
          .replace(/e>e>e>/g, "")
          .replace(/e>e>/g, "")
          .replace(/^e>+/g, "")
          .replace(/e>+$/g, "")
          .replace(/(\w+)e>/g, "$1")
          .replace(/e>(\w+)/g, "$1")
          .replace(/\s*e>\s*/g, " ")
          .replace(/<\/cod<\/pr/gi, "")
          .replace(/<\/code<\/pr/gi, "")
          .replace(/<\/pr/gi, "")
          .replace(/<\/cod/gi, "")
          .replace(/^>\s*/g, "")
          .replace(/\s*>$/g, "")
          .replace(/\s+>\s+/g, " ");
      }
      const formattedCode = formatCodeContent(cleanCode);
      parts.push({
        type: "code",
        content: formattedCode,
        language: match.language || "javascript",
      });
    }

    lastIndex = match.index + match.fullMatch.length;
  }

  if (lastIndex < fixedContent.length) {
    const textContent = fixedContent.substring(lastIndex);
    if (textContent.trim()) {
      let cleanText = decodeHtmlEntities(textContent);
      cleanText = cleanText.replace(
        /<code[^>]*>([^<]{1,30})<\/code>/gi,
        "`$1`",
      );
      cleanText = cleanText.replace(/<[^>]+>/g, "");
      for (let i = 0; i < 3; i++) {
        cleanText = cleanText
          .replace(/<pr<cod?/gi, "")
          .replace(/<pr</gi, "")
          .replace(/<pr/gi, "")
          .replace(/<\/cod?<\/pr/gi, "")
          .replace(/<\/cod?/gi, "")
          .replace(/<\/pr/gi, "")
          .replace(/<\/cod/gi, "")
          .replace(/e>e>e>/g, "")
          .replace(/e>e>/g, "")
          .replace(/^e>+/g, "")
          .replace(/e>+$/g, "")
          .replace(/(\w+)e>/g, "$1")
          .replace(/e>(\w+)/g, "$1")
          .replace(/\s*e>\s*/g, " ")
          .replace(/^>\s*/g, "")
          .replace(/\s*>$/g, "")
          .replace(/\s+>\s+/g, " ");
      }
      cleanText = cleanText
        .replace(/[ \t]+/g, " ")
        .replace(/\n\s*\n/g, "\n\n")
        .trim();
      if (cleanText) {
        parts.push({ type: "text", content: cleanText });
      }
    }
  }

  if (parts.length === 0) {
    let cleanContent = fixedContent;

    for (let i = 0; i < 3; i++) {
      cleanContent = cleanContent
        .replace(/<pr<cod/gi, "")
        .replace(/<\/cod<\/pr/gi, "")
        .replace(/<pr</gi, "")
        .replace(/<\/cod/gi, "")
        .replace(/<\/pr/gi, "")
        .replace(/<pr/gi, "")
        .replace(/<[^>]+>/g, "")
        .replace(/e>e>e>/g, "")
        .replace(/e>e>/g, "")
        .replace(/^e>+/g, "")
        .replace(/e>+$/g, "")
        .replace(/(\w+)e>/g, "$1")
        .replace(/e>(\w+)/g, "$1")
        .replace(/\s*e>\s*/g, " ")
        .replace(/^>\s*/g, "")
        .replace(/\s*>$/g, "")
        .replace(/\s+>\s+/g, " ");
    }

    cleanContent = cleanContent
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .trim();

    const codeValidation = isValidCode(cleanContent);

    if (codeValidation.isValid && cleanContent.length > 10) {
      const formattedCode = formatCodeContent(cleanContent);
      return (
        <div className="relative group" style={{ backgroundColor: "#111827" }}>
          <div
            className="flex items-center justify-end px-4 py-2.5 rounded-t-xl border-b-2 shadow-sm"
            style={{
              background: "linear-gradient(to right, #1f2937, #111827)",
              borderColor: "#374151",
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md"
              style={{
                color: "#e5e7eb",
                backgroundColor: "rgba(55, 65, 81, 0.5)",
              }}
            >
              javascript
            </span>
          </div>
          <div
            className="relative overflow-hidden rounded-b-xl border-x-2 border-b-2 shadow-lg"
            style={{ backgroundColor: "#111827", borderColor: "#374151" }}
          >
            <pre
              className="overflow-x-auto relative z-10"
              style={{
                backgroundColor: "#111827",
                margin: 0,
                padding: "1.5rem 1.75rem",
                color: "#f3f4f6",
                fontSize: "0.875rem",
                lineHeight: "1.8",
                fontFamily:
                  '"JetBrains Mono", "Fira Code", "SF Mono", "Consolas", "Monaco", "Courier New", monospace',
                overflowX: "auto",
                whiteSpace: "pre",
                tabSize: 2,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                WebkitTabSize: 2,
                MozTabSize: 2,
                letterSpacing: "0.01em",
              } as any)}
            >
              <code
                style={{
                  color: "#f3f4f6",
                  display: "block",
                  backgroundColor: "transparent",
                  fontFamily: "inherit",
                  whiteSpace: "pre",
                  margin: 0,
                  padding: 0,
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  tabSize: 2,
                  wordBreak: "normal",
                  WebkitTabSize: 2,
                  MozTabSize: 2,
                  overflowWrap: "normal",
                  letterSpacing: "0.01em",
                } as any)}
              >
                {formattedCode}
              </code>
            </pre>
            <div
              className="absolute inset-0 pointer-events-none rounded-b-xl z-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.2))",
              }}
            ></div>
          </div>
        </div>
      );
    }

    return (
      <p
        className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 sm:mb-5"
        style={{
          lineHeight: "1.75",
          wordSpacing: "0.05em",
          letterSpacing: "0.01em",
        }}
      >
        {cleanContent}
      </p>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {parts.map((part, index) => {
        if (part.type === "code") {
          return (
            <div
              key={index}
              className="relative group my-4 sm:my-6 max-w-4xl mx-auto"
              style={{ backgroundColor: "#111827" }}
            >
              <div
                className="flex items-center justify-end px-4 py-2.5 rounded-t-xl border-b-2 shadow-sm"
                style={{
                  background: "linear-gradient(to right, #1f2937, #111827)",
                  borderColor: "#374151",
                }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md"
                  style={{
                    color: "#e5e7eb",
                    backgroundColor: "rgba(55, 65, 81, 0.5)",
                  }}
                >
                  {part.language || "JAVASCRIPT"}
                </span>
              </div>
              <div
                className="relative overflow-hidden rounded-b-xl border-x-2 border-b-2 shadow-lg"
                style={{ backgroundColor: "#111827", borderColor: "#374151" }}
              >
                <pre
                  className="overflow-x-auto relative z-10"
                  style={{
                    backgroundColor: "#111827",
                    margin: 0,
                    padding: "1.5rem 1.75rem",
                    color: "#f3f4f6",
                    fontSize: "0.875rem",
                    lineHeight: "1.8",
                    fontFamily:
                      '"JetBrains Mono", "Fira Code", "SF Mono", "Consolas", "Monaco", "Courier New", monospace',
                    overflowX: "auto",
                    whiteSpace: "pre",
                    tabSize: 2,
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                    WebkitTabSize: 2,
                    MozTabSize: 2,
                    letterSpacing: "0.01em",
                  } as any)}
                >
                  <code
                    style={{
                      color: "#f3f4f6",
                      display: "block",
                      backgroundColor: "transparent",
                      fontFamily: "inherit",
                      whiteSpace: "pre",
                      margin: 0,
                      padding: 0,
                      fontSize: "inherit",
                      lineHeight: "inherit",
                      tabSize: 2,
                      wordBreak: "normal",
                      overflowWrap: "normal",
                      WebkitTabSize: 2,
                      MozTabSize: 2,
                      letterSpacing: "0.01em",
                    } as any)}
                  >
                    {part.content}
                  </code>
                </pre>
                <div
                  className="absolute inset-0 pointer-events-none rounded-b-xl z-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.2))",
                  }}
                ></div>
              </div>
            </div>
          );
        } else {
          const textParts: Array<{ type: "text" | "code"; content: string }> =
            [];
          const inlineCodeRegex = /`([^`]+)`/g;
          let lastIndex = 0;
          let match;

          while ((match = inlineCodeRegex.exec(part.content)) !== null) {
            if (match.index > lastIndex) {
              const textBefore = part.content.substring(lastIndex, match.index);
              if (textBefore) {
                textParts.push({ type: "text", content: textBefore });
              }
            }
            textParts.push({ type: "code", content: match[1] });
            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < part.content.length) {
            const remainingText = part.content.substring(lastIndex);
            if (remainingText) {
              textParts.push({ type: "text", content: remainingText });
            }
          }

          if (textParts.length === 0) {
            textParts.push({ type: "text", content: part.content });
          }

          return (
            <p
              key={index}
              className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 sm:mb-5"
              style={{
                lineHeight: "1.75",
                wordSpacing: "0.05em",
                letterSpacing: "0.01em",
              }}
            >
              {textParts.map((textPart, textIndex) => {
                if (textPart.type === "code") {
                  return (
                    <code
                      key={textIndex}
                      className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded text-sm font-mono"
                    >
                      {textPart.content}
                    </code>
                  );
                }
                return (
                  <span key={textIndex}>
                    {decodeHtmlEntities(textPart.content)}
                  </span>
                );
              })}
            </p>
          );
        }
      })}
    </div>
  );
};

export default function FreeStylePracticePage() {
  const { userType } = useUserType();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get topic and subtopic from URL query params
  const urlTopic = searchParams?.get("topic") || "";
  const urlSubtopic = searchParams?.get("subtopic") || "";

  // State to store the resolved topic ID from subtopic slug
  const [resolvedTopicId, setResolvedTopicId] = useState<string | null>(null);
  const [isResolvingTopic, setIsResolvingTopic] = useState(false);

  // Save progress function
  const saveProgress = async (data: {
    sessionId: string;
    question_id: string;
    answer: number;
    isCorrect: boolean;
    timeSpent: number;
    section: string;
    difficulty: string;
    timestamp: number;
    learningMode: "free-style";
  }) => {
    if (!isAuthenticated || !user) {
      return false;
    }

    try {
      const response = await fetch("/api/progress/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to save progress:", response.statusText);
        return false;
      }

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error("Error saving progress:", error);
      return false;
    }
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [inFlashcards, setInFlashcards] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [answeredQuestionsData, setAnsweredQuestionsData] = useState<
    Record<
      string,
      {
        selectedAnswer: number;
        isCorrect: boolean;
        timestamp: number;
      }
    >
  >({});
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    timeSpent: 0,
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(
    Date.now(),
  );
  const [filters, setFilters] = useState<FilterOptions>({
    sections: [],
    difficulties: [],
    tags: [],
    categories: [],
    topics: [],
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionStartTime] = useState(Date.now());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [totalQuestionCount, setTotalQuestionCount] = useState(0);
  const [filteredQuestionCount, setFilteredQuestionCount] = useState(0); // Count from API response
  const [questionsLimit, setQuestionsLimit] = useState(5); // Start with 5 questions
  const [hasMoreQuestions, setHasMoreQuestions] = useState(true);
  const [availableSections, setAvailableSections] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [topics, setTopics] = useState<
    Array<{ id: string; name: string; slug?: string }>
  >([]);
  const [userProgress, setUserProgress] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    timeSpent: number;
  } | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  // Available difficulties
  const availableDifficulties = ["easy", "medium", "hard"];

  // Fetch questions from database
  const fetchQuestions = async () => {
    try {
      setIsLoadingQuestions(true);

      // Build query parameters
      const params = new URLSearchParams();

      // Add topic filter - prioritize user-selected topics, then URL topic, then resolved topic from subtopic
      const isValidUUID = (str: string) => {
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(str);
      };

      // Use user-selected topics from filter first, otherwise fall back to URL/resolved topic
      if (filters.topics.length > 0) {
        // If multiple topics selected, use the first one (API supports single topic for now)
        // TODO: Update API to support multiple topics
        const topicIdToUse = filters.topics[0];
        params.append("topic", topicIdToUse);
        console.log(
          "📌 Filtering questions by selected topic ID:",
          topicIdToUse,
        );
      } else {
        // Fallback to URL topic or resolved topic from subtopic
        const topicIdToUse =
          resolvedTopicId ||
          (urlTopic && isValidUUID(urlTopic) ? urlTopic : null);
        if (topicIdToUse) {
          params.append("topic", topicIdToUse);
          console.log(
            "📌 Filtering questions by URL/resolved topic ID:",
            topicIdToUse,
          );
        } else if (urlSubtopic) {
          // If we have a subtopic slug but no resolved topic ID yet, pass it to the API
          // The API route can handle resolving the subtopic slug to a topic ID
          params.append("subtopic", urlSubtopic);
          console.log(
            "📌 Filtering questions by subtopic slug (API will resolve):",
            urlSubtopic,
          );
        } else if (urlTopic && !isValidUUID(urlTopic)) {
          // If urlTopic is not a UUID, treat it as a slug and pass as subtopic
          params.append("subtopic", urlTopic);
          console.log(
            "📌 Filtering questions by topic slug (API will resolve):",
            urlTopic,
          );
        }
      }

      // Add category filters (multiple categories supported)
      if (filters.categories.length > 0) {
        filters.categories.forEach((catId) => {
          params.append("categories", catId);
        });
      }

      // Add difficulty filter (API supports single difficulty for now)
      if (filters.difficulties.length > 0) {
        params.append("difficulty", filters.difficulties[0]);
      }

      params.append("limit", questionsLimit.toString()); // Use configurable limit

      const response = await fetch(`/api/questions?${params.toString()}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API response not OK:", response.status, errorText);
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Questions API response:", {
        success: data.success,
        count: data.count,
        dataLength: data.data?.length,
        sampleQuestion: data.data?.[0]
          ? {
              id: data.data[0].id,
              question: data.data[0].question,
              question_text: data.data[0].question_text,
              options: data.data[0].options,
              optionsType: typeof data.data[0].options,
              correctAnswer: data.data[0].correctAnswer,
              answer: data.data[0].answer,
              correct_answer: data.data[0].correct_answer,
            }
          : null,
      });

      if (data.success && Array.isArray(data.data)) {
        console.log("Raw questions from API:", {
          count: data.data.length,
          firstQuestion: data.data[0],
        });

        // Get category map for section names
        const categoryMap = new Map(
          categories.map((cat) => [cat.id, cat.name]),
        );
        console.log("Category map:", Array.from(categoryMap.entries()));

        // Transform database questions to component format
        let skippedCount = 0;
        const transformedQuestions: Question[] = data.data
          .filter((q: DatabaseQuestion) => {
            // Filter by search term
            if (searchTerm) {
              const searchLower = searchTerm.toLowerCase();
              const questionText = (
                q.question ||
                q.question_text ||
                ""
              ).toLowerCase();
              if (!questionText.includes(searchLower)) {
                return false;
              }
            }
            return true;
          })
          .map((q: DatabaseQuestion) => {
            // Parse options
            let options: string[] = [];
            let correctAnswerIndex: number | null = null;

            try {
              // Get question text (could be from API transformation or raw)
              const questionText = q.question || q.question_text || "";

              // Log raw question data for debugging
              if (
                !q.options ||
                (Array.isArray(q.options) && q.options.length === 0)
              ) {
                console.warn("Question has no options:", {
                  id: q.id,
                  question_text: questionText.substring(0, 50),
                  options: q.options,
                  rawOptions: typeof q.options,
                });
              }

              if (q.options) {
                let parsedOptions;

                // Handle string JSON
                if (typeof q.options === "string") {
                  try {
                    parsedOptions = JSON.parse(q.options);
                  } catch (parseError) {
                    console.error(
                      "Failed to parse options JSON string:",
                      parseError,
                      q.options,
                    );
                    parsedOptions = null;
                  }
                } else {
                  parsedOptions = q.options;
                }

                if (parsedOptions) {
                  // Handle array format
                  if (Array.isArray(parsedOptions)) {
                    if (parsedOptions.length > 0) {
                      // Check if options are objects with isCorrect property
                      const firstOption = parsedOptions[0];
                      if (
                        firstOption &&
                        typeof firstOption === "object" &&
                        firstOption !== null &&
                        "isCorrect" in firstOption
                      ) {
                        // Format: [{text: "...", isCorrect: true}, ...] or [{id: "a", text: "...", isCorrect: true}, ...]
                        options = parsedOptions.map((opt: any) => {
                          if (typeof opt === "string") return opt;
                          return (
                            opt.text || opt.label || opt.content || String(opt)
                          );
                        });
                        // First try to find by isCorrect flag
                        const correctOption = parsedOptions.findIndex(
                          (opt: any) => opt.isCorrect === true,
                        );
                        if (correctOption >= 0) {
                          correctAnswerIndex = Number(correctOption); // Ensure it's a number
                          console.log(
                            "✅ Found correct answer from isCorrect flag at index:",
                            correctAnswerIndex,
                            {
                              questionId: q.id?.substring(0, 8),
                              optionText: parsedOptions[
                                correctOption
                              ]?.text?.substring(0, 50),
                              optionId: parsedOptions[correctOption]?.id,
                            },
                          );
                        } else {
                          // Fallback: try to match correct_answer against option id
                          if (
                            typeof q.correct_answer === "string" &&
                            q.correct_answer
                          ) {
                            const correctAnswerStr = q.correct_answer;
                            const correctById = parsedOptions.findIndex(
                              (opt: any) =>
                                opt.id?.toLowerCase() ===
                                correctAnswerStr.toLowerCase(),
                            );
                            if (correctById >= 0) {
                              correctAnswerIndex = Number(correctById); // Ensure it's a number
                              console.log(
                                "✅ Found correct answer from id match at index:",
                                correctAnswerIndex,
                                {
                                  questionId: q.id?.substring(0, 8),
                                  optionText: parsedOptions[
                                    correctById
                                  ]?.text?.substring(0, 50),
                                  optionId: parsedOptions[correctById]?.id,
                                  correct_answer: q.correct_answer,
                                },
                              );
                            } else {
                              console.warn(
                                "⚠️ Could not find correct answer by id:",
                                {
                                  questionId: q.id?.substring(0, 8),
                                  correct_answer: q.correct_answer,
                                  availableIds: parsedOptions.map(
                                    (opt: any) => opt.id,
                                  ),
                                },
                              );
                            }
                          }
                        }
                      } else {
                        // Format: ["Option A", "Option B", ...] or array of strings
                        options = parsedOptions.map((opt: any) => {
                          if (typeof opt === "string") return opt;
                          if (typeof opt === "object" && opt !== null) {
                            return (
                              opt.text ||
                              opt.label ||
                              opt.content ||
                              opt.value ||
                              String(opt)
                            );
                          }
                          return String(opt);
                        });
                      }
                    }
                  } else if (
                    typeof parsedOptions === "object" &&
                    parsedOptions !== null
                  ) {
                    // Handle object format { options: [...], correctAnswer: ... }
                    if (Array.isArray(parsedOptions.options)) {
                      options = parsedOptions.options.map((opt: any) => {
                        if (typeof opt === "string") return opt;
                        if (typeof opt === "object" && opt !== null) {
                          return (
                            opt.text ||
                            opt.label ||
                            opt.content ||
                            opt.value ||
                            String(opt)
                          );
                        }
                        return String(opt);
                      });
                    } else if (parsedOptions.choices) {
                      // Alternative format: { choices: [...] }
                      options = Array.isArray(parsedOptions.choices)
                        ? parsedOptions.choices.map((opt: any) => {
                            if (typeof opt === "string") return opt;
                            if (typeof opt === "object" && opt !== null) {
                              return (
                                opt.text ||
                                opt.label ||
                                opt.content ||
                                opt.value ||
                                String(opt)
                              );
                            }
                            return String(opt);
                          })
                        : [];
                    }
                    correctAnswerIndex =
                      parsedOptions.correctAnswer ??
                      parsedOptions.correct_index ??
                      parsedOptions.correctAnswerIndex ??
                      null;
                  }
                }
              }

              // If no options parsed and we have a question, try to fetch from API
              if (options.length === 0 && q.id) {
                console.warn(
                  "No options found for question, will attempt to fetch details:",
                  q.id,
                );
                // We'll handle this below by skipping invalid questions
              }

              // If still no options, log but don't skip - allow display without options for debugging
              if (options.length === 0) {
                console.warn(
                  "Question has no options, creating placeholder options:",
                  {
                    id: q.id,
                    question_text: questionText.substring(0, 50),
                  },
                );
                // Create placeholder options instead of skipping
                options = [
                  "Option A (No options in database)",
                  "Option B (No options in database)",
                  "Option C (No options in database)",
                  "Option D (No options in database)",
                ];
              }

              // Parse correct answer - handle different formats (only if not already set from options)
              if (correctAnswerIndex === null && options.length > 0) {
                console.log(
                  "🔄 correctAnswerIndex is null, attempting to parse from correct_answer field:",
                  {
                    questionId: q.id?.substring(0, 8),
                    correct_answer: q.correct_answer,
                    correctAnswer: q.correctAnswer,
                    answer: q.answer,
                    optionsLength: options.length,
                  },
                );
                // Try transformed fields first
                if (typeof q.correctAnswer === "number") {
                  correctAnswerIndex =
                    q.correctAnswer >= 0 && q.correctAnswer < options.length
                      ? q.correctAnswer
                      : 0;
                } else if (typeof q.correct_answer === "number") {
                  correctAnswerIndex =
                    q.correct_answer >= 0 && q.correct_answer < options.length
                      ? q.correct_answer
                      : 0;
                } else if (q.answer !== undefined) {
                  // Handle transformed answer field
                  if (typeof q.answer === "number") {
                    correctAnswerIndex =
                      q.answer >= 0 && q.answer < options.length ? q.answer : 0;
                  } else if (typeof q.answer === "string") {
                    const parsedNum = parseInt(q.answer, 10);
                    if (
                      !isNaN(parsedNum) &&
                      parsedNum >= 0 &&
                      parsedNum < options.length
                    ) {
                      correctAnswerIndex = parsedNum;
                    } else {
                      const correctIndex = options.findIndex(
                        (opt) =>
                          opt.toLowerCase() ===
                          (typeof q.answer === "string"
                            ? q.answer.toLowerCase()
                            : String(q.answer || "").toLowerCase()),
                      );
                      correctAnswerIndex = correctIndex >= 0 ? correctIndex : 0;
                    }
                  }
                } else if (typeof q.correct_answer === "string") {
                  // Try to parse as number first
                  const parsedNum = parseInt(q.correct_answer, 10);
                  if (
                    !isNaN(parsedNum) &&
                    parsedNum >= 0 &&
                    parsedNum < options.length
                  ) {
                    correctAnswerIndex = parsedNum;
                  } else {
                    // Check if options are objects with 'id' property (original format from DB)
                    // This handles cases where correct_answer is "a", "b", "c", etc.
                    if (q.options && Array.isArray(q.options)) {
                      const firstOption = q.options[0];
                      if (
                        firstOption &&
                        typeof firstOption === "object" &&
                        firstOption !== null &&
                        "id" in firstOption
                      ) {
                        // Options are objects with id property - match correct_answer against id
                        const correctOptionIndex = q.options.findIndex(
                          (opt: any) =>
                            opt.id?.toLowerCase() ===
                            (typeof q.correct_answer === "string"
                              ? q.correct_answer.toLowerCase()
                              : String(q.correct_answer || "").toLowerCase()),
                        );
                        if (correctOptionIndex >= 0) {
                          correctAnswerIndex = correctOptionIndex;
                        } else {
                          // Fallback: try to match against isCorrect
                          const correctByFlag = q.options.findIndex(
                            (opt: any) => opt.isCorrect === true,
                          );
                          if (correctByFlag >= 0) {
                            correctAnswerIndex = correctByFlag;
                          }
                        }
                      } else {
                        // Options are strings - try to find the index of the correct answer text
                        const correctIndex = options.findIndex(
                          (opt) =>
                            opt.toLowerCase() ===
                            (typeof q.correct_answer === "string"
                              ? q.correct_answer.toLowerCase()
                              : String(q.correct_answer || "").toLowerCase()),
                        );
                        if (correctIndex >= 0) {
                          correctAnswerIndex = correctIndex;
                        } else {
                          correctAnswerIndex = 0; // Default to first option
                        }
                      }
                    } else {
                      // Options are strings - try to find the index of the correct answer text
                      const correctIndex = options.findIndex(
                        (opt) =>
                          opt.toLowerCase() ===
                          (typeof q.correct_answer === "string"
                            ? q.correct_answer.toLowerCase()
                            : String(q.correct_answer || "").toLowerCase()),
                      );
                      if (correctIndex >= 0) {
                        correctAnswerIndex = correctIndex;
                      } else {
                        correctAnswerIndex = 0; // Default to first option
                      }
                    }
                  }
                } else {
                  correctAnswerIndex = 0; // Default to first option
                }
              }

              // Ensure correctAnswerIndex is valid
              if (
                correctAnswerIndex === null ||
                correctAnswerIndex === undefined ||
                correctAnswerIndex < 0 ||
                correctAnswerIndex >= options.length
              ) {
                console.warn(
                  "⚠️ Invalid correctAnswerIndex, defaulting to 0:",
                  {
                    correctAnswerIndex,
                    correctAnswerIndexType: typeof correctAnswerIndex,
                    optionsLength: options.length,
                    questionId: q.id,
                    correct_answer: q.correct_answer,
                    options: options.map(
                      (opt, idx) => `${idx}: ${opt.substring(0, 30)}...`,
                    ),
                  },
                );
                // Only default to 0 if it's truly invalid - don't overwrite a valid value
                if (
                  correctAnswerIndex === null ||
                  correctAnswerIndex === undefined ||
                  isNaN(Number(correctAnswerIndex))
                ) {
                  correctAnswerIndex = 0;
                } else {
                  // Clamp to valid range instead of defaulting
                  correctAnswerIndex = Math.max(
                    0,
                    Math.min(Number(correctAnswerIndex), options.length - 1),
                  );
                }
              } else {
                console.log("✅ Correct answer index validated:", {
                  questionId: q.id?.substring(0, 8) + "...",
                  correctAnswerIndex,
                  correctAnswerIndexType: typeof correctAnswerIndex,
                  correctAnswerText: options[correctAnswerIndex]?.substring(
                    0,
                    50,
                  ),
                  optionsLength: options.length,
                });
              }

              // Store the original for debugging and ensure it's a number
              const originalCorrectAnswerIndex = Number(correctAnswerIndex);
              correctAnswerIndex = originalCorrectAnswerIndex; // Ensure we're working with a number

              // Parse tags
              let tags: string[] = [];
              if (q.tags) {
                try {
                  if (typeof q.tags === "string") {
                    tags = JSON.parse(q.tags);
                  } else if (Array.isArray(q.tags)) {
                    tags = q.tags;
                  } else {
                    tags = [];
                  }
                  if (!Array.isArray(tags)) tags = [];
                } catch {
                  tags = [];
                }
              }

              // Get section name from category (try both field names)
              let section = "General";
              const categoryId = q.categoryId || q.category_id;
              if (categoryId && categoryMap.has(categoryId)) {
                section = categoryMap.get(categoryId)!;
              }

              // Validate that we have actual question text
              if (!questionText || questionText.trim() === "") {
                console.warn("Skipping question with no question text:", {
                  id: q.id,
                  availableFields: Object.keys(q),
                  q: q,
                });
                return null;
              }

              // Ensure we have at least one option (even if placeholder)
              if (options.length === 0) {
                console.warn(
                  "Question has no options after parsing, creating placeholders:",
                  q.id,
                );
                options = [
                  "Option A (No options available)",
                  "Option B (No options available)",
                  "Option C (No options available)",
                  "Option D (No options available)",
                ];
              }

              // Filter out empty options BEFORE setting final correct answer
              const filteredOptions = options.filter(
                (opt) => opt && opt.trim() !== "",
              );

              // If options were filtered, we need to adjust the correct answer index
              // The correct answer index should point to the same option text
              let finalCorrectAnswer = correctAnswerIndex ?? 0;

              // Debug: Log before filtering adjustment
              if (questionText?.includes("What is CSS")) {
                console.log("🔍 Before filtering adjustment:", {
                  originalCorrectAnswerIndex,
                  correctAnswerIndex,
                  optionsLength: options.length,
                  filteredOptionsLength: filteredOptions.length,
                  options: options.map((opt, idx) => ({
                    idx,
                    text: opt.substring(0, 30),
                  })),
                });
              }

              // If filtering removed options, find the correct answer in the filtered array
              if (
                filteredOptions.length !== options.length &&
                finalCorrectAnswer >= 0 &&
                finalCorrectAnswer < options.length
              ) {
                const correctOptionText = options[finalCorrectAnswer];
                const newIndex = filteredOptions.findIndex(
                  (opt) => opt === correctOptionText,
                );
                if (newIndex >= 0) {
                  finalCorrectAnswer = newIndex;
                } else {
                  // If the correct option was filtered out (shouldn't happen), default to 0
                  console.warn("⚠️ Correct answer option was filtered out!", {
                    questionId: q.id,
                    originalIndex: correctAnswerIndex,
                    correctOptionText,
                  });
                  finalCorrectAnswer = 0;
                }
              }

              // Final validation - ensure we have a valid number index
              if (
                finalCorrectAnswer === null ||
                finalCorrectAnswer === undefined ||
                isNaN(finalCorrectAnswer) ||
                finalCorrectAnswer < 0 ||
                finalCorrectAnswer >= filteredOptions.length
              ) {
                console.error("❌ Invalid final correct answer index:", {
                  questionId: q.id,
                  finalCorrectAnswer,
                  correctAnswerIndex,
                  optionsLength: filteredOptions.length,
                  options: filteredOptions.map(
                    (opt, idx) => `${idx}: ${opt.substring(0, 30)}...`,
                  ),
                  originalCorrectAnswerIndex: correctAnswerIndex,
                  q_correct_answer: q.correct_answer,
                });
                // Fix invalid index - default to 0 but ensure it's valid
                finalCorrectAnswer = Math.max(
                  0,
                  Math.min(
                    filteredOptions.length > 0 ? finalCorrectAnswer || 0 : 0,
                    Math.max(0, filteredOptions.length - 1),
                  ),
                );
              }

              // Ensure it's a number
              finalCorrectAnswer = Number(finalCorrectAnswer);

              // Debug logging for "What is CSS?" question
              if (questionText?.includes("What is CSS")) {
                console.log('🔧 Final Question Object for "What is CSS?":', {
                  questionId: q.id,
                  correctAnswer: finalCorrectAnswer,
                  correctAnswerType: typeof finalCorrectAnswer,
                  optionsCount: filteredOptions.length,
                  options: filteredOptions.map((opt, idx) => ({
                    index: idx,
                    letter: String.fromCharCode(65 + idx),
                    text: opt.substring(0, 40) + "...",
                    isCorrect: idx === finalCorrectAnswer,
                  })),
                });
              }

              return {
                id: q.id,
                question: questionText.trim(),
                content: q.content || "",
                options: filteredOptions,
                correctAnswer: finalCorrectAnswer,
                explanation: q.explanation || "",
                section,
                difficulty: (q.difficulty || "medium") as
                  | "easy"
                  | "medium"
                  | "hard",
                tags,
                topicId: q.topicId || q.topic_id,
                categoryId: categoryId,
              };
            } catch (error) {
              console.error("Error parsing question:", error, q);
              skippedCount++;
              return null;
            }
          })
          .filter((q: Question | null): q is Question => {
            if (q === null) {
              skippedCount++;
              return false;
            }
            return true;
          });

        console.log(
          `📊 Transformation complete: ${transformedQuestions.length} valid, ${skippedCount} skipped`,
        );

        // Debug: Log questions with their correct answers
        transformedQuestions.forEach((q, idx) => {
          if (q.question?.includes("What is CSS")) {
            console.log('🔍 Found "What is CSS?" question:', {
              index: idx,
              id: q.id,
              question: q.question,
              correctAnswerIndex: q.correctAnswer,
              options: q.options.map((opt, optIdx) => ({
                index: optIdx,
                text: opt.substring(0, 50) + "...",
                isCorrectAnswer: optIdx === q.correctAnswer,
              })),
            });
          }
        });

        setQuestions(transformedQuestions);

        // Update filtered count from API response (actual count after server-side filtering)
        if (data.count !== undefined) {
          setFilteredQuestionCount(data.count);
        } else if (data.totalCount !== undefined) {
          setFilteredQuestionCount(data.totalCount);
        } else {
          // Fallback to transformed questions length
          setFilteredQuestionCount(transformedQuestions.length);
        }

        // Update total count (only if not filtered, otherwise use filtered count)
        const totalInDB = data.count || transformedQuestions.length;
        if (
          filters.categories.length === 0 &&
          filters.difficulties.length === 0
        ) {
          setTotalQuestionCount(totalInDB);
        }

        // Check if there are more questions to load
        setHasMoreQuestions(transformedQuestions.length < totalInDB);

        console.log(
          `✅ Loaded ${transformedQuestions.length} of ${totalInDB} questions`,
          {
            loaded: transformedQuestions.length,
            totalInDB,
            hasMore: transformedQuestions.length < totalInDB,
            sampleQuestion: transformedQuestions[0]
              ? {
                  id: transformedQuestions[0].id,
                  question: transformedQuestions[0].question.substring(0, 50),
                  section: transformedQuestions[0].section,
                  difficulty: transformedQuestions[0].difficulty,
                  optionsCount: transformedQuestions[0].options.length,
                }
              : null,
          },
        );

        // Extract unique tags from questions
        const allTags = new Set<string>();
        transformedQuestions.forEach((q) => {
          if (q.tags && Array.isArray(q.tags)) {
            q.tags.forEach((tag) => allTags.add(tag));
          }
        });
        setAvailableTags(Array.from(allTags).sort());

        // If no questions found, log helpful info
        if (transformedQuestions.length === 0) {
          console.warn("⚠️ No questions transformed. Raw data:", {
            rawDataLength: data.data?.length,
            sampleQuestion: data.data?.[0],
          });
        }
      } else {
        console.error(
          "Failed to fetch questions:",
          data.error || "Unknown error",
        );
        setQuestions([]);
        setTotalQuestionCount(0);

        // Show user-friendly error message
        if (data.error) {
          console.error("API Error details:", data.error);
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
      setTotalQuestionCount(0);

      // Log full error for debugging
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Fetch categories for sections
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success && data.data) {
        const categoryList = data.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
        }));
        setCategories(categoryList);
        const categoryNames = categoryList.map(
          (cat: { id: string; name: string }) => cat.name,
        );
        setAvailableSections(categoryNames);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback to default sections
      setAvailableSections([
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "System Design",
        "Performance",
        "Security",
        "Design Patterns",
        "Problem Solving",
      ]);
    }
  };

  // Fetch topics for filtering
  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/topics");
      const data = await response.json();
      if (data.success && data.data) {
        const topicList = data.data.map((topic: any) => ({
          id: topic.id,
          name: topic.name,
          slug: topic.slug,
        }));
        setTopics(topicList);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  // Fetch question count
  const fetchQuestionCount = async () => {
    try {
      const response = await fetch("/api/questions/count");
      const data = await response.json();
      if (data.success && data.data) {
        setTotalQuestionCount(data.data.totalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching question count:", error);
    }
  };

  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!isAuthenticated) {
      setUserProgress(null);
      return;
    }

    try {
      setIsLoadingProgress(true);
      const response = await fetch("/api/progress/get?mode=free-style");
      const data = await response.json();

      if (data.success && data.progress) {
        setUserProgress({
          totalQuestions: data.progress.totalQuestions || 0,
          correctAnswers: data.progress.correctAnswers || 0,
          accuracy: data.progress.accuracy || 0,
          timeSpent: data.progress.timeSpent || 0,
        });
      } else {
        // Initialize with zero if no progress found
        setUserProgress({
          totalQuestions: 0,
          correctAnswers: 0,
          accuracy: 0,
          timeSpent: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching user progress:", error);
      setUserProgress(null);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (!isAuthLoading && userType !== "self-directed") {
      router.push("/learning-mode");
      return;
    }

    // Fetch categories, topics, question count, and user progress first
    fetchCategories();
    fetchTopics();
    fetchQuestionCount();
    fetchUserProgress();
  }, [userType, isAuthLoading, router, isAuthenticated]);

  // Resolve topic ID from subtopic slug
  useEffect(() => {
    const resolveTopicFromSubtopic = async () => {
      if (!urlSubtopic) {
        setResolvedTopicId(null);
        return;
      }

      try {
        setIsResolvingTopic(true);
        console.log("🔍 Resolving topic from subtopic slug:", urlSubtopic);

        // Fetch all topics to find by slug
        const topicsResponse = await fetch("/api/topics");
        const topicsData = await topicsResponse.json();

        if (topicsData.success && topicsData.data) {
          // Find topic by slug (case-insensitive, handle various formats including partial matches)
          const subtopicLower = urlSubtopic.toLowerCase();
          console.log("🔍 Searching for topic with subtopic:", subtopicLower);
          console.log(
            "📋 Available topics:",
            topicsData.data.slice(0, 10).map((t: any) => ({
              id: t.id?.substring(0, 8),
              name: t.name,
              slug: t.slug,
            })),
          );

          // Normalize subtopic for better matching (remove plural 's', handle common variations)
          const normalizeForMatch = (str: string) => {
            return str
              .toLowerCase()
              .replace(/s$/, "") // Remove trailing 's' for plural matching
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
          };

          const subtopicNormalized = normalizeForMatch(subtopicLower);

          const matchingTopic = topicsData.data.find((topic: any) => {
            const topicSlug = topic.slug?.toLowerCase() || "";
            const topicName = topic.name?.toLowerCase() || "";
            const topicNameSlug = topicName.replace(/\s+/g, "-");
            const topicSlugNormalized = normalizeForMatch(topicSlug);
            const topicNameNormalized = normalizeForMatch(topicName);

            // Exact matches
            if (
              topicSlug === subtopicLower ||
              topicNameSlug === subtopicLower ||
              topic.id?.toLowerCase() === subtopicLower
            ) {
              return true;
            }

            // Check if slug contains the subtopic (e.g., "js-scope-closure" contains "closure")
            if (
              topicSlug.includes(subtopicLower) ||
              topicSlug.includes(subtopicNormalized)
            ) {
              return true;
            }

            // Check normalized matching (handles plural/singular)
            if (
              topicSlugNormalized.includes(subtopicNormalized) ||
              subtopicNormalized.includes(topicSlugNormalized)
            ) {
              return true;
            }

            // Check if the subtopic appears as a word boundary in the slug
            const escapedSubtopic = subtopicLower.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&",
            );
            const escapedSubtopicNormalized = subtopicNormalized.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&",
            );

            if (
              new RegExp(`(^|-)${escapedSubtopic}(-|$)`).test(topicSlug) ||
              new RegExp(`(^|-)${escapedSubtopicNormalized}(-|$)`).test(
                topicSlug,
              )
            ) {
              return true;
            }

            // Check name matching
            if (
              topicName.includes(subtopicLower.replace(/-/g, " ")) ||
              topicNameNormalized.includes(subtopicNormalized) ||
              subtopicNormalized.includes(topicNameNormalized)
            ) {
              return true;
            }

            return false;
          });

          if (matchingTopic) {
            console.log(
              "✅ Found topic:",
              matchingTopic.id,
              matchingTopic.name,
            );
            console.log(`📌 Setting resolvedTopicId to: ${matchingTopic.id}`);
            setResolvedTopicId(matchingTopic.id);

            // Auto-select the topic in the filter UI so user can see it's selected
            if (!filters.topics.includes(matchingTopic.id)) {
              console.log(
                `📌 Auto-selecting topic in filter: ${matchingTopic.name}`,
              );
              setFilters((prev) => ({
                ...prev,
                topics: prev.topics.includes(matchingTopic.id)
                  ? prev.topics
                  : [...prev.topics, matchingTopic.id],
              }));
            }

            // Also auto-select the category if the topic has one
            if (
              matchingTopic.categoryId &&
              !filters.categories.includes(matchingTopic.categoryId)
            ) {
              setFilters((prev) => ({
                ...prev,
                categories: prev.categories.includes(matchingTopic.categoryId)
                  ? prev.categories
                  : [...prev.categories, matchingTopic.categoryId],
              }));
            }
          } else {
            console.warn("⚠️ Topic not found for subtopic:", urlSubtopic);
            console.log(
              "Available topics (first 20):",
              topicsData.data.slice(0, 20).map((t: any) => ({
                slug: t.slug,
                name: t.name,
                id: t.id?.substring(0, 8) + "...",
              })),
            );
            setResolvedTopicId(null);
          }
        }
      } catch (error) {
        console.error("Error resolving topic:", error);
        setResolvedTopicId(null);
      } finally {
        setIsResolvingTopic(false);
      }
    };

    resolveTopicFromSubtopic();
  }, [urlSubtopic]);

  // Fetch questions when filters, search, limit, or topic changes
  useEffect(() => {
    if (userType === "self-directed" && !isAuthLoading) {
      // Don't wait for categories - questions can load with default section names
      // If we're resolving a topic, wait for resolution to complete
      if (urlSubtopic && isResolvingTopic) {
        console.log("⏳ Waiting for topic resolution...");
        return;
      }
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters,
    searchTerm,
    userType,
    isAuthLoading,
    questionsLimit,
    resolvedTopicId,
    urlTopic,
    urlSubtopic,
    isResolvingTopic,
  ]);

  // Re-fetch questions when categories load (to update section names)
  useEffect(() => {
    if (
      userType === "self-directed" &&
      !isAuthLoading &&
      categories.length > 0 &&
      questions.length === 0
    ) {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".category-dropdown-container") &&
        !target.closest(".topic-dropdown-container") &&
        !target.closest(".difficulty-dropdown-container") &&
        !target.closest(".limit-dropdown-container")
      ) {
        setShowCategoryDropdown(false);
        setShowTopicDropdown(false);
        setShowDifficultyDropdown(false);
        setShowLimitDropdown(false);
      }
    };

    if (
      showCategoryDropdown ||
      showTopicDropdown ||
      showDifficultyDropdown ||
      showLimitDropdown
    ) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [
    showCategoryDropdown,
    showTopicDropdown,
    showDifficultyDropdown,
    showLimitDropdown,
  ]);

  // Reset to saved/last question when questions load or filters change
  useEffect(() => {
    const filtered = getFilteredQuestions();
    console.log("🔄 Questions/filters changed:", {
      totalQuestions: questions.length,
      filteredCount: filtered.length,
      filters,
      searchTerm,
    });

    if (filtered.length > 0) {
      // Try to restore last question index from localStorage
      try {
        const savedProgress = localStorage.getItem(
          "free-style-practice-progress",
        );
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          const savedIndex = progress.lastQuestionIndex || 0;

          // Validate saved index is still valid for current filtered questions
          if (savedIndex >= 0 && savedIndex < filtered.length) {
            // Try to find the question by ID from saved progress
            const savedQuestionId = progress.lastQuestionId;
            if (savedQuestionId) {
              const foundIndex = filtered.findIndex(
                (q) => q.id === savedQuestionId,
              );
              if (foundIndex >= 0) {
                setCurrentQuestionIndex(foundIndex);
                loadQuestion(foundIndex);
                return;
              }
            }
            // If question ID not found, use saved index if valid
            setCurrentQuestionIndex(savedIndex);
            loadQuestion(savedIndex);
            return;
          }
        }
      } catch (error) {
        console.error("Error restoring last question:", error);
      }

      // Fallback to first question if no saved progress
      setCurrentQuestionIndex(0);
      loadQuestion(0);
    } else {
      setCurrentQuestion(null);
      if (questions.length > 0) {
        console.warn("⚠️ Questions loaded but all filtered out!", {
          totalQuestions: questions.length,
          filters,
          searchTerm,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, filters, searchTerm]);

  const getFilteredQuestions = () => {
    const filtered = questions.filter((question) => {
      // Filter by categories (using categoryId)
      if (
        filters.categories.length > 0 &&
        question.categoryId &&
        !filters.categories.includes(question.categoryId)
      ) {
        return false;
      }

      // Filter by topics (using topicId)
      if (
        filters.topics.length > 0 &&
        question.topicId &&
        !filters.topics.includes(question.topicId)
      ) {
        return false;
      }

      // Filter by sections
      if (
        filters.sections.length > 0 &&
        !filters.sections.includes(question.section)
      ) {
        return false;
      }

      // Filter by difficulties
      if (
        filters.difficulties.length > 0 &&
        !filters.difficulties.includes(question.difficulty)
      ) {
        return false;
      }

      // Filter by tags
      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => question.tags.includes(tag))
      ) {
        return false;
      }

      // Filter by search term
      if (
        searchTerm &&
        !question.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Debug logging
    if (filtered.length === 0 && questions.length > 0) {
      console.log("⚠️ All questions filtered out:", {
        totalQuestions: questions.length,
        filters,
        searchTerm,
        sampleQuestion: questions[0]
          ? {
              section: questions[0].section,
              difficulty: questions[0].difficulty,
              tags: questions[0].tags,
              categoryId: questions[0].categoryId,
            }
          : null,
      });
    }

    return filtered;
  };

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(
        "free-style-practice-progress",
      );
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        console.log("📦 Loading saved progress:", {
          lastQuestionIndex: progress.lastQuestionIndex,
          lastQuestionId: progress.lastQuestionId,
          answeredCount: progress.answeredQuestions?.length || 0,
        });

        if (
          progress.answeredQuestions &&
          Array.isArray(progress.answeredQuestions)
        ) {
          setAnsweredQuestions(new Set(progress.answeredQuestions));
        }
        if (progress.answeredQuestionsData) {
          setAnsweredQuestionsData(progress.answeredQuestionsData);
        }
        // Note: We don't set currentQuestionIndex here because questions aren't loaded yet
        // It will be restored when questions load in the next useEffect
      }
    } catch (error) {
      console.error("Error loading progress from localStorage:", error);
    }
  }, []);

  // Save progress to localStorage
  const saveProgressToLocalStorage = () => {
    try {
      const progress = {
        lastQuestionIndex: currentQuestionIndex,
        lastQuestionId: currentQuestion?.id,
        answeredQuestions: Array.from(answeredQuestions),
        answeredQuestionsData,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(
        "free-style-practice-progress",
        JSON.stringify(progress),
      );
    } catch (error) {
      console.error("Error saving progress to localStorage:", error);
    }
  };

  // Save to localStorage whenever current question index or answered questions change
  useEffect(() => {
    if (currentQuestion) {
      saveProgressToLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentQuestionIndex,
    currentQuestion?.id,
    answeredQuestions,
    answeredQuestionsData,
  ]);

  const loadQuestion = (index: number) => {
    const filteredQuestions = getFilteredQuestions();
    if (
      filteredQuestions.length === 0 ||
      index < 0 ||
      index >= filteredQuestions.length
    ) {
      setCurrentQuestion(null);
      return;
    }

    const question = filteredQuestions[index];

    // Debug logging for "What is CSS?" question
    if (question.question?.includes("What is CSS")) {
      console.log('📚 Loading "What is CSS?" question:', {
        questionId: question.id,
        question: question.question,
        correctAnswerIndex: question.correctAnswer,
        options: question.options.map((opt, optIdx) => ({
          index: optIdx,
          letter: String.fromCharCode(65 + optIdx),
          text: opt.substring(0, 50) + "...",
          isCorrect: optIdx === question.correctAnswer,
        })),
      });
    }

    setCurrentQuestion(question);
    setCurrentQuestionIndex(index);
    setQuestionStartTime(Date.now());
    setInFlashcards(question ? isInFlashcards(question.id) : false);

    // Check if this question has been answered
    const answerData = answeredQuestionsData[question.id];
    if (answerData && answeredQuestions.has(question.id)) {
      // Restore previous answer state
      setSelectedAnswer(answerData.selectedAnswer);
      setIsCorrect(answerData.isCorrect);
      setShowExplanation(true);
    } else {
      // Reset for new unanswered question
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    }

    // Save current question index to localStorage
    saveProgressToLocalStorage();
  };

  const handleNextQuestion = () => {
    const filteredQuestions = getFilteredQuestions();

    // Auto-load more questions when approaching the end (within 5 questions)
    const isNearEnd = currentQuestionIndex >= filteredQuestions.length - 5;
    if (
      isNearEnd &&
      hasMoreQuestions &&
      !isLoadingQuestions &&
      questions.length < totalQuestionCount
    ) {
      const newLimit = Math.min(questionsLimit + 50, totalQuestionCount);
      console.log(
        `📥 Auto-loading more questions: ${questionsLimit} → ${newLimit}`,
      );
      setQuestionsLimit(newLimit);
      // Questions will auto-fetch via useEffect when limit changes
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      loadQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      loadQuestion(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showExplanation || !currentQuestion) return;

    setSelectedAnswer(answerIndex);

    // Ensure both values are numbers for comparison
    const selectedIndex = Number(answerIndex);
    const correctIndex = Number(currentQuestion.correctAnswer);
    const correct = selectedIndex === correctIndex;

    // Debug logging
    console.log("🔍 Answer Selection Debug:", {
      selectedIndex,
      selectedIndexType: typeof selectedIndex,
      expectedCorrectIndex: correctIndex,
      correctIndexType: typeof correctIndex,
      isCorrect: correct,
      questionId: currentQuestion.id,
      optionsCount: currentQuestion.options.length,
      rawCorrectAnswer: currentQuestion.correctAnswer,
      rawCorrectAnswerType: typeof currentQuestion.correctAnswer,
    });

    setIsCorrect(correct);
    setShowExplanation(true);

    // Track this question as answered
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestion.id);
    setAnsweredQuestions(newAnsweredQuestions);

    // Save answer data
    const newAnsweredData = {
      ...answeredQuestionsData,
      [currentQuestion.id]: {
        selectedAnswer: answerIndex,
        isCorrect: correct,
        timestamp: Date.now(),
      },
    };
    setAnsweredQuestionsData(newAnsweredData);

    // Calculate time spent on this question
    const timeSpent = Date.now() - questionStartTime;

    // Update session stats
    setSessionStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      correct: prev.correct + (correct ? 1 : 0),
      timeSpent: prev.timeSpent + Math.round(timeSpent / 1000),
    }));

    // Save progress securely
    if (isAuthenticated && currentQuestion) {
      try {
        const success = await saveProgress({
          sessionId: `free-style_${Date.now()}`,
          question_id: currentQuestion.id,
          answer: answerIndex,
          isCorrect: correct,
          timeSpent: Math.round(timeSpent / 1000), // Convert to seconds
          section: currentQuestion.section,
          difficulty: currentQuestion.difficulty,
          timestamp: Date.now(),
          learningMode: "free-style",
        });

        if (success) {
          console.log("✅ Progress saved successfully");
          // Refresh user progress after saving
          fetchUserProgress();
        } else {
          console.log("⚠️ Progress save failed, but continuing");
        }
      } catch (_error) {
        console.error("❌ Error saving progress:", _error);
        // Continue with the question flow even if progress save fails
      }
    }

    // Auto-add to flashcards on wrong answer
    if (!correct && currentQuestion) {
      const item: FlashcardItem = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        section: currentQuestion.section,
        difficulty: currentQuestion.difficulty,
        addedAt: Date.now(),
      };
      addFlashcard(item);
      setInFlashcards(true);
    }
  };

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      sections: [],
      difficulties: [],
      tags: [],
      categories: [],
      topics: [],
    });
    setSearchTerm("");
  };

  const getAccuracyPercentage = () => {
    if (sessionStats.total === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.total) * 100);
  };

  const getSessionTime = () => {
    return Math.round((Date.now() - sessionStartTime) / 1000 / 60); // minutes
  };

  if (isAuthLoading || isLoadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">
          Loading free style practice...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/free-style-roadmap")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Free Style Practice
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practice questions at your own pace
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/free-style-analytics")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {sessionStats.correct}/{sessionStats.total}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Session
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentQuestion
                    ? `${currentQuestionIndex + 1} / ${getFilteredQuestions().length}`
                    : "0 / 0"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {filters.categories.length > 0 ||
                  filters.difficulties.length > 0
                    ? `${questions.length} / ${filteredQuestionCount}`
                    : `${questions.length} / ${totalQuestionCount}`}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {filters.categories.length > 0 ||
                  filters.difficulties.length > 0
                    ? "Loaded / Filtered"
                    : "Loaded / Total"}
                  {filters.categories.length > 0 && (
                    <span className="block mt-0.5 text-purple-600 dark:text-purple-400">
                      {filteredQuestionCount} in selected{" "}
                      {filters.categories.length === 1
                        ? "category"
                        : "categories"}
                    </span>
                  )}
                </div>
              </div>
              {isAuthenticated && userProgress && (
                <div className="text-center border-l border-gray-300 dark:border-gray-600 pl-4">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {userProgress.totalQuestions}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Total Answered
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar - Always Visible - Modern Design */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            {/* Left Side: Search and Quick Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1 items-start sm:items-center">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                />
              </div>

              {/* Category Filter - Button-based */}
              <div className="relative category-dropdown-container">
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowTopicDropdown(false);
                    setShowDifficultyDropdown(false);
                    setShowLimitDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    filters.categories.length > 0
                      ? "bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <span>Category</span>
                  {filters.categories.length > 0 && (
                    <span className="bg-purple-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {filters.categories.length}
                    </span>
                  )}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Category Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[200px] max-h-64 overflow-y-auto">
                    <div className="p-2">
                      {categories.map((category) => {
                        const isSelected = filters.categories.includes(
                          category.id,
                        );
                        return (
                          <label
                            key={category.id}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setFilters((prev) => ({
                                    ...prev,
                                    categories: prev.categories.filter(
                                      (id) => id !== category.id,
                                    ),
                                  }));
                                } else {
                                  setFilters((prev) => ({
                                    ...prev,
                                    categories: prev.categories.includes(
                                      category.id,
                                    )
                                      ? prev.categories
                                      : [...prev.categories, category.id],
                                  }));
                                }
                              }}
                              className="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {category.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Topic Filter - Button-based */}
              <div className="relative topic-dropdown-container">
                <button
                  onClick={() => {
                    setShowTopicDropdown(!showTopicDropdown);
                    setShowCategoryDropdown(false);
                    setShowDifficultyDropdown(false);
                    setShowLimitDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    filters.topics.length > 0
                      ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <span>Topic</span>
                  {filters.topics.length > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {filters.topics.length}
                    </span>
                  )}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Topic Dropdown Menu */}
                {showTopicDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[200px] max-h-64 overflow-y-auto">
                    <div className="p-2">
                      {topics.length > 0 ? (
                        topics.map((topic) => {
                          const isSelected = filters.topics.includes(topic.id);
                          return (
                            <label
                              key={topic.id}
                              className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    setFilters((prev) => ({
                                      ...prev,
                                      topics: prev.topics.filter(
                                        (id) => id !== topic.id,
                                      ),
                                    }));
                                  } else {
                                    setFilters((prev) => ({
                                      ...prev,
                                      topics: prev.topics.includes(topic.id)
                                        ? prev.topics
                                        : [...prev.topics, topic.id],
                                    }));
                                  }
                                }}
                                className="mr-2 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {topic.name}
                              </span>
                            </label>
                          );
                        })
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                          No topics available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Difficulty Filter - Button-based */}
              <div className="relative difficulty-dropdown-container">
                <button
                  onClick={() => {
                    setShowDifficultyDropdown(!showDifficultyDropdown);
                    setShowCategoryDropdown(false);
                    setShowTopicDropdown(false);
                    setShowLimitDropdown(false);
                  }}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    filters.difficulties.length > 0
                      ? "bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <span>Difficulty</span>
                  {filters.difficulties.length > 0 && (
                    <span className="bg-purple-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {filters.difficulties.length}
                    </span>
                  )}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Difficulty Dropdown Menu */}
                {showDifficultyDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[160px]">
                    <div className="p-2">
                      {availableDifficulties.map((difficulty) => {
                        const isSelected =
                          filters.difficulties.includes(difficulty);
                        return (
                          <label
                            key={difficulty}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setFilters((prev) => ({
                                    ...prev,
                                    difficulties: prev.difficulties.filter(
                                      (d) => d !== difficulty,
                                    ),
                                  }));
                                } else {
                                  setFilters((prev) => ({
                                    ...prev,
                                    difficulties: prev.difficulties.includes(
                                      difficulty,
                                    )
                                      ? prev.difficulties
                                      : [...prev.difficulties, difficulty],
                                  }));
                                }
                              }}
                              className="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {difficulty}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Limit Dropdown - In Filters Bar */}
              <div className="relative limit-dropdown-container">
                <button
                  onClick={() => {
                    setShowLimitDropdown(!showLimitDropdown);
                    setShowCategoryDropdown(false);
                    setShowTopicDropdown(false);
                    setShowDifficultyDropdown(false);
                  }}
                  disabled={isLoadingQuestions}
                  className={`px-3 py-2 text-sm border rounded-lg transition-all flex items-center space-x-1.5 ${
                    isLoadingQuestions
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    questionsLimit !== 5
                      ? "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <span>Load: {questionsLimit}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Limit Dropdown Menu */}
                {showLimitDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[220px] max-h-96 overflow-y-auto">
                    <div className="p-2">
                      {/* Quick Options */}
                      {totalQuestionCount > 0 && totalQuestionCount <= 200 ? (
                        // If total is small, show all options
                        <div>
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            Select Limit
                          </div>
                          {Array.from(
                            { length: Math.min(totalQuestionCount - 4, 100) },
                            (_, i) => i + 5,
                          ).map((limit) => (
                            <button
                              key={limit}
                              onClick={() => {
                                setQuestionsLimit(limit);
                                setShowLimitDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                questionsLimit === limit
                                  ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {limit} questions
                            </button>
                          ))}
                        </div>
                      ) : (
                        // For large totals, show quick selects + custom input
                        <>
                          <div className="pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                              Quick Select
                            </div>
                            {[5, 10, 25, 50, 100, 200, 500].map((limit) => {
                              if (limit > (totalQuestionCount || 0))
                                return null;
                              return (
                                <button
                                  key={limit}
                                  onClick={() => {
                                    setQuestionsLimit(limit);
                                    setShowLimitDropdown(false);
                                  }}
                                  className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                    questionsLimit === limit
                                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium"
                                      : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {limit} questions
                                </button>
                              );
                            })}
                          </div>

                          {/* All Questions Option */}
                          {totalQuestionCount > 0 && (
                            <div className="pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() => {
                                  setQuestionsLimit(totalQuestionCount);
                                  setShowLimitDropdown(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  questionsLimit === totalQuestionCount
                                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                All ({totalQuestionCount} questions)
                              </button>
                            </div>
                          )}

                          {/* Custom Input */}
                          <div>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                              Custom (5 - {totalQuestionCount || "N/A"})
                            </div>
                            <div className="flex items-center gap-2 px-2">
                              <input
                                type="number"
                                min={5}
                                max={totalQuestionCount || 1000}
                                value={questionsLimit}
                                onChange={(e) => {
                                  const value = Math.min(
                                    Math.max(5, Number(e.target.value) || 5),
                                    totalQuestionCount || 1000,
                                  );
                                  setQuestionsLimit(value);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setShowLimitDropdown(false);
                                  }
                                }}
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter number"
                              />
                              <button
                                onClick={() => setShowLimitDropdown(false)}
                                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                              >
                                Set
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Clear Filters Button */}
              {(filters.categories.length > 0 ||
                filters.topics.length > 0 ||
                filters.difficulties.length > 0 ||
                filters.sections.length > 0 ||
                filters.tags.length > 0 ||
                searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Selected Filters Chips */}
          {(filters.categories.length > 0 ||
            filters.topics.length > 0 ||
            filters.difficulties.length > 0) && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
              {/* Deduplicate categories to prevent duplicate keys */}
              {Array.from(new Set(filters.categories)).map((catId) => {
                const category = categories.find((c) => c.id === catId);
                return category ? (
                  <span
                    key={catId}
                    className="inline-flex items-center px-2.5 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md"
                  >
                    {category.name}
                    <button
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          categories: prev.categories.filter(
                            (id) => id !== catId,
                          ),
                        }));
                      }}
                      className="ml-1.5 hover:text-purple-900 dark:hover:text-purple-100"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
              {/* Deduplicate topics to prevent duplicate keys */}
              {Array.from(new Set(filters.topics)).map((topicId) => {
                const topic = topics.find((t) => t.id === topicId);
                return topic ? (
                  <span
                    key={topicId}
                    className="inline-flex items-center px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-md"
                  >
                    {topic.name}
                    <button
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          topics: prev.topics.filter((id) => id !== topicId),
                        }));
                      }}
                      className="ml-1.5 hover:text-indigo-900 dark:hover:text-indigo-100"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
              {/* Deduplicate difficulties to prevent duplicate keys */}
              {Array.from(new Set(filters.difficulties)).map((diff) => (
                <span
                  key={diff}
                  className="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md"
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  <button
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        difficulties: prev.difficulties.filter(
                          (d) => d !== diff,
                        ),
                      }));
                    }}
                    className="ml-1.5 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* No Questions Message */}
        {!isLoadingQuestions && getFilteredQuestions().length === 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {questions.length === 0 && totalQuestionCount === 0
                ? "No Questions Available"
                : "No Questions Match Your Filters"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {questions.length === 0 && totalQuestionCount === 0
                ? "There are no questions in the database yet. Please check back later or contact support."
                : questions.length === 0 && totalQuestionCount > 0
                  ? `There are ${totalQuestionCount} questions in the database, but none could be loaded. Please check the browser console for errors.`
                  : `You have ${questions.length} questions loaded, but none match your current filters. Try adjusting your search criteria.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {questions.length === 0 && totalQuestionCount > 0 && (
                <button
                  onClick={() => {
                    console.log("Reloading questions...");
                    fetchQuestions();
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Reload Questions
                </button>
              )}
              {questions.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Single Question Card */}
        {!isLoadingQuestions && currentQuestion && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {currentQuestion.section}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {currentQuestion.difficulty} difficulty
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {currentQuestion.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {/* Manual add to flashcards */}
                <button
                  title={
                    inFlashcards ? "Added to Flashcards" : "Add to Flashcards"
                  }
                  onClick={() => {
                    if (!currentQuestion) return;
                    if (inFlashcards) return;
                    const item: FlashcardItem = {
                      id: currentQuestion.id,
                      question: currentQuestion.question,
                      section: currentQuestion.section,
                      difficulty: currentQuestion.difficulty,
                      addedAt: Date.now(),
                    };
                    addFlashcard(item);
                    setInFlashcards(true);
                  }}
                  className={`ml-2 p-2 rounded-md border transition-colors ${
                    inFlashcards
                      ? "border-green-300 text-green-600 dark:text-green-400"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {inFlashcards ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <BookmarkPlus className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {formatTextWithCode(currentQuestion.question)}
            </h3>

            {currentQuestion.content && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <QuestionContent content={currentQuestion.content} />
              </div>
            )}

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : selectedAnswer === index
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      : selectedAnswer === index
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showExplanation
                          ? index === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-500"
                            : selectedAnswer === index
                              ? "border-red-500 bg-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          : selectedAnswer === index
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {showExplanation &&
                        index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      {showExplanation &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correctAnswer && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                    </div>
                    <span className="text-gray-900 dark:text-white flex-1 break-words">
                      {formatTextWithCode(option)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-6 space-y-4">
                {/* Answer Result Card */}
                <div
                  className={`rounded-xl p-5 border-2 ${
                    isCorrect
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCorrect
                          ? "bg-green-500 dark:bg-green-600"
                          : "bg-red-500 dark:bg-red-600"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-bold text-lg mb-2 ${
                          isCorrect
                            ? "text-green-900 dark:text-green-100"
                            : "text-red-900 dark:text-red-100"
                        }`}
                      >
                        {isCorrect ? "Correct Answer!" : "Incorrect Answer"}
                      </h4>
                      <p
                        className={`text-sm ${
                          isCorrect
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        The correct answer is{" "}
                        <span className="font-semibold">
                          {String.fromCharCode(
                            65 + currentQuestion.correctAnswer,
                          )}
                          :{" "}
                          {formatTextWithCode(
                            currentQuestion.options[
                              currentQuestion.correctAnswer
                            ],
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explanation Card */}
                {currentQuestion.explanation && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-3">
                          Explanation
                        </h4>
                        <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base text-blue-800 dark:text-blue-200">
                          <QuestionContent
                            content={currentQuestion.explanation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Question Status Indicator */}
            {answeredQuestions.has(currentQuestion.id) && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle
                    className={`w-5 h-5 ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  />
                  <span
                    className={`text-sm font-medium ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
                  >
                    {isCorrect ? "Correct ✓" : "Incorrect ✗"} - This question
                    was answered previously
                  </span>
                </div>
              </div>
            )}

            {/* Completion Check */}
            {(() => {
              const filteredQuestions = getFilteredQuestions();
              const allAnswered =
                filteredQuestions.length > 0 &&
                filteredQuestions.every((q) => answeredQuestions.has(q.id));
              const isLastQuestion =
                currentQuestionIndex >= filteredQuestions.length - 1 &&
                !hasMoreQuestions;

              return allAnswered && isLastQuestion ? (
                <div className="mb-6 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white text-center shadow-lg">
                  <Trophy className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-green-100 mb-6">
                    You&apos;ve completed all questions in this session!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Go to Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        // Reset session
                        localStorage.removeItem("free-style-practice-progress");
                        setAnsweredQuestions(new Set());
                        setAnsweredQuestionsData({});
                        setSessionStats({ correct: 0, total: 0, timeSpent: 0 });
                        setCurrentQuestionIndex(0);
                        if (filteredQuestions.length > 0) {
                          loadQuestion(0);
                        }
                      }}
                      className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                      <span>Start New Session</span>
                    </button>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of{" "}
                  {getFilteredQuestions().length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {answeredQuestions.size} answered •{" "}
                  {getFilteredQuestions().length - answeredQuestions.size}{" "}
                  remaining
                </div>
                {answeredQuestions.size > 0 && (
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Clear all progress? This will reset all answered questions.",
                        )
                      ) {
                        localStorage.removeItem("free-style-practice-progress");
                        setAnsweredQuestions(new Set());
                        setAnsweredQuestionsData({});
                        setSelectedAnswer(null);
                        setShowExplanation(false);
                        setIsCorrect(null);
                        console.log("✅ Progress cleared");
                      }
                    }}
                    className="mt-2 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
                  >
                    Clear Progress
                  </button>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex >= getFilteredQuestions().length - 1 &&
                  !hasMoreQuestions
                }
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                <span>
                  {isLoadingQuestions &&
                  currentQuestionIndex >= getFilteredQuestions().length - 5
                    ? "Loading..."
                    : "Next"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Session Stats */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 mt-12 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Session Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sessionStats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Questions Answered
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {getAccuracyPercentage()}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Accuracy Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {getSessionTime()}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Time Spent
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress (if authenticated) */}
        {isAuthenticated && userProgress && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Overall Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProgress.totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProgress.correctAnswers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Correct Answers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProgress.accuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Overall Accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(userProgress.timeSpent / 60)}m
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Time
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
