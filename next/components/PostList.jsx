import PostEntry from "./PostEntry";

export default function PostList({ postList }) {
  return (
    <div className="space-y-6">
      {postList.map((entry) => (
        <PostEntry
          key={entry.id}
          title={entry.title}
          excerpt={entry.excerpt}
          slug={entry.slug}
          createdAt={entry.createdAt}
        />
      ))}
    </div>
  );
}