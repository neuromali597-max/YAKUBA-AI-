"use client";

import Image from "next/image";
import type { Section } from "@/lib/workspace-data";
import { GUEST_LABEL, initialsOf, type AppUser } from "@/lib/user";
import type { Theme } from "./Workspace";
import styles from "./Sidebar.module.css";

const NAV: { key: Section; label: string; icon: string }[] = [
  { key: "home", label: "Accueil", icon: "⌂" },
  { key: "translate", label: "Traduction", icon: "⇄" },
  { key: "generate", label: "Génération Bambara", icon: "✎" },
  { key: "history", label: "Historique", icon: "◴" },
  { key: "settings", label: "Paramètres", icon: "⚙" },
  { key: "help", label: "Aide", icon: "?" },
];

type SidebarProps = {
  user: AppUser;
  section: Section;
  open: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  onNavigate: (s: Section) => void;
  onNewConvo: () => void;
  onClose: () => void;
};

export default function Sidebar({
  user,
  section,
  open,
  theme,
  onToggleTheme,
  onNavigate,
  onNewConvo,
  onClose,
}: SidebarProps) {
  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <Image src="/yakuba-logo.jpeg" alt="Yakuba" width={38} height={38} className={styles.logo} />
          <div>
            <div className={styles.brandName}>Yakuba AI</div>
            <div className={styles.brandSub}>Français ↔ Bambara</div>
          </div>
        </div>

        <button className={styles.newBtn} onClick={onNewConvo}>
          ＋ Nouvelle conversation
        </button>

        <nav className={styles.nav} aria-label="Sections">
          {NAV.map((n) => (
            <button
              key={n.key}
              className={`${styles.navItem} ${section === n.key ? styles.navItemOn : ""}`}
              aria-current={section === n.key ? "page" : undefined}
              onClick={() => onNavigate(n.key)}
            >
              <span className={styles.navIcon}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className={styles.spacer} />

        <button
          className={styles.themeToggle}
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Basculer le thème sombre"
          onClick={onToggleTheme}
        >
          <span className={styles.themeIcon}>{theme === "dark" ? "☾" : "☀"}</span>
          <span className={styles.themeLabel}>
            {theme === "dark" ? "Thème sombre" : "Thème clair"}
          </span>
          <span className={styles.track}>
            <span className={styles.knob} />
          </span>
        </button>

        <button className={styles.userCard} onClick={() => onNavigate("settings")}>
          {user?.image ? (
            <Image
              src={user.image}
              alt=""
              width={32}
              height={32}
              className={styles.avatarImg}
              unoptimized
            />
          ) : (
            <span className={styles.avatar}>{initialsOf(user)}</span>
          )}
          <span className={styles.userText}>
            <span className={styles.userName}>{user?.name ?? GUEST_LABEL}</span>
            <span className={styles.userPlan}>
              {user ? user.email || "Compte gratuit" : "Non connecté"}
            </span>
          </span>
        </button>
      </aside>
    </>
  );
}
