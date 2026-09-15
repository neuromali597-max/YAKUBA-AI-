import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — Yakuba AI",
  description:
    "Les conditions d'utilisation de Yakuba AI : accès au service, usage acceptable, contenus générés, droit applicable.",
};

export default function CguPage() {
  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      updated="25 août 2026"
      intro={
        <>
          Les présentes conditions encadrent l&apos;utilisation de{" "}
          <strong>Yakuba AI</strong>, service d&apos;intelligence artificielle dédié à la
          langue bambara, édité par <strong>Neuro Mali AI</strong>, startup malienne
          établie à Bamako. En créant un
          compte, vous les acceptez.
        </>
      }
      sections={[
        {
          id: "service",
          heading: "Le service",
          body: (
            <p>
              Yakuba AI propose trois fonctions principales : la conversation avec une IA
              qui comprend le français et le bambara, la traduction français ↔ bambara,
              et la rédaction de textes en bambara (messages, histoires, publications,
              textes éducatifs, professionnels et culturels).
            </p>
          ),
        },
        {
          id: "compte",
          heading: "Votre compte",
          body: (
            <>
              <p>
                L&apos;accès nécessite un compte, créé par email ou via Google. Vous vous
                engagez à fournir des informations exactes et à garder vos identifiants
                confidentiels. Vous êtes responsable de l&apos;activité réalisée depuis
                votre compte.
              </p>
              <p>
                Un accès de découverte <strong>gratuit</strong> est proposé. Si une offre
                payante est lancée, ses conditions et son prix seront clairement affichés{" "}
                <strong>avant</strong> tout engagement — aucun paiement ne sera déclenché
                sans votre accord explicite.
              </p>
            </>
          ),
        },
        {
          id: "usage",
          heading: "Usage acceptable",
          body: (
            <>
              <p>En utilisant Yakuba AI, vous vous engagez à ne pas :</p>
              <ul>
                <li>générer ou diffuser des contenus illicites, haineux ou trompeurs ;</li>
                <li>tenter de contourner les mesures de sécurité du service ;</li>
                <li>revendre ou automatiser l&apos;accès au service sans accord écrit ;</li>
                <li>utiliser le service pour nuire à des tiers.</li>
              </ul>
            </>
          ),
        },
        {
          id: "contenus",
          heading: "Vos contenus et les textes générés",
          body: (
            <>
              <p>
                Les textes que vous soumettez restent les vôtres, de même que les textes
                générés à votre demande : vous pouvez les utiliser librement, y compris à
                des fins commerciales.
              </p>
              <p>
                Yakuba AI est un outil d&apos;assistance : les contenus produits peuvent
                contenir des erreurs. <strong>Relisez les textes importants avant de les
                utiliser</strong>, en particulier pour tout usage officiel, médical,
                juridique ou financier.
              </p>
            </>
          ),
        },
        {
          id: "disponibilite",
          heading: "Disponibilité et évolution",
          body: (
            <p>
              Nous nous efforçons d&apos;assurer une disponibilité maximale, sans pouvoir
              la garantir : des interruptions pour maintenance ou amélioration peuvent
              survenir. Le service évolue régulièrement — des fonctionnalités peuvent
              être ajoutées, modifiées ou retirées.
            </p>
          ),
        },
        {
          id: "resiliation",
          heading: "Résiliation",
          body: (
            <p>
              Vous pouvez supprimer votre compte à tout moment depuis les paramètres.
              Nous pouvons suspendre un compte en cas de violation des présentes
              conditions, après notification lorsque c&apos;est possible.
            </p>
          ),
        },
        {
          id: "donnees",
          heading: "Données personnelles",
          body: (
            <p>
              Le traitement de vos données est décrit dans notre{" "}
              <a href="/confidentialite">Politique de confidentialité</a>, qui fait
              partie intégrante des présentes conditions.
            </p>
          ),
        },
        {
          id: "droit",
          heading: "Droit applicable",
          body: (
            <p>
              Les présentes conditions sont régies par le <strong>droit malien</strong>.
              En cas de litige, une solution amiable sera recherchée en priorité ; à
              défaut, les tribunaux compétents de Bamako (Mali) seront saisis.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              Neuro Mali AI, startup malienne — Bamako, Mali ·{" "}
              <a href="mailto:Yakuba.contact@gmail.com">Yakuba.contact@gmail.com</a>, ou via
              notre <a href="/contact">formulaire de contact</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
