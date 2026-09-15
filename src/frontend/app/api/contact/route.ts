import { NextResponse } from "next/server";
import { isMailConfigured, sendToYakuba } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: { name?: string; email?: string; subject?: string; message?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const subject = (data.subject ?? "Contact").trim().slice(0, 120);
  const message = (data.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  if (!isMailConfigured()) {
    // Le serveur mail n'est pas configuré : le client bascule sur la messagerie de l'utilisateur.
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  try {
    await sendToYakuba({
      subject: `[Yakuba AI] ${subject} — ${name}`,
      replyTo: email,
      text: `${message}\n\n—\nNom : ${name}\nEmail : ${email}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] envoi impossible :", err);
    return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
  }
}
