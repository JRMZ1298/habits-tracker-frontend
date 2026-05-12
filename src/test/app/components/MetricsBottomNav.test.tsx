import { render, screen } from "@/test/test-utils";

describe("MetricsBottomNav", () => {
  it("renders all nav items", async () => {
    const { MetricsBottomNav } = await import(
      "@/app/components/MetricsBottomNav"
    );
    render(<MetricsBottomNav />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Lista")).toBeInTheDocument();
    expect(screen.getByText("Estadísticas")).toBeInTheDocument();
    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("highlights active item", async () => {
    const { MetricsBottomNav } = await import(
      "@/app/components/MetricsBottomNav"
    );
    render(<MetricsBottomNav />);
    const buttons = screen.getAllByRole("button");

    const statsButton = buttons.find(
      (b) => b.textContent?.includes("Estadísticas"),
    );
    expect(statsButton?.className).toContain("bg-primary");
  });
});
