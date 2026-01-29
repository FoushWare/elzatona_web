import React from "react";

const ReactMarkdown: React.FC<any> = ({ children }) => {
  // Render children directly; tests don't need markdown parsing behavior
  return <div>{children}</div>;
};

export default ReactMarkdown;
