"use client";

import { useState } from "react";
import { translateMock } from "@/lib/workspace-data";
import VoiceButton from "./VoiceButton";
import PhotoTranslate from "./PhotoTranslate";
import styles from "./TranslateSection.module.css";

type TranslateSectionProps = {
  initialToBambara?: boolean;
  initialMode?: "texte" | "photo";
  onFeedback: (msg: string, kind?: "success" | "error") => void;
};

export default function TranslateSection({
  initialToBambara = true,
  initialMode = "texte",
  onFeedback,
}: TranslateSectionProps) {
  const [mode, setMode] = useState<"texte" | "photo">(initialMode);
  const [srcFr, setSrcFr] = useState(initialToBambara);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [translating, setTranslating] = useState(false);

  const doTranslate = () => {
    if (translating) return;
    if (!input.trim()) {
      onFeedback("Écrivez d'abord un texte à traduire", "error");
      return;
    }
    setTranslating(true);
    setResult("");
    setTimeout(() => {
      setResult(translateMock(input, srcFr));
      setTranslating(false);
    }, 1200);
  };

  const swap = () => {
    setSrcFr((v) => !v);
    setInput(result || input);
    setResult("");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      onFeedback("Traduction copiée ✓");
    } catch {
      onFeedback("Impossible de copier", "error");
    }
  };

  const edit = () => {
    setInput(result);
    setResult("");
    setSrcFr((v) => !v);
  };

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Traduction</h1>

        {/* Deux façons d'entrer un texte : l'écrire/le dicter, ou le photographier */}
        <div className={styles.modes} role="tablist" aria-label="Source du texte">
          <button
            role="tab"
            aria-selected={mode === "texte"}
            className={`${styles.mode} ${mode === "texte" ? styles.modeOn : ""}`}
            onClick={() => setMode("texte")}
          >
            ✎ Texte
          </button>
          <button
            role="tab"
            aria-selected={mode === "photo"}
            className={`${styles.mode} ${mode === "photo" ? styles.modeOn : ""}`}
            onClick={() => setMode("photo")}
          >
            📷 Photo
          </button>
        </div>

        <div className={styles.langRow}>
          <div className={styles.langSrc}>{srcFr ? "Français" : "Bambara"}</div>
          <button className={styles.swap} title="Inverser" onClick={swap}>⇄</button>
          <div className={styles.langDst}>{srcFr ? "Bambara" : "Français"}</div>
        </div>

        {mode === "photo" && (
          <PhotoTranslate
            onTextDetected={(text) => {
              setInput(text);
              setMode("texte");
              setResult("");
            }}
            onFeedback={onFeedback}
          />
        )}

        {mode === "texte" && (
          <>
            <div className={styles.inputCard}>
              <div className={styles.inputHead}>
                <span className={styles.inputLabel}>
                  {srcFr ? "TEXTE EN FRANÇAIS" : "TEXTE EN BAMBARA"}
                </span>
                <VoiceButton
                  lang={srcFr ? "fr-FR" : "fr-FR"}
                  title="Dicter le texte à traduire"
                  onInterim={(t) => setInput(t)}
                  onFinal={(t) => setInput(t)}
                  onFeedback={onFeedback}
                />
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={srcFr ? "Écrivez, dictez ou photographiez un texte…" : "Ex. : I ni sɔgɔma, i ka kɛnɛ wa?"}
                rows={4}
                className={styles.textarea}
              />
            </div>

            <button className={styles.translateBtn} onClick={doTranslate} disabled={translating}>
              {translating && <span className={styles.spinner} aria-hidden />}
              {translating ? "Traduction en cours…" : "Traduire"}
            </button>
          </>
        )}

        {result && (
          <>
            <div className={styles.resultCard}>
              <div className={styles.resultLabel}>{srcFr ? "BAMBARA" : "FRANÇAIS"}</div>
              <div className={styles.resultText}>{result}</div>
              <div className={styles.resultActions}>
                <button className={styles.resultAction} onClick={copy}>
                  Copier
                </button>
                <button className={`${styles.resultAction} ${styles.resultActionSoft}`} onClick={edit}>
                  Modifier
                </button>
              </div>
            </div>
            <div className={styles.note}>
              Aperçu de démonstration — relisez les textes importants avant envoi.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
