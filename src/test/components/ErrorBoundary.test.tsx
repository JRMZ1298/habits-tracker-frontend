import { render, screen } from "@/test/test-utils";

const ThrowError = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when no error", async () => {
    const { ErrorBoundary } = await import("@/components/ErrorBoundary");
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("shows default error UI when child throws", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { ErrorBoundary } = await import("@/components/ErrorBoundary");
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reintentar" }),
    ).toBeInTheDocument();
  });

  it("renders custom fallback when provided", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { ErrorBoundary } = await import("@/components/ErrorBoundary");
    render(
      <ErrorBoundary fallback={<div>Custom error</div>}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });
});
