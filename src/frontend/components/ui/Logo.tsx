import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

type LogoProps = {
  href?: string;
  size?: number;
  dark?: boolean;
};

export default function Logo({ href = "/", size = 42, dark = false }: LogoProps) {
  return (
    <Link href={href} className={styles.root}>
      <span className={styles.ring} style={{ width: size, height: size }}>
        <Image
          src="/yakuba-logo.jpeg"
          alt="Yakuba AI"
          width={size}
          height={size}
          className={styles.img}
          priority
        />
      </span>
      <span className={styles.text}>
        <span className={dark ? styles.nameDark : styles.name}>
          Yakuba<span className={dark ? styles.aiDark : styles.ai}> AI</span>
        </span>
        <span className={dark ? styles.subDark : styles.sub}>BAMBARA</span>
      </span>
    </Link>
  );
}
