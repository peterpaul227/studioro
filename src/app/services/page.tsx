import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { services } from "@/lib/data";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Film, fotografie, event registratie, drone, montage en fine-art prints. Van concept tot oplevering — één aanspreekpunt.",
};

export default function ServicesPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-12">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold">
              — Vanaf-prijzen · per project offerte op maat
            </p>
            <h1 className="mt-6 font-display italic text-6xl md:text-[11rem] leading-[0.9] tracking-[-0.04em]">
              Wat we maken.
            </h1>
            <p className="mt-10 max-w-2xl text-xl md:text-2xl text-muted leading-[1.4]">
              Zes diensten, één aanspreekpunt. Of het een losse dagopdracht
              is of een campagne over meerdere maanden — dezelfde zorg, zelfde
              aanpak, zelfde afwerking.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services — alternating layout */}
      <section className="mt-16 md:mt-24">
        {services.map((s, i) => {
          const imgLeft = i % 2 === 0;
          const gradient = [
            ["#2a1a0a", "#8b3a1f"],
            ["#0a1628", "#2a4a75"],
            ["#1a0a14", "#5a1a3a"],
            ["#14141a", "#2e2e42"],
            ["#0a1a10", "#1a4a2a"],
            ["#1a140a", "#4a3a1a"],
          ][i % 6];
          return (
            <div
              key={s.n}
              className="border-t border-line py-16 md:py-28"
            >
              <div className="mx-auto max-w-[1680px] px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
                <Reveal
                  className={clsx(
                    "order-2",
                    imgLeft ? "md:order-1" : "md:order-2",
                  )}
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    style={{
                      background: `linear-gradient(${i * 45}deg, ${gradient[0]}, ${gradient[1]})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-paper/80">
                      <div className="text-[11px] font-mono tracking-[0.25em] uppercase mb-2 text-paper/60">
                        Voorbeeld
                      </div>
                      <div className="font-display italic text-2xl md:text-3xl leading-[1.05]">
                        {s.example}
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  className={clsx(
                    "order-1",
                    imgLeft ? "md:order-2" : "md:order-1",
                  )}
                  delay={100}
                >
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.25em] text-red mb-6">
                      {s.n}
                    </div>
                    <h2 className="font-display italic text-5xl md:text-7xl leading-[1.02] tracking-[-0.025em]">
                      {s.title}
                    </h2>
                    <p className="mt-8 text-[17px] md:text-[18px] leading-[1.65] text-ink/80 max-w-lg">
                      {s.description}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-5">
                      <span className="px-4 py-2 border border-ink text-[12px] uppercase tracking-[0.15em] font-mono">
                        {s.price}
                      </span>
                      <span className="text-[13px] text-muted">
                        → {s.example}
                      </span>
                    </div>

                    <ul className="mt-8 pt-6 border-t border-line space-y-2.5 max-w-md">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          className="text-[14px] text-ink/70 flex items-start gap-3"
                        >
                          <span className="text-red mt-[6px]">—</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="py-32 md:py-52 border-t border-line">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10 text-center">
          <Reveal>
            <SectionLabel number="→">Klaar?</SectionLabel>
            <h2 className="mt-6 font-display italic text-5xl md:text-8xl leading-[0.98] tracking-[-0.03em] max-w-4xl mx-auto">
              Weet je wat je zoekt?
            </h2>
            <p className="mt-6 text-xl text-muted max-w-xl mx-auto">
              Ook als je nog niet zeker weet welke dienst past — even
              sparren mag altijd.
            </p>
            <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red text-paper text-[12px] uppercase tracking-[0.2em] font-semibold hover:bg-red-deep transition-colors"
              >
                Vraag een offerte aan →
              </Link>
              <a
                href="tel:+31619786803"
                className="text-[14px] underline underline-offset-4 decoration-[1.5px] decoration-ink/40 hover:decoration-red hover:text-red"
              >
                Of bel direct: +31 6 19 78 68 03
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
