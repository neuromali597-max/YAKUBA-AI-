/** Utilisateur connecté (session Google réelle) ou null si aucune session. */
export type AppUser = {
  name: string;
  email: string;
  image: string | null;
} | null;

/** Initiales pour l'avatar, à partir du nom (ou de l'email en secours). */
export function initialsOf(user: AppUser): string {
  const source = user?.name?.trim() || user?.email?.split("@")[0] || "";
  if (!source) return "•";
  return (
    source
      .split(/[\s._-]+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "•"
  );
}

export const GUEST_LABEL = "Mode découverte";
