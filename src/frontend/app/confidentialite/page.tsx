import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Yakuba AI",
  description:
    "Comment Yakuba AI collecte, utilise et protège vos données. Vos conversations vous appartiennent.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updated="25 août 2026"
      intro={
        <>
          Yakuba AI est édité par <strong>Neuro Mali AI</strong>, startup malienne établie
          à Bamako, au <strong>Mali</strong>. Beaucoup de nos utilisateurs écrivent des messages
          personnels ou familiaux : cette politique explique, simplement, ce que nous
          faisons — et ne faisons pas — avec vos données.
        </>
      }
      sections={[
        {
          id: "donnees",
          heading: "Les données que nous collectons",
          body: (
            <ul>
              <li>
                <strong>Données de compte</strong> — votre nom, votre adresse email et,
                si vous choisissez la connexion Google, l&apos;identifiant transmis par
                Google. Rien de plus.
              </li>
              <li>
                <strong>Vos contenus</strong> — les messages, textes à traduire et
                consignes de rédaction que vous soumettez, ainsi que l&apos;historique de
                vos conversations si sa sauvegarde est activée (elle se désactive à tout
                moment dans les paramètres).
              </li>
              <li>
                <strong>Données techniques</strong> — journaux de connexion (adresse IP,
                horodatage) nécessaires à la sécurité et au bon fonctionnement du
                service.
              </li>
            </ul>
          ),
        },
        {
          id: "finalites",
          heading: "Ce que nous en faisons",
          body: (
            <>
              <p>Vos données servent exclusivement à :</p>
              <ul>
                <li>fournir le service : conversation, traduction, rédaction en bambara ;</li>
                <li>maintenir votre historique, si vous l&apos;avez activé ;</li>
                <li>
                  améliorer la qualité linguistique du modèle, uniquement à partir de
                  données anonymisées ;
                </li>
                <li>protéger le service contre les abus.</li>
              </ul>
              <p>
                <strong>Nous ne vendons jamais vos données.</strong> Vos conversations ne
                sont jamais exploitées à des fins publicitaires ni partagées avec des
                annonceurs.
              </p>
            </>
          ),
        },
        {
          id: "tiers",
          heading: "Services tiers utilisés",
          body: (
            <>
              <p>Yakuba AI fait appel à un nombre volontairement réduit de tiers :</p>
              <ul>
                <li>
                  <strong>Google (connexion)</strong> — si vous choisissez « Continuer
                  avec Google », Google nous transmet votre nom et votre email pour créer
                  votre compte. Nous ne recevons ni vos contacts, ni vos fichiers.
                </li>
                <li>
                  <strong>Hébergement cloud</strong> — nos serveurs sont hébergés chez un
                  prestataire d&apos;infrastructure ; son identité sera précisée ici dès
                  la mise en production.
                </li>
              </ul>
              <p>
                Les polices du site sont <strong>auto-hébergées</strong> : aucune requête
                n&apos;est envoyée à des serveurs de polices tiers. Nous n&apos;utilisons{" "}
                <strong>aucun outil publicitaire ni traqueur d&apos;audience tiers</strong>.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies et stockage local",
          body: (
            <p>
              Le strict nécessaire : un cookie de session pour vous garder connecté·e en
              sécurité, et le stockage local de votre navigateur pour vos préférences
              (comme le thème clair/sombre de l&apos;application).{" "}
              <strong>Aucun cookie publicitaire, aucun pistage.</strong> Vous pouvez
              effacer ces données à tout moment depuis les réglages de votre navigateur —
              seule la connexion à votre compte en dépend.
            </p>
          ),
        },
        {
          id: "conservation",
          heading: "Conservation et suppression",
          body: (
            <ul>
              <li>
                Chaque conversation peut être <strong>supprimée individuellement</strong>{" "}
                depuis l&apos;historique.
              </li>
              <li>
                La sauvegarde de l&apos;historique se <strong>désactive</strong> dans
                Paramètres → vos échanges ne sont alors plus conservés.
              </li>
              <li>
                La suppression du compte efface vos données personnelles et vos
                conversations sous <strong>30 jours</strong>, sauf obligation légale de
                conservation.
              </li>
            </ul>
          ),
        },
        {
          id: "droits",
          heading: "Vos droits",
          body: (
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, de
              suppression et de portabilité de vos données, conformément à la
              législation malienne sur la protection des données à caractère personnel.
              Pour l&apos;exercer, écrivez à{" "}
              <a href="mailto:Yakuba.contact@gmail.com">Yakuba.contact@gmail.com</a> — nous
              répondons sous 30 jours au plus tard.
            </p>
          ),
        },
        {
          id: "securite",
          heading: "Sécurité",
          body: (
            <p>
              Les échanges avec nos serveurs sont chiffrés (HTTPS) et l&apos;accès aux
              données est strictement limité aux besoins d&apos;exploitation. En cas
              d&apos;incident affectant vos données, vous en serez informé·e dans les
              meilleurs délais.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              Neuro Mali AI, startup malienne — Bamako, Mali ·{" "}
              <a href="mailto:Yakuba.contact@gmail.com">Yakuba.contact@gmail.com</a>. Voir aussi nos{" "}
              <a href="/cgu">Conditions générales d&apos;utilisation</a> et nos{" "}
              <a href="/mentions-legales">Mentions légales</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
