"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/app/lib/utils";

type LegacyConsoleProps = {
  legacyUrl: string;
  className?: string;
};

function useLgViewport() {
  const query = "(min-width: 1024px)";
  return React.useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") return () => undefined;
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () =>
      typeof window !== "undefined" ? window.matchMedia(query).matches : false,
    () => false,
  );
}

function LegacyBootOverlay({ active }: { active: boolean }) {
  const mounted = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const reduced = useReducedMotion();

  if (!mounted || !active) return null;

  return createPortal(
    <motion.div
      role="presentation"
      aria-hidden
      className="legacy-boot-overlay fixed inset-0 z-[600] flex items-center justify-center bg-[#010101]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0.1 : 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] noir-scanlines"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 legacy-boot-vhs"
        aria-hidden
        initial={false}
        animate={
          reduced
            ? {}
            : {
                x: [0, -4, 3, -2, 0],
                skewX: [0, 0.45, -0.28, 0.15, 0],
              }
        }
        transition={{
          duration: 0.92,
          repeat: reduced ? 0 : 2,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(193,18,31,0.14)_0%,transparent_58%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.55 }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.55)_100%)]"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65 }}
        aria-hidden
      />
      <p className="text-label-sm text-noir-muted relative z-[1] px-6 text-center tracking-[0.28em]">
        LOADING ARCHIVED RUNTIME…
      </p>
    </motion.div>,
    document.body,
  );
}

/**
 * LegacyConsole — premium archive device (CSS 3D layers + Framer Motion).
 * Activates a short boot overlay, then assigns `legacyUrl` in-window.
 */
