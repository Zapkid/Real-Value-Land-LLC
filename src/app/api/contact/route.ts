// Contact form endpoint: validates the submission and emails it to the
// site owner through the SMTP2GO HTTP API.
//
// Required environment variables (set in Vercel, never in the repo):
//   SMTP2GO_API_KEY      SMTP2GO API key
//   CONTACT_FROM_EMAIL   sender address verified in SMTP2GO
//   CONTACT_TO_EMAIL     inbox that receives submissions
// Optional:
//   CONTACT_FROM_NAME    display name for the sender (default below)

const SMTP2GO_URL = "https://api.smtp2go.com/v3/email/send";

const SERVICES = [
  "Feasibility & land-use review",
  "Site, utilities & access assessment",
  "Due diligence & planning",
  "Not sure yet",
];
const ROLES = ["Landowner", "Future builder", "Investor", "Other"];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Single-line text: collapse whitespace so values can't inject headers.
const oneLine = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

const multiLine = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r\n/g, "\n").trim().slice(0, max) : "";

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = oneLine(body.name, 120);
  const email = oneLine(body.email, 200);
  const phone = oneLine(body.phone, 40);
  const role = ROLES.includes(body.role as string) ? (body.role as string) : "Other";
  const service = SERVICES.includes(body.service as string) ? (body.service as string) : "Not sure yet";
  const location = oneLine(body.location, 200);
  const message = multiLine(body.message, 5000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return Response.json(
      { ok: false, error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Contact form is not configured: missing SMTP2GO_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");
    return Response.json({ ok: false, error: "Mail is not configured." }, { status: 500 });
  }
  const fromName = process.env.CONTACT_FROM_NAME || "Real Value Land Website";

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "-"],
    ["I am a", role],
    ["Service", service],
    ["Property location", location || "-"],
  ];
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}\n`;
  const html =
    `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">` +
    rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("") +
    `</table><p style="font-family:sans-serif;font-size:14px"><strong>Message</strong></p>` +
    `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const res = await fetch(SMTP2GO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Smtp2go-Api-Key": apiKey },
      body: JSON.stringify({
        sender: `${fromName} <${from}>`,
        to: [to],
        subject: `New consulting inquiry from ${name}`,
        text_body: text,
        html_body: html,
        custom_headers: [{ header: "Reply-To", value: `${name.replace(/[<>",]/g, "")} <${email}>` }],
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.data || data.data.succeeded !== 1) {
      console.error("SMTP2GO send failed", res.status, JSON.stringify(data));
      return Response.json({ ok: false, error: "Could not send message." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("SMTP2GO request error", err);
    return Response.json({ ok: false, error: "Could not send message." }, { status: 502 });
  }
}
