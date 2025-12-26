import type { Highlighter } from "shiki";
import DOMPurify from "dompurify";

// File parsing utilities
export const parseJsonFile = async (file: File): Promise<any[]> => {
  const text = await file.text();
  const data = JSON.parse(text);
  return Array.isArray(data) ? data : data.questions || [];
};

export const parseCsvFile = async (file: File): Promise<any[]> => {
  const text = await file.text();
  const lines = text.split("\n").filter((line) => line.trim());
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const question: any = {};
    headers.forEach((header, index) => {
      question[header] = values[index] || "";
    });
    return question;
  });
};

// Color processing utilities
export const calculateBrightness = (
  r: number,
  g: number,
  b: number,
): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const extractRgbFromHex = (
  hex: string,
): { r: number; g: number; b: number } => {
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

export const getDimmingFactor = (brightness: number): number => {
  if (brightness >= 220) return 0.4;
  if (brightness >= 200) return 0.5;
  if (brightness >= 180) return 0.6;
  return 0.7;
};

export const applyDimming = (
  r: number,
  g: number,
  b: number,
  factor: number,
) => {
  return {
    r: Math.round(r * factor),
    g: Math.round(g * factor),
    b: Math.round(b * factor),
  };
};

export const formatRgbString = (r: number, g: number, b: number): string => {
  return `rgb(${r}, ${g}, ${b})`;
};

export const extractRgbFromRgbString = (
  rgbString: string,
): { r: number; g: number; b: number } | null => {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return null;
  return {
    r: Number.parseInt(match[1]),
    g: Number.parseInt(match[2]),
    b: Number.parseInt(match[3]),
  };
};

export const darkenHexColor = (hex: string): string => {
  const { r, g, b } = extractRgbFromHex(hex.replace("#", ""));
  const brightness = calculateBrightness(r, g, b);

  if (brightness <= 180) return hex;

  const factor = getDimmingFactor(brightness);
  const { r: newR, g: newG, b: newB } = applyDimming(r, g, b, factor);
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export const darkenRgbColor = (colorValue: string): string => {
  const rgbValues = extractRgbFromRgbString(colorValue);
  if (!rgbValues) return colorValue;

  const { r, g, b } = rgbValues;
  const brightness = calculateBrightness(r, g, b);

  if (brightness <= 180) return colorValue;

  const factor = getDimmingFactor(brightness);
  const { r: newR, g: newG, b: newB } = applyDimming(r, g, b, factor);
  return formatRgbString(newR, newG, newB);
};

// DOM processing utilities
export const processSpanElement = (el: Element): void => {
  const style = (el as HTMLElement).getAttribute("style") || "";
  const colorRegex = /color:\s*(#[0-9a-f]{6}|rgb\([^)]+\))/i;
  const colorMatch = colorRegex.exec(style);

  if (colorMatch) {
    const colorValue = colorMatch[1];
    const newColor = colorValue.startsWith("#")
      ? darkenHexColor(colorValue)
      : darkenRgbColor(colorValue);

    if (newColor !== colorValue) {
      const newStyle = style.replaceAll(
        /color:\s*(#[0-9a-f]{6}|rgb\([^)]+\))/i,
        `color: ${newColor}`,
      );
      (el as HTMLElement).setAttribute("style", newStyle);
    }
  } else if (!style.includes("color") || !style) {
    const text = (el as HTMLElement).textContent || "";
    if (text.trim().length > 0) {
      (el as HTMLElement).setAttribute(
        "style",
        `${style ? style + "; " : ""}color: #24292e;`,
      );
    }
  }
};

export const processHtmlElement = (el: Element): void => {
  if (el.tagName === "SPAN") {
    processSpanElement(el);
  } else if (el.children.length > 0) {
    Array.from(el.children).forEach(processHtmlElement);
  }
};

// Syntax highlighting utilities
export const highlightQuestionCode = async (
  question: any,
  qIndex: number,
  highlighter: Highlighter,
): Promise<string | null> => {
  if (!question.code || !highlighter) return null;

  try {
    const code = String(question.code);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = isDark ? "github-dark" : "github-light";

    // Detect language based on file extension or content
    let language = "javascript";
    if (question.language) {
      language = question.language.toLowerCase();
    } else if (question.fileName) {
      const ext = question.fileName.split(".").pop()?.toLowerCase();
      if (ext === "py") language = "python";
      else if (ext === "java") language = "java";
      else if (ext === "ts" || ext === "tsx") language = "typescript";
      else if (ext === "jsx") language = "javascript";
      else if (ext === "json") language = "json";
      else if (ext === "html") language = "html";
      else if (ext === "css") language = "css";
    }

    const html = highlighter.codeToHtml(code, {
      lang: language,
      theme: theme,
    });

    // Process HTML to darken colors for better contrast
    // Security: Sanitize HTML before using innerHTML (defense-in-depth)
    const tempDiv = document.createElement("div");
    if (typeof window !== "undefined") {
      tempDiv.innerHTML = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["pre", "code", "span", "div", "style"],
        ALLOWED_ATTR: ["class", "style"],
      });
    } else {
      tempDiv.innerHTML = html; // Server-side: will be sanitized on client
    }
    Array.from(tempDiv.children).forEach(processHtmlElement);
    // Security: Sanitize before returning
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(tempDiv.innerHTML, {
        ALLOWED_TAGS: ["pre", "code", "span", "div", "style"],
        ALLOWED_ATTR: ["class", "style"],
      });
    }
    return tempDiv.innerHTML;
  } catch (error) {
    console.error("Error highlighting code:", error);
    return null;
  }
};

// File validation utilities
export const validateFile = (file: File): string | null => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return "File size must be less than 10MB";
  }

  const allowedTypes = [
    "application/json",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const allowedExtensions = [".json", ".csv", ".xlsx", ".xls"];
  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

  if (
    !allowedTypes.includes(file.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    return "Unsupported file type. Please upload JSON, CSV, or Excel files.";
  }

  return null;
};

// Question validation utilities
export const validateQuestions = (questions: any[]): string[] => {
  const errors: string[] = [];

  if (!Array.isArray(questions)) {
    errors.push("Data must be an array of questions");
    return errors;
  }

  questions.forEach((question, index) => {
    if (!question.question && !question.title) {
      errors.push(`Question ${index + 1}: Missing question/title field`);
    }
    if (!question.correctAnswer && !question.answer) {
      errors.push(`Question ${index + 1}: Missing correct answer field`);
    }
    if (!question.options && !question.choices) {
      errors.push(`Question ${index + 1}: Missing options/choices field`);
    }
  });

  return errors;
};

// Data transformation utilities
export const transformQuestionData = (questions: any[]): any[] => {
  return questions.map((question) => {
    // Normalize field names
    return {
      id:
        question.id ||
        `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      question: question.question || question.title || "",
      correctAnswer: question.correctAnswer || question.answer || "",
      options: question.options || question.choices || [],
      explanation: question.explanation || "",
      difficulty: question.difficulty || "medium",
      category: question.category || "general",
      code: question.code || "",
      language: question.language || "javascript",
      fileName: question.fileName || "",
    };
  });
};
