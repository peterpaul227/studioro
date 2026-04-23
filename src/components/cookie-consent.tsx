"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "studioro_cookie_consent_v1";

type Choice = "accepted" | "essential-only" | null;

/**
 * Simple cookie consent — NL GDPR compliant approach:
 * - No non-essential cookies are loaded until the user says "accept"
 * - "Essential only" stores only the consent decision itself
 * - We don't load any third-party analytics until consent, so refusing
 *   is a valid & functional choice
 *
 * Vimeo player embeds are gated on accept via the `window.__studioroConsent`
 * flag (wire that up in the embed component if we add analytics later).
 */
export function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Choice;
    if (!stored) {
      // Small delay so banner doesn't fight with hero load animations.
      const t = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (choice: Exclude<Choice, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage blocked — still hide the banner */
    }
    (window as unknown as { __studioroConsent?: string }).__studioroConsent =
      choice;
    setVisible(false);
  };

  if (!visible || pathname.startsWith("/studio")) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-voorkeuren"
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[60] bg-ink text-paper shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
    >
      <div className="p-5 md:p-6">
        <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-red mb-3">
          — Cookies
        </p>
        <p className="text-[14px] leading-[1.6] text-paper/85 mb-4">
          We gebruiken alleen functionele cookies voor de basis van de site.
          Geen tracking, geen advertising. Voor video-previews (Vimeo / YouTube)
          laadt een embed van die partij pas zodra je akkoord gaat.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => choose("accepted")}
            className="flex-1 px-4 py-3 bg-red text-paper text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-red-deep transition-colors"
          >
            Akkoord
          </button>
          <button
            onClick={() => choose("essential-only")}
            className="flex-1 px-4 py-3 border border-paper/30 text-paper/85 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-paper/10 transition-colors"
          >
            Alleen functioneel
          </button>
        </div>
        <p className="mt-3 text-[11px] text-paper/45">
          Meer info:{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-paper"
          >
            privacybeleid
          </Link>
        </p>
      </div>
    </div>
  );
}
