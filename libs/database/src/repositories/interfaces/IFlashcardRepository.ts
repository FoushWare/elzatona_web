/**
 * IFlashcardRepository
 * Interface for flashcard repository abstraction
 */

export interface IFlashcardRepository {
  getFlashcardById(id: string): Promise<Flashcard | null>;
  getAllFlashcards(): Promise<Flashcard[]>;
  createFlashcard(data: FlashcardInput): Promise<Flashcard>;
  updateFlashcard(id: string, data: FlashcardInput): Promise<Flashcard>;
  deleteFlashcard(id: string): Promise<void>;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  sectionId: string;
}

export interface FlashcardInput {
  question: string;
  answer: string;
  sectionId: string;
}
