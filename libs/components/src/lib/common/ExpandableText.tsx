"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string | undefined | null;
  maxLength?: number;
  className?: string;
  showToggle?: boolean;
  expandText?: string;
  collapseText?: string;
}

export default function ExpandableText({
  text,
  maxLength = 200,
  className = "",
  showToggle = true,
  expandText = "Show more",
  collapseText = "Show less",
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle null/undefined text
  if (!text) {
    return <span className={className}>No content available</span>;
  }

  // If text is shorter than maxLength, don't show toggle
  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>;
  }

  const displayText = isExpanded ? text : text.slice(0, maxLength) + "...";
  const shouldShowToggle = showToggle && text.length > maxLength;

  return (
    <div className={className}>
      <span className="whitespace-pre-wrap">{displayText}</span>
      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 focus:outline-none focus:underline"
          aria-label={isExpanded ? collapseText : expandText}
        >
          {isExpanded ? collapseText : expandText}
        </button>
      )}
    </div>
  );
}
