// v1.0
import '@testing-library/jest-dom';
import {
  loadCart,
  addToCart,
  removeFromCart,
  clearCart,
  type CartItem,
} from '@/lib/cart';

describe('cart utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('adds and loads items; dedupes by id', () => {
    const item: CartItem = {
      id: 'q1',
      question: 'What is React?',
      addedAt: Date.now(),
    };
    addToCart(item);
    addToCart(item);
    const loaded = loadCart();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe('q1');
  });

  it('removes and clears', () => {
    const item1: CartItem = { id: 'a', question: 'A', addedAt: Date.now() };
    const item2: CartItem = { id: 'b', question: 'B', addedAt: Date.now() };
    addToCart(item1);
    addToCart(item2);
    removeFromCart('a');
    expect(loadCart().map(i => i.id)).toEqual(['b']);
    clearCart();
    expect(loadCart()).toEqual([]);
  });
});
