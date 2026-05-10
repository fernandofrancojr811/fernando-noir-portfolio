import * as React from "react";
import { EditorialSection } from "@/app/components/primitives/editorial-section";
import { hobbies } from "@/app/data/hobbies";
import { pad } from "@/app/lib/utils";

export function Hobbies() {
  return (
    <EditorialSection
      id="hobbies"
      eyebrow="// 06 — OFF-DUTY"
      headline={
        <>
          OFF-DUTY
          <br />
          RECORDS.
        </>
      }
      deck="Personal logs: sport, building, training, ventures, game systems, and interface craft — off-network, on record."
      meta={<>./var/personal/off-duty</>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {hobbies.map((h, i) => (
          <article
            key={h.name}
            className="border border-noir-border bg-noir-pane p-5 sm:p-6 flex flex-col gap-4 min-h-[260px]"
          >
            <header className="flex items-center justify-between gap-3 border-b border-noir-border pb-3">
              <span className="text-label-sm text-noir-muted">
                LOG // {pad(i + 1)}
              </span>
              <span className="text-label-sm text-noir-red">[ ON ]</span>
            </header>

            <h3 className="font-display text-noir-fg text-3xl tracking-[-0.02em] leading-[1]">
              {h.name}
            </h3>

            <p className="text-label-sm text-noir-faint">{h.log}</p>

            <p className="text-[13px] leading-relaxed text-noir-fg-soft flex-1">
              {h.body}
            </p>

            <p className="text-label-sm text-noir-fg border-t border-noir-border pt-3">
              {h.stat}
            </p>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}
