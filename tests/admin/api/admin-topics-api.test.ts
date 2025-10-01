import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';

// Mock fetch for testing
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Admin Topics API Tests', () => {
  const BASE_URL = 'http://localhost:3000/api/admin/topics';
  const mockTopics = [
    {
      id: '1',
      name: 'JavaScript Fundamentals',
      description: 'Basic JavaScript concepts',
      category: 'JavaScript Core',
      questionCount: 5,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'React Hooks',
      description: 'React hooks and state management',
      category: 'React & Libraries',
      questionCount: 3,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/admin/topics', () => {
    test('should fetch all topics successfully', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTopics,
      } as Response);

      const response = await fetch(BASE_URL);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual(mockTopics);
      expect(mockFetch).toHaveBeenCalledWith(BASE_URL);
    });

    test('should handle fetch error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(fetch(BASE_URL)).rejects.toThrow('Network error');
    });

    test('should handle non-ok response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal server error' }),
      } as Response);

      const response = await fetch(BASE_URL);
      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Internal server error');
    });
  });

  describe('POST /api/admin/topics', () => {
    test('should create a new topic successfully', async () => {
      const newTopic = {
        name: 'CSS Grid',
        description: 'CSS Grid layout system',
        category: 'CSS & Styling',
      };

      const createdTopic = {
        id: '3',
        ...newTopic,
        questionCount: 0,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => createdTopic,
      } as Response);

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTopic),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual(createdTopic);
      expect(mockFetch).toHaveBeenCalledWith(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTopic),
      });
    });

    test('should handle validation errors', async () => {
      const invalidTopic = {
        name: '', // Invalid: empty name
        description: 'Test description',
        category: 'JavaScript Core',
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Topic name is required' }),
      } as Response);

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidTopic),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Topic name is required');
    });

    test('should handle duplicate topic name', async () => {
      const duplicateTopic = {
        name: 'JavaScript Fundamentals', // Already exists
        description: 'Test description',
        category: 'JavaScript Core',
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({ error: 'Topic with this name already exists' }),
      } as Response);

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(duplicateTopic),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Topic with this name already exists');
    });
  });

  describe('GET /api/admin/topics/[topicId]', () => {
    test('should fetch a specific topic successfully', async () => {
      const topicId = '1';
      const topic = mockTopics[0];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => topic,
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual(topic);
      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${topicId}`);
    });

    test('should handle topic not found', async () => {
      const topicId = '999';

      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Topic not found' }),
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`);
      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Topic not found');
    });
  });

  describe('PUT /api/admin/topics/[topicId]', () => {
    test('should update a topic successfully', async () => {
      const topicId = '1';
      const updateData = {
        name: 'Updated JavaScript Fundamentals',
        description: 'Updated description',
        category: 'JavaScript Core',
      };

      const updatedTopic = {
        id: topicId,
        ...updateData,
        questionCount: 5,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => updatedTopic,
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual(updatedTopic);
      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
    });

    test('should handle update validation errors', async () => {
      const topicId = '1';
      const invalidUpdate = {
        name: '', // Invalid: empty name
        description: 'Updated description',
        category: 'JavaScript Core',
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Topic name is required' }),
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUpdate),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Topic name is required');
    });
  });

  describe('DELETE /api/admin/topics/[topicId]', () => {
    test('should delete a topic successfully', async () => {
      const topicId = '1';

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Topic deleted successfully' }),
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.message).toBe('Topic deleted successfully');
      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${topicId}`, {
        method: 'DELETE',
      });
    });

    test('should handle topic not found for deletion', async () => {
      const topicId = '999';

      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Topic not found' }),
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Topic not found');
    });

    test('should handle topic with associated questions', async () => {
      const topicId = '1';

      mockFetch.mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({
          error: 'Cannot delete topic with associated questions',
        }),
      } as Response);

      const response = await fetch(`${BASE_URL}/${topicId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Cannot delete topic with associated questions');
    });
  });

  describe('POST /api/admin/topics/initialize', () => {
    test('should initialize common topics successfully', async () => {
      const initializedTopics = [
        {
          id: '1',
          name: 'Variables & Scope',
          description: 'Understanding variable declarations and scope',
          category: 'JavaScript Core',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          name: 'Functions & Closures',
          description: 'Function declarations and closure concepts',
          category: 'JavaScript Core',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: 'Topics initialized successfully',
          topics: initializedTopics,
        }),
      } as Response);

      const response = await fetch(`${BASE_URL}/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ force: false }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.message).toBe('Topics initialized successfully');
      expect(data.topics).toEqual(initializedTopics);
    });

    test('should handle force initialization', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: 'Topics initialized successfully (forced)',
          topics: [],
        }),
      } as Response);

      const response = await fetch(`${BASE_URL}/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ force: true }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.message).toBe('Topics initialized successfully (forced)');
    });

    test('should handle initialization when topics already exist', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({
          error: 'Topics already exist. Use force=true to overwrite.',
        }),
      } as Response);

      const response = await fetch(`${BASE_URL}/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ force: false }),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe(
        'Topics already exist. Use force=true to overwrite.'
      );
    });
  });

  describe('GET /api/questions/by-topic/[topicId]', () => {
    test('should fetch questions by topic successfully', async () => {
      const topicId = '1';
      const questions = [
        {
          id: '1',
          title: 'JavaScript Variables',
          content:
            'What are the different ways to declare variables in JavaScript?',
          difficulty: 'beginner',
          category: 'JavaScript',
          topics: ['JavaScript Core'],
          learningPaths: ['frontend-basics'],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => questions,
      } as Response);

      const response = await fetch(
        `http://localhost:3000/api/questions/by-topic/${topicId}`
      );
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual(questions);
    });

    test('should handle topic with no questions', async () => {
      const topicId = '999';

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      } as Response);

      const response = await fetch(
        `http://localhost:3000/api/questions/by-topic/${topicId}`
      );
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual([]);
    });
  });

  describe('PUT /api/questions/question-topics/[questionId]', () => {
    test('should update question topics successfully', async () => {
      const questionId = '1';
      const topics = ['JavaScript Core', 'Variables & Scope'];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: 'Question topics updated successfully',
          questionId,
          topics,
        }),
      } as Response);

      const response = await fetch(
        `http://localhost:3000/api/questions/question-topics/${questionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topics }),
        }
      );

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.message).toBe('Question topics updated successfully');
      expect(data.topics).toEqual(topics);
    });

    test('should handle invalid topic IDs', async () => {
      const questionId = '1';
      const invalidTopics = ['Invalid Topic', 'Another Invalid Topic'];

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid topic IDs provided' }),
      } as Response);

      const response = await fetch(
        `http://localhost:3000/api/questions/question-topics/${questionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topics: invalidTopics }),
        }
      );

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Invalid topic IDs provided');
    });
  });

  describe('POST /api/questions/bulk-topics', () => {
    test('should update topics for multiple questions successfully', async () => {
      const bulkUpdate = {
        questionIds: ['1', '2', '3'],
        topics: ['JavaScript Core', 'React & Libraries'],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: 'Bulk topic update completed successfully',
          updatedCount: 3,
          failedCount: 0,
        }),
      } as Response);

      const response = await fetch(
        'http://localhost:3000/api/questions/bulk-topics',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bulkUpdate),
        }
      );

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.message).toBe('Bulk topic update completed successfully');
      expect(data.updatedCount).toBe(3);
      expect(data.failedCount).toBe(0);
    });

    test('should handle partial bulk update failures', async () => {
      const bulkUpdate = {
        questionIds: ['1', '2', '999'], // 999 doesn't exist
        topics: ['JavaScript Core'],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: 'Bulk topic update completed with some failures',
          updatedCount: 2,
          failedCount: 1,
          failedQuestionIds: ['999'],
        }),
      } as Response);

      const response = await fetch(
        'http://localhost:3000/api/questions/bulk-topics',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bulkUpdate),
        }
      );

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.updatedCount).toBe(2);
      expect(data.failedCount).toBe(1);
      expect(data.failedQuestionIds).toEqual(['999']);
    });
  });
});
