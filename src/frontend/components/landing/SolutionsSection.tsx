"use client";

import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import styles from "./SolutionsSection.module.css";

type Solution = {
  title: string;
  body: string;
  detail: string;
  icon: React.ReactNode;
  soon?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SOLUTIONS: Solution[] = [
  {
    title: "Conversation",
    body: "Une IA qui suit le fil.",
    detail: "Posez la suite, précisez, corrigez — Yakuba se souvient du contexte, rien à répéter.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.8-.86L3 20l1.1-4.1A8.13 8.13 0 0 1 3 11.5 8.38 8.38 0 0 1 11.5 3.2 8.38 8.38 0 0 1 21 11.5Z" />
        <path d="M8 10.5h7M8 13.5h4.5" />
      </svg>
    ),
  },
  {
    title: "Traduction",
    body: "Le sens, pas les mots.",
    detail: "Français ⇄ bambara dans les deux sens, avec une glose française pour vérifier le sens.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M4 7h11M11 4l4 3-4 3" />
        <path d="M20 17H9M13 20l-4-3 4-3" />
      </svg>
    ),
  },
  {
    title: "Génération",
    body: "Vous demandez, il écrit.",
    detail: "Invitations, annonces, messages familiaux — rédigés directement en bambara.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    title: "Registre",
    body: "Le bon ton, toujours.",
    detail: "Un ami, un aîné, un client : la formulation s'adapte au destinataire.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M15.5 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Voix",
    body: "Parler. Écouter. Répondre.",
    detail: "La langue est d'abord orale — le mode vocal arrive dans une prochaine version.",
    soon: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
      </svg>
    ),
  },
];

export default function SolutionsSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.15);

  return (
    <section id="solution" ref={ref} className={styles.section}>
      <span className={styles.glow} aria-hidden />
      <div className="container">
        {(
          <>
            <div className="kicker kicker--light">LA SOLUTION</div>
            <h2 className={`display ${styles.animTitle}`}>
              Une plateforme pensée{" "}
              <span className="serif-accent serif-accent--light">langue d&apos;abord</span>.
            </h2>
            <p className={`display-sub display-sub--light ${styles.animSub}`}>
              Tout ce qu&apos;il faut pour écrire en bambara,{" "}
              <span className="underline-light">au même endroit</span>.
            </p>

            <div className={styles.grid}>
              {SOLUTIONS.map((s, i) => (
                <article
                  key={s.title}
                  className={styles.card}
                  style={{ animationDelay: `${0.15 + i * 0.09}s` }}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.icon}>{s.icon}</span>
                    {s.soon && <span className={styles.soon}>BIENTÔT</span>}
                  </div>
                  <div className={styles.cardKicker}>{s.title.toUpperCase()}</div>
                  <h3 className={styles.cardTitle}>{s.body}</h3>
                  <p className={styles.cardDetail}>{s.detail}</p>
                </article>
              ))}

              <article className={`${styles.card} ${styles.cardCta}`} style={{ animationDelay: "0.6s" }}>
                <div className={styles.ctaKicker}>DÈS AUJOURD&apos;HUI</div>
                <h3 className={styles.ctaTitle}>
                  Essayez-la <span className={styles.ctaAccent}>maintenant</span>.
                </h3>
                <Link href="/inscription" className={styles.ctaLink}>
                  Voir la démo <span className={styles.ctaArrow}>→</span>
                </Link>
              </article>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
