import { render, screen } from "@/test/test-utils";

describe("HeroSection", () => {
  it("renders heading", async () => {
    const { HeroSection } = await import(
      "@/landingPage/components/HeroSection"
    );
    render(<HeroSection />);
    expect(screen.getByText("Cultiva tu")).toBeInTheDocument();
  });

  it("renders start growing CTA", async () => {
    const { HeroSection } = await import(
      "@/landingPage/components/HeroSection"
    );
    render(<HeroSection />);
    expect(screen.getByText("Comienza a crecer")).toBeInTheDocument();
  });

  it("renders watch demo link", async () => {
    const { HeroSection } = await import(
      "@/landingPage/components/HeroSection"
    );
    render(<HeroSection />);
    expect(screen.getByText("Ver demostración")).toBeInTheDocument();
  });

  it("renders hero image", async () => {
    const { HeroSection } = await import(
      "@/landingPage/components/HeroSection"
    );
    render(<HeroSection />);
    const img = screen.getByAltText(
      "Persona practicando yoga en un invernadero con luz natural",
    );
    expect(img).toBeInTheDocument();
  });
});
