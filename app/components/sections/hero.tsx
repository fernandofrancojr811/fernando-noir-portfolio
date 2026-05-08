import * as React from "react";
import Image from "next/image";
import { CommandButton } from "@/app/components/primitives/command-button";
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

const FILE_NO = "2026-7741";

export function Hero() {
  const { volume, name: issueName, edition } = siteConfig.issue;

  return (
    <section
      id="top"
      aria-labelledby="hero-headline"
      className="relative pt-10 sm:pt-14 pb-20 sm:pb-28"
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

        <header className="mb-10">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <div className="lg:col-span-5">
            <TerminalWindow
              title={profile.shell}
              rightMeta={<>tty1 // 80×24</>}
              className="h-full"
              contentClassName="p-0 sm:p-0"
            >
              <div className="relative h-full min-h-[24.5rem] overflow-hidden rounded-sm border border-noir-border/70 bg-noir-bg-deep">
                <Image
                  src="/images/me.jpeg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 100vw"
                  className="object-cover object-center scale-[1.04] opacity-38 blur-[1px]"
                />
                <Image
                  src="/images/me.jpeg"
                  alt="Portrait of Fernando Franco Jr"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 100vw"
                  className="object-contain object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(230,232,240,0.08),transparent_52%),linear-gradient(155deg,rgba(16,19,24,0.42)_0%,rgba(9,11,14,0.24)_45%,rgba(7,8,11,0.52)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-bg/84 via-noir-bg/14 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(245,245,245,0.04)_0,rgba(245,245,245,0.04)_1px,transparent_1px,transparent_3px)] opacity-20 mix-blend-soft-light" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-noir-border/60" />
              </div>
            </TerminalWindow>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="border border-noir-border bg-noir-pane p-5 sm:p-6 flex-1 flex flex-col">
              <p className="text-label-sm text-noir-muted mb-3">
                LEAD &nbsp;//&nbsp; ABSTRACT
              </p>
              <p className="text-noir-fg font-display text-2xl sm:text-[1.6rem] leading-[1.15] tracking-[-0.01em] italic">
                {profile.heroAbstract}
              </p>
              <p className="mt-5 text-noir-muted text-[13px] leading-relaxed">
                {profile.deck}
              </p>
              <div className="mt-auto pt-6 grid grid-cols-2 gap-4 border-t border-noir-border">
                {profile.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-label-sm text-noir-muted">{s.label}</p>
                    <p className="mt-1 font-display text-xl text-noir-fg">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="border border-noir-red bg-noir-bg-deep p-5 sm:p-6 flex flex-col">
              <p className="text-label-sm text-noir-red mb-3">
                [ CLASSIFIED ]
              </p>
              <p className="font-display text-noir-fg text-3xl leading-[1] tracking-[-0.02em]">
                <span aria-hidden>“</span>
                {profile.classifiedQuote}
                <span aria-hidden>”</span>
              </p>
              <p className="mt-4 text-label-sm text-noir-muted">
                — FILE No. {FILE_NO}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <CommandButton href="#experience" variant="default" size="lg">
                VIEW EXPERIENCE
              </CommandButton>
              <CommandButton href="#hobbies" variant="default" size="lg">
                OPEN OFF-DUTY
              </CommandButton>
              <CommandButton
                href={profile.links.resume}
                variant="red"
                size="lg"
              >
                OPEN DOSSIER.PDF
              </CommandButton>
              <div className="flex gap-3">
                <CommandButton
                  href={profile.links.github}
                  variant="ghost"
                  size="md"
                  className="flex-1"
                >
                  GITHUB
                </CommandButton>
                <CommandButton
                  href={profile.links.email}
                  variant="ghost"
                  size="md"
                  className="flex-1"
                >
                  CONTACT
                </CommandButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
