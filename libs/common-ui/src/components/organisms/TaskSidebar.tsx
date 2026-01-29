import React from "react";

export type TaskFile = { id: string; path: string };

export type TaskSidebarProps = {
  files: TaskFile[];
  activeFileId?: string;
  onFileSelect?: (fileId: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  onShowSolution?: () => void;
  className?: string;
};

export const TaskSidebar: React.FC<TaskSidebarProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onRun,
  onReset,
  onShowSolution,
  className,
}) => {
  return (
    <aside className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRun}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Run
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onShowSolution}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Solution
          </button>
        </div>

        <div className="mt-2">
          <h4 className="text-sm font-medium">Files</h4>
          <ul className="mt-2 space-y-1 text-sm">
            {files.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => onFileSelect?.(f.id)}
                  className={`w-full text-left px-2 py-1 rounded ${
                    f.id === activeFileId ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {f.path}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default TaskSidebar;
