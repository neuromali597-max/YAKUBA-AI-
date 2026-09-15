import Link from "next/link";
import SiteHeader from "@/components/landing/SiteHeader";
import SiteFooter from "@/components/landing/SiteFooter";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <SiteHeader />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "64px 24px",
          gap: 8,
        }}
      >
        <div
          style={{
            font: "600 13px/1 var(--font-mono)",
            letterSpacing: "0.13em",
            color: "var(--green-700)",
          }}
        >
          ERREUR 404
        </div>
        <h1
          style={{
            margin: "14px 0 0",
            font: "700 clamp(38px, 6vw, 64px)/1.05 var(--font-sans)",
            letterSpacing: "-0.05em",
            textWrap: "balance",
          }}
        >
          Nin yɔrɔ tɛ yen<span style={{ color: "var(--green-600)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: 440,
            font: "400 16px/1.6 var(--font-sans)",
            color: "var(--muted)",
          }}
        >
          « Cette page n&apos;existe pas. » — Elle a peut-être été déplacée, ou
          l&apos;adresse contient une coquille.
        </p>
        <Link
          href="/"
          className="btn-cta"
          style={{
            marginTop: 28,
            padding: "16px 36px",
            fontSize: 16,
            lineHeight: 1,
            color: "#fff",
            display: "inline-block",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
