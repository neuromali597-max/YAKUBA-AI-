import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthScreen from "@/components/auth/AuthScreen";
import { auth, isGoogleConfigured } from "@/auth";

export const metadata: Metadata = { title: "Inscription — Yakuba AI" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/app");

  const { error } = await searchParams;
  return <AuthScreen initial="register" googleConfigured={isGoogleConfigured} oauthError={error} />;
}
