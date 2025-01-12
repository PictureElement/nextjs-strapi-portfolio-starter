import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import BtnPrimary from "@/components/BtnPrimary";
import BtnSecondary from "@/components/BtnSecondary";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";
import { fetchProject, fetchProjectSlugs, fetchDynamicPageMetadata } from "@/lib/api";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  try {
    return await fetchProjectSlugs();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function generateMetadata({ params }, parent) {
  const slug = (await params).slug;

  let data;

  try {
    data = await fetchDynamicPageMetadata('projects', slug);
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL(`/projects/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = new URL(openGraphImage.url, process.env.STRAPI).href;

  return {
    title: `${title} | ${p.openGraph.siteName}`,
    description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function Page({ params }) {
  const slug = params.slug;

  let data;

  try {
    data = await fetchProject(slug);
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <>
        <BackTo label="Back to projects" url="/projects/" />
        <main>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-red-600 text-center">Unable to load data for the Project page</div>
          </div>
        </main>
        <BackTo label="Back to projects" url="/projects/" />
      </>
    )
  }

  // Redirect to a 404 page if no project was found
  if (!data) {
    notFound();
  }

  // Destructure/Format the necessary properties
  const { author, title, excerpt, duration, demoUrl, repoUrl, content, featuredImage, scopes, tools, designFile } = data;
  const imageUrl = new URL(featuredImage.url, process.env.STRAPI).href;
  const designFileUrl = (designFile ? new URL(designFile.url, process.env.STRAPI).href : null);

  return (
    <>
      <BackTo label="Back to projects" url="/projects/" />
      <main>
        <div className="mx-auto max-w-6xl px-4">
          <article>
            <header>
              <h1 className="text-gray-900 font-extrabold text-3xl md:text-4xl tracking-tight mb-3">{title}</h1>
              <p className="text-gray-700 font-light leading-7 sm:text-xl mb-4">{excerpt}</p>
              <div className="text-xs leading-6 mb-12">
                {author &&
                  <div className="text-gray-900">By {author.displayName}</div>
                }
                <div>{duration}</div>
              </div>
              <div className="mb-12 rounded-2xl overflow-hidden aspect-[1200/630] w-full relative border border-neutral-100">
                <Image
                  priority
                  className="object-cover object-center"
                  src={imageUrl}
                  alt={featuredImage.alternativeText}
                  fill
                />
              </div>
            </header>
            <div className="flex flex-col md:flex-row gap-x-5 justify-between">
              <section className="max-w-none md:w-2/3 prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mt-12 md:mt-0">
                <div
                  className="[&>*:first-child]:mt-0"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
                />
                <hr className="border-neutral-100" />
                <SocialShare />
              </section>
              <aside className="order-first md:order-2 md:w-1/3 md:pl-5 md:border-l md:border-neutral-200">
                <dl className="flex flex-col gap-2 mb-5">
                  <dt className="sr-only">Related links</dt>
                  <dd className="flex flex-col gap-3">
                    {demoUrl && (
                      <BtnPrimary label="View website" url={demoUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                    {repoUrl && (
                      <BtnSecondary label="View source code" url={repoUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                    {designFileUrl && (
                      <BtnSecondary label="View design file" url={designFileUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                  </dd>
                </dl>
                {scopes.length > 0 && (
                  <dl className="flex flex-col gap-2 mb-5">
                    <dt className="text-gray-900 font-medium">Scope of work</dt>
                    <dd className="flex flex-wrap gap-3">
                      {scopes.map((scope) => (
                        <span key={scope.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{scope.title}</span>
                      ))}
                    </dd>
                  </dl>
                )}
                {tools.length > 0 && (
                  <dl className="flex flex-col gap-2 mb-5">
                    <dt className="text-gray-900 font-medium">Toolset</dt>
                    <dd className="flex flex-wrap gap-3">
                      {tools.map((tool) => (
                        <span key={tool.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{tool.title}</span>
                      ))}
                    </dd>
                  </dl>
                )}
                <hr className="mt-12 border-neutral-100 md:hidden" />
              </aside>
            </div>
          </article>
        </div >
      </main >
      <BackTo label="Back to projects" url="/projects/" />
    </>
  );
}