"use client";

import { useEffect, useState } from "react";
import { HOW_IT_WORKS_INPUT } from "@/lib/mock-data";
import { useReveal } from "@/lib/hooks";
import styles from "./HowItWorks.module.css";

const TICK_MS = 45;
const STEP_TICKS = 54;

export default function HowItWorks() {
  const { ref, visible } = useReveal<HTMLElement>(0.2);
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setTick((t) => {
        if (t >= STEP_TICKS) {
          setStep((s) => (s + 1) % 4);
          return 0;
        }
        return t + 1;
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [visible]);

  const pick = (i: number) => { setStep(i); setTick(0); };

  const progress = Math.min(1, (step + Math.min(1, tick / STEP_TICKS)) / 4);
  const typeLen = step === 0
    ? Math.min(HOW_IT_WORKS_INPUT.length, Math.floor(tick * 0.7))
    : HOW_IT_WORKS_INPUT.length;
  const chipIdx = step === 1 ? Math.min(2, Math.floor(tick / 16)) : step > 1 ? 2 : -1;
  const tileIdx = step === 2 ? Math.min(2, Math.floor(tick / 14)) : step > 2 ? 2 : -1;

  return (
    <section id="marche" ref={ref} className={styles.section}>
      <div className="container">
        {(
          <>
            <div className="kicker">COMMENT ÇA MARCHE</div>
            <h2 className="display">
              Vous écrivez, <span className="serif-accent">comme ça vient</span>.
            </h2>
            <p className="display-sub">
              Yakuba fait <span className="underline-green">le reste</span>.
            </p>

            <div className={styles.rail}>
              <span className={styles.railFill} style={{ transform: `scaleX(${progress})` }} />
              <span className={styles.railDot} style={{ left: `calc(${progress * 100}% - 5px)` }} />
            </div>

            <div className={styles.cards}>
              <button onClick={() => pick(0)} className={`${styles.card} ${step === 0 ? styles.cardOn : ""}`}>
                <span className={`${styles.num} ${step === 0 ? styles.numOn : ""}`}>01</span>
                <span className={styles.cardTitle}>Écrivez, comme ça vient</span>
                <span className={styles.cardBody}>En français ou en bambara, sans format imposé.</span>
                <span className={styles.inputDemo}>
                  <span className={styles.inputDemoText}>
                    {HOW_IT_WORKS_INPUT.slice(0, typeLen)}
                    {step === 0 && typeLen < HOW_IT_WORKS_INPUT.length && (
                      <span className={styles.caret}>▌</span>
                    )}
                  </span>
                  <span className={styles.inputDemoSend}>↑</span>
                </span>
              </button>

              <button onClick={() => pick(1)} className={`${styles.card} ${step === 1 ? styles.cardOn : ""}`}>
                <span className={`${styles.num} ${step === 1 ? styles.numOn : ""}`}>02</span>
                <span className={styles.cardTitle}>Yakuba lit entre les lignes</span>
                <span className={styles.cardBody}>Langue, intention, destinataire.</span>
                <span className={styles.chips}>
                  {["Langue · français", "Intention · inviter", "Registre · familial"].map((label, i) => (
                    <span key={label} className={`${styles.chipItem} ${chipIdx >= i ? styles.chipItemOn : ""}`}>
                      <span className={`${styles.chipDot} ${chipIdx >= i ? styles.chipDotOn : ""}`} />
                      {label}
                    </span>
                  ))}
                </span>
              </button>

              <button onClick={() => pick(2)} className={`${styles.card} ${step === 2 ? styles.cardOn : ""}`}>
                <span className={`${styles.num} ${step === 2 ? styles.numOn : ""}`}>03</span>
                <span className={styles.cardTitle}>La phrase se construit</span>
                <span className={styles.cardBody}>Dans un bambara qui se dit vraiment.</span>
                <span className={styles.tiles}>
                  {["Aw ni ce.", "N b'aw wele", "furusiri ɲɛnajɛ la."].map((t, i) =>
                    tileIdx >= i ? (
                      <span key={t} className={styles.tile}>{t}</span>
                    ) : null
                  )}
                </span>
              </button>

              <button onClick={() => pick(3)} className={`${styles.card} ${step === 3 ? styles.cardOn : ""}`}>
                <span className={`${styles.num} ${step === 3 ? styles.numOn : ""}`}>04</span>
                <span className={styles.cardTitle}>Relisez, en confiance</span>
                <span className={styles.cardBody}>La glose française, pour vérifier le sens.</span>
                {step === 3 ? (
                  <span className={styles.answer}>
                    <span className={styles.answerBm}>Aw ni ce. N b&apos;aw wele furusiri ɲɛnajɛ la.</span>
                    <span className={styles.answerGloss}>
                      « Bonjour à vous. Je vous invite à la fête de mariage. »
                    </span>
                  </span>
                ) : (
                  <span className={styles.answerWait} />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
