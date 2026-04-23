"use client";

import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import type { Project } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

type Props = {
  project: Project;
  aspect?: "16/9" | "4/5" | "1/1" | "3/4";
  priority?: boolean;
  index?: number;
  className?: string;
};

/**
 * Project card — thumbnail that, on hover, fades into a muted autoplaying
 * Vimeo preview (when `project.videoId` is present). The Vimeo background
 * player is loaded lazily on hover to avoid loading 40 iframes at once on
 * the Work page. Gracefully falls back to a subtle Ken Burns zoom on the
 * thumbnail if there's no video.
 */
export function ProjectCard({
  project,
  aspect = "16/9",
  priority = false,
  index = 0,
  className,
}: Props) {
  const [hover, setHover] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Lazy-mount the iframe only after the first hover, so the Work grid with
  // 40 cards doesn't pre-fetch 40 Vimeo players.
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  useEffect(() => {
    if (!hover || iframeSrc || !project.videoId) return;
    const params =
      "background=1&autoplay=1&loop=1&muted=1&transparent=0&controls=0";
    const src =
      project.videoProvider === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&mute=1&loop=1&playlist=${project.videoId}&controls=0&modestbranding=1`
        : `https://player.vimeo.com/video/${project.videoId}?${params}`;
    setIframeSrc(src);
  }, [hover, iframeSrc, project.videoId, project.videoProvider]);

  // Hide iframe until "ready" (small delay) to avoid a jarring white flash.
  useEffect(() => {
    if (!iframeSrc) return;
    const t = setTimeout(() => setVideoReady(true), 450);
    return () => clearTimeout(t);
  }, [iframeSrc]);

  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/5": "aspect-[4/5]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
  }[aspect];

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setVideoReady(false);
      }}
      className={clsx("group block", className)}
    >
      <div className={clsx("relative overflow-hidden bg-ink/10", aspectClass)}>
        {/* Base layer: thumbnail or palette */}
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={clsx(
              "object-cover transition-transform duration-[1400ms] ease-out",
              hover ? "scale-[1.06]" : "scale-100",
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

        {/* Hover video — mounted lazily, fades in */}
        {iframeSrc && (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={`${project.title} preview`}
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            className={clsx(
              "absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-700",
              "scale-[1.25]", // trim Vimeo chrome edges
              videoReady && hover ? "opacity-100" : "opacity-0",
            )}
            style={{ border: 0 }}
          />
        )}

        {/* Dark veil on hover for title legibility */}
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity duration-500",
            hover ? "opacity-100" : "opacity-65",
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
          <div className="text-muted text-[13px] mt-1">{project.client}</div>
        </div>
        <div className="text-muted text-[13px] font-mono whitespace-nowrap">
          {project.year}
        </div>
      </div>
    </Link>
  );
}
