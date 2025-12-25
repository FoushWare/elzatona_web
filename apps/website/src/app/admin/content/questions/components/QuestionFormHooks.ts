import { useState, useEffect, useMemo, useCallback } from "react";
import { UnifiedQuestion } from "@elzatona/types";

type Question = UnifiedQuestion;

// Form data management hook
export const useQuestionFormData = (initialData?: Question) => {
  const [formData, setFormData] = useState<Partial<Question>>({
    title: "",
    content: "",
    type: "multiple-choice",
    difficulty: "beginner",
    category: "",
    tags: [],
    explanation: "",
    hints: [],
    timeLimit: 30,
    points: 1,
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const updateFormData = useCallback((updates: Partial<Question>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData({
      title: "",
      content: "",
      type: "multiple-choice",
      difficulty: "beginner",
      category: "",
      tags: [],
      explanation: "",
      hints: [],
      timeLimit: 30,
      points: 1,
      is_active: true,
    });
  }, []);

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
  };
};

// Tags management hook
export const useTagsManagement = (
  formData: Partial<Question>,
  updateFormData: (updates: Partial<Question>) => void,
) => {
  const [newTag, setNewTag] = useState("");

  const addTag = useCallback(() => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      updateFormData({ tags: [...(formData.tags || []), newTag.trim()] });
      setNewTag("");
    }
  }, [newTag, formData.tags, updateFormData]);

  const removeTag = useCallback(
    (tagToRemove: string) => {
      updateFormData({
        tags: formData.tags?.filter((tag) => tag !== tagToRemove) || [],
      });
    },
    [formData.tags, updateFormData],
  );

  const handleTagInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag();
      }
    },
    [addTag],
  );

  return {
    newTag,
    setNewTag,
    addTag,
    removeTag,
    handleTagInputKeyDown,
  };
};

// Search and filter hooks
export const useCategorySearch = (
  allCategories: string[],
  categoriesData: any[],
) => {
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!categorySearchTerm) return allCategories;
    return allCategories.filter((category) =>
      category.toLowerCase().includes(categorySearchTerm.toLowerCase()),
    );
  }, [allCategories, categorySearchTerm]);

  const getCategoryInfo = useCallback(
    (categoryName: string) => {
      return categoriesData.find((cat) => cat.name === categoryName);
    },
    [categoriesData],
  );

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
    return allTags
      .filter((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
      .slice(0, 10);
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

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content?.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.type) {
      newErrors.type = "Question type is required";
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
  externalSubmitTrigger?: number,
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
