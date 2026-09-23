import { NextResponse } from "next/server";
import { site } from "@/config/site";

/**
 * Reçoit une demande d'estimation (champs + jusqu'à 5 photos) et l'envoie par e-mail via Resend.
 *
 * Variables d'environnement (Vercel → Settings → Environment Variables) :
 *   RESEND_API_KEY   clé API Resend (obligatoire)
 *   ESTIMATION_FROM  expéditeur vérifié, ex. "Topsail <estimation@topsail-grasse.fr>"
 *   ESTIMATION_TO    destinataire, par défaut contact@topsail-grasse.fr
 */

const MAX_PHOTOS = 5;
const MAX_PHOTO_SIZE = 3 * 1024 * 1024;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function texte(fd: FormData, cle: string, max = 200) {
  const v = fd.get(cle);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Demande illisible." }, { status: 400 });
  }

  // Anti-spam : le champ caché doit rester vide
  if (texte(fd, "website")) return NextResponse.json({ ok: true });

  const champs = {
    nom: texte(fd, "nom"),
    telephone: texte(fd, "telephone", 40),
    email: texte(fd, "email"),
    commune: texte(fd, "commune"),
    situation: texte(fd, "situation", 40),
    description: texte(fd, "description", 3000),
  };

  if (!champs.nom || !champs.telephone || !champs.email || !champs.commune || !champs.description) {
    return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champs.email)) {
    return NextResponse.json({ error: "L'adresse e-mail semble incorrecte." }, { status: 400 });
  }
  if (fd.get("consentement") !== "on") {
    return NextResponse.json({ error: "Merci d'accepter l'utilisation de vos informations." }, { status: 400 });
  }

  const photos = fd
    .getAll("photos")
    .filter((p): p is File => typeof p !== "string" && p.size > 0 && p.type.startsWith("image/"))
    .slice(0, MAX_PHOTOS);

  if (photos.some((p) => p.size > MAX_PHOTO_SIZE)) {
    return NextResponse.json({ error: "Une des photos est trop lourde." }, { status: 413 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[estimation] RESEND_API_KEY manquante : demande non envoyée", champs.email);
    return NextResponse.json(
      { error: "Le formulaire n'est pas encore activé." },
      { status: 503 },
    );
  }

  const attachments = await Promise.all(
    photos.map(async (p, i) => ({
      filename: `photo-${i + 1}-${p.name.replace(/[^\w.-]/g, "_")}`,
      content: Buffer.from(await p.arrayBuffer()).toString("base64"),
    })),
  );

  const lignes = [
    ["Nom", champs.nom],
    ["Téléphone", champs.telephone],
    ["E-mail", champs.email],
    ["Commune", champs.commune],
    ["Situation", champs.situation || "—"],
  ];

  const html = `
    <h2 style="font-family:Georgia,serif;color:#0E1A2B">Nouvelle demande d'estimation</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">
      ${lignes.map(([k, v]) => `<tr><td style="color:#4a5565">${k}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:15px;white-space:pre-wrap;border-left:3px solid #D98C1F;padding-left:12px">${esc(champs.description)}</p>
    <p style="font-family:Arial,sans-serif;color:#4a5565">${photos.length} photo(s) en pièce jointe.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ESTIMATION_FROM || "Topsail <onboarding@resend.dev>",
      to: [process.env.ESTIMATION_TO || site.email],
      reply_to: champs.email,
      subject: `Estimation – ${champs.nom} (${champs.commune})`,
      html,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("[estimation] Échec Resend", res.status, await res.text());
    return NextResponse.json({ error: "L'envoi a échoué." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
