import { render, screen } from "@/test/test-utils";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button.dataset.variant).toBe("default");
  });

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button").dataset.variant).toBe("destructive");
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button").dataset.variant).toBe("outline");
  });

  it("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button").dataset.variant).toBe("ghost");
  });

  it("renders with link variant", () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button").dataset.variant).toBe("link");
  });

  it("renders with size variants", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").dataset.size).toBe("sm");
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as child component via Slot", () => {
    render(
      <Button asChild>
        <a href="/test">Link as button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link as button" });
    expect(link).toBeInTheDocument();
    expect(link.dataset.slot).toBe("button");
  });
});
