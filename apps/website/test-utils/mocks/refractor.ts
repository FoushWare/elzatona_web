// Minimal mock for refractor used by syntax highlighters in tests
export const highlight = (code: string) => code;
export const register = () => {};
const refractorMock = { highlight, register };
export default refractorMock;
