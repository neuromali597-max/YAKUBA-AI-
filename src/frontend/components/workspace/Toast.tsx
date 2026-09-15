"use client";

import styles from "./Toast.module.css";

export type ToastData = {
  message: string;
  kind: "success" | "error";
};

export default function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      key={toast.message}
      className={`${styles.toast} ${toast.kind === "error" ? styles.error : ""}`}
    >
      <span className={styles.icon}>{toast.kind === "error" ? "!" : "✓"}</span>
      {toast.message}
    </div>
  );
}
