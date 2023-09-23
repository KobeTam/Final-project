import { create } from "zustand";

interface ThemeStore {
  theme: "dark" | "light";
  toggleTheme: (v: "dark" | "light") => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  theme: "dark",
  toggleTheme: (v) => set((state) => ({ theme: v })),
}));
