import { GalleryBlock } from "@/payload-types";
import config from "@payload-config";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import { getPayload } from "payload";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<GalleryBlock>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    gallery: ({ node }) => {
      return (
        <>
          {node.fields.image.map((image) => {
            if (typeof image === "number" || !image.url) {
              return null;
            }

            return (
              <Image
                key={image.id}
                src={image.url}
                alt={image.alt}
                width={250}
                height={250}
              />
            );
          })}
        </>
      );
    },
  },
});

const MyComponent = ({ data }: { data: SerializedEditorState }) => {
  return <RichText data={data} converters={jsxConverters} />;
};

const payload = await getPayload({ config });

export default async function Posts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const post = await payload.findByID({
    collection: "posts",
    id,
  });

  return (
    <>
      <h1>{post.title}!!!</h1>
      <ul>
        {post.categories
          ?.flatMap((category) =>
            typeof category !== "number" ? [category] : []
          )
          .map((category) => <li key={category.id}>{category.label}</li>)}
      </ul>
      <MyComponent data={post.body} />
    </>
  );
}
