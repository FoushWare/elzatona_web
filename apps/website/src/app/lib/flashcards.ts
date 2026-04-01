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
  if (globalThis.window === undefined) return [];
  try {
    const raw = globalThis.window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FlashcardItem[]) : [];
  } catch (error) {
    console.debug("loadFlashcards failed:", error);
    return [];
  }
}

export function saveFlashcards(items: FlashcardItem[]) {
  if (globalThis.window === undefined) return;
  try {
    globalThis.window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.debug("saveFlashcards failed:", error);
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
