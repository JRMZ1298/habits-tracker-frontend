import { render, screen } from "@/test/test-utils";

describe("BrandHeader", () => {
  it("renders brand name", async () => {
    const { BrandHeader } = await import("@/auth/components/BrandHeader");
    render(<BrandHeader />);
    expect(screen.getByText("Vitality")).toBeInTheDocument();
  });

  it("links to home", async () => {
    const { BrandHeader } = await import("@/auth/components/BrandHeader");
    render(<BrandHeader />);
    const link = screen.getByRole("link", { name: "Vitality" });
    expect(link).toHaveAttribute("href", "/home");
  });
});
