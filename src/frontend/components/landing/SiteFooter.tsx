import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/contact";
import styles from "./SiteFooter.module.css";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "PRODUIT",
    links: [
      { label: "Le produit", href: "/#produit" },
      { label: "Les fonctionnalités", href: "/#fonctionnalites" },
      { label: "Cas d'usage", href: "/#usages" },
      { label: "FAQ", href: "/#faq" },
      { label: "Ressources", href: "/ressources" },
    ],
  },
  {
    title: "ENTREPRISE",
    links: [
      { label: "La solution", href: "/#solution" },
      { label: "Se connecter", href: "/connexion" },
      { label: "Créer un compte", href: "/inscription" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "LÉGAL",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "CGU", href: "/cgu" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <span className={styles.logoRing}>
              <Image
                src="/yakuba-logo.jpeg"
                alt="Yakuba AI"
                width={44}
                height={44}
                className={styles.logoImg}
              />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Yakuba<span> AI</span></span>
              <span className={styles.brandSub}>BAMBARA</span>
            </span>
          </div>
          <p className={styles.brandDesc}>
            L&apos;intelligence artificielle linguistique dédiée au bambara.
            Conçue par Neuro Mali AI, startup malienne.
          </p>
          <Link href="/contact" className={styles.brandContact}>
            {CONTACT_EMAIL}
          </Link>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <div className={styles.colTitle}>{col.title}</div>
            <div className={styles.colLinks}>
              {col.links.map((l) =>
                l.href.startsWith("mailto:") ? (
                  <a key={l.label} href={l.href} className={styles.colLink}>{l.label}</a>
                ) : (
                  <Link key={l.label} href={l.href} className={styles.colLink}>{l.label}</Link>
                )
              )}
            </div>
          </nav>
        ))}
      </div>

      <div className={styles.legal}>
        <span>© {year} Yakuba AI</span>
        <span className={styles.legalBm}>K&apos;an bɛn — à bientôt.</span>
        <span className={styles.legalBy}>Réalisé par Neuro Mali AI, startup malienne</span>
        <Link href="/confidentialite" className={styles.legalLink} style={{ marginLeft: "auto" }}>
          Confidentialité
        </Link>
        <Link href="/cgu" className={styles.legalLink}>Conditions</Link>
        <Link href="/contact" className={styles.legalLink}>Contact</Link>
      </div>
      <div className={styles.watermarkWrap} aria-hidden>
        <div className={styles.watermark}>Yakuba AI</div>
      </div>
    </footer>
  );
}
