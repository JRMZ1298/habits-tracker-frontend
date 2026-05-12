import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { FormHabit } from "@/app/pages/ui/FormHabit";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("FormHabit - create mode", () => {
  it("renders habit creation form", async () => {
    render(<FormHabit />);

    expect(await screen.findByPlaceholderText("ej. Yoga matutino")).toBeInTheDocument();
    expect(screen.getByText("Diario")).toBeInTheDocument();
    expect(screen.getByText("Semanal")).toBeInTheDocument();
    expect(screen.getByLabelText("Cultivar hábito")).toBeInTheDocument();
  });

  it("submit button is disabled when name is empty", async () => {
    render(<FormHabit />);

    await screen.findByPlaceholderText("ej. Yoga matutino");

    const submitButton = screen.getByLabelText("Cultivar hábito");
    expect(submitButton).toBeDisabled();
  });

  it("submits form and shows success toast", async () => {
    const user = userEvent.setup();
    render(<FormHabit />);

    const nameInput = await screen.findByPlaceholderText("ej. Yoga matutino");
    await user.type(nameInput, "Leer 20 páginas");

    const submitButton = screen.getByLabelText("Cultivar hábito");
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("¡Hábito creado exitosamente!");
    });
  });

  it("shows error toast on API failure", async () => {
    server.use(
      http.post("*/habits/", () => HttpResponse.error()),
    );

    const user = userEvent.setup();
    render(<FormHabit />);

    const nameInput = await screen.findByPlaceholderText("ej. Yoga matutino");
    await user.type(nameInput, "Leer 20 páginas");

    const submitButton = screen.getByLabelText("Cultivar hábito");
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
