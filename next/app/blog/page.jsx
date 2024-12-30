import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchData } from "@/lib/utils";
import { blogData1Schema, blogData2Schema } from "@/lib/schemas";

export default async function Page() {
  // Get the latest posts
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=100";
  // Get the banner and metadata
  const endpoint2 = "/api/blog-page?populate=*";

  let data1, data2;

  try {
    const [response1, response2] = await Promise.all([
      fetchData(endpoint1),
      fetchData(endpoint2),
    ]);

    const result1 = blogData1Schema.safeParse(response1);
    const result2 = blogData2Schema.safeParse(response2);

    if (!result1.success) {
      console.error(`Validation failed for ${endpoint1}:`, result1.error);
      throw new Error(`Invalid data received from ${endpoint1}`);
    }

    if (!result2.success) {
      console.error(`Validation failed for ${endpoint2}:`, result2.error);
      throw new Error(`Invalid data received from ${endpoint2}`);
    }

    data1 = result1.data;
    data2 = result2.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Blog page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { banner } = data2.data;
  const { data: posts } = data1;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={banner.headline} supportiveText={banner.supportiveText} />
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