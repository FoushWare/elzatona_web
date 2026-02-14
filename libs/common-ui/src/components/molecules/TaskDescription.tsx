"use client";

import React, { useState } from "react";
import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Uses DOMPurify with a safe default config.
 */
const sanitize = (html: string): string => {
  if (typeof window === "undefined") return html;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li",
      "code", "pre", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6",
      "blockquote", "table", "thead", "tbody", "tr", "th", "td",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
  });
};

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
        <div dangerouslySetInnerHTML={{ __html: sanitize(description) }} />
      </div>

      {requirements.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Requirements</h3>
          <ul className="list-disc pl-5 mt-2 text-sm">
            {requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {hints.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold">Hints</h3>
          <div className="mt-2 space-y-2">
            {hints.map((h, i) => (
              <div key={`hint-${i}-${h.substring(0, 20)}`}>
                <button
                  type="button"
                  className="text-sm text-primary underline"
                  onClick={() => setOpenHints((s) => ({ ...s, [i]: !s[i] }))}
                >
                  {openHints[i] ? "Hide hint" : `Show hint ${i + 1}`}
                </button>
                {openHints[i] && (
                  <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                    <div dangerouslySetInnerHTML={{ __html: sanitize(h) }} />
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
