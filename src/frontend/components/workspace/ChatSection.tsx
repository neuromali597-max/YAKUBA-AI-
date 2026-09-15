"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ChatMessage } from "@/lib/workspace-data";
import { isSpeechSynthesisSupported, speak, stopSpeaking } from "@/lib/speech";
import PillInput from "./PillInput";
import styles from "./ChatSection.module.css";

type ChatSectionProps = {
  messages: ChatMessage[];
  typing: boolean;
  onSend: (text: string) => void;
  onRegenerate: (index: number) => void;
  onFeedback: (msg: string, kind?: "success" | "error") => void;
};

export default function ChatSection({
  messages,
  typing,
  onSend,
  onRegenerate,
  onFeedback,
}: ChatSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  // Lecture à voix haute de la réponse (relance = arrêt).
  const toggleSpeak = (id: number, text: string) => {
    if (!isSpeechSynthesisSupported()) {
      onFeedback("La lecture vocale n'est pas disponible sur ce navigateur", "error");
      return;
    }
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    speak(text);
    setSpeakingId(id);
    window.setTimeout(() => setSpeakingId((cur) => (cur === id ? null : cur)), text.length * 90);
  };

  useEffect(() => () => stopSpeaking(), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, typing]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onFeedback("Réponse copiée ✓");
    } catch {
      onFeedback("Impossible de copier", "error");
    }
  };

  return (
    <>
      <div ref={scrollRef} className={styles.scroll}>
        <div className={styles.inner}>
          {messages.length === 0 && !typing && (
            <div className={styles.empty}>
              <Image src="/yakuba-logo.jpeg" alt="" width={64} height={64} className={styles.emptyLogo} />
              <div className={styles.emptyTitle}>Aucune conversation</div>
              <div className={styles.emptyHint}>
                Écrivez votre premier message ci-dessous. Yakuba comprend le français et le bambara.
              </div>
            </div>
          )}
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={m.id} className={styles.userBubble}>{m.text}</div>
            ) : (
              <div key={m.id} className={styles.aiRow}>
                <Image src="/yakuba-logo.jpeg" alt="" width={28} height={28} className={styles.aiAvatar} />
                <div className={styles.aiCol}>
                  <div className={styles.aiBubble}>{m.text}</div>
                  <div className={styles.actions}>
                    <button className={styles.action} onClick={() => copy(m.text)}>Copier</button>
                    <button
                      className={`${styles.action} ${speakingId === m.id ? styles.actionOn : ""}`}
                      onClick={() => toggleSpeak(m.id, m.text)}
                    >
                      {speakingId === m.id ? "⏹ Arrêter" : "🔊 Écouter"}
                    </button>
                    <button className={styles.action} onClick={() => onRegenerate(i)}>Régénérer</button>
                    <button
                      className={`${styles.action} ${liked[m.id] ? styles.actionOn : ""}`}
                      aria-pressed={!!liked[m.id]}
                      onClick={() => {
                        setLiked((l) => ({ ...l, [m.id]: !l[m.id] }));
                        if (!liked[m.id]) onFeedback("Merci pour votre retour !");
                      }}
                    >
                      Utile 👍
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
          {typing && (
            <div className={styles.typingRow}>
              <Image src="/yakuba-logo.jpeg" alt="" width={28} height={28} className={styles.aiAvatar} />
              <div className={styles.typingBubble}>
                <span className={styles.dot} />
                <span className={styles.dot} style={{ animationDelay: "0.15s" }} />
                <span className={styles.dot} style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <PillInput placeholder="Message à Yakuba…" onSend={onSend} onFeedback={onFeedback} />
    </>
  );
}
