import { useState, useEffect, useMemo, useCallback } from "react";
import { UnifiedQuestion } from "@elzatona/types";

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

// Form data management hook
export const useQuestionFormData = (initialData?: Question) => {
  const [formData, setFormData] = useState<Partial<Question>>({
    question: "",
    correctAnswer: "",
    options: ["", "", "", ""],
    explanation: "",
    difficulty: "medium",
    category: "",
    tags: [],
    code: "",
    language: "javascript",
    fileName: "",
    cardId: "",
    topicId: "",
    timeLimit: 30,
    points: 1,
    isRequired: false,
    isRandomized: false,
    type: "multiple-choice",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        options: initialData.options || ["", "", "", ""],
      });
    }
  }, [initialData]);

  const updateFormData = useCallback((updates: Partial<Question>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData({
      question: "",
      correctAnswer: "",
      options: ["", "", "", ""],
      explanation: "",
      difficulty: "medium",
      category: "",
      tags: [],
      code: "",
      language: "javascript",
      fileName: "",
      cardId: "",
      topicId: "",
      timeLimit: 30,
      points: 1,
      isRequired: false,
      isRandomized: false,
      type: "multiple-choice",
    });
  }, []);

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
  };
};

// Options management hook
export const useOptionsManagement = (formData: Partial<Question>, updateFormData: (updates: Partial<Question>) => void) => {
  const updateOption = useCallback((index: number, value: string) => {
    const newOptions = [...(formData.options || ["", "", "", ""])];
    newOptions[index] = value;
    updateFormData({ options: newOptions });
  }, [formData.options, updateFormData]);

  const addOption = useCallback(() => {
    const newOptions = [...(formData.options || ["", "", "", ""]), ""];
    updateFormData({ options: newOptions });
  }, [formData.options, updateFormData]);

  const removeOption = useCallback((index: number) => {
    const newOptions = (formData.options || ["", "", "", ""]).filter((_, i) => i !== index);
    updateFormData({ options: newOptions });
  }, [formData.options, updateFormData]);

  const setCorrectAnswer = useCallback((answer: string) => {
    updateFormData({ correctAnswer: answer });
  }, [updateFormData]);

  return {
    updateOption,
    addOption,
    removeOption,
    setCorrectAnswer,
  };
};

// Tags management hook
export const useTagsManagement = (formData: Partial<Question>, updateFormData: (updates: Partial<Question>) => void) => {
  const [newTag, setNewTag] = useState("");

  const addTag = useCallback(() => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      updateFormData({ tags: [...(formData.tags || []), newTag.trim()] });
      setNewTag("");
    }
  }, [newTag, formData.tags, updateFormData]);

  const removeTag = useCallback((tagToRemove: string) => {
    updateFormData({ tags: formData.tags?.filter(tag => tag !== tagToRemove) || [] });
  }, [formData.tags, updateFormData]);

  const handleTagInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }, [addTag]);

  return {
    newTag,
    setNewTag,
    addTag,
    removeTag,
    handleTagInputKeyDown,
  };
};

// Code editor management hook
export const useCodeEditor = (formData: Partial<Question>, updateFormData: (updates: Partial<Question>) => void) => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  const updateCode = useCallback((code: string) => {
    updateFormData({ code });
  }, [updateFormData]);

  const updateLanguage = useCallback((language: string) => {
    updateFormData({ language });
  }, [updateFormData]);

  const updateFileName = useCallback((fileName: string) => {
    updateFormData({ fileName });
  }, [updateFormData]);

  return {
    showCodeEditor,
    setShowCodeEditor,
    updateCode,
    updateLanguage,
    updateFileName,
  };
};

// Search and filter hooks
export const useCategorySearch = (allCategories: string[], categoriesData: any[]) => {
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!categorySearchTerm) return allCategories;
    return allCategories.filter(category =>
      category.toLowerCase().includes(categorySearchTerm.toLowerCase())
    );
  }, [allCategories, categorySearchTerm]);

  const getCategoryInfo = useCallback((categoryName: string) => {
    return categoriesData.find(cat => cat.name === categoryName);
  }, [categoriesData]);

  return {
    categorySearchTerm,
    setCategorySearchTerm,
    showCategoryDropdown,
    setShowCategoryDropdown,
    filteredCategories,
    getCategoryInfo,
  };
};

export const useTagSearch = (allTags: string[]) => {
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const filteredTags = useMemo(() => {
    if (!tagSearchTerm) return allTags.slice(0, 10);
    return allTags.filter(tag =>
      tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
    ).slice(0, 10);
  }, [allTags, tagSearchTerm]);

  return {
    tagSearchTerm,
    setTagSearchTerm,
    showTagDropdown,
    setShowTagDropdown,
    filteredTags,
  };
};

// Form validation hook
export const useFormValidation = (formData: Partial<Question>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.question?.trim()) {
      newErrors.question = "Question is required";
    }

    if (!formData.correctAnswer?.trim()) {
      newErrors.correctAnswer = "Correct answer is required";
    }

    const validOptions = formData.options?.filter(option => option.trim()) || [];
    if (validOptions.length < 2) {
      newErrors.options = "At least 2 valid options are required";
    }

    if (!validOptions.includes(formData.correctAnswer || "")) {
      newErrors.correctAnswer = "Correct answer must be one of the options";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    clearErrors,
  };
};

// Form submission hook
export const useFormSubmission = (
  formData: Partial<Question>,
  onSubmit: (question: Partial<Question>) => void,
  validateForm: () => boolean,
  externalSubmitTrigger?: number
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, validateForm]);

  useEffect(() => {
    if (externalSubmitTrigger && externalSubmitTrigger > 0) {
      handleSubmit();
    }
  }, [externalSubmitTrigger, handleSubmit]);

  return {
    isSubmitting,
    handleSubmit,
  };
};
