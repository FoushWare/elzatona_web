import { NextRequest } from 'next/server';
import { GET, POST, PUT, DELETE } from '@/app/api/learning-paths/route';

// Mock Firebase
jest.mock('@/lib/firebase-server', () => ({
  db: {
    collection: jest.fn(),
  },
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Learning Paths API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/learning-paths', () => {
    it('should return all learning paths', async () => {
      const mockLearningPaths = [
        {
          id: '1',
          title: 'React Fundamentals',
          description: 'Learn React from scratch',
          icon: 'react',
          color: 'blue',
          order: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'JavaScript Deep Dive',
          description: 'Advanced JavaScript concepts',
          icon: 'javascript',
          color: 'yellow',
          order: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const { getDocs } = require('@/lib/firebase-server');
      getDocs.mockResolvedValue({
        docs: mockLearningPaths.map(lp => ({ id: lp.id, data: () => lp })),
        empty: false,
        size: 2,
      });

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.data[0].title).toBe('React Fundamentals');
    });

    it('should handle empty learning paths', async () => {
      const { getDocs } = require('@/lib/firebase-server');
      getDocs.mockResolvedValue({
        docs: [],
        empty: true,
        size: 0,
      });

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const { getDocs } = require('@/lib/firebase-server');
      getDocs.mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Database connection failed');
    });
  });

  describe('POST /api/learning-paths', () => {
    it('should create a new learning path', async () => {
      const { addDoc } = require('@/lib/firebase-server');
      addDoc.mockResolvedValue({ id: 'new-path-id' });

      const learningPathData = {
        title: 'Vue.js Fundamentals',
        description: 'Learn Vue.js from scratch',
        icon: 'vue',
        color: 'green',
        order: 3,
        isActive: true,
      };

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths',
        {
          method: 'POST',
          body: JSON.stringify(learningPathData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.id).toBe('new-path-id');
      expect(addDoc).toHaveBeenCalled();
    });

    it('should validate required fields', async () => {
      const invalidData = {
        title: '', // Invalid: empty title
        description: 'Learn Vue.js from scratch',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths',
        {
          method: 'POST',
          body: JSON.stringify(invalidData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Title is required');
    });
  });

  describe('PUT /api/learning-paths/[id]', () => {
    it('should update an existing learning path', async () => {
      const { updateDoc, doc } = require('@/lib/firebase-server');
      updateDoc.mockResolvedValue(undefined);

      const updateData = {
        title: 'Updated React Fundamentals',
        description: 'Updated description',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths/1',
        {
          method: 'PUT',
          body: JSON.stringify(updateData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await PUT(request, { params: { id: '1' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(updateDoc).toHaveBeenCalled();
    });

    it('should handle learning path not found', async () => {
      const { updateDoc } = require('@/lib/firebase-server');
      updateDoc.mockRejectedValue(new Error('Learning path not found'));

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths/nonexistent',
        {
          method: 'PUT',
          body: JSON.stringify({ title: 'Updated' }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await PUT(request, { params: { id: 'nonexistent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Learning path not found');
    });
  });

  describe('DELETE /api/learning-paths/[id]', () => {
    it('should delete a learning path', async () => {
      const { deleteDoc } = require('@/lib/firebase-server');
      deleteDoc.mockResolvedValue(undefined);

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths/1',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request, { params: { id: '1' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(deleteDoc).toHaveBeenCalled();
    });

    it('should handle learning path not found during deletion', async () => {
      const { deleteDoc } = require('@/lib/firebase-server');
      deleteDoc.mockRejectedValue(new Error('Learning path not found'));

      const request = new NextRequest(
        'http://localhost:3000/api/learning-paths/nonexistent',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request, { params: { id: 'nonexistent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Learning path not found');
    });
  });
});
