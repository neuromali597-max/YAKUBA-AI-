"use client";

import { useState } from "react";
import SiteHeader from "@/components/landing/SiteHeader";
import SiteFooter from "@/components/landing/SiteFooter";
import LanguageLibrary from "./LanguageLibrary";
import ContributionSpace from "./ContributionSpace";
import GuidesLibrary from "./GuidesLibrary";
import styles from "./ResourcesHub.module.css";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SPACES = [
  {
    key: "bibliotheque",
    label: "Bibliothèque des langues",
    short: "Bibliothèque",
    sub: "Les langues de Yakuba et leurs ressources",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" />
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
        <path d="M9 8h7M9 11.5h4.5" />
      </svg>
    ),
  },
  {
    key: "contributions",
    label: "Contributions",
    short: "Contribuer",
    sub: "Partagez vos ressources linguistiques",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M12 21s-7-4.6-9.5-8.5C.7 9.6 2.3 6 5.5 6c2 0 3.4 1.2 4 2.3C10.6 7.2 12 6 14 6" />
        <path d="M14 6c3.2 0 4.8 3.6 3 6.5-.6 1-1.6 2-2.8 3" />
        <path d="M15 13l6-6M18 7h3v3" />
      </svg>
    ),
  },
  {
    key: "guides",
    label: "Guides",
    short: "Guides",
    sub: "Tirer le meilleur de Yakuba, pas à pas",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </svg>
    ),
  },
] as const;

type SpaceKey = (typeof SPACES)[number]["key"];

export default function ResourcesHub() {
  const [space, setSpace] = useState<SpaceKey>("bibliotheque");

  return (
    <div className={styles.page}>
      <SiteHeader />

      <header className={styles.hero}>
        <svg className={styles.motif} aria-hidden>
          <defs>
            <pattern id="res-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#res-dots)" />
        </svg>
        <div className={styles.heroInner}>
          <div className={styles.badge}>
            <svg viewBox="0 0 24 24" aria-hidden {...stroke} className={styles.badgeIcon}>
              <path d="M12 6.5C10.5 5 8.5 4.5 6 4.5v13c2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2v-13c-2.5 0-4.5.5-6 2Z" />
              <path d="M12 6.5v13" />
            </svg>
            RESSOURCES YAKUBA AI
          </div>
          <h1 className={styles.title}>
            La maison des <span className={styles.titleAccent}>langues vivantes</span>
            <span className={styles.titleDot}>.</span>
          </h1>
          <p className={styles.lede}>
            Explorer les langues, contribuer à leur richesse, maîtriser Yakuba —
            trois espaces pensés pour faire vivre le bamanankan et, bientôt,
            d&apos;autres langues africaines.
          </p>
        </div>
      </header>

      <nav className={styles.tabsWrap} aria-label="Espaces de ressources">
        <div className={styles.tabs} role="tablist">
          {SPACES.map((s) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={space === s.key}
              className={`${styles.tab} ${space === s.key ? styles.tabOn : ""}`}
              onClick={() => setSpace(s.key)}
            >
              <span className={styles.tabIcon}>{s.icon}</span>
              <span className={styles.tabText}>
                <span className={styles.tabLabel}>{s.label}</span>
                <span className={styles.tabSub}>{s.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className={styles.main}>
        {space === "bibliotheque" && <LanguageLibrary />}
        {space === "contributions" && <ContributionSpace />}
        {space === "guides" && <GuidesLibrary />}
      </main>

      <SiteFooter />
    </div>
  );
}
