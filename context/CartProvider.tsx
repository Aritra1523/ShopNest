import { useEffect, useReducer, type ReactNode } from "react";
import type { CartItem } from "../types/product/product";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";

const STORAGE_KEY = "cart";

const isValidItem = (item: unknown): item is CartItem => {
  if (typeof item !== "object" || item === null) return false;
  const i = item as Partial<CartItem>;
  return (
    typeof i.id === "number" &&
    typeof i.price === "number" &&
    typeof i.quantity === "number" &&
    i.quantity > 0
  );
};

// Handles empty / corrupted LocalStorage safely
const getInitialCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  // Keep LocalStorage in sync; remove the key entirely when cart is empty/cleared
  useEffect(() => {
    try {
      if (cart.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      }
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider value={{ cart, dispatch, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
