import i18n from "@/i18n";
import { todayFormat } from "@/lib/todayFormat";

describe("todayFormat", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns formatted date in es-MX locale", () => {
    const fixedDate = new Date(2025, 5, 10);
    vi.setSystemTime(fixedDate);

    const result = todayFormat();

    expect(result).toMatch(/^\w+,\s+\d{1,2}\s+\w+$/);
  });

  it("contains day number", () => {
    const fixedDate = new Date(2025, 5, 10);
    vi.setSystemTime(fixedDate);

    const result = todayFormat();

    expect(result).toContain("10");
  });

  it("capitalizes first letter of weekday and month", () => {
    const fixedDate = new Date(2025, 5, 10);
    vi.setSystemTime(fixedDate);

    const result = todayFormat();

    const parts = result.split(/[,\s]+/).filter(Boolean);
    expect(parts[0][0]).toBe(parts[0][0].toUpperCase());
    expect(parts[2][0]).toBe(parts[2][0].toUpperCase());
  });

  it("uses i18n current language", () => {
    const originalLng = i18n.language;
    i18n.language = "en-US";
    const fixedDate = new Date(2025, 5, 10);
    vi.setSystemTime(fixedDate);

    const result = todayFormat();

    expect(result).not.toBe("");
    i18n.language = originalLng;
  });
});
