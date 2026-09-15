"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.pingWrap}>
          <span className={styles.ping} />
          <span className={styles.pingDot} />
        </span>
        PLATEFORME IA LINGUISTIQUE · BAMBARA
      </div>
      <h1 className={styles.title}>
        L&apos;intelligence artificielle qui parle{" "}
        <span className={styles.titleAccent}>un vrai bambara</span>
        <span className={styles.titleDot}>.</span>
      </h1>
      <p className={styles.lede}>
        Écrivez-lui comme vous parlez. Yakuba comprend, traduit et rédige un bambara
        qui sonne juste — <span className={styles.ledeStrong}>celui qu&apos;on parle vraiment à la maison</span>.
      </p>
      <Link href="/inscription" className={`btn-cta ${styles.cta}`}>
        <span className="shine" />
        Essayer gratuitement<span className={styles.arrow}>→</span>
      </Link>
    </section>
  );
}
