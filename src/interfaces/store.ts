// ── Usuario en sesión (lo que guardamos en Zustand, no el User completo) ──────
export interface AuthUser {
  name: string;
}

// ── Forma del store de Zustand ────────────────────────────────────────────────
export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Acciones
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
}
