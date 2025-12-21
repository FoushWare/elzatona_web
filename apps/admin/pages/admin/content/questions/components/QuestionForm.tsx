"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@elzatona/components";
import {
  BookOpen,
  BarChart3,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Plus,
  Trash2,
} from "lucide-react";

// Define the UnifiedQuestion type based on Elzatona-web-ui schema
export interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: "multiple-choice" | "true-false" | "code" | "mcq";
  category?: string;
  subcategory?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  learningPath?: string;
  sectionId?: string;
  topic?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  tags?: string[];
  explanation?: string;
  hints?: string[];
  timeLimit?: number;
  points?: number;
  metadata?: {
    source?: string;
    version?: string;
    references?: string[];
    [key: string]: unknown;
  };
  // For multiple choice questions
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  // For code questions
  codeTemplate?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
  // For open-ended questions
  sampleAnswers?: string[];
  // Statistics
  stats?: {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    difficultyRating: number;
  };
  // Legacy fields for compatibility
  correct_answer?: string | number;
  test_cases?: string[];
  learning_card_id?: string;
  category_id?: string;
  topic_id?: string;
  // New fields with junction table data
  topics?: Array<{
    id: string;
    name: string;
    slug: string;
    difficulty: string;
    is_primary: boolean;
    order_index: number;
  }>;
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
    card_type: string;
    is_primary: boolean;
    order_index: number;
  }>;
  learning_card?: {
    id: string;
    title: string;
    type: string;
    color: string;
    icon: string;
  };
}

interface QuestionFormProps {
  initialData?: UnifiedQuestion;
  onSubmit: (question: Partial<UnifiedQuestion>) => void;
  onCancel: () => void;
  cards: Array<{ id: string; title: string }>;
  allCategories: string[];
  allTags: string[];
  readOnly?: boolean;
}

// Helper components to reduce cognitive complexity
const ChevronIcon = ({ show, readOnly }: { show: boolean; readOnly: boolean }) => {
  if (readOnly) return null;
  return show ? <ChevronDown className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />;
};

