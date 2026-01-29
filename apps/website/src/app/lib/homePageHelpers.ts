// Minimal helper stub for homepage integration tests (app-local copy)
// Exported as a const - tests should use jest.mock() to override
export const getPersonalizedContent: any = async () => ({ data: [], meta: {} });

// In test environment provide lightweight mock helpers so test code
// that calls (getPersonalizedContent as jest.Mock).mockReturnValue(...) works
if (process.env.NODE_ENV === "test") {
  const _mock: any = (..._args: any[]) => {
    if (typeof _mock._impl === "function") return _mock._impl(..._args);
    return Promise.resolve(_mock._returnValue ?? { data: [], meta: {} });
  };
  _mock.mockReturnValue = (v: any) => {
    _mock._returnValue = v;
    return _mock;
  };
  _mock.mockResolvedValue = (v: any) => {
    _mock._returnValue = v;
    return _mock;
  };
  _mock.mockImplementation = (impl: any) => {
    _mock._impl = impl;
    return _mock;
  };
  getPersonalizedContent = _mock;
}

const homePageHelpers = { getPersonalizedContent };
export default homePageHelpers;
