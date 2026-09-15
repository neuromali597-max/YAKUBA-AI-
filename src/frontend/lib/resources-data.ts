// Données de la section Ressources — architecture évolutive :
// ajouter une langue, un type de ressource ou un guide = ajouter un objet ici.

export type LanguageStatus = "disponible" | "a_venir";

export type Language = {
  code: string;
  name: string;
  endonym: string;
  region: string;
  speakers: string;
  status: LanguageStatus;
  // Compteurs de la bibliothèque (mockés en attendant le backend)
  library?: { vocabulaire: number; expressions: number; textes: number; culture: number };
  sample?: { native: string; fr: string };
};

export const LANGUAGES: Language[] = [
  {
    code: "bm",
    name: "Bambara",
    endonym: "Bamanankan",
    region: "Mali",
    speakers: "≈ 14 millions de locuteurs",
    status: "disponible",
    library: { vocabulaire: 1200, expressions: 340, textes: 85, culture: 40 },
    sample: { native: "Dɔɔni dɔɔni, kɔnɔnin bɛ ɲaga da.", fr: "Petit à petit, l'oiseau fait son nid." },
  },
  {
    code: "ff",
    name: "Peulh",
    endonym: "Fulfulde",
    region: "Sahel",
    speakers: "≈ 25 millions de locuteurs",
    status: "a_venir",
  },
  {
    code: "son",
    name: "Songhay",
    endonym: "Soŋay senni",
    region: "Boucle du Niger",
    speakers: "≈ 4 millions de locuteurs",
    status: "a_venir",
  },
  {
    code: "taq",
    name: "Tamasheq",
    endonym: "Tămâšăq",
    region: "Sahara",
    speakers: "≈ 1 million de locuteurs",
    status: "a_venir",
  },
  {
    code: "snk",
    name: "Soninké",
    endonym: "Sooninkanxanne",
    region: "Haut fleuve Sénégal",
    speakers: "≈ 2 millions de locuteurs",
    status: "a_venir",
  },
];

export type ResourceTypeId =
  | "vocabulaire"
  | "expressions"
  | "texte"
  | "traduction"
  | "document"
  | "culture";

export const RESOURCE_TYPES: { id: ResourceTypeId; label: string; hint: string }[] = [
  { id: "vocabulaire", label: "Vocabulaire", hint: "Listes de mots, lexiques thématiques" },
  { id: "expressions", label: "Expressions & proverbes", hint: "Tournures, salutations, sagesses" },
  { id: "texte", label: "Texte ou conte", hint: "Histoires, récits, textes écrits" },
  { id: "traduction", label: "Traduction", hint: "Paires de phrases FR ↔ langue" },
  { id: "document", label: "Document (PDF)", hint: "Grammaires, cours, articles" },
  { id: "culture", label: "Culture", hint: "Cérémonies, musique, traditions" },
];

// Modèle prêt pour la modération côté backend :
// auteur, statut et date font déjà partie du contrat.
export type ContributionStatus = "en_attente" | "validee" | "refusee";

export type Contribution = {
  id: number;
  langue: string;
  type: ResourceTypeId;
  titre: string;
  description: string;
  fichier?: string;
  auteur?: string;
  statut: ContributionStatus;
  date: string;
};

export type GuideCategory =
  | "Démarrage"
  | "Traduction"
  | "Rédaction"
  | "Apprentissage"
  | "Contribution"
  | "Bonnes pratiques";

export type Guide = {
  id: string;
  category: GuideCategory;
  title: string;
  minutes: number;
  level: "Débutant" | "Intermédiaire";
  summary: string;
  steps: string[];
};

export const GUIDES: Guide[] = [
  {
    id: "demarrer",
    category: "Démarrage",
    title: "Bien démarrer avec Yakuba",
    minutes: 3,
    level: "Débutant",
    summary: "De la création du compte à votre première conversation en bambara.",
    steps: [
      "Créez votre compte gratuit — par email ou avec Google.",
      "Sur l'accueil, choisissez une action rapide : discuter, traduire ou rédiger.",
      "Écrivez comme vous parlez, en français ou en bambara : Yakuba détecte la langue.",
      "Chaque réponse en bambara est accompagnée de sa glose française pour vérifier le sens.",
    ],
  },
  {
    id: "traduire",
    category: "Traduction",
    title: "Obtenir une traduction naturelle",
    minutes: 4,
    level: "Débutant",
    summary: "Pourquoi Yakuba traduit le sens plutôt que les mots — et comment en profiter.",
    steps: [
      "Ouvrez la section Traduction et choisissez le sens : Français → Bambara ou l'inverse (bouton ⇄).",
      "Collez une phrase complète plutôt qu'un mot isolé : le contexte améliore la traduction.",
      "Précisez le destinataire si besoin (« pour un aîné ») : le registre s'adapte.",
      "Vérifiez avec la glose, puis copiez le résultat en un geste.",
    ],
  },
  {
    id: "rediger",
    category: "Rédaction",
    title: "Faire rédiger un texte en bambara",
    minutes: 4,
    level: "Débutant",
    summary: "Invitations, annonces, messages familiaux : décrivez, Yakuba écrit.",
    steps: [
      "Dans Génération Bambara, choisissez un type de contenu : message, histoire, publication…",
      "Décrivez ce qu'il faut écrire, ou partez d'une suggestion en un clic.",
      "Lancez la génération : le texte arrive en bambara avec sa traduction française.",
      "Régénérez si le ton ne convient pas, puis copiez le texte final.",
    ],
  },
  {
    id: "apprendre",
    category: "Apprentissage",
    title: "Apprendre le bambara avec Yakuba",
    minutes: 5,
    level: "Intermédiaire",
    summary: "Transformer chaque conversation en leçon de langue.",
    steps: [
      "Demandez la même phrase en deux registres (ami / aîné) et comparez les formulations.",
      "Faites expliquer un mot : « Que veut dire sɔgɔma ? Donne deux exemples. »",
      "Apprenez une expression par jour — demandez un proverbe et son contexte d'usage.",
      "Relisez vos conversations passées dans l'historique : c'est votre cahier de révision.",
    ],
  },
  {
    id: "contribuer",
    category: "Contribution",
    title: "Partager une ressource linguistique",
    minutes: 3,
    level: "Débutant",
    summary: "Vos documents et connaissances font grandir la langue pour tout le monde.",
    steps: [
      "Ouvrez l'espace Contributions et choisissez la langue concernée.",
      "Sélectionnez le type de ressource : vocabulaire, conte, traduction, PDF…",
      "Donnez un titre clair et décrivez le contenu en quelques phrases.",
      "Envoyez : notre équipe examine chaque ressource avant publication.",
    ],
  },
  {
    id: "verifier",
    category: "Bonnes pratiques",
    title: "Relire et vérifier un texte important",
    minutes: 3,
    level: "Débutant",
    summary: "Yakuba peut se tromper : les bons réflexes avant d'envoyer.",
    steps: [
      "Lisez toujours la glose française : elle doit dire exactement ce que vous vouliez.",
      "Pour un texte officiel, demandez une seconde formulation et comparez.",
      "Faites relire les textes importants par un locuteur de confiance.",
      "Signalez une erreur avec « Utile 👍 » ou via la page Contact : chaque retour améliore Yakuba.",
    ],
  },
];
