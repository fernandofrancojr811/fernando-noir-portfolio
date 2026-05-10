"use client";

import * as React from "react";

type InfiniteScrollWrapperProps = {
  /**
   * Master enable flag — driven by `siteConfig.infiniteScrollEnabled`.
   * When false, behaves as a passthrough.
   */
  enabled?: boolean;
  children: React.ReactNode;
};

/**
 * Desktop-only: seamless loop duplicates a tall DOM tree; keep it off
 * phones/tablets to avoid jank and unnecessary layout work.
 */
function useDesktopLoopViewport() {
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

/**
 * Subscribes to `prefers-reduced-motion`. Server snapshot is `false`.
 */
function useReducedMotion() {
  return React.useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") return () => undefined;
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () =>
      typeof window === "undefined"
        ? false
        : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * InfiniteScrollWrapper
 *
 * Renders the original content on the server. After mount, appends an
 * inert, aria-hidden visual clone underneath. Then watches scroll
 * position and seamlessly wraps:
 *
 *   - When scrollY >= H (top of clone), jump back to scrollY - H.
 *   - When scrollY <= 1 (top of original), jump forward to scrollY + H.
 *
 * Why this design:
 *   - SEO: the clone is appended client-side, so search engines only
 *     ever index a single copy.
 *   - A11y: the clone has `aria-hidden` and `inert`, removing it from
 *     focus order and screen-reader output.
 *   - Reduced motion: disabled when `prefers-reduced-motion: reduce`.
 *   - Anchor links / hash navigation: when the URL has a hash, we skip
 *     wrapping for a moment so the browser can land on the target.
 *
 * Viewports below the `lg` breakpoint use normal linear scrolling (no
 * duplicate DOM, no scroll wrapping). Wider screens keep the loop when
 * enabled and motion is allowed.
 *
 * If wrapping ever feels off on a given device, set the master flag to
 * false in `lib/config.ts`.
 */
export function InfiniteScrollWrapper({
  enabled = true,
  children,
}: InfiniteScrollWrapperProps) {
  const desktopLoop = useDesktopLoopViewport();
  const reduced = useReducedMotion();
  const originalRef = React.useRef<HTMLDivElement>(null);

  const loopActive = Boolean(enabled && !reduced && desktopLoop);

  // Scroll wrap logic.
  React.useEffect(() => {
    if (!loopActive) return;
    if (typeof window === "undefined") return;

    let originalHeight = 0;
    let isJumping = false;
    let suspendUntil = 0; // ms timestamp — skip wrapping until this time
    let scrollRaf = 0;

    const measure = () => {
      const el = originalRef.current;
      if (el) originalHeight = el.offsetHeight;
    };

    const wrap = () => {
      if (isJumping) return;
      if (originalHeight <= 0) return;
      if (Date.now() < suspendUntil) return;

      const y = window.scrollY;
      const buffer = 2;

      if (y >= originalHeight) {
        // We've scrolled into the clone — jump back into the original
        // by exactly one original-height. Visually identical content.
        isJumping = true;
        window.scrollTo({ top: y - originalHeight, behavior: "instant" });
        requestAnimationFrame(() => {
          isJumping = false;
        });
      } else if (y <= buffer) {
        // We're at the very top — jump forward into clone-equivalent
        // position so the user can keep scrolling up indefinitely.
        isJumping = true;
        window.scrollTo({
          top: y + originalHeight,
          behavior: "instant",
        });
        requestAnimationFrame(() => {
          isJumping = false;
        });
      }
    };

    const scheduleWrap = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        wrap();
      });
    };

    // Wheel handler — covers the case where the browser refuses to
    // scroll past 0 (so the scroll event won't fire) but the user
    // is clearly trying to go up.
    const onWheel = (e: WheelEvent) => {
      if (isJumping) return;
      if (Date.now() < suspendUntil) return;
      if (originalHeight <= 0) return;
      if (e.deltaY < 0 && window.scrollY <= 0) {
        isJumping = true;
        window.scrollTo({ top: originalHeight - 1, behavior: "instant" });
        requestAnimationFrame(() => {
          isJumping = false;
        });
      }
    };

    // When the user follows an anchor link (hash change), give the
    // browser a moment to land on the target before resuming wrap.
    const onHashChange = () => {
      suspendUntil = Date.now() + 600;
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (originalRef.current) ro.observe(originalRef.current);

    window.addEventListener("scroll", scheduleWrap, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    // If user hit the page with no hash and scrollY === 0, nudge
    // them off 0 so subsequent upward scrolls trigger an event.
    if (!window.location.hash && window.scrollY === 0) {
      // microtask — let layout settle first.
      queueMicrotask(() => {
        if (window.scrollY === 0)
          window.scrollTo({ top: 1, behavior: "instant" });
      });
    }

    return () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("scroll", scheduleWrap);
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("hashchange", onHashChange);
      ro.disconnect();
    };
  }, [loopActive]);

  const showClone = loopActive;

  return (
    <>
      <div ref={originalRef} data-noir-original>
        {children}
      </div>
      {showClone ? (
        <div
          data-noir-clone
          aria-hidden="true"
          // `inert` removes the subtree from focus + a11y tree.
          inert
          tabIndex={-1}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}
