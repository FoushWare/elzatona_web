"use client";

import React, { useState } from "react";
import {
  TaskMetadata,
  TaskDescription,
  TaskCodeEditor,
  TaskSidebar,
} from "@elzatona/common-ui";
import type { FrontendTask } from "@elzatona/types";

// Lightweight mock similar to API route to keep page self-contained for MVP
const makeMockTask = (id: string): FrontendTask => ({
  id,
  title: `Mock Frontend Task ${id}`,
  difficulty: "easy",
  estimatedTimeMinutes: 20,
  author: { id: "u1", name: "QA Bot" },
  category: "refactor",
  tags: ["javascript", "mvp"],
  files: [
    {
      id: "f1",
      path: "index.js",
      language: "javascript",
      content: "console.log('hello')",
      starterContent: "console.log('hello')",
      solutionContent: "console.log('solution')",
    },
    {
      id: "f2",
      path: "utils.js",
      language: "javascript",
      content: "export const add = (a,b)=>a+b;",
      starterContent: "export const add = (a,b)=>a+b;",
      solutionContent: "export const add = (a,b)=>a+b;",
    },
  ],
  description: `<p>This is a mock task description for task <strong>${id}</strong>.</p>`,
});

type Props = { params: Promise<{ id: string }> };

export default function Page({ params }: Props) {
  const [task, setTask] = React.useState(null as any);
  React.useEffect(() => {
    params.then(({ id }) => {
      setTask(makeMockTask(id));
    });
  }, [params]);

  if (!task) return null;
  return <FrontendTaskPage task={task} />;
}

function FrontendTaskPage({ task }: Readonly<{ task: FrontendTask }>) {
  const [files, setFiles] = useState(
    task.files.map((f) => ({ id: f.id, path: f.path, content: f.content })),
  );
  const [activeFileId, setActiveFileId] = useState(files[0]?.id);
  const [showSolution, setShowSolution] = useState(false);

  const handleFileChange = (fileId: string, content: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, content } : f)),
    );
  };

  const handleReset = () => {
    setFiles(
      task.files.map((f) => ({
        id: f.id,
        path: f.path,
        content: f.starterContent ?? f.content,
      })),
    );
  };

  const handleShowSolution = () => setShowSolution((s) => !s);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <TaskMetadata
          title={task.title}
          difficulty={task.difficulty}
          estimatedTimeMinutes={task.estimatedTimeMinutes}
          authorName={task.author.name}
          company={task.author.company}
          category={task.category}
          tags={task.tags}
        />

        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <TaskDescription
              description={task.description}
              requirements={[]}
              hints={[]}
            />
          </div>

          <div className="col-span-5">
            <TaskCodeEditor
              files={files}
              activeFileId={activeFileId}
              onFileChange={handleFileChange}
            />
          </div>

          <div className="col-span-2">
            <TaskSidebar
              files={files.map((f) => ({ id: f.id, path: f.path }))}
              activeFileId={activeFileId}
              onFileSelect={(id) => setActiveFileId(id)}
              onRun={() => alert("Run action (mock)")}
              onReset={handleReset}
              onShowSolution={handleShowSolution}
            />
          </div>
        </div>

        {showSolution && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold">Solution (read-only)</h3>
            <pre className="mt-2 p-2 bg-white rounded overflow-auto">
              {task.files
                .map((f) => `// ${f.path}\n${f.solutionContent}\n\n`)
                .join("\n")}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
