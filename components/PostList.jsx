import PostEntry from "./PostEntry";

const post1 = {
  title: 'Headless UI v2.1: Simplified transition API and improved multi-dialog support',
  excerpt: 'We just released Headless UI v2.1 for React, which dramatically simplifies our transition APIs and adds support for rendering multiple dialogs as siblings.'
}

export default function PostList({ postList }) {
  console.log("Hello from PostList");
  return (
    <div className="space-y-6">
      {postList.map((entry) => (
        <PostEntry
          key={entry.id}
          title={entry.title}
          excerpt={entry.excerpt}
          slug={entry.slug}
        />
      ))}
    </div>
  );
}