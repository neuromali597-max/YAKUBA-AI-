import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthScreen from "@/components/auth/AuthScreen";
import { auth, isGoogleConfigured } from "@/auth";

export const metadata: Metadata = { title: "Connexion — Yakuba AI" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Déjà connecté ? on va directement à l'espace de travail.
  const session = await auth();
  if (session?.user) redirect("/app");

  const { error } = await searchParams;
  return <AuthScreen initial="login" googleConfigured={isGoogleConfigured} oauthError={error} />;
}
