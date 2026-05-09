import * as React from "react";
import Image from "next/image";
import { MetadataBar } from "@/app/components/primitives/metadata-bar";
import { TerminalWindow } from "@/app/components/primitives/terminal-window";
import { siteConfig } from "@/app/lib/config";
import { profile } from "@/app/data/profile";

const issueDate = new Date()
  .toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
  .toUpperCase();

export function Hero() {
  const { volume, name: issueName, edition } = siteConfig.issue;

  return (
    <section
      id="top"
      aria-labelledby="hero-headline"
      className="relative pt-8 sm:pt-12 pb-14 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <MetadataBar
          variant="bordered"
          items={[
            { label: "MASTHEAD", value: volume },
            { divider: true },
            { label: "EDITION", value: issueName },
            { divider: true },
            { label: "DESK", value: edition },
            { divider: true },
            {
              label: "STATUS",
              value: profile.status,
              accent: "red",
            },
            { divider: true },
            { label: "FILED", value: issueDate },
          ]}
          className="mb-8"
        />

        <header className="mb-8">
          <p className="text-label text-noir-red mb-5">
            {"// 01 — ENGINEERING DOSSIER"}
          </p>
          <h1
            id="hero-headline"
            className="text-editorial text-noir-fg font-semibold tracking-[-0.03em]"
            style={{
              fontSize: "clamp(3.25rem, 12vw, 11.5rem)",
              lineHeight: 0.86,
            }}
          >
            <span className="block">FERNANDO</span>
            <span className="block">
              FRANCO <span className="text-noir-red">JR.</span>
            </span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-noir-border pt-4">
            <span className="text-label text-noir-fg">{profile.tagline}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 lg:items-stretch">
          <div className="lg:col-span-5">
            <TerminalWindow
              title={profile.shell}
              rightMeta={<>tty1 // 80×24</>}
              contentClassName="p-0 sm:p-0"
              className="h-full"
            >
              <div className="relative h-[25rem] sm:h-[28rem] lg:h-full lg:min-h-[31rem] overflow-hidden rounded-sm border border-noir-border/70 bg-noir-bg-deep">
                <Image
                  src="/images/me.jpeg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover object-[50%_35%] scale-[1.05] opacity-38 blur-[1px]"
                />
                <Image
                  src="/images/me.jpeg"
                  alt="Portrait of Fernando Franco Jr"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover object-[50%_32%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(230,232,240,0.08),transparent_52%),linear-gradient(155deg,rgba(16,19,24,0.42)_0%,rgba(9,11,14,0.24)_45%,rgba(7,8,11,0.52)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-bg/84 via-noir-bg/14 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(245,245,245,0.04)_0,rgba(245,245,245,0.04)_1px,transparent_1px,transparent_3px)] opacity-20 mix-blend-soft-light" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-noir-border/60" />
              </div>
            </TerminalWindow>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="border border-noir-border bg-noir-pane p-5 sm:p-7 h-full flex flex-col">
              <p className="text-label-sm text-noir-muted mb-3">
                LEAD &nbsp;//&nbsp; ABSTRACT
              </p>
              <p className="text-noir-fg font-display text-2xl sm:text-[1.6rem] leading-[1.15] tracking-[-0.01em] italic">
                {profile.heroAbstract}
              </p>
              <p className="mt-5 text-noir-muted text-[13px] leading-relaxed">
                {profile.deck}
              </p>
              <div className="mt-auto pt-8 border-t border-noir-border">
                <p className="text-label-sm text-noir-red mb-4">
                  [ ENGINEERING SUMMARY ]
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  {profile.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-label-sm text-noir-red">[{s.label}]</p>
                      <p className="mt-2 font-display text-[1.35rem] sm:text-[1.5rem] leading-[1.1] text-noir-fg">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
