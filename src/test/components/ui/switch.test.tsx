import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).not.toBeChecked();
  });

  it("renders checked when defaultChecked is true", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch />);
    const switchEl = screen.getByRole("switch");
    await user.click(switchEl);
    expect(switchEl).toBeChecked();
  });

  it("renders with sm size", () => {
    const { container } = render(<Switch size="sm" />);
    expect(container.querySelector("[data-size='sm']")).toBeInTheDocument();
  });
});
