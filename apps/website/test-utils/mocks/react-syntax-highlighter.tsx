import React from "react";

// Very small mock of react-syntax-highlighter exports used across the app/tests
export const PrismLight: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  return <code>{children}</code>;
};

export const Prism: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  return <code>{children}</code>;
};

const reactSyntaxHighlighterMock = { PrismLight, Prism };
export default reactSyntaxHighlighterMock;
