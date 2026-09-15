// Envoi d'emails côté serveur (routes API uniquement — jamais importé côté client).
// Toutes les demandes partent vers CONTACT_EMAIL. Configuration via variables d'environnement :
//   SMTP_USER / SMTP_PASS  (ex. Gmail : adresse + « mot de passe d'application »)
//   SMTP_HOST (défaut smtp.gmail.com) · SMTP_PORT (défaut 465)
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "./contact";

export type MailAttachment = { filename: string; content: Buffer; contentType?: string };

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendToYakuba(opts: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}): Promise<void> {
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Yakuba AI — site" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    attachments: opts.attachments,
  });
}
