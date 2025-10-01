/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { GET as getLearningPaths } from '@/app/api/learning-paths/route';
import { GET as getSectors } from '@/app/api/sectors/by-path/[id]/route';

// Mock Firebase Server
jest.mock('@/lib/firebase-server', () => ({
  db: {
    // Mock Firestore instance
  },
}));

// Mock Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
}));

import { db } from '@/lib/firebase-server';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const mockCollection = collection as jest.MockedFunction<typeof collection>;
const mockGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockQuery = query as jest.MockedFunction<typeof query>;
const mockWhere = where as jest.MockedFunction<typeof where>;
const mockOrderBy = orderBy as jest.MockedFunction<typeof orderBy>;

describe('API Routes Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/learning-paths', () => {
    test('should return learning paths successfully', async () => {
      const mockLearningPaths = [
        {
          id: 'path1',
          name: 'JavaScript Fundamentals',
          description: 'Learn the basics of JavaScript',
          questionCount: 50,
          difficulty: 'beginner',
        },
        {
          id: 'path2',
          name: 'React Advanced',
          description: 'Advanced React concepts',
          questionCount: 75,
          difficulty: 'advanced',
        },
      ];

      const mockSnapshot = {
        docs: mockLearningPaths.map(path => ({
          id: path.id,
          data: () => path,
        })),
      };

      mockCollection.mockReturnValue({} as any);
      mockGetDocs.mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths'
      );
      const response = await getLearningPaths(request);
      const data = await response.json();

      expect(response).toBeDefined();
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockLearningPaths);
    });

    test('should handle Firebase errors', async () => {
      mockCollection.mockReturnValue({} as any);
      mockGetDocs.mockRejectedValue(new Error('Firebase connection failed'));

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths'
      );
      const response = await getLearningPaths(request);
      const data = await response.json();

      expect(response).toBeDefined();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to fetch learning paths');
    });
  });

  describe('GET /api/sectors/by-path/[id]', () => {
    test('should return sectors for a valid path ID', async () => {
      const pathId = 'javascript-fundamentals';
      const mockSectors = [
        {
          id: 'sector1',
          name: 'Variables and Data Types',
          description: 'Learn about JavaScript variables',
          questionCount: 10,
          difficulty: 'easy',
          order: 1,
          pathId: pathId,
        },
        {
          id: 'sector2',
          name: 'Functions',
          description: 'Understanding JavaScript functions',
          questionCount: 15,
          difficulty: 'medium',
          order: 2,
          pathId: pathId,
        },
      ];

      const mockSnapshot = {
        docs: mockSectors.map(sector => ({
          id: sector.id,
          data: () => sector,
        })),
      };

      mockCollection.mockReturnValue({} as any);
      mockWhere.mockReturnValue({} as any);
      mockOrderBy.mockReturnValue({} as any);
      mockQuery.mockReturnValue({} as any);
      mockGetDocs.mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest(
        `http://localhost:3000/api/sectors/by-path/${pathId}`
      );
      const response = await getSectors(request, { params: { id: pathId } });
      const data = await response.json();

      expect(response).toBeDefined();
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockSectors);
    });

    test('should return 400 for missing path ID', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/sectors/by-path/'
      );
      const response = await getSectors(request, { params: { id: '' } });
      const data = await response.json();

      expect(response).toBeDefined();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Path ID is required');
    });

    test('should handle Firebase errors', async () => {
      const pathId = 'javascript-fundamentals';

      mockCollection.mockReturnValue({} as any);
      mockWhere.mockReturnValue({} as any);
      mockOrderBy.mockReturnValue({} as any);
      mockQuery.mockReturnValue({} as any);
      mockGetDocs.mockRejectedValue(new Error('Firebase connection failed'));

      const request = new NextRequest(
        `http://localhost:3000/api/sectors/by-path/${pathId}`
      );
      const response = await getSectors(request, { params: { id: pathId } });
      const data = await response.json();

      expect(response).toBeDefined();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to fetch sectors');
    });
  });
});
