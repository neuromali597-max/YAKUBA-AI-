"use client";

import Link from "next/link";
import { LANGUAGES } from "@/lib/resources-data";
import { CONTACT_EMAIL } from "@/lib/contact";
import styles from "./LanguageLibrary.module.css";

const STAT_LABELS: { key: "vocabulaire" | "expressions" | "textes" | "culture"; label: string }[] = [
  { key: "vocabulaire", label: "mots de vocabulaire" },
  { key: "expressions", label: "expressions & proverbes" },
  { key: "textes", label: "textes & contes" },
  { key: "culture", label: "repères culturels" },
];

export default function LanguageLibrary() {
  const available = LANGUAGES.filter((l) => l.status === "disponible");
  const upcoming = LANGUAGES.filter((l) => l.status === "a_venir");

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <h2 className={styles.title}>
          Bibliothèque des <span className={styles.accent}>langues</span>
        </h2>
        <p className={styles.sub}>
          Chaque langue rassemble son vocabulaire, ses expressions, ses textes et sa
          culture. Le bamanankan ouvre la voie — les autres suivent.
        </p>
      </div>

      {available.map((lang) => (
        <article key={lang.code} className={styles.feature}>
          <span className={styles.featureGlow} aria-hidden />
          <div className={styles.featureHead}>
            <span className={styles.langCode}>{lang.code.toUpperCase()}</span>
            <div className={styles.featureNames}>
              <h3 className={styles.langName}>
                {lang.name} <span className={styles.endonym}>· {lang.endonym}</span>
              </h3>
              <p className={styles.langMeta}>{lang.speakers} — {lang.region}</p>
            </div>
            <span className={styles.statusOn}>
              <span className={styles.statusDot} />
              DISPONIBLE
            </span>
          </div>

          {lang.library && (
            <div className={styles.stats}>
              {STAT_LABELS.map((s) => (
                <div key={s.key} className={styles.stat}>
                  <span className={styles.statNum}>
                    {lang.library![s.key].toLocaleString("fr-FR")}
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {lang.sample && (
            <figure className={styles.sample}>
              <span className={styles.sampleMark} aria-hidden>»</span>
              <blockquote className={styles.sampleNative}>{lang.sample.native}</blockquote>
              <figcaption className={styles.sampleFr}>{lang.sample.fr}</figcaption>
            </figure>
          )}

          <div className={styles.featureFoot}>
            <span className={styles.footNote}>
              Conversation, traduction et rédaction — dans l&apos;application.
            </span>
            <Link href="/inscription" className={styles.cta}>
              Explorer le bamanankan <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </article>
      ))}

      <div className={styles.upcomingHead}>
        <span className={styles.upcomingLine} aria-hidden />
        <span className={styles.upcomingLabel}>PROCHAINES LANGUES</span>
        <span className={styles.upcomingLine} aria-hidden />
      </div>

      <div className={styles.grid}>
        {upcoming.map((lang) => (
          <article key={lang.code} className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.langCodeSmall}>{lang.code.toUpperCase()}</span>
              <span className={styles.statusSoon}>À VENIR</span>
            </div>
            <h3 className={styles.cardName}>{lang.name}</h3>
            <p className={styles.cardEndonym}>{lang.endonym}</p>
            <p className={styles.cardMeta}>{lang.speakers} — {lang.region}</p>
            <div className={styles.cardBar} aria-hidden>
              <span className={styles.cardBarFill} />
            </div>
          </article>
        ))}
      </div>

      <p className={styles.growNote}>
        Une langue manque ? Aidez-nous à la faire entrer :{" "}
        <Link href="/contact">{CONTACT_EMAIL}</Link> — ou partagez vos
        ressources dans l&apos;espace Contributions.
      </p>
    </div>
  );
}
