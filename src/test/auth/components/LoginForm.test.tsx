import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/auth/components/LoginForm";
import { useAuthStore } from "@/auth/store/authStore";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginForm", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("hola@vitality.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(await screen.findByText("El email es requerido")).toBeInTheDocument();
    expect(await screen.findByText("La contraseña es requerida")).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("hola@vitality.com"), "invalid-email");
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(await screen.findByText("Email inválido")).toBeInTheDocument();
  });

  it("updates auth store on successful submit", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("hola@vitality.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });

  it("handles login API failure gracefully", async () => {
    server.use(
      http.post("*/auth/login", () => HttpResponse.error()),
    );

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("hola@vitality.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrong");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });
});
