import React from "react";
import { DifficultyBadge } from "../atoms/DifficultyBadge";

export type TaskMetadataProps = {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTimeMinutes?: number;
  authorName: string;
  company?: string;
  category?: string;
  tags?: string[];
  className?: string;
};

export const TaskMetadata: React.FC<TaskMetadataProps> = ({
  title,
  difficulty,
  estimatedTimeMinutes,
  authorName,
  company,
  category,
  tags = [],
  className,
}) => {
  const time = estimatedTimeMinutes
    ? `${Math.ceil(estimatedTimeMinutes)} min`
    : "—";

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <DifficultyBadge difficulty={difficulty} />
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        <span>Estimated: {time}</span>
        <span className="mx-2">•</span>
        <span>Author: {authorName}{company ? ` (${company})` : ""}</span>
        {category && (
          <>
            <span className="mx-2">•</span>
            <span>Category: {category}</span>
          </>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-100">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskMetadata;
