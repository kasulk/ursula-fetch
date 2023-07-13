// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.toNumberOrDashToNull = void 0;
export function toNumberOrDashToNull(value) {
  //  return Number(value) ? Number(value) : null;
  return value === "-" ? null : Number(value);
}
// exports.toNumberOrDashToNull = toNumberOrDashToNull;
