import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — Yakuba AI",
  description: "Éditeur, hébergement et propriété intellectuelle du service Yakuba AI.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      updated="25 août 2026"
      sections={[
        {
          id: "editeur",
          heading: "Éditeur du site",
          body: (
            <p>
              Le site et l&apos;application <strong>Yakuba AI</strong> sont édités par{" "}
              <strong>Neuro Mali AI</strong>, startup malienne établie à Bamako, dédiée au
              développement d&apos;outils d&apos;intelligence artificielle pour les
              langues africaines. Directeur de la publication : le représentant légal de
              la startup malienne Neuro Mali AI. Contact :{" "}
              <a href="mailto:Yakuba.contact@gmail.com">Yakuba.contact@gmail.com</a>.
            </p>
          ),
        },
        {
          id: "hebergement",
          heading: "Hébergement",
          body: (
            <p>
              Le site est hébergé sur une infrastructure cloud. Les coordonnées complètes
              de l&apos;hébergeur seront précisées ici au moment de la mise en production
              du service.
            </p>
          ),
        },
        {
          id: "propriete",
          heading: "Propriété intellectuelle",
          body: (
            <>
              <p>
                L&apos;ensemble des éléments du site — textes, interface, logo Yakuba AI,
                illustrations — est protégé par le droit de la propriété intellectuelle.
                Toute reproduction ou diffusion, totale ou partielle, sans autorisation
                écrite préalable est interdite.
              </p>
              <p>
                Les textes rédigés ou traduits par l&apos;utilisateur à l&apos;aide de
                Yakuba AI appartiennent à l&apos;utilisateur.
              </p>
            </>
          ),
        },
        {
          id: "responsabilite",
          heading: "Responsabilité",
          body: (
            <p>
              Yakuba AI est un outil d&apos;assistance linguistique. Malgré tout le soin
              apporté au service, les traductions et textes générés peuvent contenir des
              erreurs : ils sont fournis à titre indicatif et doivent être relus avant
              tout usage important. La startup malienne Neuro Mali AI ne saurait être tenue responsable des
              conséquences d&apos;une utilisation des contenus générés sans vérification.
            </p>
          ),
        },
        {
          id: "donnees",
          heading: "Données personnelles",
          body: (
            <p>
              Le traitement de vos données est détaillé dans notre{" "}
              <a href="/confidentialite">Politique de confidentialité</a> : ce que nous
              collectons, pourquoi, et comment exercer vos droits d&apos;accès, de
              rectification et de suppression.
            </p>
          ),
        },
        {
          id: "signalement",
          heading: "Signaler un problème",
          body: (
            <p>
              Pour signaler un contenu problématique ou une erreur, écrivez-nous à{" "}
              <a href="mailto:Yakuba.contact@gmail.com">Yakuba.contact@gmail.com</a> ou via
              notre <a href="/contact">formulaire de contact</a>. Nous nous engageons à
              répondre dans les meilleurs délais.
            </p>
          ),
        },
      ]}
    />
  );
}
