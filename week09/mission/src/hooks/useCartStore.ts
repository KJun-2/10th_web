import type { CartItems } from "../types/cart";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

const calculateCartTotals = (items: CartItems) =>
  items.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += item.amount * item.price;
      return acc;
    },
    { amount: 0, total: 0 },
  );

const initialCartItems: CartItems = cartItems.map((item) => ({ ...item }));
const initialTotals = calculateCartTotals(initialCartItems);

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: initialCartItems,
    amount: initialTotals.amount,
    total: initialTotals.total,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem) {
            cartItem.amount += 1;
          }
          const totals = calculateCartTotals(state.cartItems);
          state.amount = totals.amount;
          state.total = totals.total;
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
          const totals = calculateCartTotals(state.cartItems);
          state.amount = totals.amount;
          state.total = totals.total;
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          const totals = calculateCartTotals(state.cartItems);
          state.amount = totals.amount;
          state.total = totals.total;
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
          state.amount = 0;
          state.total = 0;
        });
      },
      calculateTotals: () => {
        set((state) => {
          const totals = calculateCartTotals(state.cartItems);
          state.amount = totals.amount;
          state.total = totals.total;
        });
      },
    },
  })),
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    })),
  );

export const useCartActions = () => useCartStore((state) => state.actions);