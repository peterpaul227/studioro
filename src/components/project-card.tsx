"use client";

import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import type { Project } from "@/lib/data";
import { useState } from "react";

type Props = {
  project: Project;
  aspect?: "16/9" | "4/5" | "1/1" | "3/4";
  priority?: boolean;
  eager?: boolean;
  index?: number;
  className?: string;
};

export function ProjectCard({
  project,
  aspect = "16/9",
  priority = false,
  index = 0,
  className,
}: Props) {
  const [hover, setHover] = useState(false);
  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/5": "aspect-[4/5]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
  }[aspect];

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={clsx("group block", className)}
    >
      <div className={clsx("relative overflow-hidden bg-ink/10", aspectClass)}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={clsx(
              "object-cover transition-transform duration-700 ease-out",
              hover ? "scale-[1.04]" : "scale-100",
            )}
          />
        ) : project.palette ? (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${(index * 35) % 360}deg, ${project.palette[0]}, ${project.palette[1]})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-ink" />
        )}

        {/* Dark veil on hover for title legibility */}
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500",
            hover ? "opacity-100" : "opacity-60",
          )}
        />

        {/* Hover label */}
        <div
          className={clsx(
            "absolute inset-x-0 bottom-0 p-6 md:p-7 text-paper flex items-end justify-between gap-4 transition-all duration-500",
            hover ? "translate-y-0 opacity-100" : "translate-y-1 opacity-95",
          )}
        >
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-paper/60 mb-1">
              {String(index + 1).padStart(2, "0")} /{" "}
              {project.categoryLabel ?? project.category}
            </div>
            <div className="font-display italic text-2xl md:text-3xl leading-[1.05]">
              {project.title}
            </div>
          </div>
          <span
            className={clsx(
              "text-[11px] font-mono tracking-[0.2em] text-paper/80 transition-transform",
              hover && "translate-x-1",
            )}
          >
            →
          </span>
        </div>
      </div>

      {/* Below-image meta */}
      <div className="flex items-start justify-between gap-4 mt-4">
        <div>
          <div className="font-medium text-ink text-[15px] leading-tight">
            {project.title}
          </div>
          <div className="text-muted text-[13px] mt-1">
            {project.client}
          </div>
        </div>
        <div className="text-muted text-[13px] font-mono whitespace-nowrap">
          {project.year}
        </div>
      </div>
    </Link>
  );
}
