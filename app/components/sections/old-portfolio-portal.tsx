import dynamic from "next/dynamic";
import { CommandButton } from "@/app/components/primitives/command-button";
import { siteConfig } from "@/app/lib/config";

const LegacyConsole = dynamic(
  () =>
    import("@/app/components/primitives/legacy-console").then(
      (mod) => mod.LegacyConsole,
    ),
  {
    loading: () => (
      <div
        className="mx-auto w-full max-w-[440px] min-h-[360px] border border-noir-border/40 bg-noir-bg-deep/80"
        aria-hidden
      />
    ),
  },
);

export function OldPortfolioPortal() {
  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className="relative scroll-mt-6 py-20 sm:py-28"
    >
      {/* Darker transition zone — end of dossier loop quiets into archive */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-48 sm:h-56 bg-gradient-to-b from-noir-bg via-[#060606] via-noir-bg-deep to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative border border-noir-fg bg-noir-bg-deep">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-noir-fg px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <span className="size-1.5 bg-noir-red" />
              <span className="text-label text-noir-fg">
                ARCHIVE TERMINAL &nbsp;//&nbsp; LEGACY INTERFACE
              </span>
            </div>
            <span className="text-label-sm text-noir-muted">
              BUILD TAG: PRE-NOIR &nbsp;//&nbsp; EXPERIMENTAL UI
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-noir-fg">
            <div className="lg:col-span-5 relative p-8 sm:p-12 flex flex-col items-center justify-center gap-6 border-b lg:border-b-0 border-noir-fg min-h-[380px] noir-scanlines bg-gradient-to-b from-noir-bg-deep via-noir-bg-deep to-black shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(193,18,31,0.06)_0%,transparent_55%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(0,0,0,0.92)_0%,transparent_62%)]"
              />
              <LegacyConsole legacyUrl={siteConfig.oldPortfolioUrl} />
              <p className="relative z-[1] text-label-sm text-noir-muted text-center">
                ./archive/legacy-interface &nbsp;—&nbsp; discovered runtime node
              </p>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col gap-6 justify-center">
              <p className="text-label text-noir-red">
                {"user@archive:~$ open previous-system.version"}
              </p>
              <h2
                id="archive-heading"
                className="font-display text-noir-fg text-5xl sm:text-7xl leading-[0.92] tracking-[-0.025em]"
              >
                LEGACY
                <br />
                <span className="text-noir-fg">INTERFACE.</span>
              </h2>
              <p className="text-noir-muted text-[14px] leading-relaxed max-w-xl">
                A previous generation interface preserved as a living artifact.
                Different interaction language, same engineering craft - a quiet
                system waiting at the end of the dossier.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <CommandButton
                  href={siteConfig.oldPortfolioUrl}
                  variant="solid"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  trailing={<span aria-hidden>↗</span>}
                >
                  ENTER ARCHIVE
                </CommandButton>
                <CommandButton href="#top" variant="ghost" size="lg">
                  RETURN TO DOSSIER
                </CommandButton>
              </div>

              <p className="mt-4 text-label-sm text-noir-faint">
                The archive device above boots the legacy site in this window. The
                command link opens the same archive in a new tab — isolated from
                this dossier by design.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-noir-fg px-4 sm:px-6 py-3">
            <span className="text-label-sm text-noir-muted">
              EOF &nbsp;//&nbsp; ARCHIVE ONLY
            </span>
            <span className="text-label-sm text-noir-muted">
              PREVIOUS SYSTEM VERSION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
