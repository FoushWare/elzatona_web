"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// NOTE: Type safety improvements tracked in refactoring task 401-reduce-any
// This component will be refactored to use explicit types
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { sanitizeText } from "./utils/sanitize";

// Helper functions to reduce cognitive complexity
function checkCodeIndicators(trimmed: string): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

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
    /\{[^}]*\}/,
    /\[[^\]]*\]/,
    /\([^)]*\)\s*\{/,
    /=\s*\{/,
    /=\s*\[/,
    /:\s*function/,
    /:\s*\(/,
  ];

  structurePatterns.forEach((pattern) => {
    if (pattern.test(trimmed)) {
      score += 2;
      reasons.push("Code structure pattern found");
    }
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

  return { score, reasons };
}

function checkCodeStructure(
  trimmed: string,
  lines: string[],
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

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

  return { score, reasons };
}

function checkTextIndicators(trimmed: string): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

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

  return { score, reasons };
}

function checkTextStructure(
  trimmed: string,
  lines: string[],
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

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

  return { score, reasons };
}

// Helper function to determine if content is valid code or should be rendered as text
// Uses a scoring system to make intelligent decisions
export const isValidCode = (
  content: string,
): { isValid: boolean; score: number; reasons: string[] } => {
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return { isValid: false, score: 0, reasons: ["Empty or invalid content"] };
  }

  const trimmed = content.trim();
  const lines = trimmed.split("\n");

  const codeIndicators = checkCodeIndicators(trimmed);
  const codeStructure = checkCodeStructure(trimmed, lines);
  const textIndicators = checkTextIndicators(trimmed);
  const textStructure = checkTextStructure(trimmed, lines);

  const score =
    codeIndicators.score +
    codeStructure.score +
    textIndicators.score +
    textStructure.score;

  const reasons = [
    ...codeIndicators.reasons,
    ...codeStructure.reasons,
    ...textIndicators.reasons,
    ...textStructure.reasons,
  ];

  const MIN_CODE_SCORE = 5;
  const isValid = score >= MIN_CODE_SCORE;

  return {
    isValid,
    score,
    reasons,
  };
};

// Helper function to format and normalize code content
export const formatCodeContent = (code: string): string => {
  if (!code) return "";

  let formatted = code.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  formatted = formatted.trim();
  const lines = formatted.split("\n").map((line) => line.trimEnd());

  if (lines.length === 0) return "";

  const hasExistingIndent = lines.some(
    (line) => line.trim().length > 0 && /^\s/.test(line),
  );

  if (hasExistingIndent === false) {
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
          indentLevel++;
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
          indentLevel++;
          return indent + trimmed;
        }

        // Helper function to count occurrences using RegExp.exec()
        const countOccurrences = (text: string, pattern: RegExp): number => {
          let count = 0;
          pattern.lastIndex = 0;
          while (pattern.exec(text) !== null) {
            count++;
          }
          pattern.lastIndex = 0;
          return count;
        };

        const openBraces = countOccurrences(trimmed, /{/g);
        const closeBraces = countOccurrences(trimmed, /}/g);
        const openBrackets = countOccurrences(trimmed, /\[/g);
        const closeBrackets = countOccurrences(trimmed, /\]/g);
        const openParens = countOccurrences(trimmed, /\(/g);
        const closeParens = countOccurrences(trimmed, /\)/g);

        const netBraces = openBraces - closeBraces;
        const netBrackets = openBrackets - closeBrackets;
        const netParens = openParens - closeParens;

        const closingBracketRegex = /^[}\])]/;
        if (closingBracketRegex.exec(trimmed)) {
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

        const openingBracketRegex = /[{[(]\s*$/;
        if (openingBracketRegex.exec(trimmed)) {
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
        const whitespaceRegex = /^(\s*)/;
        const match = whitespaceRegex.exec(line);
        return match ? match[1].length : 0;
      });

    if (indentations.length > 0) {
      const minIndent = Math.min(...indentations);

      formatted = lines
        .map((line) => {
          if (line.trim().length === 0) return "";

          const leadingWhitespaceRegex = /^(\s*)/;
          const leadingWhitespaceMatch = leadingWhitespaceRegex.exec(line);
          const leadingWhitespace = leadingWhitespaceMatch?.[1] || "";
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

  formatted = formatted.replaceAll(/\n{3,}/g, "\n\n");

  return formatted;
};

// Helper function to decode HTML entities
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
    decoded = decoded.replaceAll(new RegExp(entity, "gi"), char);
  }

  decoded = decoded.replaceAll(/&#(\d+);/g, (match, dec) => {
    return String.fromCodePoint(Number.parseInt(dec, 10));
  });

  decoded = decoded.replaceAll(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCodePoint(Number.parseInt(hex, 16));
  });

  if (globalThis.window !== undefined) {
    try {
      const textarea = document.createElement("textarea");
      // Use textContent instead of innerHTML to prevent XSS
      textarea.textContent = decoded;
      decoded = textarea.value;
    } catch (error_) {
      console.warn("Failed to decode HTML entities:", error_);
    }
  }

  return decoded;
};

// Helper function to fix malformed HTML patterns
function fixMalformedHtml(content: string): string {
  let fixed = content;
  for (let i = 0; i < 3; i++) {
    fixed = fixed
      .replaceAll(/<pr<cod<cod/gi, "<pre><code>")
      .replaceAll(/<pr<code<code/gi, "<pre><code>")
      .replaceAll(/<pr<codee<code/gi, "<pre><code>")
      .replaceAll(/<pr<codee<cod/gi, "<pre><code>")
      .replaceAll(/<pr<code<cod/gi, "<pre><code>")
      .replaceAll(/<pr<codee/gi, "<pre><code>")
      .replaceAll(/<pr<code/gi, "<pre><code>")
      .replaceAll(/<pr<cod/gi, "<pre><code>")
      .replaceAll(/<pr<co/gi, "<pre><code>")
      .replaceAll(/<pr</gi, "<pre>")
      .replaceAll(/<\/cod<\/cod<\/pr/gi, "</code></pre>")
      .replaceAll(/<\/code<\/code<\/pr/gi, "</code></pre>")
      .replaceAll(/<\/codee<\/codee<\/pree/gi, "</code></pre>")
      .replaceAll(/<\/cod<\/cod<\/pree/gi, "</code></pre>")
      .replaceAll(/<\/code<\/code<\/pree/gi, "</code></pre>")
      .replaceAll(/<\/codee<\/pree/gi, "</code></pre>")
      .replaceAll(/<\/cod<\/pree/gi, "</code></pre>")
      .replaceAll(/<\/code<\/pree/gi, "</code></pre>")
      .replaceAll(/<\/code><\/pre>e>/gi, "</code></pre>")
      .replaceAll(/<\/code><\/pre>\s*e>/gi, "</code></pre>")
      .replaceAll(/<\/pree/gi, "</pre>")
      .replaceAll(/<\/codee/gi, "</code>")
      .replaceAll(/<\/cod/gi, "</code>")
      .replaceAll(/efor\s*\(/gi, "for (")
      .replaceAll(/efor\s+/gi, "for ")
      .replaceAll(/econsole\./gi, "console.")
      .replaceAll(/econsole\.log/gi, "console.log")
      .replaceAll(/<cod(\w)/gi, "<code>$1")
      .replaceAll(/<code(\w)/gi, "<code>$1")
      .replaceAll(/(\w)<\/cod/gi, "$1</code>")
      .replaceAll(/(\w)<\/code/gi, "$1</code>")
      .replaceAll(/<cod(\d+\w+)/gi, "<code>$1</code>")
      .replaceAll(/<cod(\d+)/gi, "<code>$1</code>");
  }
  return fixed;
}

// Helper function to find matching close tag
function findMatchingCloseTag(
  html: string,
  openTag: string,
  closeTag: string,
  startIndex: number,
): number {
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
}

// Helper function to extract code from <pre><code> blocks
function extractCodeFromPreCode(fixedHtml: string): string | null {
  const preStart = fixedHtml.indexOf("<pre");
  if (preStart === -1) return null;

  const codeStart = fixedHtml.indexOf("<code", preStart);
  if (codeStart === -1) return null;

  const contentStart = fixedHtml.indexOf(">", codeStart) + 1;
  const codeEnd = findMatchingCloseTag(
    fixedHtml,
    "<code",
    "</code>",
    codeStart + "<code".length,
  );
  if (codeEnd > contentStart) {
    return fixedHtml.substring(contentStart, codeEnd);
  }
  return null;
}

// Helper function to extract code from <code> blocks
function extractCodeFromCode(fixedHtml: string): string | null {
  const codeStart = fixedHtml.indexOf("<code");
  if (codeStart === -1) return null;

  const contentStart = fixedHtml.indexOf(">", codeStart) + 1;
  const codeEnd = findMatchingCloseTag(
    fixedHtml,
    "<code",
    "</code>",
    codeStart + "<code".length,
  );
  if (codeEnd > contentStart) {
    return fixedHtml.substring(contentStart, codeEnd);
  }
  return null;
}

// Helper function to clean code patterns
function cleanCodePatterns(code: string): string {
  let cleaned = code;
  for (let pass = 0; pass < 3; pass++) {
    cleaned = cleaned
      .replace("e>e>e>", "")
      .replace("e>e>", "")
      .replaceAll(/^e>+/g, "")
      .replaceAll(/e>+$/g, "")
      .replaceAll(/(\w+)e>/g, "$1")
      .replaceAll(/e>(\w+)/g, "$1")
      .replaceAll(/\s*e>\s*/g, " ")
      .replace("consoleonsole.loge>.log", "console.log")
      .replace("consoleonsole.log", "console.log")
      .replace("console.loge>.log", "console.log")
      .replace("console.loge>", "console.log")
      .replace("console.log>", "console.log")
      .replace("console.loge.log", "console.log")
      .replace("console.log.log", "console.log")
      .replaceAll(/(\w+)onsole\.log/g, "console.log")
      .replaceAll(/console\.log([^a-zA-Z])/g, "console.log$1")
      .replace("diameterameter", "diameter")
      .replace("perimeterimeter", "perimeter")
      .replace("newColorwColor", "newColor")
      .replaceAll(/(\w+)ameter/g, "$1")
      .replaceAll(/(\w+)imeter/g, "$1")
      .replace("NaNe>NaN", "NaN")
      .replace("NaNe>", "NaN")
      .replace("NaN>", "NaN")
      .replaceAll(/(\w{1,50})\s*<\s*(\d{1,10})\s*>/g, "$1 < $2 >")
      .replaceAll(/(\w{1,50})\s*<\s*(\d{1,10})/g, "$1 < $2")
      .replaceAll(/(\d{1,10})\s*>/g, "$1 >")
      .replaceAll(/<\/?[a-z][a-z0-9]{0,20}(?:\s+[^>]{0,200})?>/gi, "")
      .replaceAll(/^>\s*/g, "")
      .replaceAll(/\s*>$/g, "")
      .replaceAll(/\s+>\s+/g, " ");
  }

  for (let i = 0; i < 2; i++) {
    cleaned = cleaned
      .replace("e>e>e>", "")
      .replace("e>e>", "")
      .replaceAll(/^e>+/g, "")
      .replaceAll(/e>+$/g, "")
      .replaceAll(/(\w+)e>/g, "$1")
      .replaceAll(/e>(\w+)/g, "$1")
      .replaceAll(/\s*e>\s*/g, " ")
      .replaceAll(/<\/cod<\/pr/gi, "")
      .replaceAll(/<\/code<\/pr/gi, "")
      .replaceAll(/<\/pr/gi, "")
      .replaceAll(/<\/cod/gi, "")
      .replaceAll(/^>\s*/g, "")
      .replaceAll(/\s*>$/g, "")
      .replaceAll(/\s+>\s+/g, " ");
  }

  return cleaned;
}

// Helper function to extract code from HTML
function extractCodeFromHtml(html: string): string {
  if (!html) return "";

  if (
    !html.includes("<pre") &&
    !html.includes("<code") &&
    !html.includes("&lt;")
  ) {
    let code = decodeHtmlEntities(html);
    code = formatCodeContent(code);
    return code;
  }

  const fixedHtml = fixMalformedHtml(html);

  // Try to extract from <pre><code> first, then <code>
  let code =
    extractCodeFromPreCode(fixedHtml) || extractCodeFromCode(fixedHtml) || html;

  // SECURITY: Limit input size before processing to prevent ReDoS
  const MAX_CODE_LENGTH = 50000; // 50KB limit
  if (code.length > MAX_CODE_LENGTH) {
    console.warn("Code content too large, truncating for safety");
    code = code.substring(0, MAX_CODE_LENGTH);
  }

  code = decodeHtmlEntities(code);

  // Decode entities iteratively until stable
  let previousCode = "";
  let iterations = 0;
  const maxIterations = 20;

  while (code !== previousCode && iterations < maxIterations) {
    previousCode = code;
    code = decodeHtmlEntities(code);
    code = sanitizeText(code);
    iterations++;
  }

  code = decodeHtmlEntities(code);
  code = cleanCodePatterns(code);
  code = formatCodeContent(code);

  return code;
}

// Helper function to process HTML code blocks
function processHtmlCodeBlocks(
  fixedContent: string,
  extractCodeFromHtml: (html: string) => string,
): Array<{ index: number; content: string; fullMatch: string }> {
  const htmlCodeBlockPatterns = [
    /<pre[^>]{0,200}><code[^>]{0,200}>[\s\S]{0,50000}?<\/code><\/pre>/gi,
    /<pr<cod[^>]{0,200}>[\s\S]{0,50000}?<\/cod<\/pr/gi,
    /<pr<code[^>]{0,200}>[\s\S]{0,50000}?<\/code<\/pr/gi,
    /<code[^>]{0,200}>[\s\S]{20,50000}?<\/code>/gi,
  ];

  const htmlMatches: Array<{
    index: number;
    content: string;
    fullMatch: string;
  }> = [];
  const processedIndices = new Set<number>();
  const MAX_ITERATIONS = 1000;
  let iterationCount = 0;

  for (const pattern of htmlCodeBlockPatterns) {
    if (iterationCount >= MAX_ITERATIONS) break;
    pattern.lastIndex = 0;
    let htmlMatch: RegExpExecArray | null;

    while (
      (htmlMatch = pattern.exec(fixedContent)) !== null &&
      iterationCount < MAX_ITERATIONS
    ) {
      iterationCount++;
      const match = htmlMatch;
      const isDuplicate = Array.from(processedIndices).some(
        (idx) => Math.abs(idx - match.index) < 10,
      );
      if (isDuplicate) continue;

      processedIndices.add(match.index);
      let matchContent = match[0];
      matchContent = matchContent
        .replaceAll(/<pr<cod/gi, "<pre><code>")
        .replaceAll(/<pr<code/gi, "<pre><code>")
        .replaceAll(/<\/cod<\/pr/gi, "</code></pre>")
        .replaceAll(/<\/code<\/pr/gi, "</code></pre>");

      const extractedCode = extractCodeFromHtml(matchContent);
      if (extractedCode) {
        htmlMatches.push({
          index: match.index,
          content: extractedCode,
          fullMatch: match[0],
        });
      }
    }
  }

  return htmlMatches;
}

// Helper function to clean malformed code content
function cleanMalformedCode(code: string): string {
  const MAX_INPUT_SIZE = 100000;
  if (code.length > MAX_INPUT_SIZE) {
    code = code.substring(0, MAX_INPUT_SIZE);
  }

  code = decodeHtmlEntities(code);
  code = sanitizeText(code);

  // Loop until content stabilizes — prevents incomplete multi-character sanitization
  let previousCode = "";
  for (let i = 0; i < 5 && code !== previousCode; i++) {
    previousCode = code;
    code = code
      .replace("e>e>e>", "")
      .replace("e>e>", "")
      .replaceAll(/^e>+/g, "")
      .replaceAll(/e>+$/g, "")
      .replaceAll(/(\w+)e>/g, "$1")
      .replace("consoleonsole.log", "console.log")
      .replace("console.loge>", "console.log")
      .replace("diameterameter", "diameter")
      .replace("perimeterimeter", "perimeter")
      .replace("newColorwColor", "newColor")
      .replace("NaNe>", "NaN");
    // SECURITY: Final sanitization pass after each iteration — DOMPurify removes all HTML tags
    code = sanitizeText(code);
  }

  return formatCodeContent(code);
}

// Helper function to check if a match index is already captured
function isAlreadyCaptured(
  matchIndex: number,
  htmlMatches: Array<{ index: number; content: string; fullMatch: string }>,
): boolean {
  return htmlMatches.some((m) => Math.abs(m.index - matchIndex) < 10);
}

// Helper function to process a single malformed match
function processMalformedMatch(
  malformedMatch: RegExpExecArray,
  htmlMatches: Array<{ index: number; content: string; fullMatch: string }>,
): void {
  const MAX_INPUT_SIZE = 100000;
  if (!malformedMatch[1]) return;

  const alreadyCaptured = isAlreadyCaptured(malformedMatch.index, htmlMatches);
  if (alreadyCaptured) return;

  let code = malformedMatch[1];
  if (code.length > MAX_INPUT_SIZE) {
    code = code.substring(0, MAX_INPUT_SIZE);
  }

  code = cleanMalformedCode(code);

  if (code.trim()) {
    htmlMatches.push({
      index: malformedMatch.index,
      content: code,
      fullMatch: malformedMatch[0],
    });
  }
}

// Helper function to process malformed HTML patterns
function processMalformedPatterns(
  fixedContent: string,
  htmlMatches: Array<{ index: number; content: string; fullMatch: string }>,
): Array<{ index: number; content: string; fullMatch: string }> {
  const MAX_INPUT_SIZE = 100000;
  if (fixedContent.length > MAX_INPUT_SIZE) {
    fixedContent = fixedContent.substring(0, MAX_INPUT_SIZE);
  }

  const malformedPattern =
    /<pr<cod[^>]{0,200}>([\s\S]{0,50000}?)(?:<\/cod<\/pr|$)/gi;
  malformedPattern.lastIndex = 0;
  let malformedIterations = 0;
  const MAX_MALFORMED_ITERATIONS = 100;

  let malformedMatch: RegExpExecArray | null;
  while (
    (malformedMatch = malformedPattern.exec(fixedContent)) !== null &&
    malformedIterations < MAX_MALFORMED_ITERATIONS
  ) {
    malformedIterations++;
    if (!malformedMatch) break;

    processMalformedMatch(malformedMatch, htmlMatches);
  }

  return htmlMatches;
}

// Helper function to process markdown code blocks
function processMarkdownCodeBlocks(fixedContent: string): Array<{
  index: number;
  content: string;
  language?: string;
  fullMatch: string;
}> {
  const markdownCodeBlockRegex = /```(\w{1,20})?\n([\s\S]{1,50000})```/g;
  const markdownMatches: Array<{
    index: number;
    content: string;
    language?: string;
    fullMatch: string;
  }> = [];
  let mdMatch;

  markdownCodeBlockRegex.lastIndex = 0;

  while ((mdMatch = markdownCodeBlockRegex.exec(fixedContent)) !== null) {
    // SECURITY: Sanitize markdown code block content to prevent HTML injection
    let sanitizedContent = mdMatch[2].trim();
    // Decode HTML entities first, then loop-sanitize to remove any HTML tags (prevents nested tag bypass)
    sanitizedContent = decodeHtmlEntities(sanitizedContent);
    let prev = "";
    while (sanitizedContent !== prev) {
      prev = sanitizedContent;
      sanitizedContent = sanitizeText(sanitizedContent);
    }

    markdownMatches.push({
      index: mdMatch.index,
      content: sanitizedContent,
      language: mdMatch[1] || "javascript",
      fullMatch: mdMatch[0],
    });
  }

  return markdownMatches;
}

// Helper function to clean text content
function cleanTextContent(text: string): string {
  let cleanText = decodeHtmlEntities(text);
  // NOSONAR S7781: replaceAll() cannot be used with regex patterns that require capture groups
  const codeTagRegex = /<code[^>]{0,200}>([^<]{1,30})<\/code>/gi;
  let codeMatch;
  while ((codeMatch = codeTagRegex.exec(cleanText)) !== null) {
    cleanText = cleanText.replace(codeMatch[0], `\`${codeMatch[1]}\``);
  }
  cleanText = sanitizeText(cleanText);
  // Loop until content stabilizes — prevents incomplete multi-character sanitization
  let previousClean = "";
  for (let i = 0; i < 5 && cleanText !== previousClean; i++) {
    previousClean = cleanText;
    cleanText = cleanText
      .replaceAll(/<pr<cod?/gi, "")
      .replaceAll(/<pr</gi, "")
      .replaceAll(/<pr/gi, "")
      .replaceAll(/<\/cod?<\/pr/gi, "")
      .replaceAll(/<\/cod?/gi, "")
      .replaceAll(/<\/pr/gi, "")
      .replaceAll(/<\/cod/gi, "")
      .replace("e>e>e>", "")
      .replace("e>e>", "")
      .replaceAll(/^e>+/g, "")
      .replaceAll(/e>+$/g, "")
      .replaceAll(/(\w+)e>/g, "$1")
      .replaceAll(/e>(\w+)/g, "$1")
      .replaceAll(/\s*e>\s*/g, " ")
      .replaceAll(/^>\s*/g, "")
      .replaceAll(/\s*>$/g, "")
      .replaceAll(/\s+>\s+/g, " ");
    // SECURITY: Final sanitization pass after each iteration — DOMPurify removes all HTML tags
    cleanText = sanitizeText(cleanText);
  }
  cleanText = cleanText
    .replaceAll(/[ \t]+/g, " ")
    .replaceAll(/\n\s*\n/g, "\n\n")
    .trim();
  return cleanText;
}

// Helper function to clean code content
function cleanCodeContent(code: string): string {
  let cleanCode = code;
  for (let i = 0; i < 2; i++) {
    cleanCode = cleanCode
      .replace("e>e>e>", "")
      .replace("e>e>", "")
      .replaceAll(/^e>+/g, "")
      .replaceAll(/e>+$/g, "")
      .replaceAll(/(\w+)e>/g, "$1")
      .replaceAll(/e>(\w+)/g, "$1")
      .replaceAll(/\s*e>\s*/g, " ")
      .replaceAll(/<\/cod<\/pr/gi, "")
      .replaceAll(/<\/code<\/pr/gi, "")
      .replaceAll(/<\/pr/gi, "")
      .replaceAll(/<\/cod/gi, "")
      .replaceAll(/^>\s*/g, "")
      .replaceAll(/\s*>$/g, "")
      .replaceAll(/\s+>\s+/g, " ");
    cleanCode = sanitizeText(cleanCode);
  }
  return formatCodeContent(cleanCode);
}

// Helper function to process final text content when no parts exist
function processFinalTextContent(
  fixedContent: string,
): React.ReactElement | null {
  const MAX_INPUT_SIZE = 100000;
  let cleanContent = decodeHtmlEntities(fixedContent);

  if (cleanContent.length > MAX_INPUT_SIZE) {
    cleanContent = cleanContent.substring(0, MAX_INPUT_SIZE);
  }
  for (let i = 0; i < 3; i++) {
    cleanContent = cleanContent
      .replaceAll(/<pr<cod/gi, "")
      .replaceAll(/<\/cod<\/pr/gi, "")
      .replaceAll(/<pr</gi, "")
      .replaceAll(/<\/cod/gi, "")
      .replaceAll(/<\/pr/gi, "")
      // NOSONAR S7781: replaceAll() cannot be used with regex patterns that require complex matching
      .replaceAll(/<\/?[a-z][a-z0-9]{0,20}(?:\s+[^>]{0,200})?>/gi, "")
      .replaceAll(/<pr/gi, "")
      .replaceAll(/<[^>]+>/g, "")
      .replace("e>e>e>", "")
      .replace("e>e>", "")
      .replaceAll(/^e>+/g, "")
      .replaceAll(/e>+$/g, "")
      .replaceAll(/(\w+)e>/g, "$1")
      .replaceAll(/e>(\w+)/g, "$1")
      .replaceAll(/\s*e>\s*/g, " ")
      .replaceAll(/^>\s*/g, "")
      .replaceAll(/\s*>$/g, "")
      .replaceAll(/\s+>\s+/g, " ");
  }

  cleanContent = sanitizeText(cleanContent).trim();

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
              ...({ WebkitTabSize: 2, MozTabSize: 2 } as any),
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              letterSpacing: "0.01em",
            }}
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
                ...({ WebkitTabSize: 2, MozTabSize: 2 } as any),
                wordBreak: "normal",
                overflowWrap: "normal",
                letterSpacing: "0.01em",
              }}
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

