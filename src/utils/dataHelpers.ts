export function toNumberOrDashToNull(value: string): number | null {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) ? parsedValue : null;
}
