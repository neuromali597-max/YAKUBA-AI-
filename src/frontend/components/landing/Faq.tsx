"use client";

import { useState } from "react";
import { FAQS } from "@/lib/mock-data";
import { useReveal } from "@/lib/hooks";
import styles from "./Faq.module.css";

export default function Faq() {
  const { ref, visible } = useReveal<HTMLElement>(0.12);
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" ref={ref} className={styles.section}>
      <div className="container">
        {(
          <div className={styles.grid}>
            <div>
              <div className="kicker">FAQ</div>
              <h2 className={styles.title}>
                Des questions ? <span className="serif-accent">Normal.</span>
              </h2>
              <p className={styles.subtitle}>
                Voici les réponses <span className="underline-green">directes</span>.
              </p>
            </div>
            <div className={styles.list}>
              {FAQS.map((item, i) => (
                <div
                  key={item.q}
                  className={`${styles.row} ${open === i ? styles.rowOpen : ""}`}
                >
                  <button
                    className={`${styles.question} ${open === i ? styles.questionOpen : ""}`}
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                  >
                    <span className={`${styles.num} ${open === i ? styles.numOpen : ""}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.qText}>{item.q}</span>
                    <span className={`${styles.sign} ${open === i ? styles.signOpen : ""}`}>+</span>
                  </button>
                  {open === i && <div className={styles.answer}>{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
