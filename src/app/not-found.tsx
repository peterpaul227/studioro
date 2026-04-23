import Link from "next/link";
import { SectionLabel } from "@/components/section-label";

export default function NotFound() {
  return (
    <section className="min-h-[90svh] flex items-center justify-center bg-paper px-6 pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel className="justify-center">Error · 404</SectionLabel>
        <h1 className="mt-8 font-display italic text-7xl md:text-[10rem] leading-[0.9] tracking-[-0.04em]">
          Uit beeld.
        </h1>
        <p className="mt-8 text-muted text-lg md:text-xl max-w-lg mx-auto">
          Deze pagina bestaat niet (meer). Waarschijnlijk een oude link of een
          typefout. Terug naar een vaste grond:
        </p>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-[12px] uppercase tracking-[0.2em] font-semibold hover:bg-red transition-colors"
          >
            Home
            <span>→</span>
          </Link>
          <Link
            href="/work"
            className="text-[13px] uppercase tracking-[0.2em] underline underline-offset-4 decoration-ink/40 hover:decoration-red hover:text-red"
          >
            Naar het werk
          </Link>
        </div>
      </div>
    </section>
  );
}
