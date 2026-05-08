import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class strings with clsx semantics + dedupe.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Pads a numeric index to a fixed width string, e.g. 1 -> "01".
 */
export function pad(n: number, width = 2) {
  return n.toString().padStart(width, "0");
}
