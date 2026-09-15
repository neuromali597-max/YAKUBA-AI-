"use client";

import { useRef, useState } from "react";
import {
  LANGUAGES,
  RESOURCE_TYPES,
  type Contribution,
  type ResourceTypeId,
} from "@/lib/resources-data";
import { CONTACT_EMAIL, mailtoUrl } from "@/lib/contact";
import styles from "./ContributionSpace.module.css";

const MAX_FILE_MB = 10;
const ACCEPT = ".pdf,.txt,.doc,.docx";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SendState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; via: "serveur" | "messagerie" }
  | { kind: "error"; message: string };

let contribId = 0;

export default function ContributionSpace() {
  const [langue, setLangue] = useState("");
  const [type, setType] = useState<ResourceTypeId | "">("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [auteur, setAuteur] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<SendState>({ kind: "idle" });
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const typeLabel = RESOURCE_TYPES.find((t) => t.id === type)?.label ?? "";

  const acceptFile = (f: File | undefined | null) => {
    if (!f) return;
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
    if (!ACCEPT.split(",").includes(ext)) {
      setErrors((e) => ({ ...e, fichier: "Format non accepté — PDF, TXT, DOC ou DOCX." }));
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, fichier: `Fichier trop lourd — ${MAX_FILE_MB} Mo maximum.` }));
      return;
    }
    setErrors((e) => {
      const next = { ...e };
      delete next.fichier;
      return next;
    });
    setFile(f);
  };

  const buildMailBody = () =>
    [
      `Langue : ${langue}`,
      `Type de ressource : ${typeLabel}`,
      `Titre : ${titre.trim()}`,
      "",
      "Description :",
      description.trim(),
      "",
      file
        ? `Fichier : ${file.name} — ⚠ pensez à l'ajouter en pièce jointe avant d'envoyer.`
        : "Fichier : aucun",
      `Auteur·rice : ${auteur.trim() || "anonyme"}${email.trim() ? ` <${email.trim()}>` : ""}`,
    ].join("\n");

  const recordContribution = () => {
    setContributions((cs) => [
      {
        id: ++contribId,
        langue,
        type: type as ResourceTypeId,
        titre: titre.trim(),
        description: description.trim(),
        fichier: file?.name,
        auteur: auteur.trim() || undefined,
        statut: "en_attente",
        date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" }),
      },
      ...cs,
    ]);
  };

  const reset = () => {
    setTitre("");
    setDescription("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!langue) errs.langue = "Choisissez la langue concernée.";
    if (!type) errs.type = "Choisissez un type de ressource.";
    if (titre.trim().length < 4) errs.titre = "Donnez un titre d'au moins 4 caractères.";
    if (description.trim().length < 20)
      errs.description = "Décrivez la ressource en au moins 20 caractères.";
    if (email.trim() && !EMAIL_RE.test(email.trim())) errs.email = "Adresse email invalide.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState({ kind: "sending" });

    // 1) Envoi réel via le serveur (fichier joint compris).
    try {
      const fd = new FormData();
      fd.set("langue", langue);
      fd.set("type", typeLabel);
      fd.set("titre", titre.trim());
      fd.set("description", description.trim());
      fd.set("auteur", auteur.trim());
      fd.set("email", email.trim());
      if (file) fd.set("fichier", file);

      const res = await fetch("/api/contribute", { method: "POST", body: fd });
      if (res.ok) {
        recordContribution();
        setState({ kind: "sent", via: "serveur" });
        reset();
        return;
      }
      if (res.status !== 503) {
        const data = await res.json().catch(() => ({}));
        setState({ kind: "error", message: data.error ?? "Envoi impossible pour le moment." });
        return;
      }
      // 503 = serveur mail non configuré → repli sur la messagerie.
    } catch {
      // réseau indisponible → repli sur la messagerie.
    }

    // 2) Repli : ouvrir la messagerie de l'utilisateur, contribution préremplie.
    window.location.href = mailtoUrl(`[Yakuba AI] Contribution — ${titre.trim()}`, buildMailBody());
    recordContribution();
    setState({ kind: "sent", via: "messagerie" });
    reset();
  };

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {/* Colonne gauche : le pourquoi */}
        <aside className={styles.aside}>
          <h2 className={styles.title}>
            Faites grandir <span className={styles.accent}>la langue</span>
          </h2>
          <p className={styles.sub}>
            Un lexique de famille, un conte entendu au village, un PDF de grammaire :
            chaque ressource partagée enrichit Yakuba pour tous les locuteurs.
          </p>
          <ul className={styles.points}>
            <li className={styles.point}>
              <span className={styles.pointNum}>01</span>
              Vous partagez un document ou un savoir linguistique.
            </li>
            <li className={styles.point}>
              <span className={styles.pointNum}>02</span>
              Notre équipe l&apos;examine avec des locuteurs de confiance.
            </li>
            <li className={styles.point}>
              <span className={styles.pointNum}>03</span>
              Une fois validé, il nourrit la bibliothèque — à votre nom si vous le souhaitez.
            </li>
          </ul>
          <p className={styles.asideNote}>
            Les contributions sont reçues à <strong>{CONTACT_EMAIL}</strong>. Ne partagez
            que des contenus dont vous avez le droit de disposer.
          </p>
        </aside>

        {/* Colonne droite : le formulaire */}
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.formHead}>
            <h3 className={styles.formTitle}>Partager une ressource</h3>
            <span className={styles.formBadge}>EXAMEN SOUS 7 JOURS</span>
          </div>

          {state.kind === "sent" && (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}>✓</span>
              <div>
                {state.via === "serveur" ? (
                  <>
                    <strong>Ressource envoyée.</strong> Merci ! Notre équipe l&apos;examine
                    et revient vers vous si besoin.
                  </>
                ) : (
                  <>
                    <strong>Votre messagerie s&apos;est ouverte</strong> avec la contribution
                    préremplie pour {CONTACT_EMAIL}. Joignez votre fichier si besoin, puis
                    envoyez.
                  </>
                )}
              </div>
            </div>
          )}
          {state.kind === "error" && (
            <div className={styles.errorBox} role="alert">
              {state.message}{" "}
              <a href={mailtoUrl(`[Yakuba AI] Contribution — ${titre.trim()}`, buildMailBody())}>
                Envoyer par email à la place →
              </a>
            </div>
          )}

          <label className={styles.field}>
            <span className={styles.label}>Langue concernée</span>
            <select
              value={langue}
              onChange={(e) => setLangue(e.target.value)}
              className={`${styles.select} ${errors.langue ? styles.invalid : ""}`}
              aria-invalid={!!errors.langue}
            >
              <option value="">Choisir une langue…</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.name} ({l.endonym})
                  {l.status === "a_venir" ? " — à venir" : ""}
                </option>
              ))}
            </select>
            {errors.langue && <span className={styles.error} role="alert">{errors.langue}</span>}
          </label>

          <div className={styles.field}>
            <span className={styles.label}>Type de ressource</span>
            <div className={styles.types} role="radiogroup" aria-label="Type de ressource">
              {RESOURCE_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={type === t.id}
                  title={t.hint}
                  className={`${styles.type} ${type === t.id ? styles.typeOn : ""}`}
                  onClick={() => setType(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {errors.type && <span className={styles.error} role="alert">{errors.type}</span>}
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Titre</span>
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex. : Lexique de la pêche sur le fleuve Niger"
              className={`${styles.input} ${errors.titre ? styles.invalid : ""}`}
              aria-invalid={!!errors.titre}
            />
            {errors.titre && <span className={styles.error} role="alert">{errors.titre}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="D'où vient cette ressource, ce qu'elle contient, en quoi elle peut aider…"
              rows={4}
              className={`${styles.textarea} ${errors.description ? styles.invalid : ""}`}
              aria-invalid={!!errors.description}
            />
            <span className={styles.counter}>{description.trim().length} / 20 caractères min.</span>
            {errors.description && (
              <span className={styles.error} role="alert">{errors.description}</span>
            )}
          </label>

          <div className={styles.field}>
            <span className={styles.label}>
              Fichier <em className={styles.opt}>(optionnel — PDF, TXT, DOC · {MAX_FILE_MB} Mo max)</em>
            </span>
            <div
              className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""} ${file ? styles.dropzoneFilled : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files?.[0]); }}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT}
                className={styles.fileInput}
                onChange={(e) => acceptFile(e.target.files?.[0])}
                tabIndex={-1}
              />
              {file ? (
                <>
                  <span className={styles.fileIcon} aria-hidden>📄</span>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} Mo</span>
                  <button
                    type="button"
                    className={styles.fileRemove}
                    aria-label="Retirer le fichier"
                    onClick={(e) => { e.stopPropagation(); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <span className={styles.dropIcon} aria-hidden>⤒</span>
                  <span className={styles.dropText}>
                    Glissez votre fichier ici ou <u>parcourez</u>
                  </span>
                </>
              )}
            </div>
            {errors.fichier && <span className={styles.error} role="alert">{errors.fichier}</span>}
          </div>

          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Votre nom <em className={styles.opt}>(optionnel)</em></span>
              <input
                value={auteur}
                onChange={(e) => setAuteur(e.target.value)}
                placeholder="Pour être crédité·e"
                className={styles.input}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Votre email <em className={styles.opt}>(optionnel)</em></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Pour vous répondre"
                className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
            </label>
          </div>

          <button type="submit" className={styles.submit} disabled={state.kind === "sending"}>
            {state.kind === "sending" && <span className={styles.spinner} aria-hidden />}
            {state.kind === "sending" ? "Envoi en cours…" : "Envoyer la ressource"}
          </button>
          <p className={styles.formNote}>
            Envoyée directement à {CONTACT_EMAIL} — fichier joint compris.
          </p>
        </form>
      </div>

      {contributions.length > 0 && (
        <div className={styles.sent}>
          <div className={styles.sentHead}>VOS CONTRIBUTIONS</div>
          {contributions.map((c) => (
            <div key={c.id} className={styles.sentItem}>
              <div className={styles.sentMain}>
                <span className={styles.sentTitle}>{c.titre}</span>
                <span className={styles.sentMeta}>
                  {c.langue} · {RESOURCE_TYPES.find((t) => t.id === c.type)?.label}
                  {c.fichier ? ` · ${c.fichier}` : ""} · {c.date}
                </span>
              </div>
              <span className={styles.sentStatus}>ENVOYÉE · EN ATTENTE DE VALIDATION</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
