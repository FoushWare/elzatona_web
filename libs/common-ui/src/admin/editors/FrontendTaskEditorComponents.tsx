import React from "react";
import { ArrowLeft, Sun, Moon, Monitor, Save, Code } from "lucide-react";

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
  isDark, theme, setTheme, mode, formData, handleSave, onCancel
}) => (
  <div className={`border-b px-6 py-4 transition-colors duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className={`p-2 transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}>
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {mode === "create" ? "Create Task" : mode === "edit" ? "Edit Task" : "View Task"}
            </h1>
            <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <span>React</span><span>•</span><span>{formData.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        {mode !== "view" && (
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        )}
        <button onClick={onCancel} className={`px-4 py-2 rounded-lg ${isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}>Cancel</button>
      </div>
    </div>
  </div>
);

const ThemeToggle = ({ theme, setTheme }: any) => (
  <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-700">
    {[
      { val: "light", icon: Sun },
      { val: "dark", icon: Moon },
      { val: "system", icon: Monitor }
    ].map(({ val, icon: Icon }) => (
      <button key={val} onClick={() => setTheme(val)} className={`p-2 rounded transition-colors ${theme === val ? "bg-white dark:bg-gray-800 shadow-sm" : "text-gray-500"}`}>
        <Icon className="w-4 h-4" />
      </button>
    ))}
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

export const FrontendTaskEditorMainContent: React.FC<MainContentProps> = (props) => {
  const { isDark, leftPanelWidth, rightPanelWidth, handleMouseDown, activeTab, setActiveTab, formData, setFormData, mode, showFileExplorer, setShowFileExplorer } = props;
  
  return (
    <div className="flex h-[calc(100vh-80px)]">
      <div style={{ width: `${leftPanelWidth}%` }} className={`relative border-r flex flex-col transition-colors ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "description" && mode !== "view" && (
            <div className="space-y-4">
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Task Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} 
                className={`w-full p-2 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`} />
            </div>
          )}
        </div>
        <div className="absolute right-0 inset-y-0 w-1 cursor-col-resize hover:bg-blue-500" onMouseDown={e => handleMouseDown(e, "left")} />
      </div>

      <div className={`flex-1 flex flex-col transition-colors ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className={`border-b p-4 flex justify-between ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <button onClick={() => setShowFileExplorer(!showFileExplorer)} className="text-gray-500 hover:text-blue-500">Folder</button>
        </div>
      </div>

      <div style={{ width: `${rightPanelWidth}%` }} className={`relative border-l flex flex-col transition-colors ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="absolute left-0 inset-y-0 w-1 cursor-col-resize hover:bg-blue-500" onMouseDown={e => handleMouseDown(e, "right")} />
        <div className={`border-b p-4 text-sm font-medium ${isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-200"}`}>Preview</div>
      </div>
    </div>
  );
};

const TabHeader = ({ activeTab, setActiveTab, isDark }: any) => (
  <div className={`flex border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
    {["description", "solution"].map((tab: any) => (
      <button key={tab} onClick={() => setActiveTab(tab)} 
        className={`px-4 py-3 text-sm font-medium capitalize ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}>
        {tab}
      </button>
    ))}
  </div>
);
