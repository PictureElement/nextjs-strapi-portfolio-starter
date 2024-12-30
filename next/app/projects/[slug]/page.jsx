import { fetchData } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import BtnPrimary from "@/components/BtnPrimary";
import BtnSecondary from "@/components/BtnSecondary";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";
import { projectDataSchema } from "@/lib/schemas";

export default async function Page({ params }) {
  // Get project by slug
  const endpoint = `/api/projects?filters[slug]=${params.slug}&populate=*`;

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = projectDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
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
  if (!data || data.data.length === 0) {
    notFound();
  }

  // Destructure/Format the necessary properties
  const project = data.data[0];
  const imageUrl = new URL(project.featuredImage.url, process.env.STRAPI).href;
  const content = (
    <div
      className="[&>*:first-child]:mt-0"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(project.content)) }}
    />
  );
  const designFileUrl = (project?.designFile ? new URL(project?.designFile.url, process.env.STRAPI).href : null);

  return (
    <>
      <BackTo label="Back to projects" url="/projects/" />
      <main>
        <div className="mx-auto max-w-6xl px-4">
          <article>
            <header>
              <h1 className="text-gray-900 font-extrabold text-3xl md:text-4xl tracking-tight mb-3">{project.title}</h1>
              <div className="text-sm leading-6 text-gray-900">Developed by Marios Sofokleous</div>
              <div className="my-12 rounded-2xl overflow-hidden aspect-[1200/630] w-full relative border border-neutral-100">
                <Image
                  priority
                  className="object-cover object-center"
                  src={imageUrl}
                  alt={project.featuredImage.alternativeText}
                  fill
                />
              </div>
            </header>
            <div className="flex flex-col md:flex-row gap-x-5 justify-between">
              <section className="max-w-none md:w-2/3 prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mt-12 md:mt-0">
                {content}
                <hr className="border-neutral-100" />
                <SocialShare />
              </section>
              <aside className="order-first md:order-2 md:w-1/3 md:pl-5 md:border-l md:border-neutral-200">
                <dl className="flex flex-col gap-2 mb-5">
                  <dt className="sr-only">Related links</dt>
                  <dd className="flex flex-col gap-3">
                    {project.demoUrl && (
                      <BtnPrimary label="View website" url={project.demoUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                    {project.repoUrl && (
                      <BtnSecondary label="View source code" url={project.repoUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                    {designFileUrl && (
                      <BtnSecondary label="View design file" url={designFileUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                  </dd>
                </dl>
                {project.scopes.length > 0 && (
                  <dl className="flex flex-col gap-2 mb-5">
                    <dt className="text-gray-900 font-medium">Scope of work</dt>
                    <dd className="flex flex-wrap gap-3">
                      {project.scopes.map((scope) => (
                        <span key={scope.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{scope.title}</span>
                      ))}
                    </dd>
                  </dl>
                )}
                {project.tools.length > 0 && (
                  <dl className="flex flex-col gap-2 mb-5">
                    <dt className="text-gray-900 font-medium">Toolset</dt>
                    <dd className="flex flex-wrap gap-3">
                      {project.tools.map((tool) => (
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