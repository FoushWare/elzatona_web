// Topic Form Component
// v2.0 - Form for creating and editing topics with bulk JSON support

"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../index";
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

const VALID_DIFFICULTIES = new Set(["beginner", "intermediate", "advanced"]);

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}

function validateTopicFromJson(
  topicData: Partial<TopicFormData>,
  index: number,
  categories: Category[],
): { topic?: TopicFormData; errors: string[] } {
  const topicErrors: string[] = [];

  if (!topicData.name?.trim()) {
    topicErrors.push(`Topic ${index + 1}: name is required`);
  }
  if (topicData.description && !topicData.description.trim()) {
    topicErrors.push(`Topic ${index + 1}: description is required`);
  }
  if (!topicData.categoryId) {
    topicErrors.push(`Topic ${index + 1}: categoryId is required`);
  }

  if (
    topicData.categoryId &&
    !categories.some((category) => category.id === topicData.categoryId)
  ) {
    topicErrors.push(
      `Topic ${index + 1}: categoryId "${topicData.categoryId}" not found`,
    );
  }

  if (topicData.difficulty && !VALID_DIFFICULTIES.has(topicData.difficulty)) {
    topicErrors.push(
      `Topic ${index + 1}: difficulty must be "beginner", "intermediate", or "advanced"`,
    );
  }

  if (topicErrors.length > 0) {
    return { errors: topicErrors };
  }

  const normalizedName = (topicData.name ?? "").trim();
  const slug = topicData.slug || (normalizedName ? toSlug(normalizedName) : "");

  return {
    errors: [],
    topic: {
      name: normalizedName,
      description: (topicData.description ?? "").trim(),
      categoryId: topicData.categoryId ?? "",
      difficulty: topicData.difficulty || "beginner",
      estimatedQuestions: topicData.estimatedQuestions || 10,
      slug,
      order: topicData.order || 1,
    },
  };
}

function extractTopicsArray(parsed: unknown): Array<Partial<TopicFormData>> {
  if (Array.isArray(parsed)) {
    return parsed;
  }
  if (
    parsed &&
    typeof parsed === "object" &&
    "topics" in parsed &&
    Array.isArray((parsed as { topics: unknown }).topics)
  ) {
    return (parsed as { topics: Array<Partial<TopicFormData>> }).topics;
  }
  return [];
}

function parseTopicsFromJsonText(
  text: string,
  categories: Category[],
): { topics: TopicFormData[]; error: string | null } {
  try {
    const parsed = JSON.parse(text);
    const topicsArray = extractTopicsArray(parsed);

    if (topicsArray.length === 0) {
      return {
        topics: [],
        error:
          'Invalid format. Expected an array of topics or an object with a "topics" property.',
      };
    }

    const validatedTopics: TopicFormData[] = [];
    const validationErrors: string[] = [];

    topicsArray.forEach((topicData, index) => {
      const { topic, errors: topicErrors } = validateTopicFromJson(
        topicData,
        index,
        categories,
      );

      if (topicErrors.length > 0) {
        validationErrors.push(...topicErrors);
        return;
      }

      if (topic) {
        validatedTopics.push(topic);
      }
    });

    if (validationErrors.length > 0) {
      return { topics: [], error: validationErrors.join("\n") };
    }

    return { topics: validatedTopics, error: null };
  } catch (error) {
    return {
      topics: [],
      error: error instanceof Error ? error.message : "Invalid JSON format",
    };
  }
}

function getSubmitButtonLabel(params: {
  isLoading: boolean;
  topic?: Topic;
  isJsonMode: boolean;
  parsedTopicsCount: number;
}): string {
  if (params.isLoading) {
    return "Saving...";
  }

  if (params.topic) {
    return "Update Topic";
  }

  if (params.isJsonMode) {
    return `Create ${params.parsedTopicsCount} Topic${params.parsedTopicsCount === 1 ? "" : "s"}`;
  }

  return "Create Topic";
}

