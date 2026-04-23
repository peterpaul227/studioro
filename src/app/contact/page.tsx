import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Een idee, een vraag, of gewoon een kop koffie? Stuur een bericht of bel direct.",
};

export default function ContactPage() {
  return (
    <div className="bg-paper pt-32 md:pt-40 pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-[1680px] px-6 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold">
            — laagdrempelig, altijd
          </p>
          <h1 className="mt-6 font-display italic text-7xl md:text-[14rem] leading-[0.9] tracking-[-0.04em]">
            Hoi.
          </h1>
          <p className="mt-10 max-w-2xl text-xl md:text-2xl text-muted leading-[1.4]">
            Een idee, een vraag, of gewoon een kop koffie in Delft?
            Stuur een bericht — ik reageer meestal binnen een dag.
          </p>
        </Reveal>
      </section>

      {/* Form + Direct */}
      <section className="mx-auto max-w-[1680px] px-6 md:px-10 grid md:grid-cols-[3fr_2fr] gap-12 md:gap-24 mt-24 md:mt-32">
        <div>
          <Reveal>
            <SectionLabel number="01">Stuur een bericht</SectionLabel>
          </Reveal>
          <div className="mt-8">
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>

        <aside>
          <Reveal>
            <SectionLabel number="02">Of direct</SectionLabel>
          </Reveal>
          <div className="mt-8 space-y-8">
            <Reveal delay={100}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-2">
                  Telefoon
                </p>
                <a
                  href="tel:+31619786803"
                  className="font-display italic text-3xl md:text-4xl hover:text-red transition-colors"
                >
                  +31 6 19 78 68 03
                </a>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-2">
                  Email
                </p>
                <a
                  href="mailto:info@studioro.com"
                  className="font-display italic text-3xl md:text-4xl hover:text-red transition-colors"
                >
                  info@studioro.com
                </a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-2">
                  Locatie
                </p>
                <p className="font-display italic text-3xl md:text-4xl">
                  Delft, NL
                </p>
                <p className="text-muted text-[13px] mt-1 font-sans not-italic">
                  Beschikbaar in heel Nederland & België — op aanvraag ook
                  daarbuiten.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="pt-6 border-t border-line">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
                  Sociaal
                </p>
                <div className="flex gap-3">
                  {[
                    ["Vimeo", "https://vimeo.com/studioro"],
                    ["Instagram", "https://instagram.com/studioro"],
                    ["LinkedIn", "https://linkedin.com/in/robertvannimwegen"],
                  ].map(([label, url]) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-line text-[12px] uppercase tracking-[0.15em] hover:border-ink transition-colors rounded-full"
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="pt-6 border-t border-line text-[12px] text-muted leading-[1.7]">
                <p>KvK 27260276</p>
                <p>BTW NL001234567B01</p>
                <p className="mt-2">
                  Reactie normaal binnen 24u op werkdagen.
                </p>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>
    </div>
  );
}
