import * as React from "react";
import { cn } from "@/app/lib/utils";

type SectionTickerProps = {
  /** Items to scroll. Each item rendered as a discrete unit, separated by ◆. */
  items: React.ReactNode[];
  /** When true, prefix the row with a red dot status indicator. Default true. */
  showStatusDot?: boolean;
  className?: string;
};

/**
 * SectionTicker — a thin marquee-style ticker bar. Used to break
 * up sections like the masthead of a newspaper.
 *
 * Scroll animation is paused under prefers-reduced-motion (handled
 * globally in globals.css).
 */
export function SectionTicker({
  items,
  showStatusDot = true,
  className,
}: SectionTickerProps) {
  // Duplicate the list once so the marquee can loop seamlessly.
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative w-full border-y border-noir-border",
        "bg-noir-bg-deep overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center gap-4 px-3 py-2.5">
        {showStatusDot && (
          <span className="flex items-center gap-2 shrink-0">
            <span className="size-1.5 bg-noir-red" />
            <span className="text-label-sm text-noir-red">LIVE</span>
          </span>
        )}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="noir-marquee flex gap-8 whitespace-nowrap will-change-transform"
            style={{ width: "200%" }}
          >
            {doubled.map((item, i) => (
              <span
                key={i}
                className="text-label-sm text-noir-muted inline-flex items-center gap-3 shrink-0"
              >
                <span className="text-noir-faint">◆</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
