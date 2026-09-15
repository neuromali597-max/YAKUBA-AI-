// Données et logique mockées de l'interface post-connexion,
// reprises du prototype Claude Design (Yakuba AI mobile interface-handoff).

export type Section =
  | "home"
  | "chat"
  | "translate"
  | "generate"
  | "history"
  | "settings"
  | "help";

export type ChatMessage = {
  id: number;
  role: "user" | "ai";
  text: string;
};

export type Convo = {
  id: number;
  title: string;
  date: string;
};

export const INITIAL_CONVOS: Convo[] = [
  { id: 1, title: "Traduction d'un message de bienvenue", date: "Aujourd'hui · 09:24" },
  { id: 2, title: "Histoire courte pour enfants", date: "Hier · 18:02" },
  { id: 3, title: "Salutations du matin en bambara", date: "20 août" },
  { id: 4, title: "Publication pour réseaux sociaux", date: "18 août" },
];

const DICT_FR_BM: [RegExp, string][] = [
  [/bonjour/i, "I ni sɔgɔma"],
  [/bonsoir/i, "I ni wula"],
  [/merci beaucoup/i, "I ni ce kɔsəbɛ"],
  [/merci/i, "I ni ce"],
  [/comment vas[- ]tu|comment allez[- ]vous|ça va/i, "I ka kɛnɛ wa?"],
  [/je vais bien/i, "N ka kɛnɛ, i ni ce"],
  [/bienvenue/i, "I bisimila"],
  [/au revoir/i, "K'an bɛn"],
  [/je t'aime|je vous aime/i, "N b'i fɛ"],
  [/bonne nuit/i, "Su here"],
  [/la famille/i, "Denbaya"],
  [/l'eau/i, "Ji"],
  [/le travail/i, "Baara"],
];

const DICT_BM_FR: [RegExp, string][] = [
  [/i ni sɔgɔma|i ni sogoma/i, "Bonjour (le matin)"],
  [/i ni wula/i, "Bonsoir"],
  [/i ni ce/i, "Merci / Bonjour"],
  [/i ka kɛnɛ wa/i, "Comment vas-tu ?"],
  [/n ka kɛnɛ/i, "Je vais bien"],
  [/i bisimila/i, "Bienvenue"],
  [/k'an bɛn|kan ben/i, "Au revoir"],
  [/n b'i fɛ/i, "Je t'aime"],
  [/su here/i, "Bonne nuit"],
  [/denbaya/i, "La famille"],
];

export function translateMock(text: string, toBm: boolean): string {
  const dict = toBm ? DICT_FR_BM : DICT_BM_FR;
  for (const [re, out] of dict) {
    if (re.test(text)) return out;
  }
  return toBm
    ? "Ā bɛ se ka ɲɔgɔn faamu — nin ye i ka kuma bayɛlɛmanen ye bamanankan na."
    : "Voici la traduction française naturelle de votre texte bambara.";
}

export const AI_REPLIES = [
  "I ni ce ! Voici ce que je propose :\n\n« I ni sɔgɔma, i ka kɛnɛ wa? »\n\nCela signifie « Bonjour, comment vas-tu ? » — une salutation chaleureuse très courante au Mali. Voulez-vous une version plus formelle ?",
  "Très bonne question ! En bambara, on dirait :\n\n« Ā bɛ se ka ɲɔgɔn dɛmɛ. » — Nous pouvons nous entraider.\n\nSouhaitez-vous que je développe ou que je traduise autre chose ?",
  "Voici ma réponse :\n\nLe bambara (bamanankan) est parlé par plus de 14 millions de personnes, principalement au Mali. C'est une langue mandingue riche en proverbes — par exemple : « Dɔɔni dɔɔni, kɔnɔnin bɛ ɲaga da. » (Petit à petit, l'oiseau fait son nid.)",
];

export const GEN_TYPES = [
  "Message",
  "Histoire",
  "Publication",
  "Texte éducatif",
  "Professionnel",
  "Culturel",
] as const;

export type GenType = (typeof GEN_TYPES)[number];

export const GEN_OUT: Record<GenType, string> = {
  Message:
    "Aw ni ce, aw bisimila!\nAn bɛ aw fɛ kɔsɔbɛ. Ala ka dɔn kɛ ɲuman ye, ka hɛrɛ ni kɛnɛya di aw ma.\n\n(Salutations à tous, bienvenue ! Nous vous aimons beaucoup. Que Dieu fasse de ce jour un bon jour et vous donne paix et santé.)",
  Histoire:
    "Dɔ̄ tən, sonsannin ni suruku…\n\nSonsannin ko: « Hakili ka fisa fanga ye. » Suruku ma da a la, nka laban, sonsannin y'a sɔrɔ ni hakili ye.\n\n(Il était une fois, le lièvre et l'hyène… Le lièvre dit : « L'intelligence vaut mieux que la force. » L'hyène n'y crut pas, mais à la fin, le lièvre l'emporta grâce à son intelligence.)",
  Publication:
    "Ā ka kan ka an ka kan lakana! Bamanankan ye an ka nafolo ye. 🇲🇱\n\n#Bamanankan #Mali\n\n(Nous devons préserver notre langue ! Le bambara est notre richesse.)",
  "Texte éducatif":
    "Kalan ye kɛnɛ ye.\n\nDɔnni sɔrɔli bɛ daminɛ ni sɛbɛnni ni kalanni ye. Den o den ka kan ka taa lakɔli la.\n\n(L'éducation est une lumière. L'acquisition du savoir commence par l'écriture et la lecture. Chaque enfant doit aller à l'école.)",
  Professionnel:
    "An bɛ aw fɔ ka ɲɛsigi lajɛ in na araba don, nɛgɛ kanɲɛ 10 na.\n\n(Nous vous convions à la réunion de mercredi à 10 heures.)",
  Culturel:
    "Proverbe bambara :\n\n« Bɛe b'i fɛ min na, i t'o dɔn fɔ i ka bɔ a la. »\n\n(On ne connaît la valeur de ce qu'on a qu'après l'avoir perdu.)",
};

export const GEN_SUGGESTIONS: Record<GenType, string[]> = {
  Message: ["Un message de vœux pour un mariage", "Un message de remerciement à un aîné"],
  Histoire: ["Un conte avec le lièvre (sonsannin)", "Une histoire courte pour enfants sur le partage"],
  Publication: [
    "Une publication sur la fête de l'indépendance",
    "Un post pour promouvoir la langue bambara",
  ],
  "Texte éducatif": ["Un texte sur l'importance de l'école", "Une leçon simple sur l'hygiène"],
  Professionnel: ["Une invitation à une réunion", "Une annonce de recrutement"],
  Culturel: ["Un proverbe bambara expliqué", "Un texte sur la cérémonie du thé"],
};
