import SiteHeader from "@/components/landing/SiteHeader";
import SiteFooter from "@/components/landing/SiteFooter";
import styles from "./LegalPage.module.css";

export type LegalSection = {
  id: string;
  heading: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  title: string;
  updated: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
};

export default function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <header className={styles.hero}>
        {/* Motif discret : points de la charte (mêmes que les fonds de démo) */}
        <svg className={styles.motif} aria-hidden>
          <defs>
            <pattern id="legal-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#legal-dots)" />
        </svg>
        <div className={styles.heroInner}>
          <div className="kicker">LÉGAL</div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Dernière mise à jour : {updated}</p>
        </div>
      </header>

      <main className={styles.main}>
        <aside className={styles.tocWrap}>
          <nav className={styles.toc} aria-label="Sommaire">
            <div className={styles.tocTitle}>SOMMAIRE</div>
            {sections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
                <span className={styles.tocNum}>{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </a>
            ))}
          </nav>
        </aside>

        <article className={styles.article}>
          {intro && <p className={styles.intro}>{intro}</p>}
          {sections.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2 className={styles.heading}>{s.heading}</h2>
              {s.body}
            </section>
          ))}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
