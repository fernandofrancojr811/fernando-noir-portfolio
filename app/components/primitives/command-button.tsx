import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * CommandButton — a terminal-style "[ COMMAND ]" button.
 * - Sharp 1px border by default.
 * - Hover inverts to filled foreground / black text.
 * - `red` variant for the single emphasis CTA.
 * - Renders as <a> if `href` is provided, otherwise <button>.
 */
const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-mono uppercase tracking-[0.2em]",
    "border transition-colors duration-150",
    "select-none whitespace-nowrap",
    "min-h-[44px]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-noir-fg",
    "disabled:opacity-40 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-noir-fg text-noir-fg bg-transparent",
          "hover:bg-noir-fg hover:text-noir-bg",
        ],
        ghost: [
          "border-noir-border text-noir-fg-soft bg-transparent",
          "hover:border-noir-fg hover:text-noir-fg",
        ],
        red: [
          "border-noir-red text-noir-red bg-transparent",
          "hover:bg-noir-red hover:text-noir-fg",
        ],
        solid: [
          "border-noir-fg text-noir-bg bg-noir-fg",
          "hover:bg-transparent hover:text-noir-fg",
        ],
      },
      size: {
        sm: "px-3 py-2 text-[10px]",
        md: "px-4 py-2.5 text-[11px]",
        lg: "px-5 py-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type CommonProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  children: React.ReactNode;
  /** When true, decorate the label with [ ... ] terminal brackets. Default: true */
  brackets?: boolean;
  /** Optional leading icon. */
  leading?: React.ReactNode;
  /** Optional trailing icon. */
  trailing?: React.ReactNode;
};

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export type CommandButtonProps = AnchorProps | ButtonProps;

export function CommandButton(props: CommandButtonProps) {
  const {
    variant,
    size,
    className,
    children,
    brackets = true,
    leading,
    trailing,
    ...rest
  } = props;

  const content = (
    <>
      {leading ? <span aria-hidden>{leading}</span> : null}
      <span className="inline-flex items-center gap-1.5">
        {brackets ? <span aria-hidden>[</span> : null}
        <span>{children}</span>
        {brackets ? <span aria-hidden>]</span> : null}
      </span>
      {trailing ? <span aria-hidden>{trailing}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={cn(buttonStyles({ variant, size }), className)}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(buttonStyles({ variant, size }), className)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
