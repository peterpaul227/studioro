import { defineType, defineField } from "sanity";

/**
 * Singleton — Robert edits this once to control global site chrome.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site instellingen",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Bv. 'Reflecterende videokunst uit Delft'",
    }),
    defineField({
      name: "heroVimeoId",
      title: "Hero showreel — Vimeo ID",
      type: "string",
      description:
        "Het nummer van een Vimeo-video die op de homepage achter de titel loopt. Laat leeg voor de warmte-gradient fallback.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      initialValue: "info@studioro.com",
    }),
    defineField({
      name: "contactPhone",
      title: "Telefoon",
      type: "string",
    }),
    defineField({
      name: "kvk",
      title: "KvK nummer",
      type: "string",
    }),
    defineField({
      name: "btw",
      title: "BTW nummer",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Sociaal",
      type: "object",
      fields: [
        defineField({ name: "vimeo", title: "Vimeo URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Pull-quote (home)",
      type: "text",
      rows: 3,
      description: 'Verschijnt groot gecursiveerd op de homepage.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site instellingen" };
    },
  },
});
