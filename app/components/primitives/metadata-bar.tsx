import * as React from "react";
import { cn } from "@/app/lib/utils";

export type MetadataItem =
  | {
      label: string;
      value: React.ReactNode;
      accent?: "default" | "red";
    }
  | { divider: true };

type MetadataBarProps = {
  items: MetadataItem[];
  className?: string;
  /** Visual treatment. `bordered` = top+bottom border + padding. `plain` = inline. */
  variant?: "bordered" | "plain";
  /** When true, condense item rendering to a single line with `//` separators. */
  inline?: boolean;
};

/**
 * MetadataBar — terminal/system-style row of `LABEL: VALUE` pairs,
 * used for mastheads, role headers, project metadata, etc.
 */
export function MetadataBar({
  items,
  className,
  variant = "bordered",
  inline = false,
}: MetadataBarProps) {
  return (
    <div
      className={cn(
        variant === "bordered" && "border-y border-noir-border py-2.5 px-3",
        "flex flex-wrap items-center gap-x-5 gap-y-2",
        className,
      )}
    >
      {items.map((item, i) => {
        if ("divider" in item) {
          return (
            <span
              key={`d-${i}`}
              aria-hidden
              className="text-noir-faint text-label-sm"
            >
              {"//"}
            </span>
          );
        }
        return (
          <span
            key={`${item.label}-${i}`}
            className={cn(
              "inline-flex items-baseline gap-2",
              inline && "whitespace-nowrap",
            )}
          >
            <span className="text-label-sm text-noir-muted">{item.label}</span>
            <span
              className={cn(
                "text-label-sm",
                item.accent === "red" ? "text-noir-red" : "text-noir-fg",
              )}
            >
              {item.value}
            </span>
          </span>
        );
      })}
    </div>
  );
}
