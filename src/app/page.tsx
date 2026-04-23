import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { ClientsMarquee } from "@/components/clients-marquee";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { featuredProjects, services, quote } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ─── Featured Work ──────────────────────────────── */}
      <section className="py-24 md:py-40 bg-paper">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-8 mb-14 md:mb-20">
              <div>
                <SectionLabel number="01">Uitgelicht werk</SectionLabel>
                <h2 className="mt-5 font-display italic text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] max-w-3xl">
                  Recente projecten.
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden md:inline-flex items-center gap-3 group"
              >
                <span className="h-px w-10 bg-ink transition-all group-hover:w-16" />
                <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                  Alles bekijken
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard
                  project={p}
                  aspect="16/9"
                  index={i}
                  priority={i < 2}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 md:hidden text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 group"
            >
              <span className="h-px w-10 bg-ink transition-all group-hover:w-16" />
              <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                Alles bekijken
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Editorial quote pull ───────────────────────── */}
      <section className="py-24 md:py-40 bg-paper-warm border-y border-line">
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold mb-10">
              — Robert van Nimwegen
            </p>
            <blockquote className="font-display italic text-3xl md:text-6xl leading-[1.15] tracking-[-0.02em] text-ink">
              &ldquo;{quote}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ─── Mini About ─────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-paper">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] max-w-xl bg-ink overflow-hidden">
              <Image
                src="https://payload.cargocollective.com/1/5/184005/2684124/prt_1327610554.jpg"
                alt="Delft RefleXionZ — portret"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale-[20%] contrast-[1.05]"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <SectionLabel number="02">Over Studioro</SectionLabel>
              <h2 className="mt-5 font-display italic text-4xl md:text-6xl leading-[1.1] tracking-[-0.02em]">
                Beeldmaker uit Delft,
                <br /> op locatie in de wijde wereld.
              </h2>
              <div className="mt-8 space-y-5 text-ink/80 text-[15px] leading-[1.75] max-w-lg">
                <p>
                  Studioro is Robert van Nimwegen — filmmaker, fotograaf en
                  videokunstenaar. Sinds 2009 werkt hij voor opdrachtgevers
                  als Heijmans, IHC Merwede, Strukton, Philips en Desso, én aan
                  doorlopende vrije projecten zoals{" "}
                  <Link
                    href="/work/delft-reflexionz"
                    className="underline underline-offset-4 decoration-red decoration-[1.5px] hover:text-red"
                  >
                    Delft RefleXionZ
                  </Link>
                  .
                </p>
                <p>
                  De aanpak: verhaal eerst, techniek in dienst daarvan. Van
                  solo-operatie met één camera tot een volledige crew — wat
                  het project vraagt.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/about" className="inline-flex items-center gap-3 group">
                  <span className="h-px w-10 bg-red transition-all group-hover:w-16" />
                  <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-red">
                    Lees meer over Robert
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Services preview ───────────────────────────── */}
      <section className="py-24 md:py-40 bg-ink text-paper">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <div className="mb-14 md:mb-20 max-w-3xl">
              <SectionLabel number="03" tone="paper">
                Diensten
              </SectionLabel>
              <h2 className="mt-5 font-display italic text-5xl md:text-7xl leading-[1.05] tracking-[-0.02em]">
                Wat we maken.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <Link
                  href="/services"
                  className="group relative block bg-ink p-8 md:p-10 h-full min-h-[280px] transition-colors hover:bg-ink-soft"
                >
                  <div className="text-[11px] font-mono tracking-[0.25em] text-red mb-6">
                    {s.n}
                  </div>
                  <div className="font-display italic text-3xl md:text-4xl leading-[1.1] mb-4">
                    {s.title}
                  </div>
                  <p className="text-paper/60 text-[14px] leading-[1.6] max-w-sm mb-10">
                    {s.description.split(".")[0]}.
                  </p>
                  <div className="absolute bottom-8 left-8 right-8 md:left-10 md:right-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-paper/50">
                      {s.price}
                    </span>
                    <span className="text-paper/50 group-hover:text-red group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 group"
            >
              <span className="h-px w-10 bg-paper transition-all group-hover:w-16" />
              <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                Alle diensten
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ClientsMarquee />

      {/* ─── Final CTA ──────────────────────────────────── */}
      <section className="py-32 md:py-52 bg-paper">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10 text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold mb-10">
              05 / Contact
            </p>
            <h2 className="font-display italic text-6xl md:text-9xl leading-[0.95] tracking-[-0.03em] max-w-5xl mx-auto">
              Een idee. Een project.
              <br />
              <span className="not-italic font-sans font-light">
                Laten we praten.
              </span>
            </h2>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-[12px] uppercase tracking-[0.2em] font-semibold hover:bg-red transition-colors"
              >
                Neem contact op
                <span>→</span>
              </Link>
              <a
                href="mailto:info@studioro.com"
                className="text-[14px] underline underline-offset-4 decoration-[1.5px] decoration-ink/40 hover:decoration-red hover:text-red"
              >
                info@studioro.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
