import { fetchData } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";
import { postData1Schema, postData2Schema } from "@/lib/schemas";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // Get all possible post slugs for static generation
  const endpoint = '/api/posts?fields=slug';

  try {
    const response = await fetchData(endpoint);

    const result = postData1Schema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    const posts = result.data;

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function Page({ params }) {
  // Get post by slug
  const endpoint = `/api/posts?filters[slug]=${params.slug}&populate=*`;

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = postData2Schema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <>
        <BackTo label="Back to blog" url="/blog/" />
        <main>
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-red-600 text-center">Unable to load data for the Post page</div>
          </div>
        </main>
        <BackTo label="Back to blog" url="/blog/" />
      </>
    )
  }

  // Redirect to a 404 page if no post was found
  if (!data || data.data.length === 0) {
    notFound();
  }

  // Destructure/Format the necessary properties
  const post = data.data[0];
  const imageUrl = new URL(post.featuredImage.url, process.env.STRAPI).href;
  const content = (
    <div
      className="[&>*:first-child]:mt-0"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(post.content)) }}
    />
  );
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-GB');

  return (
    <>
      <BackTo label="Back to blog" url="/blog/" />
      <main>
        <div className="mx-auto max-w-5xl px-4">
          <article>
            <header>
              <dl className="text-sm leading-6 flex gap-1">
                <dt>Published on</dt>
                <dd><time dateTime={post.publishedAt}>{formattedDate}</time></dd>
              </dl>
              <h1 className="text-gray-900 font-extrabold text-3xl md:text-4xl tracking-tight my-3">{post.title}</h1>
              <div className="text-sm leading-6 text-gray-900">Posted by Marios Sofokleous</div>
              <div className="my-12 rounded-2xl overflow-hidden aspect-[1200/630] w-full relative border border-neutral-100">
                <Image
                  priority
                  className="object-cover object-center"
                  src={imageUrl}
                  alt={post.featuredImage.alternativeText}
                  fill
                />
              </div>
            </header>
            <div className="prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto">
              {content}
              <hr className="border-neutral-100" />
              <SocialShare />
            </div>
          </article>
        </div>
      </main>
      <BackTo label="Back to blog" url="/blog/" />
    </>
  );
}