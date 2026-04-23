"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Home hero — full-viewport, editorial/cinematic variant.
 * Background is a layered "showreel" — animated color gradients + grain —
 * so the first deploy feels premium even before a real video loop is added.
 * Drop-in a <video> behind {.grain} later and the rest of the layout is unchanged.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mild parallax — content drifts up slightly as you scroll out.
  const parallax = Math.min(scrollY * 0.25, 120);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-paper grain"
    >
      {/* Layered warm cinematic gradient — placeholder for real showreel loop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 18% 30%, rgba(139, 58, 31, 0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 82% 72%, rgba(92, 46, 26, 0.85) 0%, transparent 60%),
            linear-gradient(135deg, #0a0a0a 0%, #2a1a0a 50%, #0a0a0a 100%)
          `,
        }}
      />
      {/* Soft vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 85% at 50% 55%, transparent 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Timecode — monospace chrome at top */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-[10px] font-mono tracking-[0.3em] text-paper/50"
      >
        REEL.{new Date().getFullYear()} · 00:47:12
      </motion.div>

      {/* Main editorial block — bottom-left anchored */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-10 pb-16 md:pb-20"
        style={{ transform: `translateY(${-parallax}px)` }}
      >
        <div className="mx-auto max-w-[1680px] flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Left: editorial headline */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="text-[11px] font-semibold tracking-[0.3em] text-red mb-6"
            >
              FILM · FOTOGRAFIE · DELFT
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-display italic leading-[0.88] tracking-[-0.045em] text-[clamp(4rem,11vw,11rem)]"
            >
              Reflecterende
              <br />
              <span className="not-italic font-sans font-extralight">
                videokunst.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="mt-8 max-w-md text-[15px] leading-[1.6] text-paper/75"
            >
              Hoogwaardig audiovisueel beeld voor merken, events en verhalen
              die blijven hangen. Film & fotografie, uit Delft, sinds 2009.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="mt-10 flex items-center gap-4"
            >
              <Link
                href="/work"
                className="inline-flex items-center gap-3 group"
              >
                <span className="h-px w-10 bg-red transition-all group-hover:w-16" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-red">
                  Bekijk werk
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right: now-playing chrome */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="hidden md:block text-right text-[12px] font-mono tracking-[0.15em] text-paper/70"
          >
            <div className="text-paper/40 mb-2">— NU TE ZIEN</div>
            <div className="text-paper text-[15px] uppercase tracking-[0.05em] mb-1 font-sans">
              Delft RefleXionZ
            </div>
            <div>Vrij werk · 2012 →</div>
            <div className="mt-6 flex items-center gap-3 justify-end">
              <span className="h-[1px] w-10 bg-red" />
              <Link
                href="/work/delft-reflexionz"
                className="text-red font-semibold tracking-[0.05em]"
              >
                Open project →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] font-mono tracking-[0.3em] text-paper/45 flex items-center gap-2"
      >
        <span>SCROLL</span>
        <span className="inline-block w-px h-4 bg-paper/30" />
      </motion.div>
    </section>
  );
}
