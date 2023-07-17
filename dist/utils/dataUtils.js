export function toNumberOrDashToNull(value) {
    //  return Number(value) ? Number(value) : null;
    return value === "-" ? null : Number(value);
}
