"use client";

import { useState } from "react";
import ChatDemo from "./ChatDemo";
import TranslateDemo from "./TranslateDemo";
import styles from "./ProductDemo.module.css";

const TABS = [
  { key: "chat", label: "Conversation" },
  { key: "translate", label: "Traduction" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ProductDemo() {
  const [tab, setTab] = useState<TabKey>("chat");

  return (
    <section id="produit" className={styles.section}>
      <div className="kicker">LE PRODUIT</div>
      <h2 className={`display ${styles.title}`}>
        Essayez-le, <span className="serif-accent">en direct</span>.
      </h2>
      <div className={styles.tabsRow}>
        <div className={styles.tabs} role="tablist" aria-label="Vue du produit">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabOn : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tab === "chat" ? <ChatDemo /> : <TranslateDemo />}
    </section>
  );
}
