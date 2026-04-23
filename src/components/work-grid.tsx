"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { ProjectCard } from "./project-card";
import type { Project, ProjectCategory } from "@/lib/data";
import { categories } from "@/lib/data";

type Filter = ProjectCategory | "all";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [projects]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-[64px] md:top-[76px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-4 bg-paper/90 backdrop-blur-md border-y border-line">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="font-display italic text-xl text-red mr-4 flex-shrink-0">
            Filter —
          </span>
          {categories.map((c) => {
            const active = filter === c.value;
            const count = counts[c.value] ?? 0;
            if (!count && c.value !== "all") return null;
            return (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={clsx(
                  "whitespace-nowrap px-4 py-2 text-[12px] uppercase tracking-[0.15em] font-medium border transition-all rounded-full flex-shrink-0",
                  active
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-ink border-line hover:border-ink",
                )}
              >
                {c.label}
                {count > 0 && (
                  <span
                    className={clsx(
                      "ml-2 text-[10px] font-mono",
                      active ? "text-paper/60" : "text-muted",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {visible.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            aspect="4/5"
            index={i}
            priority={i < 3}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-center text-muted py-24">
          Geen projecten in deze categorie — nog.
        </p>
      )}

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </>
  );
}
