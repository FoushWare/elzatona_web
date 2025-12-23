import { useState, useEffect, useRef } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import {
  parseJsonFile,
  parseCsvFile,
  highlightQuestionCode,
} from "./BulkUploadFormUtils";

// File management hook
export const useFileManagement = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewQuestions, setPreviewQuestions] = useState<any[]>([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetFileState = () => {
    setFile(null);
    setPreviewQuestions([]);
    setTotalQuestionsCount(0);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    file,
    setFile,
    previewQuestions,
    setPreviewQuestions,
    totalQuestionsCount,
    setTotalQuestionsCount,
    showPreview,
    setShowPreview,
    fileInputRef,
    resetFileState,
  };
};

// JSON mode hook
export const useJsonMode = () => {
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const resetJsonState = () => {
    setJsonText("");
    setJsonError(null);
  };

  return {
    isJsonMode,
    setIsJsonMode,
    jsonText,
    setJsonText,
    jsonError,
    setJsonError,
    resetJsonState,
  };
};

// Shiki syntax highlighting hook
export const useShikiHighlighting = (previewQuestions: any[]) => {
  const [shikiHighlighter, setShikiHighlighter] = useState<Highlighter | null>(
    null,
  );
  const [isLoadingShiki, setIsLoadingShiki] = useState(true);
  const [codeHighlightedHtml, setCodeHighlightedHtml] = useState<
    Record<number, string>
  >({});

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

  useEffect(() => {
    if (!shikiHighlighter || previewQuestions.length === 0) {
      setCodeHighlightedHtml({});
      return;
    }

    const highlightAllQuestions = async () => {
      const highlighted: Record<number, string> = {};

      for (let index = 0; index < previewQuestions.length; index++) {
        const question = previewQuestions[index];
        const html = await highlightQuestionCode(
          question,
          index,
          shikiHighlighter,
        );
        if (html) {
          highlighted[index] = html;
        }
      }

      setCodeHighlightedHtml(highlighted);
    };

    highlightAllQuestions();
  }, [shikiHighlighter, previewQuestions]);

  return {
    shikiHighlighter,
    isLoadingShiki,
    codeHighlightedHtml,
  };
};

// Form state management hook
export const useFormState = (
  error: string | null,
  success: boolean,
  loading: boolean,
) => {
  const fileManagement = useFileManagement();
  const jsonMode = useJsonMode();

  useEffect(() => {
    if (!error && !success && !loading) {
      fileManagement.resetFileState();
      jsonMode.resetJsonState();
    }
  }, [error, success, loading, fileManagement, jsonMode]);

  return {
    ...fileManagement,
    ...jsonMode,
  };
};

// File processing hook
export const useFileProcessing = () => {
  const processFile = async (file: File): Promise<any[]> => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType === "application/json" || fileName.endsWith(".json")) {
      return await parseJsonFile(file);
    } else if (fileType === "text/csv" || fileName.endsWith(".csv")) {
      return await parseCsvFile(file);
    } else {
      throw new Error(
        "Unsupported file type. Please upload a JSON or CSV file.",
      );
    }
  };

  const validateJsonText = (jsonText: string): any[] => {
    try {
      const data = JSON.parse(jsonText);
      if (!Array.isArray(data)) {
        throw new Error("JSON must be an array of questions.");
      }
      return data;
    } catch (error) {
      throw new Error("Invalid JSON format. Please check your syntax.");
    }
  };

  return {
    processFile,
    validateJsonText,
  };
};
