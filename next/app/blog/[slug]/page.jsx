import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";
import { fetchPost, fetchPostSlugs, fetchPostMetadata } from "@/lib/api";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  try {
    return await fetchPostSlugs();
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;

  let data;

  try {
    data = await fetchPostMetadata(slug);
  } catch (error) {
    console.error(error);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Destructure necessary properties for metadata
  const { title, description } = data;

  return {
    title,
    description,
  }
}

export default async function Page({ params }) {
  const slug = params.slug;

  let data;

  try {
    data = await fetchPost(slug);
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
  if (!data) {
    notFound();
  }

  // Destructure/Format the necessary properties
  const { title, content, publishedAt, featuredImage } = data;
  const imageUrl = new URL(featuredImage.url, process.env.STRAPI).href;
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-GB');

  return (
    <>
      <BackTo label="Back to blog" url="/blog/" />
      <main>
        <div className="mx-auto max-w-5xl px-4">
          <article>
            <header>
              <dl className="text-sm leading-6 flex gap-1">
                <dt>Published on</dt>
                <dd><time dateTime={publishedAt}>{formattedDate}</time></dd>
              </dl>
              <h1 className="text-gray-900 font-extrabold text-3xl md:text-4xl tracking-tight my-3">{title}</h1>
              <div className="text-sm leading-6 text-gray-900">Posted by Marios Sofokleous</div>
              <div className="my-12 rounded-2xl overflow-hidden aspect-[1200/630] w-full relative border border-neutral-100">
                <Image
                  priority
                  className="object-cover object-center"
                  src={imageUrl}
                  alt={featuredImage.alternativeText}
                  fill
                />
              </div>
            </header>
            <div className="prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto">
              <div
                className="[&>*:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
              />
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