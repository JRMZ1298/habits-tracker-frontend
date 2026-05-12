import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";
import { useLogin, useRegister, useLogout } from "@/auth/hooks/useAuth";
import { useUpdateProfile } from "@/app/hooks/useProfileUser";
import { useAuthStore } from "@/auth/store/authStore";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  });
  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useLogin", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
  });

  it("updates auth store on success", async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => { result.current.mutate({ email: "test@example.com", password: "password123" }); });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const authState = useAuthStore.getState();
    expect(authState.token).toBe("test-token-123");
    expect(authState.user?.name).toBe("Test User");
    expect(authState.isAuthenticated).toBe(true);
  });

  it("returns error on login failure", async () => {
    server.use(
      http.post("*/auth/login", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    act(() => { result.current.mutate({ email: "test@example.com", password: "wrong" }); });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useRegister", () => {
  it("returns success on register", async () => {
    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("returns error on register failure", async () => {
    server.use(
      http.post("*/auth/register", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

    act(() => {
      result.current.mutate({
        name: "Test",
        email: "test@test.com",
        password: "password123",
        confirmPassword: "password123",
      });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useLogout", () => {
  beforeEach(() => {
    useAuthStore.setState({
      token: "some-token",
      user: { name: "Test", email: "test@test.com" },
      isAuthenticated: true,
    });
  });

  it("clears auth store on logout", () => {
    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper() });

    act(() => { result.current(); });

    const authState = useAuthStore.getState();
    expect(authState.token).toBeNull();
    expect(authState.user).toBeNull();
    expect(authState.isAuthenticated).toBe(false);
  });
});

describe("useUpdateProfile", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: "old-token", user: { name: "Old", email: "old@test.com" }, isAuthenticated: true });
  });

  it("updates profile and refreshes token", async () => {
    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    act(() => { result.current.mutate({ name: "Updated Name", email: "updated@example.com" }); });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await waitFor(() => {
      const authState = useAuthStore.getState();
      expect(authState.token).toBe("refreshed-token-456");
      expect(authState.user?.name).toBe("Updated Name");
    });
  });
});
