"use client";

import React from "react";
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
import { Plus, Trash2, ChevronDown, X } from "lucide-react";
import { UnifiedQuestion } from "@elzatona/types";
import {
  useQuestionFormData,
  useTagsManagement,
  useCategorySearch,
  useTagSearch,
  useFormValidation,
  useFormSubmission,
} from "./QuestionFormHooks";
import { getAriaLabelForField, getFieldErrorId } from "./QuestionFormUtils";

type Question = UnifiedQuestion;

interface QuestionFormProps {
  readonly initialData: Question | undefined;
  readonly onSubmit: (question: Partial<Question>) => void;
  readonly onCancel: () => void;
  readonly cards: any[];
  readonly allCategories: string[];
  readonly allTags: string[];
  readonly categoriesData: any[];
  readonly topicsData: any[];
  readonly disabled?: boolean;
  readonly hideFooter?: boolean;
  readonly externalSubmitTrigger?: number;
}

// Custom hook to consolidate all form state management
const useQuestionFormState = (
  initialData: UnifiedQuestion | null | undefined,
  allCategories: string[],
  categoriesData: any[],
  allTags: string[],
  onSubmit: (data: Partial<UnifiedQuestion>) => void,
  externalSubmitTrigger?: number,
) => {
  // Extracted hooks for state management
  const { formData, updateFormData } = useQuestionFormData(
    initialData ?? undefined,
  );
  const { newTag, setNewTag, addTag, removeTag, handleTagInputKeyDown } =
    useTagsManagement(formData, updateFormData);
  const {
    categorySearchTerm,
    setCategorySearchTerm,
    showCategoryDropdown,
    setShowCategoryDropdown,
    filteredCategories,
  } = useCategorySearch(allCategories, categoriesData);
  const {
    setTagSearchTerm,
    showTagDropdown,
    setShowTagDropdown,
    filteredTags,
  } = useTagSearch(allTags);
  const { errors, validateForm, clearErrors } = useFormValidation(formData);
  const { isSubmitting, handleSubmit } = useFormSubmission(
    formData,
    onSubmit,
    validateForm,
    externalSubmitTrigger,
  );

  // Event handlers
  const handleFieldChange = (field: keyof Question, value: any) => {
    updateFormData({ [field]: value });
    clearErrors();
  };

  const handleCategorySelect = (category: string) => {
    updateFormData({ category });
    setCategorySearchTerm(category);
    setShowCategoryDropdown(false);
  };

  const handleTagSelect = (tag: string) => {
    if (!formData.tags?.includes(tag)) {
      updateFormData({ tags: [...(formData.tags || []), tag] });
    }
    setTagSearchTerm("");
    setShowTagDropdown(false);
  };

  return {
    // Form data
    formData,
    newTag,
    setNewTag,
    categorySearchTerm,
    setCategorySearchTerm,
    showCategoryDropdown,
    setShowCategoryDropdown,
    filteredCategories,
    showTagDropdown,
    setShowTagDropdown,
    filteredTags,
    setTagSearchTerm,
    errors,
    isSubmitting,
    // Event handlers
    updateFormData,
    addTag,
    removeTag,
    handleTagInputKeyDown,
    handleFieldChange,
    handleCategorySelect,
    handleTagSelect,
    handleSubmit,
    validateForm,
    clearErrors,
  };
};

