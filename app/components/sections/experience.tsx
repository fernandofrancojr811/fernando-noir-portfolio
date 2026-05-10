import * as React from "react";
import { EditorialSection } from "@/app/components/primitives/editorial-section";
import { DossierCard } from "@/app/components/primitives/dossier-card";
import { experience, type ExperienceStatus } from "@/app/data/experience";
import { pad } from "@/app/lib/utils";

const statusAccent: Record<ExperienceStatus, "default" | "red"> = {
  ACTIVE: "red",
  ARCHIVED: "default",
  OK: "default",
  CLASSIFIED: "red",
};

export function Experience() {
  return (
    <EditorialSection
      id="experience"
      eyebrow="// 02 — WORK LOG"
      headline={
        <>
          WORK
          <br />
          <span className="text-noir-muted">LOG.</span>
        </>
      }
      deck="Engineering system log: flight software, embedded optimization, and telemetry-backed operations — filed newest first."
      meta={
        <>
          {experience.length} ENTRIES &nbsp;//&nbsp; SORTED: NEWEST FIRST
          <br />
          ./var/log/experience
        </>
      }
    >
      <ol className="space-y-4 md:space-y-5">
        {experience.map((role, i) => (
          <li key={`${role.company}-${i}`}>
            <DossierCard
              label={`./experience/${pad(experience.length - i)}_${role.company
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              status={role.status}
              statusAccent={statusAccent[role.status]}
              padded={false}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-noir-border">
                {/* Left rail — index + meta */}
                <div className="lg:col-span-3 p-5 sm:p-6 flex flex-col gap-3 border-b lg:border-b-0 border-noir-border">
                  <p className="text-label-sm text-noir-faint">
                    No. {pad(experience.length - i)}
                  </p>
                  <p className="text-label text-noir-red">{role.dates}</p>
                  <p className="text-label-sm text-noir-muted">
                    {role.location}
                  </p>
                </div>

                {/* Middle — company / role / impact */}
                <div className="lg:col-span-6 p-5 sm:p-6 flex flex-col gap-4">
                  <header>
                    <h3 className="font-display text-noir-fg text-3xl sm:text-4xl tracking-[-0.02em] leading-[0.95]">
                      {role.company}
                    </h3>
                    <p className="mt-2 text-label text-noir-fg-soft">
                      {role.role}
                    </p>
                    {role.program ? (
                      <p className="mt-1 text-label-sm text-noir-muted">
                        PROGRAM: {role.program}
                      </p>
                    ) : null}
                  </header>

                  <ul className="space-y-2.5 mt-1">
                    {role.impact.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[13px] text-noir-fg-soft leading-relaxed"
                      >
                        <span className="text-noir-red shrink-0 select-none mt-[2px]">
                          ›
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right rail — stack */}
                <div className="lg:col-span-3 p-5 sm:p-6 flex flex-col gap-3 border-t lg:border-t-0 border-noir-border">
                  <p className="text-label-sm text-noir-muted">
                    STACK / RUNTIME
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {role.stack.map((s) => (
                      <li
                        key={s}
                        className="text-label-sm text-noir-fg border border-noir-border px-2 py-1.5"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DossierCard>
          </li>
        ))}
      </ol>
    </EditorialSection>
  );
}
