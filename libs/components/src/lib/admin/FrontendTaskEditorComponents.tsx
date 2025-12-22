import React from "react";
import { ArrowLeft, Sun, Moon, Monitor, Save } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  mode: "create" | "edit" | "view";
  formData: any;
  handleSave: () => void;
  onCancel: () => void;
}

export const FrontendTaskEditorHeader: React.FC<HeaderProps> = ({
  isDark,
  theme,
  setTheme,
  mode,
  formData,
  handleSave,
  onCancel,
}) => (
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
            <Code className="w-4 h-4" />
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
              <span className="flex items-center gap-1">React</span>
              <span className="flex items-center gap-1">
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
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
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
);

interface MainContentProps {
  isDark: boolean;
  leftPanelWidth: number;
  rightPanelWidth: number;
  handleMouseDown: (e: React.MouseEvent, panel: "left" | "right") => void;
  activeTab: "description" | "solution";
  setActiveTab: (tab: "description" | "solution") => void;
  formData: any;
  setFormData: (data: any) => void;
  mode: "create" | "edit" | "view";
  showFileExplorer: boolean;
  setShowFileExplorer: (show: boolean) => void;
  showPreview: boolean;
  activeBrowserTab: "browser" | "console";
  setActiveBrowserTab: (tab: "browser" | "console") => void;
  consoleOutput: string[];
  setConsoleOutput: (output: string[]) => void;
}

export const FrontendTaskEditorMainContent: React.FC<MainContentProps> = ({
  isDark,
  leftPanelWidth,
  rightPanelWidth,
  handleMouseDown,
  activeTab,
  setActiveTab,
  formData,
  setFormData,
  mode,
  showFileExplorer,
  setShowFileExplorer,
  showPreview,
  activeBrowserTab,
  setActiveBrowserTab,
  consoleOutput,
  setConsoleOutput,
}) => (
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
                      setFormData((prev: any) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Enter task title"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Middle Panel - Editor */}
    <div
      className={`flex-1 flex flex-col overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Editor Header */}
      <div
        className={`border-b px-4 py-3 flex items-center justify-between transition-colors duration-300 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className={`p-2 rounded transition-colors ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Folder
          </button>
        </div>
      </div>
    </div>

    {/* Right Panel - Preview */}
    <div
      className={`border-l flex flex-col overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
      style={{
        width: `${rightPanelWidth}%`,
        minWidth: "300px",
        maxWidth: "60%",
      }}
    >
      {/* Resize Handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500 cursor-col-resize z-30 transition-colors select-none"
        onMouseDown={(e) => handleMouseDown(e, "right")}
      ></div>

      {/* Preview Header */}
      <div
        className={`border-b px-4 py-3 flex items-center justify-between transition-colors duration-300 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2">
          Eye
          <span
            className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Preview
          </span>
        </div>
      </div>
    </div>
  </div>
);
