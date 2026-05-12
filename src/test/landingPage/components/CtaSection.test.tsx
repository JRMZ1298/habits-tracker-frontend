import { render, screen } from "@/test/test-utils";

describe("CtaSection", () => {
  it("renders title", async () => {
    const { CtaSection } = await import(
      "@/landingPage/components/CtaSection"
    );
    render(<CtaSection />);
    expect(
      screen.getByText(
        "Tu viaje hacia la intencionalidad comienza hoy.",
      ),
    ).toBeInTheDocument();
  });

  it("renders button", async () => {
    const { CtaSection } = await import(
      "@/landingPage/components/CtaSection"
    );
    render(<CtaSection />);
    expect(screen.getByText("Comienzar")).toBeInTheDocument();
  });
});
