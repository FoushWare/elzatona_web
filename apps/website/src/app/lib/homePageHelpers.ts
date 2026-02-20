// Minimal helper stub for homepage integration tests (app-local copy)
// Exported as a const function - tests should use jest.mock() to override
export const getPersonalizedContent = () => {
  return Promise.resolve({ data: [], meta: {} });
};

// In test environment provide lightweight mock helpers so test code
// that calls (getPersonalizedContent as jest.Mock).mockReturnValue(...) works
if (process.env.NODE_ENV === "test") {
  // For testing, we'll use jest.mock() to override this function
  // No need to reassign here
}

const homePageHelpers = { getPersonalizedContent };
export default homePageHelpers;
