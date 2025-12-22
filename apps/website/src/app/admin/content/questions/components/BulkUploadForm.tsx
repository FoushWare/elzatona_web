"use client";

import React from "react";
import {
  Button,
  Badge,
  DialogFooter,
  Label,
  Textarea,
} from "@elzatona/components";
import { Upload, FileText, AlertTriangle, Loader2 } from "lucide-react";
import { useFormState, useFileProcessing, useShikiHighlighting } from "./BulkUploadFormHooks";
import { validateFile, validateQuestions, transformQuestionData } from "./BulkUploadFormUtils";

interface BulkUploadFormProps {
  onUpload: (questions: any[]) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  progress?: number;
}

export default function BulkUploadForm({
  onUpload,
  onCancel,
  loading = false,
  error = null,
  success = false,
  progress = 0,
}: BulkUploadFormProps) {
  // Extracted hooks for state management
  const {
    file,
    setFile,
    previewQuestions,
    setPreviewQuestions,
    totalQuestionsCount,
    setTotalQuestionsCount,
    showPreview,
    setShowPreview,
    fileInputRef,
    isJsonMode,
    setIsJsonMode,
    jsonText,
    setJsonText,
    jsonError,
    setJsonError,
  } = useFormState(error, success, loading);

  const { shikiHighlighter, isLoadingShiki, codeHighlightedHtml } = useShikiHighlighting(previewQuestions);
  const { processFile, validateJsonText } = useFileProcessing();

  // Event handlers
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setJsonError(validationError);
      return;
    }

    try {
      const questions = await processFile(selectedFile);
      const validationErrors = validateQuestions(questions);
      
      if (validationErrors.length > 0) {
        setJsonError(validationErrors.join(", "));
        return;
      }

      const transformedQuestions = transformQuestionData(questions);
      setFile(selectedFile);
      setPreviewQuestions(transformedQuestions);
      setTotalQuestionsCount(transformedQuestions.length);
      setShowPreview(true);
      setJsonError(null);
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Failed to process file");
    }
  };

  const handleJsonTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setJsonText(text);
    setJsonError(null);
  };

  const handleProcessJson = () => {
    try {
      const questions = validateJsonText(jsonText);
      const validationErrors = validateQuestions(questions);
      
      if (validationErrors.length > 0) {
        setJsonError(validationErrors.join(", "));
        return;
      }

      const transformedQuestions = transformQuestionData(questions);
      setPreviewQuestions(transformedQuestions);
      setTotalQuestionsCount(transformedQuestions.length);
      setShowPreview(true);
      setJsonError(null);
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Failed to process JSON");
    }
  };

  const handleUpload = () => {
    if (previewQuestions.length === 0) {
      setJsonError("No questions to upload");
      return;
    }
    onUpload(previewQuestions);
  };

  const handleToggleMode = () => {
    setIsJsonMode(!isJsonMode);
    setJsonError(null);
    if (!isJsonMode) {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setJsonText("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant={!isJsonMode ? "default" : "outline"}
            onClick={() => setIsJsonMode(false)}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            File Upload
          </Button>
          <Button
            type="button"
            variant={isJsonMode ? "default" : "outline"}
            onClick={() => setIsJsonMode(true)}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            JSON Text
          </Button>
        </div>
      </div>

      {/* File Upload Mode */}
      {!isJsonMode && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Drop your file here, or click to browse
                  </span>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept=".json,.csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  JSON, CSV, or Excel files up to 10MB
                </p>
              </div>
              {file && (
                <div className="mt-4">
                  <Badge variant="secondary">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* JSON Text Mode */}
      {isJsonMode && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="json-text">JSON Data</Label>
            <Textarea
              id="json-text"
              placeholder={`[
  {
    "question": "What is 2 + 2?",
    "correctAnswer": "4",
    "options": ["3", "4", "5", "6"],
    "explanation": "2 + 2 equals 4"
  }
]`}
              value={jsonText}
              onChange={handleJsonTextChange}
              className="min-h-[200px] font-mono text-sm"
              disabled={loading}
            />
          </div>
          <Button
            type="button"
            onClick={handleProcessJson}
            disabled={!jsonText.trim() || loading}
          >
            Process JSON
          </Button>
        </div>
      )}

      {/* Error Display */}
      {jsonError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-700">{jsonError}</span>
        </div>
      )}

      {/* Preview */}
      {showPreview && previewQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Preview ({totalQuestionsCount} questions)
            </h3>
            <Badge variant="secondary">
              {previewQuestions.length} of {totalQuestionsCount}
            </Badge>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-4">
            {previewQuestions.slice(0, 5).map((question, index) => (
              <div key={question.id || index} className="border rounded-lg p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">{question.question}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {question.options.map((option: string, optIndex: number) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          option === question.correctAnswer
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  {question.explanation && (
                    <p className="text-sm text-gray-600">{question.explanation}</p>
                  )}
                  {question.code && (
                    <div className="mt-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: codeHighlightedHtml[index] || "",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {previewQuestions.length > 5 && (
              <div className="text-center text-sm text-gray-500">
                ... and {previewQuestions.length - 5} more questions
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleUpload}
          disabled={previewQuestions.length === 0 || loading}
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Upload Questions
        </Button>
      </DialogFooter>
    </div>
  );
}
