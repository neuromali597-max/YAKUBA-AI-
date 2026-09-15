"use client";

import { useEffect, useState } from "react";
import { ROT_WORDS } from "@/lib/mock-data";
import { useReveal } from "@/lib/hooks";
import styles from "./ProblemSection.module.css";

export default function ProblemSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.3);
  const [zero, setZero] = useState(100);
  const [rot, setRot] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const zeroTimer = setInterval(() => {
      setZero((z) => (z > 0 ? Math.max(0, z - 2) : z));
    }, 45);
    const rotTimer = setInterval(() => {
      setRot((r) => (r + 1) % ROT_WORDS.length);
    }, 1900);
    return () => { clearInterval(zeroTimer); clearInterval(rotTimer); };
  }, [visible]);

  return (
    <section id="probleme" ref={ref} className={styles.section}>
      <div className="container">
        {(
          <>
            <div className="kicker kicker--light">LE PROBLÈME</div>
            <h2 className={`display ${styles.animTitle}`}>
              Des millions de personnes parlent{" "}
              <span className="serif-accent serif-accent--light">bambara</span>.
            </h2>
            <p className={`display-sub display-sub--light ${styles.animSub}`}>
              Pour les grandes IA, cette langue{" "}
              <span className="underline-light">n&apos;existe presque pas</span>.
            </p>

            <div className={styles.cards}>
              <div className={styles.cardStat}>
                <div className={styles.cardLabel}>LA PLACE DU BAMBARA DANS LEURS DONNÉES</div>
                <div
                  className={styles.zero}
                  style={{ color: zero > 0 ? "rgba(255,255,255,.7)" : "#4ADE80" }}
                >
                  {zero > 0 ? `${zero} %` : "≈ 0"}
                </div>
                <div className={styles.cardNote}>
                  Ce qu&apos;un modèle n&apos;a jamais vu, <span>il ne peut pas l&apos;écrire</span>.
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={styles.cardLabel}>TRADUIT MOT À MOT</div>
                <div className={styles.quoteFr}>« Je passerai te voir demain matin. »</div>
                <div className={styles.divider} />
                <div className={styles.quoteBad}>Ne tɛmɛna ka ye e sini sɔgɔma…</div>
                <div className={styles.cardNote}>
                  Les mots sont là. <span>La phrase n&apos;existe pas.</span>
                </div>
              </div>
            </div>

            <div className={styles.rotator}>
              <span className={styles.rotFaded}>À chaque traduction littérale,</span>
              <span className={styles.rotSlot}>
                <span key={rot} className={styles.rotWord}>{ROT_WORDS[rot]}</span>
              </span>
              <span className={styles.rotWhite}>disparaît.</span>
            </div>

            <div className={styles.closing}>
              <div className={styles.closingQuote}>
                Une langue n&apos;est jamais
                <br />
                une liste de mots.
              </div>
              <div className={styles.closingCta}>
                <span className={styles.closingLine} />
                C&apos;est là que Yakuba commence ↓
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
