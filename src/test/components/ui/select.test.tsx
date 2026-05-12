import { render, screen } from "@/test/test-utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";

describe("Select", () => {
  it("renders trigger with placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("Select option")).toBeInTheDocument();
  });

  it("renders trigger with data-slot attributes", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger).toHaveAttribute("data-size", "default");
  });

  it("renders select-value with data-slot", () => {
    render(
      <Select defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>,
    );

    const valueEl = document.querySelector("[data-slot='select-value']");
    expect(valueEl).toBeInTheDocument();
  });

  it("renders SelectSeparator", () => {
    const { container } = render(
      <SelectSeparator />,
    );
    const separator = container.querySelector("[data-slot='select-separator']");
    expect(separator).toBeInTheDocument();
  });
});
