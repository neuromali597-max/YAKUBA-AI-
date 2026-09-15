"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "#produit", label: "Le produit" },
  { href: "#fonctionnalites", label: "Les fonctionnalités" },
  { href: "#usages", label: "Cas d'usage" },
  { href: "#faq", label: "FAQ" },
  { href: "/ressources", label: "Ressources" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const router = useRouter();

  // Une session ouverte ? Le header propose alors « Mon espace » au lieu de
  // « Connexion / S'inscrire ».
  useEffect(() => {
    let alive = true;
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive) setSignedIn(Boolean(data?.user)); })
      .catch(() => { if (alive) setSignedIn(false); });
    return () => { alive = false; };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Logo size={46} />
        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          {signedIn ? (
            <button className={styles.signup} onClick={() => router.push("/app")}>
              Mon espace
            </button>
          ) : (
            <>
              <button className={styles.login} onClick={() => router.push("/connexion")}>
                Connexion
              </button>
              <button className={styles.signup} onClick={() => router.push("/inscription")}>
                S&apos;inscrire
              </button>
            </>
          )}
        </div>
        <button
          className={styles.burger}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`${styles.burgerBar} ${menuOpen ? styles.burgerTopOpen : ""}`} />
          <span className={`${styles.burgerBar} ${menuOpen ? styles.burgerBotOpen : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className={styles.mobileActions}>
            {signedIn ? (
              <button className={styles.mobileSignup} onClick={() => router.push("/app")}>
                Mon espace
              </button>
            ) : (
              <>
                <button className={styles.mobileLogin} onClick={() => router.push("/connexion")}>
                  Connexion
                </button>
                <button className={styles.mobileSignup} onClick={() => router.push("/inscription")}>
                  S&apos;inscrire
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
