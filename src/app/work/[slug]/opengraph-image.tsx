import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

export const alt = "Studioro project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const p = projects.find((x) => x.slug === params.slug);
  return [
    {
      id: 0,
      alt: p ? `${p.title} — Studioro` : "Studioro project",
      contentType: "image/png",
      size,
    },
  ];
}

export default async function ProjectOG({
  params,
}: {
  params: { slug: string };
}) {
  const p = projects.find((x) => x.slug === params.slug);
  const title = p?.title ?? "Studioro";
  const client = p?.client ?? "";
  const year = p?.year ?? "";
  const category = p?.categoryLabel ?? p?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: p?.thumbnail
            ? "#0a0a0a"
            : `linear-gradient(135deg, ${p?.palette?.[0] ?? "#0a0a0a"}, ${p?.palette?.[1] ?? "#2a1a0a"})`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fafaf7",
          position: "relative",
        }}
      >
        {/* Background image if available */}
        {p?.thumbnail && (
          <img
            src={p.thumbnail}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
        )}
        {/* Veil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
            display: "flex",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: -0.5,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#d62828",
            }}
          />
          studioro
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#d62828",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {category} · {year}
          </div>
          <div
            style={{
              fontSize: 100,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 22,
              marginTop: 20,
              color: "rgba(250,250,247,0.7)",
            }}
          >
            {client}
          </div>
        </div>

        {/* Bottom chrome */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 13,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(250,250,247,0.6)",
            fontFamily: "ui-monospace, monospace",
            zIndex: 1,
          }}
        >
          <span>Project · studioro.com/work</span>
          <span>{p?.videoId ? "▶ Video" : "• Stills"}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
