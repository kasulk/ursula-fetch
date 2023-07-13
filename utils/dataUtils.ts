export function toNumberOrDashToNull(value: string): number | null {
  //  return Number(value) ? Number(value) : null;
  return value === "-" ? null : Number(value);
}
