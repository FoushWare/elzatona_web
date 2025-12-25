// Topic Form Component
// v2.0 - Form for creating and editing topics with bulk JSON support

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@elzatona/components";
import { Input } from "@elzatona/components";
import { Label } from "@elzatona/components";
import { Textarea } from "@elzatona/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@elzatona/components";
import { AlertTriangle } from "lucide-react";

// Define missing types
interface Topic {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  difficulty: string;
  estimatedQuestions: number;
  slug: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface TopicFormProps {
  topic?: Topic;
  categories: Category[];
  onSubmit: (data: TopicFormData | TopicFormData[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface TopicFormData {
  name: string;
  description: string;
  categoryId: string;
  difficulty: string;
  estimatedQuestions: number;
  slug: string;
  order: number;
}

const DIFFICULTIES = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Custom hook to consolidate topic form state management
const useTopicFormState = (
  topic: Topic | undefined,
  categories: Category[],
) => {
  const [formData, setFormData] = useState<TopicFormData>({
    name: topic?.name || "",
    description: topic?.description || "",
    categoryId: topic?.categoryId || categories[0]?.id || "",
    difficulty: topic?.difficulty || "beginner",
    estimatedQuestions: topic?.estimatedQuestions || 10,
    slug: topic?.slug || "",
    order: topic?.order || 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [parsedTopics, setParsedTopics] = useState<TopicFormData[]>([]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isJsonMode,
    setIsJsonMode,
    jsonText,
    setJsonText,
    jsonError,
    setJsonError,
    parsedTopics,
    setParsedTopics,
  };
};

export const TopicForm: React.FC<TopicFormProps> = ({
  topic,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    isJsonMode,
    setIsJsonMode,
    jsonText,
    setJsonText,
    jsonError,
    setJsonError,
    parsedTopics,
    setParsedTopics,
  } = useTopicFormState(topic, categories);

  // Auto-generate slug from name
  useEffect(() => {
    if (!topic && formData.name && !isJsonMode) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData, topic, isJsonMode, setFormData]);

  // Parse JSON text with debouncing
  const parseJsonText = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setJsonError(null);
        setParsedTopics([]);
        return;
      }

      try {
        const parsed = JSON.parse(text);
        let topicsArray: any[] = [];

        // Handle both array format and object with "topics" property
        if (Array.isArray(parsed)) {
          topicsArray = parsed;
        } else if (parsed.topics && Array.isArray(parsed.topics)) {
          topicsArray = parsed.topics;
        } else {
          setJsonError(
            'Invalid format. Expected an array of topics or an object with a "topics" property.',
          );
          setParsedTopics([]);
          return;
        }

        // Validate each topic
        const validatedTopics: TopicFormData[] = [];
        const validationErrors: string[] = [];

        topicsArray.forEach((topicData, index) => {
          const topicErrors: string[] = [];

          // Validate required fields
          if (!topicData.name || !topicData.name.trim()) {
            topicErrors.push(`Topic ${index + 1}: name is required`);
          }
          if (topicData.description && !topicData.description.trim()) {
            topicErrors.push(`Topic ${index + 1}: description is required`);
          }
          if (!topicData.categoryId) {
            topicErrors.push(`Topic ${index + 1}: categoryId is required`);
          }

          // Validate categoryId exists
          if (
            topicData.categoryId &&
            !categories.find((c) => c.id === topicData.categoryId)
          ) {
            topicErrors.push(
              `Topic ${index + 1}: categoryId "${topicData.categoryId}" not found`,
            );
          }

          // Validate difficulty
          if (
            topicData.difficulty &&
            !["beginner", "intermediate", "advanced"].includes(
              topicData.difficulty,
            )
          ) {
            topicErrors.push(
              `Topic ${index + 1}: difficulty must be "beginner", "intermediate", or "advanced"`,
            );
          }

          if (topicErrors.length > 0) {
            validationErrors.push(...topicErrors);
          } else {
            // Auto-generate slug if not provided
            let slug = topicData.slug || "";
            if (!slug && topicData.name) {
              slug = topicData.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }

            validatedTopics.push({
              name: topicData.name.trim(),
              description: topicData.description.trim(),
              categoryId: topicData.categoryId,
              difficulty: topicData.difficulty || "beginner",
              estimatedQuestions: topicData.estimatedQuestions || 10,
              slug: slug,
              order: topicData.order || 1,
            });
          }
        });

        if (validationErrors.length > 0) {
          setJsonError(validationErrors.join("\n"));
          setParsedTopics([]);
        } else {
          setJsonError(null);
          setParsedTopics(validatedTopics);
        }
      } catch (error) {
        setJsonError(
          error instanceof Error ? error.message : "Invalid JSON format",
        );
        setParsedTopics([]);
      }
    },
    [categories, setJsonError, setParsedTopics],
  );

  // Debounce JSON parsing
  useEffect(() => {
    if (!isJsonMode) return;

    const timeoutId = setTimeout(() => {
      parseJsonText(jsonText);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [jsonText, isJsonMode, parseJsonText]);

  const handleJsonModeToggle = (checked: boolean) => {
    setIsJsonMode(checked);
    if (!checked) {
      setJsonText("");
      setJsonError(null);
      setParsedTopics([]);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData["name"].trim()) {
      newErrors["name"] = "Topic name is required";
    }

    if (!formData["description"].trim()) {
      newErrors["description"] = "Description is required";
    }

    if (!formData["categoryId"]) {
      newErrors["categoryId"] = "Category is required";
    }

    if (!formData["slug"].trim()) {
      newErrors["slug"] = "Slug is required";
    }

    if (formData["estimatedQuestions"] < 1) {
      newErrors["estimatedQuestions"] =
        "Estimated questions must be at least 1";
    }

    if (formData["order"] < 1) {
      newErrors["order"] = "Order must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isJsonMode) {
      // Handle bulk JSON submission
      if (parsedTopics.length === 0) {
        setJsonError("No valid topics found. Please check your JSON format.");
        return;
      }

      if (jsonError) {
        return; // Don't submit if there are validation errors
      }

      try {
        await onSubmit(parsedTopics);
      } catch (error) {
        console.error("Error submitting topics:", error);
      }
    } else {
      // Handle single form submission
      if (!validateForm()) {
        return;
      }

      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Error submitting topic:", error);
      }
    }
  };

  const handleChange = (field: keyof TopicFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* JSON Mode Toggle - Only show when creating (not editing) */}
      {!topic && (
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="json-mode"
              className="text-base font-semibold cursor-pointer"
            >
              Use JSON Format
            </Label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Switch to JSON mode to paste topics directly as JSON array
            </span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="json-mode"
              checked={isJsonMode}
              onChange={(e) => handleJsonModeToggle(e.target.checked)}
              disabled={isLoading}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 dark:peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 dark:peer-checked:bg-red-700"></div>
          </label>
        </div>
      )}

      {/* JSON Mode View */}
      {isJsonMode && !topic ? (
        <div className="space-y-2">
          <Label htmlFor="json-input">
            Topics JSON <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="json-input"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={20}
            disabled={isLoading}
            placeholder={`[\n  {\n    "name": "Topic Name",\n    "description": "Topic description...",\n    "categoryId": "category-id-here",\n    "difficulty": "beginner",\n    "estimatedQuestions": 10,\n    "slug": "topic-slug",\n    "order": 1\n  },\n  {\n    "name": "Another Topic",\n    "description": "Another description...",\n    "categoryId": "category-id-here",\n    "difficulty": "intermediate",\n    "estimatedQuestions": 15,\n    "slug": "another-topic-slug",\n    "order": 2\n  }\n]`}
            className="border-gray-300 dark:border-gray-600 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paste your topics array as JSON. The JSON will be validated before
            submission.
            {parsedTopics.length > 0 && (
              <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
                ✓ {parsedTopics.length} valid topic
                {parsedTopics.length !== 1 ? "s" : ""} found
              </span>
            )}
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
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Topic Name *</Label>
              <Input
                id="name"
                value={formData["name"]}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., React Hooks"
                className={errors["name"] ? "border-red-500" : ""}
              />
              {errors["name"] && (
                <p className="text-sm text-red-500">{errors["name"]}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData["slug"]}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="e.g., react-hooks"
                className={errors["slug"] ? "border-red-500" : ""}
              />
              {errors["slug"] && (
                <p className="text-sm text-red-500">{errors["slug"]}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category *</Label>
              <Select
                value={formData["categoryId"]}
                onValueChange={(value) => handleChange("categoryId", value)}
              >
                <SelectTrigger
                  className={errors["categoryId"] ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors["categoryId"] && (
                <p className="text-sm text-red-500">{errors["categoryId"]}</p>
              )}
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData["difficulty"]}
                onValueChange={(value) => handleChange("difficulty", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Estimated Questions */}
            <div className="space-y-2">
              <Label htmlFor="estimatedQuestions">Estimated Questions</Label>
              <Input
                id="estimatedQuestions"
                type="number"
                min="1"
                value={formData["estimatedQuestions"]}
                onChange={(e) =>
                  handleChange(
                    "estimatedQuestions",
                    parseInt(e.target.value) || 1,
                  )
                }
                className={errors["estimatedQuestions"] ? "border-red-500" : ""}
              />
              {errors["estimatedQuestions"] && (
                <p className="text-sm text-red-500">
                  {errors["estimatedQuestions"]}
                </p>
              )}
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                min="1"
                value={formData["order"]}
                onChange={(e) =>
                  handleChange("order", parseInt(e.target.value) || 1)
                }
                className={errors["order"] ? "border-red-500" : ""}
              />
              {errors["order"] && (
                <p className="text-sm text-red-500">{errors["order"]}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData["description"]}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe what this topic covers..."
              rows={3}
              className={errors["description"] ? "border-red-500" : ""}
            />
            {errors["description"] && (
              <p className="text-sm text-red-500">{errors["description"]}</p>
            )}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || (isJsonMode && parsedTopics.length === 0)}
        >
          {(() => {
            if (isLoading) return "Saving...";
            if (topic) return "Update Topic";
            if (isJsonMode) {
              return `Create ${parsedTopics.length} Topic${parsedTopics.length !== 1 ? "s" : ""}`;
            }
            return "Create Topic";
          })()}
        </Button>
      </div>
    </form>
  );
};
