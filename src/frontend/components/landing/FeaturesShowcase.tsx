"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FEATURES, F_TRAD, F_GEN } from "@/lib/mock-data";
import { useReveal, useTypewriter } from "@/lib/hooks";
import styles from "./FeaturesShowcase.module.css";

const TICK_MS = 45;
const FEATURE_TICKS = 92;

export default function FeaturesShowcase() {
  const { ref, visible } = useReveal<HTMLElement>(0.25);
  const [feat, setFeat] = useState(0);
  const [tick, setTick] = useState(0);
  const [ctxAmi, setCtxAmi] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setTick((t) => {
        if (t >= FEATURE_TICKS) {
          setFeat((f) => (f + 1) % FEATURES.length);
          setCtxAmi(true);
          return 0;
        }
        if (feat === 3 && t > 0 && t % 34 === 0) setCtxAmi((v) => !v);
        return t + 1;
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [visible, feat]);

  const pick = (i: number) => { setFeat(i); setTick(0); setCtxAmi(true); };

  const trad = useTypewriter(F_TRAD, visible && feat === 1, 40);
  const gen = useTypewriter(F_GEN, visible && feat === 2, 40);

  return (
    <section id="fonctionnalites" ref={ref} className={styles.section}>
      <div className="container">
        {(
          <>
            <div className="kicker">LES FONCTIONNALITÉS</div>
            <h2 className="display">
              Moins d&apos;efforts, un bambara <span className="serif-accent">plus juste</span>.
            </h2>
            <p className="display-sub">
              Chaque fonction est construite <span className="underline-green">autour de la langue</span>.
            </p>

            <div className={styles.grid}>
              <div className={styles.list}>
                {FEATURES.map((f, i) => (
                  <button
                    key={f.tag}
                    onClick={() => pick(i)}
                    className={`${styles.item} ${feat === i ? styles.itemOn : ""}`}
                    aria-expanded={feat === i}
                  >
                    <span className={styles.itemRow}>
                      <span className={`${styles.itemTag} ${feat === i ? styles.itemTagOn : ""}`}>{f.tag}</span>
                      <span className={styles.itemTitle}>{f.title}</span>
                      {f.soon && <span className={styles.itemBadge}>BIENTÔT</span>}
                    </span>
                    {feat === i && (
                      <>
                        <span className={styles.itemBody}>{f.body}</span>
                        <span className={styles.itemBar}>
                          <span
                            className={styles.itemBarFill}
                            style={{ width: `${Math.min(100, Math.round(tick / 0.92))}%` }}
                          />
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>

              <div className={styles.panel}>
                <span className={styles.panelGlow} aria-hidden />
                <span className={styles.panelDots} aria-hidden />
                <div className={styles.panelHead}>
                  <span className={styles.winDot} />
                  <span className={styles.winDot} />
                  <span className={styles.winDot} />
                  <span className={styles.panelUrl}>yakuba.ai — démonstration</span>
                  <span className={styles.liveTag}><span className={styles.liveDot} />EN DIRECT</span>
                </div>

                {feat === 0 && (
                  <div className={styles.demo}>
                    <div className={styles.demoLabel}>LA CONVERSATION SUIT LE FIL</div>
                    <div className={styles.demoUserMsg}>Et pour un baptême, le même message marche ?</div>
                    <div className={styles.demoBotRow}>
                      <Image src="/yakuba-logo.jpeg" alt="" width={24} height={24} className={styles.demoAvatar} />
                      <div className={styles.demoBotMsg}>
                        Presque — on remplace « furusiri » par « denkundi ». Je te l&apos;écris ?
                      </div>
                    </div>
                    <div className={styles.demoNote}>Yakuba se souvient du message précédent. Rien à répéter.</div>
                  </div>
                )}

                {feat === 1 && (
                  <div className={styles.demo}>
                    <div className={styles.demoLabel}>DANS LES DEUX SENS</div>
                    <div className={styles.langBox}>
                      <div className={styles.langBoxLabel}>FRANÇAIS</div>
                      <div className={styles.langBoxText}>« Je passerai te voir demain matin. »</div>
                    </div>
                    <div className={styles.arrowRow}>
                      <span className={styles.arrowLine} />
                      <span className={styles.arrowLabel}>SENS · REGISTRE · POLITESSE</span>
                    </div>
                    <div className={`${styles.langBox} ${styles.langBoxGreen}`}>
                      <div className={`${styles.langBoxLabel} ${styles.langBoxLabelGreen}`}>BAMBARA</div>
                      <div className={styles.langBoxTextGreen}>
                        {trad.typed && `« ${trad.typed}${trad.done ? " »" : ""}`}
                        {!trad.done && <span className={styles.caret}>▌</span>}
                      </div>
                    </div>
                    <div className={styles.demoNote}>Le sens d&apos;abord. Jamais le mot à mot.</div>
                  </div>
                )}

                {feat === 2 && (
                  <div className={styles.demo}>
                    <div className={styles.demoLabel}>VOUS DEMANDEZ, YAKUBA RÉDIGE</div>
                    <div className={styles.genChips}>
                      <span className={styles.genChipOn}>Invitation de mariage</span>
                      <span className={styles.genChip}>Annonce</span>
                      <span className={styles.genChip}>Message familial</span>
                    </div>
                    <div className={`${styles.langBox} ${styles.langBoxGreen} ${styles.genBox}`}>
                      <div className={styles.langBoxTextGreen}>
                        {gen.typed}
                        {!gen.done && <span className={styles.caret}>▌</span>}
                      </div>
                      {gen.done && (
                        <div className={styles.genGloss}>
                          « Bonjour à vous. Je vous invite à la fête de mariage, après-demain. »
                        </div>
                      )}
                    </div>
                    <div className={styles.demoNote}>Un texte original, écrit directement en bambara.</div>
                  </div>
                )}

                {feat === 3 && (
                  <div className={styles.demo}>
                    <div className={styles.demoLabel}>LE MÊME MESSAGE, LE BON TON</div>
                    <div className={styles.ctxChips}>
                      <span className={ctxAmi ? styles.ctxChipOn : styles.ctxChip}>À un ami</span>
                      <span className={!ctxAmi ? styles.ctxChipOn : styles.ctxChip}>À un aîné</span>
                    </div>
                    <div className={styles.ctxBox}>
                      <div key={String(ctxAmi)} className={styles.ctxText}>
                        {ctxAmi ? "« N bɛ na i fɛ sini sɔgɔma. »" : "« N bɛ na aw fɛ sini sɔgɔma. »"}
                      </div>
                      <div className={styles.ctxNote}>
                        {ctxAmi
                          ? "Direct, familier — « i », tutoiement."
                          : "Marqué par le respect — « aw », forme de politesse."}
                      </div>
                    </div>
                    <div className={styles.demoNote}>Le destinataire change, la formulation aussi.</div>
                  </div>
                )}

                {feat === 4 && (
                  <div className={styles.voxDemo}>
                    <span className={styles.voxBadge}>EN PRÉPARATION</span>
                    <div className={styles.voxWave}>
                      {[0.4, 0.6, 1, 1, 1, 0.6, 0.4].map((o, i) => (
                        <span
                          key={i}
                          className={styles.voxBar}
                          style={{
                            background:
                              o === 1 ? (i === 3 ? "#22C55E" : "#4ADE80") : `rgba(134,239,172,${o})`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className={styles.voxTitle}>Parler. Écouter. Répondre.</div>
                    <div className={styles.voxBody}>
                      La langue est d&apos;abord orale. L&apos;interface est déjà prête.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
