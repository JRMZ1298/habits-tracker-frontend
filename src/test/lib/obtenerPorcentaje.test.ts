import { obtenerPorcentaje } from "@/lib/obtenerPorcentaje";

describe("obtenerPorcentaje", () => {
  it("returns 0 when nothing completed", () => {
    expect(obtenerPorcentaje(10, 0)).toBe(0);
  });

  it("returns 100 when all completed", () => {
    expect(obtenerPorcentaje(10, 10)).toBe(100);
  });

  it("returns 50 for half", () => {
    expect(obtenerPorcentaje(10, 5)).toBe(50);
  });

  it("rounds correctly", () => {
    expect(obtenerPorcentaje(3, 1)).toBe(33);
  });

  it("rounds up when appropriate", () => {
    expect(obtenerPorcentaje(3, 2)).toBe(67);
  });

  it("returns 0 when total is 0", () => {
    expect(obtenerPorcentaje(0, 0)).toBe(NaN);
  });
});
