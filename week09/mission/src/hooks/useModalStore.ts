import { create } from "zustand";
import { useCartStore } from "./useCartStore";

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
  clearCart: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  actions: {
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    clearCart: () => {
      useCartStore.getState().actions.clearCart();
    },
  },
}));

export const useModalInfo = () => useModalStore((state) => state.isOpen);
export const useModalActions = () => useModalStore((state) => state.actions);

