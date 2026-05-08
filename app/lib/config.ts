/**
 * Site-wide feature flags and tunables.
 * Keep this small. Anything you toggle from one place lives here.
 */
export const siteConfig = {
  /**
   * Master switch for the seamless infinite-scroll loop.
   * Disable if it ever creates usability issues.
   */
  infiniteScrollEnabled: true,

  /**
   * URL of the legacy PS3 / VHS-style portfolio.
   * Replace with the real archive URL once it's live.
   */
  oldPortfolioUrl: "https://example.com/legacy",

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
