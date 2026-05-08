import { Hero } from "@/app/components/sections/hero";
import { Experience } from "@/app/components/sections/experience";
import { Education } from "@/app/components/sections/education";
import { Skills } from "@/app/components/sections/skills";
import { Hobbies } from "@/app/components/sections/hobbies";
import { OldPortfolioPortal } from "@/app/components/sections/old-portfolio-portal";
import { SiteGrain } from "@/app/components/primitives/site-grain";
import { InfiniteScrollWrapper } from "@/app/components/infinite-scroll-wrapper";
import { siteConfig } from "@/app/lib/config";

/**
 * Loopable content — every section that should appear inside the
 * infinite-scroll loop. Anything outside this block (e.g. a fixed
 * grain overlay or skip-to-content link) belongs in the page root.
 */
function DossierContent() {
  return (
    <>
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Hobbies />
      <OldPortfolioPortal />
    </>
  );
}

export default function Home() {
  return (
    <>
      {/* Skip link — appears on focus, lands the user past the masthead. */}
      <a
        href="#hero-headline"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-noir-fg focus:text-noir-bg focus:px-3 focus:py-2 focus:text-label"
      >
        SKIP TO CONTENT
      </a>

      <SiteGrain />

      <main className="relative">
        <InfiniteScrollWrapper enabled={siteConfig.infiniteScrollEnabled}>
          <DossierContent />
        </InfiniteScrollWrapper>
      </main>
    </>
  );
}
