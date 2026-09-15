"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TRANSLATE_PRESETS } from "@/lib/mock-data";
import { useReveal } from "@/lib/hooks";
import styles from "./TranslateDemo.module.css";

// Vitrine auto-animée : la démo se joue seule, en boucle.
// Aucune saisie ni action possible — le vrai outil est réservé aux comptes.
// Étapes : 0 = frappe du texte source · 1 = "Yakuba rédige…" · 2 = résultat affiché
const TICK_MS = 45;
const THINK_TICKS = 22;
const HOLD_TICKS = 90;

export default function TranslateDemo() {
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [tick, setTick] = useState(0);

  const preset = TRANSLATE_PRESETS[scene];
  // La démo ne tourne que lorsqu'elle est visible (économie CPU hors écran).
  const { ref: cardRef, visible } = useReveal<HTMLDivElement>(0.2);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      if (step === 0) {
        setTyped((n) => {
          if (n >= preset.fr.length) {
            setStep(1);
            setTick(0);
            return n;
          }
          return n + 1;
        });
      } else if (step === 1) {
        setTick((t) => {
          if (t >= THINK_TICKS) { setStep(2); return 0; }
          return t + 1;
        });
      } else {
        setTick((t) => {
          if (t >= HOLD_TICKS) {
            setScene((s) => (s + 1) % TRANSLATE_PRESETS.length);
            setStep(0);
            setTyped(0);
            return 0;
          }
          return t + 1;
        });
      }
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [step, preset.fr.length, visible]);

  return (
    <div ref={cardRef} className={styles.card} aria-label="Démonstration automatique de la traduction">
      <div className={styles.topRow}>
        <div className={styles.lang}>Français</div>
        <span className={styles.arrow} aria-hidden>→</span>
        <div className={styles.langDst}>Bambara</div>
        <span className={styles.demoBadge}>
          <span className={styles.demoDot} />
          DÉMO AUTOMATIQUE
        </span>
      </div>

      <div className={styles.grid} aria-hidden>
        <div className={styles.pane}>
          <div className={styles.paneLabel}>{preset.label.toUpperCase()}</div>
          <div className={styles.srcText}>
            {preset.fr.slice(0, typed)}
            {step === 0 && <span className={styles.caret}>▌</span>}
          </div>
        </div>

        <div className={styles.paneOut}>
          <div className={styles.paneLabelOut}>BAMBARA</div>
          {step <= 1 ? (
            <div className={styles.loading}>
              {step === 1 ? (
                <>
                  <span className={styles.spinner} />
                  Yakuba rédige…
                </>
              ) : (
                <span className={styles.waiting}>La traduction apparaîtra ici.</span>
              )}
            </div>
          ) : (
            <div className={styles.result}>
              <div className={styles.outText}>{preset.bm}</div>
              <div className={styles.outGloss}>{preset.gloss}</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span className={styles.note}>
          Aperçu en boucle — l&apos;outil complet est réservé aux membres.
        </span>
        <Link href="/inscription" className={styles.unlock}>
          Créer un compte gratuit <span className={styles.unlockArrow}>→</span>
        </Link>
      </div>
    </div>
  );
}
