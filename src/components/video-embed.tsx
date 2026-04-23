"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";

type Props = {
  provider: "vimeo" | "youtube";
  id: string;
  title: string;
  poster?: string;
  className?: string;
};

/**
 * Lazy video embed — shows a poster with a play button, only loads the
 * iframe after the user clicks play. Much faster page loads than auto-
 * mounting an iframe, and respects bandwidth-sensitive users.
 */
export function VideoEmbed({ provider, id, title, poster, className }: Props) {
  const [playing, setPlaying] = useState(false);

  const src =
    provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <div
      className={clsx(
        "relative aspect-video overflow-hidden bg-ink group",
        className,
      )}
    >
      {!playing ? (
        <>
          {poster && (
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <button
            onClick={() => setPlaying(true)}
            data-cursor="view"
            aria-label={`Speel ${title} af`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="relative flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full border border-paper/60 bg-paper/5 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-red group-hover:bg-red/20">
              <svg
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="currentColor"
                className="text-paper ml-1.5"
              >
                <path d="M0 0 L24 13 L0 26 Z" />
              </svg>
            </span>
          </button>
          <div className="absolute bottom-5 left-5 md:bottom-6 md:left-8 text-[10px] font-mono tracking-[0.3em] uppercase text-paper/70 flex items-center gap-3 pointer-events-none">
            <span className="h-[1px] w-8 bg-red" />
            Klik om te spelen · {provider}
          </div>
        </>
      ) : (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      )}
    </div>
  );
}
