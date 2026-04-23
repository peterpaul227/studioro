import { defineType, defineField, defineArrayMember } from "sanity";

export const service = defineType({
  name: "service",
  title: "Dienst",
  type: "document",
  fields: [
    defineField({
      name: "n",
      title: "Nummer",
      type: "string",
      description: "Bijv. 01, 02, 03 — voor volgorde + display",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Prijs (vanaf-indicatie)",
      type: "string",
      description: "Bijv. 'vanaf € 1.850'",
    }),
    defineField({
      name: "example",
      title: "Voorbeeldproject",
      type: "string",
    }),
    defineField({
      name: "deliverables",
      title: "Wat krijg je (bullets)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  orderings: [
    {
      title: "Volgorde",
      name: "order",
      by: [{ field: "n", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "n" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `${subtitle ?? ""}` };
    },
  },
});
