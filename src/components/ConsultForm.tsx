"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const ENDPOINT = "/api/contact";

const field =
  "w-full rounded-xl border border-forest/20 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/50";
const label = "mb-1.5 block text-xs font-bold tracking-wider text-forest uppercase";

type Status = { kind: "idle" | "sending" | "ok" | "err" };

export function ConsultForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("failed");
      form.reset();
      setStatus({ kind: "ok" });
    } catch {
      setStatus({ kind: "err" });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 max-w-2xl rounded-3xl bg-cream p-6 text-left shadow-2xl sm:p-10"
    >
      <h3 className="text-center text-3xl text-forest-dark uppercase">Start the Conversation</h3>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>Full name *</label>
          <input id="f-name" name="name" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor="f-email" className={label}>Email *</label>
          <input id="f-email" name="email" type="email" autoComplete="email" required className={field} />
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>Phone</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="f-role" className={label}>I am a</label>
          <select id="f-role" name="role" className={field}>
            <option>Landowner</option>
            <option>Future builder</option>
            <option>Investor</option>
            <option>Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-service" className={label}>Where do you need help?</label>
          <select id="f-service" name="service" className={field}>
            <option>Feasibility &amp; land-use review</option>
            <option>Site, utilities &amp; access assessment</option>
            <option>Due diligence &amp; planning</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-location" className={label}>Property location</label>
          <input
            id="f-location"
            name="location"
            placeholder="County, state, acreage or parcel ID"
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-message" className={label}>What are you hoping to do? *</label>
          <textarea id="f-message" name="message" rows={5} required className={field} />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-forest-dark uppercase shadow-[0_8px_30px_-8px_rgba(212,163,115,0.6)] transition hover:-translate-y-0.5 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50"
        >
          {status.kind === "sending" ? "Sending…" : "Request a consultation"}
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-5 text-center text-sm">
        {status.kind === "ok" && (
          <span className="font-semibold text-forest">
            Thank you. Your note is in and we will reply personally.
          </span>
        )}
        {status.kind === "err" && (
          <span className="font-semibold text-red-800">
            Something went wrong sending that. Please call{" "}
            <a className="underline" href="tel:+17372496009">(737) 249-6009</a> or email{" "}
            <a className="underline" href="mailto:info@realvalueland.com">info@realvalueland.com</a>.
          </span>
        )}
      </p>
    </form>
  );
}
