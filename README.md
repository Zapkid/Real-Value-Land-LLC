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

`src/components/ConsultForm.tsx` posts to formsubmit.co, which emails
submissions to info@realvalueland.com. The first submission triggers a
one-time activation email from FormSubmit to that inbox; confirm it once.

## Deployment

Deployed on Vercel (Git integration, `main` = production). DNS for
realvaluelandllc.com is managed in Cloudflare.
