// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Posts } from "@/collections/Posts";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Menus } from "./collections/Menus";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Menus, Categories],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: "gallery",
            interfaceName: "GalleryBlock",
            fields: [
              {
                name: "image",
                type: "upload",
                relationTo: "media",
                hasMany: true,
                required: true,
              },
            ],
          },
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