// PreTag component for SyntaxHighlighter (extracted to reduce complexity)
const CodeBlockPreTag = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"pre">) => (
  <pre
    {...props}
    style={{
      margin: 0,
      padding: 0,
      backgroundColor: "transparent",
    }}
  >
    {children}
  </pre>
);

// Component to render a code block
const CodeBlock = ({
  part,
  partId,
}: {
  part: { content: string; language?: string };
  partId: string;
}) => (
  <div
    key={partId}
    className="relative group my-4 sm:my-6"
    style={{ backgroundColor: "#1e1e1e" }}
  >
    <div
      className="flex items-center justify-end px-4 py-2.5 rounded-t-xl border-b-2 shadow-sm"
      style={{
        background: "linear-gradient(to right, #252526, #1e1e1e)",
        borderColor: "#3e3e42",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md"
        style={{
          color: "#cccccc",
          backgroundColor: "rgba(62, 62, 66, 0.5)",
        }}
      >
        {part.language || "javascript"}
      </span>
    </div>
    <div
      className="relative overflow-hidden rounded-b-xl border-x-2 border-b-2 shadow-lg"
      style={{ backgroundColor: "#1e1e1e", borderColor: "#3e3e42" }}
    >
      <SyntaxHighlighter
        language={part.language?.toLowerCase() || "javascript"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem 1.75rem",
          backgroundColor: "#1e1e1e",
          fontSize: "0.875rem",
          lineHeight: "1.8",
          fontFamily:
            '"JetBrains Mono", "Fira Code", "SF Mono", "Consolas", "Monaco", "Courier New", monospace',
          tabSize: 2,
          ...({ WebkitTabSize: 2, MozTabSize: 2 } as any),
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          letterSpacing: "0.01em",
          borderRadius: "0 0 0.75rem 0.75rem",
        }}
        codeTagProps={{
          style: {
            fontFamily: "inherit",
            fontSize: "inherit",
          },
        }}
        PreTag={CodeBlockPreTag}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {part.content}
      </SyntaxHighlighter>
      <div
        className="absolute inset-0 pointer-events-none rounded-b-xl z-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, transparent, rgba(30, 30, 30, 0.2))",
        }}
      ></div>
    </div>
  </div>
);

