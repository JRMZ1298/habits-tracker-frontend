import { render, screen } from "@/test/test-utils";

describe("Testimonials", () => {
  it("renders section title", async () => {
    const { Testimonials } = await import(
      "@/landingPage/components/Testimonials"
    );
    render(<Testimonials />);
    expect(
      screen.getByText("Historias de crecimiento intencional"),
    ).toBeInTheDocument();
  });

  it("renders user names", async () => {
    const { Testimonials } = await import(
      "@/landingPage/components/Testimonials"
    );
    render(<Testimonials />);
    expect(screen.getByText("Sarah Jenkins")).toBeInTheDocument();
    expect(screen.getByText("Marcus Thorne")).toBeInTheDocument();
  });
});
