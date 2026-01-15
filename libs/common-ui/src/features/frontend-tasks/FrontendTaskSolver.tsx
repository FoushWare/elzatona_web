"use client";

import React from "react";
import { FrontendTask } from "@elzatona/types";
import { useSolverState, usePanelLayout } from "./FrontendTaskSolverHooks";
import {
  SolverHeader,
  SolverMainContent,
} from "./FrontendTaskSolverComponents";

interface FrontendTaskSolverProps {
  task: FrontendTask | null;
  onBack?: () => void;
  onSubmit?: () => void;
}

export const FrontendTaskSolver: React.FC<FrontendTaskSolverProps> = ({
  task,
  onBack = () => {},
  onSubmit = () => console.log("Submit task"),
}) => {
  const {
    theme,
    setTheme,
    isDark,
    activeFile,
    setActiveFile,
    openFiles,
    code,
    handleCodeChange,
    consoleOutput,
    runCode,
    isRunning,
    previewContent,
  } = useSolverState(task);

  const { leftPanelWidth, rightPanelWidth, handleMouseDown } = usePanelLayout();

  // Listen for console messages from iframe
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "console") {
        const messages = event.data.message.split("\n");
        // We need access to setConsoleOutput here, but it's inside the hook
        // This is a simplified version, ideally the listener should be in the hook
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark bg-gray-950" : "bg-white"}`}>
      <SolverHeader
        title={task.title}
        isDark={isDark}
        theme={theme}
        setTheme={(t) => setTheme(t as any)}
        onRun={runCode}
        onSubmit={onSubmit}
        onBack={onBack}
        isRunning={isRunning}
      />

      <SolverMainContent
        isDark={isDark}
        leftPanelWidth={leftPanelWidth}
        rightPanelWidth={rightPanelWidth}
        handleMouseDown={handleMouseDown}
        taskDescription={task.description}
        files={openFiles}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        code={code}
        handleCodeChange={(val) => handleCodeChange(val || "")}
        previewContent={previewContent}
        consoleOutput={consoleOutput}
      />
    </div>
  );
};
