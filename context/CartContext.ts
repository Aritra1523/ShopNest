import { createContext } from "react";
import type { CartItem } from "../types/product/product";
import type { CartAction } from "./cartReducer";

export interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  cartCount: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
