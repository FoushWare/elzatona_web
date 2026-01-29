"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// NOTE: Type safety improvements tracked in refactoring task 401-reduce-any
// This component will be refactored to use explicit types
import React, { useState, useEffect, useCallback } from "react";
import { UnifiedQuestion } from "@elzatona/types";
import { FormModal } from "@elzatona/common-ui";
import {
  CheckCircle,
  XCircle,
  FileText,
  Video,
  GraduationCap,
  BookOpen,
  Target,
  Info,
} from "lucide-react";
import { createHighlighter, type Highlighter } from "shiki";
import DOMPurify from "dompurify";

// Component to render question content safely
const QuestionContent = ({ content }: { content: string }) => {
  // Guard for SSR: use globalThis checks instead of direct `window`/`typeof` checks
  if (typeof globalThis === "undefined" || !("window" in globalThis)) {
    return <div>{content}</div>;
  }
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "i", "b", "code", "pre"],
    ALLOWED_ATTR: [],
  });
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

// Language detection patterns to reduce cognitive complexity
const languagePatterns = [
  {
    language: "python",
    patterns: [
      (code: string) => code.includes("def "),
      (code: string) => code.includes("import ") && code.includes("print"),
    ],
  },
  {
    language: "javascript",
    patterns: [
      (code: string) => code.includes("function ") || code.includes("const "),
      (code: string) => code.includes("console.") || code.includes("return "),
    ],
  },
  {
    language: "typescript",
    patterns: [
      (code: string) =>
        code.includes(":") &&
        (code.includes("string") || code.includes("number")),
      (code: string) => code.includes("interface ") || code.includes("type "),
    ],
  },
  {
    language: "java",
    patterns: [
      (code: string) =>
        code.includes("public class") || code.includes("public static"),
      (code: string) =>
        code.includes("System.out.") || code.includes("void main"),
    ],
  },
  {
    language: "cpp",
    patterns: [
      (code: string) =>
        code.includes("#include") || code.includes("using namespace"),
      (code: string) => code.includes("std::") || code.includes("cout"),
    ],
  },
  {
    language: "csharp",
    patterns: [
      (code: string) => code.includes("using ") && code.includes(";"),
      (code: string) =>
        code.includes("public class") || code.includes("Console."),
    ],
  },
];

// Helper function to detect programming language from code (reduces cognitive complexity)
const detectLanguage = (code: string): string => {
  const codeText = code.toLowerCase();

  for (const { language, patterns } of languagePatterns) {
    if (patterns.some((pattern) => pattern(codeText))) {
      return language;
    }
  }

  return "javascript";
};

// Security wrapper for Shiki HTML output
const sanitizeShikiHtml = (html: string): string => {
  if (typeof globalThis === "undefined" || !("window" in globalThis)) {
    return html; // Server-side: return as-is
  }

  // Shiki already outputs safe HTML, but add extra sanitization for defense-in-depth
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "pre",
      "code",
      "span",
      "div",
      "style",
      "br",
      "p",
      "strong",
      "em",
      "u",
      "i",
      "b",
    ],
    ALLOWED_ATTR: ["class", "style", "data-*"],
    ALLOW_DATA_ATTR: true,
  });
};

// Helper function to calculate brightness
const calculateBrightness = (r: number, g: number, b: number): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

// Helper function to get dimming factor
const getDimmingFactor = (brightness: number): number => {
  return brightness > 220 ? 0.3 : 0.5;
};

// Helper function to apply dimming to RGB values
const applyDimming = (
  r: number,
  g: number,
  b: number,
  factor: number,
): { r: number; g: number; b: number } => {
  const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
  const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
  const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
  return { r: newR, g: newG, b: newB };
};

