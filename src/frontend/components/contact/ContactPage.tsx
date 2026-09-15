"use client";

import { useState } from "react";
import SiteHeader from "@/components/landing/SiteHeader";
import SiteFooter from "@/components/landing/SiteFooter";
import { CONTACT_EMAIL, mailtoUrl } from "@/lib/contact";
import styles from "./ContactPage.module.css";

const SUBJECTS = [
  "Question sur le produit",
  "Demande d'aide",
  "Partager une ressource",
  "Partenariat",
  "Autre",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState<false | "serveur" | "messagerie">(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Entrez une adresse email valide.";
    if (message.trim().length < 10) errs.message = "Votre message doit faire au moins 10 caractères.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    setSendError(null);

    // 1) Envoi réel via le serveur.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject, message: message.trim() }),
      });
      if (res.ok) {
        setSent("serveur");
        setMessage("");
        setSending(false);
        return;
      }
      if (res.status !== 503) {
        const data = await res.json().catch(() => ({}));
        setSendError(data.error ?? "Envoi impossible pour le moment.");
        setSending(false);
        return;
      }
    } catch {
      // réseau indisponible → repli messagerie
    }

    // 2) Repli : messagerie de l'utilisateur, message prérempli.
    const body = `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`;
    window.location.href = mailtoUrl(`[Yakuba AI] ${subject} — ${name.trim()}`, body);
    setSent("messagerie");
    setSending(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <div className={styles.intro}>
          <div className="kicker">CONTACT</div>
          <h1 className={styles.title}>
            Écrivez-nous, <span className={styles.accent}>on vous répond</span>.
          </h1>
          <p className={styles.lede}>
            Une question, besoin d&apos;aide, une ressource à partager ou un partenariat
            à proposer : une seule adresse, une vraie personne derrière.
          </p>

          <div className={styles.emailCard}>
            <span className={styles.emailLabel}>ADRESSE DIRECTE</span>
            <a href={mailtoUrl("[Yakuba AI] Contact")} className={styles.emailLink}>
              {CONTACT_EMAIL}
            </a>
            <div className={styles.emailActions}>
              <a href={mailtoUrl("[Yakuba AI] Contact")} className={styles.emailBtn}>
                Ouvrir ma messagerie
              </a>
              <button type="button" onClick={copy} className={styles.copyBtn}>
                {copied ? "Copié ✓" : "Copier l'adresse"}
              </button>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.formHead}>
            <h2 className={styles.formTitle}>Formulaire de contact</h2>
            <span className={styles.formHint}>Réponse sous 48 h ouvrées</span>
          </div>

          {sent && (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}>✓</span>
              <div>
                {sent === "serveur" ? (
                  <>
                    <strong>Message envoyé.</strong> Merci ! Nous vous répondons à {email} sous
                    48 h ouvrées.
                  </>
                ) : (
                  <>
                    <strong>Votre messagerie s&apos;est ouverte</strong> avec le message
                    prérempli pour {CONTACT_EMAIL}. Il ne reste qu&apos;à cliquer sur « Envoyer ».
                  </>
                )}
              </div>
            </div>
          )}
          {sendError && (
            <div className={styles.errorBox} role="alert">
              {sendError}{" "}
              <a href={mailtoUrl(`[Yakuba AI] ${subject} — ${name.trim()}`, message)}>
                Envoyer par email à la place →
              </a>
            </div>
          )}

          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Votre nom</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aminata Koné"
                autoComplete="name"
                className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className={styles.error} role="alert">{errors.name}</span>}
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Votre email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                autoComplete="email"
                className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
            </label>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Sujet</span>
            <div className={styles.subjects} role="radiogroup" aria-label="Sujet">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={subject === s}
                  className={`${styles.subject} ${subject === s ? styles.subjectOn : ""}`}
                  onClick={() => setSubject(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Expliquez-nous votre demande…"
              rows={6}
              className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
              aria-invalid={!!errors.message}
            />
            {errors.message && <span className={styles.error} role="alert">{errors.message}</span>}
          </label>

          <button type="submit" className={styles.submit} disabled={sending}>
            {sending ? "Envoi en cours…" : "Envoyer le message"}
            {!sending && <span className={styles.arrow}>→</span>}
          </button>
          <p className={styles.note}>
            Votre message est envoyé directement à {CONTACT_EMAIL}.
          </p>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
