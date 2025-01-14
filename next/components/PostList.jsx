import PostEntry from "./PostEntry";
import { fetchMiscellaneous } from "@/lib/api";

export default async function PostList({ postList }) {
  let data;

  try {
    data = await fetchMiscellaneous();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    data = {
      localeString: "en-US",
    }
  }

  // Destructure/Format the necessary properties
  const { localeString } = data;

  return (
    <div className="space-y-6">
      {postList.map((entry) => (
        <PostEntry
          key={entry.id}
          title={entry.title}
          excerpt={entry.excerpt}
          slug={entry.slug}
          createdAt={entry.createdAt}
          localeString={localeString}
        />
      ))}
    </div>
  );
}