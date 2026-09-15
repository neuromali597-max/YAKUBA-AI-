import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Workspace from "@/components/workspace/Workspace";
import { auth, isGoogleConfigured } from "@/auth";

export const metadata: Metadata = { title: "Yakuba AI — Espace de travail" };

export default async function AppPage() {
  const session = await auth();

  // Dès que l'authentification Google est configurée, l'espace de travail
  // exige une vraie session. Tant qu'elle ne l'est pas, l'espace reste
  // ouvert en « mode découverte » pour que le produit soit testable.
  if (isGoogleConfigured && !session?.user) {
    redirect("/connexion?suite=/app");
  }

  const user = session?.user
    ? {
        name: session.user.name ?? "Utilisateur",
        email: session.user.email ?? "",
        image: session.user.image ?? null,
      }
    : null;

  return <Workspace user={user} />;
}
