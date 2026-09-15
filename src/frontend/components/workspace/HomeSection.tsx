"use client";

import PillInput from "./PillInput";
import styles from "./HomeSection.module.css";

type HomeSectionProps = {
  onSend: (text: string) => void;
  onGoChat: () => void;
  onGoTranslate: (toBambara: boolean) => void;
  onGoGenerate: () => void;
  onGoPhoto: () => void;
  onFeedback?: (msg: string, kind?: "success" | "error") => void;
};

export default function HomeSection({
  onSend,
  onGoChat,
  onGoTranslate,
  onGoGenerate,
  onGoPhoto,
  onFeedback,
}: HomeSectionProps) {
  const actions = [
    {
      tag: "DISCUTER",
      label: "Discuter avec Yakuba",
      sub: "Posez vos questions en français ou en bambara",
      onTap: onGoChat,
    },
    {
      tag: "TRADUIRE",
      label: "Traduire en Bambara",
      sub: "Français → Bambara, traduction naturelle",
      onTap: () => onGoTranslate(true),
    },
    {
      tag: "TRADUIRE",
      label: "Traduire en Français",
      sub: "Bambara → Français, sans mot-à-mot",
      onTap: () => onGoTranslate(false),
    },
    {
      tag: "PHOTO",
      label: "Traduire une photo",
      sub: "Photographiez un texte, Yakuba le lit et le traduit",
      onTap: onGoPhoto,
    },
    {
      tag: "GÉNÉRER",
      label: "Générer en Bambara",
      sub: "Messages, histoires, publications, textes éducatifs…",
      onTap: onGoGenerate,
    },
  ];

  return (
    <>
      <div className={styles.scroll}>
        <div className={styles.inner}>
          <h1 className={styles.greeting}>
            Bonjour 👋
            <br />
            Que voulez-vous faire avec Yakuba aujourd&apos;hui ?
          </h1>
          <div className={styles.grid}>
            {actions.map((a) => (
              <button key={a.label} className={styles.card} onClick={a.onTap}>
                <span className={styles.tag}>{a.tag}</span>
                <span className={styles.cardLabel}>{a.label}</span>
                <span className={styles.cardSub}>{a.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <PillInput placeholder="Écrivez ou dictez à Yakuba…" onSend={onSend} onFeedback={onFeedback} />
    </>
  );
}
