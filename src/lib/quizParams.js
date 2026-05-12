import { create } from "zustand";

const amountSlice =  (set) => ({
  amount: null,
  setAmount: (amount) => set({ amount }),
});

const categorySlice =  (set) => ({
  category: "",
  setCategory: (category) => set({ category }),
});

const difficultySlice =  (set) => ({
  difficulty: "",
  setDifficulty: (difficulty) => set({ difficulty}),
});

export const useQuizParams = create((set) => ({
  ...amountSlice(set),
  ...categorySlice(set),
  ...difficultySlice(set),
}));