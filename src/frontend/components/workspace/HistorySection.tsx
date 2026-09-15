"use client";

import { useState } from "react";
import type { Convo } from "@/lib/workspace-data";
import styles from "./HistorySection.module.css";

type HistorySectionProps = {
  convos: Convo[];
  onOpen: (id: number) => void;
  onDelete: (id: number) => void;
  onNewConvo: () => void;
};

export default function HistorySection({ convos, onOpen, onDelete, onNewConvo }: HistorySectionProps) {
  const [search, setSearch] = useState("");

  const filtered = convos.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h1 className={styles.title}>Historique</h1>
          <button className={styles.newBtn} onClick={onNewConvo}>＋ Nouvelle conversation</button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une conversation…"
          aria-label="Rechercher une conversation"
          className={styles.search}
        />

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Aucune conversation</div>
            <div className={styles.emptyHint}>Vos échanges avec Yakuba apparaîtront ici.</div>
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((c) => (
              <div key={c.id} className={styles.item}>
                <button className={styles.itemMain} onClick={() => onOpen(c.id)}>
                  <span className={styles.itemTitle}>{c.title}</span>
                  <span className={styles.itemDate}>{c.date}</span>
                </button>
                <button
                  className={styles.delete}
                  title="Supprimer"
                  aria-label={`Supprimer « ${c.title} »`}
                  onClick={() => onDelete(c.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
