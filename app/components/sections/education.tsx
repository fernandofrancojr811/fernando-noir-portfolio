import * as React from "react";
import { EditorialSection } from "@/app/components/primitives/editorial-section";
import { TerminalWindow } from "@/app/components/primitives/terminal-window";
import { education } from "@/app/data/education";

export function Education() {
  return (
    <EditorialSection
      id="education"
      eyebrow="// 03 — OFFICIAL RECORD"
      headline={
        <>
          THE
          <br />
          RECORD.
        </>
      }
      deck="Formal credentialing: computer science core, systems-heavy coursework, and SHPE-aligned engagement on campus."
      meta={<>./var/records/education</>}
    >
      <div className="space-y-10">
        {education.map((edu, i) => (
          <article
            key={`${edu.institution}-${i}`}
            className="border border-noir-border bg-noir-pane"
          >
            {/* Header band */}
            <header className="flex flex-wrap items-end justify-between gap-4 border-b border-noir-border p-5 sm:p-6">
              <div>
                <p className="text-label text-noir-red mb-3">
                  CERTIFIED RECORD &nbsp;//&nbsp; INSTITUTIONAL FILING
                </p>
                <h3 className="font-display text-noir-fg text-3xl sm:text-5xl tracking-[-0.02em] leading-[0.95]">
                  {edu.institution}
                </h3>
                <p className="mt-3 text-label text-noir-fg-soft">
                  {edu.degree}
                </p>
              </div>
              <div className="text-right">
                <p className="text-label-sm text-noir-muted">{edu.location}</p>
                <p className="mt-1.5 text-label text-noir-fg">
                  {edu.graduation}
                </p>
                {edu.honors && (
                  <p className="mt-1.5 text-label-sm text-noir-red">
                    {edu.honors}
                  </p>
                )}
              </div>
            </header>

            {/* Body — coursework + leadership */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-noir-border">
              <div className="p-5 sm:p-6">
                <p className="text-label-sm text-noir-muted mb-4">
                  RELEVANT COURSEWORK
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {edu.coursework.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-label text-noir-fg-soft"
                    >
                      <span className="text-noir-faint mt-[2px]" aria-hidden>
                        ▸
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 sm:p-6 border-t lg:border-t-0 border-noir-border">
                <TerminalWindow
                  headerless
                  className="h-full bg-noir-bg"
                  contentClassName="p-4 sm:p-5"
                >
                  <p className="text-label-sm text-noir-muted mb-3">
                    {`> cat ./leadership.log`}
                  </p>
                  <ul className="space-y-2.5">
                    {(edu.leadership ?? []).map((l, j) => (
                      <li
                        key={j}
                        className="text-prompt text-noir-fg-soft flex gap-3"
                      >
                        <span className="text-noir-red shrink-0">●</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </TerminalWindow>
              </div>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}
