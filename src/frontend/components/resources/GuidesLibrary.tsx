"use client";

import { useState } from "react";
import { GUIDES, type GuideCategory } from "@/lib/resources-data";
import styles from "./GuidesLibrary.module.css";

const CATEGORIES: ("Tous" | GuideCategory)[] = [
  "Tous",
  "Démarrage",
  "Traduction",
  "Rédaction",
  "Apprentissage",
  "Contribution",
  "Bonnes pratiques",
];

export default function GuidesLibrary() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Tous");
  const [open, setOpen] = useState<string | null>(GUIDES[0].id);

  const visible = GUIDES.filter((g) => category === "Tous" || g.category === category);

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <h2 className={styles.title}>
          Guides <span className={styles.accent}>pas à pas</span>
        </h2>
        <p className={styles.sub}>
          Des parcours courts et concrets pour tirer le meilleur de Yakuba — de la
          première conversation aux bonnes pratiques de relecture.
        </p>
      </div>

      <div className={styles.filters} role="tablist" aria-label="Catégories de guides">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            className={`${styles.filter} ${category === c ? styles.filterOn : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {visible.map((g) => {
          const isOpen = open === g.id;
          return (
            <article key={g.id} className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}>
              <button
                className={styles.cardHead}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : g.id)}
              >
                <span className={styles.meta}>
                  <span className={styles.chip}>{g.category.toUpperCase()}</span>
                  <span className={styles.metaText}>{g.minutes} min · {g.level}</span>
                </span>
                <span className={styles.cardTitle}>{g.title}</span>
                <span className={styles.cardSummary}>{g.summary}</span>
                <span className={`${styles.sign} ${isOpen ? styles.signOpen : ""}`} aria-hidden>
                  +
                </span>
              </button>
              {isOpen && (
                <ol className={styles.steps}>
                  {g.steps.map((step, i) => (
                    <li key={i} className={styles.step}>
                      <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className={styles.empty}>Aucun guide dans cette catégorie pour l&apos;instant.</div>
      )}
    </div>
  );
}
