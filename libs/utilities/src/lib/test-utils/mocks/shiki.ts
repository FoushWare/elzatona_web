// Mock for shiki ESM module
// shiki uses ESM which Jest cannot parse, so we provide a mock
import { createMockFn } from "./jest-helper";

const codeToHtmlImpl = (code: string, _options?: any) =>
  `<pre><code>${code}</code></pre>`;
const codeToTokensImpl = (_code: string, _options?: any) => [];
const codeToHastImpl = (_code: string, _options?: any) => ({
  type: "element",
  tagName: "pre",
  children: [],
});

export const codeToHtml = createMockFn(codeToHtmlImpl);
export const codeToTokens = createMockFn(codeToTokensImpl);
export const codeToTokensBase = createMockFn(codeToTokensImpl);
export const codeToTokensWithThemes = createMockFn(codeToTokensImpl);
export const codeToHast = createMockFn(codeToHastImpl);

const highlighterImpl = async (_options?: any) => ({
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  codeToHast,
});

export const createHighlighter = createMockFn(highlighterImpl);
export const getSingletonHighlighter = createMockFn(highlighterImpl);
export const getLastGrammarState = createMockFn(() => null);

export default {
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  codeToHast,
  createHighlighter,
  getSingletonHighlighter,
  getLastGrammarState,
};
