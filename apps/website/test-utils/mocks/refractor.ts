// Mock for refractor ESM module
// refractor uses ESM which Jest cannot parse, so we provide a mock

export const highlight = jest.fn((code: string, language?: string) => {
  return {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "code",
        properties: { className: [`language-${language || "text"}`] },
        children: [{ type: "text", value: code }],
      },
    ],
  };
});

export const register = jest.fn();
export const registerLanguage = jest.fn();
export const alias = jest.fn();
export const listLanguages = jest.fn(() => []);
export const listPlugins = jest.fn(() => []);

export default {
  highlight,
  register,
  registerLanguage,
  alias,
  listLanguages,
  listPlugins,
};
