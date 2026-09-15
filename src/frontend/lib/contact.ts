// Point de contact unique de Yakuba AI.
// Toute demande (contact, aide, contribution) est dirigée vers cette boîte.
export const CONTACT_EMAIL = "Yakuba.contact@gmail.com";

export function mailtoUrl(subject: string, body = ""): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
