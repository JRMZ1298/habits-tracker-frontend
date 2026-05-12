import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders disabled input", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("renders with different types", () => {
    render(<Input type="password" />);
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });

  it("forwards additional props", () => {
    render(<Input data-testid="my-input" />);
    expect(screen.getByTestId("my-input")).toBeInTheDocument();
  });
});
