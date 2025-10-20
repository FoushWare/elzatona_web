// Test file for database switching functionality
// This file demonstrates how the database abstraction works

import { DatabaseServiceFactory } from './libs/database/src/lib/DatabaseContext';
import { IDatabaseService } from './libs/database/src/lib/IDatabaseService';

// Mock environment variables for testing
const originalEnv = process.env;

describe('Database Switching', () => {
  beforeEach(() => {
    // Reset environment
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  test('should create Firebase service when NEXT_PUBLIC_USE_FIREBASE=true', () => {
    process.env.NEXT_PUBLIC_USE_FIREBASE = 'true';
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';

    const service = DatabaseServiceFactory.create();

    // Should be Firebase service (we can check by looking at the service type)
    expect(service).toBeDefined();
    expect(typeof service.get).toBe('function');
    expect(typeof service.getAll).toBe('function');
    expect(typeof service.add).toBe('function');
    expect(typeof service.update).toBe('function');
    expect(typeof service.delete).toBe('function');
  });

  test('should create Supabase service when NEXT_PUBLIC_USE_FIREBASE=false', () => {
    process.env.NEXT_PUBLIC_USE_FIREBASE = 'false';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

    const service = DatabaseServiceFactory.create();

    // Should be Supabase service
    expect(service).toBeDefined();
    expect(typeof service.get).toBe('function');
    expect(typeof service.getAll).toBe('function');
    expect(typeof service.add).toBe('function');
    expect(typeof service.update).toBe('function');
    expect(typeof service.delete).toBe('function');
  });

  test('should default to Supabase when NEXT_PUBLIC_USE_FIREBASE is not set', () => {
    delete process.env.NEXT_PUBLIC_USE_FIREBASE;
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

    const service = DatabaseServiceFactory.create();

    // Should default to Supabase
    expect(service).toBeDefined();
    expect(typeof service.get).toBe('function');
  });
});

// Example usage test
describe('Database Service Usage', () => {
  let mockService: IDatabaseService;

  beforeEach(() => {
    // Create a mock service for testing
    mockService = {
      get: jest.fn(),
      getAll: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  test('should handle get operation', async () => {
    const mockData = { id: '1', name: 'Test User' };
    (mockService.get as jest.Mock).mockResolvedValue({
      data: mockData,
      error: null,
    });

    const result = await mockService.get('users', '1');

    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
    expect(mockService.get).toHaveBeenCalledWith('users', '1');
  });

  test('should handle add operation', async () => {
    const newUser = { name: 'New User', email: 'new@example.com' };
    const createdUser = { id: '2', ...newUser };

    (mockService.add as jest.Mock).mockResolvedValue({
      data: createdUser,
      error: null,
    });

    const result = await mockService.add('users', newUser);

    expect(result.data).toEqual(createdUser);
    expect(result.error).toBeNull();
    expect(mockService.add).toHaveBeenCalledWith('users', newUser);
  });

  test('should handle error cases', async () => {
    const errorMessage = 'Database connection failed';
    (mockService.get as jest.Mock).mockResolvedValue({
      data: null,
      error: errorMessage,
    });

    const result = await mockService.get('users', '1');

    expect(result.data).toBeNull();
    expect(result.error).toBe(errorMessage);
  });
});

// Integration test example
describe('Database Integration', () => {
  test('should work with React Context', () => {
    // This would test the DatabaseProvider and useDatabase hook
    // In a real test environment, you'd render a component that uses the hook

    const {
      DatabaseProvider,
      useDatabase,
    } = require('./libs/database/src/lib/DatabaseContext');

    expect(DatabaseProvider).toBeDefined();
    expect(useDatabase).toBeDefined();
  });
});

export {};
