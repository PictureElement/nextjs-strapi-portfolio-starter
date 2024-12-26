import { fetchData } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  // Get post by slug
  const endpoint = `/api/posts?filters[slug]=${params.slug}&populate=*`;

  const data = await fetchData(endpoint);

  if (!data || data.length === 0) {
    notFound();
  }

  const post = data[0];

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI;
  const imageUrl = `${baseUrl}${post.featuredImage.url}`;

  const content = (
    <div
      className=""
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(post.content)) }}
    />
  );

  return (
    <>
      <BackTo label="Back to blog" url="/blog/" />
      <main>
        <div className="mx-auto max-w-5xl px-4">
          <article>
            <header>
              <dl className="text-sm leading-6">
                <dt className="sr-only">Date</dt>
                <dd><time dateTime="2024-11-21T18:30:00.000Z">Thursday, November 21, 2024</time></dd>
              </dl>
              <h1 className="text-gray-900 font-extrabold text-2xl md:text-3xl tracking-tight my-3">{post.title}</h1>
              <div className="text-sm leading-6 text-gray-900">Posted by Marios Sofokleous</div>
              <div className="mt-12 rounded-2xl overflow-hidden aspect-[1200/630] w-full relative border border-neutral-100">
                <Image
                  priority
                  className="object-cover object-center"
                  src={imageUrl}
                  alt={post.featuredImage?.alternativeText || "Post featured image"}
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