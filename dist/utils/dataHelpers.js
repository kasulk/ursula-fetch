export function toNumberOrDashToNull(value) {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) ? parsedValue : null;
}
