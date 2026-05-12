import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

describe("BadgeUnlockToast", () => {
  const badge = {
    name: "Primera racha",
    icon: "whatshot",
    description: "Completaste 7 días seguidos",
  };

  it("returns null when badge is null", async () => {
    const { BadgeUnlockToast } = await import(
      "@/app/components/BadgeUnlockToast"
    );
    const { container } = render(
      <BadgeUnlockToast badge={null} onClose={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders badge info when provided", async () => {
    const { BadgeUnlockToast } = await import(
      "@/app/components/BadgeUnlockToast"
    );
    render(<BadgeUnlockToast badge={badge} onClose={vi.fn()} />);
    expect(screen.getByText("Primera racha")).toBeInTheDocument();
    expect(screen.getByText("Completaste 7 días seguidos")).toBeInTheDocument();
  });

  it("shows unlock heading", async () => {
    const { BadgeUnlockToast } = await import(
      "@/app/components/BadgeUnlockToast"
    );
    render(<BadgeUnlockToast badge={badge} onClose={vi.fn()} />);
    expect(screen.getByText("¡Insignia desbloqueada!")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const { BadgeUnlockToast } = await import(
      "@/app/components/BadgeUnlockToast"
    );
    const onClose = vi.fn();
    render(<BadgeUnlockToast badge={badge} onClose={onClose} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
