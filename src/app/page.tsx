import Image from "next/image";
import { ArrowRight, Compass, FileSearch, Mail, MapPin, Phone, Route, Ruler } from "lucide-react";
import { BrandLockup } from "@/components/Logo";
import { ConsultForm } from "@/components/ConsultForm";

const services = [
  {
    icon: Ruler,
    title: "Feasibility & Land-Use Review",
    body: "Before money changes hands, we establish what a parcel can legally and practically support: zoning, setbacks, permitted uses, building rules, and legal access. You get a plain-language answer, not a pile of codes.",
  },
  {
    icon: Route,
    title: "Site, Utilities & Access Assessment",
    body: "Raw land hides its real costs in the details. We look at terrain, drainage, road and easement status, and how power, water, and wastewater would reach the site, so the cost of making it usable is known up front.",
  },
  {
    icon: FileSearch,
    title: "Due Diligence & Strategic Planning",
    body: "We gather the facts, weigh the options, and lay out a sequenced plan. Whether the goal is a build, a long hold, or a sale, you decide with the full picture in front of you.",
  },
];

const steps = [
  { n: "01", title: "Listen", body: "A first conversation about the property, your timeline, and what you want it to do for you." },
  { n: "02", title: "Investigate", body: "We research the parcel, the rules that govern it, and the practical conditions on the ground." },
  { n: "03", title: "Advise", body: "You receive a clear written assessment with our recommendation and the reasoning behind it." },
  { n: "04", title: "Guide", body: "We help you take the next step, from choosing a direction to questions for the professionals you will need." },
];

const audiences = [
  { title: "Landowners", body: "Holding acreage and unsure whether to build, hold, divide, or sell? We help you see the options and what each one involves." },
  { title: "Future builders", body: "Planning a home, retreat, or small project? We help you confirm the site works before you design around it." },
  { title: "Investors", body: "Evaluating a purchase? We deliver independent research so your decision rests on facts, not a listing description." },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="#top" aria-label="Real Value Land LLC home">
            <BrandLockup />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-semibold text-cream sm:flex">
            <a href="#services" className="hover:text-gold-light">Services</a>
            <a href="#approach" className="hover:text-gold-light">Approach</a>
            <a
              href="#contact"
              className="rounded-full bg-gold px-5 py-2.5 tracking-wide text-forest-dark uppercase hover:bg-gold-light"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section id="top" className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-forest-dark">
          <Image
            src="/hero-landscape.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-dark/85 via-forest-dark/65 to-forest-dark/90" />
          <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-24 lg:px-10">
            <p className="mb-5 text-xs font-bold tracking-[0.25em] text-gold-light uppercase">
              Independent land consulting
            </p>
            <h1 className="max-w-3xl text-5xl leading-[1.02] text-cream uppercase sm:text-7xl">
              Know what your land can become before you commit.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              Real Value Land LLC advises landowners, builders, and investors on what a parcel can
              support, what it will take, and which path makes the most sense.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-forest-dark uppercase shadow-[0_8px_30px_-8px_rgba(212,163,115,0.6)] transition hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Request a consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border-2 border-cream/70 px-8 py-3.5 text-sm font-semibold tracking-wide text-cream uppercase transition hover:bg-cream hover:text-forest-dark"
              >
                See how we help
              </a>
            </div>
          </div>
        </section>

        {/* Positioning */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Compass className="mx-auto h-9 w-9 text-gold-deep" aria-hidden="true" />
            <h2 className="font-display mt-6 text-balance text-3xl font-semibold text-forest-dark normal-case sm:text-4xl">
              Land decisions are expensive to get wrong.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-umber">
              Zoning, access, utilities, and terrain decide what a property is really worth to you,
              and they rarely show up in a listing. We are an advisory firm, not a broker. Our work is
              to research the parcel, explain the findings in plain terms, and give you a candid
              recommendation.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-4 bg-cream-dim py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-center text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">
              Services
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-center text-3xl font-semibold text-forest-dark normal-case sm:text-4xl">
              Three ways we put clarity behind your plans
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {services.map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-forest/10">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-gold-light">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl text-forest-dark uppercase">{title}</h3>
                  <p className="mt-3 leading-relaxed text-umber">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Who we serve */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display mx-auto max-w-2xl text-balance text-center text-3xl font-semibold text-forest-dark normal-case sm:text-4xl">
              Who we work with
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {audiences.map((a) => (
                <div key={a.title} className="border-t-[3px] border-gold pt-6">
                  <h3 className="text-2xl text-forest-dark uppercase">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-umber">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="relative scroll-mt-4 overflow-hidden bg-forest py-20 sm:py-28">
          <div aria-hidden="true" className="bg-topo pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-center text-xs font-bold tracking-[0.25em] text-gold-light uppercase">
              Approach
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-center text-3xl font-semibold text-cream normal-case sm:text-4xl">
              A straightforward process, start to finish
            </h2>
            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li key={s.n}>
                  <span className="font-brand text-5xl text-gold">{s.n}</span>
                  <h3 className="mt-2 text-2xl text-cream uppercase">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/75">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-4 border-t-[3px] border-gold bg-saddle py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
            <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-semibold text-cream normal-case sm:text-4xl">
              Tell us about your land
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-cream/75">
              Share a few details and we will reply personally. You can also call or email us directly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+17372496009"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-forest-dark uppercase hover:bg-gold-light"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> (737) 249-6009
              </a>
              <a
                href="mailto:info@realvalueland.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream/70 px-7 py-3.5 text-sm font-semibold tracking-wide text-cream uppercase hover:bg-cream hover:text-forest-dark"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> info@realvalueland.com
              </a>
            </div>
            <ConsultForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#3b2b1f] py-12 text-cream/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
            <div>
              <BrandLockup />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
                Independent land consulting for landowners, builders, and investors.
              </p>
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                1401 Lavaca St, Austin, TX 78701
              </li>
              <li className="flex items-start gap-2.5">
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <a href="tel:+17372496009" className="hover:text-gold-light">(737) 249-6009</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <a href="mailto:info@realvalueland.com" className="hover:text-gold-light">info@realvalueland.com</a>
              </li>
            </ul>
          </div>
          <p className="border-t border-cream/10 pt-6 text-xs leading-relaxed">
            &copy; {year} Real Value Land LLC, a Texas limited liability company. All rights reserved.
            Our consulting is informational and is not legal, survey, engineering, or tax advice.
          </p>
        </div>
      </footer>
    </>
  );
}