const InputField = ({ id, name, value, onChange, required, readOnly, disabled, className, placeholder, label }: {
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  label: string;
}) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      className={`mt-1 ${readOnly ? "bg-gray-50 dark:bg-gray-900 cursor-text" : ""} ${className}`}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, value, onValueChange, disabled, readOnly, children, placeholder }: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  children: React.ReactNode;
  placeholder?: string;
}) => (
  <div>
    <Label className="text-sm font-medium">{label}</Label>
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={`mt-1 ${readOnly ? "bg-gray-50 dark:bg-gray-900 cursor-not-allowed" : ""}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </div>
);
const initializeFormState = (initialData: Partial<UnifiedQuestion> | null, readOnly: boolean) => ({
  formData: initialData || {
    title: "",
    content: "",
    explanation: "",
    type: "multiple-choice",
    difficulty: "beginner",
    isActive: true,
    options: [],
    tags: [],
    points: 1,
  },
  showQuestionInfo: readOnly,
  showContent: readOnly,
  showOptions: readOnly,
  showExplanation: readOnly || !!initialData?.explanation,
  showResources: readOnly || !!(initialData as UnifiedQuestion)?.resources,
  showAdditionalSettings: false,
});

const createFormHandlers = (setFormData: React.Dispatch<React.SetStateAction<Partial<UnifiedQuestion>>>) => ({
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  },

  handleResourcesChange: (value: string) => {
    try {
      const parsed = value ? JSON.parse(value) : null;
      setFormData((prev) => ({
        ...prev,
        resources: parsed,
      }));
    } catch (_error) {
      setFormData((prev) => ({
        ...prev,
        resources: value as string[],
      }));
    }
  },

  handleSelectChange: (name: keyof UnifiedQuestion, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  },
});

export const QuestionForm = React.forwardRef<
  HTMLFormElement,
  QuestionFormProps
>(
  (
    {
      initialData,
      onSubmit,
      onCancel: _onCancel,
      cards,
      allCategories,
      allTags: _allTags,
      readOnly = false,
    },
    ref,
  ) => {
    const initialState = initializeFormState(initialData, readOnly);
    const [formData, setFormData] = useState<Partial<UnifiedQuestion>>(initialState.formData);
    const [showQuestionInfo, setShowQuestionInfo] = useState(initialState.showQuestionInfo);
    const [showContent, setShowContent] = useState(initialState.showContent);
    const [showOptions, setShowOptions] = useState(initialState.showOptions);
    const [showExplanation, setShowExplanation] = useState(initialState.showExplanation);
    const [showResources, setShowResources] = useState(initialState.showResources);
    const [showAdditionalSettings, setShowAdditionalSettings] = useState(initialState.showAdditionalSettings);

    useEffect(() => {
      if (initialData) {
        setFormData({
          ...initialData,
          content: initialData.content || "",
          title: initialData.title || "",
          options: initialData.options || [],
          tags: initialData.tags || [],
          explanation: initialData.explanation || "",
        });
      }
    }, [initialData]);

    // Separate effect to handle collapsible sections based on readOnly mode
    useEffect(() => {
      if (readOnly) {
        // View mode: show everything
        setShowQuestionInfo(true);
        setShowContent(true);
        setShowOptions(true);
        setShowExplanation(true);
        setShowResources(true);
        setShowAdditionalSettings(true);
      } else {
        // Edit mode: start collapsed, only expand if has content
        setShowQuestionInfo(false);
        setShowContent(false);
        setShowOptions(false);
        setShowExplanation(!!initialData?.explanation);
        setShowResources(!!(initialData as UnifiedQuestion)?.resources);
        setShowAdditionalSettings(false);
      }
    }, [readOnly, initialData]);

    const handlers = createFormHandlers(setFormData);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!readOnly) {
        onSubmit(formData);
      }
    };

    const questionTypes = ["multiple-choice", "true-false", "code", "mcq"];
    const difficulties = ["beginner", "intermediate", "advanced"];

    return (
      <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
        {/* Header Section - Collapsible */}
        <Collapsible open={showQuestionInfo} onOpenChange={setShowQuestionInfo}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 pb-4 hover:text-primary transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Question Information
              </h3>
              <ChevronIcon show={showQuestionInfo} readOnly={readOnly} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handlers.handleChange}
                  required={!readOnly}
                  readOnly={readOnly}
                  disabled={readOnly}
                  placeholder="Enter question title..."
                  label="Title"
                />
                <SelectField
                  label="Type"
                  value={formData.type || "multiple-choice"}
                  onValueChange={(value) => handlers.handleSelectChange("type", value)}
                  disabled={readOnly}
                  placeholder="Select Type"
                >
                  {questionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectField>
                <SelectField
                  label="Difficulty"
                  value={formData.difficulty || "beginner"}
                  onValueChange={(value) => handlers.handleSelectChange("difficulty", value)}
                  disabled={readOnly}
                  placeholder="Select Difficulty"
                >
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectField>
                <SelectField
                  label="Category"
                  value={formData.category || ""}
                  onValueChange={(value) => handlers.handleSelectChange("category", value)}
                  disabled={readOnly}
                  placeholder="Select Category"
                >
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectField>
                <SelectField
                  label="Learning Card"
                  value={formData.learning_card_id || ""}
                  onValueChange={(value) => handlers.handleSelectChange("learning_card_id", value)}
                  disabled={readOnly}
                  placeholder="Select Learning Card"
                >
                  {cards.map((card) => (
                    <SelectItem key={card.id} value={card.id}>
                      {card.title}
                    </SelectItem>
                  ))}
                </SelectField>
                <InputField
                  id="points"
                  name="points"
                  value={formData.points || 1}
                  onChange={handlers.handleChange}
                  readOnly={readOnly}
                  disabled={readOnly}
                  className=""
                  min="1"
                  max="10"
                  type="number"
                  label="Points"
                />
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Content Section - Collapsible */}
        <Collapsible open={showContent} onOpenChange={setShowContent}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 pb-4 hover:text-primary transition-colors">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Question Content
              </h4>
              <ChevronIcon show={showContent} readOnly={readOnly} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6">
              <div>
                <Label
                  htmlFor="content"
                  className="text-sm font-medium mb-2 block"
                >
                  Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content || ""}
                  onChange={handlers.handleChange}
                  rows={8}
                  required={!readOnly}
                  readOnly={readOnly}
                  disabled={readOnly}
                  className={`mt-1 w-full resize-y ${readOnly ? "bg-gray-50 dark:bg-gray-900 cursor-text" : ""}`}
                  placeholder="Enter the question content..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  This is the main question text that users will see.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Options Section for Multiple Choice Questions - Collapsible */}
        {formData.type === "multiple-choice" && (
          <Collapsible open={showOptions} onOpenChange={setShowOptions}>
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between p-6 pb-4">
                <CollapsibleTrigger className="flex items-center gap-2 hover:text-primary transition-colors flex-1">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Answer Options
                  </h4>
                  {!readOnly &&
                    (showOptions ? (
                      <ChevronDown className="h-5 w-5 ml-auto" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 ml-auto" />
                    ))}
                </CollapsibleTrigger>
                {showOptions && !readOnly && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        options: [
                          ...(prev.options || []),
                          {
                            id: `option-${Date.now()}`,
                            text: "",
                            isCorrect: false,
                          },
                        ],
                      }));
                    }}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>
              <CollapsibleContent className="px-6 pb-6">
                <div className="space-y-4">
                  {(formData.options || []).map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        option.isCorrect
                          ? "bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-600"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            option.isCorrect
                              ? "bg-green-600 text-white"
                              : "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>

                        <div className="flex-1">
                          <Input
                            value={option.text}
                            onChange={(e) => {
                              if (!readOnly) {
                                const newOptions = [
                                  ...(formData.options || []),
                                ];
                                newOptions[index] = {
                                  ...option,
                                  text: e.target.value,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  options: newOptions,
                                }));
                              }
                            }}
                            readOnly={readOnly}
                            disabled={readOnly}
                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            className={`border-0 bg-transparent p-0 text-sm ${readOnly ? "cursor-text" : ""}`}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={option.isCorrect}
                            onCheckedChange={(checked) => {
                              if (!readOnly) {
                                const newOptions = [
                                  ...(formData.options || []),
                                ];
                                newOptions[index] = {
                                  ...option,
                                  isCorrect: !!checked,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  options: newOptions,
                                }));
                              }
                            }}
                            disabled={readOnly}
                          />
                          <Label className="text-sm font-medium">
                            {option.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                          </Label>
                        </div>

                        {!readOnly && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newOptions = (
                                formData.options || []
                              ).filter((_, i) => i !== index);
                              setFormData((prev) => ({
                                ...prev,
                                options: newOptions,
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!formData.options || formData.options.length === 0) && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">
                        No options added yet
                      </p>
                      <p className="text-sm">
                        Click &quot;Add Option&quot; to get started with
                        multiple choice answers
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Answer/Explanation Section - Collapsible */}
        <Collapsible open={showExplanation} onOpenChange={setShowExplanation}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 pb-4 hover:text-primary transition-colors">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                {formData.type === "multiple-choice"
                  ? "Explanation"
                  : "Correct Answer"}
              </h4>
              <ChevronIcon show={showExplanation} readOnly={readOnly} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6">
              <Label htmlFor="explanation" className="text-sm font-medium">
                {formData.type === "multiple-choice" ? "Explanation" : "Answer"}
              </Label>
              <Textarea
                id="explanation"
                name="explanation"
                value={formData.explanation || ""}
                onChange={handlers.handleChange}
                rows={4}
                readOnly={readOnly}
                disabled={readOnly}
                className={`mt-1 ${readOnly ? "bg-gray-50 dark:bg-gray-900 cursor-text" : ""}`}
                placeholder={
                  formData.type === "multiple-choice"
                    ? "Enter explanation for the correct answer..."
                    : "Enter the correct answer..."
                }
              />
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Learning Resources Section - Collapsible */}
        <Collapsible open={showResources} onOpenChange={setShowResources}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 pb-4 hover:text-primary transition-colors">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Learning Resources (Optional)
              </h4>
              <ChevronIcon show={showResources} readOnly={readOnly} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6">
              <Label htmlFor="resources" className="text-sm font-medium">
                Resources (JSON Format)
              </Label>
              <Textarea
                id="resources"
                name="resources"
                value={
                  typeof formData.resources === "string"
                    ? formData.resources
                    : JSON.stringify(formData.resources || [], null, 2)
                }
                onChange={(e) => handlers.handleResourcesChange(e.target.value)}
                rows={8}
                readOnly={readOnly}
                disabled={readOnly}
                className={`mt-1 font-mono text-sm ${readOnly ? "bg-gray-50 dark:bg-gray-900 cursor-text" : ""}`}
                placeholder={`[\n  {\n    "type": "video",\n    "title": "Video Title",\n    "url": "https://example.com/video",\n    "description": "Video description",\n    "duration": "10:30"\n  },\n  {\n    "type": "article",\n    "title": "Article Title",\n    "url": "https://example.com/article",\n    "description": "Article description"\n  }\n]`}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter resources as a JSON array. Each resource should have: type
                (video/course/article), title, url, and optionally description,
                duration, author.
              </p>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Metadata Section - Collapsible */}
        <Collapsible
          open={showAdditionalSettings}
          onOpenChange={setShowAdditionalSettings}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 pb-4 hover:text-primary transition-colors">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                Additional Settings
              </h4>
              <ChevronIcon show={showAdditionalSettings} readOnly={readOnly} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive || false}
                  onCheckedChange={(checked) =>
                    !readOnly &&
                    setFormData((prev) => ({ ...prev, isActive: !!checked }))
                  }
                  disabled={readOnly}
                />
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Question is Active
                </Label>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </form>
    );
  },
);

QuestionForm.displayName = "QuestionForm";

export default QuestionForm;
