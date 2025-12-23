import { createHighlighter, type Highlighter } from "shiki";

// Language detection utility
export const detectLanguage = (code: string): string => {
  const codeText = code.toLowerCase();
  if (
    codeText.includes("def ") ||
    (codeText.includes("import ") && codeText.includes("print"))
  ) {
    return "python";
  }
  if (codeText.includes("public class") || codeText.includes("public static")) {
    return "java";
  }
  if (
    codeText.includes("interface ") ||
    codeText.includes("type ") ||
    codeText.includes(": string")
  ) {
    return "typescript";
  }
  return "javascript";
};

// Color processing utilities
export const calculateBrightness = (
  r: number,
  g: number,
  b: number,
): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const getDimmingFactor = (brightness: number): number => {
  return brightness > 220 ? 0.3 : 0.5;
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

export const extractRgbFromHex = (
  hex: string,
): { r: number; g: number; b: number } => {
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
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
  highlighter: Highlighter,
): Promise<string | null> => {
  if (!question.content || !highlighter) return null;

  try {
    // Extract code from content if it contains code blocks
    const codeMatch = question.content.match(/```(\w+)?\n([\s\S]*?)```/);
    if (!codeMatch) return null;

    const code = codeMatch[2];
    const language = codeMatch[1] || detectLanguage(code);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = isDark ? "github-dark" : "github-light";

    const html = highlighter.codeToHtml(code, {
      lang: language,
      theme: theme,
    });

    // Process HTML to darken colors for better contrast
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    Array.from(tempDiv.children).forEach(processHtmlElement);
    return tempDiv.innerHTML;
  } catch (error) {
    console.error("Error highlighting code:", error);
    return null;
  }
};
