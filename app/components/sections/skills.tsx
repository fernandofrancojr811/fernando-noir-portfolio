import * as React from "react";
import { EditorialSection } from "@/app/components/primitives/editorial-section";
import { TerminalWindow } from "@/app/components/primitives/terminal-window";
import { skillCategories } from "@/app/data/skills";

export function Skills() {
  return (
    <EditorialSection
      id="skills"
      eyebrow={"// 04 — CAPABILITY MAP"}
      headline={
        <>
          TECHNICAL
          <br />
          <span className="text-noir-muted">BASELINE.</span>
        </>
      }
      deck="Languages, embedded systems, cloud, networking, full-stack delivery, and the process tooling that keeps engineering outputs auditable."
      meta={
        <>
          {skillCategories.length} COLUMNS &nbsp;//&nbsp; ./etc/capabilities.d
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {skillCategories.map((cat) => (
          <TerminalWindow
            key={cat.id}
            title={`~/skills/${cat.id}`}
            rightMeta="ro"
            className="h-full"
            contentClassName="p-4 sm:p-5"
          >
            <p className="text-label-sm text-noir-red mb-3">{cat.label}</p>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="text-prompt text-noir-fg-soft flex gap-2"
                >
                  <span className="text-noir-faint shrink-0" aria-hidden>
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalWindow>
        ))}
      </div>
    </EditorialSection>
  );
}
