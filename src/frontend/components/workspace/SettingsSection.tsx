"use client";

import { useState } from "react";
import Link from "next/link";
import { signOutAction } from "@/lib/auth-actions";
import { GUEST_LABEL, initialsOf, type AppUser } from "@/lib/user";
import type { Theme } from "./Workspace";
import styles from "./SettingsSection.module.css";

type SettingsSectionProps = {
  user: AppUser;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  onFeedback: (msg: string, kind?: "success" | "error") => void;
};

export default function SettingsSection({
  user,
  theme,
  onThemeChange,
  onFeedback,
}: SettingsSectionProps) {
  // Profil — alimenté par la session Google quand elle existe
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [profileErrors, setProfileErrors] = useState<{ name?: string; email?: string }>({});
  const [savingProfile, setSavingProfile] = useState(false);

  // Préférences
  const [lang, setLang] = useState<"fr" | "bm">("fr");
  const [notif, setNotif] = useState(true);

  // Sécurité
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwErrors, setPwErrors] = useState<{ current?: string; new?: string; confirm?: string }>({});
  const [savingPw, setSavingPw] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof profileErrors = {};
    if (!name.trim()) errs.name = "Le nom est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Adresse email invalide.";
    setProfileErrors(errs);
    if (Object.keys(errs).length) return;
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      onFeedback("Profil mis à jour ✓");
    }, 700);
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof pwErrors = {};
    if (!pwCurrent) errs.current = "Entrez votre mot de passe actuel.";
    if (pwNew.length < 8) errs.new = "8 caractères minimum.";
    if (pwConfirm !== pwNew) errs.confirm = "Les mots de passe ne correspondent pas.";
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setSavingPw(true);
    setTimeout(() => {
      setSavingPw(false);
      setPwCurrent(""); setPwNew(""); setPwConfirm("");
      onFeedback("Mot de passe modifié ✓");
    }, 700);
  };

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Paramètres</h1>

        {/* ---- PROFIL ---- */}
        <section aria-labelledby="s-profil">
          <h2 id="s-profil" className={styles.groupTitle}>Profil</h2>
          <form className={styles.card} onSubmit={saveProfile} noValidate>
            <div className={styles.profileRow}>
              <span className={styles.avatar}>
                {initialsOf(name.trim() ? { name, email, image: null } : user)}
              </span>
              <div className={styles.fields}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Nom complet</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${styles.input} ${profileErrors.name ? styles.inputError : ""}`}
                    aria-invalid={!!profileErrors.name}
                  />
                  {profileErrors.name && <span className={styles.error} role="alert">{profileErrors.name}</span>}
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.input} ${profileErrors.email ? styles.inputError : ""}`}
                    aria-invalid={!!profileErrors.email}
                  />
                  {profileErrors.email && <span className={styles.error} role="alert">{profileErrors.email}</span>}
                </label>
              </div>
            </div>
            <div className={styles.cardFoot}>
              <button type="submit" className={styles.primaryBtn} disabled={savingProfile}>
                {savingProfile && <span className={styles.spinner} aria-hidden />}
                {savingProfile ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </form>
        </section>

        {/* ---- PRÉFÉRENCES ---- */}
        <section aria-labelledby="s-prefs">
          <h2 id="s-prefs" className={styles.groupTitle}>Préférences</h2>
          <div className={styles.card}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>Thème</div>
                <div className={styles.rowHint}>Clair ou sombre — appliqué immédiatement, mémorisé.</div>
              </div>
              <div className={styles.segmented} role="radiogroup" aria-label="Thème">
                <button
                  role="radio"
                  aria-checked={theme === "light"}
                  className={theme === "light" ? styles.segOn : styles.seg}
                  onClick={() => { onThemeChange("light"); onFeedback("Thème clair activé"); }}
                >
                  ☀ Clair
                </button>
                <button
                  role="radio"
                  aria-checked={theme === "dark"}
                  className={theme === "dark" ? styles.segOn : styles.seg}
                  onClick={() => { onThemeChange("dark"); onFeedback("Thème sombre activé"); }}
                >
                  ☾ Sombre
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>Langue de l&apos;interface</div>
                <div className={styles.rowHint}>Le bambara arrive bientôt.</div>
              </div>
              <div className={styles.segmented} role="radiogroup" aria-label="Langue">
                <button
                  role="radio"
                  aria-checked={lang === "fr"}
                  className={lang === "fr" ? styles.segOn : styles.seg}
                  onClick={() => { setLang("fr"); onFeedback("Interface en français"); }}
                >
                  Français
                </button>
                <button
                  role="radio"
                  aria-checked={lang === "bm"}
                  className={lang === "bm" ? styles.segOn : styles.seg}
                  onClick={() => { setLang("bm"); onFeedback("Bamanankan — bientôt disponible"); }}
                >
                  Bambara
                </button>
              </div>
            </div>
            <div className={`${styles.row} ${styles.rowLast}`}>
              <div>
                <div className={styles.rowLabel}>Notifications par email</div>
                <div className={styles.rowHint}>Nouveautés et conseils d&apos;utilisation, une fois par mois.</div>
              </div>
              <button
                role="switch"
                aria-checked={notif}
                aria-label="Notifications par email"
                className={`${styles.toggle} ${notif ? styles.toggleOn : ""}`}
                onClick={() => {
                  setNotif((v) => !v);
                  onFeedback(notif ? "Notifications désactivées" : "Notifications activées ✓");
                }}
              >
                <span className={styles.knob} />
              </button>
            </div>
          </div>
        </section>

        {/* ---- FACTURATION ---- */}
        <section aria-labelledby="s-billing">
          <h2 id="s-billing" className={styles.groupTitle}>Facturation &amp; abonnement</h2>
          <div className={`${styles.card} ${styles.planCard}`}>
            <div className={styles.planHead}>
              <div>
                <div className={styles.planName}>
                  Compte gratuit <span className={styles.badge}>ACTUEL</span>
                </div>
                <div className={styles.rowHint}>Conversation, traduction et génération — usage découverte.</div>
              </div>
              <button
                className={styles.primaryBtn}
                onClick={() => onFeedback("Yakuba Pro arrive bientôt — vous serez prévenu·e !")}
              >
                Passer à Pro
              </button>
            </div>
            <ul className={styles.planList}>
              <li>✓ Conversations illimitées en démo</li>
              <li>✓ Traduction français ↔ bambara</li>
              <li>✓ Génération de textes (6 types)</li>
            </ul>
            <p className={styles.planLegal}>
              Tout futur abonnement sera encadré par nos{" "}
              <Link href="/cgu">CGU</Link> et notre{" "}
              <Link href="/confidentialite">Politique de confidentialité</Link>.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.rowLabelAlone}>Historique de facturation</div>
            <div className={styles.emptyBilling}>
              <span className={styles.emptyIcon} aria-hidden>🧾</span>
              <div className={styles.emptyTitle}>Aucune facture pour le moment</div>
              <div className={styles.rowHint}>Vos factures apparaîtront ici après votre premier abonnement.</div>
            </div>
          </div>
        </section>

        {/* ---- SÉCURITÉ ---- */}
        <section aria-labelledby="s-security">
          <h2 id="s-security" className={styles.groupTitle}>Sécurité</h2>
          <form className={styles.card} onSubmit={savePassword} noValidate>
            <div className={styles.rowLabelAlone}>Changer le mot de passe</div>
            <div className={styles.pwGrid}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Mot de passe actuel</span>
                <input
                  type="password"
                  value={pwCurrent}
                  onChange={(e) => setPwCurrent(e.target.value)}
                  autoComplete="current-password"
                  className={`${styles.input} ${pwErrors.current ? styles.inputError : ""}`}
                  aria-invalid={!!pwErrors.current}
                />
                {pwErrors.current && <span className={styles.error} role="alert">{pwErrors.current}</span>}
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Nouveau mot de passe</span>
                <input
                  type="password"
                  value={pwNew}
                  onChange={(e) => setPwNew(e.target.value)}
                  autoComplete="new-password"
                  className={`${styles.input} ${pwErrors.new ? styles.inputError : ""}`}
                  aria-invalid={!!pwErrors.new}
                />
                {pwErrors.new && <span className={styles.error} role="alert">{pwErrors.new}</span>}
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Confirmer</span>
                <input
                  type="password"
                  value={pwConfirm}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  autoComplete="new-password"
                  className={`${styles.input} ${pwErrors.confirm ? styles.inputError : ""}`}
                  aria-invalid={!!pwErrors.confirm}
                />
                {pwErrors.confirm && <span className={styles.error} role="alert">{pwErrors.confirm}</span>}
              </label>
            </div>
            <div className={styles.cardFoot}>
              <button type="submit" className={styles.primaryBtn} disabled={savingPw}>
                {savingPw && <span className={styles.spinner} aria-hidden />}
                {savingPw ? "Modification…" : "Modifier le mot de passe"}
              </button>
            </div>
          </form>

          <div className={styles.card}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>Session</div>
                <div className={styles.rowHint}>
                  {user
                    ? `Connecté avec Google · ${user.email}`
                    : "Aucune session — connectez-vous pour retrouver vos contenus."}
                </div>
              </div>
              <span className={user ? styles.badge : styles.badgeMuted}>
                {user ? "ACTIVE" : "INVITÉ"}
              </span>
            </div>
            <div className={`${styles.row} ${styles.rowLast}`}>
              <div>
                <div className={styles.rowLabel}>{user ? "Déconnexion" : "Connexion"}</div>
                <div className={styles.rowHint}>
                  {user
                    ? "Fermer la session sur cet appareil."
                    : "Ouvrir une session avec votre compte Google."}
                </div>
              </div>
              {user ? (
                <form action={signOutAction}>
                  <button type="submit" className={styles.outlineBtn}>
                    Se déconnecter
                  </button>
                </form>
              ) : (
                <Link href="/connexion" className={styles.outlineBtn}>
                  Se connecter
                </Link>
              )}
            </div>
          </div>

          <div className={`${styles.card} ${styles.dangerCard}`}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>Supprimer le compte</div>
                <div className={styles.rowHint}>
                  Supprime définitivement votre compte et vos conversations.
                </div>
              </div>
              {confirmDelete ? (
                <div className={styles.confirmRow}>
                  <button
                    className={styles.dangerBtn}
                    onClick={() => {
                      setConfirmDelete(false);
                      onFeedback("Demande enregistrée — un email de confirmation arrive", "error");
                    }}
                  >
                    Confirmer
                  </button>
                  <button className={styles.outlineBtn} onClick={() => setConfirmDelete(false)}>
                    Annuler
                  </button>
                </div>
              ) : (
                <button className={styles.dangerOutlineBtn} onClick={() => setConfirmDelete(true)}>
                  Supprimer…
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
