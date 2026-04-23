"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SectionLabel } from "@/components/section-label";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook up to a real observability stack (Sentry) later — for now,
    // log to the browser console so we can still diagnose from a support call.
    // eslint-disable-next-line no-console
    console.error("[studioro] caught error:", error);
  }, [error]);

  return (
    <section className="min-h-[90svh] flex items-center justify-center bg-paper px-6 pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel className="justify-center">Something broke</SectionLabel>
        <h1 className="mt-8 font-display italic text-6xl md:text-8xl leading-[0.95] tracking-[-0.03em]">
          Hmm. Buiten focus.
        </h1>
        <p className="mt-8 text-muted text-lg max-w-lg mx-auto">
          Er ging iets mis aan onze kant. Probeer opnieuw, of ga terug naar
          home. Als dit vaker gebeurt, hoor ik het graag.
        </p>
        {error.digest && (
          <p className="mt-4 text-xs font-mono text-muted-soft">
            referentie: {error.digest}
          </p>
        )}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-[12px] uppercase tracking-[0.2em] font-semibold hover:bg-red transition-colors"
          >
            Opnieuw proberen
            <span>↻</span>
          </button>
          <Link
            href="/"
            className="text-[13px] uppercase tracking-[0.2em] underline underline-offset-4 decoration-ink/40 hover:decoration-red hover:text-red"
          >
            Naar home
          </Link>
        </div>
      </div>
    </section>
  );
}
