/**
 * Site-wide feature flags and tunables.
 * Keep this small. Anything you toggle from one place lives here.
 */
export const siteConfig = {
  /**
   * Canonical production URL for this noir dossier.
   */
  siteUrl: "https://fernandofrancojr.com",

  /**
   * Master switch for the seamless infinite-scroll loop.
   * Disable if it ever creates usability issues.
   */
  infiniteScrollEnabled: true,

  /**
   * Archived “previous system” portfolio — standalone legacy runtime.
   */
  oldPortfolioUrl: "https://legacy.fernandofrancojr.com",

  /**
   * Editorial "issue" metadata shown on the masthead.
   */
  issue: {
    volume: "VOL. 01",
    name: "ENGINEERING DOSSIER",
    edition: "AEROSPACE · OKLAHOMA",
  },
} as const;

export type SiteConfig = typeof siteConfig;
