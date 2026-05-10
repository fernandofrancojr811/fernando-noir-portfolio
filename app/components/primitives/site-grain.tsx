import * as React from "react";
import { cn } from "@/app/lib/utils";

/**
 * SiteGrain — a fixed, non-interactive overlay that adds:
 *  - A subtle SVG noise texture (luxury paper feel)
 *  - Faint horizontal scanlines (terminal feel)
 *  - A vignette gradient at the top/bottom for cinematic depth
 *
 * Pointer events are disabled. It sits above content but below
 * focusable UI. Disabled by default under prefers-reduced-motion
 * via the global stylesheet.
 */
export function SiteGrain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[60]",
        "noir-scanlines",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay max-lg:hidden"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
        }}
      />
    </div>
  );
}
