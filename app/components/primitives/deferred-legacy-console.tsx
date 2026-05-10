"use client";

import * as React from "react";
import { LegacyConsole } from "@/app/components/primitives/legacy-console";

type DeferredLegacyConsoleProps = {
  legacyUrl: string;
};

/**
 * Mounts the archive console only when it nears the viewport so mobile
 * first paint avoids decoding three stacked CRT images and heavy motion.
 */
export function DeferredLegacyConsole({ legacyUrl }: DeferredLegacyConsoleProps) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el || active) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "160px 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <div ref={hostRef} className="mx-auto w-full max-w-[440px] min-h-[360px]">
      {active ? (
        <LegacyConsole legacyUrl={legacyUrl} />
      ) : (
        <div
          className="mx-auto w-full max-w-[440px] min-h-[360px] border border-noir-border/40 bg-noir-bg-deep/80"
          aria-hidden
        />
      )}
    </div>
  );
}
