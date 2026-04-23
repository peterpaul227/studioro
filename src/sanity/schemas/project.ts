import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Project schema — mirrors the TS type in lib/data.ts plus media fields
 * Robert needs (hero video, gallery). Slug drives the URL.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required().min(2).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "De URL — bijv. 'delft-reflexionz' voor studioro.com/work/delft-reflexionz",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Opdrachtgever",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "number",
      validation: (r) => r.required().integer().min(2005).max(2100),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Film", value: "film" },
          { title: "Fotografie", value: "fotografie" },
          { title: "Event", value: "event" },
          { title: "Commercial", value: "commercial" },
          { title: "Corporate", value: "corporate" },
          { title: "Documentaire", value: "documentaire" },
          { title: "Music video", value: "musicvideo" },
          { title: "Animatie", value: "animatie" },
          { title: "Kunst", value: "kunst" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoryLabel",
      title: "Categorie-label (optioneel)",
      description: "Overschrijft de standaardnaam — bv. 'Reflecterende videokunst'",
      type: "string",
    }),
    defineField({
      name: "teaser",
      title: "Korte beschrijving (1 zin)",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "description",
      title: "Uitgebreide beschrijving",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "featured",
      title: "Uitgelicht op de homepage?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Volgorde (lager = eerder)",
      type: "number",
      description: "Laat leeg voor automatisch op jaar aflopend.",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail / Hero",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoProvider",
      title: "Video-provider",
      type: "string",
      options: {
        list: [
          { title: "Vimeo", value: "vimeo" },
          { title: "YouTube", value: "youtube" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      description:
        "Voor Vimeo: alleen het nummer (vb. 28297638). Voor YouTube: de ID na v= (vb. dQw4w9WgXcQ).",
      type: "string",
    }),
    defineField({
      name: "gallery",
      title: "Gallery (stills)",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Bijschrift (optioneel)",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "credits",
      title: "Credits / rolverdeling",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "role", title: "Rol", type: "string" }),
            defineField({ name: "name", title: "Naam", type: "string" }),
          ],
          preview: {
            select: { title: "role", subtitle: "name" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "thumbnail",
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
  orderings: [
    {
      title: "Jaar (nieuw → oud)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Titel (A–Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
