import { ImageResponse } from "next/og";

/**
 * Dynamic icon — pure near-black with the red brand dot, no text.
 * Next auto-generates /icon.png and /apple-icon.png from this.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            background: "#d62828",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
