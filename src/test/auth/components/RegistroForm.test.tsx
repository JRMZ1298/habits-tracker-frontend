import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { RegistroForm } from "@/auth/components/RegistroForm";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("RegistroForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all registration fields", () => {
    render(<RegistroForm />);

    expect(screen.getByText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("Confirmar contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<RegistroForm />);

    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(await screen.findByText("El nombre es requerido")).toBeInTheDocument();
    expect(await screen.findByText("El email es requerido")).toBeInTheDocument();
    expect(await screen.findByText("La contraseña es requerida")).toBeInTheDocument();
    expect(await screen.findByText("Debes confirmar tu contraseña")).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<RegistroForm />);

    await user.type(screen.getByPlaceholderText("Ingresa tu nombre"), "Test User");
    await user.type(screen.getByPlaceholderText("tú@ejemplo.com"), "bad-email");
    await user.type(screen.getByPlaceholderText("Crea una contraseña segura"), "password123");
    await user.type(screen.getByPlaceholderText("Repite tu contraseña"), "password123");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(await screen.findByText("Email inválido")).toBeInTheDocument();
  });

  it("shows password mismatch error", async () => {
    const user = userEvent.setup();
    render(<RegistroForm />);

    await user.type(screen.getByPlaceholderText("Ingresa tu nombre"), "Test User");
    await user.type(screen.getByPlaceholderText("tú@ejemplo.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Crea una contraseña segura"), "password123");
    await user.type(screen.getByPlaceholderText("Repite tu contraseña"), "different");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(await screen.findByText("Las contraseñas no coinciden")).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    const user = userEvent.setup();
    render(<RegistroForm />);

    await user.type(screen.getByPlaceholderText("Ingresa tu nombre"), "Test User");
    await user.type(screen.getByPlaceholderText("tú@ejemplo.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Crea una contraseña segura"), "password123");
    await user.type(screen.getByPlaceholderText("Repite tu contraseña"), "password123");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("¡Registro exitoso! Ahora puedes iniciar sesión");
    });
  });

  it("shows error toast on API failure", async () => {
    server.use(
      http.post("*/auth/register", () => HttpResponse.error()),
    );

    const user = userEvent.setup();
    render(<RegistroForm />);

    await user.type(screen.getByPlaceholderText("Ingresa tu nombre"), "Test User");
    await user.type(screen.getByPlaceholderText("tú@ejemplo.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Crea una contraseña segura"), "password123");
    await user.type(screen.getByPlaceholderText("Repite tu contraseña"), "password123");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
