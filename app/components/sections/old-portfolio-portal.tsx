import * as React from "react";
import { CommandButton } from "@/app/components/primitives/command-button";
import { siteConfig } from "@/app/lib/config";

/**
 * Console3D — pure-CSS 3D rotating console placeholder.
 * - 6 faces, sharp corners, off-white edges only.
 * - Uses a slow rotation animation defined in globals.css.
 * - No images, no shadows. Decorative — aria-hidden.
 */
function Console3D() {
  const size = 220;
  const half = size / 2;
  const faceBase =
    "absolute inset-0 border border-noir-border bg-noir-bg-deep flex items-center justify-center text-label-sm text-noir-muted";

  return (
    <div
      aria-hidden
      className="relative mx-auto"
      style={{
        width: size,
        height: size,
        perspective: "1200px",
      }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          animation: "noir-spin-slow 22s linear infinite",
        }}
      >
        <div
          className={faceBase}
          style={{ transform: `translateZ(${half}px)` }}
        >
          <div className="flex flex-col items-center gap-3 px-3 text-center">
            <span className="text-label text-noir-red">[ ARCHIVE ]</span>
            <span className="font-display text-noir-fg text-2xl leading-none tracking-[-0.02em]">
              TERMINAL
            </span>
            <span className="text-label-sm text-noir-faint">
              PREVIOUS SYSTEM VERSION
            </span>
            <span className="size-1.5 bg-noir-red" />
          </div>
        </div>
        <div
          className={faceBase}
          style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
        >
          <span className="text-label text-noir-fg-soft">REAR I/O</span>
        </div>
        <div
          className={faceBase}
          style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
        >
          <span className="text-label text-noir-fg-soft">SIDE A</span>
        </div>
        <div
          className={faceBase}
          style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
        >
          <span className="text-label text-noir-fg-soft">SIDE B</span>
        </div>
        <div
          className={faceBase}
          style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
        >
          <span className="text-label text-noir-fg-soft">VENT</span>
        </div>
        <div
          className={faceBase}
          style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
        >
          <span className="text-label text-noir-fg-soft">BASE</span>
        </div>
      </div>
    </div>
  );
}

export function OldPortfolioPortal() {
  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className="relative py-20 sm:py-28"
    >
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
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col items-center justify-center gap-6 border-b lg:border-b-0 border-noir-fg min-h-[360px] noir-scanlines">
              <Console3D />
              <p className="text-label-sm text-noir-muted text-center">
                ./archive/legacy-interface &nbsp;—&nbsp; standalone runtime
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
                An earlier creative environment — different visual system,
                different interaction model, same underlying engineering habit.
                Experimental archive; nostalgic by intent, not polished to
                program standards.
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
                Opens in a new tab. Isolated from this dossier — by design.
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
