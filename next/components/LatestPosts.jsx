import SectionHeader from "./SectionHeader";
import PostList from "./PostList";
import BtnSecondary from "./BtnSecondary";
import ShapeDivider from "./ShapeDivider";

export default function LatestPosts({ data }) {
  // Destructure the necessary properties
  const { headline, supportiveText, latestPosts } = data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        {latestPosts.length > 0 ? (
          <PostList postList={latestPosts} />
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