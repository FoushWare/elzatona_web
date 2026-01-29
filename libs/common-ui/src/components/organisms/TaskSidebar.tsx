import React, { useRef, useEffect } from "react";

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
  const listRef = useRef<HTMLUListElement | null>(null);

  // Simple keyboard navigation: ArrowUp/ArrowDown to move, Enter to select
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleKey = (e: KeyboardEvent) => {
      const focusable = Array.from(el.querySelectorAll<HTMLButtonElement>('button[data-file]'));
      if (focusable.length === 0) return;
      const idx = focusable.findIndex((b) => b === document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = focusable[(idx + 1) % focusable.length];
        next?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = focusable[(idx - 1 + focusable.length) % focusable.length];
        prev?.focus();
      }
      if (e.key === 'Enter' && document.activeElement instanceof HTMLButtonElement) {
        (document.activeElement as HTMLButtonElement).click();
      }
    };

    el.addEventListener('keydown', handleKey);
    return () => el.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <aside className={className} aria-label="Task sidebar">
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
          <ul ref={listRef} tabIndex={0} className="mt-2 space-y-1 text-sm" role="list">
            {files.map((f, idx) => (
              <li key={f.id} role="listitem">
                <button
                  data-file={f.id}
                  aria-selected={f.id === activeFileId}
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
