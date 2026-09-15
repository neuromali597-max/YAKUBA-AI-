"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AI_REPLIES,
  INITIAL_CONVOS,
  type ChatMessage,
  type Convo,
  type Section,
} from "@/lib/workspace-data";
import type { AppUser } from "@/lib/user";
import Sidebar from "./Sidebar";
import HomeSection from "./HomeSection";
import ChatSection from "./ChatSection";
import TranslateSection from "./TranslateSection";
import GenerateSection from "./GenerateSection";
import HistorySection from "./HistorySection";
import SettingsSection from "./SettingsSection";
import HelpSection from "./HelpSection";
import Toast, { type ToastData } from "./Toast";
import styles from "./Workspace.module.css";

export type Theme = "light" | "dark";

const THEME_KEY = "yakuba-app-theme";

const TITLES: Record<Section, string> = {
  home: "Accueil",
  chat: "Conversation",
  translate: "Traduction",
  generate: "Génération",
  history: "Historique",
  settings: "Paramètres",
  help: "Aide",
};

let msgId = 0;

export default function Workspace({ user = null }: { user?: AppUser }) {
  const [section, setSection] = useState<Section>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [convos, setConvos] = useState<Convo[]>(INITIAL_CONVOS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [translateToBm, setTranslateToBm] = useState(true);
  const [translateMode, setTranslateMode] = useState<"texte" | "photo">("texte");
  const [theme, setThemeState] = useState<Theme>("light");
  const [toast, setToast] = useState<ToastData | null>(null);
  const aiCount = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Thème persistant (localStorage), appliqué au montage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") setThemeState(saved);
    } catch {}
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {}
  }, []);

  const showToast = useCallback((message: string, kind: "success" | "error" = "success") => {
    setToast({ message, kind });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const go = useCallback((s: Section) => {
    setSection(s);
    setDrawerOpen(false);
  }, []);

  const newConvo = useCallback(() => {
    setMessages([]);
    setTyping(false);
    go("home");
  }, [go]);

  // Envoi d'un message : réponse IA mockée en attendant le backend.
  const sendMessage = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value) return;
      setMessages((ms) => [...ms, { id: ++msgId, role: "user", text: value }]);
      go("chat");
      setTyping(true);
      setTimeout(() => {
        const reply = AI_REPLIES[aiCount.current % AI_REPLIES.length];
        aiCount.current += 1;
        setMessages((ms) => [...ms, { id: ++msgId, role: "ai", text: reply }]);
        setTyping(false);
      }, 1600);
    },
    [go]
  );

  const regenerate = useCallback((index: number) => {
    setMessages((ms) => ms.slice(0, index));
    setTyping(true);
    setTimeout(() => {
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      setMessages((ms) => [...ms, { id: ++msgId, role: "ai", text: reply }]);
      setTyping(false);
    }, 1400);
  }, []);

  return (
    <div className={`yk-app ${styles.shell}`} data-theme={theme}>
      <Sidebar
        user={user}
        section={section}
        open={drawerOpen}
        theme={theme}
        onToggleTheme={() => {
          const next = theme === "light" ? "dark" : "light";
          setTheme(next);
          showToast(next === "dark" ? "Thème sombre activé" : "Thème clair activé");
        }}
        onNavigate={go}
        onNewConvo={newConvo}
        onClose={() => setDrawerOpen(false)}
      />

      <div className={styles.main}>
        <header className={styles.mobileBar}>
          <button
            className={styles.menuBtn}
            aria-label="Ouvrir le menu"
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </button>
          <span className={styles.mobileTitle}>{TITLES[section]}</span>
          <button className={styles.mobileNew} aria-label="Nouvelle conversation" onClick={newConvo}>
            ＋
          </button>
        </header>

        {section === "home" && (
          <HomeSection
            onSend={sendMessage}
            onGoChat={() => go("chat")}
            onGoTranslate={(toBambara) => {
              setTranslateToBm(toBambara);
              setTranslateMode("texte");
              go("translate");
            }}
            onGoGenerate={() => go("generate")}
            onGoPhoto={() => {
              setTranslateToBm(false);
              setTranslateMode("photo");
              go("translate");
            }}
            onFeedback={showToast}
          />
        )}
        {section === "chat" && (
          <ChatSection
            messages={messages}
            typing={typing}
            onSend={sendMessage}
            onRegenerate={regenerate}
            onFeedback={showToast}
          />
        )}
        {section === "translate" && (
          <TranslateSection
            key={`${translateToBm}-${translateMode}`}
            initialToBambara={translateToBm}
            initialMode={translateMode}
            onFeedback={showToast}
          />
        )}
        {section === "generate" && <GenerateSection onFeedback={showToast} />}
        {section === "history" && (
          <HistorySection
            convos={convos}
            onOpen={() => go("chat")}
            onDelete={(id) => {
              setConvos((cs) => cs.filter((c) => c.id !== id));
              showToast("Conversation supprimée");
            }}
            onNewConvo={newConvo}
          />
        )}
        {section === "settings" && (
          <SettingsSection user={user} theme={theme} onThemeChange={setTheme} onFeedback={showToast} />
        )}
        {section === "help" && <HelpSection onGoChat={() => go("chat")} />}
      </div>

      <Toast toast={toast} />
    </div>
  );
}
