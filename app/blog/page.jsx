import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchData } from "@/lib/utils";

export default async function Page() {
  // Post List (3 Latest Posts)
  const endpoint = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[pageSize]=3";

  const [data] = await Promise.all([
    fetchData(endpoint),
  ]);

  const postList = data?.length > 0 ? data : null;

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