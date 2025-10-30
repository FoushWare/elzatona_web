// v1.0
import '@testing-library/jest-dom';
import {
  loadFlashcards,
  addFlashcard,
  removeFlashcard,
  isInFlashcards,
  type FlashcardItem,
} from '@/lib/flashcards';

describe('flashcards utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('adds, loads and dedupes by id', () => {
    const f: FlashcardItem = {
      id: 'qX',
      question: 'Explain closures',
      addedAt: Date.now(),
    };
    addFlashcard(f);
    addFlashcard(f);
    const list = loadFlashcards();
    expect(list).toHaveLength(1);
    expect(isInFlashcards('qX')).toBe(true);
  });

  it('removes item', () => {
    const f: FlashcardItem = {
      id: 'qY',
      question: 'Explain event loop',
      addedAt: Date.now(),
    };
    addFlashcard(f);
    removeFlashcard('qY');
    expect(isInFlashcards('qY')).toBe(false);
  });
});
