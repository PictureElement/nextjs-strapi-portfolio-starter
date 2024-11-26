import SectionHeader from "./SectionHeader";
import PostList from "./PostList";
import BtnSecondary from "./BtnSecondary";

export default function LatestPosts() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeader headline="LATEST POSTS" supportiveText="Fresh perspectives on web development trends" />
      <PostList />
      <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
        <BtnSecondary label="View all posts" url="#" />
      </div>
    </section>
  )
}