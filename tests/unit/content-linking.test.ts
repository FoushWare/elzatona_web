/**
 * Unit Tests for Content Linking Logic
 *
 * Tests the core logic for linking categories, topics, learning paths, and questions
 */

import { describe, it, expect, beforeEach } from '@jest/globals';

// Mock data structures
interface Category {
  id: string;
  name: string;
  description: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  category: string;
  order: number;
  questionCount: number;
}

interface Question {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string;
  topics: string[];
  learningPaths: string[];
  difficulty: string;
}

// Content linking service
class ContentLinkingService {
  private categories: Map<string, Category> = new Map();
  private topics: Map<string, Topic> = new Map();
  private learningPaths: Map<string, LearningPath> = new Map();
  private questions: Map<string, Question> = new Map();

  // Category management
  createCategory(category: Category): string {
    this.categories.set(category.id, category);
    return category.id;
  }

  getCategory(id: string): Category | undefined {
    return this.categories.get(id);
  }

  getAllCategories(): Category[] {
    return Array.from(this.categories.values());
  }

  // Topic management
  createTopic(topic: Topic): string {
    // Validate category exists
    if (!this.categories.has(topic.category)) {
      throw new Error(`Category ${topic.category} does not exist`);
    }

    this.topics.set(topic.id, topic);
    return topic.id;
  }

  getTopicsByCategory(categoryId: string): Topic[] {
    return Array.from(this.topics.values()).filter(
      topic => topic.category === categoryId
    );
  }

  getAllTopics(): Topic[] {
    return Array.from(this.topics.values());
  }

  // Learning path management
  createLearningPath(learningPath: LearningPath): string {
    // Validate category exists
    if (!this.categories.has(learningPath.category)) {
      throw new Error(`Category ${learningPath.category} does not exist`);
    }

    this.learningPaths.set(learningPath.id, learningPath);
    return learningPath.id;
  }

  getLearningPathsByCategory(categoryId: string): LearningPath[] {
    return Array.from(this.learningPaths.values()).filter(
      path => path.category === categoryId
    );
  }

  getAllLearningPaths(): LearningPath[] {
    return Array.from(this.learningPaths.values()).sort(
      (a, b) => a.order - b.order
    );
  }

  // Question management
  createQuestion(question: Question): string {
    // Validate category exists
    if (!this.categories.has(question.category)) {
      throw new Error(`Category ${question.category} does not exist`);
    }

    // Validate topics exist
    for (const topicId of question.topics) {
      if (!this.topics.has(topicId)) {
        throw new Error(`Topic ${topicId} does not exist`);
      }
    }

    // Validate learning paths exist
    for (const pathId of question.learningPaths) {
      if (!this.learningPaths.has(pathId)) {
        throw new Error(`Learning path ${pathId} does not exist`);
      }
    }

    this.questions.set(question.id, question);

    // Update question counts for learning paths
    for (const pathId of question.learningPaths) {
      const path = this.learningPaths.get(pathId);
      if (path) {
        path.questionCount = this.getQuestionsByLearningPath(pathId).length;
      }
    }

    return question.id;
  }

  getQuestionsByCategory(categoryId: string): Question[] {
    return Array.from(this.questions.values()).filter(
      q => q.category === categoryId
    );
  }

  getQuestionsByTopic(topicId: string): Question[] {
    return Array.from(this.questions.values()).filter(q =>
      q.topics.includes(topicId)
    );
  }

  getQuestionsByLearningPath(learningPathId: string): Question[] {
    return Array.from(this.questions.values()).filter(q =>
      q.learningPaths.includes(learningPathId)
    );
  }

  getAllQuestions(): Question[] {
    return Array.from(this.questions.values());
  }

