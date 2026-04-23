"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — a 6px dot that follows the mouse, grows into a
 * 52px outlined circle on hoverable elements, and morphs into "View"
 * over project cards. Uses a spring-less direct RAF-interpolation so it
 * feels heavy but snappy (like Framer / Linear cursors).
 *
 * Hidden on touch devices and on motion-reduced preferences.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch / reduced-motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { x: target.x, y: target.y };
    let visible = false;

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      if (!visible) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        visible = true;
      }
      dot.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      visible = false;
    };

    let mode: "default" | "expand" | "view" = "default";
    const setMode = (next: typeof mode) => {
      if (next === mode) return;
      mode = next;
      ring.dataset.mode = next;
      label.textContent = next === "view" ? "View" : "";
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor]",
      ) as HTMLElement | null;
      if (!el) return setMode("default");
      const cursorAttr = el.dataset.cursor;
      if (cursorAttr === "view") return setMode("view");
      if (cursorAttr === "expand" || el.tagName === "A" || el.tagName === "BUTTON")
        return setMode("expand");
      setMode("default");
    };

    // RAF loop for ring easing
    let rafId = 0;
    const ease = 0.18;
    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * ease;
      ringPos.y += (target.y - ringPos.y) * ease;
      const size = mode === "view" ? 72 : mode === "expand" ? 48 : 28;
      ring.style.transform = `translate3d(${ringPos.x - size / 2}px, ${ringPos.y - size / 2}px, 0)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full bg-red opacity-0 transition-opacity duration-200 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-mode="default"
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-white opacity-0 transition-[opacity,border-color,background,width,height] duration-300 ease-out mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-white"
        />
      </div>
      <style>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          html.has-custom-cursor,
          html.has-custom-cursor body,
          html.has-custom-cursor a,
          html.has-custom-cursor button {
            cursor: none !important;
          }
          html.has-custom-cursor input,
          html.has-custom-cursor textarea,
          html.has-custom-cursor select {
            cursor: text !important;
          }
        }
      `}</style>
    </>
  );
}
