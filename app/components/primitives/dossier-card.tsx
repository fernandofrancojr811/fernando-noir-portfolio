import * as React from "react";
import { cn } from "@/app/lib/utils";

type Status = "OK" | "ACTIVE" | "ARCHIVED" | "CLASSIFIED" | "REDACTED";

type DossierCardProps = {
  /** Top-bar terminal label, e.g. `./experience/raytheon` */
  label?: string;
  /** Short status displayed on the right of the title bar. */
  status?: Status | string;
  /** When set, status badge uses the red accent. */
  statusAccent?: "default" | "red";
  /** Slightly inset content (default true). */
  padded?: boolean;
  className?: string;
  /** Additional classes for the inner content area. */
  contentClassName?: string;
  children: React.ReactNode;
  /** Optional element placed after the title bar. */
  meta?: React.ReactNode;
};

/**
 * DossierCard — sharp rectangular pane with thin off-white border,
 * black background, optional terminal-style title bar and status pill.
 */
export function DossierCard({
  label,
  status,
  statusAccent = "default",
  padded = true,
  className,
  contentClassName,
  meta,
  children,
}: DossierCardProps) {
  return (
    <article
      className={cn(
        "relative border border-noir-border bg-noir-pane",
        "flex flex-col",
        className,
      )}
    >
      {(label || status) && (
        <header
          className={cn(
            "flex items-center justify-between gap-3",
            "border-b border-noir-border",
            "px-3 py-2",
          )}
        >
          {label && (
            <span className="text-label-sm text-noir-muted truncate">
              {label}
            </span>
          )}
          {status && (
            <span
              className={cn(
                "text-label-sm shrink-0 px-2 py-1 border",
                statusAccent === "red"
                  ? "text-noir-red border-noir-red"
                  : "text-noir-fg border-noir-border",
              )}
            >
              [{status}]
            </span>
          )}
        </header>
      )}
      {meta}
      <div
        className={cn(padded ? "p-5 sm:p-6" : "", "flex-1", contentClassName)}
      >
        {children}
      </div>
    </article>
  );
}
