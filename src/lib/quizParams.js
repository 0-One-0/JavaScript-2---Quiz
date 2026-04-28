import { create } from "zustand";

export const useQuizParams = create((set) => ({
  amount: null,
  category: "",
  difficulty: "",
  setAmount: (amount) => set({ amount }),
  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
}));