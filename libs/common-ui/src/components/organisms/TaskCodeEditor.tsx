import React, { useEffect, useState } from "react";

export type TaskFileContent = {
  id: string;
  path: string;
  content: string;
  language?: string;
};

export type TaskCodeEditorProps = {
  files: TaskFileContent[];
  activeFileId?: string;
  onFileChange?: (fileId: string, content: string) => void;
  className?: string;
};

const findFile = (files: TaskFileContent[], id?: string) => {
  if (!id) return files[0] || null;
  return files.find((f) => f.id === id) || files[0] || null;
};

export const TaskCodeEditor: React.FC<TaskCodeEditorProps> = ({
  files,
  activeFileId,
  onFileChange,
  className,
}) => {
  const initial = findFile(files, activeFileId);
  const [currentFileId, setCurrentFileId] = useState<string | undefined>(
    initial?.id
  );
  const [content, setContent] = useState<string>(initial?.content || "");

  useEffect(() => {
    const f = findFile(files, activeFileId);
    if (f && f.id !== currentFileId) {
      setCurrentFileId(f.id);
      setContent(f.content || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFileId, files]);

  useEffect(() => {
    // Sync when files prop updates for current file
    const f = findFile(files, currentFileId);
    if (f && f.content !== content) {
      setContent(f.content || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleSelect = (id: string) => {
    const f = findFile(files, id);
    setCurrentFileId(f?.id);
    setContent(f?.content || "");
  };

  const handleChange = (v: string) => {
    setContent(v);
    if (currentFileId && onFileChange) onFileChange(currentFileId, v);
  };

  const activeFile = findFile(files, currentFileId);

  return (
    <div className={className}>
      <div className="mb-2 flex gap-2 overflow-auto">
        {files.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => handleSelect(f.id)}
            className={`px-3 py-1 rounded-t ${
              f.id === activeFile?.id ? "bg-white border-t border-l border-r" : "bg-gray-100"
            }`}
          >
            {f.path}
          </button>
        ))}
      </div>

      <div className="border rounded bg-white">
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full h-72 p-3 font-mono text-sm leading-relaxed resize-y outline-none"
        />
      </div>
    </div>
  );
};

export default TaskCodeEditor;
