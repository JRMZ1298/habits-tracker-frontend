import { formatTo12h } from "@/lib/timeFormat";

describe("formatTo12h", () => {
  it("converts midnight to 12:00 AM", () => {
    expect(formatTo12h("00:00")).toBe("12:00 AM");
  });

  it("converts noon to 12:00 PM", () => {
    expect(formatTo12h("12:00")).toBe("12:00 PM");
  });

  it("converts morning hour", () => {
    expect(formatTo12h("07:30")).toBe("7:30 AM");
  });

  it("converts afternoon hour", () => {
    expect(formatTo12h("13:45")).toBe("1:45 PM");
  });

  it("converts late night to AM", () => {
    expect(formatTo12h("23:59")).toBe("11:59 PM");
  });

  it("converts 1 AM correctly", () => {
    expect(formatTo12h("01:15")).toBe("1:15 AM");
  });

  it("handles single-digit minutes", () => {
    expect(formatTo12h("08:05")).toBe("8:05 AM");
  });
});
