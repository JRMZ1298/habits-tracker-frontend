import { render, screen } from "@/test/test-utils";

describe("test setup", () => {
  it("renders a simple component", () => {
    render(<div data-testid="smoke">Hello Vitest</div>);
    expect(screen.getByTestId("smoke")).toHaveTextContent("Hello Vitest");
  });

  it("uses vitest globals", () => {
    expect(vi).toBeDefined();
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
    expect(expect).toBeDefined();
  });

  it("has jest-dom matchers available", () => {
    render(<button disabled>Click me</button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
