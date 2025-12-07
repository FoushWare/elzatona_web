"use client";

import React, { useState, useEffect, useMemo, ReactNode } from "react";

// Force dynamic rendering to prevent static generation issues with auth context
export const dynamic = "force-dynamic";
// Note: This page uses hooks/API routes, not direct supabase client

import { useRouter, useParams } from "next/navigation";
import Editor from "@monaco-editor/react";
import {
  Code,
  ArrowRight,
  Clock,
  Target,
  Flame,
  CheckCircle,
  Circle,
  AlertCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Copy,
  Check,
  Save,
  MoreVertical,
  Folder,
  FileText,
  FolderOpen,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "@elzatona/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@elzatona/components";
import { Button } from "@elzatona/components";

interface FrontendTaskFile {
  id: string;
  name: string;
  type: "tsx" | "ts" | "css" | "html" | "json" | "js";
  content: string;
  isEntryPoint?: boolean;
}

interface FrontendTask {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  completionCount: number;
  author?: string;
  company?: string;
  requirements?: string[];
  hints?: string[];
  solution?: string;
  starterCode?: {
    html?: string;
    css?: string;
    react?: string;
  };
  files?: FrontendTaskFile[]; // New dynamic files structure
}

export default function FrontendTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id as string;
  const { isAuthenticated, user } = useAuth();

  const [task, setTask] = useState<FrontendTask | null>(null);
  const [code, setCode] = useState("");
  const [css, setCss] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "solution">(
    "description",
  );
  const [editorTab, setEditorTab] = useState<"code" | "css">("code");
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [openFiles, setOpenFiles] = useState<
    Array<{
      id: string;
      name: string;
      type: "tsx" | "css" | "html" | "js" | "json";
      content: string;
    }>
  >([
    { id: "app", name: "App.tsx", type: "tsx", content: "" },
    { id: "styles", name: "styles.css", type: "css", content: "" },
    {
      id: "index",
      name: "index.html",
      type: "html",
      content:
        '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1.0" />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
    },
    {
      id: "package",
      name: "package.json",
      type: "json",
      content: JSON.stringify(
        {
          name: "@gfe-questions/counter-react-skeleton",
          author: "yangshun",
          version: "0.0.1",
          private: true,
          dependencies: {
            react: "18.2.0",
            "react-dom": "18.2.0",
            "react-scripts": "5.0.1",
          },
          devDependencies: {
            "@types/react": "18.2.0",
            "@types/react-dom": "18.2.0",
            typescript: "5.0.2",
          },
          scripts: {
            start: "react-scripts start",
            build: "react-scripts build",
            test: "react-scripts test",
            eject: "react-scripts eject",
          },
        },
        null,
        2,
      ),
    },
    {
      id: "tsconfig",
      name: "tsconfig.json",
      type: "json",
      content: JSON.stringify(
        {
          include: ["./**/*"],
          compilerOptions: {
            strict: true,
            esModuleInterop: true,
            lib: ["dom", "dom.iterable", "esnext"],
            jsx: "react-jsx",
            target: "es2020",
          },
        },
        null,
        2,
      ),
    },
  ]);
  const [activeFile, setActiveFile] = useState("app");
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [leftPanelWidth, setLeftPanelWidth] = useState(25); // percentage
  const [rightPanelWidth, setRightPanelWidth] = useState(25); // percentage
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src"]),
  );

  useEffect(() => {
    // Listen for console messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "console") {
        setConsoleOutput((prev) => [...prev.slice(-19), event.data.message]);
      }
    };

    window.addEventListener("message", handleMessage);

    // Add initial console messages
    const initialMessages = [
      "[12:00:00] [INFO] Console ready",
      "[12:00:00] [INFO] Start coding to see console output...",
    ];
    setConsoleOutput(initialMessages);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    // Mock task data - replace with actual API call
    const mockTask: FrontendTask = {
      id: taskId,
      title: "Counter Component",
      description:
        "Make the text within the button display the number of times the button has been clicked.",
      category: "React",
      difficulty: "Easy",
      estimatedTime: "5-10 minutes",
      completionCount: 1250,
      author: "yangshun",
      company: "GFE Questions",
      requirements: [
        "Fix the bug in the onClick handler",
        "Make the button increment the count instead of decrementing",
        "Display the current count in the button text",
      ],
      hints: [
        "Look at the onClick handler - it should increment, not decrement",
        "The count state is already set up correctly",
        "The button text is already displaying the count",
      ],
      solution: `import { useState } from 'react';

// This is a warm up question to help you
// get familiar with the editor.
// Most of the code has been filled in for you.
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          // Fix the bug in the next line
          // to complete the question.
          setCount(count + 1); // Changed from count - 1 to count + 1
        }}>
        Clicks: {count}
      </button>
    </div>
  );
}`,
      files: [
        {
          id: "app",
          name: "App.tsx",
          type: "tsx",
          content: `import { useState } from 'react';

// This is a warm up question to help you
// get familiar with the editor.
// Most of the code has been filled in for you.
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          // Fix the bug in the next line
          // to complete the question.
          setCount(count - 1);
        }}>
        Clicks: {count}
      </button>
    </div>
  );
}`,
          isEntryPoint: true,
        },
        {
          id: "styles",
          name: "styles.css",
          type: "css",
          content: "body {\n  font-family: sans-serif;\n}",
          isEntryPoint: false,
        },
        {
          id: "index",
          name: "index.html",
          type: "html",
          content:
            '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1.0" />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
          isEntryPoint: false,
        },
      ],
      // Legacy starterCode for backward compatibility
      starterCode: {
        html: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1.0" />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
        css: "body {\n  font-family: sans-serif;\n}",
        react: `import { useState } from 'react';

// This is a warm up question to help you
// get familiar with the editor.
// Most of the code has been filled in for you.
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          // Fix the bug in the next line
          // to complete the question.
          setCount(count - 1);
        }}>
        Clicks: {count}
      </button>
    </div>
  );
}`,
      },
    };

    setTask(mockTask);

    // Use files if available, otherwise fall back to starterCode
    if (mockTask.files && mockTask.files.length > 0) {
      // Find the entry point file (usually App.tsx)
      const entryPointFile =
        mockTask.files.find((f) => f.isEntryPoint) || mockTask.files[0];
      setCode(entryPointFile.content);

      // Find CSS file
      const cssFile = mockTask.files.find((f) => f.type === "css");
      setCss(cssFile?.content || "");

      // Update openFiles with the files content
      setOpenFiles((prev) =>
        prev.map((file) => {
          const taskFile = mockTask.files?.find((f) => f.id === file.id);
          if (taskFile) {
            return { ...file, content: taskFile.content };
          }
          return file;
        }),
      );
    } else {
      // Fallback to legacy starterCode
      setCode(mockTask.starterCode?.react || "");
      setCss(mockTask.starterCode?.css || "");

      // Update openFiles with the starter code content
      setOpenFiles((prev) =>
        prev.map((file) => {
          if (file.id === "app") {
            return { ...file, content: mockTask.starterCode?.react || "" };
          } else if (file.id === "styles") {
            return { ...file, content: mockTask.starterCode?.css || "" };
          } else if (file.id === "index") {
            return {
              ...file,
              content: mockTask.starterCode?.html || file.content,
            };
          }
          return file;
        }),
      );
    }
  }, [taskId]);

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

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleSaveToCloud = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    // Here you would save to cloud for authenticated users
    console.log("Saving to cloud...");
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

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleReset = () => {
    setCode(task?.starterCode?.react || "");
    setCss(task?.starterCode?.css || "");
  };

  const handleCloseFile = (fileId: string) => {
    if (openFiles.length <= 1) return; // Don't close the last file

    setOpenFiles((prev) => prev.filter((file) => file.id !== fileId));

    // If we're closing the active file, switch to another file
    if (activeFile === fileId) {
      const remainingFiles = openFiles.filter((file) => file.id !== fileId);
      if (remainingFiles.length > 0) {
        setActiveFile(remainingFiles[0].id);
      }
    }
  };

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

  // Saved code feature removed

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
    setOpenFiles((prev) =>
      prev.map((file) =>
        file.id === activeFile ? { ...file, content: value } : file,
      ),
    );

    // Also update the legacy state for backward compatibility
    if (activeFile === "app") {
      setCode(value);
    } else if (activeFile === "styles") {
      setCss(value);
    }
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

  const previewSrcDoc = useMemo(() => {
    const appFile = openFiles.find((f) => f.id === "app");
    const stylesFile = openFiles.find((f) => f.id === "styles");
    const indexFile = openFiles.find((f) => f.id === "index");

    const reactCode = appFile?.content || code || "";
    const cssCode = stylesFile?.content || css || "";
    const htmlCode = indexFile?.content || '<div id="root"></div>';

    // Enhanced CSS with CodeSandbox-like styling
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
        .console-output {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #1e1e1e;
          color: #fff;
          padding: 8px 16px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          border-top: 1px solid #333;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        }
        ${cssCode}
      </style>
    `;

    if (
      reactCode.includes("import") ||
      reactCode.includes("export default") ||
      reactCode.includes("React")
    ) {
      // Enhanced React runtime with better error handling
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
          // Enhanced console capture with parent communication
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
            
            // Update console display in iframe
            const consoleDiv = document.getElementById('console-output');
            if (consoleDiv) {
              consoleDiv.innerHTML = consoleOutput.slice(-20).join('\\n');
            }
            
            // Send to parent window
            try {
              window.parent.postMessage({
                type: 'console',
                method: method,
                message: logEntry,
                timestamp: timestamp
              }, '*');
            } catch (e) {
              // Fallback if postMessage fails
            }
            
            // Call original method
            originalConsole[method].apply(console, args);
          }
          
          console.log = (...args) => captureConsole('log', args);
          console.error = (...args) => captureConsole('error', args);
          console.warn = (...args) => captureConsole('warn', args);
          console.info = (...args) => captureConsole('info', args);
          
          // Error boundary for React
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
            // Add React hooks to global scope for the transpiled code
            const { useState, useEffect, useMemo, useCallback, useRef, useContext, useReducer } = React;
            window.React = React;
            window.useState = useState;
            window.useEffect = useEffect;
            window.useMemo = useMemo;
            window.useCallback = useCallback;
            window.useRef = useRef;
            window.useContext = useContext;
            window.useReducer = useReducer;
            
            // Clear any existing declarations to prevent duplicate identifier errors
            if (window.App) {
              delete window.App;
            }
            
            const cleanCode = \`${cleanReactCode.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;
            const transpiledCode = Babel.transform(cleanCode, { 
              presets: ['react'],
              plugins: ['transform-class-properties']
            }).code;
            
            // Wrap the code in an IIFE to avoid global scope pollution
            const wrappedCode = \`(function() {
              \${transpiledCode}
              return App;
            })()\`;
            
            const App = eval(wrappedCode);
            
            // Clear the root element before rendering
            const rootElement = document.getElementById('root');
            if (rootElement) {
              rootElement.innerHTML = '';
            }
            
            // Create or reuse React root
            if (!window.reactRoot) {
              window.reactRoot = ReactDOM.createRoot(rootElement);
            }
            
            window.reactRoot.render(React.createElement(ErrorBoundary, null, 
              React.createElement(App)
            ));
            
            // Add some test console output
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
        '<div id="console-output" class="console-output" style="display: none;"></div>' +
        "<script>" +
        'document.addEventListener("keydown", (e) => {' +
        'if (e.ctrlKey && e.key === "Backquote") {' +
        'const console = document.getElementById("console-output");' +
        'console.style.display = console.style.display === "none" ? "block" : "none";' +
        "}" +
        "});" +
        "</script>" +
        "</body>" +
        "</html>"
      );
    } else {
      // Regular JavaScript/HTML
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
  }, [openFiles, code, css, task?.starterCode]);

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/frontend-tasks")}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                {getCategoryIcon(task.category)}
              </div>
              <div>
                <h1 className="text-xl font-bold">{task.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    {task.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {task.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.estimatedTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkComplete}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                isCompleted
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isCompleted ? "Completed" : "Mark Complete"}
            </button>
            {!isAuthenticated && (
              <button
                onClick={handleSaveToCloud}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save to Cloud
              </button>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {showPreview ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Description */}
        <div
          className="bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden relative group"
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
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "description"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "solution"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Solution
            </button>
            {/* Saved tab removed */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "description" && (
              <div className="space-y-6">
                {/* Task Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
                  {task.author && (
                    <p className="text-gray-400 mb-4">
                      {task.author} in {task.company}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Code className="w-4 h-4" />
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {task.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {(task.completionCount / 1000).toFixed(1)}k done
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Requirements */}
                {task.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {task.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <Circle className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Preview Button */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview what you need to build
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Hints */}
                {task.hints && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Hints</h3>
                    <ul className="space-y-2">
                      {task.hints.map((hint, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <AlertCircle className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "solution" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Solution</h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{task.solution}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Saved content removed */}
          </div>
        </div>

        {/* Main Editor Panel */}
        <div
          className="bg-gray-900 flex flex-col overflow-hidden relative group"
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
              className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${showFileExplorer ? "w-64" : "w-0 overflow-hidden"}`}
            >
              {showFileExplorer && (
                <div className="h-full flex flex-col">
                  {/* File Explorer Header */}
                  <div className="bg-gray-700 px-3 py-2 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded flex items-center justify-center">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        Explorer
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFileExplorer(false)}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* File Tree */}
                  <div className="flex-1 p-2 text-sm overflow-y-auto">
                    <div className="space-y-1">
                      {/* Project root */}
                      <div
                        className="flex items-center gap-2 py-1 px-2 text-gray-300 cursor-pointer hover:bg-gray-700 rounded"
                        onClick={() => toggleFolder("src")}
                      >
                        {expandedFolders.has("src") ? (
                          <FolderOpen className="w-4 h-4" />
                        ) : (
                          <Folder className="w-4 h-4" />
                        )}
                        <span>src</span>
                      </div>

                      {/* Files in src */}
                      {expandedFolders.has("src") && (
                        <div className="ml-6 space-y-1">
                          {openFiles.map((file) => (
                            <div
                              key={file.id}
                              className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
                                activeFile === file.id
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-300 hover:bg-gray-700"
                              }`}
                              onClick={() => setActiveFile(file.id)}
                            >
                              {getFileIcon(file.type)}
                              <span>{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Public folder */}
                      <div
                        className="flex items-center gap-2 py-1 px-2 text-gray-300 mt-4 cursor-pointer hover:bg-gray-700 rounded"
                        onClick={() => toggleFolder("public")}
                      >
                        {expandedFolders.has("public") ? (
                          <FolderOpen className="w-4 h-4" />
                        ) : (
                          <Folder className="w-4 h-4" />
                        )}
                        <span>public</span>
                      </div>

                      {/* Files in public */}
                      {expandedFolders.has("public") && (
                        <div className="ml-6 space-y-1">
                          <div
                            className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
                              activeFile === "index"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveFile("index")}
                          >
                            <div className="w-4 h-4 text-orange-500">H</div>
                            <span>index.html</span>
                          </div>
                        </div>
                      )}

                      {/* Package files */}
                      <div
                        className="flex items-center gap-2 py-1 px-2 text-gray-300 mt-4 cursor-pointer hover:bg-gray-700 rounded"
                        onClick={() => toggleFolder("root")}
                      >
                        {expandedFolders.has("root") ? (
                          <FolderOpen className="w-4 h-4" />
                        ) : (
                          <Folder className="w-4 h-4" />
                        )}
                        <span>Root</span>
                      </div>

                      {/* Files in root */}
                      {expandedFolders.has("root") && (
                        <div className="ml-6 space-y-1">
                          <div
                            className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
                              activeFile === "package"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveFile("package")}
                          >
                            <div className="w-4 h-4 text-gray-400">📄</div>
                            <span>package.json</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
                              activeFile === "tsconfig"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveFile("tsconfig")}
                          >
                            <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                              TS
                            </div>
                            <span>tsconfig.json</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Editor Content */}
            <div className="flex-1 flex flex-col">
              {/* Editor Header with File Tabs */}
              <div className="bg-gray-800 border-b border-gray-700 flex items-center">
                {/* File Explorer Toggle */}
                {!showFileExplorer && (
                  <button
                    onClick={() => setShowFileExplorer(true)}
                    className="p-2 text-gray-400 hover:text-white border-r border-gray-700"
                  >
                    <Folder className="w-4 h-4" />
                  </button>
                )}

                {/* Debug: Always show toggle button */}
                <button
                  onClick={() => setShowFileExplorer(!showFileExplorer)}
                  className="p-2 text-gray-400 hover:text-white border-r border-gray-700"
                  title={`File Explorer: ${showFileExplorer ? "Open" : "Closed"}`}
                >
                  <Folder className="w-4 h-4" />
                </button>

                {/* File Tabs */}
                <div className="flex items-center">
                  {openFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-2 px-3 py-2 border-r border-gray-700 cursor-pointer ${
                        activeFile === file.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-750"
                      }`}
                      onClick={() => setActiveFile(file.id)}
                    >
                      {getFileIcon(file.type)}
                      <span className="text-sm">{file.name}</span>
                      <button
                        className="p-1 hover:bg-gray-600 rounded ml-1"
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
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white">
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
                  theme="vs-dark"
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
                    // TypeScript/JavaScript specific options
                    // typescript: {
                    //   suggest: {
                    //     includeCompletionsForModuleExports: false,
                    //   },
                    // },
                    // javascript: {
                    //   suggest: {
                    //     includeCompletionsForModuleExports: false,
                    //   },
                    // },
                  }}
                  beforeMount={(monaco) => {
                    // Configure TypeScript compiler options
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

                    // Disable module resolution for React
                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                      {
                        noSemanticValidation: true,
                        noSyntaxValidation: false,
                        noSuggestionDiagnostics: true,
                      },
                    );

                    // Add React types
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
          className="bg-gray-800 border-l border-gray-700 flex flex-col overflow-hidden relative group"
          style={{
            width: `${rightPanelWidth}%`,
            minWidth: "300px",
            maxWidth: "60%",
          }}
        >
          {/* Browser Header */}
          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400 hover:text-white">
                <ArrowRight className="w-3 h-3 rotate-180" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <ArrowRight className="w-3 h-3" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <RotateCcw className="w-3 h-3" />
              </button>
              <div className="bg-gray-600 rounded px-2 py-1 text-xs text-gray-300">
                localhost:3000
              </div>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-1 text-gray-400 hover:text-white"
            >
              {showPreview ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Preview Content */}
          <div className="flex-1 bg-white relative flex flex-col">
            {showPreview ? (
              <>
                <iframe
                  title="live-preview"
                  className="flex-1 bg-white border-0"
                  srcDoc={previewSrcDoc}
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => console.log("Preview loaded successfully")}
                  onError={(e) => console.error("Preview error:", e)}
                />
                {/* Console Panel */}
                <div className="bg-gray-900 border-t border-gray-700 max-h-32 overflow-y-auto">
                  <div className="px-3 py-2 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-300">Console</span>
                    </div>
                    <button
                      onClick={() => setConsoleOutput([])}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="px-3 py-2 text-xs text-gray-300 font-mono">
                    {consoleOutput.length > 0 ? (
                      consoleOutput.map((line, index) => {
                        const isError = line.includes("[ERROR]");
                        const isWarning = line.includes("[WARN]");
                        const isInfo = line.includes("[INFO]");

                        return (
                          <div
                            key={index}
                            className={`mb-1 ${
                              isError
                                ? "text-red-400"
                                : isWarning
                                  ? "text-yellow-400"
                                  : isInfo
                                    ? "text-blue-400"
                                    : "text-gray-300"
                            }`}
                          >
                            {line}
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-gray-500">No console output</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <EyeOff className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">Preview hidden</p>
                  <p className="text-sm text-gray-500">
                    Click the eye icon to show preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>All practice questions (1/291)</span>
        </div>
        <div className="flex items-center gap-2 -translate-x-2">
          {/* Action buttons moved to top header */}
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Save Your Progress
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Sign in to save your code to the cloud and never lose your
              progress!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Why Sign In?</h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Save your code to the cloud
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Access your projects from anywhere
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Track your learning progress
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Never lose your work again
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2">
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                router.push("/auth/login");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                router.push("/auth/register");
              }}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              Create Account
            </Button>
            <Button
              onClick={() => setShowLoginDialog(false)}
              variant="ghost"
              className="w-full text-gray-500 hover:text-gray-700"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
