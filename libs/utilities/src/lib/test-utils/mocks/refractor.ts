// Mock for refractor ESM module
// refractor uses ESM which Jest cannot parse, so we provide a mock
import { createMockFn } from "./jest-helper";

const highlightImpl = (code: string, language?: string) => ({
  type: "root",
  children: [
    {
      type: "element",
      tagName: "code",
      properties: { className: [`language-${language || "text"}`] },
      children: [{ type: "text", value: code }],
    },
  ],
});

export const highlight = createMockFn(highlightImpl);
export const register = createMockFn(() => {});
export const registerLanguage = createMockFn(() => {});
export const alias = createMockFn(() => {});
export const listLanguages = createMockFn(() => []);
export const listPlugins = createMockFn(() => []);

const refractorMock = {
  highlight,
  register,
  registerLanguage,
  alias,
  listLanguages,
  listPlugins,
};

export default refractorMock;
