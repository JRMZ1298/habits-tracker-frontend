import { render, screen } from "@/test/test-utils";

describe("Footer", () => {
  it("renders copyright with brand name", async () => {
    const { Footer } = await import("@/landingPage/components/Footer");
    render(<Footer />);
    expect(
      screen.getByText(
        "© 2024 Vitality Framework. Crece con intención.",
      ),
    ).toBeInTheDocument();
  });

  it("renders section headings", async () => {
    const { Footer } = await import("@/landingPage/components/Footer");
    render(<Footer />);
    expect(screen.getByText("Comprar y conocer")).toBeInTheDocument();
    expect(screen.getByText("Cuenta")).toBeInTheDocument();
    expect(screen.getByText("Acerca de")).toBeInTheDocument();
    expect(screen.getByText("Valores")).toBeInTheDocument();
  });

  it("renders link labels", async () => {
    const { Footer } = await import("@/landingPage/components/Footer");
    render(<Footer />);
    expect(screen.getByText("Hábitos")).toBeInTheDocument();
    expect(screen.getByText("Métricas")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("renders legal text", async () => {
    const { Footer } = await import("@/landingPage/components/Footer");
    render(<Footer />);
    expect(
      screen.getByText(
        "La fuente real de información sobre hábitos y crecimiento personal.",
      ),
    ).toBeInTheDocument();
  });
});
