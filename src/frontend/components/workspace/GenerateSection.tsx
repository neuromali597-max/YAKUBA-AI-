"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GEN_OUT, GEN_SUGGESTIONS, GEN_TYPES, type GenType } from "@/lib/workspace-data";
import styles from "./GenerateSection.module.css";

type GenMessage = {
  id: number;
  role: "user" | "ai";
  text: string;
  genType?: GenType;
};

type GenerateSectionProps = {
  onFeedback: (msg: string, kind?: "success" | "error") => void;
};

let genId = 0;

// Devine le type de contenu depuis une demande libre — la saisie reste toujours libre,
// le type ne sert qu'à choisir le texte mocké le plus proche.
function inferType(text: string, fallback: GenType): GenType {
  const t = text.toLowerCase();
  if (/conte|histoire|li[eè]vre|enfant/.test(t)) return "Histoire";
  if (/publication|post|r[ée]seaux|facebook|instagram/.test(t)) return "Publication";
  if (/[ée]cole|le[çc]on|[ée]ducati|hygi[èe]ne|apprend/.test(t)) return "Texte éducatif";
  if (/r[ée]union|recrut|professionnel|entreprise|client|invitation/.test(t)) return "Professionnel";
  if (/proverbe|c[ée]r[ée]monie|tradition|culture|th[ée]/.test(t)) return "Culturel";
  if (/message|v[œo]ux|remerci|mariage|f[ée]licit/.test(t)) return "Message";
  return fallback;
}

export default function GenerateSection({ onFeedback }: GenerateSectionProps) {
  const [genType, setGenType] = useState<GenType>("Message");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<GenMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    const type = inferType(text, genType);
    setGenType(type);
    setMessages((ms) => [...ms, { id: ++genId, role: "user", text }]);
    setInput("");
    setTyping(true);
    // Réponse mockée en attendant le backend.
    setTimeout(() => {
      setMessages((ms) => [...ms, { id: ++genId, role: "ai", text: GEN_OUT[type], genType: type }]);
      setTyping(false);
    }, 1400);
  };

  const regenerate = (index: number) => {
    const target = messages[index];
    if (!target || typing) return;
    setMessages((ms) => ms.slice(0, index));
    setTyping(true);
    setTimeout(() => {
      setMessages((ms) => [...ms, { id: ++genId, role: "ai", text: GEN_OUT[target.genType ?? genType], genType: target.genType }]);
      setTyping(false);
    }, 1200);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onFeedback("Texte copié ✓");
    } catch {
      onFeedback("Impossible de copier", "error");
    }
  };

  const useSuggestion = (s: string) => {
    setInput(s);
    inputRef.current?.focus();
  };

  const empty = messages.length === 0 && !typing;

  return (
    <>
      <div ref={scrollRef} className={styles.scroll}>
        <div className={styles.inner}>
          {empty ? (
            <div className={styles.empty}>
              <span className={styles.emptyRing}>
                <Image src="/yakuba-logo.jpeg" alt="" width={56} height={56} className={styles.emptyLogo} />
              </span>
              <h1 className={styles.emptyTitle}>Dites-moi quoi écrire en bamanankan.</h1>
              <p className={styles.emptyHint}>
                Un message, une histoire, une annonce, une publication… Décrivez-le avec vos
                mots, Yakuba le rédige.
              </p>
            </div>
          ) : (
            messages.map((m, i) =>
              m.role === "user" ? (
                <div key={m.id} className={styles.userBubble}>{m.text}</div>
              ) : (
                <div key={m.id} className={styles.aiRow}>
                  <Image src="/yakuba-logo.jpeg" alt="" width={28} height={28} className={styles.aiAvatar} />
                  <div className={styles.aiCol}>
                    <div className={styles.aiBubble}>
                      {m.genType && (
                        <span className={styles.aiTag}>{m.genType.toUpperCase()} · BAMBARA</span>
                      )}
                      <div className={styles.aiText}>{m.text}</div>
                    </div>
                    <div className={styles.actions}>
                      <button className={styles.action} onClick={() => copy(m.text)}>Copier</button>
                      <button className={styles.action} onClick={() => regenerate(i)}>Régénérer</button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
          {typing && (
            <div className={styles.aiRow}>
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

      {/* Composer : saisie libre en premier, suggestions facultatives juste au-dessus */}
      <div className={styles.composerWrap}>
        <div className={styles.composer}>
          <div className={styles.typesRow}>
            <span className={styles.typesLabel}>Type</span>
            <div className={styles.types} role="radiogroup" aria-label="Type de contenu (facultatif)">
              {GEN_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={genType === t}
                  className={`${styles.type} ${genType === t ? styles.typeOn : ""}`}
                  onClick={() => setGenType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.suggestions} aria-label="Idées, si vous ne savez pas quoi demander">
            <span className={styles.suggestionsLabel}>Idées</span>
            {GEN_SUGGESTIONS[genType].map((s) => (
              <button key={s} type="button" className={styles.suggestion} onClick={() => useSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Écrivez librement ce que Yakuba doit rédiger…"
              aria-label="Votre demande"
              rows={1}
              className={styles.textarea}
            />
            <button
              type="button"
              className={styles.send}
              aria-label="Envoyer"
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
            >
              ↑
            </button>
          </div>
          <div className={styles.hint}>
            Entrée pour envoyer · Maj + Entrée pour une nouvelle ligne · relisez les textes importants.
          </div>
        </div>
      </div>
    </>
  );
}
