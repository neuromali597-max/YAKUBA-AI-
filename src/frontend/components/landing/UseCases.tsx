"use client";

import { useReveal } from "@/lib/hooks";
import styles from "./UseCases.module.css";

export default function UseCases() {
  const { ref, visible } = useReveal<HTMLElement>(0.12);

  return (
    <section id="usages" ref={ref} className={styles.section}>
      <div className="container">
        {(
          <>
            <div className="kicker">CAS D&apos;USAGE</div>
            <h2 className="display">
              Écrire, <span className="serif-accent">dans les deux langues</span>.
            </h2>
            <p className="display-sub">
              Là où Yakuba <span className="underline-green">aide vraiment</span>.
            </p>

            <div className={styles.mosaic}>
              {/* Communiquer — bulles flottantes */}
              <div className={`${styles.cell} ${styles.cellTall}`}>
                <span className={styles.glowCommuniquer} aria-hidden />
                <div className={styles.tag}>COMMUNIQUER</div>
                <div className={styles.cellTitle}>
                  Écrire à la famille,
                  <br />
                  dans la langue de la maison.
                </div>
                <div className={styles.bubbles}>
                  <div className={styles.bubbleFr}>Tu nous manques, ma fille.</div>
                  <div className={styles.bubbleBm}>I gnanafi bè an na, nè den muso.</div>
                  <span className={styles.bubbleNote}>traduction en bambara ✓</span>
                </div>
              </div>

              {/* Apprendre — carte de vocabulaire */}
              <div className={styles.cell}>
                <div className={styles.cellSplit}>
                  <div className={styles.cellText}>
                    <div className={styles.tag}>APPRENDRE</div>
                    <div className={styles.cellTitle}>
                      Un mot, son sens,
                      <br />
                      phrase par phrase.
                    </div>
                  </div>
                  <div className={styles.vocabWrap}>
                    <div className={styles.vocabShadow} />
                    <div className={styles.vocabCard}>
                      <span className={styles.vocabWord}>sɔgɔma</span>
                      <span className={styles.vocabLine} />
                      <span className={styles.vocabMeaning}>le matin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Créer — invitation */}
              <div className={styles.cell}>
                <div className={styles.cellSplit}>
                  <div className={styles.cellText}>
                    <div className={styles.tag}>CRÉER</div>
                    <div className={styles.cellTitle}>
                      Invitations, annonces,
                      <br />
                      prêtes à envoyer.
                    </div>
                  </div>
                  <div className={styles.invite}>
                    <div className={styles.inviteKicker}>ɲƐNAJƐ</div>
                    <div className={styles.inviteTitle}>Furusiri</div>
                    <div className={styles.inviteLine} />
                    <div className={styles.inviteInfo}>sibiri · 14 h<br />Bamako</div>
                  </div>
                </div>
              </div>

              {/* Travailler — diffusion */}
              <div className={styles.cell}>
                <span className={`${styles.ring} ${styles.ring1}`} aria-hidden />
                <span className={`${styles.ring} ${styles.ring2}`} aria-hidden />
                <span className={`${styles.ring} ${styles.ring3}`} aria-hidden />
                <span className={styles.ringDot} aria-hidden />
                <div className={styles.tag}>TRAVAILLER</div>
                <div className={`${styles.cellTitle} ${styles.cellTitleWork}`}>
                  Parler à ses clients,
                  <br />
                  dans les deux sens.
                </div>
                <div className={styles.workChips}>
                  <span className={styles.workChipFr}>support · FR</span>
                  <span className={styles.workChipBm}>réponse · BM</span>
                </div>
              </div>

              {/* Enseigner — alphabet */}
              <div className={styles.cell}>
                <div className={styles.cellSplitCenter}>
                  <div className={styles.cellText}>
                    <div className={styles.tag}>ENSEIGNER</div>
                    <div className={styles.cellTitle}>
                      Des supports écrits
                      <br />
                      dans la vraie graphie.
                    </div>
                  </div>
                  <div className={styles.letters}>
                    <span className={styles.letterDark}>ɛ</span>
                    <span className={styles.letterGreen}>ɔ</span>
                    <span className={styles.letterGray}>ɲ</span>
                  </div>
                </div>
              </div>

              {/* Transmettre — proverbe */}
              <div className={`${styles.cell} ${styles.cellWide} ${styles.cellDark}`}>
                <span className={styles.proverbGlow} aria-hidden />
                <span className={styles.proverbQuote} aria-hidden>»</span>
                <div className={styles.proverbRow}>
                  <div className={styles.proverbText}>
                    <div className={`${styles.tag} ${styles.tagGreen}`}>TRANSMETTRE</div>
                    <div className={styles.proverb}>« Dɔɔnin dɔɔnin, kɔnɔnin bɛ a ɲaga da. »</div>
                    <div className={styles.proverbGloss}>
                      Petit à petit, l&apos;oiseau fait son nid — contes et proverbes, mis à l&apos;écrit.
                    </div>
                  </div>
                  <span className={styles.proverbBadge}>ORAL → ÉCRIT</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
