import React, { useState } from "react";

export type TaskDescriptionProps = {
  description: string;
  requirements?: string[];
  hints?: string[];
  className?: string;
};

export const TaskDescription: React.FC<TaskDescriptionProps> = ({
  description,
  requirements = [],
  hints = [],
  className,
}) => {
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});

  return (
    <div className={className}>
      <div className="prose max-w-none mb-4">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>

      {requirements.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Requirements</h3>
          <ul className="list-disc pl-5 mt-2 text-sm">
            {requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {hints.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold">Hints</h3>
          <div className="mt-2 space-y-2">
            {hints.map((h, i) => (
              <div key={i}>
                <button
                  type="button"
                  className="text-sm text-primary underline"
                  onClick={() =>
                    setOpenHints((s) => ({ ...s, [i]: !s[i] }))
                  }
                >
                  {openHints[i] ? "Hide hint" : `Show hint ${i + 1}`}
                </button>
                {openHints[i] && (
                  <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                    <div dangerouslySetInnerHTML={{ __html: h }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
