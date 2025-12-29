import { useState, useEffect } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { highlightQuestionCode } from "./ViewQuestionModalUtils";

// Shiki syntax highlighting hook
export const useShikiHighlighting = (question: any) => {
  const [shikiHighlighter, setShikiHighlighter] = useState<Highlighter | null>(
    null,
  );
  const [isLoadingShiki, setIsLoadingShiki] = useState(true);
  const [codeHighlightedHtml, setCodeHighlightedHtml] = useState<string>("");

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
    if (!shikiHighlighter || !question?.code) {
      setCodeHighlightedHtml("");
      return;
    }

    const highlightCode = async () => {
      const html = await highlightQuestionCode(question, shikiHighlighter);
      setCodeHighlightedHtml(html || "");
    };

    highlightCode();
  }, [shikiHighlighter, question]);

  return {
    shikiHighlighter,
    isLoadingShiki,
    codeHighlightedHtml,
  };
};

// Modal state management hook
export const useModalState = (isOpen: boolean, onClose: () => void) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  };

  return {
    isAnimating,
    handleClose,
  };
};

// Question display options hook
export const useQuestionDisplay = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [showHints, setShowHints] = useState(false);

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const toggleCode = () => {
    setShowCode(!showCode);
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return {
    showExplanation,
    showCode,
    showHints,
    toggleExplanation,
    toggleCode,
    toggleHints,
  };
};

// Question statistics hook
export const useQuestionStats = (question: any) => {
  const [stats, setStats] = useState({
    totalAttempts: 0,
    correctAnswers: 0,
    averageTime: 0,
    difficulty: "medium",
  });

  useEffect(() => {
    if (question?.stats) {
      setStats({
        totalAttempts: question.stats.totalAttempts || 0,
        correctAnswers: question.stats.correctAnswers || 0,
        averageTime: question.stats.averageTime || 0,
        difficulty: question.difficulty || "medium",
      });
    }
  }, [question]);

  const successRate =
    stats.totalAttempts > 0
      ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100)
      : 0;

  return {
    stats,
    successRate,
  };
};
