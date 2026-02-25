/**
 * For games UI: treat null/undefined as 0 so we always display a number.
 * Use when rendering numeric values (score, pill value, problem operands, etc.).
 */
export function toDisplayNumber(value: number | null | undefined): number {
  return value ?? 0;
}

/**
 * For games UI: treat null/undefined/empty string as 0 for display.
 * Use for values that may be string or number (e.g. NumberPill).
 */
export function toDisplayValue(value: string | number | null | undefined): string | number {
  if (value == null || value === "") return 0;
  return value;
}

/**
 * Fisher–Yates shuffle. Returns a new array with elements randomly reordered.
 */
export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
