import { useState, useEffect, useCallback, useRef } from "react";
import { FrontendTask, FrontendTaskFile } from "@elzatona/types";
import { useThemeManagement } from "../../admin/editors/FrontendTaskEditorHooks";
import {
  generateReactPreview,
  generatePlainPreview,
  generateCssStyles,
  isReactCode,
  getCurrentFileContent,
  setCurrentFileContent,
} from "./FrontendTaskSolverUtils";

export const usePanelLayout = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(25); // Percentage
  const [rightPanelWidth, setRightPanelWidth] = useState(40); // Percentage
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingLeft.current) {
        const width = (e.clientX / window.innerWidth) * 100;
        if (width > 15 && width < 40) {
          setLeftPanelWidth(width);
        }
      }
      if (isDraggingRight.current) {
        const width =
          ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
        if (width > 20 && width < 50) {
          setRightPanelWidth(width);
        }
      }
    };

    const handleMouseUp = () => {
      isDraggingLeft.current = false;
      isDraggingRight.current = false;
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, panel: "left" | "right") => {
    e.preventDefault();
    if (panel === "left") {
      isDraggingLeft.current = true;
    } else {
      isDraggingRight.current = true;
    }
    document.body.style.cursor = "col-resize";
  };

  return { leftPanelWidth, rightPanelWidth, handleMouseDown };
};

export const useSolverState = (task?: FrontendTask | null) => {
  const { theme, setTheme, isDark } = useThemeManagement();

  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<any[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  // Initialize files when task loads
  useEffect(() => {
    if (task?.files && task.files.length > 0) {
      const files = task.files.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        content: file.content,
        fileType: file.type, // mapping for utils
      }));
      setOpenFiles(files);

      const entryPoint = files.find(
        (f) =>
          f.name === "App.tsx" || f.name === "index.js" || f.name === "App.jsx",
      );
      setActiveFile(entryPoint?.id || files[0]?.id || null);
    }
  }, [task]);

  // Update code when active file changes
  useEffect(() => {
    if (activeFile) {
      const content = getCurrentFileContent(openFiles, activeFile);
      setCode(content);
    }
  }, [activeFile, openFiles]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setOpenFiles((prev) => setCurrentFileContent(prev, activeFile, newCode));
  };

  const runCode = useCallback(() => {
    if (!task) return;

    setIsRunning(true);
    setConsoleOutput([]); // Clear console

    try {
      // Find the entry point file
      const entryFile = openFiles.find(
        (f) =>
          f.name === "App.tsx" || f.name === "App.jsx" || f.name === "index.js",
      );

      const cssFile = openFiles.find(
        (f) => f.type === "css" || f.name.endsWith(".css"),
      );
      const cssContent = cssFile ? generateCssStyles(cssFile.content) : "";

      const codeToRun = entryFile ? entryFile.content : code;
      const isReact = isReactCode(codeToRun);

      // Generate preview HTML
      const html = isReact
        ? generateReactPreview(codeToRun, cssContent)
        : generatePlainPreview(codeToRun, cssContent);

      setPreviewContent(html);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setConsoleOutput((prev) => [...prev, `[ERROR] ${errorMessage}`]);
    } finally {
      setTimeout(() => setIsRunning(false), 500);
    }
  }, [code, openFiles, task]);

  return {
    theme,
    setTheme,
    isDark,
    activeFile,
    setActiveFile,
    openFiles,
    code,
    handleCodeChange,
    consoleOutput,
    setConsoleOutput,
    runCode,
    isRunning,
    previewContent,
  };
};
