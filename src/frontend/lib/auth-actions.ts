"use server";

import { signIn, signOut, isGoogleConfigured } from "@/auth";

/** Lance la vraie redirection vers Google (choix du compte). */
export async function signInWithGoogle() {
  if (!isGoogleConfigured) {
    return { error: "google-non-configure" as const };
  }
  await signIn("google", { redirectTo: "/app" });
}

/** Ferme la session et revient sur la page d'accueil. */
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
