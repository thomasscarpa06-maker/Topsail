import { NextResponse } from "next/server";
import { site } from "@/config/site";

/**
 * Reçoit une demande d'audit et l'envoie par e-mail via Resend.
 *
 * Variables d'environnement (Vercel → Settings → Environment Variables) :
 *   RESEND_API_KEY   clé API Resend (obligatoire)
 *   CONTACT_FROM     expéditeur vérifié, ex. "Topsail <contact@topsail-grasse.fr>"
 *   CONTACT_TO       destinataire, par défaut contact@topsail-grasse.fr
 */

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
    commerce: texte(fd, "commerce"),
    activite: texte(fd, "activite", 40),
    ville: texte(fd, "ville"),
    fiche: texte(fd, "fiche", 500),
    email: texte(fd, "email"),
    telephone: texte(fd, "telephone", 40),
  };

  if (!champs.nom || !champs.commerce || !champs.activite || !champs.ville || !champs.email || !champs.telephone) {
    return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champs.email)) {
    return NextResponse.json({ error: "L'adresse e-mail semble incorrecte." }, { status: 400 });
  }
  if (fd.get("consentement") !== "on") {
    return NextResponse.json({ error: "Merci d'accepter l'utilisation de vos informations." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[audit] RESEND_API_KEY manquante : demande non envoyée", champs.email);
    return NextResponse.json({ error: "Le formulaire n'est pas encore activé." }, { status: 503 });
  }

  const lignes: [string, string][] = [
    ["Nom", champs.nom],
    ["Commerce", champs.commerce],
    ["Activité", champs.activite],
    ["Ville", champs.ville],
    ["Fiche Google", champs.fiche || "—"],
    ["E-mail", champs.email],
    ["Téléphone", champs.telephone],
  ];

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#0B1220">Nouvelle demande d'audit</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">
      ${lignes
        .map(([k, v]) => `<tr><td style="color:#4b5563">${k}</td><td><strong>${esc(v)}</strong></td></tr>`)
        .join("")}
    </table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Topsail <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || site.email],
      reply_to: champs.email,
      subject: `Audit – ${champs.commerce} (${champs.ville})`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[audit] Échec Resend", res.status, await res.text());
    return NextResponse.json({ error: "L'envoi a échoué." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
