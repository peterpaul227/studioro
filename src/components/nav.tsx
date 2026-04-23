"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

const ITEMS = [
  { href: "/work", label: "Werk" },
  { href: "/about", label: "Over" },
  { href: "/services", label: "Diensten" },
  { href: "/prints", label: "Prints" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the home hero until scrolled; solid everywhere else.
  const transparent = onHome && !scrolled;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent text-paper"
          : "bg-paper/80 text-ink backdrop-blur-md border-b border-line",
      )}
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          aria-label="Studioro — home"
          className="group flex items-center gap-2 text-xl font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-red transition-transform duration-300 group-hover:scale-125"
          />
          <span className="leading-none">studioro</span>
        </Link>

        <nav className="hidden items-center gap-8 text-[12px] font-medium uppercase tracking-[0.18em] md:flex">
          {ITEMS.map((it) => {
            const active =
              it.href === "/"
                ? pathname === "/"
                : pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={clsx(
                  "relative py-2 transition-colors",
                  active ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
              >
                {it.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-current" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden relative h-8 w-8 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={clsx(
              "block h-px w-5 bg-current transition-transform",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={clsx(
              "block h-px w-5 bg-current transition-transform",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "md:hidden overflow-hidden bg-paper text-ink transition-[max-height,opacity] duration-300 border-t border-line",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-6 text-lg">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-line last:border-b-0 flex items-center justify-between"
            >
              <span>{it.label}</span>
              <span className="text-muted-soft text-sm">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
