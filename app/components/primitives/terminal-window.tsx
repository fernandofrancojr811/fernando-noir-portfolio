import * as React from "react";
import { cn } from "@/app/lib/utils";

type TerminalWindowProps = {
  /** Title shown in the title bar, e.g. `user@portfolio:~/experience` */
  title?: string;
  /** Right-side meta text, e.g. `tty1 // 80x24` */
  rightMeta?: React.ReactNode;
  /** Optional className for the outer wrapper. */
  className?: string;
  /** Optional className for the inner content area. */
  contentClassName?: string;
  /** When false, omits the traffic-light dots. Default true. */
  showDots?: boolean;
  /** Hide the header entirely. */
  headerless?: boolean;
  children: React.ReactNode;
};

/**
 * TerminalWindow — a black pane with a title bar that mimics a
 * minimal tty. Used to wrap command-style content blocks.
 */
export function TerminalWindow({
  title = "user@portfolio:~$",
  rightMeta,
  className,
  contentClassName,
  showDots = true,
  headerless = false,
  children,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "border border-noir-border bg-noir-bg-deep",
        "flex flex-col",
        className,
      )}
    >
      {!headerless && (
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            "border-b border-noir-border",
            "px-3 py-2",
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            {showDots && (
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
                <span className="size-2 border border-noir-border" />
                <span className="size-2 border border-noir-border" />
                <span className="size-2 border border-noir-border" />
              </div>
            )}
            <span className="text-label-sm text-noir-muted truncate">
              {title}
            </span>
          </div>
          {rightMeta && (
            <span className="text-label-sm text-noir-faint shrink-0">
              {rightMeta}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "p-4 sm:p-5 font-mono text-sm leading-relaxed text-noir-fg-soft",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Convenience: a single prompt line, e.g. `$ open experience.log`. */
export function TerminalPrompt({
  user = "user@portfolio",
  cwd = "~",
  command,
  cursor = false,
  className,
}: {
  user?: string;
  cwd?: string;
  command: React.ReactNode;
  cursor?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("text-prompt", className)}>
      <span className="text-noir-muted">{user}</span>
      <span className="text-noir-faint">:</span>
      <span className="text-noir-muted">{cwd}</span>
      <span className="text-noir-red">$</span>{" "}
      <span className={cn("text-noir-fg", cursor && "noir-cursor")}>
        {command}
      </span>
    </p>
  );
}
