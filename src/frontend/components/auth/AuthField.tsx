"use client";

import styles from "./AuthField.module.css";

type AuthFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
};

export default function AuthField({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  hint,
}: AuthFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error ? (
        <span className={styles.error} role="alert">{error}</span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </label>
  );
}
