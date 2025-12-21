"use client";

import React, { useRef, useState, useEffect } from "react";
import { toPng, toJpeg } from "html-to-image";
import { Button } from "@elzatona/components";
import { Image as ImageIcon } from "lucide-react";
import { createHighlighter, type Highlighter } from "shiki";
import Image from "next/image";

interface CodeToImageTestProps {
  code: string;
  language?: string;
  theme?: "light" | "dark";
}

export function CodeToImageTest({
  code,
  language = "javascript",
  theme: initialTheme = "dark",
}: CodeToImageTestProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");
  const [isLoadingHighlighter, setIsLoadingHighlighter] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  // Initialize Shiki highlighter
  useEffect(() => {
    let mounted = true;

    const initHighlighter = async () => {
      try {
        const shiki = await createHighlighter({
          themes: ["github-dark", "github-light"],
          langs: [
            "javascript",
            "typescript",
            "python",
            "java",
            "jsx",
            "tsx",
            "json",
            "html",
            "css",
          ],
        });

        if (mounted) {
          setHighlighter(shiki);
          setIsLoadingHighlighter(false);
        }
      } catch (error) {
        console.error("Error initializing Shiki:", error);
        setIsLoadingHighlighter(false);
      }
    };

    initHighlighter();

    return () => {
      mounted = false;
    };
  }, []);

  // Highlight code when highlighter is ready or code/language/theme changes
  useEffect(() => {
    if (!highlighter || !code) {
      return;
    }

    try {
      const lang =
        language === "typescript"
          ? "ts"
          : language === "javascript"
            ? "js"
            : language || "js";

      const themeName = theme === "light" ? "github-light" : "github-dark";
      const html = highlighter.codeToHtml(code, {
        lang,
        theme: themeName,
      });

      setHighlightedHtml(html);
    } catch (error) {
      console.error("Error highlighting code:", error);
      // Fallback to plain code
      setHighlightedHtml(`<pre><code>${code}</code></pre>`);
    }
  }, [highlighter, code, language, theme]);

  // Old syntax highlighting function (fallback)
  const _highlightSyntaxFallback = (line: string) => {
    if (!line.trim()) return <span>{line}</span>;

    // JavaScript/TypeScript keywords (light blue/cyan)
    const keywords =
      /\b(function|const|let|var|if|else|return|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|class|extends|import|export|default|async|await|static|public|private|protected|interface|type|enum)\b/g;

    // Built-in functions/objects (light yellow/orange)
    const builtins =
      /\b(console|Math|Object|Array|String|Number|Boolean|Date|Promise|fetch|parseInt|parseFloat|isNaN|isFinite|JSON|localStorage|sessionStorage|document|window|prompt|alert|confirm)\b/g;

    // String literals (light green)
    const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;

    const parts: Array<{
      text: string;
      type: "keyword" | "builtin" | "string" | "normal";
    }> = [];
    let lastIndex = 0;
    const text = line;

    // Find all matches
    const matches: Array<{
      start: number;
      end: number;
      type: "keyword" | "builtin" | "string";
    }> = [];

    // Keywords
    let match;
    while ((match = keywords.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "keyword",
      });
    }

    // Builtins
    builtins.lastIndex = 0;
    while ((match = builtins.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "builtin",
      });
    }

    // Strings
    strings.lastIndex = 0;
    while ((match = strings.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "string",
      });
    }

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);

    // Remove overlapping matches (strings take priority)
    const filteredMatches: typeof matches = [];
    for (const m of matches) {
      if (
        m.type === "string" ||
        !filteredMatches.some((fm) => m.start < fm.end && m.end > fm.start)
      ) {
        filteredMatches.push(m);
      }
    }

    // Build parts
    for (const m of filteredMatches) {
      if (m.start > lastIndex) {
        parts.push({
          text: text.substring(lastIndex, m.start),
          type: "normal",
        });
      }
      parts.push({ text: text.substring(m.start, m.end), type: m.type });
      lastIndex = m.end;
    }

    if (lastIndex < text.length) {
      parts.push({ text: text.substring(lastIndex), type: "normal" });
    }

    if (parts.length === 0) {
      parts.push({ text: line, type: "normal" });
    }

    return (
      <>
        {parts.map((part, idx) => {
          const className =
            part.type === "keyword"
              ? "text-cyan-400 dark:text-cyan-300"
              : part.type === "builtin"
                ? "text-yellow-500 dark:text-yellow-400"
                : part.type === "string"
                  ? "text-green-500 dark:text-green-400"
                  : "text-gray-900 dark:text-gray-100";
          return (
            <span key={idx} className={className}>
              {part.text}
            </span>
          );
        })}
      </>
    );
  };

  const generateImage = async (format: "png" | "jpeg" = "png") => {
    if (!codeRef.current) {
      alert("Code element not found");
      return;
    }

    setIsGenerating(true);
    try {
      const backgroundColor = theme === "dark" ? "#111827" : "#ffffff";

      const dataUrl =
        format === "png"
          ? await toPng(codeRef.current, {
              backgroundColor,
              width: codeRef.current.scrollWidth,
              height: codeRef.current.scrollHeight,
              quality: 1.0,
              pixelRatio: 2,
            })
          : await toJpeg(codeRef.current, {
              backgroundColor,
              width: codeRef.current.scrollWidth,
              height: codeRef.current.scrollHeight,
              quality: 1.0,
              pixelRatio: 2,
            });

      setImageUrl(dataUrl);

      // Download the image
      const link = document.createElement("a");
      link.download = `code-snippet.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Code Display - This will be converted to image */}
      <div
        ref={codeRef}
        className={`relative rounded-xl overflow-hidden shadow-2xl border-2 ${
          theme === "dark"
            ? "border-gray-700 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
            : "border-gray-300 bg-white"
        }`}
      >
        {/* Code editor header bar */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 border-gray-700"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Window controls */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {/* File name */}
            <div
              className={`flex items-center gap-2 ml-2 px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-blue-400" : "bg-blue-500"}`}
              ></div>
              <span
                className={`text-xs sm:text-sm font-semibold font-mono ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                code.
                {language === "python"
                  ? "py"
                  : language === "java"
                    ? "java"
                    : language === "typescript"
                      ? "ts"
                      : "js"}
              </span>
            </div>
          </div>
          {/* Language badge */}
          <div
            className={`px-3 py-1 rounded-md border ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600"
                : "bg-gray-200 border-gray-300"
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {language}
            </span>
          </div>
        </div>

        {/* Code content with Shiki highlighting */}
        <div
          className={`overflow-x-auto ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
        >
          {isLoadingHighlighter ? (
            <div className="p-4 text-center text-gray-500">
              Loading syntax highlighter...
            </div>
          ) : highlightedHtml ? (
            <div className="relative">
              {/* Line numbers background */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-16 border-r ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-gray-100 border-gray-200"
                }`}
              ></div>

              {/* Shiki highlighted code with line numbers */}
              <div className="relative">
                {/* Shiki highlighted code - Shiki handles syntax highlighting */}
                <div
                  className="shiki-wrapper pl-16"
                  dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />

                {/* Custom styles for Shiki output to match our design */}
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    .shiki-wrapper pre {
                      margin: 0 !important;
                      padding: 1rem 0 1rem 0 !important;
                      background: transparent !important;
                      overflow: visible !important;
                      font-size: 1rem !important;
                      line-height: 1.75 !important;
                      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace !important;
                      font-weight: 600 !important;
                    }
                    .shiki-wrapper pre code {
                      display: block !important;
                      background: transparent !important;
                    }
                    .shiki-wrapper pre code .line {
                      display: block !important;
                      padding: 0.125rem 0 !important;
                      min-height: 1.75rem;
                    }
                  `,
                  }}
                />

                {/* Line numbers - positioned to align with code lines */}
                <div
                  className="absolute left-0 top-0 flex flex-col"
                  style={{ paddingTop: "1rem" }}
                >
                  {code.split("\n").map((_, index) => (
                    <span
                      key={index}
                      className={`select-none pr-4 pl-4 text-right min-w-[4rem] text-sm sm:text-base font-semibold ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                      style={{
                        lineHeight: "1.75",
                        minHeight: "1.75rem",
                        display: "block",
                      }}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <pre className="m-0 p-4 text-base sm:text-lg lg:text-xl font-mono font-semibold leading-relaxed">
              <code className="block text-gray-900 dark:text-gray-100">
                {code.split("\n").map((line, index) => (
                  <div key={index} className="flex items-start">
                    <span
                      className={`select-none pr-4 text-right min-w-[4rem] text-sm sm:text-base font-semibold ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`flex-1 whitespace-pre pl-2 pr-4 py-0.5 ${
                        theme === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {line || " "}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          )}
        </div>

        {/* Bottom border accent */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => generateImage("png")}
            disabled={isGenerating || isLoadingHighlighter}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate PNG"}
          </Button>
          <Button
            onClick={() => generateImage("jpeg")}
            disabled={isGenerating || isLoadingHighlighter}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate JPEG"}
          </Button>
        </div>
        {/* Theme toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Theme:
          </span>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="sm"
            disabled={isLoadingHighlighter}
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </Button>
        </div>
      </div>

      {/* Preview generated image */}
      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">
            Generated Image Preview:
          </h3>
          <Image
            src={imageUrl}
            alt="Generated code image"
            width={800}
            height={600}
            style={{ maxWidth: "100%", height: "auto" }}
            className="border rounded-lg shadow-lg max-w-full"
          />
        </div>
      )}
    </div>
  );
}
