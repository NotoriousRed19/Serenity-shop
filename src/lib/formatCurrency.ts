/**
 * Formatea un número como precio en pesos colombianos (COP).
 * Ejemplo: 95000 → "$95.000"
 */
export function formatCOP(value: number): string {
  return "COP " + value.toLocaleString("es-CO", { maximumFractionDigits: 0 });
}
