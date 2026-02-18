// v1.0 - simple localStorage-backed question cart for custom plans

export interface CartItem {
  id: string; // question id
  question: string;
  section?: string;
  topic?: string;
  difficulty?: string;
  addedAt: number;
}

const STORAGE_KEY = "question-cart:v1";

function logCartStorageError(operation: string, error: unknown) {
  console.warn(`Cart storage ${operation} failed`, error);
}

export function loadCart(): CartItem[] {
  if (globalThis.window === undefined) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch (error) {
    logCartStorageError("read", error);
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (globalThis.window === undefined) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    logCartStorageError("write", error);
  }
}

export function addToCart(item: CartItem) {
  const items = loadCart();
  if (items.some((i) => i.id === item.id)) return;
  items.unshift(item);
  saveCart(items);
}

export function removeFromCart(questionId: string) {
  saveCart(loadCart().filter((i) => i.id !== questionId));
}

export function clearCart() {
  saveCart([]);
}
