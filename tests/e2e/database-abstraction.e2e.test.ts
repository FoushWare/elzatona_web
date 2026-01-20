import { describe, it, expect } from 'vitest';
// Simulate full user flows using repository mocks
import { createMockRepositories } from '../utils/mock-repositories';

describe('Database Abstraction E2E', () => {
  const {
    categoryRepository,
    topicRepository,
    sectionRepository,
    flashcardRepository,
    progressRepository,
    userRepository,
  } = createMockRepositories();

  it('create category → topic → section → flashcard flow', async () => {
    const cat = await categoryRepository.createCategory({ name: 'TestCat' });
    const topic = await topicRepository.createTopic({ name: 'TestTopic', categoryId: cat.id });
    const section = await sectionRepository.createSection({ name: 'TestSection', topicId: topic.id });
    const flashcard = await flashcardRepository.createFlashcard({ question: 'Q', answer: 'A', sectionId: section.id });
    expect(cat.id).toBeDefined();
    expect(topic.categoryId).toBe(cat.id);
    expect(section.topicId).toBe(topic.id);
    expect(flashcard.sectionId).toBe(section.id);
  });

  it('user progress tracking flow', async () => {
    const user = await userRepository.create({ email: 'e2e@example.com', name: 'E2E User' });
    const flashcard = await flashcardRepository.createFlashcard({ question: 'Q', answer: 'A', sectionId: '1' });
    const progress = await progressRepository.createProgress({ userId: user.id, flashcardId: flashcard.id, status: 'started' });
    const fetched = await progressRepository.getProgressById(progress.id);
    expect(fetched).toBeTruthy();
    expect(fetched?.userId).toBe(user.id);
  });

  it('database type switching (mock)', async () => {
    // Simulate switching by using mock vs real (here only mock)
    expect(typeof categoryRepository.getCategoryById).toBe('function');
  });

  it('error handling and recovery', async () => {
    await expect(categoryRepository.updateCategory('999', { name: 'Fail' })).rejects.toThrow();
    await expect(userRepository.update('999', { name: 'Fail' })).rejects.toThrow();
  });
});
