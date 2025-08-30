import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/hooks/useDarkMode";
import ChatGPT from "@/components/ChatGPT";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Frontend KodDev - Ace Frontend Development Interviews",
  description:
    "Master frontend development interviews with comprehensive coding challenges, 500+ interview questions, and system design resources. Ace your frontend interviews with Frontend KodDev.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} ${notoNaskhArabic.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Navigation />
          {children}
          <ChatGPT />
        </ThemeProvider>
      </body>
    </html>
  );
}
