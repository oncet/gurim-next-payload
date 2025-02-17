import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "body",
      type: "richText",
      required: true,
    },
    {
      name: "highlightImage",
      label: "Highlight image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
