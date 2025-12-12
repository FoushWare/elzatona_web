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

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch (_) {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (_) {}
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
