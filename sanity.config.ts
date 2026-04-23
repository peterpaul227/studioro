/**
 * Sanity Studio config, embedded at /studio in the Next app.
 *
 * Robert opens /studio, logs in with the email he used at sanity.io,
 * and gets a visual editor for every project, service, and site setting.
 * Changes publish instantly to the live site (ISR-revalidated).
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "studioro",
  title: "Studioro — CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Studioro")
          .items([
            S.listItem()
              .title("Projecten")
              .child(S.documentTypeList("project").title("Projecten")),
            S.listItem()
              .title("Diensten")
              .child(S.documentTypeList("service").title("Diensten")),
            S.listItem()
              .title("Clients / Logos")
              .child(S.documentTypeList("client").title("Clients")),
            S.divider(),
            S.listItem()
              .title("Site instellingen")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
