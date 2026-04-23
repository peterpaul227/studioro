/**
 * Sanity client + image-URL builder.
 *
 * Used by server components to query published content. Safe to import in
 * any server-rendered path — it falls back silently if the env vars aren't
 * set yet, so the site still renders from the static TS data before the
 * CMS is connected.
 */
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Local type for the image-url input — avoids cross-package type import
// breakage between Sanity versions.
type SanityImageSource = Parameters<
  ReturnType<typeof imageUrlBuilder>["image"]
>[0];

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const hasSanity = Boolean(projectId);

export const sanity = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    })
  : null;

const builder = hasSanity
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    // Graceful degradation — return a dummy object with the same surface.
    return {
      url: () => "",
      width: () => ({ url: () => "" }) as unknown,
    } as unknown as ReturnType<typeof imageUrlBuilder>["image"];
  }
  return builder.image(source);
};
