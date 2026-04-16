
export function formatCOP(value: number): string {
  return "COP " + value.toLocaleString("es-CO", { maximumFractionDigits: 0 });
}
