"use client";

import { useState } from "react";
import VoiceButton from "./VoiceButton";
import styles from "./PillInput.module.css";

type PillInputProps = {
  placeholder: string;
  onSend: (text: string) => void;
  onFeedback?: (msg: string, kind?: "success" | "error") => void;
};

// Barre de saisie arrondie (Accueil + Conversation), avec dictée vocale.
export default function PillInput({ placeholder, onSend, onFeedback }: PillInputProps) {
  const [value, setValue] = useState("");
  const [dictating, setDictating] = useState(false);

  const submit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className={styles.wrap}>
      <div className={`${styles.pill} ${dictating ? styles.pillListening : ""}`}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder={dictating ? "Je vous écoute…" : placeholder}
          aria-label={placeholder}
          className={styles.input}
        />
        <VoiceButton
          onInterim={(t) => { setDictating(true); setValue(t); }}
          onFinal={(t) => { setDictating(false); setValue(t); }}
          onFeedback={onFeedback}
        />
        <button className={styles.send} aria-label="Envoyer" onClick={submit}>
          ↑
        </button>
      </div>
    </div>
  );
}
