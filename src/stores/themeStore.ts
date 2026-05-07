import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const applyTheme = (theme: Theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("habit-theme");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      applyTheme(parsed?.state?.theme ?? "light");
    } catch {
      applyTheme("light");
    }
  }
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "light" ? "dark" : "light";
          if (typeof document !== "undefined" && document.startViewTransition) {
            document.startViewTransition(() => applyTheme(next));
          } else {
            applyTheme(next);
          }
          return { theme: next };
        }),
      setTheme: (theme) => {
        if (typeof document !== "undefined" && document.startViewTransition) {
          document.startViewTransition(() => applyTheme(theme));
        } else {
          applyTheme(theme);
        }
        set({ theme });
      },
    }),
    {
      name: "habit-theme",
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    },
  ),
);
