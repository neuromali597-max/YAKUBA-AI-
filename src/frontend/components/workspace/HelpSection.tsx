"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, mailtoUrl } from "@/lib/contact";
import styles from "./HelpSection.module.css";

const TOPICS = [
  {
    q: "Comment démarrer une conversation ?",
    a: "Depuis l'Accueil, cliquez sur « Discuter avec Yakuba » ou écrivez directement dans la barre du bas. Yakuba comprend le français et le bambara.",
  },
  {
    q: "Comment traduire un texte ?",
    a: "Ouvrez la section Traduction, choisissez le sens (Français → Bambara ou l'inverse avec le bouton ⇄), collez votre texte et appuyez sur Traduire.",
  },
  {
    q: "Comment générer un texte en bambara ?",
    a: "Dans Génération Bambara, choisissez un type de contenu (message, histoire, publication…), décrivez ce que vous voulez, puis appuyez sur Générer.",
  },
  {
    q: "Mes conversations sont-elles privées ?",
    a: "Oui. Vos conversations vous appartiennent et ne sont jamais partagées. Vous pouvez les supprimer à tout moment depuis l'Historique, ou désactiver la sauvegarde dans Paramètres.",
  },
  {
    q: "Comment changer le thème clair/sombre ?",
    a: "Utilisez l'interrupteur de thème en bas de la barre latérale, ou Paramètres → Préférences → Thème. Votre choix est mémorisé.",
  },
];

type HelpSectionProps = {
  onGoChat: () => void;
};

export default function HelpSection({ onGoChat }: HelpSectionProps) {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <div>
          <h1 className={styles.title}>Aide</h1>
          <div className={styles.subtitle}>Les réponses aux questions les plus courantes.</div>
        </div>

        <div className={styles.list}>
          {TOPICS.map((t, i) => (
            <div key={t.q} className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}>
              <button
                className={styles.question}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className={styles.qText}>{t.q}</span>
                <span className={`${styles.sign} ${open === i ? styles.signOpen : ""}`}>+</span>
              </button>
              {open === i && <div className={styles.answer}>{t.a}</div>}
            </div>
          ))}
        </div>

        <div className={styles.contactCard}>
          <div>
            <div className={styles.contactTitle}>Vous ne trouvez pas votre réponse ?</div>
            <div className={styles.contactHint}>
              Posez votre question directement à Yakuba, ou écrivez à l&apos;équipe :{" "}
              <a href={mailtoUrl("[Yakuba AI] Demande d'aide")} className={styles.contactEmail}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className={styles.contactActions}>
            <button className={styles.primaryBtn} onClick={onGoChat}>Demander à Yakuba</button>
            <a href={mailtoUrl("[Yakuba AI] Demande d'aide")} className={styles.outlineBtn}>
              Demander de l&apos;aide par email
            </a>
            <Link href="/contact" className={styles.outlineBtn}>Formulaire de contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
