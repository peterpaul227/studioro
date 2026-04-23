import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description: "Voorwaarden voor opdrachten aan Studioro.",
};

export default function TermsPage() {
  return (
    <div className="bg-paper pt-32 md:pt-40 pb-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <SectionLabel>Juridisch</SectionLabel>
          <h1 className="mt-6 font-display italic text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">
            Algemene Voorwaarden
          </h1>
          <p className="mt-6 text-muted text-[14px]">
            Studioro · Robert van Nimwegen · KvK 27260276
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-16 space-y-8 text-ink/85 text-[15px] leading-[1.75]">
            <p className="text-[16px] text-ink/60 italic border-l-2 border-red pl-4">
              Deze pagina is een placeholder. De definitieve algemene
              voorwaarden worden aangeleverd door een jurist en hier geplaatst
              vóór de officiële lancering.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                Samenvatting
              </h2>
              <p>
                Voor elke opdracht wordt vooraf een schriftelijke offerte
                gemaakt, waarin leveringsdatum, aantal deliverables, rechten en
                betalingstermijn staan. Rechten op het eindmateriaal gaan pas
                over na volledige betaling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                Annulering
              </h2>
              <p>
                Bij annulering minder dan 7 dagen voor de opname-datum wordt
                50% van de overeengekomen vergoeding in rekening gebracht. Bij
                overmacht (ziekte, weersextremen) zoeken we samen een nieuwe
                datum zonder meerkosten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                Portfolio-gebruik
              </h2>
              <p>
                Tenzij uitdrukkelijk anders afgesproken, behoudt Studioro het
                recht om opgeleverd werk te tonen in eigen portfolio en
                showreels (studioro.com, Vimeo, Instagram, LinkedIn). Bij
                NDA-projecten geldt een aparte overeenkomst.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">Contact</h2>
              <p>
                Vragen over deze voorwaarden? Stuur een bericht naar{" "}
                <a
                  href="mailto:info@studioro.com"
                  className="text-red underline underline-offset-4"
                >
                  info@studioro.com
                </a>
                .
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
