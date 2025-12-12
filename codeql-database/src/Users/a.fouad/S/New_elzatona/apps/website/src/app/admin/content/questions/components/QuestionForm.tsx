"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DialogFooter,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@elzatona/components";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { UnifiedQuestion } from "@elzatona/types";

type Question = UnifiedQuestion;

interface QuestionFormProps {
  initialData?: Question | undefined;
  onSubmit: (question: Partial<Question>) => void;
  onCancel: () => void;
  cards: any[];
  allCategories: string[];
  allTags: string[];
  categoriesData: any[];
  topicsData: any[];
  disabled?: boolean;
  hideFooter?: boolean;
  externalSubmitTrigger?: number;
}

export function QuestionForm({
  initialData,
  onSubmit,
  onCancel,
  cards,
  allCategories: _allCategories,
  allTags: _allTags,
  categoriesData,
  topicsData,
  disabled = false,
  hideFooter = false,
  externalSubmitTrigger,
}: QuestionFormProps) {
  // State for collapsible sections - both closed by default
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // State for JSON mode toggle
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("");

  // State for resources JSON mode toggle
  const [isResourcesJsonMode, setIsResourcesJsonMode] = useState(false);

  // Search state for dropdowns
  const [categorySearch, setCategorySearch] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  const [learningCardSearch, setLearningCardSearch] = useState("");

  const [formData, setFormData] = useState<Partial<Question>>(
    initialData || {
      title: "",
      content: "",
      type: "multiple-choice",
      difficulty: "beginner",
      is_active: true,
      options: [],
      sampleAnswers: [],
      tags: [],
      points: 1,
      timeLimit: 60,
      explanation: "",
    },
  );

  // Helper function to extract category name from initialData
  const extractCategoryName = (data: any): string => {
    if (data.category) return data.category;
    if (
      data.categories &&
      Array.isArray(data.categories) &&
      data.categories[0]?.name
    ) {
      return data.categories[0].name;
    }
    if (
      data.categories &&
      typeof data.categories === "object" &&
      data.categories.name
    ) {
      return data.categories.name;
    }
    return "";
  };

  // Helper function to extract topic name from initialData
  const extractTopicName = (data: any): string => {
    if (data.topic) return data.topic;
    if (data.topics && Array.isArray(data.topics) && data.topics[0]?.name) {
      return data.topics[0].name;
    }
    if (data.topics && typeof data.topics === "object" && data.topics.name) {
      return data.topics.name;
    }
    return "";
  };

  // Helper function to extract learning card ID from initialData
  const extractLearningCardId = (data: any): string => {
    if (data.learningCardId) return data.learningCardId;
    if (data.learning_card_id) return data.learning_card_id;
    if (data.learning_card?.id) return data.learning_card.id;
    if (data.learning_cards?.id) return data.learning_cards.id;
    return "";
  };

  // Helper function to normalize resources
  const normalizeResources = (resourcesValue: any): any[] | null => {
    if (resourcesValue === null || resourcesValue === undefined) {
      return null;
    }
    if (Array.isArray(resourcesValue)) {
      return resourcesValue;
    }
    if (typeof resourcesValue === "string") {
      try {
        const parsed = JSON.parse(resourcesValue);
        return Array.isArray(parsed) ? parsed : null;
      } catch {
        return null;
      }
    }
    // If it's an object but not an array, wrap it in an array
    return [resourcesValue];
  };

  useEffect(() => {
    if (!initialData) return;

    const categoryName = extractCategoryName(initialData);
    const topicName = extractTopicName(initialData);
    const learningCardId = extractLearningCardId(initialData);

    console.log("📝 Initializing form with:", {
      categoryName,
      topicName,
      learningCardId,
      initialData,
    });

    const _normalizedResources = normalizeResources(
      (initialData as any).resources,
    );

    const updatedFormData = {
      ...initialData,
      options: initialData.options || [],
      sampleAnswers: initialData.sampleAnswers || [],
      tags: initialData.tags || [],
      explanation: initialData.explanation || "",
      codeTemplate: initialData.codeTemplate || "",
      category: categoryName,
      topic: topicName,
      learningCardId: learningCardId,
    };

    setFormData(updatedFormData);

    // Initialize JSON text if in JSON mode
    if (isJsonMode) {
      setJsonText(JSON.stringify(updatedFormData, null, 2));
    }
  }, [initialData, isJsonMode]);

  // Filtered categories based on search
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categoriesData;
    const searchLower = categorySearch.toLowerCase();
    return categoriesData.filter((cat: any) =>
      (cat.name || cat.title || "").toLowerCase().includes(searchLower),
    );
  }, [categoriesData, categorySearch]);

  // Filtered learning cards based on search
  const filteredCards = useMemo(() => {
    if (!learningCardSearch.trim()) return cards;
    const searchLower = learningCardSearch.toLowerCase();
    return cards.filter((card: any) =>
      (card.title || "").toLowerCase().includes(searchLower),
    );
  }, [cards, learningCardSearch]);

  const filteredTopics = useMemo(() => {
    if (!formData.category) {
      console.log("🔍 No category selected, returning empty topics");
      return [];
    }
    const selectedCategory = categoriesData.find(
      (cat: any) => (cat.name || cat.title) === formData.category,
    );
    if (!selectedCategory) {
      console.log(
        "⚠️ Category not found:",
        formData.category,
        "Available categories:",
        categoriesData.map((c: any) => c.name || c.title),
      );
      return [];
    }
    let filtered = topicsData.filter(
      (topic: any) =>
        topic.categoryId === selectedCategory.id ||
        topic.category_id === selectedCategory.id,
    );

    // Apply topic search filter
    if (topicSearch.trim()) {
      const searchLower = topicSearch.toLowerCase();
      filtered = filtered.filter((topic: any) =>
        (topic.name || topic.title || "").toLowerCase().includes(searchLower),
      );
    }

    const uniqueTopicsMap = new Map<string, any>();

    filtered.forEach((topic: any, index: number) => {
      const topicName = (topic.name || topic.title || "").trim();

      if (!topicName) {
        console.warn("⚠️ Topic with no name/title found:", topic);
        return;
      }

      const normalizedName = topicName.toLowerCase().trim();

      if (!uniqueTopicsMap.has(normalizedName)) {
        uniqueTopicsMap.set(normalizedName, topic);
      } else {
        const existing = uniqueTopicsMap.get(normalizedName);
        if (topic.id && !existing.id) {
          uniqueTopicsMap.set(normalizedName, topic);
          console.warn(
            "⚠️ Duplicate topic name found, keeping topic with ID:",
            topicName,
            topic,
          );
        } else if (existing.id && !topic.id) {
          console.warn(
            "⚠️ Duplicate topic name found, keeping existing topic with ID:",
            topicName,
            existing,
          );
        } else {
          console.warn(
            "⚠️ Duplicate topic name found, keeping first occurrence:",
            topicName,
            { existing, new: topic, index },
          );
        }
      }
    });

    const uniqueTopics = Array.from(uniqueTopicsMap.values());

    console.log(
      "🔍 Filtered topics for category",
      formData.category,
      ":",
      uniqueTopics.length,
      "topics (deduplicated from",
      filtered.length,
      ")",
    );
    return uniqueTopics;
  }, [formData.category, categoriesData, topicsData, topicSearch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (disabled) return;
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: keyof Question, value: string) => {
    if (disabled) return;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Resource management functions
  const handleResourceChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    if (disabled) return;
    const updatedResources = [...(formData.resources || [])];
    if (!updatedResources[index]) {
      updatedResources[index] = { type: "video", title: "", url: "" };
    }
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value,
    };
    setFormData((prev: any) => ({ ...prev, resources: updatedResources }));
  };

  const handleAddResource = () => {
    if (disabled) return;
    const newResource = { type: "video", title: "", url: "" };
    setFormData((prev: any) => ({
      ...prev,
      resources: [...(prev.resources || []), newResource],
    }));
  };

  const handleRemoveResource = (index: number) => {
    if (disabled) return;
    const updatedResources = [...(formData.resources || [])];
    updatedResources.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      resources: updatedResources.length > 0 ? updatedResources : null,
    }));
  };

  // Handle JSON mode toggle
  const handleJsonModeToggle = (checked: boolean) => {
    setIsJsonMode(checked);
    if (checked) {
      // Convert form data to JSON when switching to JSON mode
      setJsonText(JSON.stringify(formData, null, 2));
    } else {
      // Parse JSON back to form data when switching to form mode
      try {
        if (jsonText.trim()) {
          const parsed = JSON.parse(jsonText);
          setFormData(parsed);
        }
      } catch (err) {
        console.error("Invalid JSON format:", err);
        // Keep current form data if JSON is invalid
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (disabled) return;

    let dataToSubmit: Partial<Question>;

    if (isJsonMode) {
      // Parse JSON when submitting in JSON mode
      try {
        if (!jsonText.trim()) {
          console.error("JSON text is empty");
          return;
        }
        dataToSubmit = JSON.parse(jsonText);
      } catch (err) {
        console.error("Invalid JSON format:", err);
        alert("Invalid JSON format. Please check your JSON syntax.");
        return;
      }
    } else {
      dataToSubmit = formData;
    }

    console.log("📤 Submitting question form:", {
      title: dataToSubmit.title,
      content: dataToSubmit.content,
      category: dataToSubmit.category,
      topic: dataToSubmit.topic,
      learningCardId: dataToSubmit.learningCardId,
      type: dataToSubmit.type,
      difficulty: dataToSubmit.difficulty,
      isJsonMode,
    });
    onSubmit(dataToSubmit);
  };

  // Handle external submit trigger
  useEffect(() => {
    if (
      externalSubmitTrigger !== undefined &&
      externalSubmitTrigger > 0 &&
      !disabled
    ) {
      let dataToSubmit: Partial<Question>;

      if (isJsonMode) {
        // Parse JSON when submitting in JSON mode
        try {
          if (!jsonText.trim()) {
            console.error("JSON text is empty");
            return;
          }
          dataToSubmit = JSON.parse(jsonText);
        } catch (err) {
          console.error("Invalid JSON format:", err);
          alert("Invalid JSON format. Please check your JSON syntax.");
          return;
        }
      } else {
        dataToSubmit = formData;
      }

      console.log("📤 Submitting question form (external trigger):", {
        title: dataToSubmit.title,
        content: dataToSubmit.content,
        category: dataToSubmit.category,
        topic: dataToSubmit.topic,
        learningCardId: dataToSubmit.learningCardId,
        type: dataToSubmit.type,
        difficulty: dataToSubmit.difficulty,
        isJsonMode,
      });
      onSubmit(dataToSubmit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSubmitTrigger, disabled, isJsonMode, jsonText]);

  const questionTypes = ["multiple-choice", "true-false", "code"];
  const difficulties = ["beginner", "intermediate", "advanced"];

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
            Switch to JSON mode to input question data as JSON
          </span>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="json-mode"
            checked={isJsonMode}
            onChange={(e) => handleJsonModeToggle(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
          />
          <div className="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 dark:peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 dark:peer-checked:bg-red-700"></div>
        </label>
      </div>

      {/* JSON Mode View */}
      {isJsonMode ? (
        <div className="space-y-2">
          <Label htmlFor="json-input">
            Question JSON <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="json-input"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={20}
            disabled={disabled}
            placeholder={`{\n  "title": "Question Title",\n  "content": "Question content...",\n  "type": "multiple-choice",\n  "difficulty": "beginner",\n  "category": "Category Name",\n  "topic": "Topic Name",\n  "options": [\n    {\n      "id": "o1",\n      "text": "Option 1",\n      "isCorrect": true,\n      "explanation": ""\n    }\n  ],\n  "explanation": "Explanation...",\n  "points": 1,\n  "is_active": true\n}`}
            className="border-gray-300 dark:border-gray-600 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enter the complete question data as JSON. The JSON will be validated
            before submission.
          </p>
        </div>
      ) : (
        <>
          {/* Regular Form View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                required
                disabled={disabled}
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="type">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type || "multiple-choice"}
                onValueChange={(value) => handleSelectChange("type", value)}
                disabled={disabled}
              >
                <SelectTrigger
                  className="border-gray-300 dark:border-gray-600"
                  disabled={disabled}
                >
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="z-[110]">
                  {questionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category || ""}
                onValueChange={(value) => {
                  handleSelectChange("category", value);
                  setFormData((prev: any) => ({ ...prev, topic: undefined }));
                  setTopicSearch(""); // Clear topic search when category changes
                }}
                disabled={disabled}
              >
                <SelectTrigger
                  className="border-gray-300 dark:border-gray-600"
                  disabled={disabled}
                >
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="z-[110]">
                  {/* Search Input for Categories */}
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search categories..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8 pr-8 h-8 text-sm"
                      />
                      {categorySearch && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCategorySearch("");
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {filteredCategories.length === 0 ? (
                    <SelectItem value="no-results" disabled>
                      {categorySearch
                        ? "No categories found"
                        : "Loading categories..."}
                    </SelectItem>
                  ) : (
                    filteredCategories.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.name || category.title}
                      >
                        {category.name || category.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="topic">
                Topic{" "}
                <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                  (Optional)
                </span>
              </Label>
              <Select
                value={formData.topic || ""}
                onValueChange={(value) => handleSelectChange("topic", value)}
                disabled={
                  disabled || !formData.category || filteredTopics.length === 0
                }
              >
                <SelectTrigger
                  className="border-gray-300 dark:border-gray-600 disabled:opacity-50"
                  disabled={
                    disabled ||
                    !formData.category ||
                    filteredTopics.length === 0
                  }
                >
                  <SelectValue
                    placeholder={
                      !formData.category
                        ? "Select category first"
                        : "Select Topic (Optional)"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="z-[110]">
                  {/* Search Input for Topics */}
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search topics..."
                        value={topicSearch}
                        onChange={(e) => setTopicSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8 pr-8 h-8 text-sm"
                        disabled={
                          !formData.category || filteredTopics.length === 0
                        }
                      />
                      {topicSearch && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTopicSearch("");
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic: any, index: number) => {
                      const topicId = topic.id || `no-id-${index}`;
                      const topicName = (
                        topic.name ||
                        topic.title ||
                        `no-name-${index}`
                      ).trim();
                      const uniqueKey = `topic-${topicId}-${topicName.replace(/\s+/g, "-")}-${index}`;

                      return (
                        <SelectItem key={uniqueKey} value={topicName}>
                          {topicName}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectItem value="no-topics" disabled>
                      {!formData.category
                        ? "Select category first"
                        : topicSearch
                          ? "No topics found"
                          : "No topics available for this category"}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="difficulty">
                Difficulty <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.difficulty || "beginner"}
                onValueChange={(value) =>
                  handleSelectChange("difficulty", value)
                }
                disabled={disabled}
              >
                <SelectTrigger
                  className="border-gray-300 dark:border-gray-600"
                  disabled={disabled}
                >
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent className="z-[110]">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="learningCardId">
                Learning Card{" "}
                <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                  (Optional)
                </span>
              </Label>
              <Select
                value={formData.learningCardId || ""}
                onValueChange={(value) =>
                  handleSelectChange(
                    "learningCardId",
                    value === "none" ? "" : value,
                  )
                }
                disabled={disabled}
              >
                <SelectTrigger
                  className="border-gray-300 dark:border-gray-600"
                  disabled={disabled}
                >
                  <SelectValue placeholder="Select Learning Card (Optional)" />
                </SelectTrigger>
                <SelectContent className="z-[110] max-h-[300px]">
                  {/* Search Input for Learning Cards */}
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search learning cards..."
                        value={learningCardSearch}
                        onChange={(e) => setLearningCardSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8 pr-8 h-8 text-sm"
                      />
                      {learningCardSearch && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLearningCardSearch("");
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <SelectItem
                    value="none"
                    className="text-gray-500 dark:text-gray-400 italic"
                  >
                    None (No Learning Card)
                  </SelectItem>
                  {filteredCards.length === 0 ? (
                    <SelectItem value="no-results" disabled>
                      {learningCardSearch
                        ? "No cards found"
                        : "Loading cards..."}
                    </SelectItem>
                  ) : (
                    filteredCards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                name="points"
                type="number"
                value={formData.points || 1}
                onChange={handleChange}
                disabled={disabled}
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Content Section - Collapsible */}
          <Collapsible open={isContentOpen} onOpenChange={setIsContentOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                {isContentOpen ? (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
                <Label
                  htmlFor="content"
                  className="text-base font-semibold cursor-pointer"
                >
                  Content <span className="text-red-500">*</span>
                </Label>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isContentOpen ? "Click to collapse" : "Click to expand"}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-2">
              <Textarea
                id="content"
                name="content"
                value={formData.content || ""}
                onChange={handleChange}
                required
                rows={6}
                disabled={disabled}
                placeholder="Enter the question content or description..."
                className="border-gray-300 dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Provide the main question content or description that users will
                see.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* Options Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              {!disabled && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newOptions = [...(formData.options || [])];
                    newOptions.push({
                      id: `o${newOptions.length + 1}`,
                      text: "",
                      isCorrect: false,
                      explanation: "",
                    });
                    setFormData((prev: any) => ({
                      ...prev,
                      options: newOptions,
                    }));
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </Button>
              )}
            </div>

            {formData.options && formData.options.length > 0 ? (
              <div className="space-y-3">
                {formData.options.map((option: any, index: number) => (
                  <div
                    key={option.id || index}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-2 h-10 mt-1">
                      <Checkbox
                        id={`isCorrect-${index}`}
                        checked={option.isCorrect || false}
                        onCheckedChange={(checked) => {
                          if (disabled) return;
                          const newOptions = [...(formData.options || [])];
                          newOptions[index] = {
                            ...newOptions[index],
                            isCorrect: !!checked,
                          };
                          setFormData((prev: any) => ({
                            ...prev,
                            options: newOptions,
                          }));
                        }}
                        disabled={disabled}
                        className="w-5 h-5"
                      />
                      <Label
                        htmlFor={`isCorrect-${index}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        Is Correct
                      </Label>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder={`Option ${index + 1} text`}
                        value={option.text || ""}
                        onChange={(e) => {
                          if (disabled) return;
                          const newOptions = [...(formData.options || [])];
                          newOptions[index] = {
                            ...newOptions[index],
                            text: e.target.value,
                          };
                          setFormData((prev: any) => ({
                            ...prev,
                            options: newOptions,
                          }));
                        }}
                        disabled={disabled}
                        className="w-full border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    {!disabled && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newOptions = [...(formData.options || [])];
                          newOptions.splice(index, 1);
                          setFormData((prev: any) => ({
                            ...prev,
                            options: newOptions,
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                No options added. Click &quot;Add Option&quot; to add options.
              </div>
            )}
          </div>

          {/* Code Field */}
          <div>
            <Label htmlFor="codeTemplate">
              Code Template{" "}
              <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                (Optional - Displayed as formatted code block)
              </span>
            </Label>
            <Textarea
              id="codeTemplate"
              name="codeTemplate"
              value={formData.codeTemplate || ""}
              onChange={handleChange}
              rows={10}
              disabled={disabled}
              placeholder="Enter code snippet here (will be displayed as formatted code block)..."
              className="border-gray-300 dark:border-gray-600 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Code will be displayed as a formatted code block in question
              details. Supports syntax highlighting.
            </p>
          </div>

          {/* Explanation */}
          <div>
            <Label htmlFor="explanation">Explanation</Label>
            <Textarea
              id="explanation"
              name="explanation"
              value={formData.explanation || ""}
              onChange={handleChange}
              rows={4}
              disabled={disabled}
              placeholder="Provide an explanation for the correct answer..."
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Learning Resources Section - Collapsible */}
          <Collapsible open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                {isResourcesOpen ? (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
                <Label
                  htmlFor="resources"
                  className="text-base font-semibold cursor-pointer"
                >
                  Learning Resources{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                    (Optional)
                  </span>
                </Label>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {(() => {
                  if (formData.resources && Array.isArray(formData.resources)) {
                    return `${formData.resources.length} resource${formData.resources.length !== 1 ? "s" : ""}`;
                  }
                  return isResourcesOpen
                    ? "Click to collapse"
                    : "Click to expand";
                })()}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              {/* Toggle between Form and JSON Mode */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="resources-json-mode"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Use JSON Format
                  </Label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Switch to JSON mode to paste resources directly
                  </span>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="resources-json-mode"
                    checked={isResourcesJsonMode}
                    onChange={(e) => setIsResourcesJsonMode(e.target.checked)}
                    disabled={disabled}
                    className="sr-only peer"
                  />
                  <div className="relative w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-700"></div>
                </label>
              </div>

              {/* JSON Mode */}
              {isResourcesJsonMode ? (
                <div className="space-y-2">
                  <Textarea
                    id="resources-json"
                    name="resources-json"
                    value={
                      formData.resources
                        ? JSON.stringify(formData.resources, null, 2)
                        : ""
                    }
                    onChange={(e) => {
                      if (disabled) return;
                      try {
                        const value = e.target.value.trim();
                        if (!value) {
                          setFormData((prev: any) => ({
                            ...prev,
                            resources: null,
                          }));
                          return;
                        }
                        const parsed = JSON.parse(value);
                        if (Array.isArray(parsed)) {
                          setFormData((prev: any) => ({
                            ...prev,
                            resources: parsed,
                          }));
                        } else if (parsed && typeof parsed === "object") {
                          setFormData((prev: any) => ({
                            ...prev,
                            resources: [parsed],
                          }));
                        } else {
                          console.warn(
                            "Resources must be an array or object. Got:",
                            typeof parsed,
                          );
                        }
                      } catch (err) {
                        console.warn(
                          "Invalid JSON for resources (still typing?):",
                          err,
                        );
                      }
                    }}
                    rows={12}
                    disabled={disabled}
                    placeholder={`[\n  {\n    "type": "video",\n    "title": "CSS clamp() Tutorial",\n    "url": "https://youtube.com/watch?v=...",\n    "description": "Learn clamp() in 10 minutes",\n    "duration": "10:30",\n    "author": "Web Dev Simplified"\n  },\n  {\n    "type": "article",\n    "title": "CSS clamp() Guide",\n    "url": "https://css-tricks.com/clamp/",\n    "description": "Complete guide to clamp()"\n  }\n]`}
                    className="border-gray-300 dark:border-gray-600 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter a JSON array of resource objects. Each resource should
                    have: type (video/course/article), title, url, and
                    optionally description, duration, author.
                  </p>
                </div>
              ) : (
                /* Form Mode */
                <div className="space-y-4">
                  {formData.resources &&
                  Array.isArray(formData.resources) &&
                  formData.resources.length > 0 ? (
                    formData.resources.map((resource: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-3"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Resource {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveResource(index)}
                            disabled={disabled}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Type */}
                          <div className="space-y-2">
                            <Label htmlFor={`resource-type-${index}`}>
                              Type <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={resource.type || "video"}
                              onValueChange={(value) =>
                                handleResourceChange(index, "type", value)
                              }
                              disabled={disabled}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="course">Course</SelectItem>
                                <SelectItem value="article">Article</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Title */}
                          <div className="space-y-2">
                            <Label htmlFor={`resource-title-${index}`}>
                              Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`resource-title-${index}`}
                              value={resource.title || ""}
                              onChange={(e) =>
                                handleResourceChange(
                                  index,
                                  "title",
                                  e.target.value,
                                )
                              }
                              placeholder="Resource title"
                              disabled={disabled}
                              className="border-gray-300 dark:border-gray-600"
                            />
                          </div>

                          {/* URL */}
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`resource-url-${index}`}>
                              URL <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`resource-url-${index}`}
                              type="url"
                              value={resource.url || ""}
                              onChange={(e) =>
                                handleResourceChange(
                                  index,
                                  "url",
                                  e.target.value,
                                )
                              }
                              placeholder="https://example.com/resource"
                              disabled={disabled}
                              className="border-gray-300 dark:border-gray-600"
                            />
                          </div>

                          {/* Description */}
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`resource-description-${index}`}>
                              Description
                            </Label>
                            <Textarea
                              id={`resource-description-${index}`}
                              value={resource.description || ""}
                              onChange={(e) =>
                                handleResourceChange(
                                  index,
                                  "description",
                                  e.target.value,
                                )
                              }
                              placeholder="Optional description"
                              rows={2}
                              disabled={disabled}
                              className="border-gray-300 dark:border-gray-600"
                            />
                          </div>

                          {/* Duration */}
                          <div className="space-y-2">
                            <Label htmlFor={`resource-duration-${index}`}>
                              Duration
                            </Label>
                            <Input
                              id={`resource-duration-${index}`}
                              value={resource.duration || ""}
                              onChange={(e) =>
                                handleResourceChange(
                                  index,
                                  "duration",
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., 10:30 or 5 hours"
                              disabled={disabled}
                              className="border-gray-300 dark:border-gray-600"
                            />
                          </div>

                          {/* Author */}
                          <div className="space-y-2">
                            <Label htmlFor={`resource-author-${index}`}>
                              Author
                            </Label>
                            <Input
                              id={`resource-author-${index}`}
                              value={resource.author || ""}
                              onChange={(e) =>
                                handleResourceChange(
                                  index,
                                  "author",
                                  e.target.value,
                                )
                              }
                              placeholder="Author name"
                              disabled={disabled}
                              className="border-gray-300 dark:border-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p className="text-sm">No resources added yet.</p>
                      <p className="text-xs mt-1">
                        Click "Add Resource" to get started.
                      </p>
                    </div>
                  )}

                  {/* Add Resource Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddResource}
                    disabled={disabled}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              name="isActive"
              checked={formData.is_active || false}
              onCheckedChange={(checked) => {
                if (disabled) return;
                setFormData((prev: any) => ({ ...prev, is_active: !!checked }));
              }}
              disabled={disabled}
            />
            <Label htmlFor="isActive">Is Active</Label>
          </div>
        </>
      )}

      {!hideFooter && (
        <DialogFooter className="gap-3 pt-4">
          {disabled ? (
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onCancel}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white shadow-sm dark:shadow-md"
              >
                {initialData ? "Save Changes" : "Create Question"}
              </Button>
            </>
          )}
        </DialogFooter>
      )}
    </form>
  );
}
