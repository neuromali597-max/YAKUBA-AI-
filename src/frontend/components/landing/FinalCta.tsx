import Link from "next/link";
import SiteFooter from "./SiteFooter";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section className={styles.section}>
      <span className={styles.glow} aria-hidden />

      <div className={styles.cta}>
        <div className={`kicker kicker--light ${styles.kicker}`}>PRÊT ?</div>
        <h2 className={styles.title}>
          L&apos;IA qui parle <span className={styles.titleAccent}>un vrai bambara</span> vous attend.
        </h2>
        <Link href="/inscription" className={`btn-cta ${styles.ctaBtn}`}>
          <span className="shine" />
          Commencer gratuitement<span className={styles.arrow}>→</span>
        </Link>
        <p className={styles.ctaNote}>Gratuit · Français &amp; bambara</p>
      </div>

      <SiteFooter />
    </section>
  );
}