// Helper function to process hex color
const processHexColor = (
  colorValue: string,
): { shouldReplace: boolean; newColor: string } => {
  const hex = colorValue.substring(1);
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  const brightness = calculateBrightness(r, g, b);

  if (brightness > 180) {
    const factor = getDimmingFactor(brightness);
    const { r: newR, g: newG, b: newB } = applyDimming(r, g, b, factor);
    const newColor = `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    return { shouldReplace: true, newColor };
  }

  return { shouldReplace: false, newColor: colorValue };
};

// Helper function to process RGB color
const processRgbColor = (
  colorValue: string,
): { shouldReplace: boolean; newColor: string } => {
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const rgbMatch = rgbRegex.exec(colorValue);

  if (!rgbMatch) {
    return { shouldReplace: false, newColor: colorValue };
  }

  const r = Number.parseInt(rgbMatch[1], 10);
  const g = Number.parseInt(rgbMatch[2], 10);
  const b = Number.parseInt(rgbMatch[3], 10);
  const brightness = calculateBrightness(r, g, b);

  if (brightness > 180) {
    const factor = getDimmingFactor(brightness);
    const { r: newR, g: newG, b: newB } = applyDimming(r, g, b, factor);
    const newColor = `rgb(${newR}, ${newG}, ${newB})`;
    return { shouldReplace: true, newColor };
  }

  return { shouldReplace: false, newColor: colorValue };
};

// Helper function to check if color is hex format
const isHexColor = (colorValue: string): boolean => {
  return colorValue.startsWith("#");
};

// Helper function to check if color is RGB format
const isRgbColor = (colorValue: string): boolean => {
  return colorValue.startsWith("rgb");
};

// Helper function to process color for light mode visibility (reduces cognitive complexity)

const _processColorForLightMode = (
  colorValue: string,
): { shouldReplace: boolean; newColor: string } => {
  if (isHexColor(colorValue)) {
    return processHexColor(colorValue);
  }

  if (isRgbColor(colorValue)) {
    return processRgbColor(colorValue);
  }

  return { shouldReplace: false, newColor: colorValue };
};

// Helper function to normalize line breaks in code
const normalizeLineBreaks = (code: string): string => {
  // Step 1: Replace literal backslash-n sequences (the two characters: \ and n)
  let formatted = code.replaceAll(String.raw`\n`, "\n");
  // Step 2: Handle \r\n combinations (escape sequences)
  formatted = formatted.replaceAll(String.raw`\r\n`, "\n");
  // Step 3: Handle \r escape sequences
  formatted = formatted.replaceAll(String.raw`\r`, "\n");
  // Step 4: Normalize actual line breaks (Windows, Mac, Unix)
  formatted = formatted.replaceAll("\r\n", "\n"); // Windows line breaks
  formatted = formatted.replaceAll("\r", "\n"); // Mac line breaks
  // Remove only leading/trailing whitespace (not newlines)
  formatted = formatted.trim();
  // Remove empty lines ONLY at the very start (not all leading newlines)
  while (formatted.startsWith("\n")) {
    formatted = formatted.substring(1);
  }
  return formatted;
};

// Helper function to check if code has proper structure
const checkCodeStructure = (formatted: string): boolean => {
  const lines = formatted.split("\n");
  const hasMultipleLines = lines.length > 1;
  const hasIndentation = lines.some(
    (line) => line.trim().length > 0 && /^\s+/.test(line),
  );
  return (
    hasMultipleLines &&
    (hasIndentation || lines.filter((l) => l.trim()).length > 3)
  );
};

// Helper function to determine option CSS classes
const getOptionClasses = (
  selectedAnswer: string | null,
  isCorrect: boolean,
  isWrong: boolean,
) => {
  if (!selectedAnswer) {
    return "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] text-gray-900 dark:text-gray-100 cursor-pointer";
  }
  if (isCorrect) {
    return "border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-900 dark:text-green-100 shadow-xl shadow-green-200/50 dark:shadow-green-900/30 scale-[1.02]";
  }
  if (isWrong) {
    return "border-red-500 dark:border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 text-red-900 dark:text-red-100 shadow-xl shadow-red-200/50 dark:shadow-red-900/30 scale-[1.02]";
  }
  return "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-500 opacity-70 dark:opacity-60";
};

// Helper function to count regex matches

const _countRegexMatches = (text: string, regex: RegExp): number => {
  let count = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    count++;
    // Avoid infinite loops with zero-length matches
    if (match[0].length === 0) {
      regex.lastIndex++;
    }
  }
  return count;
};

// Helper function to format code with indentation
const formatWithIndentation = (codeLines: string[]): string => {
  let indentLevel = 0;
  const formattedLines: string[] = [];

  for (const originalLine of codeLines) {
    const trimmed = originalLine.trim();

    // CRITICAL: Preserve empty lines - don't skip them
    if (!trimmed) {
      formattedLines.push("");
      continue;
    }

    // Decrease indent before closing braces/brackets
    if (/^[}\])]/.exec(trimmed)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Add the line with proper indentation
    formattedLines.push("  ".repeat(indentLevel) + trimmed);

    // Calculate net braces/brackets/parens for this line using single regex
    const bracketCounts = {
      openBraces: 0,
      closeBraces: 0,
      openBrackets: 0,
      closeBrackets: 0,
      openParens: 0,
      closeParens: 0,
    };

    // Use single regex to match all bracket types
    const bracketMatches = trimmed.match(/[{}()[\]]/g);
    if (bracketMatches) {
      bracketMatches.forEach((bracket) => {
        switch (bracket) {
          case "{":
            bracketCounts.openBraces++;
            break;
          case "}":
            bracketCounts.closeBraces++;
            break;
          case "[":
            bracketCounts.openBrackets++;
            break;
          case "]":
            bracketCounts.closeBrackets++;
            break;
          case "(":
            bracketCounts.openParens++;
            break;
          case ")":
            bracketCounts.closeParens++;
            break;
        }
      });
    }

    // Increase indent after opening braces/brackets/parens
    const netIncrease = Math.max(
      bracketCounts.openBraces - bracketCounts.closeBraces,
      bracketCounts.openBrackets - bracketCounts.closeBrackets,
      bracketCounts.openParens - bracketCounts.closeParens,
    );

    if (netIncrease > 0) {
      indentLevel += netIncrease;
    }
  }

  return formattedLines.join("\n");
};

// Helper function to add line breaks for single-line code
const addLineBreaks = (formatted: string): string => {
  // Add line breaks after semicolons (but not in strings)
  // NOSONAR S7781: replaceAll() cannot be used with regex patterns that require negative lookahead
  formatted = formatted.replaceAll(/;(?![^"']*["'])/g, ";\n");
  // Add line breaks after opening braces
  formatted = formatted.replaceAll(/\{\s*/g, "{\n");
  // Add line breaks before closing braces
  formatted = formatted.replaceAll(/\s*\}/g, "\n}");
  // Add line breaks after closing braces followed by non-whitespace
  // NOSONAR S7781: replaceAll() cannot be used with regex patterns that require capture groups
  formatted = formatted.replaceAll(/\}\s*([^\s}])/g, "}\n\n$1");
  // Clean up multiple consecutive line breaks (max 2)
  formatted = formatted.replaceAll(/\n{3,}/g, "\n\n");
  return formatted;
};

// Helper function to process already well-formatted code
const processWellFormattedCode = (formatted: string): string => {
  const codeLines = formatted.split("\n");
  let result = formatWithIndentation(codeLines);
  // Only limit excessive empty lines (3+ consecutive), but preserve single and double newlines
  result = result.replaceAll(/\n{4,}/g, "\n\n\n"); // Max 3 consecutive newlines
  return result.trimEnd();
};

// Helper function to process poorly formatted code
const processPoorlyFormattedCode = (formatted: string): string => {
  // If code is on a single line or poorly formatted, try to format it intelligently
  formatted = addLineBreaks(formatted);

  // Now apply indentation formatting
  const codeLines = formatted.split("\n").map((line) => line.trimEnd());
  let result = formatWithIndentation(codeLines);
  result = result.replaceAll(/\n{3,}/g, "\n\n"); // Max 2 consecutive newlines
  return result.trimEnd();
};

// Helper function to format code with proper line breaks and indentation
const _formatCodeForDisplay = (code: string): string => {
  if (!code) return "";

  // Convert code to string if it's not already
  const codeStr = String(code);

  // CRITICAL: Convert \n escape sequences to actual newlines FIRST
  // The code might come from database as a string with literal "\n" characters
  // We MUST convert these to actual newline characters before any other processing
  const formatted = normalizeLineBreaks(codeStr);

  // Check if code already has proper formatting (multiple lines with indentation)
  const hasProperStructure = checkCodeStructure(formatted);

  // If code already has proper formatting, just normalize indentation
  // BUT preserve ALL newlines - don't collapse them
  if (hasProperStructure) {
    return processWellFormattedCode(formatted);
  }

  return processPoorlyFormattedCode(formatted);
};

interface ViewQuestionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly question: UnifiedQuestion | null;
  readonly cards: any[];
  readonly allCategories: string[];
  readonly categoriesData: any[];
  readonly topicsData: any[];
}

const getOptionLetter = (index: number) => String.fromCodePoint(65 + index);

export function ViewQuestionModal({
  isOpen,
  onClose,
  question,
  cards: _cards,
  allCategories: _allCategories,
  categoriesData: _categoriesData,
  topicsData: _topicsData,
}: ViewQuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Shiki syntax highlighting
  const [shikiHighlighter, setShikiHighlighter] = useState<Highlighter | null>(
    null,
  );
  const [isLoadingShiki, setIsLoadingShiki] = useState(true);
  const [codeHighlightedHtml, setCodeHighlightedHtml] = useState<string>("");

  // Initialize Shiki highlighter
  useEffect(() => {
    let mounted = true;

    const initShiki = async () => {
      try {
        const highlighter = await createHighlighter({
          themes: ["github-light", "github-dark"],
          langs: [
            "javascript",
            "typescript",
            "python",
            "java",
            "jsx",
            "tsx",
            "json",
            "html",
            "css",
          ],
        });

        if (mounted) {
          setShikiHighlighter(highlighter);
          setIsLoadingShiki(false);
        }
      } catch (error) {
        console.error("Error initializing Shiki:", error);
        setIsLoadingShiki(false);
      }
    };

    initShiki();

    return () => {
      mounted = false;
    };
  }, []);

  // Helper function to process raw code for highlighting
  const processCodeForHighlighting = (rawCode: string): string => {
    let codeWithNewlines = rawCode
      .replaceAll(String.raw`\n`, "\n")
      .replaceAll(String.raw`\r\n`, "\n")
      .replaceAll(String.raw`\r`, "\n")
      .replaceAll("\r\n", "\n")
      .replaceAll("\r", "\n")
      .trim();

    // Remove empty lines at the start
    while (codeWithNewlines.startsWith("\n")) {
      codeWithNewlines = codeWithNewlines.substring(1);
    }

    // Remove empty lines at the end
    while (codeWithNewlines.endsWith("\n")) {
      codeWithNewlines = codeWithNewlines.slice(0, -1);
    }

    // Remove ALL blank lines - split by newlines, filter out empty lines, rejoin
    const lines = codeWithNewlines.split("\n");
    const nonEmptyLines = lines.filter((line) => {
      const trimmed = line.trim();
      return trimmed.length > 0;
    });
    codeWithNewlines = nonEmptyLines.join("\n");

    // Final check: ensure no consecutive newlines remain
    if (codeWithNewlines.includes("\n\n")) {
      codeWithNewlines = codeWithNewlines.replaceAll(/\n{2,}/g, "\n");
    }

    return codeWithNewlines;
  };

  // Helper function to determine highlighter language
  const getHighlighterLanguage = (lang: string): string => {
    if (lang === "typescript") return "ts";
    if (lang === "javascript") return "js";
    return lang;
  };

  // Helper function to get theme name based on system preference
  const getThemeName = (): string => {
    const prefersDark =
      globalThis.window?.matchMedia("(prefers-color-scheme: dark)")?.matches ??
      false;
    return prefersDark ? "github-dark" : "github-light";
  };

  // Helper function to process code for display
  const processCodeForDisplay = (question: any) => {
    const codeStr = String(question.codeTemplate || "").trim();
    if (!codeStr) return null;

    const rawCode = codeStr;
    let codeWithNewlines = rawCode
      .replaceAll(String.raw`\n`, "\n")
      .replaceAll(String.raw`\r\n`, "\n")
      .replaceAll(String.raw`\r`, "\n")
      .replaceAll("\r\n", "\n")
      .replaceAll("\r", "\n")
      .trim();

    // Remove empty lines
    const lines = codeWithNewlines.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
    codeWithNewlines = nonEmptyLines.join("\n");

    return {
      processedCode: codeWithNewlines,
      nonEmptyLines,
      detectedLanguage: detectLanguage(codeWithNewlines),
    };
  };

  // Helper function to get code theme
  const getCodeTheme = (): string => {
    const prefersDark =
      globalThis.window?.matchMedia("(prefers-color-scheme: dark)")?.matches ||
      false;
    return prefersDark ? "dark" : "light";
  };

  // Helper function to get file extension from language
  const getFileExtension = (detectedLanguage: string): string => {
    if (detectedLanguage === "python") return "py";
    if (detectedLanguage === "java") return "java";
    if (detectedLanguage === "typescript") return "ts";
    return "js";
  };

  // Helper function to get line numbers background class
  const getLineNumbersBackgroundClass = (codeTheme: string): string => {
    return codeTheme === "dark"
      ? "bg-gray-800/50 border-gray-700"
      : "bg-gray-100 border-gray-200";
  };

  // Helper functions to get option styling classes - split to avoid boolean parameters
  const getCorrectOptionClasses = (): string => {
    return "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50";
  };

  const getIncorrectOptionClasses = (): string => {
    return "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/50";
  };

  const getDefaultOptionClasses = (): string => {
    return "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 text-indigo-700 dark:text-indigo-200";
  };

  const getOptionStylingClasses = (
    isCorrect: boolean,
    isWrong: boolean,
    showFeedback: boolean,
  ): string => {
    if (isCorrect && showFeedback) {
      return getCorrectOptionClasses();
    } else if (isWrong) {
      return getIncorrectOptionClasses();
    } else {
      return getDefaultOptionClasses();
    }
  };

  // Resource configuration object to reduce cognitive complexity
  const resourceConfig = {
    video: {
      icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" />,
      colorClasses:
        "from-red-500 to-pink-600 dark:from-red-500 dark:to-rose-600 border-red-400 dark:border-red-500",
      label: "Video",
    },
    course: {
      icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
      colorClasses:
        "from-blue-500 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 border-blue-400 dark:border-blue-400",
      label: "Course",
    },
    article: {
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      colorClasses:
        "from-green-500 to-emerald-600 dark:from-green-500 dark:to-emerald-500 border-green-400 dark:border-green-400",
      label: "Article",
    },
    default: {
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      colorClasses:
        "from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-500 border-indigo-400 dark:border-indigo-400",
      label: "Resource",
    },
  };

  // Helper function to get shiki wrapper class
  const getShikiWrapperClass = (codeTheme: string): string => {
    return codeTheme === "light" ? "shiki-light-mode" : "shiki-dark-mode";
  };

  // Helper function to get resource icon based on type
  const getResourceIcon = (resourceType: string) => {
    const config = resourceConfig[resourceType as keyof typeof resourceConfig];
    return config?.icon || resourceConfig.default.icon;
  };

  // Helper function to get resource color classes based on type
  const getResourceColorClasses = (resourceType: string): string => {
    const config = resourceConfig[resourceType as keyof typeof resourceConfig];
    return config?.colorClasses || resourceConfig.default.colorClasses;
  };

  // Helper function to get resource type label
  const getResourceTypeLabel = (resourceType: string): string => {
    return (
      resourceConfig[resourceType as keyof typeof resourceConfig]?.label ||
      resourceConfig.default.label
    );
  };

  // Helper function to render code display with Shiki highlighting
  const renderCodeDisplay = (
    question: any,
    isLoadingShiki: boolean,
    codeHighlightedHtml: string,
  ) => {
    const codeData = processCodeForDisplay(question);
    if (!codeData) return null;

    const { nonEmptyLines, detectedLanguage } = codeData;
    const codeTheme = getCodeTheme();

    return (
      <>
        {/* Empty line before code */}
        <div className="mt-4"></div>
        {/* Code display with Shiki syntax highlighting */}
        <div
          className={`relative rounded-lg overflow-hidden shadow-lg border ${
            codeTheme === "dark"
              ? "border-gray-700 bg-gray-900"
              : "border-gray-300 bg-white"
          }`}
        >
          {/* Code editor header bar */}
          <div
            className={`flex items-center justify-between px-2 py-1.5 border-b ${
              codeTheme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {/* Window controls */}
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              {/* File name */}
              <div
                className={`flex items-center gap-1.5 ml-1 px-2 py-0.5 rounded border ${
                  codeTheme === "dark"
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-200 border-gray-300"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${codeTheme === "dark" ? "bg-blue-400" : "bg-blue-500"}`}
                ></div>
                <span
                  className={`text-xs font-medium font-mono ${
                    codeTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  code.{getFileExtension(detectedLanguage)}
                </span>
              </div>
            </div>
            {/* Language badge */}
            <div
              className={`px-2 py-0.5 rounded border ${
                codeTheme === "dark"
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              <span
                className={`text-xs font-medium uppercase ${
                  codeTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {detectedLanguage}
              </span>
            </div>
          </div>
          {/* Code content with Shiki highlighting */}
          <div
            className={`overflow-x-auto ${codeTheme === "dark" ? "bg-gray-900" : "bg-white"}`}
          >
            {isLoadingShiki ? (
              <div className="p-2 text-center text-xs text-gray-500">
                Loading...
              </div>
            ) : (
              <>
                {codeHighlightedHtml ? (
                  <div className="relative">
                    {/* Line numbers background */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-10 border-r ${getLineNumbersBackgroundClass(codeTheme)}`}
                    ></div>
                    {/* Shiki highlighted code */}
                    <div className="relative">
                      <div
                        className={`shiki-wrapper pl-10 ${getShikiWrapperClass(codeTheme)}`}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeShikiHtml(codeHighlightedHtml),
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  // Fallback: plain code display
                  <div className="relative">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-10 border-r ${getLineNumbersBackgroundClass(codeTheme)}`}
                    ></div>
                    <pre className="m-0 p-2 pl-10 text-sm font-mono font-medium leading-relaxed">
                      <code className="block">
                        {nonEmptyLines.map((line, index) => (
                          <div
                            key={`line-${index}-${line.slice(0, 20)}`}
                            className="flex items-start"
                          >
                            <span
                              className={`select-none pr-2 text-right min-w-[2.5rem] text-xs font-medium ${
                                codeTheme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <span
                              className={`flex-1 whitespace-pre pl-2 pr-2 py-0.5 text-sm ${
                                codeTheme === "dark"
                                  ? "text-gray-100"
                                  : "text-gray-900"
                              }`}
                            >
                              {line || " "}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  // Helper function to adjust HTML colors for light mode
  const adjustHtmlForLightMode = (html: string): string => {
    if (typeof globalThis === "undefined" || !("window" in globalThis)) {
      return html;
    }

    const prefersDark = (globalThis as any).window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDark) {
      return html;
    }

    try {
      const tempDiv = document.createElement("div");
      // Security: Sanitize HTML before using innerHTML (defense-in-depth)
      tempDiv.innerHTML = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["pre", "code", "span", "div", "style"],
        ALLOWED_ATTR: ["class", "style"],
      });
      const codeElement = tempDiv.querySelector("pre code");
      if (codeElement) {
        // Security: Sanitize innerHTML before returning
        return `<pre><code>${DOMPurify.sanitize(codeElement.innerHTML, {
          ALLOWED_TAGS: ["span"],
          ALLOWED_ATTR: ["class", "style"],
        })}</code></pre>`;
      }
    } catch (error_) {
      // Security: Removed detailed error logging to prevent information disclosure
      console.warn(
        "DOM parsing for color adjustment failed:",
        error_ instanceof Error ? error_.message : "Unknown error",
      );
    }

    return html;
  };

  // Security: Removed debug logging to prevent information disclosure
  const _logHighlightingSuccess = (_html: string) => {
    // Removed for security
  };

  // Security: Removed debug logging to prevent information disclosure
  const _logHighlightingSkip = (
    _shikiHighlighter: Highlighter | null,
    _question: UnifiedQuestion | null,
  ) => {
    // Removed for security
  };

  // Helper function to handle code highlighting logic
  const handleCodeHighlighting = useCallback(
    (
      shikiHighlighter: Highlighter | null,
      question: UnifiedQuestion | null,
      setCodeHighlightedHtml: (html: string) => void,
    ) => {
      if (!shikiHighlighter || !question?.codeTemplate) {
        setCodeHighlightedHtml("");
        _logHighlightingSkip(shikiHighlighter, question);
        return;
      }

      try {
        const rawCode = String(question.codeTemplate || "");
        // Security: Removed debug logging to prevent information disclosure

        const codeWithNewlines = processCodeForHighlighting(rawCode);
        const lang = detectLanguage(codeWithNewlines);
        const themeName = getThemeName();
        const highlighterLang = getHighlighterLanguage(lang);

        let html = shikiHighlighter.codeToHtml(codeWithNewlines, {
          lang: highlighterLang,
          theme: themeName,
        });

        html = adjustHtmlForLightMode(html);
        _logHighlightingSuccess(html);
        setCodeHighlightedHtml(html);
      } catch (error) {
        console.error("ViewQuestionModal - Error highlighting code:", error);
        setCodeHighlightedHtml("");
      }
    },
    [],
  );

  // Helper function to reset question state
  const resetQuestionState = (
    question: UnifiedQuestion | null,
    setSelectedAnswer: (answer: string | null) => void,
    setShowExplanation: (show: boolean) => void,
  ) => {
    if (question) {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  // Helper function to log question data
  const logQuestionData = (question: UnifiedQuestion | null) => {
    if (question) {
      console.debug("ViewQuestionModal - Question data:", {
        id: question.id,
        hasCode: !!question.codeTemplate,
        codeType: typeof question.codeTemplate,
        codeValue: question.codeTemplate
          ? String(question.codeTemplate).substring(0, 100)
          : null,
      });
    }
  };

  // Highlight code when it changes or highlighter is ready
  useEffect(() => {
    handleCodeHighlighting(shikiHighlighter, question, setCodeHighlightedHtml);
  }, [
    shikiHighlighter,
    question,
    handleCodeHighlighting,
    setCodeHighlightedHtml,
  ]);

  // Reset state when question changes
  useEffect(() => {
    resetQuestionState(question, setSelectedAnswer, setShowExplanation);
  }, [question, setSelectedAnswer, setShowExplanation]);

  // Debug: Log question data to check if code field exists
  useEffect(() => {
    logQuestionData(question);
  }, [question]);

  if (!question) return null;

  // Helper function to handle answer selection
  const handleAnswerSelect = (optionText: string) => {
    if (selectedAnswer) return; // Already answered
    setSelectedAnswer(optionText);
    setShowExplanation(true);
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
                {question.difficulty || "beginner"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                {question.type || "multiple-choice"}
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
          {renderCodeDisplay(question, isLoadingShiki, codeHighlightedHtml)}
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
                  className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${getOptionClasses(
                    selectedAnswer,
                    isCorrect,
                    isWrong,
                  )} ${selectedAnswer ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center space-x-4 sm:space-x-5">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-md transition-all duration-300 flex-shrink-0 ${getOptionStylingClasses(
                        isCorrect,
                        isWrong,
                        showFeedback,
                      )}`}
                    >
                      {optionLetter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <QuestionContent content={option.text || ""} />
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
          <div
            className={`mt-6 sm:mt-8 p-5 sm:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200/50 dark:shadow-blue-900/30 ${showExplanation ? "animate-in fade-in slide-in-from-bottom-4 duration-500" : ""}`}
          >
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
        {question.resources &&
          Array.isArray(question.resources) &&
          question.resources.length > 0 && (
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
                {question.resources.map((resource: any) => {
                  return (
                    <a
                      key={
                        resource.url ||
                        `resource-${resource.type || "unknown"}-${resource.title || "no-title"}`.substring(
                          0,
                          20,
                        )
                      }
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-4 rounded-xl border-2 bg-gradient-to-r ${getResourceColorClasses(resource.type)} text-white shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all transform hover:scale-[1.02]`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/95">
                              {getResourceTypeLabel(resource.type)}
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
