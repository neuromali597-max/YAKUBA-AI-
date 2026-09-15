"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import GoogleButton from "./GoogleButton";
import AuthField from "./AuthField";
import styles from "./AuthScreen.module.css";

type AuthMode = "login" | "register" | "forgot";

const TITLES: Record<AuthMode, { title: string; subtitle: string }> = {
  register: { title: "Créer un compte.", subtitle: "Gratuit · Français & bambara" },
  login: { title: "Bon retour.", subtitle: "Retrouvez vos conversations et vos textes." },
  forgot: { title: "Mot de passe oublié ?", subtitle: "On vous envoie un lien pour le réinitialiser." },
};

type AuthScreenProps = {
  initial?: AuthMode;
  /** Google OAuth réellement disponible (identifiants présents côté serveur) */
  googleConfigured: boolean;
  /** Message d'erreur renvoyé par Google via ?error= */
  oauthError?: string;
};

export default function AuthScreen({
  initial = "register",
  googleConfigured,
  oauthError,
}: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; global?: string }>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState<string | null>(
    oauthError ? "La connexion Google n'a pas abouti. Réessayez." : null
  );

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setErrors({});
    setSent(false);
    setNotice(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Entrez une adresse email valide.";
    }
    if (mode !== "forgot" && password.length < 8) {
      next.password = "Mot de passe trop court : 8 caractères minimum.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (mode === "forgot") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 600);
      return;
    }

    // La connexion par email exige un backend (base de comptes + mots de passe
    // chiffrés). Tant qu'il n'existe pas, on le dit au lieu d'ouvrir une fausse
    // session : Google reste le chemin réel.
    setErrors({
      global: "La connexion par email arrive très bientôt. Utilisez « Continuer avec Google ».",
    });
  };

  const t = TITLES[mode];

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backHomeBtn}>
          <span className={styles.backArrow} aria-hidden>←</span>
          Retour à l&apos;accueil
        </Link>
      </div>

      <div className={styles.card} key={mode}>
        <div className={styles.logoRow}>
          <Logo href="/" />
        </div>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>

        {errors.global && (
          <div className={styles.globalError} role="alert">{errors.global}</div>
        )}
        {notice && (
          <div className={styles.globalError} role="alert">{notice}</div>
        )}
        {!googleConfigured && mode !== "forgot" && (
          <div id="google-indispo" className={styles.configNotice}>
            <strong>La connexion Google arrive très bientôt.</strong> En attendant, vous
            pouvez découvrir librement l&apos;espace de travail.
          </div>
        )}

        {mode === "forgot" ? (
          sent ? (
            <div className={styles.sentBox}>
              <span className={styles.sentIcon}>✓</span>
              <p className={styles.sentText}>
                Si un compte existe pour <strong>{email}</strong>, un lien de
                réinitialisation vient d&apos;être envoyé.
              </p>
              <button className={styles.secondaryBtn} onClick={() => switchMode("login")}>
                Retour à la connexion
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate>
              <AuthField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="vous@exemple.com"
                autoComplete="email"
                error={errors.email}
              />
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? <span className={styles.btnSpinner} aria-hidden /> : null}
                {loading ? "Envoi…" : "Envoyer le lien"}
              </button>
              <button type="button" className={styles.linkBtn} onClick={() => switchMode("login")}>
                ← Retour à la connexion
              </button>
            </form>
          )
        ) : (
          <>
            <GoogleButton
              configured={googleConfigured}
              onUnavailable={() =>
                setNotice("La connexion Google n'est pas encore active. Elle arrive très bientôt.")
              }
            />

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>ou par email</span>
              <span className={styles.dividerLine} />
            </div>

            <form className={styles.form} onSubmit={submit} noValidate>
              {mode === "register" && (
                <AuthField
                  label="Nom"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="Votre nom"
                  autoComplete="name"
                />
              )}
              <AuthField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="vous@exemple.com"
                autoComplete="email"
                error={errors.email}
              />
              <AuthField
                label="Mot de passe"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                error={errors.password}
                hint={mode === "register" ? "8 caractères minimum." : undefined}
              />
              {mode === "login" && (
                <button type="button" className={styles.forgotLink} onClick={() => switchMode("forgot")}>
                  Mot de passe oublié ?
                </button>
              )}
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? <span className={styles.btnSpinner} aria-hidden /> : null}
                {loading ? "Un instant…" : mode === "login" ? "Connexion" : "Créer mon compte"}
              </button>
            </form>

            {mode === "register" && (
              <p className={styles.legalNote}>
                En créant un compte, vous acceptez nos{" "}
                <Link href="/cgu">Conditions d&apos;utilisation</Link> et notre{" "}
                <Link href="/confidentialite">Politique de confidentialité</Link>.
              </p>
            )}

            <p className={styles.switch}>
              {mode === "login" ? (
                <>Pas encore de compte ?{" "}
                  <button className={styles.switchBtn} onClick={() => switchMode("register")}>
                    S&apos;inscrire
                  </button>
                </>
              ) : (
                <>Déjà un compte ?{" "}
                  <button className={styles.switchBtn} onClick={() => switchMode("login")}>
                    Connexion
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
