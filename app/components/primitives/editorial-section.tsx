import * as React from "react";
import { cn } from "@/app/lib/utils";

type EditorialSectionProps = {
  /** Section anchor id, e.g. "experience" */
  id?: string;
  /** Small mono label that sits above the headline, e.g. `// 02 — EXPERIENCE` */
  eyebrow?: React.ReactNode;
  /** Big serif headline, e.g. "WORK LOG" */
  headline: React.ReactNode;
  /** Optional editorial deck — a single sentence under the headline. */
  deck?: React.ReactNode;
  /** Right-side metadata, e.g. role count, last updated, status. */
  meta?: React.ReactNode;
  /** Spacing variant — `default` for standard sections, `compact` for tighter ones. */
  density?: "default" | "compact";
  className?: string;
  /** When true, no horizontal padding container is added. */
  bare?: boolean;
  children: React.ReactNode;
};

/**
 * EditorialSection — a newspaper-style section header with a serif
 * headline, mono eyebrow + meta, and a thick newspaper rule.
 */
export function EditorialSection({
  id,
  eyebrow,
  headline,
  deck,
  meta,
  density = "default",
  className,
  bare = false,
  children,
}: EditorialSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        density === "default"
          ? "py-12 sm:py-14 md:py-16 lg:py-20"
          : "py-10 sm:py-12 md:py-14 lg:py-16",
        className,
      )}
    >
      <div className={cn(!bare && "mx-auto max-w-7xl px-5 sm:px-8")}>
        <header className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-end justify-between gap-6 mb-5">
            {eyebrow && (
              <span className="text-label text-noir-red">{eyebrow}</span>
            )}
            {meta && (
              <span className="text-label-sm text-noir-muted text-right">
                {meta}
              </span>
            )}
          </div>
          <div className="noir-rule-double mb-6" />
          <h2
            className={cn(
              "text-editorial text-noir-fg",
              "text-5xl sm:text-7xl lg:text-8xl",
              "font-medium",
            )}
          >
            {headline}
          </h2>
          {deck && (
            <p className="mt-5 max-w-3xl text-noir-muted font-mono text-sm sm:text-[13px] leading-relaxed">
              {deck}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