const JsonModeToggleSection: React.FC<{
  isJsonMode: boolean;
  onToggle: (checked: boolean) => void;
  isLoading: boolean;
}> = ({ isJsonMode, onToggle, isLoading }) => (
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
        onChange={(e) => onToggle(e.target.checked)}
        disabled={isLoading}
        className="sr-only peer"
      />
      <div className="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 dark:peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 dark:peer-checked:bg-red-700"></div>
      <span className="ml-2 text-sm">JSON Mode</span>
    </label>
  </div>
);

const JsonInputSection: React.FC<{
  jsonText: string;
  setJsonText: (value: string) => void;
  isLoading: boolean;
  parsedTopicsCount: number;
  jsonError: string | null;
}> = ({ jsonText, setJsonText, isLoading, parsedTopicsCount, jsonError }) => (
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
      {parsedTopicsCount > 0 && (
        <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
          ✓ {parsedTopicsCount} valid topic
          {parsedTopicsCount === 1 ? "" : "s"} found
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
            <p className="text-sm font-semibold mb-1">JSON Validation Error</p>
            <p className="text-sm whitespace-pre-wrap font-mono text-xs">
              {jsonError}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

const SingleTopicFields: React.FC<{
  formData: TopicFormData;
  errors: Record<string, string>;
  categories: Category[];
  handleChange: (field: keyof TopicFormData, value: string | number) => void;
}> = ({ formData, errors, categories, handleChange }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Number.parseInt(e.target.value, 10) || 1,
            )
          }
          className={errors["estimatedQuestions"] ? "border-red-500" : ""}
        />
        {errors["estimatedQuestions"] && (
          <p className="text-sm text-red-500">{errors["estimatedQuestions"]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Order</Label>
        <Input
          id="order"
          type="number"
          min="1"
          value={formData["order"]}
          onChange={(e) =>
            handleChange("order", Number.parseInt(e.target.value, 10) || 1)
          }
          className={errors["order"] ? "border-red-500" : ""}
        />
        {errors["order"] && (
          <p className="text-sm text-red-500">{errors["order"]}</p>
        )}
      </div>
    </div>

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
);

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
  const formDataName = formData.name;
  useEffect(() => {
    if (!topic && formDataName && !isJsonMode) {
      const slug = toSlug(formDataName);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formDataName, topic, isJsonMode, setFormData]);

  // Parse JSON text with debouncing
  const parseJsonText = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setJsonError(null);
        setParsedTopics([]);
        return;
      }

      const { topics, error } = parseTopicsFromJsonText(text, categories);
      setJsonError(error);
      setParsedTopics(topics);
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

  const submitJsonTopics = async (): Promise<void> => {
    if (parsedTopics.length === 0) {
      setJsonError("No valid topics found. Please check your JSON format.");
      return;
    }

    if (jsonError) {
      return;
    }

    try {
      await onSubmit(parsedTopics);
    } catch (error) {
      console.error("Bulk topic submit failed:", error);
    }
  };

  const submitSingleTopic = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Topic form submit failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isJsonMode) {
      await submitJsonTopics();
      return;
    }

    await submitSingleTopic();
  };

  const handleChange = (field: keyof TopicFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const parsedTopicsCount = parsedTopics.length;
  const submitLabel = getSubmitButtonLabel({
    isLoading,
    topic,
    isJsonMode,
    parsedTopicsCount,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!topic && (
        <JsonModeToggleSection
          isJsonMode={isJsonMode}
          onToggle={handleJsonModeToggle}
          isLoading={isLoading}
        />
      )}

      {isJsonMode && !topic ? (
        <JsonInputSection
          jsonText={jsonText}
          setJsonText={setJsonText}
          isLoading={isLoading}
          parsedTopicsCount={parsedTopicsCount}
          jsonError={jsonError}
        />
      ) : (
        <SingleTopicFields
          formData={formData}
          errors={errors}
          categories={categories}
          handleChange={handleChange}
        />
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || (isJsonMode && parsedTopicsCount === 0)}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