// Component to render text with inline code
const TextBlock = ({
  part,
  partId,
}: {
  part: { content: string };
  partId: string;
}) => {
  const textParts: Array<{
    type: "text" | "code";
    content: string;
    id: string;
  }> = [];
  const inlineCodeRegex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match;
  let textPartIndex = 0;

  while ((match = inlineCodeRegex.exec(part.content)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = part.content.substring(lastIndex, match.index);
      if (textBefore) {
        textParts.push({
          type: "text",
          content: textBefore,
          id: `${partId}-text-${textPartIndex++}`,
        });
      }
    }
    textParts.push({
      type: "code",
      content: match[1],
      id: `${partId}-code-${textPartIndex++}`,
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < part.content.length) {
    const remainingText = part.content.substring(lastIndex);
    if (remainingText) {
      textParts.push({
        type: "text",
        content: remainingText,
        id: `${partId}-text-${textPartIndex++}`,
      });
    }
  }

  if (textParts.length === 0) {
    textParts.push({
      type: "text",
      content: part.content,
      id: `${partId}-text-0`,
    });
  }

  return (
    <p
      key={partId}
      className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 sm:mb-5"
      style={{
        lineHeight: "1.75",
        wordSpacing: "0.05em",
        letterSpacing: "0.01em",
      }}
    >
      {textParts.map((textPart) => {
        if (textPart.type === "code") {
          return (
            <code
              key={textPart.id}
              className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded text-sm font-mono"
            >
              {textPart.content}
            </code>
          );
        }
        return (
          <span key={textPart.id}>{decodeHtmlEntities(textPart.content)}</span>
        );
      })}
    </p>
  );
};

// Helper function to replace code tags with markdown backticks
function replaceCodeTagWithMarkdown(
  match: string,
  codeContent: string,
  offset: number,
  fullContent: string,
): string {
  const beforeMatch = fullContent.substring(0, offset);
  const lastPreOpen = beforeMatch.lastIndexOf("<pre");
  const lastPreClose = beforeMatch.lastIndexOf("</pre>");

  if (lastPreOpen > lastPreClose) {
    return match;
  }

  return `\`${codeContent.trim()}\``;
}

// Helper function to truncate content if too large
function truncateIfNeeded(content: string, maxLength: number): string {
  if (content.length > maxLength) {
    console.warn("Content too large for safe processing, truncating");
    return content.substring(0, maxLength);
  }
  return content;
}

// Helper function to process and prepare content
function processContent(content: string): string {
  // Fix malformed HTML patterns
  let fixedContent = fixMalformedHtml(content);

  // SECURITY: Process code blocks with bounded quantifiers
  // NOSONAR S7781: replaceAll() with function callback for complex replacement logic
  const codeTagRegex = /<code[^>]{0,200}>([^<]{1,50})<\/code>/gi;
  fixedContent = fixedContent.replaceAll(
    codeTagRegex,
    (match, codeContent, offset) =>
      replaceCodeTagWithMarkdown(match, codeContent, offset, fixedContent),
  );

  // ⚠️ SECURITY: Limit input size to prevent ReDoS attacks
  const MAX_CONTENT_LENGTH = 100000; // 100KB limit
  fixedContent = truncateIfNeeded(fixedContent, MAX_CONTENT_LENGTH);

  return fixedContent;
}

// Helper function to extract all matches from content
function extractAllMatches(fixedContent: string) {
  // Process HTML code blocks
  let htmlMatches = processHtmlCodeBlocks(fixedContent, extractCodeFromHtml);
  htmlMatches.sort((a, b) => a.index - b.index);

  // Process malformed patterns
  htmlMatches = processMalformedPatterns(fixedContent, htmlMatches);
  htmlMatches.sort((a, b) => a.index - b.index);

  // Process markdown code blocks
  const markdownMatches = processMarkdownCodeBlocks(fixedContent);

  const allMatches = [
    ...htmlMatches.map((m) => ({
      ...m,
      type: "html" as const,
      language: "javascript" as string,
    })),
    ...markdownMatches.map((m) => ({ ...m, type: "markdown" as const })),
  ].sort((a, b) => a.index - b.index);

  return allMatches;
}

// Helper function to add text part if content exists
function addTextPartIfExists(
  parts: Array<{ type: "text" | "code"; content: string; language?: string }>,
  textContent: string,
): void {
  if (textContent.trim()) {
    const cleanText = cleanTextContent(textContent);
    if (cleanText) {
      parts.push({ type: "text", content: cleanText });
    }
  }
}

// Helper function to add code part
function addCodePart(
  parts: Array<{ type: "text" | "code"; content: string; language?: string }>,
  matchContent: string,
  language?: string,
): void {
  if (matchContent) {
    const formattedCode = cleanCodeContent(matchContent);
    parts.push({
      type: "code",
      content: formattedCode,
      language: language || "javascript",
    });
  }
}

// Helper function to clean and sanitize text with code tag replacement
function cleanTextWithCodeTags(text: string): string {
  let cleanText = decodeHtmlEntities(text);
  cleanText = sanitizeText(cleanText);
  // NOSONAR S7781: replaceAll() with function callback for capture group replacement
  cleanText = cleanText.replaceAll(
    /<code[^>]{0,200}>([^<]{1,30})<\/code>/gi,
    (match, codeContent) => `\`${codeContent}\``,
  );
  cleanText = sanitizeText(cleanText);
  cleanText = cleanTextContent(cleanText);
  return cleanText;
}

// Helper function to process remaining text content
function processRemainingText(
  fixedContent: string,
  lastIndex: number,
): string | null {
  if (lastIndex >= fixedContent.length) {
    return null;
  }

  const textContent = fixedContent.substring(lastIndex);
  if (!textContent.trim()) {
    return null;
  }

  const cleanText = cleanTextWithCodeTags(textContent);
  return cleanText || null;
}

// Helper function to build parts from matches
function buildPartsFromMatches(
  fixedContent: string,
  allMatches: Array<{
    index: number;
    content: string;
    language?: string;
    fullMatch: string;
    type: "html" | "markdown";
  }>,
): Array<{
  type: "text" | "code";
  content: string;
  language?: string;
}> {
  const parts: Array<{
    type: "text" | "code";
    content: string;
    language?: string;
  }> = [];

  let lastIndex = 0;

  for (const match of allMatches) {
    if (match.index > lastIndex) {
      const textContent = fixedContent.substring(lastIndex, match.index);
      addTextPartIfExists(parts, textContent);
    }

    addCodePart(parts, match.content, match.language);
    lastIndex = match.index + match.fullMatch.length;
  }

  const remainingText = processRemainingText(fixedContent, lastIndex);
  if (remainingText) {
    parts.push({ type: "text", content: remainingText });
  }

  return parts;
}

// Component to render question content with code blocks
export const QuestionContent = ({ content }: { content: string }) => {
  if (!content) return null;

  const fixedContent = processContent(content);
  const allMatches = extractAllMatches(fixedContent);
  const parts = buildPartsFromMatches(fixedContent, allMatches);

  if (parts.length === 0) {
    return processFinalTextContent(fixedContent);
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {parts.map((part, index) => {
        const partId = `part-${index}-${part.type}-${part.content.substring(0, 10)}`;
        if (part.type === "code") {
          return <CodeBlock key={partId} part={part} partId={partId} />;
        }
        return <TextBlock key={partId} part={part} partId={partId} />;
      })}
    </div>
  );
};
