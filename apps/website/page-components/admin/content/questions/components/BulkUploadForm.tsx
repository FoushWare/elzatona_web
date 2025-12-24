"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Badge,
  DialogFooter,
  Label,
  Textarea,
} from "@elzatona/components";
import { Upload, FileText, AlertTriangle, Loader2 } from "lucide-react";
import { createHighlighter, type Highlighter } from "shiki";
import DOMPurify from "dompurify";

interface BulkUploadFormProps {
  onUpload: (file: File) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  progress: { current: number; total: number } | null;
}

// Helper functions for code processing (extracted to reduce cognitive complexity)
const calculateBrightness = (r: number, g: number, b: number): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const getDimmingFactor = (brightness: number): number => {
  return brightness > 220 ? 0.3 : 0.5;
};

const applyDimming = (r: number, g: number, b: number, factor: number) => {
  const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
  const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
  const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
  return { newR, newG, newB };
};

// Security wrapper for Shiki HTML output
const sanitizeShikiHtml = (html: string): string => {
  if (typeof window === "undefined") {
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

// Security wrapper for CSS content
const sanitizeCSS = (css: string): string => {
  if (typeof window === "undefined") {
    return css; // Server-side: return as-is
  }

  return DOMPurify.sanitize(css, {
    ALLOWED_TAGS: ["style"],
    ALLOWED_ATTR: [],
    ALLOW_DATA_ATTR: false,
  });
};

// Pre-defined CSS styles to avoid parsing issues
const shikiStyles = `
  .shiki-wrapper pre {
    margin: 0 !important;
    padding: 0.375rem 0 0.375rem 0 !important;
    background: transparent !important;
    overflow: visible !important;
    font-size: 0.75rem !important;
    line-height: 1.25 !important;
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace !important;
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
  .shiki-wrapper pre code .line:empty {
    display: none !important;
  }
  .shiki-light-mode .shiki-wrapper,
  .shiki-light-mode .shiki-wrapper pre,
  .shiki-light-mode .shiki-wrapper pre code {
    background-color: #ffffff !important;
  }
  .shiki-light-mode .shiki-wrapper pre code .line {
    background-color: transparent !important;
  }
`;

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
    const { newR, newG, newB } = applyDimming(r, g, b, factor);
    const newColor = `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    return { shouldReplace: true, newColor };
  }

  return { shouldReplace: false, newColor: colorValue };
};

const processRgbColor = (
  colorValue: string,
): { shouldReplace: boolean; newColor: string } => {
  const matches = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) return { shouldReplace: false, newColor: colorValue };

  const r = Number.parseInt(matches[1], 10);
  const g = Number.parseInt(matches[2], 10);
  const b = Number.parseInt(matches[3], 10);
  const brightness = calculateBrightness(r, g, b);

  if (brightness > 180) {
    const factor = getDimmingFactor(brightness);
    const { newR, newG, newB } = applyDimming(r, g, b, factor);
    const newColor = `rgb(${newR}, ${newG}, ${newB})`;
    return { shouldReplace: true, newColor };
  }

  return { shouldReplace: false, newColor: colorValue };
};

const normalizeCodeBreaks = (code: string): string => {
  return code.replace(/\\r\\n|\\r|\\n|\r\n|\r/g, "\n").trim();
};

const cleanCodeFormatting = (code: string): string => {
  let formattedCode = code.trim();

  // Remove leading and trailing newlines
  while (formattedCode.startsWith("\n")) {
    formattedCode = formattedCode.substring(1);
  }
  while (formattedCode.endsWith("\n")) {
    formattedCode = formattedCode.slice(0, -1);
  }

  // Remove empty lines and reduce multiple consecutive newlines
  const lines = formattedCode.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  formattedCode = nonEmptyLines.join("\n");

  if (formattedCode.includes("\n\n")) {
    formattedCode = formattedCode.replace(/\n{2,}/g, "\n");
  }

  return formattedCode;
};

const detectLanguage = (code: string): string => {
  const codeText = code.toLowerCase();

  if (
    codeText.includes("def ") ||
    (codeText.includes("import ") && codeText.includes("print"))
  ) {
    return "python";
  } else if (
    codeText.includes("public class") ||
    codeText.includes("public static")
  ) {
    return "java";
  } else if (
    codeText.includes("interface ") ||
    codeText.includes("type ") ||
    codeText.includes(": string")
  ) {
    return "typescript";
  }

  return "javascript";
};

const detectTheme = (): string => {
  if (typeof window === "undefined") return "github-light";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "github-dark" : "github-light";
};

// Helper function to process color for light mode
const processColorForLightMode = (
  colorValue: string,
): { shouldReplace: boolean; newColor: string } => {
  if (colorValue.startsWith("#")) {
    return processHexColor(colorValue);
  } else if (colorValue.startsWith("rgb")) {
    return processRgbColor(colorValue);
  }
  return { shouldReplace: false, newColor: colorValue };
};

// Helper function to highlight a single question's code
const highlightQuestionCode = (
  question: any,
  index: number,
  shikiHighlighter: any,
): string => {
  if (!question.code) return "";

  try {
    const rawCode = String(question.code || "");
    const normalizedCode = normalizeCodeBreaks(rawCode);
    const formattedCode = cleanCodeFormatting(normalizedCode);
    const language = detectLanguage(formattedCode);
    const theme = detectTheme();

    let html = shikiHighlighter.codeToHtml(formattedCode, {
      lang:
        language === "typescript"
          ? "ts"
          : language === "javascript"
            ? "js"
            : language,
      theme,
    });

    // Post-process for light mode visibility
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (!prefersDark) {
        html = processHtmlForLightMode(html);
      } else {
        // Dark mode: just remove empty lines
        html = html
          .replace(/<span class="line">[\s\u00A0\u200B]*<\/span>/g, "")
          .replace(
            /<span[^>]*class="[^"]*line[^"]*">[\s\u00A0\u200B]*<\/span>/g,
            "",
          );
      }
    }

    return html;
  } catch (error) {
    console.error("Error highlighting code for question", index, error);
    return "";
  }
};

// Helper function to process HTML for light mode
const processHtmlForLightMode = (html: string): string => {
  try {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const preElement = tempDiv.querySelector("pre");

    if (preElement) {
      const codeElement = preElement.querySelector("code");
      if (codeElement) {
        // Remove empty lines
        const lines = Array.from(codeElement.querySelectorAll(".line"));
        lines.forEach((line) => {
          const text = (line.textContent || "").trim();
          if (text.length === 0) {
            line.remove();
          }
        });

        // Process colors
        const allSpans = codeElement.querySelectorAll("span");
        allSpans.forEach((el) => {
          const style = (el as HTMLElement).getAttribute("style") || "";
          const colorMatch = style.match(
            /color:\s*(#[0-9a-f]{6}|rgb\([^)]+\))/i,
          );

          if (colorMatch) {
            const colorValue = colorMatch[1];
            const { shouldReplace, newColor } =
              processColorForLightMode(colorValue);

            if (shouldReplace) {
              const newStyle = style.replace(
                /color:\s*(#[0-9a-f]{6}|rgb\([^)]+\))/i,
                `color: ${newColor}`,
              );
              (el as HTMLElement).setAttribute("style", newStyle);
            }
          } else if (!style.includes("color")) {
            const text = (el as HTMLElement).textContent || "";
            if (text.trim().length > 0) {
              (el as HTMLElement).setAttribute(
                "style",
                `${style ? style + "; " : ""}color: #24292e;`,
              );
            }
          } else if (!style) {
            const text = (el as HTMLElement).textContent || "";
            if (text.trim().length > 0) {
              (el as HTMLElement).setAttribute("style", "color: #24292e;");
            }
          }
        });

        const cleanedCode = codeElement.innerHTML;
        return `<pre><code>${cleanedCode}</code></pre>`;
      }
    }
  } catch (e) {
    console.warn("DOM processing failed:", e);
  }

  return html;
};

