import type { Metadata } from "next";
import { AdminRootLayout, adminMetadata } from "@elzatona/common-ui";
import "./globals.css";

export const metadata: Metadata = adminMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
