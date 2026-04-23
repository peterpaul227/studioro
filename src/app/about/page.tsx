import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { ClientsMarquee } from "@/components/clients-marquee";
import { principles, equipment, quote } from "@/lib/data";

export const metadata: Metadata = {
  title: "Over Robert",
  description:
    "Robert van Nimwegen is filmmaker en fotograaf uit Delft. Sinds 2009 werkt hij onder de naam Studioro voor merken, culturele instellingen en aan eigen kunstprojecten.",
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      {/* Hero portrait */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <div className="relative aspect-[21/9] md:aspect-[21/8] overflow-hidden bg-ink">
              <Image
                src="https://payload.cargocollective.com/1/5/184005/2684124/prt_1327610554.jpg"
                alt="Robert van Nimwegen — portret / Delft RefleXionZ"
                fill
                priority
                sizes="100vw"
                className="object-cover grayscale-[15%] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Naam + kicker */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold mb-8">
              Robert van Nimwegen · Studioro
            </p>
            <h1 className="font-display italic text-6xl md:text-[12rem] leading-[0.92] tracking-[-0.04em]">
              Verhalen <span className="not-italic font-sans font-extralight text-muted">in beeld.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Het verhaal */}
      <section className="py-20 md:py-32 bg-paper-warm border-y border-line">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10 grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
          <div>
            <SectionLabel number="01">Mijn verhaal</SectionLabel>
          </div>
          <div className="space-y-8 text-[18px] md:text-[20px] leading-[1.65] text-ink/85 max-w-2xl">
            <Reveal>
              <p className="font-display italic text-3xl md:text-5xl leading-[1.2] text-ink not-italic-sm">
                &ldquo;{quote}&rdquo;
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Studioro ontstond in 2009. Aanvankelijk vanuit een atelier aan
                de Oude Delft — een van de kleurrijkste grachten van Nederland.
                Wat begon met fotografie breidde zich uit naar film, montage,
                kleurcorrectie en uiteindelijk videokunst.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p>
                De rode draad: <strong className="text-ink">verhaal</strong>.
                Of het nu een commercial is voor Philips, een tewaterlating voor
                IHC Merwede, een muziekvideo voor Epica, of een vrij kunstwerk
                als <Link href="/work/delft-reflexionz" className="underline underline-offset-4 decoration-red hover:text-red">Delft RefleXionZ</Link>:
                beeld moet vertellen.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                Werk verschijnt in bioscopen (Take Off Now), op New Yorkse
                dokken (Norwegian Cruise Line), op de beurzen van Royal
                FloraHolland en op regionale tv (Omroep Delft). Altijd
                Nederlands-grondig in aanpak, altijd met oog voor het kleine
                detail dat het geheel overeind houdt.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Drie principes */}
      <section className="py-24 md:py-40">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <SectionLabel number="02">Aanpak</SectionLabel>
            <h2 className="mt-5 font-display italic text-5xl md:text-7xl leading-[1.05] tracking-[-0.02em]">
              Drie principes.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-0 md:gap-0 border-t border-line">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="p-8 md:p-10 border-r last:border-r-0 border-line h-full">
                  <div className="font-mono text-[11px] tracking-[0.25em] text-red mb-8">
                    {p.n}
                  </div>
                  <h3 className="font-display italic text-4xl md:text-5xl leading-[1.05] mb-6">
                    {p.title}
                  </h3>
                  <p className="text-ink/70 text-[15px] leading-[1.7]">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apparatuur */}
      <section className="py-24 md:py-32 bg-ink text-paper">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <SectionLabel number="03" tone="paper">
                  Apparatuur
                </SectionLabel>
                <h2 className="mt-5 font-display italic text-5xl md:text-7xl leading-[1.05] tracking-[-0.02em]">
                  Vakmensen waarderen dit.
                </h2>
              </div>
              <p className="hidden md:block text-paper/60 text-[13px] max-w-xs text-right">
                Eigen apparatuur voor film, foto, audio, licht, grip en post —
                altijd mee naar locatie, nooit afhankelijk van verhuur.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {equipment.map((cat, i) => (
              <Reveal key={cat.h} delay={i * 50}>
                <div className="bg-ink p-8 md:p-10 h-full">
                  <div className="text-[11px] font-mono tracking-[0.25em] text-red mb-6 uppercase">
                    {cat.h}
                  </div>
                  <ul className="space-y-2.5">
                    {cat.l.map((item) => (
                      <li
                        key={item}
                        className="text-[15px] text-paper/85 flex items-start gap-3"
                      >
                        <span className="text-paper/30 mt-[6px]">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClientsMarquee />

      {/* CTA */}
      <section className="py-32 md:py-52 bg-paper">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10 text-center">
          <Reveal>
            <h2 className="font-display italic text-5xl md:text-8xl leading-[0.98] tracking-[-0.03em]">
              Iets bespreken? <br />
              <Link
                href="/contact"
                className="not-italic font-sans font-light text-red hover:underline underline-offset-[12px]"
              >
                Laten we praten →
              </Link>
            </h2>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
