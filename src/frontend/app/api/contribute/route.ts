import { NextResponse } from "next/server";
import { isMailConfigured, sendToYakuba } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const str = (k: string) => String(form.get(k) ?? "").trim();
  const langue = str("langue");
  const type = str("type");
  const titre = str("titre");
  const description = str("description");
  const auteur = str("auteur");
  const emailAuteur = str("email");
  const file = form.get("fichier");

  if (!langue || !type || titre.length < 4 || description.length < 20) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const attachments = [];
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux (10 Mo max)." }, { status: 413 });
    }
    if (file.type && !ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Format non accepté (PDF, TXT, DOC, DOCX)." }, { status: 415 });
    }
    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    });
  }

  if (!isMailConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  try {
    await sendToYakuba({
      subject: `[Yakuba AI] Contribution — ${titre}`,
      replyTo: emailAuteur || undefined,
      text: [
        `Langue : ${langue}`,
        `Type de ressource : ${type}`,
        `Titre : ${titre}`,
        "",
        "Description :",
        description,
        "",
        `Auteur·rice : ${auteur || "anonyme"}${emailAuteur ? ` <${emailAuteur}>` : ""}`,
        attachments.length ? `Pièce jointe : ${attachments[0].filename}` : "Pièce jointe : aucune",
      ].join("\n"),
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contribute] envoi impossible :", err);
    return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
  }
}
