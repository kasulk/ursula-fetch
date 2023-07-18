export function toNumberOrDashToNull(value) {
    //  return Number(value) ? Number(value) : null;
    // return value === "-" ? null : Number(value);
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) ? parsedValue : null;
    // return isNaN(parsedValue) ? null : parsedValue;
}
