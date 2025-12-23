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
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { UnifiedQuestion } from "@elzatona/types";
import {
  useQuestionFormData,
  useOptionsManagement,
  useTagsManagement,
  useCodeEditor,
  useCategorySearch,
  useTagSearch,
  useFormValidation,
  useFormSubmission,
} from "./QuestionFormHooks";
import {
  getDefaultFormData,
  sanitizeFormData,
  validateQuestionField,
  validateQuestionConsistency,
  getLanguageDisplayName,
  generateDefaultFileName,
  transformFormDataForSubmission,
  getAriaLabelForField,
  getFieldErrorId,
} from "./QuestionFormUtils";

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
  // Extracted hooks for state management
  const { formData, updateFormData } = useQuestionFormData(initialData);
  const { updateOption, addOption, removeOption, setCorrectAnswer } =
    useOptionsManagement(formData, updateFormData);
  const { newTag, setNewTag, addTag, removeTag, handleTagInputKeyDown } =
    useTagsManagement(formData, updateFormData);
  const {
    showCodeEditor,
    setShowCodeEditor,
    updateCode,
    updateLanguage,
    updateFileName,
  } = useCodeEditor(formData, updateFormData);
  const {
    categorySearchTerm,
    setCategorySearchTerm,
    showCategoryDropdown,
    setShowCategoryDropdown,
    filteredCategories,
    getCategoryInfo,
  } = useCategorySearch(allCategories, categoriesData);
  const {
    tagSearchTerm,
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

  const handleOptionChange = (index: number, value: string) => {
    updateOption(index, value);
    if (value === formData.correctAnswer) {
      setCorrectAnswer(value);
    }
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

  const handleLanguageChange = (language: string) => {
    updateLanguage(language);
    if (!formData.fileName) {
      updateFileName(generateDefaultFileName(language));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Basic Question Fields */}
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="question"
            className={errors.question ? "text-red-500" : ""}
          >
            Question Text *
          </Label>
          <Textarea
            id="question"
            value={formData.question || ""}
            onChange={(e) => handleFieldChange("question", e.target.value)}
            placeholder="Enter your question here..."
            className="min-h-[100px]"
            disabled={disabled}
            aria-label={getAriaLabelForField("question", true)}
            aria-describedby={
              errors.question ? getFieldErrorId("question") : undefined
            }
          />
          {errors.question && (
            <p
              id={getFieldErrorId("question")}
              className="text-sm text-red-500 mt-1"
            >
              {errors.question}
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

      {/* Options Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Answer Options *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            disabled={disabled || (formData.options?.length || 0) >= 6}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>

        <div className="space-y-2">
          {(formData.options || ["", "", "", ""]).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                checked={formData.correctAnswer === option}
                onCheckedChange={() => setCorrectAnswer(option)}
                disabled={disabled}
              />
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                disabled={disabled}
              />
              {(formData.options?.length || 0) > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(index)}
                  disabled={disabled}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {errors.options && (
          <p className="text-sm text-red-500">{errors.options}</p>
        )}
        {errors.correctAnswer && (
          <p className="text-sm text-red-500">{errors.correctAnswer}</p>
        )}
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
                  <div
                    key={category}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
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
                    <div
                      key={tag}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </div>
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

      {/* Code Section */}
      <Collapsible open={showCodeEditor} onOpenChange={setShowCodeEditor}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={disabled}
          >
            <ChevronDown className="w-4 h-4 mr-2" />
            Code Snippet (Optional)
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div>
            <Label htmlFor="language">Programming Language</Label>
            <Select
              value={formData.language || "javascript"}
              onValueChange={handleLanguageChange}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="code">Code</Label>
            <Textarea
              id="code"
              value={formData.code || ""}
              onChange={(e) => updateCode(e.target.value)}
              placeholder="Enter your code snippet here..."
              className="min-h-[150px] font-mono text-sm"
              disabled={disabled}
            />
          </div>

          <div>
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              value={formData.fileName || ""}
              onChange={(e) => updateFileName(e.target.value)}
              placeholder="example.js"
              disabled={disabled}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Additional Settings */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={formData.difficulty || "medium"}
              onValueChange={(value) => handleFieldChange("difficulty", value)}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
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
                handleFieldChange("timeLimit", parseInt(e.target.value) || 30)
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
                handleFieldChange("points", parseInt(e.target.value) || 1)
              }
              disabled={disabled}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRequired"
                checked={formData.isRequired || false}
                onCheckedChange={(checked) =>
                  handleFieldChange("isRequired", checked)
                }
                disabled={disabled}
              />
              <Label htmlFor="isRequired">Required</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRandomized"
                checked={formData.isRandomized || false}
                onCheckedChange={(checked) =>
                  handleFieldChange("isRandomized", checked)
                }
                disabled={disabled}
              />
              <Label htmlFor="isRandomized">Randomize Options</Label>
            </div>
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
            {isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Question"
                : "Create Question"}
          </Button>
        </DialogFooter>
      )}
    </form>
  );
}
