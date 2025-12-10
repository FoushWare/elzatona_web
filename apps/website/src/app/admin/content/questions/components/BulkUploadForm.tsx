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

interface BulkUploadFormProps {
  onUpload: (file: File) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  progress: { current: number; total: number } | null;
}

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

  // Highlight code for all preview questions
  useEffect(() => {
    if (!shikiHighlighter || previewQuestions.length === 0) {
      setCodeHighlightedHtml({});
      return;
    }

    const highlighted: Record<number, string> = {};

    previewQuestions.forEach((question, index) => {
      if (!question.code) return;

      try {
        const rawCode = String(question.code || "");
        let codeWithNewlines = rawCode
          .replace(/\\n/g, "\n")
          .replace(/\\r\\n/g, "\n")
          .replace(/\\r/g, "\n")
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n")
          .trim();

        // Remove empty lines at the start
        while (codeWithNewlines.startsWith("\n")) {
          codeWithNewlines = codeWithNewlines.substring(1);
        }

        // Remove empty lines at the end
        while (codeWithNewlines.endsWith("\n")) {
          codeWithNewlines = codeWithNewlines.slice(0, -1);
        }

        // Remove ALL blank lines
        const lines = codeWithNewlines.split("\n");
        const nonEmptyLines = lines.filter((line) => {
          const trimmed = line.trim();
          return trimmed.length > 0;
        });
        codeWithNewlines = nonEmptyLines.join("\n");

        // Final check
        if (codeWithNewlines.includes("\n\n")) {
          codeWithNewlines = codeWithNewlines.replace(/\n{2,}/g, "\n");
        }

        // Detect language
        let lang = "javascript";
        const codeText = codeWithNewlines.toLowerCase();
        if (
          codeText.includes("def ") ||
          (codeText.includes("import ") && codeText.includes("print"))
        ) {
          lang = "python";
        } else if (
          codeText.includes("public class") ||
          codeText.includes("public static")
        ) {
          lang = "java";
        } else if (
          codeText.includes("interface ") ||
          codeText.includes("type ") ||
          codeText.includes(": string")
        ) {
          lang = "typescript";
        }

        // Detect theme
        const prefersDark =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        const themeName = prefersDark ? "github-dark" : "github-light";

        let html = shikiHighlighter.codeToHtml(codeWithNewlines, {
          lang:
            lang === "typescript" ? "ts" : lang === "javascript" ? "js" : lang,
          theme: themeName,
        });

        // Post-process for light mode visibility
        if (typeof globalThis.window !== "undefined") {
          const prefersDark = globalThis.window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches;
          if (!prefersDark) {
            // Process HTML to darken light colors
            try {
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = html;
              const preElement = tempDiv.querySelector("pre");
              if (preElement) {
                const codeElement = preElement.querySelector("code");
                if (codeElement) {
                  // Remove empty lines
                  const lines = Array.from(
                    codeElement.querySelectorAll(".line"),
                  );
                  lines.forEach((line) => {
                    const text = (line.textContent || "").trim();
                    if (text.length === 0) {
                      line.remove();
                    }
                  });

                  // Darken light colors for visibility
                  const allSpans = codeElement.querySelectorAll("span");
                  allSpans.forEach((el) => {
                    const style =
                      (el as HTMLElement).getAttribute("style") || "";
                    const colorMatch = style.match(
                      /color:\s*(#[0-9a-fA-F]{6}|rgb\([^)]+\))/i,
                    );

                    if (colorMatch) {
                      const colorValue = colorMatch[1];
                      let shouldReplace = false;
                      let newColor = colorValue;

                      if (colorValue.startsWith("#")) {
                        const hex = colorValue.substring(1);
                        const r = parseInt(hex.substr(0, 2), 16);
                        const g = parseInt(hex.substr(2, 2), 16);
                        const b = parseInt(hex.substr(4, 2), 16);
                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                        if (brightness > 180) {
                          const factor = brightness > 220 ? 0.3 : 0.5;
                          const newR = Math.max(
                            0,
                            Math.min(255, Math.round(r * factor)),
                          );
                          const newG = Math.max(
                            0,
                            Math.min(255, Math.round(g * factor)),
                          );
                          const newB = Math.max(
                            0,
                            Math.min(255, Math.round(b * factor)),
                          );
                          newColor = `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
                          shouldReplace = true;
                        }
                      } else if (colorValue.startsWith("rgb")) {
                        const rgbMatch = colorValue.match(
                          /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
                        );
                        if (rgbMatch) {
                          const r = parseInt(rgbMatch[1]);
                          const g = parseInt(rgbMatch[2]);
                          const b = parseInt(rgbMatch[3]);
                          const brightness =
                            (r * 299 + g * 587 + b * 114) / 1000;

                          if (brightness > 180) {
                            const factor = brightness > 220 ? 0.3 : 0.5;
                            const newR = Math.max(
                              0,
                              Math.min(255, Math.round(r * factor)),
                            );
                            const newG = Math.max(
                              0,
                              Math.min(255, Math.round(g * factor)),
                            );
                            const newB = Math.max(
                              0,
                              Math.min(255, Math.round(b * factor)),
                            );
                            newColor = `rgb(${newR}, ${newG}, ${newB})`;
                            shouldReplace = true;
                          }
                        }
                      }

                      if (shouldReplace) {
                        const newStyle = style.replace(
                          /color:\s*(#[0-9a-fA-F]{6}|rgb\([^)]+\))/i,
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
                        (el as HTMLElement).setAttribute(
                          "style",
                          "color: #24292e;",
                        );
                      }
                    }
                  });

                  const cleanedCode = codeElement.innerHTML;
                  html = `<pre><code>${cleanedCode}</code></pre>`;
                }
              }
            } catch (e) {
              console.warn("DOM processing failed:", e);
            }
          } else {
            // Dark mode: just remove empty lines
            html = html.replace(
              /<span class="line">[\s\u00A0\u200B]*<\/span>/g,
              "",
            );
            html = html.replace(
              /<span[^>]*class="[^"]*line[^"]*">[\s\u00A0\u200B]*<\/span>/g,
              "",
            );
          }
        }

        highlighted[index] = html;
      } catch (error) {
        console.error("Error highlighting code for question", index, error);
      }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isJsonMode) {
      // Create a File from JSON text
      if (!jsonText.trim()) {
        return;
      }

      // Check if there's a JSON validation error
      if (jsonError) {
        // Don't submit if there's a JSON error
        return;
      }

      try {
        // First, try to clean up common JSON issues
        let cleanedJson = jsonText.trim();

        // Remove BOM if present
        const firstCodePoint = cleanedJson.codePointAt(0);
        if (firstCodePoint === 0xfeff) {
          cleanedJson = cleanedJson.slice(1);
        }

        // Validate JSON
        const data = JSON.parse(cleanedJson);
        const questions = Array.isArray(data) ? data : data.questions || [];

        if (questions.length === 0) {
          setJsonError(
            "JSON is valid but contains no questions. Please add at least one question.",
          );
          return;
        }

        // Create a File object from cleaned JSON text
        const blob = new Blob([cleanedJson], { type: "application/json" });
        const jsonFile = new File([blob], "questions.json", {
          type: "application/json",
        });
        onUpload(jsonFile);
      } catch (err: any) {
        console.error("Invalid JSON format:", err);

        // Provide helpful error message
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
            const context = jsonText.substring(start, end);
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

        // Set JSON error state to show to user
        setJsonError(errorMessage);
        return;
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
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload file"
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

                  {/* Code Section */}
                  {question.code &&
                    (() => {
                      const rawCode = String(question.code || "");
                      const codeWithNewlines = rawCode
                        .replace(/\\n/g, "\n")
                        .replace(/\\r\\n/g, "\n")
                        .replace(/\\r/g, "\n")
                        .replace(/\r\n/g, "\n")
                        .replace(/\r/g, "\n");

                      // Format code - remove blank lines
                      let formattedCode = codeWithNewlines.trim();
                      while (formattedCode.startsWith("\n")) {
                        formattedCode = formattedCode.substring(1);
                      }
                      while (formattedCode.endsWith("\n")) {
                        formattedCode = formattedCode.slice(0, -1);
                      }
                      const lines = formattedCode.split("\n");
                      const nonEmptyLines = lines.filter(
                        (line) => line.trim().length > 0,
                      );
                      formattedCode = nonEmptyLines.join("\n");
                      if (formattedCode.includes("\n\n")) {
                        formattedCode = formattedCode.replace(/\n{2,}/g, "\n");
                      }

                      const codeLines = formattedCode
                        .split("\n")
                        .filter((line) => line.trim().length > 0);

                      // Detect language
                      let detectedLanguage = "javascript";
                      const codeText = formattedCode.toLowerCase();
                      if (
                        codeText.includes("def ") ||
                        (codeText.includes("import ") &&
                          codeText.includes("print"))
                      ) {
                        detectedLanguage = "python";
                      } else if (
                        codeText.includes("public class") ||
                        codeText.includes("public static")
                      ) {
                        detectedLanguage = "java";
                      } else if (
                        codeText.includes("interface ") ||
                        codeText.includes("type ") ||
                        codeText.includes(": string")
                      ) {
                        detectedLanguage = "typescript";
                      } else if (
                        codeText.includes("function ") ||
                        codeText.includes("const ") ||
                        codeText.includes("let ")
                      ) {
                        detectedLanguage = "javascript";
                      }

                      // Detect theme
                      const prefersDark =
                        typeof window !== "undefined" &&
                        window.matchMedia("(prefers-color-scheme: dark)")
                          .matches;
                      const codeTheme = prefersDark ? "dark" : "light";
                      const highlightedHtml = codeHighlightedHtml[qIndex] || "";

                      return (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Code:
                          </p>
                          {/* Code display with Shiki syntax highlighting - same as guided practice */}
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
                                      codeTheme === "dark"
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    code.
                                    {detectedLanguage === "python"
                                      ? "py"
                                      : detectedLanguage === "java"
                                        ? "java"
                                        : detectedLanguage === "typescript"
                                          ? "ts"
                                          : "js"}
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
                                    codeTheme === "dark"
                                      ? "text-gray-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {detectedLanguage}
                                </span>
                              </div>
                            </div>

                            {/* Code content with Shiki highlighting */}
                            <div
                              className={`overflow-x-auto ${codeTheme === "dark" ? "bg-gray-900" : "bg-white border border-gray-200"}`}
                            >
                              {isLoadingShiki ? (
                                <div className="p-2 text-center text-xs text-gray-500">
                                  Loading syntax highlighting...
                                </div>
                              ) : highlightedHtml ? (
                                <div className="relative">
                                  {/* Line numbers background */}
                                  <div
                                    className={`absolute left-0 top-0 bottom-0 w-10 border-r ${
                                      codeTheme === "dark"
                                        ? "bg-gray-800/50 border-gray-700"
                                        : "bg-gray-100 border-gray-200"
                                    }`}
                                  ></div>

                                  {/* Shiki highlighted code with line numbers */}
                                  <div className="relative">
                                    <div
                                      className={`shiki-wrapper pl-10 ${codeTheme === "light" ? "shiki-light-mode" : "shiki-dark-mode"}`}
                                      dangerouslySetInnerHTML={{
                                        __html: highlightedHtml,
                                      }}
                                    />

                                    {/* Custom styles for Shiki output */}
                                    <style
                                      dangerouslySetInnerHTML={{
                                        __html: `
                                      .shiki-wrapper pre {
                                        margin: 0 !important;
                                        padding: 0.375rem 0 0.375rem 0 !important;
                                        background: transparent !important;
                                        overflow: visible !important;
                                        font-size: 0.75rem !important;
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
                                    `,
                                      }}
                                    />

                                    {/* Line numbers */}
                                    <div
                                      className="absolute left-0 top-0 flex flex-col"
                                      style={{ paddingTop: "0.375rem" }}
                                    >
                                      {codeLines.map((_, index) => (
                                        <span
                                          key={index}
                                          className={`select-none pr-2 pl-2 text-right min-w-[2.5rem] text-xs font-medium ${
                                            codeTheme === "dark"
                                              ? "text-gray-400"
                                              : "text-gray-500"
                                          }`}
                                          style={{
                                            lineHeight: "1.25",
                                            minHeight: "1.25rem",
                                            display: "block",
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
                                  <div
                                    className={`absolute left-0 top-0 bottom-0 w-10 border-r ${
                                      codeTheme === "dark"
                                        ? "bg-gray-800/50 border-gray-700"
                                        : "bg-gray-100 border-gray-200"
                                    }`}
                                  ></div>
                                  <pre className="m-0 p-2 pl-10 text-xs font-mono font-medium leading-relaxed">
                                    <code className="block">
                                      {codeLines.map((line, index) => (
                                        <div
                                          key={index}
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
                                            className={`flex-1 whitespace-pre pl-2 pr-2 py-0.5 text-xs ${
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
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  {/* Metadata badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {question.difficulty && (
                      <Badge variant="outline" className="text-xs capitalize">
                        {question.difficulty}
                      </Badge>
                    )}
                    {question.category && (
                      <Badge variant="secondary" className="text-xs">
                        {question.category}
                      </Badge>
                    )}
                    {question.topic && (
                      <Badge variant="outline" className="text-xs">
                        {question.topic}
                      </Badge>
                    )}
                    {question.type && (
                      <Badge variant="outline" className="text-xs">
                        {question.type}
                      </Badge>
                    )}
                  </div>
                </div>

                {question.options &&
                  Array.isArray(question.options) &&
                  question.options.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Options:
                      </p>
                      <div className="space-y-2 pl-2">
                        {question.options.map((option: any, oIndex: number) => (
                          <div
                            key={oIndex}
                            className={`flex items-start gap-2 p-2 rounded-md border ${
                              option.isCorrect
                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex items-center h-5 mt-0.5">
                              <input
                                type="checkbox"
                                checked={option.isCorrect || false}
                                readOnly
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:focus:ring-green-400"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm ${
                                  option.isCorrect
                                    ? "text-green-800 dark:text-green-200 font-medium"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {option.text || `Option ${oIndex + 1}`}
                              </p>
                              {option.explanation && (
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                                  {option.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {question.explanation && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Explanation:
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {question.explanation}
                    </p>
                  </div>
                )}

                {question.hints &&
                  Array.isArray(question.hints) &&
                  question.hints.length > 0 && (
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hints:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {question.hints.map((hint: string, hIndex: number) => (
                          <li
                            key={hIndex}
                            className="text-xs text-gray-600 dark:text-gray-400"
                          >
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {question.points && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Points:</span>
                    <Badge variant="outline" className="text-xs">
                      {question.points}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalQuestionsCount > 3 && (
            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
              <p className="text-xs text-center text-gray-600 dark:text-gray-400 italic">
                + {totalQuestionsCount - 3} more question
                {totalQuestionsCount - 3 !== 1 ? "s" : ""} will be uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1">Upload Errors</p>
              <p className="text-sm whitespace-pre-line">{error}</p>
            </div>
          </div>
        </div>
      )}

      {progress && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                Uploading questions...
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                Processing batch {progress.current} of {progress.total}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              {Math.round((progress.current / progress.total) * 100)}%
            </Badge>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-2 transition-all duration-300 ease-out"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
          <p className="text-sm">{success}</p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
          File Format Requirements:
        </h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <div>
            <p className="font-medium mb-1">
              <strong>JSON Format:</strong> Array of question objects
            </p>
            <p className="ml-2">
              <strong>Required fields:</strong> title, content
            </p>
            <p className="ml-2">
              <strong>Optional fields:</strong>
            </p>
            <ul className="ml-6 list-disc space-y-0.5">
              <li>
                type: &quot;multiple-choice&quot; | &quot;true-false&quot; |
                &quot;code&quot; &quot;true-false&quot; | &quot;code&quot;
              </li>
              <li>
                difficulty: &quot;beginner&quot; | &quot;intermediate&quot; |
                &quot;advanced&quot;
              </li>
              <li>
                category: string (e.g., &quot;HTML&quot;, &quot;CSS&quot;)
              </li>
              <li>topic: string (e.g., &quot;HTML5 Semantics&quot;)</li>
              <li>learningCardId: string</li>
              <li>isActive: boolean (default: true)</li>
              <li>tags: string[]</li>
              <li>explanation: string</li>
              <li>hints: string[]</li>
              <li>points: number</li>
              <li>
                options: Array of objects with id, text, isCorrect, explanation
              </li>
              <li>answer: string</li>
              <li>metadata: object</li>
            </ul>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
            <p className="font-medium mb-1">
              <strong>CSV Format:</strong> First row contains headers
            </p>
            <p className="ml-2">Required columns: title, content</p>
            <p className="ml-2">
              Optional columns: type, difficulty, category, topic,
              learningCardId, isActive, tags, explanation, hints, points, answer
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
            <p className="text-xs italic">
              Note: Fields can be in camelCase (isActive, learningCardId) or
              snake_case (is_active, learning_card_id). The system will
              automatically convert them.
            </p>
          </div>
        </div>
      </div>

      <DialogFooter className="gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            (!file && !isJsonMode) ||
            (isJsonMode && !jsonText.trim()) ||
            loading
          }
          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {progress
                ? `Uploading... (${progress.current}/${progress.total})`
                : "Uploading..."}
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Questions
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
