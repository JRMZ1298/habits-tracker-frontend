import { useAuthStore } from "@/auth/store/authStore";
import type { AuthUser } from "@/interfaces/store";

const mockUser: AuthUser = { name: "Test User", email: "test@example.com" };

describe("authStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  });

  it("has initial state with no auth", () => {
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("setAuth updates token, user, and isAuthenticated", () => {
    useAuthStore.getState().setAuth("my-token", mockUser);

    const state = useAuthStore.getState();
    expect(state.token).toBe("my-token");
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it("logout clears everything", () => {
    useAuthStore.getState().setAuth("my-token", mockUser);
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("persists state to localStorage", () => {
    useAuthStore.getState().setAuth("persisted-token", mockUser);

    const stored = JSON.parse(localStorage.getItem("habit-auth")!);
    expect(stored.state.token).toBe("persisted-token");
    expect(stored.state.isAuthenticated).toBe(true);
  });

  it("hydrates from localStorage on re-creation", async () => {
    const persistedState = {
      state: { token: "hydrated-token", user: mockUser, isAuthenticated: true },
      version: 0,
    };
    localStorage.setItem("habit-auth", JSON.stringify(persistedState));

    useAuthStore.persist.rehydrate();

    await vi.waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.token).toBe("hydrated-token");
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });
  });
});
