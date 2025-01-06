import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchBlog } from "@/lib/api";

export default async function Page() {
  let data;

  try {
    data = await fetchBlog();
  } catch (error) {
    console.log(error);
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Blog page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { title, description, headline, supportiveText, posts } = data;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={headline} supportiveText={supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        {posts.length > 0 ? (
          <PostList postList={posts} />
        ) : (
          <p className="text-center text-gray-500">
            No posts available at the moment. Please check back later!
          </p>
        )}
      </section>
    </main>
  );
}