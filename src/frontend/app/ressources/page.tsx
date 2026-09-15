import type { Metadata } from "next";
import ResourcesHub from "@/components/resources/ResourcesHub";

export const metadata: Metadata = {
  title: "Ressources — Yakuba AI",
  description:
    "Bibliothèque des langues, contributions communautaires et guides pas à pas : les ressources Yakuba AI pour faire vivre le bambara et les langues africaines.",
};

export default function RessourcesPage() {
  return <ResourcesHub />;
}
