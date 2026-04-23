import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe Studioro omgaat met persoonsgegevens, contactformulieren en cookies.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper pt-32 md:pt-40 pb-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <SectionLabel>Juridisch</SectionLabel>
          <h1 className="mt-6 font-display italic text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">
            Privacybeleid
          </h1>
          <p className="mt-6 text-muted text-[14px]">
            Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL")}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="prose prose-neutral max-w-none mt-16 space-y-8 text-ink/85 text-[15px] leading-[1.75]">
            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                1. Wie zijn wij
              </h2>
              <p>
                Studioro is de handelsnaam van Robert van Nimwegen, gevestigd
                in Delft, Nederland (KvK 27260276). Voor vragen over privacy
                kun je contact opnemen via{" "}
                <a
                  href="mailto:info@studioro.com"
                  className="text-red underline underline-offset-4"
                >
                  info@studioro.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                2. Welke gegevens verzamelen we
              </h2>
              <p>
                Alleen wat je zelf invult via het contactformulier: naam,
                e-mailadres, optioneel bedrijf, type project, budget en je
                bericht. We gebruiken je IP-adres kortstondig om spam en
                misbruik te voorkomen (rate limiting).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                3. Waarvoor gebruiken we deze gegevens
              </h2>
              <p>
                Uitsluitend om jouw bericht te beantwoorden en — als daar een
                project uit voortkomt — je projectdossier op te bouwen. We
                delen je gegevens niet met derden, behalve met de email-provider
                (Resend) die technisch noodzakelijk is om het bericht af te
                leveren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                4. Bewaartermijn
              </h2>
              <p>
                Formulier-berichten worden bewaard zolang dat nodig is om je
                aanvraag af te handelen, en maximaal 2 jaar na afronding van
                een project (voor administratie en aftersales). Daarna worden
                ze verwijderd.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">5. Cookies</h2>
              <p>
                We gebruiken alleen functionele cookies voor de basis van de
                site. Geen analytics, geen advertising-tracking. Pas zodra je
                in de cookie-banner akkoord geeft, worden embeds van Vimeo en
                YouTube geladen (die stellen hun eigen cookies in).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                6. Jouw rechten
              </h2>
              <p>
                Je hebt recht op inzage, correctie, verwijdering en overdraag­baarheid
                van je gegevens. Stuur daarvoor een bericht naar{" "}
                <a
                  href="mailto:info@studioro.com"
                  className="text-red underline underline-offset-4"
                >
                  info@studioro.com
                </a>
                . Ook kun je een klacht indienen bij de Autoriteit
                Persoonsgegevens.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">
                7. Wijzigingen
              </h2>
              <p>
                Dit beleid kan aangepast worden. De meest recente versie staat
                altijd op deze pagina, gedateerd bovenaan.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
