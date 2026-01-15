import React from "react";
import {
  ArrowLeft,
  Sun,
  Moon,
  Play,
  Monitor,
  Code,
  Terminal,
  FileCode,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import Editor from "@monaco-editor/react";
import { getFileIcon, getLanguageForType } from "./FrontendTaskSolverUtils";
import { ScrollArea } from "../../components/ui/scroll-area";
import Markdown from "react-markdown";

interface HeaderProps {
  title: string;
  isDark: boolean;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onBack: () => void;
  isRunning: boolean;
}

export const SolverHeader: React.FC<HeaderProps> = ({
  title,
  isDark,
  theme,
  setTheme,
  onRun,
  onSubmit,
  onBack,
  isRunning,
}) => {
  return (
    <div
      className={`h-16 border-b flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1
          className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          onClick={onRun}
          disabled={isRunning}
          className={`${
            isDark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white min-w-[100px]`}
        >
          <Play className={`h-4 w-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
          {isRunning ? "Running..." : "Run Code"}
        </Button>

        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Submit
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

interface FileExplorerProps {
  files: any[];
  activeFile: string | null;
  onFileSelect: (fileId: string) => void;
  isDark: boolean;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFile,
  onFileSelect,
  isDark,
}) => {
  return (
    <div className="flex h-full flex-col">
      <div
        className={`p-3 text-xs font-semibold uppercase tracking-wider ${
          isDark ? "text-gray-400 bg-gray-900" : "text-gray-500 bg-gray-50"
        }`}
      >
        Files
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => onFileSelect(file.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                activeFile === file.id
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                    ? "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <FileCode
                className={`h-4 w-4 ${
                  file.type === "css"
                    ? "text-blue-400"
                    : file.type === "js" || file.type === "ts"
                      ? "text-yellow-400"
                      : file.type === "jsx" || file.type === "tsx"
                        ? "text-blue-500"
                        : "text-gray-400"
                }`}
              />
              <span>{file.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface SolverLayoutProps {
  isDark: boolean;
  leftPanelWidth: number;
  rightPanelWidth: number;
  handleMouseDown: (e: React.MouseEvent, panel: "left" | "right") => void;
  taskDescription: string;
  files: any[];
  activeFile: string | null;
  setActiveFile: (id: string) => void;
  code: string;
  handleCodeChange: (value: string | undefined) => void;
  previewContent: string;
  consoleOutput: string[];
}

export const SolverMainContent: React.FC<SolverLayoutProps> = ({
  isDark,
  leftPanelWidth,
  rightPanelWidth,
  handleMouseDown,
  taskDescription,
  files,
  activeFile,
  setActiveFile,
  code,
  handleCodeChange,
  previewContent,
  consoleOutput,
}) => {
  const activeFileType =
    files.find((f) => f.id === activeFile)?.type || "typescript";
  const language = getLanguageForType(activeFileType);

  return (
    <div
      className={`pt-16 h-screen flex overflow-hidden ${isDark ? "bg-gray-950" : "bg-white"}`}
    >
      {/* Left Panel: Description */}
      <div
        style={{ width: `${leftPanelWidth}%` }}
        className={`flex flex-col h-full border-r ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
      >
        <div
          className={`p-3 border-b text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 ${
            isDark
              ? "border-gray-800 text-gray-400"
              : "border-gray-200 text-gray-500"
          }`}
        >
          <Code className="h-4 w-4" />
          <span>Instructions</span>
        </div>
        <ScrollArea className="flex-1 p-6">
          <div className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
            <Markdown>{taskDescription}</Markdown>
          </div>
        </ScrollArea>
      </div>

      {/* Resize Handle Left */}
      <div
        className={`w-1 cursor-col-resize hover:bg-blue-500 transition-colors ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
        onMouseDown={(e) => handleMouseDown(e, "left")}
      />

      {/* Middle Panel: Editor & Files */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <div className="flex-1 flex min-h-0">
          {/* File Explorer Sidebar */}
          <div
            className={`w-48 border-r flex-shrink-0 ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
          >
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
              isDark={isDark}
            />
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col min-w-0">
            <div
              className={`h-10 border-b flex items-center px-4 ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <span
                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {files.find((f) => f.id === activeFile)?.name ||
                  "No file selected"}
              </span>
            </div>
            <div className="flex-1 relative">
              <Editor
                height="100%"
                value={code}
                onChange={handleCodeChange}
                language={language}
                theme={isDark ? "vs-dark" : "light"}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Console Panel (Bottom) */}
        <div
          className={`h-48 border-t flex flex-col ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}
        >
          <div
            className={`h-8 border-b flex items-center px-4 space-x-2 ${
              isDark
                ? "border-gray-800 bg-gray-800/50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <Terminal className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase">
              Console
            </span>
          </div>
          <ScrollArea className="flex-1 p-2 font-mono text-xs">
            {consoleOutput.length === 0 ? (
              <div className="text-gray-500 italic">No output</div>
            ) : (
              consoleOutput.map((log, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    log.startsWith("[ERROR]")
                      ? "text-red-500"
                      : log.startsWith("[WARN]")
                        ? "text-yellow-500"
                        : isDark
                          ? "text-gray-300"
                          : "text-gray-700"
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Resize Handle Right */}
      <div
        className={`w-1 cursor-col-resize hover:bg-blue-500 transition-colors ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
        onMouseDown={(e) => handleMouseDown(e, "right")}
      />

      {/* Right Panel: Preview */}
      <div
        style={{ width: `${rightPanelWidth}%` }}
        className={`flex flex-col h-full border-l ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}
      >
        <div
          className={`h-10 border-b flex items-center px-4 justify-between ${
            isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Monitor className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Preview
            </span>
          </div>
        </div>
        <div className="flex-1 bg-white relative">
          <iframe
            srcDoc={previewContent}
            title="Preview"
            className="w-full h-full absolute inset-0 border-0"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};
