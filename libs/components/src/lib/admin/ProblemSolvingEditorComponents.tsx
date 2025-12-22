import React from "react";
import { ArrowLeft, Sun, Moon, Monitor, Save } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  isEditing: boolean;
  formData: any;
  handleSave: () => void;
  onCancel: () => void;
}

export const ProblemSolvingEditorHeader: React.FC<HeaderProps> = ({
  isDark,
  theme,
  setTheme,
  isEditing,
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
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? "hover:bg-gray-700 text-gray-300"
              : "hover:bg-gray-100 text-gray-600"
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
            <span className="text-white font-bold text-sm">PS</span>
          </div>
          <div>
            <h1
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {isEditing ? "Edit Problem" : "Create Problem"}
            </h1>
            <div
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>{formData.category}</span>
              <span>•</span>
              <span>{formData.difficulty}</span>
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

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  </div>
);

interface MainContentProps {
  isDark: boolean;
  leftPanelWidth: number;
  rightPanelWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: any;
  setFormData: (data: any) => void;
  starterCode: string;
  setStarterCode: (code: string) => void;
  solutionCode: string;
  setSolutionCode: (code: string) => void;
  showFileExplorer: boolean;
  setShowFileExplorer: (show: boolean) => void;
  children?: React.ReactNode;
}

export const ProblemSolvingEditorMainContent: React.FC<MainContentProps> = ({
  isDark,
  leftPanelWidth,
  rightPanelWidth,
  handleMouseDown,
  activeTab,
  setActiveTab,
  formData,
  setFormData,
  starterCode,
  setStarterCode,
  solutionCode,
  setSolutionCode,
  showFileExplorer,
  setShowFileExplorer,
  children,
}) => (
  <div className="flex h-[calc(100vh-80px)]">
    {/* Left Panel - Problem Details */}
    <div
      style={{ width: `${leftPanelWidth}%` }}
      className={`border-r transition-colors duration-300 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Problem Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter problem title"
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full p-3 rounded-lg border transition-colors duration-300 h-32 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Describe the problem..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="Array">Array</option>
                <option value="String">String</option>
                <option value="Linked List">Linked List</option>
                <option value="Tree">Tree</option>
                <option value="Graph">Graph</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="Backtracking">Backtracking</option>
                <option value="Sorting">Sorting</option>
                <option value="Searching">Searching</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
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
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Function Name
            </label>
            <input
              type="text"
              value={formData.functionName}
              onChange={(e) =>
                setFormData({ ...formData, functionName: e.target.value })
              }
              className={`w-full p-3 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="solution"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Resize Handle */}
    <div
      className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
      onMouseDown={handleMouseDown}
    />

    {/* Middle Panel - Code Editor */}
    <div
      style={{ width: `${100 - leftPanelWidth - rightPanelWidth}%` }}
      className={`transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Code Tabs */}
        <div
          className={`border-b flex ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <button
            onClick={() => setActiveTab("starter")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "starter"
                ? isDark
                  ? "bg-gray-900 text-white border-b-2 border-indigo-500"
                  : "bg-white text-gray-900 border-b-2 border-indigo-500"
                : isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Starter Code
          </button>
          <button
            onClick={() => setActiveTab("solution")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "solution"
                ? isDark
                  ? "bg-gray-900 text-white border-b-2 border-indigo-500"
                  : "bg-white text-gray-900 border-b-2 border-indigo-500"
                : isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Solution
          </button>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>

    {/* Resize Handle */}
    <div
      className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
      onMouseDown={handleMouseDown}
    />

    {/* Right Panel - Test Cases & Preview */}
    <div
      style={{ width: `${rightPanelWidth}%` }}
      className={`transition-colors duration-300 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Test Cases
            </h3>
            {/* Test cases will be rendered here */}
            <div
              className={`p-4 rounded-lg border-2 border-dashed ${
                isDark
                  ? "border-gray-600 text-gray-400"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <p className="text-center">Test cases coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
