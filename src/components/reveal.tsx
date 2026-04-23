"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Wraps children and fades them in from 24px-down when they enter the viewport.
 * Uses IntersectionObserver — no animation library cost for simple reveals.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-in"), delay);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={clsx("reveal-pre", className)}>
      {children}
    </Tag>
  );
}
