import config from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export default async function Home() {
  const posts = await payload.find({
    collection: "posts",
  });

  return (
    <>
      <Link href="/categories">Categories</Link>
      <ul>
        {posts.docs.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
