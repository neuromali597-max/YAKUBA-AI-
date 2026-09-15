"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth-actions";
import styles from "./GoogleButton.module.css";

type GoogleButtonProps = {
  /** Vrai OAuth possible ? (identifiants Google présents côté serveur) */
  configured: boolean;
  disabled?: boolean;
  onUnavailable?: () => void;
};

export default function GoogleButton({ configured, disabled, onUnavailable }: GoogleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!configured) {
      onUnavailable?.();
      return;
    }
    setLoading(true);
    // Redirection réelle vers Google (choix du compte), puis retour sur /app.
    await signInWithGoogle();
  };

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={handleClick}
      disabled={loading || disabled}
      aria-describedby={configured ? undefined : "google-indispo"}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden />
      ) : (
        <svg className={styles.logo} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#4285F4"
            d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.1 3.57-5.17 3.57-8.81Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.78l4.01-3.1Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.76c1.76 0 3.34.6 4.58 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.87 8.88 4.76 12 4.76Z"
          />
        </svg>
      )}
      {loading ? "Redirection vers Google…" : "Continuer avec Google"}
    </button>
  );
}
