// Données mockées — reprises du prototype Claude Design, en attendant le backend.

export type TranslatePreset = {
  label: string;
  fr: string;
  bm: string;
  gloss: string;
};

export const TRANSLATE_PRESETS: TranslatePreset[] = [
  {
    label: "Message familial",
    fr: "Merci d'être venu, ta présence compte beaucoup pour nous.",
    bm: "I ni ce naali la. I ka nali nafa ka bon an bolo kosɛbɛ.",
    gloss: "« Merci d'être venu. Ta venue a beaucoup de valeur pour nous. »",
  },
  {
    label: "Rendez-vous",
    fr: "Je passerai te voir demain matin.",
    bm: "N bɛ na i fɛ sini sɔgɔma.",
    gloss: "« Je viens chez toi demain matin. »",
  },
  {
    label: "Annonce",
    fr: "La réunion du village aura lieu samedi sur la place.",
    bm: "Dugu lajɛ bɛ kɛ sibiri don, kɛnɛ kan.",
    gloss: "« La réunion du village se tient samedi, sur la place. »",
  },
];

export type ChatScene = {
  q: string;
  a: string;
  gloss: string;
  detect: string;
};

export const CHAT_SCENES: ChatScene[] = [
  {
    q: "Écris un message pour inviter ma famille à un mariage, en bambara.",
    a: "Aw ni ce. N b'aw wele furusiri ɲɛnajɛ la, sini tile fila. Aw ka na ni nisɔndiya ye.",
    gloss: "« Bonjour à vous. Je vous invite à la fête de mariage, après-demain. Venez avec joie. »",
    detect: "Français détecté",
  },
  {
    q: "Comment dire : « Je passerai te voir demain matin » ?",
    a: "N bɛ na i fɛ sini sɔgɔma.",
    gloss: "« Je viens chez toi demain matin. »",
    detect: "Français détecté",
  },
];

export const ROT_WORDS = ["la politesse", "la nuance", "l'intention", "le respect"];

export type Feature = {
  tag: string;
  title: string;
  body: string;
  soon?: boolean;
};

export const FEATURES: Feature[] = [
  { tag: "CHAT", title: "Une IA qui suit le fil", body: "Posez la suite. Yakuba se souvient." },
  { tag: "TRAD", title: "Le sens, pas les mots", body: "Français ⇄ bambara, dans les deux sens." },
  { tag: "GEN", title: "Vous demandez, il écrit", body: "Invitations, annonces, messages — en bambara." },
  { tag: "CTX", title: "Le bon ton, toujours", body: "Un ami, un aîné : la phrase s'adapte." },
  { tag: "VOX", title: "Bientôt, la voix", body: "Parler. Écouter. Répondre.", soon: true },
];

export const F_TRAD = "N bɛ na i fɛ sini sɔgɔma.";
export const F_GEN = "Aw ni ce. N b'aw wele furusiri ɲɛnajɛ la, sini tile fila.";

export const HOW_IT_WORKS_INPUT = "Invite ma famille au mariage…";

export const FAQS: { q: string; a: string }[] = [
  {
    q: "C'est quoi, Yakuba AI ?",
    a: "Une IA dédiée au bambara : conversation, traduction dans les deux sens et rédaction de textes — dans une seule interface.",
  },
  {
    q: "La traduction marche dans les deux sens ?",
    a: "Oui. Français vers bambara, bambara vers français — avec une glose pour vérifier le sens.",
  },
  {
    q: "Yakuba peut écrire un texte de zéro ?",
    a: "Oui. Donnez la consigne, il rédige directement en bambara : invitation, annonce, message.",
  },
  {
    q: "Comment gère-t-il le ton ?",
    a: "Il adapte la formulation au destinataire — un ami, un aîné, un client. Le registre fait partie de la réponse.",
  },
  {
    q: "Et la voix ?",
    a: "En préparation. Parler à Yakuba et l'écouter répondre arrivera dans une prochaine version.",
  },
  {
    q: "C'est gratuit ?",
    a: "La tarification n'est pas encore figée. Un accès de découverte est prévu au lancement.",
  },
];

