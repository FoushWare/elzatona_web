import React from "react";

// Very small mock of react-syntax-highlighter exports used across the app/tests
export const PrismLight: React.FC<any> = ({ children }) => {
  return <code>{children}</code>;
};

export const Prism: React.FC<any> = ({ children }) => {
  return <code>{children}</code>;
};

export default {
  PrismLight,
  Prism,
};
