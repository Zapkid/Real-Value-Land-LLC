# Real Value Land LLC

Landing page for Real Value Land LLC, an independent land consulting firm.
Live at https://realvaluelandllc.com.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4, using the
brand palette, fonts and logo mark from the main Real Value Land site.
One static page; no database or server code.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Contact form

`src/components/ConsultForm.tsx` posts JSON to `src/app/api/contact/route.ts`,
which emails the submission through the SMTP2GO HTTP API. Set these in Vercel
(Settings, Environment Variables) and redeploy:

| Variable | Purpose |
| --- | --- |
| `SMTP2GO_API_KEY` | SMTP2GO API key (needs permission to send email) |
| `CONTACT_FROM_EMAIL` | Sender address, verified in SMTP2GO |
| `CONTACT_TO_EMAIL` | Inbox that receives submissions |
| `CONTACT_FROM_NAME` | Optional sender display name |

Replies go to the visitor via the Reply-To header.

## Deployment

Deployed on Vercel (Git integration, `main` = production). DNS for
realvaluelandllc.com is managed in Cloudflare.
