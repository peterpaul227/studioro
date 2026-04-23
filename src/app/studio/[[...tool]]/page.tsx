/**
 * Embedded Sanity Studio at /studio.
 *
 * This lives inside the Next.js app so Robert gets one URL and one login —
 * the studio uses his same sanity.io credentials and writes directly to the
 * project dataset.
 *
 * If `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset (first deploy before the CMS
 * is configured), we render a helpful setup screen instead of crashing.
 */
"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

export const dynamicParams = false;

// NextStudio uses the browser-only postmessage API; load it client-only.
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false },
);

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#fafaf7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: 40,
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#d62828",
              marginBottom: 20,
            }}
          >
            CMS · setup vereist
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 600, marginBottom: 20 }}>
            Sanity Studio — nog niet verbonden
          </h1>
          <p style={{ lineHeight: 1.7, opacity: 0.8, marginBottom: 16 }}>
            De CMS is voorbereid maar er zijn nog geen project-credentials
            toegevoegd. In Vercel project-settings → Environment Variables,
            stel in:
          </p>
          <pre
            style={{
              background: "#1a1a1a",
              padding: 16,
              borderRadius: 4,
              fontSize: 13,
              overflowX: "auto",
            }}
          >
            {`NEXT_PUBLIC_SANITY_PROJECT_ID=<jouw project ID>
NEXT_PUBLIC_SANITY_DATASET=production`}
          </pre>
          <p style={{ lineHeight: 1.7, opacity: 0.6, marginTop: 20, fontSize: 14 }}>
            Maak een gratis Sanity-project aan op{" "}
            <a
              href="https://www.sanity.io/"
              style={{ color: "#d62828" }}
              target="_blank"
              rel="noopener"
            >
              sanity.io
            </a>{" "}
            en kopieer het Project ID hierheen. Een redeploy en klaar.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
