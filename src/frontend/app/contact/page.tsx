import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Yakuba AI",
  description: "Une question, une demande d'aide, une ressource à partager ? Écrivez à l'équipe Yakuba AI.",
};

export default function Page() {
  return <ContactPage />;
}
