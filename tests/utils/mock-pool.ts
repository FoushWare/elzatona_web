// Mock database pool for repository tests
export function createMockPool() {
  // TODO: Return a mock pool object with query, connect, end, etc.
  return {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
}
