import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchData } from "@/lib/utils";

export default async function Page() {
  // Get the latest posts
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[pageSize]=100";

  // Get the banner
  const endpoint2 = "/api/blog-page?populate[banner]=*";

  const [data1, data2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ])

  const fallbackBanner = {
    headline: 'Blog',
    supportiveText: 'Supportive text',
  };

  const postList = data1?.length ? data1 : null;
  const banner = data2?.banner || fallbackBanner;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={banner.headline} supportiveText={banner.supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
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
  );
}