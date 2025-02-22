import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "value",
  },
  fields: [
    {
      name: "value",
      type: "text",
      required: true,
    },
  ],
};