export function BulkUploadForm({
  onUpload,
  onCancel,
  loading,
  error,
  success,
  progress,
}: BulkUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewQuestions, setPreviewQuestions] = useState<any[]>([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for JSON mode toggle
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Shiki syntax highlighting state
  const [shikiHighlighter, setShikiHighlighter] = useState<Highlighter | null>(
    null,
  );
  const [isLoadingShiki, setIsLoadingShiki] = useState(true);
  const [codeHighlightedHtml, setCodeHighlightedHtml] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    if (!error && !success && !loading) {
      setFile(null);
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
      setJsonText("");
      setJsonError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [error, success, loading]);

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

  // Highlight code for all preview questions (simplified to reduce cognitive complexity)
  useEffect(() => {
    if (!shikiHighlighter || previewQuestions.length === 0) {
      setCodeHighlightedHtml({});
      return;
    }

    const highlighted: Record<number, string> = {};

    previewQuestions.forEach((question, index) => {
      highlighted[index] = highlightQuestionCode(
        question,
        index,
        shikiHighlighter,
      );
    });

    setCodeHighlightedHtml(highlighted);
  }, [shikiHighlighter, previewQuestions]);

  // Parse JSON text when in JSON mode
  const parseJsonText = (text: string) => {
    // Don't parse if text is empty or just whitespace
    if (!text || !text.trim()) {
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
      setJsonError(null);
      return [];
    }

    try {
      // Remove BOM if present
      let cleanedText = text.trim();
      if (cleanedText.charCodeAt(0) === 0xfeff) {
        cleanedText = cleanedText.slice(1);
      }

      const data = JSON.parse(cleanedText);
      const questions = Array.isArray(data) ? data : data.questions || [];
      setTotalQuestionsCount(questions.length);
      setPreviewQuestions(questions.slice(0, 3));
      setShowPreview(questions.length > 0);
      setJsonError(null); // Clear any previous errors
      return questions;
    } catch (err: any) {
      // Silently handle JSON parse errors (user might still be typing)
      // Only show preview when JSON is valid
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);

      // Store error for display, but only if it's a real syntax error
      if (err instanceof SyntaxError) {
        const match = err.message.match(/position (\d+)/);
        if (match) {
          const position = parseInt(match[1], 10);
          const lines = text.substring(0, position).split("\n");
          const lineNumber = lines.length;
          const columnNumber = lines[lines.length - 1].length + 1;

          setJsonError(
            `JSON Error at line ${lineNumber}, column ${columnNumber}: ${err.message}`,
          );
        } else {
          setJsonError(`JSON Error: ${err.message}`);
        }
      } else {
        setJsonError(null); // Clear error if it's not a syntax error
      }
      return [];
    }
  };

  // Handle JSON text change with debouncing to avoid parsing incomplete JSON
  useEffect(() => {
    if (!isJsonMode) {
      return;
    }

    // Clear preview if text is empty
    if (!jsonText.trim()) {
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
      return;
    }

    // Debounce parsing to avoid errors while user is typing
    const timeoutId = setTimeout(() => {
      parseJsonText(jsonText);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [jsonText, isJsonMode]);

  // Handle JSON mode toggle
  const handleJsonModeToggle = (checked: boolean) => {
    setIsJsonMode(checked);
    if (!checked) {
      setJsonText("");
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
    }
  };

  const parseFile = async (selectedFile: File) => {
    try {
      const fileType = selectedFile.name.split(".").pop()?.toLowerCase();
      let questions: any[] = [];

      if (fileType === "json") {
        const text = await selectedFile.text();
        const data = JSON.parse(text);
        questions = Array.isArray(data) ? data : data.questions || [];
      } else if (fileType === "csv") {
        const text = await selectedFile.text();
        const lines = text.split("\n").filter((line) => line.trim());
        const headers = lines[0].split(",").map((h) => h.trim());
        questions = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          const question: any = {};
          headers.forEach((header, index) => {
            question[header] = values[index] || "";
          });
          return question;
        });
      }

      setTotalQuestionsCount(questions.length);
      setPreviewQuestions(questions.slice(0, 3));
      setShowPreview(questions.length > 0);
    } catch (err) {
      console.error("Error parsing file:", err);
      setPreviewQuestions([]);
      setTotalQuestionsCount(0);
      setShowPreview(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop()?.toLowerCase();
      if (fileType !== "csv" && fileType !== "json") {
        return;
      }
      setFile(selectedFile);
      await parseFile(selectedFile);
    }
  };

  const validateJsonInput = (jsonText: string, jsonError: string | null) => {
    if (!jsonText.trim()) {
      return { isValid: false, error: "JSON text is empty" };
    }

    if (jsonError) {
      return {
        isValid: false,
        error: "Please fix JSON errors before submitting",
      };
    }

    return { isValid: true, error: null };
  };

  const processJsonFile = (jsonText: string) => {
    let cleanedJson = jsonText.trim();

    // Remove BOM if present
    if (cleanedJson.charCodeAt(0) === 0xfeff) {
      cleanedJson = cleanedJson.slice(1);
    }

    // Validate JSON
    const data = JSON.parse(cleanedJson);
    const questions = Array.isArray(data) ? data : data.questions || [];

    if (questions.length === 0) {
      throw new Error(
        "JSON is valid but contains no questions. Please add at least one question.",
      );
    }

    // Create a File object from cleaned JSON text
    const blob = new Blob([cleanedJson], { type: "application/json" });
    return new File([blob], "questions.json", {
      type: "application/json",
    });
  };

  const formatJsonError = (err: any, jsonText: string) => {
    let errorMessage = "Invalid JSON format. ";

    if (err instanceof SyntaxError) {
      const match = err.message.match(/position (\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        const lines = jsonText.substring(0, position).split("\n");
        const lineNumber = lines.length;
        const columnNumber = lines[lines.length - 1].length + 1;

        errorMessage = `JSON Error at line ${lineNumber}, column ${columnNumber}: ${err.message}`;

        // Show context around the error
        const start = Math.max(0, position - 100);
        const end = Math.min(jsonText.length, position + 100);
        const contextStart = Math.max(0, position - 50);
        const beforeError = jsonText.substring(contextStart, position);
        const afterError = jsonText.substring(
          position,
          Math.min(jsonText.length, position + 50),
        );

        errorMessage += `\n\nContext around error:\n...${beforeError}>>>ERROR HERE<<<${afterError}...`;
      } else {
        errorMessage = `JSON Error: ${err.message}`;
      }
    } else {
      errorMessage = err?.message || "Unknown JSON parsing error";
    }

    return errorMessage;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isJsonMode) {
      const validation = validateJsonInput(jsonText, jsonError);
      if (!validation.isValid) {
        setJsonError(validation.error);
        return;
      }

      try {
        const jsonFile = processJsonFile(jsonText);
        onUpload(jsonFile);
      } catch (err: any) {
        console.error("Invalid JSON format:", err);
        const errorMessage = formatJsonError(err, jsonText);
        setJsonError(errorMessage);
      }
    } else if (file) {
      onUpload(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.name.split(".").pop()?.toLowerCase();
      if (fileType === "csv" || fileType === "json") {
        setFile(droppedFile);
        await parseFile(droppedFile);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {/* JSON Mode Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <Label
            htmlFor="json-mode"
            className="text-base font-semibold cursor-pointer"
          >
            Use JSON Format
          </Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Switch to JSON mode to paste questions directly as JSON
          </span>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="json-mode"
            checked={isJsonMode}
            onChange={(e) => handleJsonModeToggle(e.target.checked)}
            disabled={loading}
            className="sr-only peer"
          />
          <div className="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 dark:peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 dark:peer-checked:bg-red-700"></div>
        </label>
      </div>

      {/* JSON Mode View */}
      {isJsonMode ? (
        <div className="space-y-2">
          <Label htmlFor="json-input">
            Questions JSON <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="json-input"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={20}
            disabled={loading}
            placeholder={`[\n  {\n    "title": "Question Title",\n    "content": "Question content...",\n    "type": "multiple-choice",\n    "difficulty": "beginner",\n    "category": "Category Name",\n    "topic": "Topic Name",\n    "options": [\n      {\n        "id": "A",\n        "text": "Option 1",\n        "isCorrect": true,\n        "explanation": ""\n      }\n    ],\n    "explanation": "Explanation...",\n    "points": 1,\n    "is_active": true\n  }\n]`}
            className="border-gray-300 dark:border-gray-600 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paste your questions array as JSON. The JSON will be validated
            before submission.
          </p>
          {jsonError && (
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">
                    JSON Validation Error
                  </p>
                  <p className="text-sm whitespace-pre-wrap font-mono text-xs">
                    {jsonError}
                  </p>
                  <p className="text-xs mt-2 text-red-600 dark:text-red-400">
                    Tip: Make sure all control characters (newlines, tabs) in
                    string values are properly escaped as \\n, \\t, etc.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-800/50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Drag and drop a CSV or JSON file here, or click to select
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <div className="mt-4 flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {file.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Question Preview */}
      {showPreview && previewQuestions.length > 0 && (
        <div className="space-y-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Preview (First 3 Questions)
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {totalQuestionsCount} total question
                  {totalQuestionsCount !== 1 ? "s" : ""} in file
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              {totalQuestionsCount} Total
            </Badge>
          </div>

          <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
            {previewQuestions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="space-y-3">
                  {/* Content Section */}
                  {question.content && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content:
                      </p>
                      <p className="text-sm text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">
                        {question.content}
                      </p>
                    </div>
                  )}

                  {/* Code preview with syntax highlighting */}
                  {question.code && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Code:
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                        <pre className="text-sm text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-pre-wrap">
                          {question.code}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Options Section */}
                  {question.options && question.options.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Options:
                      </p>
                      <div className="space-y-1">
                        {question.options.map((option: any) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2 text-sm text-gray-900 dark:text-gray-100"
                          >
                            <span className="font-medium">{option.id}.</span>
                            <span>{option.text}</span>
                            {option.isCorrect && (
                              <span className="text-green-600 dark:text-green-400 font-medium">
                                ✓
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation Section */}
                  {question.explanation && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Explanation:
                      </p>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {question.explanation}
                      </p>
                    </div>
                  )}

                  {/* Tags Section */}
                  {question.tags && question.tags.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tags:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {question.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Points Section */}
                  {question.points && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Points:
                      </p>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {question.points}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
