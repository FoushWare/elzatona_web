import { UnifiedQuestion } from "@elzatona/types";

type Question = UnifiedQuestion;

// Form field utilities
export const getDefaultFormData = (): Partial<Question> => ({
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

export const sanitizeFormData = (
  formData: Partial<Question>,
): Partial<Question> => {
  return {
    ...formData,
    title: formData.title?.trim() || "",
    content: formData.content?.trim() || "",
    explanation: formData.explanation?.trim() || "",
    category: formData.category?.trim() || "",
    tags: formData.tags?.map((tag) => tag.trim()).filter(Boolean) || [],
  };
};

// Validation utilities
export const validateQuestionField = (
  field: string,
  value: any,
): string | null => {
  switch (field) {
    case "title":
      if (!value?.trim()) return "Title is required";
      if (value.trim().length < 5) return "Title must be at least 5 characters";
      return null;

    case "content":
      if (!value?.trim()) return "Content is required";
      if (value.trim().length < 10)
        return "Content must be at least 10 characters";
      return null;

    case "type":
      if (!value) return "Question type is required";
      return null;

    case "explanation":
      if (value && value.trim().length < 10)
        return "Explanation must be at least 10 characters if provided";
      return null;

    case "timeLimit":
      const time = Number(value);
      if (isNaN(time) || time < 5)
        return "Time limit must be at least 5 seconds";
      if (time > 600) return "Time limit cannot exceed 10 minutes";
      return null;

    case "points":
      const points = Number(value);
      if (isNaN(points) || points < 1) return "Points must be at least 1";
      if (points > 100) return "Points cannot exceed 100";
      return null;

    default:
      return null;
  }
};

export const validateQuestionConsistency = (
  formData: Partial<Question>,
): string[] => {
  const errors: string[] = [];

  if (
    formData.type === "multiple-choice" &&
    !formData.content?.includes("options")
  ) {
    errors.push("Multiple choice questions should include options in content");
  }

  if (
    formData.type === "true-false" &&
    !formData.content?.toLowerCase().includes("true") &&
    !formData.content?.toLowerCase().includes("false")
  ) {
    errors.push("True/false questions should include true/false options");
  }

  return errors;
};

// Tag management utilities
export const addNewTag = (currentTags: string[], newTag: string): string[] => {
  const trimmedTag = newTag.trim();
  if (trimmedTag && !currentTags.includes(trimmedTag)) {
    return [...currentTags, trimmedTag];
  }
  return currentTags;
};

export const removeTag = (
  currentTags: string[],
  tagToRemove: string,
): string[] => {
  return currentTags.filter((tag) => tag !== tagToRemove);
};

export const isValidTag = (tag: string): boolean => {
  const trimmed = tag.trim();
  return (
    trimmed.length >= 2 &&
    trimmed.length <= 20 &&
    /^[a-zA-Z0-9\s-_]+$/.test(trimmed)
  );
};

// Category and topic utilities
export const findCategoryById = (
  categoriesData: any[],
  categoryId: string,
): any => {
  return categoriesData.find((cat) => cat.id === categoryId);
};

export const findTopicById = (topicsData: any[], topicId: string): any => {
  return topicsData.find((topic) => topic.id === topicId);
};

export const getTopicsForCategory = (
  topicsData: any[],
  categoryId: string,
): any[] => {
  return topicsData.filter((topic) => topic.categoryId === categoryId);
};

export const formatCategoryDisplay = (category: any): string => {
  if (!category) return "";
  return `${category.name} (${category.questionsCount || 0} questions)`;
};

// Form transformation utilities
export const transformFormDataForSubmission = (
  formData: Partial<Question>,
): Partial<Question> => {
  const sanitized = sanitizeFormData(formData);

  return {
    ...sanitized,
    tags: sanitized.tags?.slice(0, 10), // Limit to 10 tags
    timeLimit: Number(sanitized.timeLimit) || 30,
    points: Number(sanitized.points) || 1,
    is_active: Boolean(sanitized.is_active),
  };
};

export const transformInitialDataForForm = (
  initialData: Question,
): Partial<Question> => {
  return {
    ...initialData,
    tags: initialData.tags || [],
  };
};

// Search and filter utilities
export const filterCategories = (
  categories: string[],
  searchTerm: string,
): string[] => {
  if (!searchTerm.trim()) return categories;
  return categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

export const filterTags = (
  tags: string[],
  searchTerm: string,
  limit: number = 10,
): string[] => {
  if (!searchTerm.trim()) return tags.slice(0, limit);
  return tags
    .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, limit);
};

export const highlightSearchMatch = (
  text: string,
  searchTerm: string,
): string => {
  if (!searchTerm.trim()) return text;
  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  return text.replace(regex, "<mark>$1</mark>");
};

// Accessibility utilities
export const getAriaLabelForField = (
  fieldName: string,
  isRequired: boolean,
): string => {
  const baseLabels: Record<string, string> = {
    question: "Question text",
    correctAnswer: "Correct answer",
    explanation: "Explanation",
    category: "Question category",
    code: "Code snippet",
    language: "Programming language",
  };

  const label = baseLabels[fieldName] || fieldName;
  return isRequired ? `${label} (required)` : label;
};

export const getFieldErrorId = (fieldName: string): string => {
  return `${fieldName}-error`;
};
