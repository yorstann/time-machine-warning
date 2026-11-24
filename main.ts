import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Funniest Time Machine Warning
// Label" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): the funniest
// warning label you would find bolted onto a time machine.
// Pass 2: the line is split where the cosmic stakes collapse
// into consumer fine print — the most famous paradox in time
// travel, treated as a warranty exclusion. It wins because
// the label never raises its voice: causality itself is just
// another returns policy, and that deadpan is the joke.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ENTRY_BEATS = [
  "WARNING: Killing your grandfather voids the warranty.",
  "Paradoxes are non-refundable.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 120;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
