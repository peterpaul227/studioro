import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Prints · Fotografische Kunstwerken",
  description:
    "Limited-edition fine-art prints uit de Delft RefleXionZ reeks en ander eigen werk, gedrukt op Hahnemühle papier en gesigneerd.",
};

type Print = {
  slug: string;
  title: string;
  edition: string;
  price: string;
  series: string;
  gradient: [string, string];
};

const prints: Print[] = [
  {
    slug: "oude-delft-3",
    title: "Oude Delft #3",
    series: "Delft RefleXionZ",
    edition: "Editie /25",
    price: "vanaf € 180",
    gradient: ["#0a1a1a", "#1a4a4a"],
  },
  {
    slug: "oostpoort-reflectie",
    title: "Oostpoort — Reflectie",
    series: "Delft RefleXionZ",
    edition: "Editie /25",
    price: "vanaf € 180",
    gradient: ["#14140a", "#3a3a14"],
  },
  {
    slug: "nieuwe-langendijk-winter",
    title: "Nieuwe Langendijk — Winter",
    series: "Delft RefleXionZ",
    edition: "Editie /15",
    price: "vanaf € 240",
    gradient: ["#0a0a14", "#1a1a4a"],
  },
  {
    slug: "koornmarkt-dusk",
    title: "Koornmarkt — Dusk",
    series: "Delft RefleXionZ",
    edition: "Editie /25",
    price: "vanaf € 180",
    gradient: ["#1a0a14", "#4a1a3a"],
  },
  {
    slug: "gezicht-op-delft-blauw",
    title: "Gezicht op Delft — Blauw",
    series: "Delft RefleXionZ",
    edition: "Editie /10",
    price: "vanaf € 320",
    gradient: ["#0a1420", "#1a3a55"],
  },
  {
    slug: "met-vlag-wimpel-01",
    title: "Met Vlag & Wimpel — Straat 01",
    series: "Met Vlag & Wimpel",
    edition: "Editie /25",
    price: "vanaf € 180",
    gradient: ["#1a0a0a", "#4a1a1a"],
  },
];

export default function PrintsPage() {
  return (
    <div className="bg-paper pt-32 md:pt-44 pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-[1680px] px-6 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold">
            — Fotografische kunstwerken · voor aan uw muur
          </p>
          <h1 className="mt-6 font-display italic text-6xl md:text-[11rem] leading-[0.9] tracking-[-0.04em]">
            Prints.
          </h1>
          <p className="mt-10 max-w-3xl text-xl md:text-2xl text-muted leading-[1.4]">
            Limited-edition fotografische kunstwerken uit de Delft RefleXionZ
            reeks en ander vrij werk. Gedrukt op Hahnemühle fine-art papier,
            gesigneerd, en op aanvraag ingelijst. Ontdek en bestel hier —
            voor aan uw muur.
          </p>
        </Reveal>
      </section>

      {/* Specs row */}
      <section className="mx-auto max-w-[1680px] px-6 md:px-10 mt-16 md:mt-24">
        <div className="grid md:grid-cols-4 gap-0 border-y border-line">
          {[
            ["Papier", "Hahnemühle Photo Rag 308g"],
            ["Editie", "Limited /10 – /25"],
            ["Certificering", "Gesigneerd + certificaat"],
            ["Lijstwerk", "Optioneel — eikenhout of zwart"],
          ].map(([h, d]) => (
            <div
              key={h}
              className="py-6 md:py-8 md:px-8 md:border-r last:md:border-r-0 border-line"
            >
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-red mb-2">
                {h}
              </div>
              <div className="text-[15px] text-ink/85">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1680px] px-6 md:px-10 mt-20 md:mt-32">
        <Reveal>
          <SectionLabel number="01">Actuele collectie</SectionLabel>
          <h2 className="mt-5 font-display italic text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
            Beschikbaar nu.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {prints.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link
                href={`/prints/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      background: `linear-gradient(${i * 45}deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
                  <div className="absolute top-6 left-6 right-6 flex justify-between text-paper/70 text-[10px] font-mono tracking-[0.25em] uppercase">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.edition}</span>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <div className="font-display italic text-2xl md:text-3xl leading-[1.05]">
                      {p.title}
                    </div>
                    <div className="text-[13px] text-muted mt-1">
                      {p.series}
                    </div>
                  </div>
                  <div className="text-[13px] font-mono whitespace-nowrap">
                    {p.price}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 md:mt-52 py-24 md:py-32 border-t border-line bg-paper-warm">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <SectionLabel number="→">Maatwerk</SectionLabel>
            <h2 className="mt-5 font-display italic text-4xl md:text-6xl leading-[1.1] tracking-[-0.02em]">
              Een ander formaat, een ander beeld?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="text-[17px] text-ink/80 leading-[1.7] max-w-lg">
                Alle werken zijn op aanvraag leverbaar in grotere formaten,
                alternatieve materialen (dibond, aluminium, acryl), of met
                maatwerk-inlijsting. Ook bestaand werk uit de portfolio kan
                — vraag ernaar.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-[12px] uppercase tracking-[0.2em] font-semibold hover:bg-red transition-colors"
                >
                  Vraag aan voor maatwerk →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
