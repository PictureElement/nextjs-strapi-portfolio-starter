import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchData } from "@/lib/utils";

export default async function Page() {
  // Post List (3 Latest Posts)
  const endpoint1 = "/api/posts?sort=publishedAt:desc&pagination[pageSize]=3";

  const [data1] = await Promise.all([
    fetchData(endpoint1),
  ]);

  const postList = data1?.length > 0 ? data1 : null;

  return (
    <>
      <main className="overflow-hidden relative">
        <Banner headline="Blog" supportiveText="News, views and digital ramblings" />
        <section className="mx-auto max-w-4xl px-4 py-24">
          {postList ? (
            <>
              <PostList postList={postList} />
            </>
          ) : (
            <p className="text-center text-gray-500">
              No posts available at the moment. Please check back later!
            </p>
          )}
        </section>
      </main>
    </>
  );
}