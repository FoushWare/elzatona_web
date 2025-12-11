// v1.0 - simple localStorage-backed flashcards helper

export interface FlashcardItem {
  id: string; // question id
  question: string;
  section?: string;
  topic?: string;
  difficulty?: string;
  addedAt: number;
}

const STORAGE_KEY = "flashcards:v1";

export function loadFlashcards(): FlashcardItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FlashcardItem[]) : [];
  } catch (_) {
    return [];
  }
}

export function saveFlashcards(items: FlashcardItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (_) {
    // no-op
  }
}

export function addFlashcard(item: FlashcardItem) {
  const items = loadFlashcards();
  if (items.some((i) => i.id === item.id)) return; // dedupe by question id
  items.unshift(item);
  saveFlashcards(items);
}

export function removeFlashcard(questionId: string) {
  const items = loadFlashcards().filter((i) => i.id !== questionId);
  saveFlashcards(items);
}

export function isInFlashcards(questionId: string): boolean {
  return loadFlashcards().some((i) => i.id === questionId);
}
