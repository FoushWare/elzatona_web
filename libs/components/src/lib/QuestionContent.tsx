"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Helper function to determine if content is valid code or should be rendered as text
// Uses a scoring system to make intelligent decisions
export const isValidCode = (
  content: string,
): { isValid: boolean; score: number; reasons: string[] } => {
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
};

// Helper function to format and normalize code content
export const formatCodeContent = (code: string): string => {
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
    decoded = decoded.replace(new RegExp(entity, "gi"), char);
  }

  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });

  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });

  if (typeof globalThis.window !== "undefined") {
    try {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = decoded;
      decoded = textarea.value;
    } catch (e) {
      // Fallback
    }
  }

  return decoded;
};

// Helper function to clean text content (reduces cognitive complexity)
const cleanTextContent = (text: string): string => {
  let cleanText = decodeHtmlEntities(text);
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
  return cleanText;
};

// Helper function to clean code content (reduces cognitive complexity)
const cleanCodeContent = (code: string): string => {
  let cleanCode = code;
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
  return cleanCode;
};

// Component to render question content with code blocks
export const QuestionContent = ({ content }: { content: string }) => {
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

  const malformedPattern = /<pr<cod[^>]*>([\s\S]*?)(?:<\/cod<\/pr|$)/gi;
  let malformedMatch: RegExpExecArray | null;
  malformedPattern.lastIndex = 0;

  while ((malformedMatch = malformedPattern.exec(fixedContent)) !== null) {
    if (!malformedMatch) break;
    const alreadyCaptured = htmlMatches.some(
      (m) => Math.abs(m.index - malformedMatch!.index) < 10,
    );

    if (!alreadyCaptured && malformedMatch[1]) {
      let code = malformedMatch[1];
      code = decodeHtmlEntities(code);
      code = code.replace(/<[^>]+>/g, "");
      for (let i = 0; i < 3; i++) {
        code = code
          .replace(/e>e>e>/g, "")
          .replace(/e>e>/g, "")
          .replace(/^e>+/g, "")
          .replace(/e>+$/g, "")
          .replace(/(\w+)e>/g, "$1")
          .replace(/consoleonsole\.log/g, "console.log")
          .replace(/console\.loge>/g, "console.log")
          .replace(/diameterameter/g, "diameter")
          .replace(/perimeterimeter/g, "perimeter")
          .replace(/newColorwColor/g, "newColor")
          .replace(/NaNe>/g, "NaN");
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

  htmlMatches.sort((a, b) => a.index - b.index);

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
        const cleanText = cleanTextContent(textContent);
        if (cleanText) {
          parts.push({ type: "text", content: cleanText });
        }
      }
    }

    if (match.content) {
      const cleanCode = cleanCodeContent(match.content);
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
      const cleanText = cleanTextContent(textContent);
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
      .replaceAll("&nbsp;", " ")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&amp;", "&")
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

  return (
    <div className="space-y-5 sm:space-y-6">
      {parts.map((part, index) => {
        if (part.type === "code") {
          return (
            <div
              key={`code-part-${index}-${part.content?.substring(0, 20) || ""}`}
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
                  PreTag={({ children, ...props }) => (
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
                  )}
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
              key={`text-part-${index}-${part.content?.substring(0, 30) || ""}`}
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
