import { create } from "zustand";

type BalanceStore = {
  balance: number;
  setBalance: (param: number) => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 100000,
  setBalance: (balance: number) => {
    set({ balance: balance });
  },
}));