export function LegacyConsole({ legacyUrl, className }: LegacyConsoleProps) {
  const reduced = useReducedMotion();
  const [booting, setBooting] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const heavyEffects = useLgViewport();
  const cinematicMotion = !reduced && heavyEffects;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 26,
    mass: 0.45,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 26,
    mass: 0.45,
  });

  const bootTimerRef = React.useRef<number | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    return () => {
      if (bootTimerRef.current) {
        clearTimeout(bootTimerRef.current);
      }
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const resetParallax = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  const handleActivate = React.useCallback(() => {
    if (booting) return;
    setBooting(true);
    const ms = reduced ? 80 : 1350;
    bootTimerRef.current = window.setTimeout(() => {
      bootTimerRef.current = null;
      window.location.assign(legacyUrl);
    }, ms);
  }, [booting, legacyUrl, reduced]);

  const ventSlits = React.useMemo(
    () => Array.from({ length: 22 }, (_, i) => i),
    [],
  );

  const consoleId = React.useId();
  const hintId = `${consoleId}-hint`;

  return (
    <>
      <LegacyBootOverlay active={booting} />

      <div
        ref={wrapRef}
        className={cn(
          "relative mx-auto w-full max-w-[440px] px-1",
          "[perspective:1600px] [perspective-origin:50%_38%]",
          className,
        )}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={resetParallax}
        onPointerCancel={resetParallax}
      >
        <motion.div
          className="relative"
          animate={
            cinematicMotion
              ? {
                  y: [0, -6, 0],
                }
              : false
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={reduced ? undefined : { y: -4 }}
        >
          {/* Idle chassis drift — separate layer from pointer parallax */}
          <motion.div
            className="relative origin-center [transform-style:preserve-3d]"
            animate={
              cinematicMotion ? { rotateZ: [0, 0.4, 0, -0.32, 0] } : false
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="relative origin-center"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ground shadow mass (depth cue) */}
              <div
                aria-hidden
                className="absolute -bottom-1.5 left-[5%] right-[5%] h-5 rounded-none bg-gradient-to-b from-black via-black to-transparent opacity-[0.92] shadow-[0_22px_48px_rgba(0,0,0,0.9)]"
                style={{ transform: "translateZ(-36px) scale(0.98, 0.85)" }}
              />

              {/* Deep back plane — volumetric recess */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[10px] -z-10 border border-black/80 bg-gradient-to-br from-[#080808] to-[#010101] shadow-[inset_0_0_60px_rgba(0,0,0,0.95)]"
                style={{
                  transform: "translateZ(-26px) scale(1.02)",
                }}
              />

              <div
                role="group"
                aria-label="Archive terminal device"
                className="group/console relative mx-auto [transform-style:preserve-3d]"
                style={{
                  transform: "translateZ(0)",
                  minHeight: 312,
                }}
              >
                {/* Devkit side modules */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[-14px] top-[18%] h-[52%] w-3 border border-noir-border/20 bg-gradient-to-r from-[#0c0c0c] to-[#030303] shadow-[inset_0_0_12px_rgba(0,0,0,0.85)]"
                  style={{ transform: "translateZ(-12px) rotateY(12deg)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-14px] top-[18%] h-[52%] w-3 border border-noir-border/20 bg-gradient-to-l from-[#0c0c0c] to-[#030303] shadow-[inset_0_0_12px_rgba(0,0,0,0.85)]"
                  style={{ transform: "translateZ(-12px) rotateY(-12deg)" }}
                />

                {/* Main chassis */}
                <div className="relative overflow-hidden border border-noir-border/90 bg-gradient-to-br from-[#121212] via-[#060606] to-[#020202] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),inset_0_-28px_56px_rgba(0,0,0,0.72),0_16px_48px_rgba(0,0,0,0.55)]">
                  {/* Brushed + armored top rail */}
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 top-0 h-6 bg-gradient-to-b from-[#1e1e1e] via-[#101010] to-transparent opacity-[0.92]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 top-0 h-6 opacity-[0.09]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(245,245,240,0.35) 1px, rgba(245,245,240,0.35) 2px)",
                    }}
                  />

                  {/* Vent grille */}
                  <div
                    aria-hidden
                    className="absolute left-3 right-3 top-6 flex h-5 items-center justify-between gap-px opacity-[0.55]"
                  >
                    {ventSlits.map((i) => (
                      <span
                        key={i}
                        className="h-3.5 flex-1 bg-gradient-to-b from-noir-border/80 to-transparent"
                      />
                    ))}
                  </div>

                  {/* Specular sweep (aerospace chamfer read) */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 transition-opacity duration-700",
                      hovered ? "opacity-[0.1]" : "opacity-[0.055]",
                    )}
                    style={{
                      backgroundImage:
                        "linear-gradient(118deg, transparent 38%, rgba(245,245,240,0.95) 49%, transparent 60%)",
                    }}
                  />

                  {/* Cinematic edge spill */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-8 top-1/4 h-1/2 w-24 bg-[radial-gradient(ellipse_at_center,rgba(193,18,31,0.04)_0%,transparent_70%)] blur-sm"
                  />

                  {/* Screen stack */}
                  <div className="relative z-[1] mt-[3.25rem] px-4 pb-[4.5rem] pt-1">
                    <div
                      aria-hidden
                      className="border border-noir-border/40 bg-gradient-to-b from-[#080808] to-[#010101] p-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.82)]"
                    >
                      <div
                        className={cn(
                          "legacy-console-crt relative min-h-[148px] overflow-hidden border border-noir-border/30 bg-[#010101] px-3.5 py-4 noir-scanlines",
                          "shadow-[inset_0_0_56px_rgba(0,0,0,0.94),0_0_28px_rgba(245,245,240,0.055)]",
                        )}
                      >
                        {/* Live legacy interface render (old system running inside the device) */}
                        <div
                          aria-hidden
                          className="absolute inset-[10px] overflow-hidden border border-black/60 bg-[#030305] shadow-[inset_0_0_0_1px_rgba(245,245,240,0.04)]"
                        >
                          <div
                            className={cn(
                              "absolute inset-0 transition-[filter,opacity] duration-700",
                              hovered
                                ? "opacity-[0.96] [filter:brightness(1.08)_contrast(1.04)_saturate(1.05)]"
                                : "opacity-[0.9] [filter:brightness(0.98)_contrast(1.02)_saturate(1.02)]",
                            )}
                          >
                            <Image
                              src="/images/old-web.png"
                              alt="Legacy portfolio interface preview"
                              fill
                              sizes="(max-width: 640px) 320px, 360px"
                              className="object-contain"
                              priority={false}
                            />
                          </div>

                          {/* Subtle chromatic aberration — desktop only (avoids triple decode on phones) */}
                          {heavyEffects ? (
                            <>
                              <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
                              >
                                <Image
                                  src="/images/old-web.png"
                                  alt=""
                                  fill
                                  sizes="(max-width: 640px) 320px, 360px"
                                  className="object-contain [filter:hue-rotate(165deg)_saturate(1.2)] translate-x-[0.6px]"
                                />
                              </div>
                              <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
                              >
                                <Image
                                  src="/images/old-web.png"
                                  alt=""
                                  fill
                                  sizes="(max-width: 640px) 320px, 360px"
                                  className="object-contain [filter:hue-rotate(-12deg)_saturate(1.15)] -translate-x-[0.5px]"
                                />
                              </div>
                            </>
                          ) : null}
                        </div>

                        {/* CRT phosphor pool */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(245,245,240,0.16)_0%,transparent_65%)] opacity-85 mix-blend-screen"
                        />
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_118%,rgba(193,18,31,0.09)_0%,transparent_48%)]"
                          animate={
                            cinematicMotion
                              ? { opacity: [0.4, 0.78, 0.52, 0.7, 0.42] }
                              : false
                          }
                          transition={{
                            duration: 6.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 legacy-console-crt-glow opacity-80 mix-blend-soft-light"
                          animate={
                            reduced ? undefined : { opacity: hovered ? 0.98 : 0.8 }
                          }
                          transition={{ duration: 0.55, ease: "easeOut" }}
                        />

                        {/* Screen HUD (tiny + restrained) */}
                        <div className="pointer-events-none absolute left-[14px] top-[14px] z-[2] flex flex-col gap-1">
                          <p className="text-label text-noir-red opacity-90">
                            ARCHIVE TERMINAL
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-noir-fg-soft/90 [text-shadow:0_0_18px_rgba(245,245,240,0.28)]">
                            PREVIOUS SYSTEM VERSION
                          </p>
                        </div>
                        <div className="pointer-events-none absolute left-[14px] bottom-[14px] z-[2]">
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-noir-muted transition-colors duration-500 group-hover/console:text-noir-fg-soft">
                            PRESS TO ENTER
                          </p>
                        </div>

                        {/* Smoked glass veil */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-black/45"
                        />

                        {/* Curvature + vignette + cyan spill */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,rgba(0,0,0,0.65)_72%,rgba(0,0,0,0.92)_100%)]"
                        />
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(56,189,248,0.10)_0%,transparent_58%)] mix-blend-screen"
                          animate={
                            cinematicMotion
                              ? {
                                  opacity: hovered
                                    ? [0.36, 0.55, 0.42, 0.58, 0.4]
                                    : [0.22, 0.32, 0.25, 0.34, 0.24],
                                }
                              : false
                          }
                          transition={{
                            duration: hovered ? 3.2 : 5.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Analog grain + micro flicker */}
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 20% 30%, rgba(245,245,240,0.08) 0px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(245,245,240,0.06) 0px, transparent 2px), radial-gradient(circle at 45% 80%, rgba(245,245,240,0.05) 0px, transparent 2px)",
                            backgroundSize: "36px 36px",
                          }}
                          animate={
                            cinematicMotion
                              ? {
                                  opacity: hovered
                                    ? [0.08, 0.16, 0.1, 0.18, 0.12]
                                    : [0.06, 0.12, 0.08, 0.13, 0.07],
                                }
                              : false
                          }
                          transition={{
                            duration: hovered ? 1.8 : 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* VHS roll bar (very subtle) */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-noir-fg/25 to-transparent opacity-30 legacy-console-crt-roll"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Control deck — tactile hardware row */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] flex h-[3.5rem] items-center gap-3 border-t border-noir-border/30 bg-gradient-to-r from-[#111111] via-[#050505] to-[#0b0b0b] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <motion.span
                      className="size-1.5 shrink-0 bg-noir-red shadow-[0_0_12px_rgba(193,18,31,0.6)]"
                      animate={
                        cinematicMotion
                          ? hovered
                            ? { opacity: [1, 0.72, 1, 0.86, 1] }
                            : { opacity: [1, 0.3, 1, 0.55, 1] }
                          : false
                      }
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.span
                      className="size-1.5 shrink-0 bg-[#c9a227]/90 shadow-[0_0_10px_rgba(201,162,39,0.42)]"
                      animate={
                        cinematicMotion
                          ? hovered
                            ? { opacity: [1, 0.82, 1, 0.9] }
                            : { opacity: [0.85, 1, 0.65, 1] }
                          : false
                      }
                      transition={{
                        duration: 5.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <span className="text-[9px] uppercase tracking-[0.22em] text-noir-faint">
                      PWR
                    </span>

                    <div
                      className={cn(
                        "ml-0.5 flex size-10 shrink-0 items-center justify-center border border-noir-faint/55 bg-gradient-to-br from-[#181818] to-[#040404]",
                        "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow,transform] duration-500",
                        "group-hover/console:border-noir-red/80 group-hover/console:shadow-[0_0_22px_rgba(193,18,31,0.28),inset_0_0_0_1px_rgba(0,0,0,0.85)]",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2.5 rounded-none bg-noir-faint shadow-[0_0_14px_rgba(245,245,240,0.25)] transition-all duration-500",
                          "group-hover/console:bg-noir-red group-hover/console:shadow-[0_0_18px_rgba(193,18,31,0.55)] group-hover/console:scale-95",
                        )}
                      />
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                      {/* Rotary encoder */}
                      <motion.div
                        aria-hidden
                        className="relative size-7 shrink-0 rounded-none border border-noir-border/45 bg-[conic-gradient(from_180deg,#141414,#050505,#101010,#050505)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.75),0_1px_0_rgba(255,255,255,0.04)]"
                        animate={cinematicMotion ? { rotate: 360 } : false}
                        transition={{
                          duration: 96,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="absolute inset-[3px] border border-black/60 bg-gradient-to-br from-[#1a1a1a] to-[#060606]" />
                        <div className="absolute left-1/2 top-1 h-1 w-px -translate-x-1/2 bg-noir-faint/80" />
                      </motion.div>

                      <div
                        className={cn(
                          "size-7 shrink-0 border border-noir-border/45 bg-gradient-to-b from-[#151515] to-[#050505]",
                          "shadow-[inset_0_3px_5px_rgba(0,0,0,0.78)] transition-[border-color,box-shadow] duration-500",
                          "group-hover/console:border-noir-border group-hover/console:shadow-[inset_0_3px_5px_rgba(0,0,0,0.78),0_0_12px_rgba(245,245,240,0.04)]",
                        )}
                      />
                    </div>
                  </div>

                  {/* Mil-spec corner brackets */}
                  <div className="pointer-events-none absolute left-2.5 top-[2.85rem] size-3.5 border-l border-t border-noir-faint/45" />
                  <div className="pointer-events-none absolute right-2.5 top-[2.85rem] size-3.5 border-r border-t border-noir-faint/45" />

                  {/* Hex bolt heads — micro detail */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-[3.65rem] left-3 size-1.5 rotate-45 border border-noir-faint/25 bg-[#0a0a0a]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-[3.65rem] right-3 size-1.5 rotate-45 border border-noir-faint/25 bg-[#0a0a0a]"
                  />
                </div>

                {/* Primary hit: CRT + upper chassis */}
                <button
                  type="button"
                  onClick={handleActivate}
                  disabled={booting}
                  aria-busy={booting}
                  aria-describedby={hintId}
                  aria-label="Enter legacy portfolio — activate archive terminal screen"
                  className={cn(
                    "absolute inset-x-0 top-0 bottom-[3.5rem] z-[5] cursor-pointer border-0 bg-transparent p-0",
                    "min-h-[196px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-noir-fg",
                    booting && "pointer-events-none",
                  )}
                />

                {/* Secondary hit: power deck (non-primary tab stop) */}
                <button
                  type="button"
                  onClick={handleActivate}
                  disabled={booting}
                  tabIndex={-1}
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-0 right-0 z-[5] h-[3.5rem] cursor-pointer border-0 bg-transparent p-0 opacity-0",
                    booting && "pointer-events-none",
                  )}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <p
          id={hintId}
          className="mt-4 text-center text-label-sm text-noir-faint"
        >
          Deploy previous interface — screen or POWER deck (archived system
          opens in this window).
        </p>
      </div>
    </>
  );
}
