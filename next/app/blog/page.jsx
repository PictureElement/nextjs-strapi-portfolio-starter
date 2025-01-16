import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchStaticPageMetadata, fetchPosts } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('blog-page');
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL('/blog/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Blog | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function Page() {
  let data;

  try {
    data = await fetchPosts();
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Blog page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { headline, supportiveText, posts } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: headline,
    description: supportiveText,
    url: new URL('/blog/', process.env.NEXT_PUBLIC_WEBSITE).href,
    mainEntity: posts.map(post => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: new URL(`/blog/${post.slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
      datePublished: post.createdAt,
      image: new URL(post.featuredImage.url, process.env.NEXT_PUBLIC_STRAPI).href,
      ...(post.author && { // Only include author if it exists
        author: {
          "@type": post.author.isBrand ? "Organization" : "Person",
          name: post.author.displayName,
        },
      }),
    }))
  };

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}