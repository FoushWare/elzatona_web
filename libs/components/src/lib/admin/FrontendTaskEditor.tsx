// v2.0 - Frontend Task Editor with Three-Panel Layout (Description/Editor/Preview)

"use client";

import React, { useState, useEffect, useMemo, useRef, ReactNode } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Play,
  Save,
  FileText,
  FolderPlus,
  FilePlus,
  Trash2,
  Eye,
  Code,
  Palette,
  Settings,
  Plus,
  X,
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Folder,
  FolderOpen,
  Circle,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Flame,
  Copy,
  Check,
  RotateCcw,
  MoreVertical,
} from "lucide-react";
import {
  FrontendTask,
  FrontendTaskFile,
  FrontendTaskFormData,
} from "@elzatona/types";

interface FrontendTaskEditorProps {
  task?: FrontendTask | null;
  onSave: (taskData: FrontendTaskFormData) => Promise<void>;
  onCancel: () => void;
  mode?: "create" | "edit" | "view";
}

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  fileType?: string;
  isEntryPoint?: boolean;
}

export default function FrontendTaskEditor({
  task,
  onSave,
  onCancel,
  mode = "create",
}: FrontendTaskEditorProps) {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isDark, setIsDark] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<FrontendTaskFormData>({
    title: "",
    description: "",
    requirements: "",
    solution: "",
    category: "react",
    difficulty: "easy",
    estimatedTime: 30,
    author: "",
    starterCode: "",
    tags: [],
    hints: [],
    files: [],
    is_active: true,
  });

  // Panel layout state
  const [leftPanelWidth, setLeftPanelWidth] = useState(25);
  const [rightPanelWidth, setRightPanelWidth] = useState(25);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);

  // Editor states
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [openFiles, setOpenFiles] = useState<
    Array<{
      id: string;
      name: string;
      type: "tsx" | "css" | "html" | "js" | "json";
      content: string;
    }>
  >([]);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Content tabs
  const [activeTab, setActiveTab] = useState<"description" | "solution">(
    "description",
  );

  // Browser/Console tabs
  const [activeBrowserTab, setActiveBrowserTab] = useState<
    "browser" | "console"
  >("browser");

  // Form inputs
  const [newHint, setNewHint] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [showAddFile, setShowAddFile] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Theme detection
  useEffect(() => {
    const mediaQuery = globalThis.window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      if (theme === "system") {
        setIsDark(mediaQuery.matches);
      } else {
        setIsDark(theme === "dark");
      }
    };

    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [theme]);

  // Initialize form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        requirements: task.requirements || "",
        solution: task.solution || "",
        category: task.category || "react",
        difficulty: task.difficulty || "easy",
        estimatedTime: task.estimatedTime || 30,
        author: task.author || "",
        starterCode: task.starterCode || "",
        tags: task.tags || [],
        hints: task.hints || [],
        files: task.files || [],
        is_active: task.is_active !== false,
      });

      // Initialize file tree and open files
      if (task.files && task.files.length > 0) {
        const files = task.files.map((file) => ({
          id: file.id,
          name: file.name,
          type: "file" as const,
          content: file.content,
          fileType: file.type,
          isEntryPoint: file.isEntryPoint,
        }));

        setFileTree([
          {
            id: "src",
            name: "src",
            type: "folder",
            children: files.filter(
              (f) => f.fileType !== "html" && f.fileType !== "json",
            ),
          },
          {
            id: "public",
            name: "public",
            type: "folder",
            children: files.filter((f) => f.fileType === "html"),
          },
          {
            id: "root",
            name: "Root",
            type: "folder",
            children: files.filter((f) => f.fileType === "json"),
          },
        ]);

        setOpenFiles(
          files.map((f) => ({
            id: f.id,
            name: f.name,
            type: f.fileType as "tsx" | "css" | "html" | "js" | "json",
            content: f.content,
          })),
        );
        setActiveFile(
          files.find((f) => f.isEntryPoint)?.id || files[0]?.id || null,
        );
        setExpandedFolders(new Set(["src", "public", "root"]));
      } else {
        // Default files
        const defaultFiles = [
          {
            id: "app",
            name: "App.tsx",
            type: "file" as const,
            fileType: "tsx",
            content: "",
          },
          {
            id: "styles",
            name: "styles.css",
            type: "file" as const,
            fileType: "css",
            content: "",
          },
          {
            id: "index",
            name: "index.html",
            type: "file" as const,
            fileType: "html",
            content:
              '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
          },
        ];

        setFileTree([
          {
            id: "src",
            name: "src",
            type: "folder",
            children: defaultFiles.filter((f) => f.fileType !== "html"),
          },
          {
            id: "public",
            name: "public",
            type: "folder",
            children: defaultFiles.filter((f) => f.fileType === "html"),
          },
        ]);

        setOpenFiles(
          defaultFiles.map((f) => ({
            id: f.id,
            name: f.name,
            type: f.fileType as "tsx" | "css" | "html" | "js" | "json",
            content: f.content,
          })),
        );
        setActiveFile("app");
        setExpandedFolders(new Set(["src", "public"]));
      }
    }
  }, [task]);

  // Resize handlers
  const handleMouseDown = (e: React.MouseEvent, panel: "left" | "right") => {
    e.preventDefault();
    setIsResizing(true);
    setResizeStartX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStartX;
    const containerWidth = window.innerWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;

    if (deltaPercent !== 0) {
      setLeftPanelWidth((prev) =>
        Math.max(20, Math.min(60, prev + deltaPercent)),
      );
      setRightPanelWidth((prev) =>
        Math.max(20, Math.min(60, prev - deltaPercent)),
      );
      setResizeStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, resizeStartX]);

  // Console message listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console") {
        setConsoleOutput((prev) => [...prev.slice(-19), event.data.message]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // File operations
  const addFile = (name: string, type: string, content: string = "") => {
    const id = `file_${Date.now()}`;
    const newFile: FileNode = {
      id,
      name,
      type: "file",
      content,
      fileType: type,
    };

    setFileTree((prev) => {
      const srcFolder = prev.find((f) => f.id === "src");
      if (srcFolder) {
        return prev.map((folder) =>
          folder.id === "src"
            ? { ...folder, children: [...(folder.children || []), newFile] }
            : folder,
        );
      }
      return prev;
    });

    setOpenFiles((prev) => [...prev, { id, name, type: type as any, content }]);
    setActiveFile(id);
    setNewFileName("");
    setShowAddFile(false);
  };

  const addFolder = (name: string) => {
    const id = `folder_${Date.now()}`;
    const newFolder: FileNode = {
      id,
      name,
      type: "folder",
      children: [],
    };

    setFileTree((prev) => [...prev, newFolder]);
    setNewFolderName("");
    setShowAddFolder(false);
  };

  const deleteFile = (fileId: string) => {
    setFileTree((prev) =>
      prev.map((folder) => ({
        ...folder,
        children: folder.children?.filter((child) => child.id !== fileId) || [],
      })),
    );

    setOpenFiles((prev) => prev.filter((file) => file.id !== fileId));
    if (activeFile === fileId) {
      const remainingFiles = openFiles.filter((file) => file.id !== fileId);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[0].id : null);
    }
  };

  const updateFileContent = (fileId: string, content: string) => {
    setFileTree((prev) =>
      prev.map((folder) => ({
        ...folder,
        children:
          folder.children?.map((child) =>
            child.id === fileId ? { ...child, content } : child,
          ) || [],
      })),
    );

    setOpenFiles((prev) =>
      prev.map((file) => (file.id === fileId ? { ...file, content } : file)),
    );
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const openFile = (fileId: string) => {
    setActiveFile(fileId);
    const file = openFiles.find((f) => f.id === fileId);
    if (file && !openFiles.some((f) => f.id === fileId)) {
      setOpenFiles((prev) => [...prev, file]);
    }
  };

  const handleCloseFile = (fileId: string) => {
    if (openFiles.length <= 1) return;

    setOpenFiles((prev) => prev.filter((file) => file.id !== fileId));
    if (activeFile === fileId) {
      const remainingFiles = openFiles.filter((file) => file.id !== fileId);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[0].id : null);
    }
  };

  // Helper functions
  const getFileIcon = (type: string) => {
    switch (type) {
      case "tsx":
        return (
          <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
            TS
          </div>
        );
      case "css":
        return <div className="w-4 h-4 text-gray-400">#</div>;
      case "html":
        return <div className="w-4 h-4 text-orange-500">H</div>;
      case "js":
        return (
          <div className="w-4 h-4 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
            JS
          </div>
        );
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCurrentFileContent = () => {
    const file = openFiles.find((f) => f.id === activeFile);
    return file?.content || "";
  };

  const setCurrentFileContent = (value: string) => {
    if (!activeFile) return;

    updateFileContent(activeFile, value);
  };

  const getCurrentLanguage = () => {
    const file = openFiles.find((f) => f.id === activeFile);
    switch (file?.type) {
      case "tsx":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "js":
        return "javascript";
      case "json":
        return "json";
      default:
        return "typescript";
    }
  };

  // Preview generation
  const previewSrcDoc = useMemo(() => {
    const appFile = openFiles.find((f) => f.id === "app");
    const stylesFile = openFiles.find((f) => f.id === "styles");
    const indexFile = openFiles.find((f) => f.id === "index");

    const reactCode = appFile?.content || "";
    const cssCode = stylesFile?.content || "";
    const htmlCode = indexFile?.content || '<div id="root"></div>';

    const cssText = `
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 16px;
          background: #ffffff;
          color: #333;
          line-height: 1.6;
        }
        #root {
          min-height: 100vh;
        }
        .error-boundary {
          padding: 16px;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 4px;
          color: #c33;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          white-space: pre-wrap;
        }
        ${cssCode}
      </style>
    `;

    if (
      reactCode.includes("import") ||
      reactCode.includes("export default") ||
      reactCode.includes("React")
    ) {
      const cleanReactCode = reactCode
        .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, "")
        .replace(/import\s+\{.*?\}\s+from\s+['"][^'"]*['"];?\s*/g, "")
        .replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]*['"];?\s*/g, "")
        .replace(/export\s+default\s+/g, "")
        .replace(/export\s+\{.*?\};?\s*/g, "")
        .replace(/export\s+.*?;?\s*/g, "");

      const jsText = `
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script>
          const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info
          };
          
          const consoleOutput = [];
          
          function captureConsole(method, args) {
            const timestamp = new Date().toLocaleTimeString();
            const message = Array.from(args).map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            const logEntry = \`[\${timestamp}] [\${method.toUpperCase()}] \${message}\`;
            consoleOutput.push(logEntry);
            
            try {
              window.parent.postMessage({
                type: 'console',
                method: method,
                message: logEntry,
                timestamp: timestamp
              }, '*');
            } catch (e) {}
            
            originalConsole[method].apply(console, args);
          }
          
          console.log = (...args) => captureConsole('log', args);
          console.error = (...args) => captureConsole('error', args);
          console.warn = (...args) => captureConsole('warn', args);
          console.info = (...args) => captureConsole('info', args);
          
          class ErrorBoundary extends React.Component {
            constructor(props) {
              super(props);
              this.state = { hasError: false, error: null };
            }
            
            static getDerivedStateFromError(error) {
              return { hasError: true, error };
            }
            
            componentDidCatch(error, errorInfo) {
              console.error('React Error:', error, errorInfo);
            }
            
            render() {
              if (this.state.hasError) {
                return React.createElement('div', {
                  className: 'error-boundary'
                }, \`Error: \${this.state.error?.message || 'Unknown error'}\\n\\n\${this.state.error?.stack || ''}\`);
              }
              return this.props.children;
            }
          }
          
          try {
            const { useState, useEffect, useMemo, useCallback, useRef, useContext, useReducer } = React;
            window.React = React;
            window.useState = useState;
            window.useEffect = useEffect;
            window.useMemo = useMemo;
            window.useCallback = useCallback;
            window.useRef = useRef;
            window.useContext = useContext;
            window.useReducer = useReducer;
            
            if (window.App) {
              delete window.App;
            }
            
            const cleanCode = \`${cleanReactCode.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;
            const transpiledCode = Babel.transform(cleanCode, { 
              presets: ['react'],
              plugins: ['transform-class-properties']
            }).code;
            
            const wrappedCode = \`(function() {
              \${transpiledCode}
              return App;
            })()\`;
            
            const App = eval(wrappedCode);
            
            const rootElement = document.getElementById('root');
            if (rootElement) {
              rootElement.innerHTML = '';
            }
            
            if (!window.reactRoot) {
              window.reactRoot = ReactDOM.createRoot(rootElement);
            }
            
            window.reactRoot.render(React.createElement(ErrorBoundary, null, 
              React.createElement(App)
            ));
            
            console.log('React app loaded successfully');
            console.info('Ready to start coding!');
            
          } catch (error) {
            console.error('Compilation Error:', error);
            document.getElementById('root').innerHTML = \`
              <div class="error-boundary">
                Compilation Error: \${error.message}
                \\n\\n\${error.stack || ''}
              </div>
            \`;
          }
        </script>
      `;

      return (
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1">' +
        "<title>Live Preview</title>" +
        cssText +
        "</head>" +
        "<body>" +
        htmlCode +
        jsText +
        "</body>" +
        "</html>"
      );
    } else {
      const jsText = "<script>" + reactCode + "</script>";
      return (
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1">' +
        "<title>Live Preview</title>" +
        cssText +
        "</head>" +
        "<body>" +
        htmlCode +
        jsText +
        "</body>" +
        "</html>"
      );
    }
  }, [openFiles]);

  // Form handlers
  const handleSave = async () => {
    const files: FrontendTaskFile[] = fileTree
      .flatMap((folder) => folder.children || [])
      .map((file) => ({
        id: file.id,
        name: file.name,
        type: file.fileType as any,
        content: file.content || "",
        isEntryPoint: file.isEntryPoint || false,
      }));

    const taskData: FrontendTaskFormData = {
      ...formData,
      files,
    };

    await onSave(taskData);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentFileContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleReset = () => {
    if (task?.files && task.files.length > 0) {
      const files = task.files.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type as any,
        content: file.content,
      }));
      setOpenFiles(files);
      setActiveFile(
        files.find((f) => f.id === "app")?.id || files[0]?.id || null,
      );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "react":
        return <Code className="w-4 h-4" />;
      case "javascript":
        return <Code className="w-4 h-4" />;
      case "css":
        return <Code className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b px-6 py-4 transition-colors duration-300 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className={`p-2 transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}
              >
                {getCategoryIcon(formData.category)}
              </div>
              <div>
                <h1
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mode === "create"
                    ? "Create Frontend Task"
                    : mode === "edit"
                      ? "Edit Frontend Task"
                      : "View Frontend Task"}
                </h1>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    {formData.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {formData.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-700">
              <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded transition-colors ${
                  theme === "light"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded transition-colors ${
                  theme === "system"
                    ? "bg-gray-800 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {mode !== "view" && (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </>
            )}
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Description */}
        <div
          className={`border-r flex flex-col overflow-hidden relative group transition-colors duration-300 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
          style={{
            width: `${leftPanelWidth}%`,
            minWidth: "300px",
            maxWidth: "60%",
          }}
        >
          {/* Resize Handle */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500 cursor-col-resize z-30 transition-colors select-none"
            onMouseDown={(e) => handleMouseDown(e, "left")}
          ></div>

          {/* Tabs */}
          <div
            className={`flex border-b transition-colors duration-300 ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "description"
                  ? `text-white border-b-2 border-blue-500 ${isDark ? "bg-gray-800" : "bg-white"}`
                  : `${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "solution"
                  ? `text-white border-b-2 border-blue-500 ${isDark ? "bg-gray-800" : "bg-white"}`
                  : `${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`
              }`}
            >
              Solution
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "description" && (
              <div className="space-y-6">
                {/* Task Metadata - Editable */}
                {mode !== "view" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter task title..."
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="react">React</option>
                          <option value="javascript">JavaScript</option>
                          <option value="css">CSS</option>
                          <option value="html">HTML</option>
                          <option value="typescript">TypeScript</option>
                          <option value="vue">Vue.js</option>
                          <option value="angular">Angular</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Difficulty
                        </label>
                        <select
                          value={formData.difficulty}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              difficulty: e.target.value as
                                | "easy"
                                | "medium"
                                | "hard",
                            }))
                          }
                          className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Tags
                      </label>
                      <div className="space-y-2">
                        {formData.tags.map((tag, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tag}
                              onChange={(e) => {
                                const newTags = [...formData.tags];
                                newTags[index] = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  tags: newTags,
                                }));
                              }}
                              className={`flex-1 p-2 rounded border transition-colors duration-300 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                              }`}
                              placeholder={`Tag ${index + 1}`}
                            />
                            <button
                              onClick={() => {
                                const newTags = formData.tags.filter(
                                  (_, i) => i !== index,
                                );
                                setFormData((prev) => ({
                                  ...prev,
                                  tags: newTags,
                                }));
                              }}
                              className={`p-2 transition-colors ${
                                isDark
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-red-600 hover:text-red-500"
                              }`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              tags: [...prev.tags, ""],
                            }))
                          }
                          className={`w-full p-2 border-2 border-dashed rounded-lg transition-colors ${
                            isDark
                              ? "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                              : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
                          }`}
                        >
                          <Plus className="w-4 h-4 mx-auto" />
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Task Info Display */}
                <div>
                  <h2
                    className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {formData.title || "Untitled Task"}
                  </h2>
                  <div
                    className={`flex items-center gap-4 text-sm mb-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Code className="w-4 h-4" />
                      {formData.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {formData.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      5-10 minutes
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Description
                  </h3>
                  {mode === "view" ? (
                    <p
                      className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {formData.description || "No description provided."}
                    </p>
                  ) : (
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter task description..."
                      className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      rows={4}
                    />
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Requirements
                  </h3>
                  {mode === "view" ? (
                    <div
                      className={`rounded-lg p-4 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
                    >
                      <pre
                        className={`text-sm overflow-x-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {formData.requirements || "No requirements provided."}
                      </pre>
                    </div>
                  ) : (
                    <textarea
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requirements: e.target.value,
                        }))
                      }
                      placeholder="Enter task requirements..."
                      className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      rows={4}
                    />
                  )}
                </div>

                {/* Hints */}
                <div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Hints
                  </h3>
                  {mode === "view" ? (
                    <ul className="space-y-2">
                      {formData.hints.map((hint, index) => (
                        <li
                          key={index}
                          className={`flex items-start gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <AlertCircle className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-2">
                      {formData.hints.map((hint, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hint}
                            onChange={(e) => {
                              const newHints = [...formData.hints];
                              newHints[index] = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                hints: newHints,
                              }));
                            }}
                            className={`flex-1 p-2 rounded border transition-colors duration-300 ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            }`}
                            placeholder={`Hint ${index + 1}`}
                          />
                          <button
                            onClick={() => {
                              const newHints = formData.hints.filter(
                                (_, i) => i !== index,
                              );
                              setFormData((prev) => ({
                                ...prev,
                                hints: newHints,
                              }));
                            }}
                            className={`p-2 transition-colors ${
                              isDark
                                ? "text-red-400 hover:text-red-300"
                                : "text-red-600 hover:text-red-500"
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            hints: [...prev.hints, ""],
                          }))
                        }
                        className={`w-full p-2 border-2 border-dashed rounded-lg transition-colors ${
                          isDark
                            ? "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                            : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Plus className="w-4 h-4 mx-auto" />
                        Add Hint
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "solution" && (
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Solution
                </h3>
                {mode === "view" ? (
                  <div
                    className={`rounded-lg p-4 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
                  >
                    <pre
                      className={`text-sm overflow-x-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      <code>
                        {formData.files.find((f) => f.isEntryPoint)?.content ||
                          "No solution available."}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Solution Code
                      </label>
                      <textarea
                        value={
                          formData.files.find((f) => f.isEntryPoint)?.content ||
                          ""
                        }
                        onChange={(e) => {
                          const entryPointFile = formData.files.find(
                            (f) => f.isEntryPoint,
                          );
                          if (entryPointFile) {
                            const updatedFiles = formData.files.map((f) =>
                              f.id === entryPointFile.id
                                ? { ...f, content: e.target.value }
                                : f,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              files: updatedFiles,
                            }));
                          }
                        }}
                        placeholder="Enter solution code..."
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 font-mono text-sm ${
                          isDark
                            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        rows={15}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Solution Description
                      </label>
                      <textarea
                        value={formData.solution || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            solution: e.target.value,
                          }))
                        }
                        placeholder="Enter solution description..."
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Editor Panel */}
        <div
          className={`flex flex-col overflow-hidden relative group transition-colors duration-300 ${
            isDark ? "bg-gray-900" : "bg-gray-50"
          }`}
          style={{
            width: `${100 - leftPanelWidth - rightPanelWidth}%`,
            minWidth: "400px",
          }}
        >
          {/* Resize Handle */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500 cursor-col-resize z-30 transition-colors select-none"
            onMouseDown={(e) => handleMouseDown(e, "right")}
          ></div>

          {/* Editor Layout */}
          <div className="flex h-full">
            {/* File Explorer Sidebar */}
            <div
              className={`border-r transition-all duration-300 ${
                showFileExplorer ? "w-64" : "w-0 overflow-hidden"
              } ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}
            >
              {showFileExplorer && (
                <div className="h-full flex flex-col">
                  {/* File Explorer Header */}
                  <div
                    className={`px-3 py-2 border-b flex items-center justify-between ${
                      isDark
                        ? "bg-gray-700 border-gray-700"
                        : "bg-gray-200 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center ${
                          isDark ? "bg-gray-500" : "bg-gray-400"
                        }`}
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                      <span
                        className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Explorer
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFileExplorer(false)}
                      className={`p-1 transition-colors ${
                        isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* File Tree */}
                  <div
                    className={`flex-1 p-2 text-sm overflow-y-auto ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div className="space-y-1">
                      {fileTree.map((folder) => (
                        <div key={folder.id}>
                          <div
                            className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-700 rounded transition-colors ${
                              isDark
                                ? "text-gray-300 hover:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => toggleFolder(folder.id)}
                          >
                            {expandedFolders.has(folder.id) ? (
                              <FolderOpen className="w-4 h-4" />
                            ) : (
                              <Folder className="w-4 h-4" />
                            )}
                            <span>{folder.name}</span>
                          </div>

                          {expandedFolders.has(folder.id) &&
                            folder.children && (
                              <div className="ml-6 space-y-1">
                                {folder.children.map((file) => (
                                  <div
                                    key={file.id}
                                    className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
                                      activeFile === file.id
                                        ? "bg-blue-600 text-white"
                                        : isDark
                                          ? "text-gray-300 hover:bg-gray-700"
                                          : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                    onClick={() => openFile(file.id)}
                                  >
                                    {getFileIcon(file.fileType || "tsx")}
                                    <span>{file.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Editor Content */}
            <div className="flex-1 flex flex-col">
              {/* Editor Header with File Tabs */}
              <div
                className={`border-b flex items-center transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* File Explorer Toggle */}
                <button
                  onClick={() => setShowFileExplorer(!showFileExplorer)}
                  className={`p-2 border-r transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white border-gray-700"
                      : "text-gray-600 hover:text-gray-900 border-gray-200"
                  }`}
                  title={`File Explorer: ${showFileExplorer ? "Open" : "Closed"}`}
                >
                  <Folder className="w-4 h-4" />
                </button>

                {/* File Tabs */}
                <div className="flex items-center">
                  {openFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-2 px-3 py-2 border-r cursor-pointer transition-colors ${
                        activeFile === file.id
                          ? isDark
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-gray-50 text-gray-900 border-gray-200"
                          : isDark
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-750 border-gray-700"
                            : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
                      }`}
                      onClick={() => setActiveFile(file.id)}
                    >
                      {getFileIcon(file.type)}
                      <span className="text-sm">{file.name}</span>
                      <button
                        className={`p-1 rounded ml-1 transition-colors ${
                          isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseFile(file.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Editor Actions */}
                <div className="ml-auto flex items-center gap-2 px-4">
                  <button
                    onClick={handleCopyCode}
                    className={`p-1 transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className={`p-1 transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-1 transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getCurrentLanguage()}
                  value={getCurrentFileContent()}
                  onChange={(value) => setCurrentFileContent(value || "")}
                  theme={isDark ? "vs-dark" : "vs-light"}
                  options={{
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    tabSize: 2,
                    insertSpaces: true,
                    renderWhitespace: "selection",
                    cursorBlinking: "blink",
                    cursorStyle: "line",
                    selectOnLineNumbers: true,
                    folding: true,
                    foldingStrategy: "indentation",
                    showFoldingControls: "always",
                    bracketPairColorization: { enabled: true },
                    guides: {
                      bracketPairs: true,
                      indentation: true,
                    },
                  }}
                  beforeMount={(monaco) => {
                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                      {
                        target: monaco.languages.typescript.ScriptTarget.ES2020,
                        allowNonTsExtensions: true,
                        moduleResolution:
                          monaco.languages.typescript.ModuleResolutionKind
                            .NodeJs,
                        module: monaco.languages.typescript.ModuleKind.CommonJS,
                        noEmit: true,
                        esModuleInterop: true,
                        jsx: monaco.languages.typescript.JsxEmit.React,
                        reactNamespace: "React",
                        allowJs: true,
                        typeRoots: ["node_modules/@types"],
                      },
                    );

                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                      {
                        noSemanticValidation: true,
                        noSyntaxValidation: false,
                        noSuggestionDiagnostics: true,
                      },
                    );

                    monaco.languages.typescript.typescriptDefaults.addExtraLib(
                      `declare module 'react' {
                        export = React;
                        export as namespace React;
                        declare namespace React {
                          type ReactElement = any;
                          type ReactNode = any;
                          function createElement(type: any, props?: any, ...children: any[]): ReactElement;
                          function useState<T>(initialState: T): [T, (value: T) => void];
                          function useEffect(effect: () => void, deps?: any[]): void;
                          function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: any[]): T;
                          function useMemo<T>(factory: () => T, deps?: any[]): T;
                        }
                      }`,
                      "file:///node_modules/@types/react/index.d.ts",
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Browser Preview */}
        <div
          className={`border-l flex flex-col overflow-hidden relative group transition-colors duration-300 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
          style={{
            width: `${rightPanelWidth}%`,
            minWidth: "300px",
            maxWidth: "60%",
          }}
        >
          {/* Browser Header */}
          <div
            className={`px-4 py-2 flex items-center justify-between ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                className={`p-1 transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </button>
              <button
                className={`p-1 transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ArrowLeft className="w-3 h-3" />
              </button>
              <button
                className={`p-1 transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <div
                className={`rounded px-2 py-1 text-xs ${
                  isDark
                    ? "bg-gray-600 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                localhost:3000
              </div>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`p-1 transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {showPreview ? (
                <Eye className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Browser/Console Tabs */}
          <div
            className={`flex border-b ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => setActiveBrowserTab("browser")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeBrowserTab === "browser"
                  ? isDark
                    ? "bg-gray-800 text-white border-b-2 border-blue-500"
                    : "bg-white text-gray-900 border-b-2 border-blue-500"
                  : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Browser
            </button>
            <button
              onClick={() => setActiveBrowserTab("console")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeBrowserTab === "console"
                  ? isDark
                    ? "bg-gray-800 text-white border-b-2 border-blue-500"
                    : "bg-white text-gray-900 border-b-2 border-blue-500"
                  : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Console
            </button>
          </div>

          {/* Preview Content */}
          <div className="flex-1 bg-white relative flex flex-col">
            {activeBrowserTab === "browser" ? (
              showPreview ? (
                <iframe
                  ref={iframeRef}
                  title="live-preview"
                  className="flex-1 bg-white border-0"
                  srcDoc={previewSrcDoc}
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => console.log("Preview loaded successfully")}
                  onError={(e) => console.error("Preview error:", e)}
                />
              ) : (
                <div
                  className={`flex-1 flex items-center justify-center ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preview hidden</p>
                  </div>
                </div>
              )
            ) : (
              <div
                className={`flex-1 overflow-y-auto ${
                  isDark ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <div
                  className={`px-3 py-2 border-b flex items-center justify-between ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span
                      className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Console
                    </span>
                  </div>
                  <button
                    onClick={() => setConsoleOutput([])}
                    className={`text-xs transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Clear
                  </button>
                </div>
                <div
                  className={`px-3 py-2 text-xs font-mono ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {consoleOutput.length > 0 ? (
                    consoleOutput.map((line, index) => {
                      const isError = line.includes("[ERROR]");
                      const isWarning = line.includes("[WARN]");
                      const isInfo = line.includes("[INFO]");

                      const getLineColor = () => {
                        if (isError) return "text-red-400";
                        if (isWarning) return "text-yellow-400";
                        if (isInfo) return "text-blue-400";
                        return isDark ? "text-gray-300" : "text-gray-700";
                      };

                      return (
                        <div
                          key={`console-line-${index}-${line.substring(0, 20)}`}
                          className={`mb-1 ${getLineColor()}`}
                        >
                          {line}
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className={`${isDark ? "text-gray-500" : "text-gray-500"}`}
                    >
                      No console output
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
