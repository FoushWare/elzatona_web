// Mock for shiki ESM module
// shiki uses ESM which Jest cannot parse, so we provide a mock

export const codeToHtml = jest.fn((code: string, options?: any) => {
  return `<pre><code>${code}</code></pre>`;
});

export const codeToTokens = jest.fn((code: string, options?: any) => {
  return [];
});

export const codeToTokensBase = jest.fn((code: string, options?: any) => {
  return [];
});

export const codeToTokensWithThemes = jest.fn((code: string, options?: any) => {
  return [];
});

export const codeToHast = jest.fn((code: string, options?: any) => {
  return { type: 'element', tagName: 'pre', children: [] };
});

export const createHighlighter = jest.fn(async (options?: any) => {
  return {
    codeToHtml,
    codeToTokens,
    codeToTokensBase,
    codeToTokensWithThemes,
    codeToHast,
  };
});

export const getSingletonHighlighter = jest.fn(async (options?: any) => {
  return {
    codeToHtml,
    codeToTokens,
    codeToTokensBase,
    codeToTokensWithThemes,
    codeToHast,
  };
});

export const getLastGrammarState = jest.fn(() => null);

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

