import config from "@payload-config";
import {} from "@payloadcms/richtext-lexical";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export default async function Categories() {
  const categories = await payload.find({
    collection: "categories",
  });

  return (
    <>
      <h1 className="bg-gurim-yellow-50">Categories!!!</h1>
      <ul>
        {categories.docs.map((category) => (
          <li key={category.id}>{category.label}</li>
        ))}
      </ul>
    </>
  );
}
