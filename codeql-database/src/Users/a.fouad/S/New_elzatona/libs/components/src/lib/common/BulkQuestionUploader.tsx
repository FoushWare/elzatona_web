"use client";

import React, { useState } from "react";
import { UnifiedQuestion, BulkQuestionData } from "@elzatona/types";
// Note: MarkdownQuestionParser is website-specific and should be imported where needed
// import { MarkdownQuestionParser } from '@/lib/markdown-question-parser';
import { useUnifiedQuestions } from "@elzatona/hooks";
import {
  Download,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Save,
  FileCode,
} from "lucide-react";

interface BulkQuestionUploaderProps {
  sectionId: string;
  sectionName: string;
  onQuestionsAdded?: (questions: unknown[]) => void;
  onClose?: () => void;
}

export default function BulkQuestionUploader({
  sectionId,
  sectionName,
  onQuestionsAdded,
  onClose,
}: BulkQuestionUploaderProps) {
  const { bulkImportQuestions } = useUnifiedQuestions({ autoLoad: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [questions, setQuestions] = useState<UnifiedQuestion[]>([
    {
      id: "",
      title: "",
      content: "",
      type: "multiple-choice",
      difficulty: "beginner",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      options: [
        { id: "a", text: "", isCorrect: false },
        { id: "b", text: "", isCorrect: false },
        { id: "c", text: "", isCorrect: false },
        { id: "d", text: "", isCorrect: false },
      ],
      explanation: "",
    },
  ]);

  const [jsonInput, setJsonInput] = useState("");
  const [markdownInput, setMarkdownInput] = useState("");
  const [inputMode, setInputMode] = useState<"form" | "json" | "markdown">(
    "form",
  );
  const [jsonParsed, setJsonParsed] = useState(false);
  const [markdownParsed, setMarkdownParsed] = useState(false);

  // Debug logging for state changes
  React.useEffect(() => {
    console.log("🔄 State changed:", {
      inputMode,
      markdownParsed,
      questionsLength: questions.length,
      markdownInputLength: markdownInput.length,
    });
  }, [inputMode, markdownParsed, questions.length, markdownInput.length]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: "",
        title: "",
        content: "",
        type: "multiple-choice",
        difficulty: "beginner",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        options: [
          { id: "a", text: "", isCorrect: false },
          { id: "b", text: "", isCorrect: false },
          { id: "c", text: "", isCorrect: false },
          { id: "d", text: "", isCorrect: false },
        ],
        explanation: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (
    index: number,
    field: keyof UnifiedQuestion,
    value:
      | "multiple-choice"
      | "open-ended"
      | "true-false"
      | "code"
      | "beginner"
      | "intermediate"
      | "advanced"
      | (string & Record<never, never>), // string must come last to avoid overriding literal types
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: "text" | "isCorrect",
    value: string | boolean,
  ) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const newOptions = [...(question.options || [])];
    newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };

    // If this is single choice and we're marking an option as correct, unmark others
    if (
      field === "isCorrect" &&
      value === true &&
      question.type === "multiple-choice"
    ) {
      newOptions.forEach((option, i) => {
        if (i !== optionIndex) option.isCorrect = false;
      });
    }

    question.options = newOptions;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const currentOptions = question.options || [];
    const newId = String.fromCharCode(97 + currentOptions.length);
    question.options = [
      ...currentOptions,
      { id: newId, text: "", isCorrect: false },
    ];
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const currentOptions = question.options || [];
    if (currentOptions.length > 2) {
      question.options = currentOptions.filter((_, i) => i !== optionIndex);
      setQuestions(newQuestions);
    }
  };

  // Handle JSON input parsing
  const parseJsonInput = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      // Handle both array format and object with questions property
      let questionsArray: UnifiedQuestion[];
      if (Array.isArray(parsed)) {
        questionsArray = parsed;
      } else if (parsed.questions && Array.isArray(parsed.questions)) {
        questionsArray = parsed.questions;
      } else {
        throw new Error(
          'Invalid format. Expected an array of questions or an object with a "questions" property.',
        );
      }

      // Validate each question
      const validatedQuestions = questionsArray.map((q, index) => {
        if (!q.title || !q.content) {
          throw new Error(
            `Question ${index + 1}: title and content are required`,
          );
        }

        if (!q.options || !Array.isArray(q.options)) {
          throw new Error(`Question ${index + 1}: options array is required`);
        }

        if (!q.options.some((opt: { isCorrect: boolean }) => opt.isCorrect)) {
          throw new Error(
            `Question ${index + 1}: at least one option must be marked as correct`,
          );
        }

        return {
          id: q.id || `q-${Date.now()}-${index}`,
          title: q.title || "",
          content: q.content || "",
          type: q.type || "multiple-choice",
          difficulty: q.difficulty || "beginner",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          options: q.options.map(
            (
              opt: { id: string; text: string; isCorrect: boolean },
              optIndex: number,
            ) => ({
              id: opt.id || String.fromCharCode(97 + optIndex), // a, b, c, d...
              text: opt.text || "",
              isCorrect: opt.isCorrect || false,
            }),
          ),
          explanation: q.explanation || "",
          category: q.category || sectionName || "General",
          learningPath: q.learningPath || sectionId || "Default Learning Path",
          topic: q.topic || "General Topic",
          tags: q.tags || [],
          points: q.points || 1,
        };
      });

      setQuestions(validatedQuestions);
      setError(null);
      setSuccess(
        `Successfully parsed ${validatedQuestions.length} questions from JSON!`,
      );
      setJsonParsed(true);
    } catch (error) {
      setError(
        `JSON parsing error: ${error instanceof Error ? error.message : "Invalid JSON format"}`,
      );
      setSuccess(null);
      setJsonParsed(false);
    }
  };

  // Handle Markdown input parsing
  const parseMarkdownInput = () => {
    // MarkdownQuestionParser is website-specific and not available in admin builds
    setError(
      "Markdown parsing is not available in the admin build. Please use JSON format instead.",
    );
    setSuccess(null);
    setMarkdownParsed(false);
  };

  const downloadMarkdownTemplate = () => {
    // MarkdownQuestionParser is website-specific and not available in admin builds
    setError("Markdown template download is not available in the admin build.");
    // Note: In website builds, this would generate and download a markdown template
  };

  // Generate JSON from current questions
  const generateJsonFromQuestions = () => {
    const jsonData = questions.map((q) => ({
      title: q.title,
      content: q.content,
      type: q.type,
      difficulty: q.difficulty,
      options: q.options,
      explanation: q.explanation,
      category: q.category || sectionName,
      learningPath: q.learningPath || sectionId,
      tags: q.tags || [],
      points: q.points || 1,
    }));

    setJsonInput(JSON.stringify(jsonData, null, 2));
  };

  const submitQuestions = async () => {
    console.log("🚀 Starting bulk question submission to Firebase...");
    console.log("Section ID:", sectionId);
    console.log("Questions to submit:", questions);

    // Basic validation
    const validQuestions = questions.filter(
      (q) =>
        q.title.trim() &&
        q.content.trim() &&
        q.options?.some((opt) => opt.text.trim()) &&
        q.options?.some((opt) => opt.isCorrect),
    );

    console.log("Valid questions after filtering:", validQuestions);

    if (validQuestions.length === 0) {
      setError("At least one complete question is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Transform questions to include required Firebase fields
      const firebaseQuestions = validQuestions.map((q) => ({
        ...q,
        learningPath: sectionId, // Use sectionId as learningPath
        category: sectionName, // Use sectionName as category
        subcategory: sectionName, // Use sectionName as subcategory
        sectionId: sectionId,
        tags: q.tags || [],
        points: q.points || 1,
        timeLimit: q.timeLimit || 60,
      }));

      console.log("📤 Calling bulkImportQuestions with Firebase...");
      console.log("📊 Firebase questions to send:", {
        count: firebaseQuestions.length,
        firstQuestion: firebaseQuestions[0]?.title || "No title",
        sampleQuestion: firebaseQuestions[0],
      });

      const bulkData: BulkQuestionData = {
        questions: firebaseQuestions,
        metadata: {
          source: "bulk-uploader",
          version: "1.0.0",
          totalCount: firebaseQuestions.length,
          categories: [
            ...new Set(
              firebaseQuestions.map((q) => q.category).filter(Boolean),
            ),
          ],
          difficulties: [
            ...new Set(firebaseQuestions.map((q) => q.difficulty)),
          ],
          learningPaths: [
            ...new Set(
              firebaseQuestions.map((q) => q.learningPath).filter(Boolean),
            ),
          ],
        },
        validation: {
          isValid: true,
          errors: [],
          warnings: [],
        },
      };

      console.log("📦 Bulk data structure:", {
        questionsCount: bulkData.questions.length,
        metadata: bulkData.metadata,
        validation: bulkData.validation,
      });

      const result = await bulkImportQuestions([bulkData]);

      console.log("📥 Firebase Import Result:", result);

      if (result.success > 0) {
        setSuccess(
          `${result.success} questions added successfully! ${result.failed > 0 ? `${result.failed} failed.` : ""}`,
        );
        setQuestions([
          {
            id: "",
            title: "",
            content: "",
            type: "multiple-choice",
            difficulty: "beginner",
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            options: [
              { id: "a", text: "", isCorrect: false },
              { id: "b", text: "", isCorrect: false },
              { id: "c", text: "", isCorrect: false },
              { id: "d", text: "", isCorrect: false },
            ],
            explanation: "",
          },
        ]);

        if (onQuestionsAdded) {
          onQuestionsAdded(firebaseQuestions);
        }
      } else {
        console.error("❌ No questions were imported:", result.errors);
        setError(`Failed to import questions: ${result.errors.join(", ")}`);
      }
    } catch (error) {
      console.error("❌ Exception during submission:", error);
      setError("Failed to add questions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitQuestions();
  };

  const downloadTemplate = () => {
    const template = {
      questions: [
        {
          title: "Sample Beginner Question",
          content: "What is the correct answer for a beginner-level question?",
          type: "multiple-choice",
          difficulty: "beginner",
          options: [
            { id: "a", text: "Option A", isCorrect: true },
            { id: "b", text: "Option B", isCorrect: false },
            { id: "c", text: "Option C", isCorrect: false },
            { id: "d", text: "Option D", isCorrect: false },
          ],
          correctAnswers: ["a"],
          explanation: "This is the correct answer because...",
          category: "Sample Category",
          learningPath: "Sample Learning Path",
          topic: "Sample Topic",
          tags: ["sample", "example", "beginner"],
          points: 5,
          timeLimit: 300,
          audioQuestion: "/audio/question-audio.mp3",
          audioAnswer: "/audio/answer-audio.mp3",
        },
        {
          title: "Sample Intermediate Question",
          content:
            "What is the correct answer for an intermediate-level question?",
          type: "multiple-choice",
          difficulty: "intermediate",
          options: [
            { id: "a", text: "Option A", isCorrect: false },
            { id: "b", text: "Option B", isCorrect: true },
            { id: "c", text: "Option C", isCorrect: false },
            { id: "d", text: "Option D", isCorrect: false },
          ],
          correctAnswers: ["b"],
          explanation: "This is the correct answer because...",
          category: "Sample Category",
          learningPath: "Sample Learning Path",
          topic: "Sample Topic",
          tags: ["sample", "example", "intermediate"],
          points: 10,
          timeLimit: 600,
        },
        {
          title: "Sample Advanced Question",
          content: "What is the correct answer for an advanced-level question?",
          type: "multiple-choice",
          difficulty: "advanced",
          options: [
            { id: "a", text: "Option A", isCorrect: false },
            { id: "b", text: "Option B", isCorrect: false },
            { id: "c", text: "Option C", isCorrect: true },
            { id: "d", text: "Option D", isCorrect: false },
          ],
          correctAnswers: ["c"],
          explanation: "This is the correct answer because...",
          category: "Sample Category",
          learningPath: "Sample Learning Path",
          topic: "Sample Topic",
          tags: ["sample", "example", "advanced"],
          points: 15,
          timeLimit: 900,
        },
      ],
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk-questions-template.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // clearMessages function removed - was unused

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Bulk Add Questions to {sectionName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add multiple questions at once. Incomplete questions will be saved
            for later editing.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Step-by-step guide */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          How to add questions:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Choose input method
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Form, JSON, or Markdown
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
              2
            </span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Parse your questions
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Click &quot;Parse&quot; to process them
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Save to Firebase
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Click &quot;Save X Questions&quot; to add them
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Mode Toggle */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Input Mode:
          </span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => {
                setInputMode("form");
                setJsonParsed(false);
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                inputMode === "form"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Form Input
            </button>
            <button
              onClick={() => {
                setInputMode("json");
                setJsonParsed(false);
                setMarkdownParsed(false);
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                inputMode === "json"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              JSON Array
            </button>
            <button
              onClick={() => {
                setInputMode("markdown");
                setJsonParsed(false);
                setMarkdownParsed(false);
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                inputMode === "markdown"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FileCode className="w-4 h-4 mr-1 inline" />
              Markdown
            </button>
          </div>
        </div>

        {/* JSON Input Mode */}
        {inputMode === "json" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Paste JSON Array of Questions:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={generateJsonFromQuestions}
                  className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  Generate from Form
                </button>
                <button
                  onClick={downloadTemplate}
                  className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  Download Template
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={`Paste your questions array here, for example:
[
  {
    "title": "What is React?",
    "content": "React is a JavaScript library for building user interfaces.",
    "type": "multiple-choice",
    "difficulty": "beginner",
    "options": [
      { "id": "a", "text": "A JavaScript library", "isCorrect": true },
      { "id": "b", "text": "A CSS framework", "isCorrect": false },
      { "id": "c", "text": "A database", "isCorrect": false },
      { "id": "d", "text": "A server", "isCorrect": false }
    ],
    "correctAnswers": ["a"],
    "explanation": "React is indeed a JavaScript library for building user interfaces.",
    "category": "Frontend Development",
    "learningPath": "React Fundamentals",
    "topic": "JavaScript Libraries",
    "tags": ["react", "javascript", "frontend"],
    "points": 5,
    "timeLimit": 300,
    "audioQuestion": "/audio/question-audio.mp3",
    "audioAnswer": "/audio/answer-audio.mp3"
  }
]

After pasting your JSON, click "Parse JSON" to process them, 
then click "Add X Questions to Firebase" to save them.`}
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={parseJsonInput}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Parse JSON</span>
              </button>
              <button
                onClick={() => {
                  setJsonInput("");
                  setJsonParsed(false);
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Clear
              </button>
              {jsonParsed && questions.length > 0 && questions[0].title && (
                <button
                  onClick={submitQuestions}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2 font-semibold shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  <span>
                    {loading
                      ? "Adding..."
                      : `Add ${questions.length} Questions to Firebase`}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Markdown Input Mode */}
        {inputMode === "markdown" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Paste Markdown Questions:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={downloadMarkdownTemplate}
                  className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  <Download className="w-3 h-3 mr-1 inline" />
                  Download Template
                </button>
              </div>
            </div>
            <textarea
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              placeholder={`Paste your markdown questions here, for example:

# Questions Template

## Multiple Choice Questions

1. What is the capital of France?
a) London
b) Berlin
c) Paris [correct]
d) Madrid

Explanation: Paris is the capital and largest city of France.

## True/False Questions

2. The sun rises in the west.
True
False [correct]

## Open-ended Questions

3. Explain the concept of object-oriented programming.

## Question with Metadata

4. What is React? [5 points]
a) A CSS framework
b) A JavaScript library [correct]
c) A database
d) A server

Category: Frontend Development
Tags: #react #javascript #frontend
Difficulty: easy

Explanation: React is a JavaScript library for building user interfaces.

---

After pasting your questions, click "Parse Markdown" to process them, 
then click "Save X Questions" to add them to Firebase.`}
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={parseMarkdownInput}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Parse Markdown</span>
              </button>
              <button
                onClick={() => {
                  setMarkdownInput("");
                  setMarkdownParsed(false);
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Clear
              </button>
              {markdownParsed && questions.length > 0 && (
                <button
                  onClick={submitQuestions}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2 font-semibold shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  <span>
                    {loading
                      ? "Adding Questions..."
                      : `Add ${questions.length} Questions to Firebase`}
                  </span>
                </button>
              )}

              {/* Debug info - remove this after testing */}
              {inputMode === "markdown" && (
                <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
                  <div>Debug Info:</div>
                  <div>
                    • markdownParsed: {markdownParsed ? "✅ true" : "❌ false"}
                  </div>
                  <div>• questions.length: {questions.length}</div>
                  <div>
                    • showSaveButton:{" "}
                    {markdownParsed && questions.length > 0
                      ? "✅ true"
                      : "❌ false"}
                  </div>
                  {questions.length > 0 && (
                    <div>
                      • First question title: &quot;
                      {questions[0]?.title || "No title"}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-600 dark:text-green-400 text-sm">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* Questions Summary - Show after parsing */}
      {(markdownParsed || jsonParsed) && questions.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Parsed Questions Summary
            </h3>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {questions.length} questions ready
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {questions.slice(0, 5).map((question, index) => (
              <div
                key={index}
                className="text-sm text-blue-700 dark:text-blue-300"
              >
                <span className="font-medium">{index + 1}.</span>{" "}
                {question.title || "Untitled Question"}
                <span className="ml-2 text-xs bg-blue-200 dark:bg-blue-700 px-2 py-1 rounded">
                  {question.type} • {question.difficulty}
                </span>
              </div>
            ))}
            {questions.length > 5 && (
              <div className="text-sm text-blue-600 dark:text-blue-400 italic">
                ... and {questions.length - 5} more questions
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Questions Call-to-Action - Show after parsing */}
      {(markdownParsed || jsonParsed) && questions.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Ready to Save Questions!
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm">
                {questions.length} questions have been parsed and are ready to
                be saved to Firebase. Click the button below to add them to the
                unified questions collection.
              </p>
            </div>
            <button
              onClick={submitQuestions}
              disabled={loading}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-3 font-bold text-lg shadow-xl"
            >
              <Save className="w-6 h-6" />
              <span>
                {loading
                  ? "Saving to Firebase..."
                  : `Save ${questions.length} Questions`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Template Download */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              Need a template?
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Download our JSON template to see the expected format
            </p>
          </div>
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </button>
        </div>
      </div>

      {/* Form Input Mode */}
      {inputMode === "form" && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Question {questionIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Question Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) =>
                      updateQuestion(questionIndex, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter question title"
                  />
                </div>

                {/* Question Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Content
                  </label>
                  <textarea
                    value={question.content}
                    onChange={(e) =>
                      updateQuestion(questionIndex, "content", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter the question content..."
                    rows={3}
                  />
                </div>

                {/* Question Type and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) =>
                        updateQuestion(questionIndex, "type", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="multiple">Multiple Choice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={question.difficulty}
                      onChange={(e) =>
                        updateQuestion(
                          questionIndex,
                          "difficulty",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Options */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Answer Options
                    </label>
                    <button
                      type="button"
                      onClick={() => addOption(questionIndex)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(question.options || []).map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) =>
                              updateOption(
                                questionIndex,
                                optionIndex,
                                "isCorrect",
                                e.target.checked,
                              )
                            }
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">
                            {option.id.toUpperCase()}.
                          </span>
                        </div>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            updateOption(
                              questionIndex,
                              optionIndex,
                              "text",
                              e.target.value,
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder={`Option ${option.id.toUpperCase()}`}
                        />
                        {(question.options || []).length > 2 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeOption(questionIndex, optionIndex)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Explanation
                  </label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) =>
                      updateQuestion(
                        questionIndex,
                        "explanation",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Explain why the correct answer is correct..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addQuestion}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Question</span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2 font-semibold shadow-lg"
            >
              <Save className="w-5 h-5" />
              <span>
                {loading
                  ? "Adding..."
                  : `Add ${questions.length} Questions to Firebase`}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
