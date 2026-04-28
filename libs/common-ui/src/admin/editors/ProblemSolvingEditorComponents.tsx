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
    className={`border-b px-6 py-4 transition-colors duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}
          >
            <span className="text-white font-bold text-sm">PS</span>
          </div>
          <div>
            <h1
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {isEditing ? "Edit Problem" : "Create Problem"}
            </h1>
            <div
              className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <span>{formData.category}</span>
              <span>•</span>
              <span>{formData.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  </div>
);

const ThemeToggle = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (t: any) => void;
}) => (
  <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-700">
    {[
      { val: "light", icon: Sun },
      { val: "dark", icon: Moon },
      { val: "system", icon: Monitor },
    ].map(({ val, icon: Icon }) => (
      <button
        key={val}
        onClick={() => setTheme(val)}
        className={`p-2 rounded transition-colors ${theme === val ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
      >
        <Icon className="w-4 h-4" />
      </button>
    ))}
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
  children,
}) => (
  <div className="flex h-[calc(100vh-80px)]">
    <div
      style={{ width: `${leftPanelWidth}%` }}
      className={`border-r overflow-y-auto p-6 transition-colors ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className="space-y-6">
        <InputGroup
          label="Problem Title"
          value={formData.title}
          onChange={(v: string) => setFormData({ ...formData, title: v })}
          isDark={isDark}
        />
        <TextAreaGroup
          label="Description"
          value={formData.description}
          onChange={(v: string) => setFormData({ ...formData, description: v })}
          isDark={isDark}
        />
        <div className="grid grid-cols-2 gap-4">
          <SelectGroup
            label="Category"
            value={formData.category}
            options={[
              "Array",
              "String",
              "Linked List",
              "Tree",
              "Graph",
              "DP",
              "Sort",
              "Search",
            ]}
            onChange={(v: string) => setFormData({ ...formData, category: v })}
            isDark={isDark}
          />
          <SelectGroup
            label="Difficulty"
            value={formData.difficulty}
            options={["easy", "medium", "hard"]}
            onChange={(v: string) =>
              setFormData({ ...formData, difficulty: v })
            }
            isDark={isDark}
          />
        </div>
        <InputGroup
          label="Function Name"
          value={formData.functionName}
          onChange={(v: string) =>
            setFormData({ ...formData, functionName: v })
          }
          isDark={isDark}
        />
      </div>
    </div>
    <div
      className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize"
      onMouseDown={handleMouseDown}
    />
    <div
      style={{ width: `${100 - leftPanelWidth - rightPanelWidth}%` }}
      className={`flex flex-col ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div
        className={`border-b flex ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        {["starter", "solution"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${activeTab === tab ? "border-b-2 border-indigo-500 text-indigo-500" : "text-gray-500"}`}
          >
            {tab} Code
          </button>
        ))}
      </div>
      <div className="flex-1">{children}</div>
    </div>
    <div
      className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize"
      onMouseDown={handleMouseDown}
    />
    <div
      style={{ width: `${rightPanelWidth}%` }}
      className={`p-6 overflow-y-auto ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Test Cases
      </h3>
      <div
        className={`p-4 rounded-lg border-2 border-dashed text-center ${isDark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600"}`}
      >
        Test cases coming soon...
      </div>
    </div>
  </div>
);

const InputGroup = ({ label, value, onChange, isDark }: any) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
    >
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange, isDark }: any) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
    >
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 rounded-lg border h-32 ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
    />
  </div>
);

const SelectGroup = ({ label, value, options, onChange, isDark }: any) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
    >
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt.toLowerCase()}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