  // Validation methods
  validateContentLinks(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if all topics have valid categories
    for (const [topicId, topic] of this.topics) {
      if (!this.categories.has(topic.category)) {
        errors.push(
          `Topic ${topicId} references non-existent category ${topic.category}`
        );
      }
    }

    // Check if all learning paths have valid categories
    for (const [pathId, path] of this.learningPaths) {
      if (!this.categories.has(path.category)) {
        errors.push(
          `Learning path ${pathId} references non-existent category ${path.category}`
        );
      }
    }

    // Check if all questions have valid categories, topics, and learning paths
    for (const [questionId, question] of this.questions) {
      if (!this.categories.has(question.category)) {
        errors.push(
          `Question ${questionId} references non-existent category ${question.category}`
        );
      }

      for (const topicId of question.topics) {
        if (!this.topics.has(topicId)) {
          errors.push(
            `Question ${questionId} references non-existent topic ${topicId}`
          );
        }
      }

      for (const pathId of question.learningPaths) {
        if (!this.learningPaths.has(pathId)) {
          errors.push(
            `Question ${questionId} references non-existent learning path ${pathId}`
          );
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

describe('Content Linking Service', () => {
  let service: ContentLinkingService;

  beforeEach(() => {
    service = new ContentLinkingService();
  });

  describe('Category Management', () => {
    it('should create and retrieve categories', () => {
      const category: Category = {
        id: 'js-core',
        name: 'JavaScript (Core)',
        description: 'Core JavaScript concepts',
      };

      const categoryId = service.createCategory(category);
      expect(categoryId).toBe('js-core');

      const retrieved = service.getCategory('js-core');
      expect(retrieved).toEqual(category);
    });

    it('should return all categories', () => {
      const categories = [
        { id: 'js-core', name: 'JavaScript (Core)', description: 'Core JS' },
        {
          id: 'react-core',
          name: 'React.js (Core)',
          description: 'React fundamentals',
        },
      ];

      categories.forEach(cat => service.createCategory(cat));
      const allCategories = service.getAllCategories();

      expect(allCategories).toHaveLength(2);
      expect(allCategories.map(c => c.id)).toContain('js-core');
      expect(allCategories.map(c => c.id)).toContain('react-core');
    });
  });

  describe('Topic Management', () => {
    beforeEach(() => {
      // Create a category first
      service.createCategory({
        id: 'js-core',
        name: 'JavaScript (Core)',
        description: 'Core JavaScript concepts',
      });
    });

    it('should create topics linked to categories', () => {
      const topic: Topic = {
        id: 'hoisting',
        name: 'Hoisting',
        description: 'JavaScript hoisting behavior',
        category: 'js-core',
        difficulty: 'intermediate',
      };

      const topicId = service.createTopic(topic);
      expect(topicId).toBe('hoisting');
    });

    it('should throw error when creating topic with non-existent category', () => {
      const topic: Topic = {
        id: 'invalid-topic',
        name: 'Invalid Topic',
        description: 'This should fail',
        category: 'non-existent',
        difficulty: 'beginner',
      };

      expect(() => service.createTopic(topic)).toThrow(
        'Category non-existent does not exist'
      );
    });

    it('should get topics by category', () => {
      const topics = [
        {
          id: 'hoisting',
          name: 'Hoisting',
          description: 'Hoisting',
          category: 'js-core',
          difficulty: 'intermediate' as const,
        },
        {
          id: 'closures',
          name: 'Closures',
          description: 'Closures',
          category: 'js-core',
          difficulty: 'intermediate' as const,
        },
      ];

      topics.forEach(topic => service.createTopic(topic));
      const jsTopics = service.getTopicsByCategory('js-core');

      expect(jsTopics).toHaveLength(2);
      expect(jsTopics.map(t => t.id)).toContain('hoisting');
      expect(jsTopics.map(t => t.id)).toContain('closures');
    });
  });

  describe('Learning Path Management', () => {
    beforeEach(() => {
      service.createCategory({
        id: 'js-core',
        name: 'JavaScript (Core)',
        description: 'Core JavaScript concepts',
      });
    });

    it('should create learning paths linked to categories', () => {
      const learningPath: LearningPath = {
        id: 'js-deep-dive',
        name: 'JavaScript Deep Dive',
        description: 'Master advanced JavaScript',
        category: 'js-core',
        order: 1,
        questionCount: 0,
      };

      const pathId = service.createLearningPath(learningPath);
      expect(pathId).toBe('js-deep-dive');
    });

    it('should sort learning paths by order', () => {
      const paths = [
        {
          id: 'path3',
          name: 'Path 3',
          description: 'Third',
          category: 'js-core',
          order: 3,
          questionCount: 0,
        },
        {
          id: 'path1',
          name: 'Path 1',
          description: 'First',
          category: 'js-core',
          order: 1,
          questionCount: 0,
        },
        {
          id: 'path2',
          name: 'Path 2',
          description: 'Second',
          category: 'js-core',
          order: 2,
          questionCount: 0,
        },
      ];

      paths.forEach(path => service.createLearningPath(path));
      const allPaths = service.getAllLearningPaths();

      expect(allPaths[0].id).toBe('path1');
      expect(allPaths[1].id).toBe('path2');
      expect(allPaths[2].id).toBe('path3');
    });
  });

  describe('Question Management', () => {
    beforeEach(() => {
      // Set up test data
      service.createCategory({
        id: 'js-core',
        name: 'JavaScript (Core)',
        description: 'Core JS',
      });
      service.createTopic({
        id: 'hoisting',
        name: 'Hoisting',
        description: 'Hoisting',
        category: 'js-core',
        difficulty: 'intermediate',
      });
      service.createLearningPath({
        id: 'js-deep-dive',
        name: 'JS Deep Dive',
        description: 'Advanced JS',
        category: 'js-core',
        order: 1,
        questionCount: 0,
      });
    });

    it('should create questions with proper links', () => {
      const question: Question = {
        id: 'q1',
        title: 'What is hoisting?',
        content: 'Explain hoisting',
        type: 'multiple-choice',
        category: 'js-core',
        topics: ['hoisting'],
        learningPaths: ['js-deep-dive'],
        difficulty: 'intermediate',
      };

      const questionId = service.createQuestion(question);
      expect(questionId).toBe('q1');

      // Check that question count was updated
      const learningPath = service.getLearningPathsByCategory('js-core')[0];
      expect(learningPath.questionCount).toBe(1);
    });

    it('should throw error when creating question with invalid links', () => {
      const invalidQuestion: Question = {
        id: 'q2',
        title: 'Invalid Question',
        content: 'This should fail',
        type: 'multiple-choice',
        category: 'non-existent',
        topics: ['hoisting'],
        learningPaths: ['js-deep-dive'],
        difficulty: 'intermediate',
      };

      expect(() => service.createQuestion(invalidQuestion)).toThrow(
        'Category non-existent does not exist'
      );
    });

    it('should get questions by category', () => {
      const question: Question = {
        id: 'q1',
        title: 'What is hoisting?',
        content: 'Explain hoisting',
        type: 'multiple-choice',
        category: 'js-core',
        topics: ['hoisting'],
        learningPaths: ['js-deep-dive'],
        difficulty: 'intermediate',
      };

      service.createQuestion(question);
      const jsQuestions = service.getQuestionsByCategory('js-core');

      expect(jsQuestions).toHaveLength(1);
      expect(jsQuestions[0].id).toBe('q1');
    });

    it('should get questions by learning path', () => {
      const question: Question = {
        id: 'q1',
        title: 'What is hoisting?',
        content: 'Explain hoisting',
        type: 'multiple-choice',
        category: 'js-core',
        topics: ['hoisting'],
        learningPaths: ['js-deep-dive'],
        difficulty: 'intermediate',
      };

      service.createQuestion(question);
      const pathQuestions = service.getQuestionsByLearningPath('js-deep-dive');

      expect(pathQuestions).toHaveLength(1);
      expect(pathQuestions[0].id).toBe('q1');
    });
  });

  describe('Content Validation', () => {
    it('should validate all content links correctly', () => {
      // Create valid content
      service.createCategory({
        id: 'js-core',
        name: 'JavaScript (Core)',
        description: 'Core JS',
      });
      service.createTopic({
        id: 'hoisting',
        name: 'Hoisting',
        description: 'Hoisting',
        category: 'js-core',
        difficulty: 'intermediate',
      });
      service.createLearningPath({
        id: 'js-deep-dive',
        name: 'JS Deep Dive',
        description: 'Advanced JS',
        category: 'js-core',
        order: 1,
        questionCount: 0,
      });

      const question: Question = {
        id: 'q1',
        title: 'What is hoisting?',
        content: 'Explain hoisting',
        type: 'multiple-choice',
        category: 'js-core',
        topics: ['hoisting'],
        learningPaths: ['js-deep-dive'],
        difficulty: 'intermediate',
      };

      service.createQuestion(question);

      const validation = service.validateContentLinks();
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid content links', () => {
      // Create content with invalid links
      service.createCategory({
        id: 'js-core',
        name: 'JavaScript (Core)',
        description: 'Core JS',
      });

      // Create topic with invalid category
      service.topics.set('invalid-topic', {
        id: 'invalid-topic',
        name: 'Invalid Topic',
        description: 'Invalid',
        category: 'non-existent',
        difficulty: 'intermediate',
      });

      const validation = service.validateContentLinks();
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(validation.errors[0]).toContain(
        'references non-existent category'
      );
    });
  });
});
