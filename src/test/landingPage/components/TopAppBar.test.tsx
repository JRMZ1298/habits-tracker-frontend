import { render, screen } from "@/test/test-utils";

describe("TopAppBar", () => {
  it("renders brand name", async () => {
    const { TopAppBar } = await import("@/landingPage/components/TopAppBar");
    render(<TopAppBar />);
    expect(screen.getByText("Vitality")).toBeInTheDocument();
  });

  it("renders login link", async () => {
    const { TopAppBar } = await import("@/landingPage/components/TopAppBar");
    render(<TopAppBar />);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("renders signup link", async () => {
    const { TopAppBar } = await import("@/landingPage/components/TopAppBar");
    render(<TopAppBar />);
    expect(screen.getByText("Regístrate")).toBeInTheDocument();
  });
});
