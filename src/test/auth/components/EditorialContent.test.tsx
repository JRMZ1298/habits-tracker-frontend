import { render, screen } from "@/test/test-utils";

describe("EditorialContent", () => {
  it("renders framework badge", async () => {
    const { EditorialContent } = await import(
      "@/auth/components/EditorialContent"
    );
    render(<EditorialContent />);
    expect(
      screen.getByText("Únete al Framework"),
    ).toBeInTheDocument();
  });

  it("renders headline pieces within heading", async () => {
    const { EditorialContent } = await import(
      "@/auth/components/EditorialContent"
    );
    render(<EditorialContent />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Inicia tu");
    expect(heading.textContent).toContain("viaje de crecimiento");
    expect(heading.textContent).toContain("ahora");
  });

  it("renders card titles", async () => {
    const { EditorialContent } = await import(
      "@/auth/components/EditorialContent"
    );
    render(<EditorialContent />);
    expect(
      screen.getByText("Seguimiento orgánico"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rituales conscientes"),
    ).toBeInTheDocument();
  });
});
