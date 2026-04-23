export function obtenerPorcentaje(totalHabits: number, completedCount: number) {
  return Math.round((completedCount / totalHabits) * 100);
}
