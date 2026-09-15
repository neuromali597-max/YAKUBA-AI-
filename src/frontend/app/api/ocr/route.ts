import { NextResponse } from "next/server";
import { createWorker, type Worker } from "tesseract.js";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/bmp"];

// Le bambara s'écrit en alphabet latin : le modèle français est le plus proche
// (accents, apostrophes), l'anglais complète pour les textes mixtes.
const LANGS = "fra+eng";

// Le moteur est coûteux à démarrer : on le garde en mémoire entre les requêtes.
let workerPromise: Promise<Worker> | null = null;

function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = createWorker(LANGS).catch((err) => {
      workerPromise = null;
      throw err;
    });
  }
  return workerPromise;
}

/**
 * Nettoie la sortie brute de l'OCR : espaces parasites, lignes vides, et
 * confusions fréquentes du moteur (barres verticales lues à la place du « I »,
 * très courant en bambara où « I » commence beaucoup de phrases).
 */
function cleanText(raw: string): string {
  return raw
    .split("\n")
    .map((line) =>
      line
        .replace(/\s+/g, " ")
        .trim()
        // « | » ou « ¦ » isolé → « I »
        .replace(/(^|\s)[|¦]($|\s)/g, "$1I$2")
        // guillemets et apostrophes typographiques mal lus
        .replace(/[’‘]/g, "'")
        .trim()
    )
    .filter((line) => line.length > 0)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Service de vision externe, utilisé seulement si configuré (qualité supérieure). */
async function readWithProvider(file: File, endpoint: string, apiKey: string): Promise<string> {
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ image: base64, mimeType: file.type || "image/jpeg" }),
  });
  if (!res.ok) throw new Error(`OCR provider ${res.status}`);
  const data = (await res.json()) as { text?: string };
  return (data.text ?? "").trim();
}

/**
 * Lecture du texte d'une image (OCR).
 * Par défaut : Tesseract, exécuté sur le serveur — aucune clé requise, l'image
 * ne quitte pas l'infrastructure Yakuba. Si OCR_API_URL + OCR_API_KEY sont
 * renseignés, le service externe prend le relais.
 */
export async function POST(req: Request) {
  let file: File | null = null;
  try {
    const form = await req.formData();
    const value = form.get("image");
    if (value instanceof File) file = value;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "Aucune image reçue." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image trop lourde (8 Mo maximum)." }, { status: 400 });
  }
  if (file.type && !ACCEPTED.includes(file.type)) {
    return NextResponse.json({ error: "Format d'image non pris en charge." }, { status: 400 });
  }

  const endpoint = process.env.OCR_API_URL;
  const apiKey = process.env.OCR_API_KEY;

  try {
    let text = "";
    let engine = "tesseract";
    let confidence: number | undefined;

    if (endpoint && apiKey) {
      engine = "provider";
      text = cleanText(await readWithProvider(file, endpoint, apiKey));
    } else {
      const worker = await getWorker();
      const buffer = Buffer.from(await file.arrayBuffer());
      const { data } = await worker.recognize(buffer);
      text = cleanText(data.text ?? "");
      confidence = typeof data.confidence === "number" ? Math.round(data.confidence) : undefined;
    }

    if (!text) {
      return NextResponse.json(
        { error: "Aucun texte lisible sur cette image. Essayez une photo plus nette et bien éclairée." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text, engine, confidence });
  } catch {
    return NextResponse.json({ error: "La lecture de l'image a échoué." }, { status: 502 });
  }
}