export default function QuestionForm({
  initialData,
  onSubmit,
  onCancel,
  cards,
  allCategories,
  allTags,
  categoriesData,
  topicsData,
  disabled = false,
  hideFooter = false,
  externalSubmitTrigger,
}: QuestionFormProps) {
  const formState = useQuestionFormState(
    initialData ?? null,
    allCategories,
    categoriesData,
    allTags,
    onSubmit,
    externalSubmitTrigger,
  );

  const {
    formData,
    categorySearchTerm,
    setCategorySearchTerm,
    showCategoryDropdown,
    setShowCategoryDropdown,
    filteredCategories,
    showTagDropdown,
    setShowTagDropdown,
    filteredTags,
    newTag,
    setNewTag,
    errors,
    isSubmitting,
    handleSubmit,
    handleFieldChange,
    handleCategorySelect,
    handleTagSelect,
    handleTagInputKeyDown,
    addTag,
    removeTag,
  } = formState;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const buttonText = isSubmitting
    ? "Saving..."
    : initialData
      ? "Update Question"
      : "Create Question";

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Basic Question Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
            Question Title *
          </Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="Enter question title..."
            disabled={disabled}
            aria-label={getAriaLabelForField("title", true)}
            aria-describedby={
              errors.title ? getFieldErrorId("title") : undefined
            }
          />
          {errors.title && (
            <p
              id={getFieldErrorId("title")}
              className="text-sm text-red-500 mt-1"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="content"
            className={errors.content ? "text-red-500" : ""}
          >
            Question Content *
          </Label>
          <Textarea
            id="content"
            value={formData.content || ""}
            onChange={(e) => handleFieldChange("content", e.target.value)}
            placeholder="Enter your question content here..."
            className="min-h-[100px]"
            disabled={disabled}
            aria-label={getAriaLabelForField("content", true)}
            aria-describedby={
              errors.content ? getFieldErrorId("content") : undefined
            }
          />
          {errors.content && (
            <p
              id={getFieldErrorId("content")}
              className="text-sm text-red-500 mt-1"
            >
              {errors.content}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="explanation">Explanation</Label>
          <Textarea
            id="explanation"
            value={formData.explanation || ""}
            onChange={(e) => handleFieldChange("explanation", e.target.value)}
            placeholder="Explain why this answer is correct..."
            className="min-h-[80px]"
            disabled={disabled}
          />
        </div>
      </div>

      {/* Category and Tags */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <div className="relative">
            <Input
              id="category"
              value={categorySearchTerm}
              onChange={(e) => {
                setCategorySearchTerm(e.target.value);
                setShowCategoryDropdown(true);
              }}
              onFocus={() => setShowCategoryDropdown(true)}
              placeholder="Search or select a category..."
              disabled={disabled}
            />
            {showCategoryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="w-full px-3 py-2 hover:bg-gray-100 cursor-pointer text-left border-0 bg-transparent"
                    onClick={() => handleCategorySelect(category)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCategorySelect(category);
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                onFocus={() => setShowTagDropdown(true)}
                placeholder="Add a tag..."
                disabled={disabled}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
                disabled={disabled || !newTag.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {showTagDropdown && (
              <div className="relative z-10">
                <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-auto">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="w-full px-3 py-2 hover:bg-gray-100 cursor-pointer text-left border-0 bg-transparent"
                      onClick={() => handleTagSelect(tag)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleTagSelect(tag);
                        }
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag)}
                    disabled={disabled}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={formData.difficulty || "beginner"}
              onValueChange={(value) => handleFieldChange("difficulty", value)}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
            <Input
              id="timeLimit"
              type="number"
              min="5"
              max="600"
              value={formData.timeLimit || 30}
              onChange={(e) =>
                handleFieldChange(
                  "timeLimit",
                  Number.parseInt(e.target.value) || 30,
                )
              }
              disabled={disabled}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              min="1"
              max="100"
              value={formData.points || 1}
              onChange={(e) =>
                handleFieldChange(
                  "points",
                  Number.parseInt(e.target.value) || 1,
                )
              }
              disabled={disabled}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active === true}
              onCheckedChange={(checked) =>
                handleFieldChange("is_active", checked)
              }
              disabled={disabled}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </div>
      </div>

      {/* Form Footer */}
      {!hideFooter && (
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={disabled || isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={disabled || isSubmitting}>
            {buttonText}
          </Button>
        </DialogFooter>
      )}
    </form>
  );
}
