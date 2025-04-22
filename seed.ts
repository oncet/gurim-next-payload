import config from "@payload-config";
import { getPayload } from "payload";

const seed = async () => {
  // Get a local copy of Payload by passing your config
  const payload = await getPayload({ config });

  await payload.create({
    collection: "posts",
    data: {
      title: "My First Post",
      body: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              version: 1,
              children: [
                {
                  type: "text",
                  version: 1,
                  text: "This is the body of my first post",
                },
              ],
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      },
    },
  });
};

const runSeed = async () => {
  console.log("Running seed...");
  await seed();
  console.log("Seed completed");
};

runSeed();
