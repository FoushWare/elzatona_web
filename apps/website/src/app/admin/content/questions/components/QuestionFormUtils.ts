import { UnifiedQuestion } from "@elzatona/types";

type Question = UnifiedQuestion;

// Form field utilities
export const getDefaultFormData = (): Partial<Question> => ({
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

export const sanitizeFormData = (formData: Partial<Question>): Partial<Question> => {
  return {
    ...formData,
    question: formData.question?.trim() || "",
    correctAnswer: formData.correctAnswer?.trim() || "",
    options: formData.options?.map(opt => opt.trim()).filter(Boolean) || [],
    explanation: formData.explanation?.trim() || "",
    category: formData.category?.trim() || "",
    tags: formData.tags?.map(tag => tag.trim()).filter(Boolean) || [],
    code: formData.code?.trim() || "",
    language: formData.language?.trim() || "javascript",
    fileName: formData.fileName?.trim() || "",
  };
};

// Validation utilities
export const validateQuestionField = (field: string, value: any): string | null => {
  switch (field) {
    case "question":
      if (!value?.trim()) return "Question is required";
      if (value.trim().length < 10) return "Question must be at least 10 characters";
      return null;
    
    case "correctAnswer":
      if (!value?.trim()) return "Correct answer is required";
      return null;
    
    case "options":
      const validOptions = (value as string[]).filter(opt => opt.trim());
      if (validOptions.length < 2) return "At least 2 valid options are required";
      if (validOptions.length > 6) return "Maximum 6 options allowed";
      return null;
    
    case "explanation":
      if (value && value.trim().length < 10) return "Explanation must be at least 10 characters if provided";
      return null;
    
    case "timeLimit":
      const time = Number(value);
      if (isNaN(time) || time < 5) return "Time limit must be at least 5 seconds";
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

export const validateQuestionConsistency = (formData: Partial<Question>): string[] => {
  const errors: string[] = [];
  
  const validOptions = formData.options?.filter(opt => opt.trim()) || [];
  const correctAnswer = formData.correctAnswer?.trim();
  
  if (correctAnswer && !validOptions.includes(correctAnswer)) {
    errors.push("Correct answer must be one of the options");
  }
  
  if (formData.type === "multiple-choice" && validOptions.length < 2) {
    errors.push("Multiple choice questions need at least 2 options");
  }
  
  if (formData.type === "true-false" && validOptions.length !== 2) {
    errors.push("True/false questions must have exactly 2 options");
  }
  
  if (formData.code && !formData.language) {
    errors.push("Language is required when code is provided");
  }
  
  return errors;
};

// Option management utilities
export const addNewOption = (currentOptions: string[]): string[] => {
  return [...currentOptions, ""];
};

export const removeOptionAtIndex = (currentOptions: string[], index: number): string[] => {
  return currentOptions.filter((_, i) => i !== index);
};

export const updateOptionAtIndex = (currentOptions: string[], index: number, value: string): string[] => {
  const newOptions = [...currentOptions];
  newOptions[index] = value;
  return newOptions;
};

export const hasDuplicateOptions = (options: string[]): boolean => {
  const trimmedOptions = options.map(opt => opt.trim()).filter(Boolean);
  const uniqueOptions = new Set(trimmedOptions);
  return trimmedOptions.length !== uniqueOptions.size;
};

// Tag management utilities
export const addNewTag = (currentTags: string[], newTag: string): string[] => {
  const trimmedTag = newTag.trim();
  if (trimmedTag && !currentTags.includes(trimmedTag)) {
    return [...currentTags, trimmedTag];
  }
  return currentTags;
};

export const removeTag = (currentTags: string[], tagToRemove: string): string[] => {
  return currentTags.filter(tag => tag !== tagToRemove);
};

export const isValidTag = (tag: string): boolean => {
  const trimmed = tag.trim();
  return trimmed.length >= 2 && trimmed.length <= 20 && /^[a-zA-Z0-9\s-_]+$/.test(trimmed);
};

// Category and topic utilities
export const findCategoryById = (categoriesData: any[], categoryId: string): any => {
  return categoriesData.find(cat => cat.id === categoryId);
};

export const findTopicById = (topicsData: any[], topicId: string): any => {
  return topicsData.find(topic => topic.id === topicId);
};

export const getTopicsForCategory = (topicsData: any[], categoryId: string): any[] => {
  return topicsData.filter(topic => topic.categoryId === categoryId);
};

export const formatCategoryDisplay = (category: any): string => {
  if (!category) return "";
  return `${category.name} (${category.questionsCount || 0} questions)`;
};

// Code editor utilities
export const getLanguageDisplayName = (language: string): string => {
  const languageNames: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    java: "Java",
    cpp: "C++",
    csharp: "C#",
    html: "HTML",
    css: "CSS",
    sql: "SQL",
    json: "JSON",
  };
  return languageNames[language] || language;
};

export const getLanguageFileExtension = (language: string): string => {
  const extensions: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    cpp: "cpp",
    csharp: "cs",
    html: "html",
    css: "css",
    sql: "sql",
    json: "json",
  };
  return extensions[language] || "txt";
};

export const generateDefaultFileName = (language: string): string => {
  const extension = getLanguageFileExtension(language);
  return `solution.${extension}`;
};

export const validateCodeSyntax = (code: string, language: string): { isValid: boolean; error?: string } => {
  if (!code.trim()) {
    return { isValid: true };
  }

  try {
    // Basic syntax validation based on language
    switch (language) {
      case "javascript":
      case "typescript":
        // Check for basic JS syntax errors
        new Function(code);
        break;
      
      case "json":
        JSON.parse(code);
        break;
      
      default:
        // For other languages, just check if it's non-empty
        break;
    }
    
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : "Syntax error" 
    };
  }
};

// Form transformation utilities
export const transformFormDataForSubmission = (formData: Partial<Question>): Partial<Question> => {
  const sanitized = sanitizeFormData(formData);
  
  return {
    ...sanitized,
    options: sanitized.options?.slice(0, 6), // Limit to 6 options
    tags: sanitized.tags?.slice(0, 10), // Limit to 10 tags
    timeLimit: Number(sanitized.timeLimit) || 30,
    points: Number(sanitized.points) || 1,
    isRequired: Boolean(sanitized.isRequired),
    isRandomized: Boolean(sanitized.isRandomized),
  };
};

export const transformInitialDataForForm = (initialData: Question): Partial<Question> => {
  return {
    ...initialData,
    options: initialData.options || ["", "", "", ""],
    tags: initialData.tags || [],
  };
};

// Search and filter utilities
export const filterCategories = (categories: string[], searchTerm: string): string[] => {
  if (!searchTerm.trim()) return categories;
  return categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterTags = (tags: string[], searchTerm: string, limit: number = 10): string[] => {
  if (!searchTerm.trim()) return tags.slice(0, limit);
  return tags
    .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, limit);
};

export const highlightSearchMatch = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Accessibility utilities
export const getAriaLabelForField = (fieldName: string, isRequired: boolean): string => {
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
