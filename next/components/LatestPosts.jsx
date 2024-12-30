import SectionHeader from "./SectionHeader";
import PostList from "./PostList";
import BtnSecondary from "./BtnSecondary";
import { fetchData } from "@/lib/utils";
import { latestPostsData1Schema, latestPostsData2Schema } from "@/lib/schemas";

export default async function LatestPosts() {
  console.log("Hello from LatestPosts");

  // Get the latest three posts
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[start]=0&pagination[limit]=3";

  // Get the headline and supportive text
  const endpoint2 = "/api/homepage?populate[latestPosts][populate]=*";

  let data1, data2;

  try {
    const [response1, response2] = await Promise.all([
      fetchData(endpoint1),
      fetchData(endpoint2),
    ]);

    const result1 = latestPostsData1Schema.safeParse(response1);
    const result2 = latestPostsData2Schema.safeParse(response2);

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
      <section className="bg-white py-24">
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the LatestPosts component</div>
        </div>
      </section>
    );
  }

  // Destructure the necessary properties
  const { data: posts } = data1;
  const { latestPosts } = data2.data;

  return (
    <section className="bg-white py-24">
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={latestPosts.headline} supportiveText={latestPosts.supportiveText} />
        {posts.length > 0 ? (
          <PostList postList={posts} />
        ) : (
          <p className="text-center text-gray-500">
            No posts available at the moment. Please check back later!
          </p>
        )}
        <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
          <BtnSecondary label="View all posts" url="/blog" />
        </div>
      </div>
    </section>
  )
}