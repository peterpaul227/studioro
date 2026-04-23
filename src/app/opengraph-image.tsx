import { ImageResponse } from "next/og";

export const alt = "Studioro — Reflecterende videokunst uit Delft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 18% 30%, rgba(139, 58, 31, 0.55) 0%, transparent 55%), radial-gradient(ellipse at 82% 72%, rgba(92, 46, 26, 0.85) 0%, transparent 60%), linear-gradient(135deg, #0a0a0a 0%, #2a1a0a 50%, #0a0a0a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#fafaf7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: -0.6,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#d62828",
            }}
          />
          studioro
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d62828",
              fontWeight: 600,
              marginBottom: 32,
            }}
          >
            Film · Fotografie · Delft
          </div>
          <div
            style={{
              fontSize: 148,
              lineHeight: 0.92,
              letterSpacing: -6,
              fontStyle: "italic",
              fontWeight: 400,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Reflecterende</span>
            <span style={{ fontStyle: "normal", fontWeight: 300 }}>
              videokunst.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            color: "rgba(250,250,247,0.7)",
          }}
        >
          <div style={{ maxWidth: 520, lineHeight: 1.5 }}>
            Hoogwaardig audiovisueel beeld voor merken, events en verhalen —
            sinds 2009, door Robert van Nimwegen.
          </div>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            studioro.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
