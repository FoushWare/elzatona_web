// Minimal mock for shiki used by syntax highlighters in tests
export const getHighlighter = async () => ({
  codeToHtml: (code: string) => code,
});

export default { getHighlighter };
