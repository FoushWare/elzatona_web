import { NextRequest } from 'next/server';
import { DELETE } from '@/app/api/admin/clear-questions/route';

// Mock Firebase
jest.mock('@/lib/firebase-server', () => ({
  db: {
    collection: jest.fn(),
  },
  collection: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
  writeBatch: jest.fn(),
  doc: jest.fn(),
}));

describe('Admin Clear Questions API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('DELETE /api/admin/clear-questions', () => {
    it('should clear all questions from unifiedQuestions collection', async () => {
      const mockQuestions = [
        { id: '1', data: () => ({ title: 'Question 1' }) },
        { id: '2', data: () => ({ title: 'Question 2' }) },
        { id: '3', data: () => ({ title: 'Question 3' }) },
      ];

      const {
        db,
        collection,
        query,
        getDocs,
        writeBatch,
        doc,
      } = require('@/lib/firebase-server');

      // Mock Firebase functions
      const mockCollection = jest.fn();
      const mockQuery = jest.fn();
      const mockGetDocs = jest.fn();
      const mockWriteBatch = jest.fn();
      const mockDoc = jest.fn();

      db.collection = mockCollection;
      collection.mockReturnValue(mockCollection());
      query.mockReturnValue(mockQuery());
      getDocs.mockResolvedValue({
        docs: mockQuestions,
        empty: false,
        size: 3,
      });

      const mockBatch = {
        delete: jest.fn(),
        commit: jest.fn().mockResolvedValue(undefined),
      };
      writeBatch.mockReturnValue(mockBatch);
      mockWriteBatch.mockReturnValue(mockBatch);

      const request = new NextRequest(
        'http://localhost:3000/api/admin/clear-questions',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.deletedCount).toBe(3);
      expect(data.message).toContain('Successfully cleared 3 questions');
    });

    it('should handle empty collection', async () => {
      const { getDocs } = require('@/lib/firebase-server');
      getDocs.mockResolvedValue({
        docs: [],
        empty: true,
        size: 0,
      });

      const request = new NextRequest(
        'http://localhost:3000/api/admin/clear-questions',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.deletedCount).toBe(0);
      expect(data.message).toContain('No questions found to clear');
    });

    it('should handle database errors', async () => {
      const { getDocs } = require('@/lib/firebase-server');
      getDocs.mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest(
        'http://localhost:3000/api/admin/clear-questions',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Database connection failed');
    });

    it('should handle Firebase not initialized', async () => {
      const { db } = require('@/lib/firebase-server');
      db = null; // Simulate Firebase not initialized

      const request = new NextRequest(
        'http://localhost:3000/api/admin/clear-questions',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Firebase not initialized');
    });

    it('should handle batch commit errors', async () => {
      const mockQuestions = [
        { id: '1', data: () => ({ title: 'Question 1' }) },
      ];

      const { getDocs, writeBatch } = require('@/lib/firebase-server');

      getDocs.mockResolvedValue({
        docs: mockQuestions,
        empty: false,
        size: 1,
      });

      const mockBatch = {
        delete: jest.fn(),
        commit: jest.fn().mockRejectedValue(new Error('Batch commit failed')),
      };
      writeBatch.mockReturnValue(mockBatch);

      const request = new NextRequest(
        'http://localhost:3000/api/admin/clear-questions',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Batch commit failed');
    });
  });
});
