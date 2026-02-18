"use client";

import React from "react";
import { Play, CheckCircle } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { ProblemSolvingTask } from "@elzatona/types";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../components/ui/resizable";
import { useProblemSolver } from "./ProblemSolverHooks";
import { ConsoleOutput, TestResultsPanel } from "./ProblemSolverComponents";
import ReactMarkdown from "react-markdown";

interface ProblemSolverProps {
  task: ProblemSolvingTask;
  onCompleted?: () => void;
  className?: string;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  task,
  onCompleted,
  className,
}) => {
  const {
    code,
    setCode,
    output,
    isRunning,
    testResults,
    activeTab,
    setActiveTab,
    handleRunCode,
    handleSubmit,
  } = useProblemSolver(task);

  return (
    <div className={`h-[calc(100vh-100px)] w-full flex flex-col ${className}`}>
      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel: Description */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="h-full overflow-auto p-4 border-r dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{task.description}</ReactMarkdown>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-lg">Examples</h3>
              {task.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm"
                >
                  <div>
                    <span className="font-bold">Input:</span> {example.input}
                  </div>
                  <div>
                    <span className="font-bold">Output:</span> {example.output}
                  </div>
                  {example.explanation && (
                    <div className="text-gray-500 dark:text-gray-400 mt-1">
                      {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Constraints</h3>
              <ul className="list-disc pl-5 space-y-1">
                {task.constraints.map((c, i) => (
                  <li key={i} className="text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel: Editor & Terminal */}
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            {/* Top: Code Editor */}
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-800 p-2 flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-500 ml-2">
                    JavaScript
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Run Code
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isRunning}
                      size="sm"
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Submit
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <MonacoEditor
                    height="100%"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Bottom: Terminal/Results */}
            <ResizablePanel defaultSize={40} minSize={20}>
              <div className="h-full flex flex-col bg-white dark:bg-gray-950">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="h-full flex flex-col"
                >
                  <div className="border-b dark:border-gray-800 px-4">
                    <TabsList className="h-10">
                      <TabsTrigger value="console">Console</TabsTrigger>
                      <TabsTrigger value="tests">Test Results</TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="flex-1 overflow-hidden p-4">
                    <TabsContent value="console" className="h-full m-0">
                      <ConsoleOutput output={output} />
                    </TabsContent>

                    <TabsContent value="tests" className="h-full m-0">
                      <TestResultsPanel results={testResults} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
