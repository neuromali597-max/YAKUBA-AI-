"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PhotoTranslate.module.css";

type PhotoTranslateProps = {
  /** Texte lu sur l'image, prêt à être traduit */
  onTextDetected: (text: string) => void;
  onFeedback: (msg: string, kind?: "success" | "error") => void;
};

const MAX_MB = 8;

export default function PhotoTranslate({ onTextDetected, onFeedback }: PhotoTranslateProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [reading, setReading] = useState(false);
  const [manual, setManual] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    previewRef.current = preview;
  }, [preview]);
  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
  }, []);

  const clear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName("");
    setManual(null);
    if (fileRef.current) fileRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
  };

  const handleFile = async (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onFeedback("Choisissez une image (JPG, PNG ou WEBP)", "error");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      onFeedback(`Image trop lourde — ${MAX_MB} Mo maximum`, "error");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    setManual(null);
    setReading(true);

    try {
      const fd = new FormData();
      fd.set("image", file);
      const res = await fetch("/api/ocr", { method: "POST", body: fd });

      if (res.ok) {
        const data = (await res.json()) as { text: string; confidence?: number };
        setReading(false);
        onTextDetected(data.text);
        onFeedback(
          typeof data.confidence === "number" && data.confidence < 75
            ? "Texte détecté — relisez-le, la photo est peu nette"
            : "Texte détecté ✓ — corrigez-le si besoin"
        );
        return;
      }
      if (res.status === 503) {
        // Lecture automatique pas encore branchée : saisie assistée.
        setReading(false);
        setManual("");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setReading(false);
      setManual("");
      onFeedback(data.error ?? "Lecture de l'image impossible", "error");
    } catch {
      setReading(false);
      setManual("");
      onFeedback("Lecture de l'image impossible", "error");
    }
  };

  return (
    <div className={styles.root}>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className={styles.hidden}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {/* capture="environment" ouvre l'appareil photo arrière sur mobile */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={styles.hidden}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {!preview ? (
        <div
          className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
        >
          <span className={styles.dropIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1.1-1.8A1.5 1.5 0 0 1 9.6 3.5h4.8a1.5 1.5 0 0 1 1.3.7L16.8 6h1.7A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-9Z" />
              <circle cx="12" cy="12.5" r="3.5" />
            </svg>
          </span>
          <div className={styles.dropTitle}>Photographiez un texte</div>
          <div className={styles.dropHint}>
            Une affiche, une page, un message écrit — Yakuba le lit, le comprend et le traduit.
          </div>
          <div className={styles.dropActions}>
            <button type="button" className={styles.primaryBtn} onClick={() => cameraRef.current?.click()}>
              📷 Prendre une photo
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={() => fileRef.current?.click()}>
              Choisir une image
            </button>
          </div>
          <div className={styles.dropNote}>Glissez aussi une image ici · JPG, PNG · {MAX_MB} Mo max</div>
        </div>
      ) : (
        <div className={styles.result}>
          <div className={styles.previewWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt={fileName || "Image à lire"} className={styles.preview} />
            {reading && (
              <div className={styles.scanOverlay} aria-hidden>
                <span className={styles.scanLine} />
              </div>
            )}
            <button type="button" className={styles.removeBtn} aria-label="Retirer l'image" onClick={clear}>
              ×
            </button>
          </div>

          {reading ? (
            <div className={styles.reading}>
              <span className={styles.spinner} aria-hidden />
              Yakuba lit l&apos;image…
            </div>
          ) : manual !== null ? (
            <div className={styles.manualBox}>
              <div className={styles.manualLabel}>RECOPIEZ LE TEXTE DE L&apos;IMAGE</div>
              <textarea
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                placeholder="Tapez ici le texte visible sur la photo…"
                rows={3}
                className={styles.manualInput}
              />
              <div className={styles.manualRow}>
                <span className={styles.manualHint}>
                  La lecture automatique arrive bientôt — en attendant, Yakuba traduit le texte
                  que vous recopiez.
                </span>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  disabled={!manual.trim()}
                  onClick={() => { onTextDetected(manual.trim()); onFeedback("Texte prêt à traduire ✓"); }}
                >
                  Traduire ce texte
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.doneRow}>
              <span className={styles.doneBadge}>✓ TEXTE DÉTECTÉ</span>
              <button type="button" className={styles.secondaryBtn} onClick={clear}>
                Autre image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
