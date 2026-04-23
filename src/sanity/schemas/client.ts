import { defineType, defineField } from "sanity";

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo (SVG of PNG, transparant)",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
    }),
    defineField({
      name: "website",
      title: "Website (optioneel)",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
  orderings: [
    { title: "Volgorde", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "A–Z", name: "alpha", by: [{ field: "name", direction: "asc" }] },
  ],
});
