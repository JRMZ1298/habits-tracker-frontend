import { render, screen } from "@/test/test-utils";

describe("FeatureGrid", () => {
  it("renders stats section title", async () => {
    const { FeatureGrid } = await import(
      "@/landingPage/components/FeatureGrid"
    );
    render(<FeatureGrid />);
    expect(screen.getByText("Análisis visual profundo")).toBeInTheDocument();
  });

  it("renders streaks section title", async () => {
    const { FeatureGrid } = await import(
      "@/landingPage/components/FeatureGrid"
    );
    render(<FeatureGrid />);
    expect(
      screen.getByText("Rachas ininterrumpidas"),
    ).toBeInTheDocument();
  });

  it("renders alerts section title", async () => {
    const { FeatureGrid } = await import(
      "@/landingPage/components/FeatureGrid"
    );
    render(<FeatureGrid />);
    expect(screen.getByText("Alertas intencionales")).toBeInTheDocument();
  });

  it("renders explore stats link", async () => {
    const { FeatureGrid } = await import(
      "@/landingPage/components/FeatureGrid"
    );
    render(<FeatureGrid />);
    expect(screen.getByText("Explorar estadísticas")).toBeInTheDocument();
  });
});
