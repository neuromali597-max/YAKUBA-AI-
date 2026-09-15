import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Authentification Yakuba AI — Google OAuth réel (Auth.js / NextAuth v5).
 *
 * Variables requises (voir .env.example) :
 *   AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET  → créés dans Google Cloud Console
 *   AUTH_SECRET                          → `npx auth secret`
 *
 * Tant qu'elles sont absentes, `isGoogleConfigured` vaut false : l'interface
 * l'indique clairement au lieu de simuler une connexion.
 */
export const isGoogleConfigured = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: isGoogleConfigured
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
          // Laisse l'utilisateur choisir son compte Google à chaque connexion
          authorization: { params: { prompt: "select_account" } },
        }),
      ]
    : [],
  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },
  session: { strategy: "jwt" },
  trustHost: true,
});
