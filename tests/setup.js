/**
 * Jest setup file for testing environment
 */

// Mock Firebase for testing
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApps: jest.fn(() => []),
  getApp: jest.fn(() => ({}))
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(() => ({})),
  doc: jest.fn(() => ({})),
  addDoc: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => true, data: () => ({}) })),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
  updateDoc: jest.fn(() => Promise.resolve()),
  deleteDoc: jest.fn(() => Promise.resolve()),
  query: jest.fn(() => ({})),
  where: jest.fn(() => ({})),
  orderBy: jest.fn(() => ({})),
  Timestamp: {
    now: jest.fn(() => ({ toDate: () => new Date() }))
  }
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  signOut: jest.fn(() => Promise.resolve())
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({}))
}));

// Mock Next.js
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data) => ({ json: () => data })),
    redirect: jest.fn((url) => ({ redirect: () => url }))
  }
}));

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-project.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test-project.appspot.com';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456789';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = 'test-app-id';

// Global test utilities
global.testUtils = {
  createMockQuestion: (overrides = {}) => ({
    title: 'Test Question',
    content: 'Test question content',
    type: 'single',
    difficulty: 'medium',
    category: 'JavaScript',
    learningPath: 'frontend',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctAnswers: ['Option 1'],
    explanation: 'Test explanation',
    points: 1,
    timeLimit: 60,
    isActive: true,
    isComplete: true,
    createdBy: 'test-admin',
    lastModifiedBy: 'test-admin',
    ...overrides
  }),
  
  createMockSection: (overrides = {}) => ({
    title: 'Test Section',
    description: 'Test section description',
    category: 'JavaScript',
    learningPathId: 'frontend',
    order: 1,
    weight: 25,
    isActive: true,
    questions: [],
    ...overrides
  }),
  
  createMockLearningPlan: (overrides = {}) => ({
    title: 'Test Learning Plan',
    description: 'Test learning plan description',
    difficulty: 'beginner',
    totalQuestions: 0,
    dailyQuestions: 0,
    sections: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides
  })
};

// Console suppression for cleaner test output
const originalConsole = console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};



