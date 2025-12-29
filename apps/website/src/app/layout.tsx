import type { Metadata } from "next";
import "./globals.css";
import { JotaiProvider } from "../../providers/JotaiProvider";
import { QueryProvider } from "../../providers/QueryProvider";
import {
  WebsiteRootLayout,
  websiteMetadata,
  websiteViewport,
} from "@elzatona/common-ui";
import { LearningTypeProvider } from "../context/LearningTypeContext";
import { NavigationProvider } from "../context/NavigationContext";
import { ConditionalNavbar } from "./components/ConditionalNavbar";

// Force dynamic rendering to prevent static generation issues with auth context
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = websiteMetadata;
export const viewport = websiteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WebsiteRootLayout
      ConditionalNavbar={ConditionalNavbar}
      LearningTypeProvider={LearningTypeProvider}
      NavigationProvider={NavigationProvider}
      JotaiProvider={JotaiProvider}
      QueryProvider={QueryProvider}
    >
      {children}
    </WebsiteRootLayout>
  );
}
