import type { AuthState } from "@/interfaces/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 'persist' guarda el store en localStorage automáticamente
// así el usuario no pierde su sesión al recargar la página
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Se llama después de un login exitoso
      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      // Limpia todo al hacer logout
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "habit-auth", // Clave en localStorage
    },
  ),
);
