export function toNumberOrDashToNull(value: string): number | null {
  //  return Number(value) ? Number(value) : null;
  // return value === "-" ? null : Number(value);
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) ? parsedValue : null;
  // return isNaN(parsedValue) ? null : parsedValue;
}
