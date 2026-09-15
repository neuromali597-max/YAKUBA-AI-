"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CHAT_SCENES } from "@/lib/mock-data";
import { useReveal } from "@/lib/hooks";
import styles from "./ChatDemo.module.css";

// Vitrine auto-animée : la conversation se joue seule, en boucle.
// Aucune interaction possible — le vrai produit est réservé aux comptes.
// Étapes : 0 = question posée · 1 = "réfléchit" · 2 = réponse en frappe · 3 = terminé
const TICK_MS = 45;

export default function ChatDemo() {
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  const sc = CHAT_SCENES[scene];
  // La scène ne tourne que lorsqu'elle est visible (économie CPU hors écran).
  const { ref: stageRef, visible } = useReveal<HTMLDivElement>(0.2);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      if (step === 0) {
        setTyped((t) => {
          if (t >= 16) { setStep(1); return 0; }
          return t + 1;
        });
      } else if (step === 1) {
        setTyped((t) => {
          if (t >= 26) { setStep(2); return 0; }
          return t + 1;
        });
      } else if (step === 2) {
        setTyped((n) => {
          if (n >= sc.a.length) { setStep(3); return 0; }
          return Math.min(sc.a.length, n + 2);
        });
      } else {
        setTyped((t) => {
          if (t >= 112) {
            setScene((s) => (s + 1) % CHAT_SCENES.length);
            setStep(0);
            return 0;
          }
          return t + 1;
        });
      }
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [step, sc.a.length, visible]);

  const statusLabel = step === 1 ? "Analyse…" : step === 2 ? "Rédige en bambara…" : "En ligne";
  const busy = step === 1 || step === 2;

  return (
    <div ref={stageRef} className={styles.stage} aria-label="Démonstration automatique de la conversation">
      <span className={styles.glowBg} aria-hidden />
      <span className={styles.dotsBg} aria-hidden />
      <div className={styles.cardWrap}>
        {step >= 1 && (
          <div className={`${styles.annotation} ${styles.annLeft}`} style={{ top: 96 }}>
            <span className={styles.annPill}>CONTEXTE ANALYSÉ</span>
            <span className={styles.annLineL} />
          </div>
        )}
        {step >= 2 && (
          <div className={`${styles.annotation} ${styles.annRight}`} style={{ top: 186 }}>
            <span className={styles.annLineR} />
            <span className={styles.annPill}>REGISTRE ADAPTÉ</span>
          </div>
        )}
        {step >= 3 && (
          <div className={`${styles.annotation} ${styles.annLeft}`} style={{ bottom: 120 }}>
            <span className={`${styles.annPill} ${styles.annPillGreen}`}>✓ NATUREL POUR UN LOCUTEUR</span>
            <span className={styles.annLineGreen} />
          </div>
        )}

        <div className={styles.card}>
          {/* Zone vitrine : rien n'est cliquable ni sélectionnable */}
          <div className={styles.showcase} aria-hidden>
            <div className={styles.cardHead}>
              <div className={styles.avatarWrap}>
                <Image src="/yakuba-logo.jpeg" alt="" width={32} height={32} className={styles.avatar} />
                <span className={styles.statusDot} style={{ background: busy ? "#F59E0B" : "#22C55E" }} />
              </div>
              <div className={styles.headText}>
                <div className={styles.headName}>Yakuba<span> AI</span></div>
                <div className={styles.headStatus} style={{ color: step === 2 ? "#15803D" : "#9CA3AF" }}>
                  {statusLabel}
                </div>
              </div>
              <span className={styles.demoBadge}>
                <span className={styles.demoDot} />
                DÉMO AUTOMATIQUE
              </span>
            </div>

            <div className={styles.rail}>
              <span className={`${styles.railLang} ${step <= 1 ? styles.railLangOn : ""}`}>FR</span>
              <span className={styles.railTrack}>
                {step === 2 && <span className={styles.railTravel} />}
                <span
                  className={styles.railFill}
                  style={{ transform: `scaleX(${step >= 3 ? 1 : step === 2 ? 0.65 : step === 1 ? 0.18 : 0})` }}
                />
              </span>
              <span className={`${styles.railLang} ${step >= 2 ? styles.railLangBmOn : ""}`}>BM</span>
            </div>

            <div className={styles.messages}>
              <div className={styles.userCol}>
                <div className={styles.userBubble}>{sc.q}</div>
                {step >= 1 && (
                  <span className={styles.detectChip}><span className={styles.detectDot} />{sc.detect}</span>
                )}
              </div>
              {step === 1 && (
                <div className={styles.thinking}>
                  <Image src="/yakuba-logo.jpeg" alt="" width={24} height={24} className={styles.miniAvatar} />
                  <span className={styles.thinkingBubble}>
                    <span className={styles.thinkDot} />
                    <span className={styles.thinkDot} style={{ animationDelay: "0.18s" }} />
                    <span className={styles.thinkDot} style={{ animationDelay: "0.36s" }} />
                  </span>
                </div>
              )}
              {step >= 2 && (
                <div className={styles.botRow}>
                  <Image src="/yakuba-logo.jpeg" alt="" width={24} height={24} className={styles.miniAvatar} />
                  <div className={styles.botCol}>
                    <div className={`${styles.botBubble} ${step === 2 ? styles.botBubbleTyping : ""}`}>
                      {step >= 3 ? sc.a : sc.a.slice(0, typed)}
                      {step === 2 && <span className={styles.caret}>▌</span>}
                      {step >= 3 && <div className={styles.gloss}>{sc.gloss}</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seul élément actif de la carte */}
          <div className={styles.unlockRow}>
            <span className={styles.unlockNote}>
              Aperçu en boucle — la vraie conversation est réservée aux membres.
            </span>
            <Link href="/inscription" className={styles.unlock}>
              Créer un compte gratuit <span className={styles.unlockArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
