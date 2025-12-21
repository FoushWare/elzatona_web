import React from "react";

interface ContentLayoutProps {
  readonly children: React.ReactNode;
}

export default function ContentLayout({
  children,
}: ContentLayoutProps) {
  return <>{children}</>;
}
