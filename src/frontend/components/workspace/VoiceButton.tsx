"use client";

import { useEffect, useRef, useState } from "react";
import {
  createRecognition,
  isSpeechRecognitionSupported,
  type SpeechRecognitionLike,
} from "@/lib/speech";
import styles from "./VoiceButton.module.css";

type VoiceButtonProps = {
  /** Transcription en cours (aperçu live dans le champ) */
  onInterim?: (text: string) => void;
  /** Transcription finale : le texte dicté est prêt */
  onFinal: (text: string) => void;
  onFeedback?: (msg: string, kind?: "success" | "error") => void;
  lang?: string;
  title?: string;
};

const BAR_COUNT = 5;

export default function VoiceButton({
  onInterim,
  onFinal,
  onFeedback,
  lang = "fr-FR",
  title = "Dicter à la voix",
}: VoiceButtonProps) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef("");

  useEffect(() => {
    setSupported(isSpeechRecognitionSupported());
    return () => {
      try {
        recRef.current?.abort();
      } catch {}
    };
  }, []);

  const stop = () => {
    try {
      recRef.current?.stop();
    } catch {}
    setListening(false);
  };

  const start = () => {
    if (listening) {
      stop();
      return;
    }
    const rec = createRecognition(lang);
    if (!rec) {
      setSupported(false);
      onFeedback?.("La dictée vocale n'est pas disponible sur ce navigateur", "error");
      return;
    }
    finalRef.current = "";
    recRef.current = rec;

    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0].transcript;
        if (res.isFinal) finalRef.current += text;
        else interim += text;
      }
      onInterim?.((finalRef.current + interim).trim());
    };

    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        onFeedback?.("Micro refusé — autorisez l'accès dans votre navigateur", "error");
      } else if (e.error !== "aborted" && e.error !== "no-speech") {
        onFeedback?.("La dictée s'est interrompue", "error");
      }
    };

    rec.onend = () => {
      setListening(false);
      const text = finalRef.current.trim();
      if (text) onFinal(text);
    };

    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
      onFeedback?.("Impossible de démarrer le micro", "error");
    }
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={start}
      aria-pressed={listening}
      aria-label={listening ? "Arrêter la dictée" : title}
      title={listening ? "Arrêter la dictée" : title}
      className={`${styles.btn} ${listening ? styles.btnOn : ""}`}
    >
      {listening ? (
        <span className={styles.waves} aria-hidden>
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span key={i} className={styles.wave} style={{ animationDelay: `${i * 0.09}s` }} />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden className={styles.icon}>
          <path
            d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 11v1a7 7 0 0 1-14 0v-1M12 19v3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
