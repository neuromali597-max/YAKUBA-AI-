import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Yakuba AI — L'IA qui parle un vrai bambara",
    template: "%s",
  },
  description:
    "Écrivez-lui comme vous parlez. Yakuba comprend, traduit et rédige un bambara qui sonne juste — celui qu'on parle vraiment à la maison.",
  applicationName: "Yakuba AI",
  keywords: ["bambara", "bamanankan", "traduction", "intelligence artificielle", "Mali", "Yakuba AI"],
  openGraph: {
    title: "Yakuba AI — L'IA qui parle un vrai bambara",
    description:
      "Conversation, traduction français ↔ bambara et rédaction de textes — une IA pensée langue d'abord, conçue au Mali.",
    siteName: "Yakuba AI",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${schibsted.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
