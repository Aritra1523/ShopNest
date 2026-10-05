import type { CartItem, Product } from "../types/product/product";

export type CartAction =
  | { type: "addToCart"; payload: Product }
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "remove"; payload: number }
  | { type: "clearCart" };

// Quantity validation: never exceed available stock (when stock is known)
const canIncrease = (item: { quantity: number; stock?: number }) =>
  item.stock === undefined || item.quantity < item.stock;

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "addToCart": {
      if (action.payload.stock !== undefined && action.payload.stock <= 0) {
        return state;
      }

      const existing = state.find((item) => item.id === action.payload.id);

      // Prevent duplicate cart items: bump quantity instead
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id && canIncrease(item)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "increment":
      return state.map((item) =>
        item.id === action.payload && canIncrease(item)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

    // Item is removed automatically when quantity reaches zero
    case "decrement":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

    case "remove":
      return state.filter((item) => item.id !== action.payload);

    case "clearCart":
      return [];

    default:
      return state;
  }
};
