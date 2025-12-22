"use client";

import React from "react";
import { FrontendTask, FrontendTaskFormData } from "@elzatona/types";
import {
  useThemeManagement,
  useFormDataManagement,
  usePanelLayout,
  useFileManagement,
  useConsoleManagement,
} from "./FrontendTaskEditorHooks";
import {
  FrontendTaskEditorHeader,
  FrontendTaskEditorMainContent,
} from "./FrontendTaskEditorComponents";
import {
  extractFilesFromTree,
  createTaskData,
  copyToClipboard,
  getCategoryIcon,
  getCurrentFileContent,
} from "./FrontendTaskEditorUtils";

interface FrontendTaskEditorProps {
  readonly task?: FrontendTask | null;
  readonly onSave: (taskData: FrontendTaskFormData) => Promise<void>;
  readonly onCancel: () => void;
  readonly mode?: "create" | "edit" | "view";
}

export default function FrontendTaskEditor({
  task,
  onSave,
  onCancel,
  mode = "create",
}: FrontendTaskEditorProps) {
  // Extracted hooks for state management
  const { theme, setTheme, isDark } = useThemeManagement();
  const { formData, setFormData } = useFormDataManagement(task);
  const {
    leftPanelWidth,
    rightPanelWidth,
    handleMouseDown,
  } = usePanelLayout();
  const {
    activeFile,
    fileTree,
    expandedFolders,
    openFiles,
    showFileExplorer,
    setActiveFile,
    setFileTree,
    setExpandedFolders,
    setOpenFiles,
    setShowFileExplorer,
  } = useFileManagement(task);
  const { consoleOutput, setConsoleOutput } = useConsoleManagement();

  // Minimal local state
  const [copied, setCopied] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"description" | "solution">("description");
  const [activeBrowserTab, setActiveBrowserTab] = React.useState<"browser" | "console">("browser");
  const [newHint, setNewHint] = React.useState("");
  const [newTag, setNewTag] = React.useState("");
  const [newFileName, setNewFileName] = React.useState("");
  const [newFolderName, setNewFolderName] = React.useState("");
  const [showAddFile, setShowAddFile] = React.useState(false);
  const [showAddFolder, setShowAddFolder] = React.useState(false);

  // Simple form handlers
  const handleSave = async () => {
    const files = extractFilesFromTree(fileTree);
    const taskData = createTaskData(formData, files);
    await onSave(taskData);
  };

  const handleCopyCode = async () => {
    try {
      await copyToClipboard(getCurrentFileContent(openFiles, activeFile));
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

  return (
    <div
      className={`fixed inset-0 z-50 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <FrontendTaskEditorHeader
        isDark={isDark}
        theme={theme}
        setTheme={setTheme}
        mode={mode}
        formData={formData}
        getCategoryIcon={getCategoryIcon}
        handleSave={handleSave}
        onCancel={onCancel}
      />
      <FrontendTaskEditorMainContent
        isDark={isDark}
        leftPanelWidth={leftPanelWidth}
        rightPanelWidth={rightPanelWidth}
        handleMouseDown={handleMouseDown}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formData={formData}
        setFormData={setFormData}
        mode={mode}
        showFileExplorer={showFileExplorer}
        setShowFileExplorer={setShowFileExplorer}
        showPreview={showPreview}
        activeBrowserTab={activeBrowserTab}
        setActiveBrowserTab={setActiveBrowserTab}
        consoleOutput={consoleOutput}
        setConsoleOutput={setConsoleOutput}
      />
    </div>
  );
}
