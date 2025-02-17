import type { CollectionConfig } from "payload";

export const Menus: CollectionConfig = {
  slug: "menus",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "items",
      label: "Items",
      type: "group",
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
        {
          name: "item2",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
